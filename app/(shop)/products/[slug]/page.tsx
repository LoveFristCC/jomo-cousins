import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/(home)/portable-text";
import ProductActions from "./ProductActions";
import ProductStructuredData from "./product-structured-data";
import BookPreview from "./book-preview";

/**
 * Product detail page with variant selection
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */ }
      <ProductStructuredData product={ product } />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */ }
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/products" className="text-gray-600 hover:text-[#e31e24] transition-colors">
            Products
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#2d2d2d] font-semibold">{ product.name }</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */ }
          <div className="space-y-4">
            {/* Main image */ }
            { product.images && product.images.length > 0 && (
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={
                    urlForImage(product.images[ 0 ])?.width(800).url() || ""
                  }
                  alt={ product.images[ 0 ].alt || product.name }
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            ) }

            {/* Thumbnail gallery */ }
            { product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                { product.images.slice(1, 5).map((image: any, idx: number) => (
                  <div
                    key={ idx }
                    className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#e31e24] transition-all shadow-md"
                  >
                    <Image
                      src={ urlForImage(image)?.width(200).height(200).url() || "" }
                      alt={ image.alt || `${product.name || 'Product'} ${idx + 2}` }
                      fill
                      className="object-cover"
                    />
                  </div>
                )) }
              </div>
            ) }
          </div>

          {/* Product Info & Actions */ }
          <div className="space-y-6">
            {/* Category badge */ }
            <div>
              <span className="inline-block px-4 py-2 bg-[#2d2d2d] text-white rounded-full text-sm font-bold uppercase tracking-wide">
                { product.category }
              </span>
            </div>

            {/* Product name */ }
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              { product.name || 'Untitled Product' }
            </h1>

            {/* Price */ }
            <div className="text-4xl md:text-5xl font-bold text-[#e31e24]">
              ${ (product.basePrice || 0).toFixed(2) }
            </div>

            {/* Book Excerpt for SEO */ }
            { product.category === "books" && product.excerpt && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-3">
                  About This Book
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  { product.excerpt }
                </p>
              </div>
            ) }

            {/* Description */ }
            { product.description && (
              <div id="description">
                <CustomPortableText
                  value={ product.description as any }
                  className="prose-lg max-w-none text-gray-700 leading-relaxed"
                />
              </div>
            ) }

            {/* Variant selector and add to cart - Client Component */ }
            <div data-add-to-cart>
              <ProductActions product={ product } />
            </div>

            {/* Book Purchase Links */ }
            { product.category === "books" && (product.amazonLink || product.audibleLink) && (
              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-4">
                  Also Available On
                </h3>
                <div className="flex flex-wrap gap-3">
                  { product.amazonLink && (
                    <a
                      href={ product.amazonLink }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9900] text-white font-semibold rounded-lg hover:bg-[#e88b00] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.09.48-.315.255-.69.48-1.125.674-1.93.873-3.916 1.395-5.96 1.56l-.48.03c-2.04 0-3.87-.277-5.49-.83-1.622-.552-3.19-1.456-4.704-2.71-.06-.05-.125-.113-.195-.19-.264-.277-.222-.48.127-.61z" />
                      </svg>
                      Amazon
                    </a>
                  ) }
                  { product.audibleLink && (
                    <a
                      href={ product.audibleLink }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5792A] text-white font-semibold rounded-lg hover:bg-[#dc6b25] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                      </svg>
                      Audible
                    </a>
                  ) }
                </div>
              </div>
            ) }
          </div>
        </div>
      </div>

      {/* Free Preview Chapter for Books - Critical for SEO */ }
      { product.category === "books" && product.previewChapter && (
        <BookPreview
          previewChapter={ product.previewChapter }
          bookTitle={ product.name || "" }
        />
      ) }
    </div>
  );
}

/**
 * Generate metadata for SEO
 * Enhanced with rich descriptions, images, and book-specific data
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const baseUrl = "https://www.jomocousins.com";
  const productUrl = `${baseUrl}/products/${product.slug}`;

  // Extract description from various sources
  const getDescription = () => {
    if (product.excerpt) return product.excerpt;
    if (typeof product.description === "string") return product.description;
    if (product.description?.[ 0 ]?.children?.[ 0 ]?.text) {
      return product.description[ 0 ].children[ 0 ].text;
    }
    return `${product.name} by Dr. Jomo Cousins. Available now.`;
  };

  const description = getDescription();

  // Get product image
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).height(630).url()
    : `${baseUrl}/images/og-image.jpg`;

  // Build title based on category
  const titleSuffix =
    product.category === "books" ? "Book by Dr. Jomo Cousins" : "Shop";
  const fullTitle = `${product.name} - ${titleSuffix}`;

  return {
    title: fullTitle,
    description: description.substring(0, 160), // Optimal length for meta description
    keywords: [
      product.name,
      "Dr. Jomo Cousins",
      product.category,
      ...(product.category === "books"
        ? [
          "Christian book",
          "motivational book",
          "spiritual growth",
          "personal development",
          "faith-based book",
        ]
        : []),
      ...(product.author ? [ product.author ] : []),
    ],
    authors: product.author ? [ { name: product.author } ] : undefined,
    openGraph: {
      type: product.category === "books" ? "book" : "website",
      url: productUrl,
      title: fullTitle,
      description: description.substring(0, 160),
      images: [
        {
          url: imageUrl || "",
          width: 1200,
          height: 630,
          alt: product.images?.[ 0 ]?.alt || product.name,
        },
      ],
      ...(product.category === "books" &&
        product.isbn && {
        book: {
          isbn: product.isbn,
          authors: [ product.author || "Dr. Jomo Cousins" ],
          ...(product.publicationDate && {
            releaseDate: product.publicationDate,
          }),
        },
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description.substring(0, 160),
      images: [ imageUrl || "" ],
      creator: "@pastorjomo",
    },
    alternates: {
      canonical: productUrl,
    },
  };
}
