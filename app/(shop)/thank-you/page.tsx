import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productByNameQuery } from "@/sanity/lib/queries";
import UpsellOffer from "./UpsellOffer";
import PurchaseTracker from "./PurchaseTracker";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * Thank you page with order summary and first upsell
 */
export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    notFound();
  }

  // Fetch the Stripe session
  // Note: shipping_details and customer_details are included by default, only expand line_items
  let session: any; // Using any because Stripe types don't include shipping_details
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });
    console.log("[Thank You] Successfully retrieved session:", session.id);
  } catch (error) {
    console.error("[Thank You] ❌ Error fetching session:", error);
    console.error("[Thank You] Session ID:", session_id);
    console.error("[Thank You] Error details:", error instanceof Error ? error.message : String(error));
    notFound();
  }

  // Fetch the digital upsell based on purchased product
  let upsellProduct = null;
  let purchasedProduct = null;
  const purchasedProductName = session.line_items?.data[0]?.description || null;

  if (purchasedProductName) {
    purchasedProduct = await sanityFetch({
      query: productByNameQuery,
      params: { name: purchasedProductName },
    });

    // Use the product's specific digital upsell
    upsellProduct = purchasedProduct?.digitalUpsell || null;
  }

  // If no digital upsell, check for product upsells
  if (!upsellProduct) {
    const hasProductUpsells = purchasedProduct?.upsells && purchasedProduct.upsells.length > 0;

    if (hasProductUpsells) {
      // Skip to product upsells
      redirect(`/thank-you/upsell-2?session_id=${session_id}`);
    } else {
      // No upsells at all, go to complete page
      redirect(`/thank-you/complete?session_id=${session_id}`);
    }
  }

  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name;
  const customerId = session.customer as string; // Stripe customer ID for pre-filling checkout

  console.log('[Thank You] Customer ID:', customerId);
  console.log('[Thank You] Session:', session.id);

  // Prepare purchase data for GA4 tracking
  const purchaseItems = session.line_items?.data.map((item: any) => ({
    item_id: item.price?.product as string || item.id,
    item_name: item.description || 'Unknown Product',
    price: (item.amount_total || 0) / 100,
    quantity: item.quantity || 1,
  })) || [];

  const totalValue = (session.amount_total || 0) / 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Track purchase conversion in Google Analytics */}
      <PurchaseTracker
        transactionId={session.id}
        totalValue={totalValue}
        items={purchaseItems}
        currency="USD"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#e31e24] rounded-full mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-xl text-gray-300">
              Your order has been confirmed and will be shipped soon.
            </p>

            {customerEmail && (
              <p className="text-gray-400 mt-4">
                Confirmation email sent to: <strong className="text-white">{customerEmail}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Order summary */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-[#2d2d2d]">Order Summary</h2>

          {session.line_items?.data.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center mb-4 pb-4">
              <div>
                <p className="font-semibold text-[#2d2d2d]">{item.description}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold text-lg text-[#2d2d2d]">
                ${((item.amount_total || 0) / 100).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t-2 border-gray-300 pt-4 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-[#2d2d2d]">Total Paid</span>
              <span className="text-[#e31e24]">${((session.amount_total || 0) / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping address */}
          {session.shipping_details?.address && (
            <div className="mt-6 pt-6 border-t-2 border-gray-300">
              <h3 className="font-bold text-lg mb-3 text-[#2d2d2d]">Shipping Address</h3>
              <p className="text-gray-700 leading-relaxed">
              {session.shipping_details?.name}
              <br />
              {session.shipping_details?.address?.line1}
              {session.shipping_details?.address?.line2 && (
                <>
                  <br />
                  {session.shipping_details?.address?.line2}
                </>
              )}
              <br />
              {session.shipping_details?.address?.city},{" "}
              {session.shipping_details?.address?.state}{" "}
              {session.shipping_details?.address?.postal_code}
              <br />
              {session.shipping_details?.address?.country}
              </p>
            </div>
          )}
        </div>

        {/* First Upsell - Digital Product */}
        {upsellProduct && (
          <Suspense fallback={<UpsellSkeleton />}>
            <UpsellOffer
              product={upsellProduct}
              customerEmail={customerEmail || ""}
              customerName={customerName || ""}
              sessionId={session_id}
              customerId={customerId}
            />
          </Suspense>
        )}

        {/* Skip link - goes to second upsell */}
        <div className="text-center mt-8">
          <a
            href={`/thank-you/upsell-2?session_id=${session_id}${customerId ? `&customer_id=${customerId}` : ''}`}
            className="text-gray-600 hover:text-[#e31e24] font-semibold underline transition-colors"
          >
            No thanks, show me other recommendations
          </a>
        </div>
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
  title: "Thank You - Order Confirmed | Dr. Jomo Cousins",
  description: "Your order has been confirmed and will be shipped soon. Thank you for your purchase from Dr. Jomo Cousins.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.jomocousins.com/thank-you",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/thank-you",
    siteName: "Dr. Jomo Cousins",
    title: "Thank You - Order Confirmed",
    description: "Your order has been confirmed. Check your email for order details.",
    images: [
      {
        url: "https://www.jomocousins.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Thank You for Your Order",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You - Order Confirmed",
    description: "Your order has been confirmed. Check your email for order details.",
    images: ["https://www.jomocousins.com/images/og-image.webp"],
    creator: "@pastorjomo",
  },
};
