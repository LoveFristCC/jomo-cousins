import { NextRequest, NextResponse } from "next/server";
import { syncProductToStripe } from "@/lib/stripe-sync";

/**
 * POST /api/webhooks/sanity
 * Webhook endpoint for Sanity to trigger Stripe sync
 * Called when a product is created or updated in Sanity
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Sanity webhook payload structure
    const { _type, _id } = body;

    // Only process product and digitalProduct documents
    if (_type !== "product" && _type !== "digitalProduct") {
      return NextResponse.json(
        { message: "Not a product document, skipping" },
        { status: 200 }
      );
    }

    // Sync the product to Stripe
    try {
      const result = await syncProductToStripe(_id);

      return NextResponse.json({
        success: true,
        message: `Successfully synced ${result.productName} to Stripe`,
        stripeProductId: result.productId,
        stripePriceId: result.priceId,
      });
    } catch (syncError) {
      console.error(`[Sanity Webhook] Error syncing product:`, syncError);

      // Return 200 to prevent Sanity from retrying
      // Log the error but don't fail the webhook
      return NextResponse.json({
        success: false,
        error: syncError instanceof Error ? syncError.message : "Sync failed",
        message: "Product saved in Sanity but Stripe sync failed",
      }, { status: 200 });
    }
  } catch (error) {
    console.error("[Sanity Webhook] Error processing webhook:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}
