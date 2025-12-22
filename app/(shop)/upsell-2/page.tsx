import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { digitalProductByPositionQuery } from "@/sanity/lib/queries";
import type { DigitalProductByPositionQueryResult } from "@/sanity.types";
import UpsellOffer from "../thank-you/UpsellOffer";

/**
 * Second upsell page
 * Shows after the first upsell is accepted
 */
export default async function Upsell2Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // Fetch the second upsell product
  const upsellProduct = await sanityFetch({
    query: digitalProductByPositionQuery,
    params: { position: "upsell_2" },
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Wait! One More Thing...</h1>
        <p className="text-gray-600 text-lg">
          Complete your transformation with this exclusive offer
        </p>
      </div>

      {/* Upsell offer */}
      {upsellProduct ? (
        <Suspense fallback={<UpsellSkeleton />}>
          <UpsellOffer
            product={upsellProduct}
            customerEmail=""
            customerName=""
          />
        </Suspense>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-6">No additional offers available.</p>
          <a
            href="/thank-you/complete"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Continue to Your Account
          </a>
        </div>
      )}

      {/* Skip to complete button */}
      <div className="text-center mt-8">
        <a
          href="/thank-you/complete"
          className="text-gray-500 hover:text-gray-700 underline"
        >
          No thanks, continue to my account
        </a>
      </div>
    </div>
  );
}

/**
 * Loading skeleton for upsell offer
 */
function UpsellSkeleton() {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="h-12 bg-gray-200 rounded" />
    </div>
  );
}

export const metadata = {
  title: "Special Offer - Limited Time",
  description: "Exclusive upsell offer",
};
