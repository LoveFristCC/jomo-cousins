"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

interface DigitalProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  isSubscription: boolean;
  subscriptionInterval?: string;
  firstMonthPrice?: number;
  stripePriceId?: string;
  headline: string;
  subheadline?: string;
  bulletPoints?: string[];
  image?: {
    alt?: string;
    asset?: any;
  };
  discount?: number;
  ctaText?: string;
}

interface DigitalProductUpsellProps {
  product: DigitalProduct;
  currentSessionId?: string;
  customerId?: string;
}

/**
 * Digital product upsell component
 * Displays digital products (courses, coaching, etc.) with special pricing
 */
export default function DigitalProductUpsell({
  product,
  currentSessionId,
  customerId,
}: DigitalProductUpsellProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.name,
          price: product.firstMonthPrice || product.price,
          quantity: 1,
          productType: "digital",
          stripePriceId: product.stripePriceId,
          isSubscription: product.isSubscription,
          subscriptionInterval: product.subscriptionInterval,
          returnSessionId: currentSessionId,
          customerId: customerId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleDecline = () => {
    // Redirect to complete page
    window.location.href = `/thank-you/complete?session_id=${currentSessionId}${customerId ? `&customer_id=${customerId}` : ''}`;
  };

  const imageUrl = product.image
    ? urlForImage(product.image)?.width(800).height(800).url()
    : null;

  // Calculate original price if there's a discount
  const originalPrice = product.discount
    ? product.price / (1 - product.discount / 100)
    : null;

  const displayPrice = product.firstMonthPrice || product.price;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left: Product Image */}
          <div className="flex items-center justify-center">
            {imageUrl ? (
              <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={imageUrl}
                  alt={product.image?.alt || product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square max-w-md rounded-2xl bg-gray-700 flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center text-white">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {product.headline}
            </h2>

            {/* Subheadline */}
            {product.subheadline && (
              <p className="text-xl text-gray-300 mb-6">
                {product.subheadline}
              </p>
            )}

            {/* Pricing */}
            <div className="mb-6">
              {product.discount && originalPrice && (
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="px-4 py-2 bg-[#e31e24] text-white font-bold rounded-full text-sm">
                    {product.discount}% OFF
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-5xl md:text-6xl font-bold text-[#e31e24]">
                  ${displayPrice.toFixed(2)}
                </span>
                {product.isSubscription && (
                  <span className="text-xl text-gray-400">
                    /{product.subscriptionInterval}
                    {product.firstMonthPrice && (
                      <span className="block text-sm mt-1">
                        Then ${product.price.toFixed(2)}/{product.subscriptionInterval}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Bullet Points */}
            {product.bulletPoints && product.bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8">
                {product.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#e31e24] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-200 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAccept}
                disabled={loading}
                className="flex-1 py-4 px-8 bg-[#e31e24] text-white rounded-lg font-bold text-xl hover:bg-[#c41a1f] transition-all disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  product.ctaText || "Yes, Add This!"
                )}
              </button>

              <button
                onClick={handleDecline}
                disabled={loading}
                className="py-4 px-8 bg-transparent border-2 border-gray-500 text-gray-300 rounded-lg font-bold text-lg hover:bg-gray-800 hover:border-gray-400 transition-all disabled:opacity-50"
              >
                No Thanks
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Payment
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Money-Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
