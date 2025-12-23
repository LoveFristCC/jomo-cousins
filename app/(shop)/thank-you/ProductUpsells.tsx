"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

interface UpsellProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  images?: Array<{
    alt?: string;
    asset?: any;
  }>;
  basePrice: number;
  excerpt?: string;
  author?: string;
  status: string;
  stripePriceId?: string;
  weight?: number;
  variants?: Array<{
    sku: string;
    size?: string;
    color?: string;
    inventory: number;
  }>;
}

interface ProductUpsellsProps {
  upsells?: UpsellProduct[];
  headline?: string;
}

/**
 * Product upsells component with one-click purchase
 * Displays related products and handles instant checkout
 */
export default function ProductUpsells({
  upsells,
  headline,
}: ProductUpsellsProps) {
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter out inactive products and limit to 4
  const activeUpsells = upsells?.filter((p) => p.status === "active").slice(0, 4);

  if (!activeUpsells || activeUpsells.length === 0) return null;

  const handleBuyNow = async (product: UpsellProduct) => {
    setLoadingProduct(product._id);
    setError(null);

    try {
      // Get first available variant or use default values
      const firstVariant = product.variants?.[0];

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.name,
          price: product.basePrice,
          quantity: 1,
          productType: "physical",
          variantSku: firstVariant?.sku || `${product.slug}-default`,
          size: firstVariant?.size,
          color: firstVariant?.color,
          weight: product.weight || 16, // Default 1 lb
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
      setLoadingProduct(null);
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
              {headline || "You Might Also Like"}
            </h2>
            <p className="text-xl text-gray-600">
              Complete your collection with these recommendations
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Upsell Products Grid */}
          <div
            className={`grid gap-6 ${
              activeUpsells.length === 1
                ? "md:grid-cols-1 max-w-md mx-auto"
                : activeUpsells.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : activeUpsells.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {activeUpsells.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#e31e24] transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  {product.images?.[0] && (
                    <Image
                      src={
                        urlForImage(product.images[0])?.width(400).height(400).url() || ""
                      }
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-[#2d2d2d] text-white text-xs font-bold uppercase tracking-wide rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#2d2d2d] mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Author for books */}
                  {product.category === "books" && product.author && (
                    <p className="text-sm text-gray-600 mb-2">
                      by {product.author}
                    </p>
                  )}

                  {/* Excerpt */}
                  {product.excerpt && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.excerpt.substring(0, 100)}...
                    </p>
                  )}

                  {/* Price and Buy Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-[#e31e24] mb-3">
                      ${product.basePrice.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleBuyNow(product)}
                      disabled={loadingProduct === product._id}
                      className="w-full py-3 bg-[#e31e24] text-white rounded-lg font-bold text-lg hover:bg-[#c41a1f] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {loadingProduct === product._id ? (
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
                        "Buy Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
