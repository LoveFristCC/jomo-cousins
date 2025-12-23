"use client";

import { useState } from "react";
import Image from "next/image";
import type { DigitalProductByPositionQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/(home)/portable-text";

interface UpsellOfferProps {
  product: DigitalProductByPositionQueryResult;
  customerEmail: string;
  customerName: string;
  sessionId?: string;
}

/**
 * Upsell offer component
 * Displays a special offer for a digital product with accept/decline options
 */
export default function UpsellOffer({
  product,
  customerEmail,
  customerName,
  sessionId,
}: UpsellOfferProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create checkout session for the upsell
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.name || 'Digital Product',
          price: product.price || 0,
          quantity: 1,
          productType: "digital",
          kajabiOfferId: product.kajabiOfferId,
          stripePriceId: product.stripePriceId,
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
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    // Redirect to second upsell page (product recommendations)
    if (sessionId) {
      window.location.href = `/thank-you/upsell-2?session_id=${sessionId}`;
    } else {
      window.location.href = "/thank-you/complete";
    }
  };

  const basePrice = product.price || 0;
  const discountedPrice = product.discount
    ? basePrice * (1 - product.discount / 100)
    : basePrice;

  return (
    <div className="border-2 border-blue-500 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-white">
      {/* Special offer badge */}
      <div className="text-center mb-6">
        <span className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg">
          🎉 Special One-Time Offer
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product image */}
        {product.image && (
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={urlForImage(product.image)?.width(500).height(500).url() || ""}
              alt={product.image.alt || product.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Offer details */}
        <div className="flex flex-col justify-center">
          {/* Headline */}
          <h2 className="text-3xl font-bold mb-2">{product.headline || product.name || 'Special Offer'}</h2>

          {/* Subheadline */}
          {product.subheadline && (
            <p className="text-xl text-gray-600 mb-6">{product.subheadline}</p>
          )}

          {/* Bullet points */}
          {product.bulletPoints && product.bulletPoints.length > 0 && (
            <ul className="space-y-3 mb-6">
              {product.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Price */}
          <div className="mb-6">
            {product.discount && product.discount > 0 ? (
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${basePrice.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Save ${(basePrice - discountedPrice).toFixed(2)} today!
                </p>
              </div>
            ) : (
              <span className="text-3xl font-bold">${basePrice.toFixed(2)}</span>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="w-full py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Processing..."
                : product.ctaText || `Yes, Add This for $${discountedPrice.toFixed(2)}!`}
            </button>

            <button
              onClick={handleDecline}
              disabled={isLoading}
              className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              No Thanks, I'll Pass
            </button>
          </div>

          {/* Urgency message */}
          <p className="text-center text-sm text-gray-500 mt-4">
            ⏰ This offer is only available on this page
          </p>
        </div>
      </div>

      {/* Product description */}
      {product.description && (
        <div className="mt-8 pt-8 border-t prose max-w-none">
          <CustomPortableText value={product.description as any} />
        </div>
      )}
    </div>
  );
}
