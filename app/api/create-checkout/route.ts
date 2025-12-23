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
      kajabiOfferId,
      stripePriceId,
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
    if (kajabiOfferId) metadata.kajabiOfferId = sanitizeMetadata(kajabiOfferId);

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

    // Determine success URL based on product type
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const successUrl =
      productType === "digital"
        ? `${baseUrl}/thank-you/upsell-2?session_id={CHECKOUT_SESSION_ID}` // After subscription → Show product upsells
        : `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`; // After main purchase → Show subscription upsell

    const cancelUrl =
      productType === "digital"
        ? `${baseUrl}/thank-you/upsell-2?session_id={CHECKOUT_SESSION_ID}` // If cancel subscription → Still show product upsells
        : `${baseUrl}/products`; // If cancel main purchase → Back to products

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      ...(productType === "physical" && {
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: shippingOptions,
      }),
      automatic_tax: {
        enabled: true,
      },
    });

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
