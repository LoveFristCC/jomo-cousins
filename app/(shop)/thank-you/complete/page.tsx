import Link from "next/link";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

type ProductType = "physical" | "digital" | "ebook";

/**
 * Collect what the customer bought in this checkout flow.
 * The session_id here may be an upsell's session rather than the original
 * purchase, so look across the customer's paid sessions from the last day.
 */
async function getPurchaseSummary(sessionId?: string) {
  const types = new Set<ProductType>();
  const ebooks = new Map<string, { name: string; downloadUrl: string }>();

  if (!sessionId) return { types, ebooks };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;

    const since = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
    const sessions = customerId
      ? (await stripe.checkout.sessions.list({ customer: customerId, created: { gte: since }, limit: 20 })).data
      : [ session ];

    for (const s of sessions) {
      if (s.status !== "complete") continue;
      const type = s.metadata?.productType as ProductType | undefined;
      if (type) types.add(type);

      const slug = s.metadata?.productSlug;
      if (type === "ebook" && s.payment_status === "paid" && slug && !ebooks.has(slug)) {
        ebooks.set(slug, {
          name: s.metadata?.productName || "Your eBook",
          downloadUrl: `/api/ebook-download?session_id=${s.id}`,
        });
      }
    }
  } catch (error) {
    console.error("[Complete] Error fetching purchase summary:", error);
  }

  return { types, ebooks };
}

/**
 * Final confirmation page
 * Shown after all upsells are complete or declined
 */
export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const { types, ebooks } = await getPurchaseSummary(session_id);

  // If we couldn't tell what was bought, fall back to the generic physical + digital steps
  const unknown = types.size === 0;
  const showPhysical = unknown || types.has("physical");
  const showDigital = unknown || types.has("digital");
  const showEbook = ebooks.size > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#e31e24] rounded-full mb-6 shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
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

            <h1 className="text-5xl md:text-6xl font-bold mb-4">You're All Set!</h1>
            <p className="text-xl text-gray-300">
              { showEbook && !showPhysical && !showDigital
                ? "Thank you for your purchase. Your eBook is ready to download."
                : "Thank you for your purchase. Your order is being processed." }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* eBook downloads */}
        { showEbook && (
          <div className="bg-[#e31e24]/5 border-2 border-[#e31e24] rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#2d2d2d]">
              { ebooks.size > 1 ? "Your eBooks" : "Your eBook" }
            </h2>
            <p className="text-gray-700 mb-6">
              Download your PDF now. We've also emailed you a link so you can download it again later.
            </p>
            <div className="flex flex-col items-center gap-4">
              { Array.from(ebooks.values()).map((ebook) => (
                <a
                  key={ ebook.downloadUrl }
                  href={ ebook.downloadUrl }
                  className="inline-block px-8 py-4 bg-[#e31e24] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#c41a1f] transition-all"
                >
                  { ebooks.size > 1 ? `Download ${ebook.name} (PDF)` : "Download eBook (PDF)" }
                </a>
              )) }
            </div>
          </div>
        ) }

        {/* What's next section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-[#2d2d2d]">What Happens Next?</h2>

          <div className="space-y-8">
            {/* eBooks */}
            { showEbook && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-[#e31e24]/10 rounded-xl flex items-center justify-center mr-5">
                <svg
                  className="w-7 h-7 text-[#e31e24]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#2d2d2d]">eBook</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your eBook is ready now. Use the download button above, or the link
                  in your email any time you need it again.
                </p>
              </div>
            </div>
            ) }

            {/* Physical products */}
            { showPhysical && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-[#e31e24]/10 rounded-xl flex items-center justify-center mr-5">
                <svg
                  className="w-7 h-7 text-[#e31e24]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#2d2d2d]">Physical Products</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your order will be prepared and shipped within 1-2 business days.
                  You'll receive a tracking number via email once it ships.
                </p>
              </div>
            </div>
            ) }

            {/* Digital products */}
            { showDigital && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2d2d2d]/10 rounded-xl flex items-center justify-center mr-5">
                <svg
                  className="w-7 h-7 text-[#2d2d2d]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#2d2d2d]">Digital Products / Courses</h3>
                <p className="text-gray-600 leading-relaxed">
                  You'll receive an email with access instructions to your digital
                  content and courses within the next few minutes.
                </p>
              </div>
            </div>
            ) }

            {/* Email confirmation */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mr-5">
                <svg
                  className="w-7 h-7 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#2d2d2d]">Check Your Email</h3>
                <p className="text-gray-600 leading-relaxed">
                  We've sent a confirmation email with your order details and receipt.
                  Please check your spam folder if you don't see it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer support */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3 text-[#2d2d2d]">Need Help?</h2>
          <p className="text-gray-600 mb-6 text-lg">
            If you have any questions or concerns about your order, feel free to reach
            out to our customer support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#e31e24] text-white rounded-xl font-bold hover:bg-[#c71a1f] transition-all shadow-md hover:shadow-lg"
          >
            Contact Support
          </a>
        </div>

        {/* CTA buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/products"
            className="block text-center px-8 py-4 border-3 border-[#2d2d2d] text-[#2d2d2d] rounded-xl font-bold hover:bg-[#2d2d2d] hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="block text-center px-8 py-4 bg-[#2d2d2d] text-white rounded-xl font-bold hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>

        {/* Social proof / testimonial section */}
        <div className="text-center py-8 border-t-2 border-gray-200">
          <p className="text-gray-500 mb-4 font-semibold">Join thousands of satisfied customers</p>
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 font-semibold text-lg">Average rating: 4.9/5</p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Order Complete - Thank You | Dr. Jomo Cousins",
  description: "Your order has been successfully processed. Thank you for shopping with Dr. Jomo Cousins!",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.jomocousins.com/thank-you/complete",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/thank-you/complete",
    siteName: "Dr. Jomo Cousins",
    title: "Order Complete - Thank You",
    description: "Your order has been successfully processed. Thank you for your purchase!",
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
    title: "Order Complete - Thank You",
    description: "Your order has been successfully processed. Thank you for your purchase!",
    images: ["https://www.jomocousins.com/images/og-image.webp"],
    creator: "@pastorjomo",
  },
};
