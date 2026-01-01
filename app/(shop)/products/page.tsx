import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery } from "@/sanity/lib/queries";
import type { AllProductsQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import CategoryFilters from "./CategoryFilters";

export const metadata: Metadata = {
  title: "Shop Books & Products | Dr. Jomo Cousins",
  description: "Shop Dr. Jomo Cousins' books, apparel, and inspirational products. Discover resources for personal growth, spiritual development, and success.",
  keywords: [
    "Dr. Jomo Cousins books",
    "motivational speaker books",
    "Christian books",
    "The Gap book",
    "inspirational merchandise",
    "faith-based products",
    "personal development books",
    "spiritual growth resources",
    "Tampa pastor books",
    "NFL motivational books"
  ],
  alternates: {
    canonical: "https://www.jomocousins.com/products",
  },
  openGraph: {
    title: "Shop Dr. Jomo Cousins Books & Products",
    description: "Browse books, apparel, and inspirational products by Dr. Jomo Cousins. Resources for growth, faith, and transformation.",
    url: "https://www.jomocousins.com/products",
    type: "website",
    siteName: "Dr. Jomo Cousins",
    images: [
      {
        url: "/images/backgrounds/P1122310B_edited.webp",
        width: 1200,
        height: 630,
        alt: "Shop Dr. Jomo Cousins Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Dr. Jomo Cousins Books & Products",
    description: "Books, apparel, and resources for personal growth and spiritual development.",
    creator: "@pastorjomo",
    images: ["/images/backgrounds/P1122310B_edited.webp"],
  },
};

/**
 * Product listing page with category filtering
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const allProducts = await sanityFetch({
    query: allProductsQuery,
  });

  // Filter products based on selected category
  const filteredProducts = category
    ? allProducts.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : allProducts;

  // Separate featured and regular products
  const featuredProducts = filteredProducts.filter((p) => p.featured);
  const regularProducts = filteredProducts.filter((p) => !p.featured).sort((a, b) =>
    (a.name || '').localeCompare(b.name || '')
  );

  // Structured Data for product listing
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jomocousins.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://www.jomocousins.com/products",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.jomocousins.com/products",
        url: "https://www.jomocousins.com/products",
        name: "Shop Dr. Jomo Cousins Books & Products",
        description: "Browse books, apparel, and inspirational products by Dr. Jomo Cousins.",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: filteredProducts.length,
          itemListElement: filteredProducts.slice(0, 20).map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": product.category === "books" ? "Book" : "Product",
              "@id": `https://www.jomocousins.com/products/${product.slug}`,
              name: product.name,
              url: `https://www.jomocousins.com/products/${product.slug}`,
              image: product.images?.[0] ? urlForImage(product.images[0])?.width(1200).url() : undefined,
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: (product.basePrice || 0).toFixed(2),
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section with Background Image */ }
      <div className="relative bg-[#2d2d2d] text-white overflow-hidden">
        {/* Background Image with Overlay */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/P1122310B_edited.webp"
            alt="Shop Background"
            fill
            className="object-cover opacity-40 object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d2d2d]/90 to-[#2d2d2d]/60"></div>
        </div>

        {/* Hero Content */ }
        <div className="relative container mx-auto px-4 py-32 md:py-48">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              Shop <span className="text-[#e31e24]">Dr. Jomo Cousins</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200">
              Browse our collection of books, apparel, and accessories to support your journey of growth and empowerment.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category filters */ }
        <CategoryFilters activeCategory={ category } />

        {/* Active filter indicator */ }
        { category && (
          <div className="mb-8 flex items-center gap-3">
            <span className="text-gray-600">Filtered by:</span>
            <span className="px-4 py-2 bg-[#e31e24] text-white rounded-full font-semibold capitalize">
              { category }
            </span>
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-[#e31e24] underline"
            >
              Clear filter
            </Link>
          </div>
        ) }

        {/* Featured Products Section */ }
        { featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <svg className="h-8 w-8 text-[#e31e24]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-3xl font-bold text-[#2d2d2d]">
                Featured <span className="text-[#e31e24]">Products</span>
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
              { featuredProducts.map((product) => (
                <li key={ product._id }>
                  <FeaturedProductCard product={ product } />
                </li>
              )) }
            </ul>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"></div>
          </section>
        ) }

        {/* Products count */ }
        <div className="mb-8 text-gray-600">
          { featuredProducts.length > 0 && (
            <span className="font-semibold text-[#2d2d2d]">{ featuredProducts.length }</span>
          ) }
          { featuredProducts.length > 0 && ' featured · ' }
          <span className="font-semibold text-[#2d2d2d]">{ regularProducts.length }</span> other product{ regularProducts.length !== 1 ? 's' : '' }
        </div>

        {/* Regular Products grid */ }
        <Suspense fallback={ <ProductsGridSkeleton /> }>
          { regularProducts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              { regularProducts.map((product) => (
                <li key={ product._id }>
                  <ProductCard product={ product } />
                </li>
              )) }
            </ul>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-4">
                <svg className="h-20 w-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-xl text-gray-600">
                { category ? `No ${category} available at this time.` : 'No products available at this time.' }
              </p>
              <p className="text-gray-500 mt-2">Check back soon for new items!</p>
              { category && (
                <Link
                  href="/products"
                  className="mt-6 inline-block px-6 py-3 bg-[#e31e24] text-white rounded-lg font-semibold hover:bg-[#c41a1f] transition-all"
                >
                  View All Products
                </Link>
              ) }
            </div>
          ) : null }
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Featured product card component with enhanced styling
 */
function FeaturedProductCard({ product }: { product: AllProductsQueryResult[ number ] }) {
  // Calculate total inventory across all variants
  const totalInventory = product.variants?.reduce(
    (sum, variant) => sum + (variant.inventory || 0),
    0
  ) || 0;

  // Determine stock status
  const isLowStock =
    product.trackInventory && totalInventory <= product.lowStockThreshold;
  const isOutOfStock = product.trackInventory && totalInventory === 0;

  // Get the first product image
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).url()
    : null;

  return (
    <Link
      href={ `/products/${product.slug || ''}` }
      className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#e31e24]/20"
    >
      {/* Product image */ }
      <div className="relative aspect-square bg-white overflow-hidden">
        { imageUrl ? (
          <Image
            src={ imageUrl }
            alt={ product.images[ 0 ].alt || product.name }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={ 95 }
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) }

        {/* Featured badge */ }
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#e31e24] to-[#c41a1f] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Featured
        </div>

        {/* Stock status badge */ }
        { isOutOfStock && (
          <div className="absolute top-16 right-4 bg-[#e31e24] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Out of Stock
          </div>
        ) }
        { !isOutOfStock && isLowStock && (
          <div className="absolute top-16 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Low Stock
          </div>
        ) }

        {/* Category badge */ }
        <div className="absolute top-4 left-4 bg-[#2d2d2d] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase">
          { product.category }
        </div>
      </div>

      {/* Product info */ }
      <div className="p-6">
        <h3 className="font-bold text-2xl mb-3 text-[#2d2d2d] group-hover:text-[#e31e24] transition-colors line-clamp-2">
          { product.name || 'Untitled' }
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-3xl font-bold text-[#e31e24]">
            ${ (product.basePrice || 0).toFixed(2) }
          </span>

          { product.variants && product.variants.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              { product.variants.length } option{ product.variants.length > 1 ? "s" : "" }
            </span>
          ) }
        </div>

        {/* View Details button */ }
        <div className="mt-6 flex items-center justify-center bg-[#e31e24] text-white font-semibold text-sm py-3 px-6 rounded-lg group-hover:bg-[#c41a1f] transition-colors">
          View Details
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * Individual product card component
 */
function ProductCard({ product }: { product: AllProductsQueryResult[ number ] }) {
  // Calculate total inventory across all variants
  const totalInventory = product.variants?.reduce(
    (sum, variant) => sum + (variant.inventory || 0),
    0
  ) || 0;

  // Determine stock status
  const isLowStock =
    product.trackInventory && totalInventory <= product.lowStockThreshold;
  const isOutOfStock = product.trackInventory && totalInventory === 0;

  // Get the first product image
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1000).url()
    : null;

  return (
    <Link
      href={ `/products/${product.slug || ''}` }
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Product image */ }
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        { imageUrl ? (
          <Image
            src={ imageUrl }
            alt={ product.images[ 0 ].alt || product.name }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={ 95 }
            className="object-cover object-top p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) }

        {/* Stock status badge */ }
        { isOutOfStock && (
          <div className="absolute top-3 right-3 bg-[#e31e24] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Out of Stock
          </div>
        ) }
        { !isOutOfStock && isLowStock && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Low Stock
          </div>
        ) }

        {/* Category badge */ }
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#2d2d2d] px-3 py-1 rounded-full text-xs font-semibold uppercase">
          { product.category }
        </div>
      </div>

      {/* Product info */ }
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-[#2d2d2d] group-hover:text-[#e31e24] transition-colors line-clamp-2">
          { product.name || 'Untitled' }
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-[#2d2d2d]">
            ${ (product.basePrice || 0).toFixed(2) }
          </span>

          { product.variants && product.variants.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              { product.variants.length } option{ product.variants.length > 1 ? "s" : "" }
            </span>
          ) }
        </div>

        {/* View Details button hint */ }
        <div className="mt-4 flex items-center text-[#e31e24] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          View Details
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * Loading skeleton for products grid
 */
function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      { [ ...Array(8) ].map((_, i) => (
        <div key={ i } className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="flex items-center justify-between mt-4">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )) }
    </div>
  );
}
