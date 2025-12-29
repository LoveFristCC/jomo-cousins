import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { checkInventoryAvailability } from "@/lib/inventory";

// Helper to sanitize metadata (Stripe limit: 500 chars)
function sanitizeMetadata(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width spaces
    .replace(/[^\x20-\x7E]/g, "") // Remove non-printable characters
    .trim()
    .substring(0, 500);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * POST /api/create-checkout
 * Creates a Stripe Checkout session for product purchase
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      variantSku,
      quantity,
      productName,
      price,
      size,
      color,
      weight,
      productType = "physical", // 'physical' or 'digital'
      kajabiWebhookUrl,
      stripePriceId,
      isSubscription = false,
      subscriptionInterval = "month",
      originalSessionId = null, // Original session ID from physical product purchase
      returnSessionId = null, // Session ID to return to on cancel (for upsell pages)
      customerId = null, // Stripe customer ID to pre-fill checkout
    } = body;

    // Validate required fields
    if (productType === "physical" && !variantSku) {
      return NextResponse.json(
        { error: "Variant SKU is required for physical products" },
        { status: 400 }
      );
    }

    if (!productName || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check inventory availability for physical products
    if (productType === "physical") {
      const availability = await checkInventoryAvailability(
        variantSku,
        parseInt(quantity)
      );

      if (!availability.available) {
        return NextResponse.json(
          {
            error: "This item is out of stock",
            currentInventory: availability.currentInventory,
          },
          { status: 400 }
        );
      }
    }

    // Build metadata (sanitized to remove hidden characters and enforce 500 char limit)
    const metadata: Record<string, string> = {
      variantSku: sanitizeMetadata(variantSku) || "N/A",
      quantity: quantity.toString(),
      productName: sanitizeMetadata(productName),
      weight: weight?.toString() || "0",
      productType,
    };

    if (size) metadata.size = sanitizeMetadata(size);
    if (color) metadata.color = sanitizeMetadata(color);
    if (kajabiWebhookUrl) metadata.kajabiWebhookUrl = sanitizeMetadata(kajabiWebhookUrl);

    // Build line items (sanitize size/color for description)
    const description =
      productType === "physical"
        ? [sanitizeMetadata(size), sanitizeMetadata(color)]
            .filter(Boolean)
            .join(" - ") || undefined
        : undefined;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: stripePriceId
          ? undefined
          : {
              currency: "usd",
              product_data: {
                name: productName,
                ...(description && { description }), // Only include if not empty
              },
              unit_amount: Math.round(price * 100), // Convert to cents
              ...(isSubscription && {
                recurring: {
                  interval: subscriptionInterval as "month" | "year",
                },
              }),
            },
        price: stripePriceId || undefined,
        quantity: parseInt(quantity),
      },
    ];

    // Shipping options for physical products
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      productType === "physical"
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 500, // $5.00
                  currency: "usd",
                },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 5,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 1500, // $15.00
                  currency: "usd",
                },
                display_name: "Express Shipping",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 1,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 2,
                  },
                },
              },
            },
          ]
        : [];

    // Determine success URL based on product type and context
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    // For digital products, pass through the original session ID so upsell-2 can show recommendations from the original purchase
    const originalSessionParam = originalSessionId ? `&original_session_id=${originalSessionId}` : '';

    let successUrl: string;
    if (productType === "digital") {
      // After digital product/subscription → Show product upsells
      successUrl = `${baseUrl}/thank-you/upsell-2?session_id={CHECKOUT_SESSION_ID}${originalSessionParam}`;
    } else if (returnSessionId) {
      // Physical product from upsell page → Go to complete page (don't restart upsell flow)
      successUrl = `${baseUrl}/thank-you/complete?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      // Regular physical product (first purchase) → Show subscription upsell
      successUrl = `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
    }

    // Determine cancel URL based on context
    let cancelUrl: string;
    if (productType === "digital") {
      // Digital product cancellation → Return to upsell-2
      cancelUrl = `${baseUrl}/thank-you/upsell-2?session_id={CHECKOUT_SESSION_ID}${originalSessionParam}`;
    } else if (returnSessionId) {
      // Physical product from upsell page → Return to complete page with original session
      cancelUrl = `${baseUrl}/thank-you/complete?session_id=${returnSessionId}`;
    } else {
      // Regular physical product → Back to products
      cancelUrl = `${baseUrl}/products`;
    }

    // Create Stripe Checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: isSubscription ? "subscription" : "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      automatic_tax: {
        enabled: true,
      },
      // Pre-fill customer info and show saved payment methods
      ...(customerId && { customer: customerId }),
      // Create customer if not provided (for first purchase)
      ...(!customerId && { customer_creation: "always" }),
      // Update customer info for tax calculation (when using existing customer)
      ...(customerId && {
        customer_update: productType === "physical"
          ? { shipping: "auto", name: "auto", address: "auto" }
          : { name: "auto" },
      }),
    };

    // Save payment method for future use (for one-time payments)
    if (!isSubscription) {
      sessionConfig.payment_intent_data = {
        setup_future_usage: "off_session", // Save payment method for future charges
      };
    }

    // For subscriptions, add subscription-specific config
    if (isSubscription) {
      sessionConfig.subscription_data = {
        metadata,
      };

      // Note: Trial pricing with upfront charges requires a different approach in Stripe
      // For now, subscriptions use the regular price from day 1
      // To implement trial pricing, we'd need to use subscription schedules or coupons
    }

    // Add physical product shipping
    if (productType === "physical") {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ["US", "CA"],
      };
      sessionConfig.shipping_options = shippingOptions;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log(`[Checkout] Created session: ${session.id} for ${productName}`);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("[Checkout] Error creating checkout session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}
