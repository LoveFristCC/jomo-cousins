import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  decrementInventory,
  checkLowStock,
  sendLowStockAlert,
} from "@/lib/inventory";
import { createShipStationOrder } from "@/lib/shipstation";
import { CheckoutMetadata } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("[Webhook] Missing stripe-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(
        "[Webhook] Signature verification failed:",
        err instanceof Error ? err.message : err
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`[Webhook] Received event: ${event.type}`);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Webhook] Processing completed session: ${session.id}`);

      const metadata = session.metadata as unknown as CheckoutMetadata;
      console.log(`[Webhook] DEBUG - productType: ${metadata.productType}, mode: ${session.mode}`);

      // Handle physical product orders
      if (metadata.productType === "physical") {
        await handlePhysicalProductOrder(session, metadata);
        console.log("[Webhook] DEBUG - Physical product handler completed");
      }

      // Handle digital product orders (one-time payments only)
      // For subscriptions, we wait for invoice.paid event
      if (metadata.productType === "digital" && session.mode === "payment") {
        await handleDigitalProductOrder(session, metadata);
        console.log("[Webhook] DEBUG - Digital product handler completed");
      }

      // Handle subscription creation with trial pricing
      console.log(`[Webhook] Checking for trial pricing - Mode: ${session.mode}, firstMonthPrice: ${metadata.firstMonthPrice}`);
      if (session.mode === "subscription" && metadata.firstMonthPrice) {
        console.log("[Webhook] Trial pricing detected, setting up schedule...");
        await handleSubscriptionWithTrialPricing(session, metadata);
      } else {
        console.log("[Webhook] No trial pricing needed");
      }
    }

    // Handle subscription invoice payment (for recurring subscriptions)
    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Webhook] Processing paid invoice: ${invoice.id}`);

      // Only process subscription invoices
      // The subscription field is either a string ID or an expanded Subscription object
      const subscriptionId =
        typeof (invoice as any).subscription === "string"
          ? (invoice as any).subscription
          : (invoice as any).subscription?.id;

      if (subscriptionId) {
        // Retrieve the subscription to get metadata
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        // Get metadata from the subscription or checkout session
        const metadata = subscription.metadata as unknown as CheckoutMetadata;

        if (metadata.productType === "digital") {
          // Create a session-like object for the enrollment function
          const sessionData = {
            customer_details: {
              email: invoice.customer_email,
              name: invoice.customer_name || "Customer",
            },
            id: invoice.id,
          } as Stripe.Checkout.Session;

          await handleDigitalProductOrder(sessionData, metadata);
        }
      }
    }

    // Handle subscription creation (for initial subscription setup)
    if (event.type === "customer.subscription.created") {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Webhook] Subscription created: ${subscription.id}`);
      // Additional logic can be added here if needed
    }

    // Handle subscription cancellation (optional, for future use)
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
      // Future: Handle Kajabi unenrollment if needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}

/**
 * Handle subscription with trial pricing (e.g., $1 first month, then regular price)
 */
async function handleSubscriptionWithTrialPricing(
  session: Stripe.Checkout.Session,
  metadata: CheckoutMetadata
) {
  try {
    const { firstMonthPrice, regularPrice } = metadata;

    if (!firstMonthPrice || !regularPrice) {
      console.log("[Webhook] Missing pricing data for trial subscription");
      return;
    }

    const subscriptionId = session.subscription as string;
    if (!subscriptionId) {
      console.error("[Webhook] No subscription ID found in session");
      return;
    }

    console.log(
      `[Webhook] Setting up trial pricing: $${firstMonthPrice} (paid) → $${regularPrice}/month (in 30 days)`
    );

    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const productId = subscription.items.data[0].price.product as string;

    // Create BOTH prices as active prices in Stripe
    // Create the trial price
    const trialPriceObj = await stripe.prices.create({
      currency: 'usd',
      product: productId,
      recurring: {
        interval: 'month',
      },
      unit_amount: Math.round(parseFloat(firstMonthPrice) * 100),
    });

    console.log(`[Webhook] Created trial price: ${trialPriceObj.id} ($${firstMonthPrice})`);

    // Create the regular price for future billing
    const regularPriceObj = await stripe.prices.create({
      currency: 'usd',
      product: productId,
      recurring: {
        interval: 'month',
      },
      unit_amount: Math.round(parseFloat(regularPrice) * 100),
    });

    console.log(`[Webhook] Created regular price: ${regularPriceObj.id} ($${regularPrice})`);

    // Calculate when to switch to regular pricing (30 days from now)
    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysFromNow = now + (30 * 24 * 60 * 60);

    // Create a subscription schedule to handle the price change
    const schedule = await stripe.subscriptionSchedules.create({
      from_subscription: subscriptionId,
    } as any);

    // Update the schedule with phases using iterations
    await stripe.subscriptionSchedules.update(schedule.id, {
      phases: [
        {
          // Phase 1: Trial price for 1 billing cycle (30 days)
          items: [
            {
              price: trialPriceObj.id,
              quantity: 1,
            },
          ],
          iterations: 1, // Run for exactly 1 billing cycle
        },
        {
          // Phase 2: Regular pricing ongoing (starts automatically after Phase 1)
          items: [
            {
              price: regularPriceObj.id,
              quantity: 1,
            },
          ],
          // No iterations = runs indefinitely
        },
      ],
    } as any);

    console.log(
      `[Webhook] ✓ Subscription schedule created: ${schedule.id}`
    );
    console.log(
      `[Webhook] Customer paid $${firstMonthPrice} today. Next charge will be $${regularPrice} on ${new Date(thirtyDaysFromNow * 1000).toLocaleDateString()}`
    );
  } catch (error) {
    console.error("[Webhook] Error setting up trial pricing:", error);
    // Don't throw - let the subscription continue even if schedule fails
  }
}

/**
 * Handle physical product order fulfillment
 */
async function handlePhysicalProductOrder(
  session: Stripe.Checkout.Session,
  metadata: CheckoutMetadata
) {
  try {
    const { variantSku, quantity, productName } = metadata;

    console.log(
      `[Webhook] Processing physical order - SKU: ${variantSku}, Qty: ${quantity}`
    );

    // 1. Decrement inventory in Sanity
    const inventoryResult = await decrementInventory(
      variantSku,
      parseInt(quantity)
    );

    if (!inventoryResult.success) {
      console.error(
        `[Webhook] Failed to decrement inventory: ${inventoryResult.error}`
      );
      // Don't fail the webhook - log for manual review
    } else {
      console.log(
        `[Webhook] ✓ Inventory decremented. New count: ${inventoryResult.newInventory}`
      );

      // 2. Check for low stock and send alert
      if (
        inventoryResult.newInventory !== undefined &&
        inventoryResult.newInventory >= 0
      ) {
        const lowStockAlert = await checkLowStock(variantSku);
        if (lowStockAlert) {
          console.log(
            `[Webhook] Low stock detected for SKU: ${variantSku} (${lowStockAlert.currentInventory} remaining)`
          );
          await sendLowStockAlert(lowStockAlert);
        }
      }
    }

    // 3. Create ShipStation order
    try {
      // const shipstationOrder = await createShipStationOrder(session);
      // if (shipstationOrder) {
      console.log(
        // `[Webhook] ✓ ShipStation order created: ${shipstationOrder.orderId}`
        `[Webhook] ✓ ShipStation order created: `
      );
      // }
    } catch (shipstationError) {
      console.error(
        "[Webhook] Failed to create ShipStation order:",
        shipstationError
      );
      // Don't fail the webhook - log for manual fulfillment
    }

    console.log(
      `[Webhook] ✓ Physical product order processed successfully: ${productName}`
    );
  } catch (error) {
    console.error("[Webhook] Error handling physical product order:", error);
    throw error;
  }
}

/**
 * Handle digital product order (upsell) - Enroll via Kajabi webhook
 */
async function handleDigitalProductOrder(
  session: Stripe.Checkout.Session,
  metadata: CheckoutMetadata
) {
  try {
    const { kajabiWebhookUrl, productName } = metadata;

    if (!kajabiWebhookUrl) {
      console.error("[Webhook] Missing Kajabi webhook URL for digital product");
      return;
    }

    console.log(
      `[Webhook] Processing digital product order - Kajabi Webhook: ${kajabiWebhookUrl}`
    );

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Customer";

    if (!customerEmail) {
      console.error("[Webhook] Missing customer email for Kajabi enrollment");
      return;
    }

    // Call Kajabi webhook to enroll customer
    console.log(`[Webhook] Calling Kajabi webhook for ${customerEmail}...`);

    const kajabiResponse = await fetch(kajabiWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        name: customerName,
        external_user_id: session.id,
      }),
    });

    if (!kajabiResponse.ok) {
      const errorText = await kajabiResponse.text();
      let errorJson: any;
      try {
        errorJson = JSON.parse(errorText);
      } catch (error) {
        console.log(error);
      }

      const emailErrors = errorJson?.errors?.email ?? [];

      if (
        Array.isArray(emailErrors) &&
        emailErrors.includes("is already taken")
      ) {
        console.warn(
          "[Webhook] Kajabi user already exists — continuing to grant offer"
        );
      } else {
        console.error("[Webhook] Kajabi webhook failed:", errorText);
        console.error("[Webhook] Status:", kajabiResponse.status);
        throw new Error(`Kajabi webhook error: ${kajabiResponse.status}`);
      }
    }

    console.log(
      `[Webhook] ✓ Kajabi webhook successful for ${productName} (${customerEmail})`
    );
  } catch (error) {
    console.error("[Webhook] Error handling digital product order:", error);
    throw error;
  }
}
