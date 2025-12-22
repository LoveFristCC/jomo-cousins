import { NextRequest, NextResponse } from "next/server";
import { syncProductToStripe } from "@/lib/stripe-sync";

/**
 * POST /api/sync-product-to-stripe
 * Syncs a Sanity product to Stripe
 * Creates or updates the product and price in Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const result = await syncProductToStripe(productId);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.productName} to Stripe`,
      stripeProductId: result.productId,
      stripePriceId: result.priceId,
    });
  } catch (error) {
    console.error("[API] Error syncing product to Stripe:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to sync product",
      },
      { status: 500 }
    );
  }
}
