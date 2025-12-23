import Link from "next/link";
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
}

interface ProductUpsellsProps {
  upsells?: UpsellProduct[];
  headline?: string;
}

/**
 * Product upsells component
 * Displays related products to encourage additional purchases
 */
export default function ProductUpsells({
  upsells,
  headline,
}: ProductUpsellsProps) {
  // Filter out inactive products and limit to 4
  const activeUpsells = upsells?.filter((p) => p.status === "active").slice(0, 4);

  if (!activeUpsells || activeUpsells.length === 0) return null;

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
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#e31e24]"
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
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
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
                  <h3 className="font-bold text-lg text-[#2d2d2d] mb-2 line-clamp-2 group-hover:text-[#e31e24] transition-colors">
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

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-[#e31e24]">
                      ${product.basePrice.toFixed(2)}
                    </div>
                    <div className="text-sm font-bold text-[#2d2d2d] group-hover:text-[#e31e24] transition-colors flex items-center gap-1">
                      View
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block text-[#2d2d2d] font-semibold hover:text-[#e31e24] transition-colors border-b-2 border-[#2d2d2d] hover:border-[#e31e24] pb-1"
            >
              Browse All Products →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
