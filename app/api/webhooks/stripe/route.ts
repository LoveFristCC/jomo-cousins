import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { decrementInventory, checkLowStock, sendLowStockAlert } from "@/lib/inventory";
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
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    console.log(`[Webhook] Received event: ${event.type}`);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Webhook] Processing completed session: ${session.id}`);

      const metadata = session.metadata as unknown as CheckoutMetadata;

      // Handle physical product orders
      if (metadata.productType === "physical") {
        await handlePhysicalProductOrder(session, metadata);
      }

      // Handle digital product orders (upsells)
      if (metadata.productType === "digital") {
        await handleDigitalProductOrder(session, metadata);
      }
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
      if (inventoryResult.newInventory !== undefined && inventoryResult.newInventory >= 0) {
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
      const shipstationOrder = await createShipStationOrder(session);
      if (shipstationOrder) {
        console.log(
          `[Webhook] ✓ ShipStation order created: ${shipstationOrder.orderId}`
        );
      }
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
 * Handle digital product order (upsell) - Enroll in Kajabi
 */
async function handleDigitalProductOrder(
  session: Stripe.Checkout.Session,
  metadata: CheckoutMetadata
) {
  try {
    const { kajabiOfferId, productName } = metadata;

    if (!kajabiOfferId) {
      console.error("[Webhook] Missing Kajabi offer ID for digital product");
      return;
    }

    console.log(
      `[Webhook] Processing digital product order - Kajabi Offer: ${kajabiOfferId}`
    );

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Customer";

    if (!customerEmail) {
      console.error("[Webhook] Missing customer email for Kajabi enrollment");
      return;
    }

    // Enroll customer in Kajabi
    const kajabiApiKey = process.env.KAJABI_API_KEY;

    if (!kajabiApiKey) {
      console.error("[Webhook] KAJABI_API_KEY not configured");
      return;
    }

    const kajabiResponse = await fetch("https://app.kajabi.com/api/v1/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${kajabiApiKey}`,
      },
      body: JSON.stringify({
        email: customerEmail,
        name: customerName,
        offer_id: kajabiOfferId,
        external_user_id: session.id,
        tags: ["upsell-purchase"],
      }),
    });

    if (!kajabiResponse.ok) {
      const errorText = await kajabiResponse.text();
      console.error("[Webhook] Kajabi enrollment failed:", errorText);
      throw new Error(`Kajabi API error: ${kajabiResponse.status}`);
    }

    const kajabiMember = await kajabiResponse.json();
    console.log(
      `[Webhook] ✓ Kajabi enrollment successful: ${kajabiMember.id} for ${productName}`
    );
  } catch (error) {
    console.error("[Webhook] Error handling digital product order:", error);
    throw error;
  }
}
