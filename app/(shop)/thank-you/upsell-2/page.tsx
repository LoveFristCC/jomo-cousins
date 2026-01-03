import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery } from "@/sanity/lib/queries";
import ProductUpsells from "../ProductUpsells";
import DigitalProductUpsell from "../DigitalProductUpsell";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * Second upsell page - Product recommendations based on purchase
 */
export default async function UpsellTwoPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; original_session_id?: string; customer_id?: string }>;
}) {
  const { session_id, original_session_id, customer_id } = await searchParams;

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

  // Safety check: if no products found, redirect to complete page
  if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) {
    redirect(`/thank-you/complete?session_id=${session_id}`);
  }

  // Get upsells from purchased products
  const purchasedProductNames = session.line_items?.data.map((item: any) => item.description) || [];
  const physicalUpsells: any[] = [];
  const digitalUpsells: any[] = [];

  // Find matching products and collect their upsells
  purchasedProductNames.forEach((productName: string) => {
    const matchedProduct = allProducts?.find((p: any) => p.name === productName);

    // Skip if no matched product found
    if (!matchedProduct) return;

    // Collect physical product upsells
    if (matchedProduct.upsells && Array.isArray(matchedProduct.upsells)) {
      matchedProduct.upsells.forEach((upsell: any) => {
        // Skip null/undefined references (deleted products)
        if (!upsell || !upsell._id) return;

        // Avoid duplicates and ensure active status
        if (!physicalUpsells.find((u) => u._id === upsell._id) && upsell.status === "active") {
          physicalUpsells.push(upsell);
        }
      });
    }

    // Collect additional digital product upsells from digitalUpsells array
    if (matchedProduct.digitalUpsells && Array.isArray(matchedProduct.digitalUpsells)) {
      matchedProduct.digitalUpsells.forEach((digitalProduct: any) => {
        // Skip null/undefined references (deleted products)
        if (!digitalProduct || !digitalProduct._id) return;

        // Avoid duplicates and ensure active status
        if (!digitalUpsells.find((u) => u._id === digitalProduct._id) && digitalProduct.status === "active") {
          digitalUpsells.push(digitalProduct);
        }
      });
    }
  });

  // If no upsells at all, redirect to complete page
  if (physicalUpsells.length === 0 && digitalUpsells.length === 0) {
    redirect(`/thank-you/complete?session_id=${session_id}`);
  }

  const customerEmail = session.customer_details?.email;
  // Get customer ID from URL param or from session
  const customerId = customer_id || (session.customer as string);

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

      {/* Digital Product Upsells - Show these first */ }
      { digitalUpsells.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 space-y-12">
            { digitalUpsells.map((digitalProduct) => (
              <DigitalProductUpsell
                key={ digitalProduct._id }
                product={ digitalProduct }
                currentSessionId={ session_id }
                customerId={ customerId }
              />
            )) }
          </div>
        </section>
      ) }

      {/* Physical Product Upsells */ }
      { physicalUpsells.length > 0 && (
        <ProductUpsells
          upsells={ physicalUpsells }
          headline="Complete Your Collection"
          currentSessionId={ session_id }
          customerId={ customerId }
        />
      ) }

      {/* Decline/Complete CTA */ }
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">
            Not interested in these products right now?
          </p>
          <a
            href={`/thank-you/complete?session_id=${session_id}${customerId ? `&customer_id=${customerId}` : ''}`}
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
  title: "Special Offer - Complete Your Collection | Dr. Jomo Cousins",
  description: "Hand-picked product recommendations just for you. Complete your collection with these special offers.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.jomocousins.com/thank-you/upsell-2",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/thank-you/upsell-2",
    siteName: "Dr. Jomo Cousins",
    title: "Special Offer - Complete Your Collection",
    description: "Hand-picked product recommendations curated for you.",
    images: [
      {
        url: "https://www.jomocousins.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Special Product Offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Offer - Complete Your Collection",
    description: "Hand-picked product recommendations curated for you.",
    images: ["https://www.jomocousins.com/images/og-image.webp"],
    creator: "@pastorjomo",
  },
};
