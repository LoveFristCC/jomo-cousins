import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery } from "@/sanity/lib/queries";
import ProductUpsells from "../ProductUpsells";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * Second upsell page - Product recommendations based on purchase
 */
export default async function UpsellTwoPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; original_session_id?: string }>;
}) {
  const { session_id, original_session_id } = await searchParams;

  if (!session_id) {
    notFound();
  }

  // Use original session ID if provided (from digital product purchase),
  // otherwise use current session ID (from physical product purchase)
  const sessionIdToUse = original_session_id || session_id;

  // Fetch the Stripe session
  let session: any;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionIdToUse, {
      expand: [ "line_items" ],
    });
  } catch (error) {
    console.error("[Upsell 2] Error fetching session:", error);
    notFound();
  }

  // Fetch all products to match with purchased items
  const allProducts = await sanityFetch({
    query: allProductsQuery,
  });

  // Get upsells from purchased products
  const purchasedProductNames = session.line_items?.data.map((item: any) => item.description) || [];
  const upsellsToShow: any[] = [];

  // Find matching products and collect their upsells
  purchasedProductNames.forEach((productName: string) => {
    const matchedProduct = allProducts?.find((p: any) => p.name === productName);
    if (matchedProduct?.upsells) {
      matchedProduct.upsells.forEach((upsell: any) => {
        // Avoid duplicates
        if (!upsellsToShow.find((u) => u._id === upsell._id)) {
          upsellsToShow.push(upsell);
        }
      });
    }
  });

  // If no product upsells, redirect to complete page
  if (upsellsToShow.length === 0) {
    redirect(`/thank-you/complete?session_id=${session_id}`);
  }

  const customerEmail = session.customer_details?.email;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */ }
      <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              One More Thing...
            </h1>
            <p className="text-xl text-gray-300">
              Before you go, check out these hand-picked recommendations
            </p>
            { customerEmail && (
              <p className="text-gray-400 mt-4 text-sm">
                For: <strong className="text-white">{ customerEmail }</strong>
              </p>
            ) }
          </div>
        </div>
      </div>

      {/* Product Upsells */ }
      <ProductUpsells
        upsells={ upsellsToShow }
        headline="Complete Your Collection"
        currentSessionId={ session_id }
      />

      {/* Decline/Complete CTA */ }
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">
            Not interested in these products right now?
          </p>
          <a
            href={`/thank-you/complete?session_id=${session_id}`}
            className="inline-block px-10 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-md"
          >
            No Thanks
          </a>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Special Offer - Complete Your Collection",
  description: "Hand-picked recommendations just for you",
};
