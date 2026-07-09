import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import { urlForImage, urlForProductImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/(home)/portable-text";
import ProductActions from "./ProductActions";
import ProductStructuredData from "./product-structured-data";
import BookPreview from "./book-preview";
import ProductImageGallery from "./ProductImageGallery";

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

  // Related products for internal linking (kills the dead-end product page)
  const relatedProducts = await sanityFetch({
    query: relatedProductsQuery,
    params: { slug, category: product.category ?? "" },
  });

  // Prepare images for gallery - size based on actual display needs
  const isApparel = product.category === "tshirts" || product.category === "hoodies";
  const imageWidth = isApparel ? 900 : 1200; // Apparel displays smaller

  const galleryImages = product.images?.map((image: any) => ({
    url: urlForProductImage(image)?.width(imageWidth).url() || "",
    alt: image.alt || product.name,
  })) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */ }
      <ProductStructuredData product={ product } />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb Navigation */ }
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/products" className="text-gray-600 hover:text-[#e31e24] transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li aria-current="page">
              <span className="text-[#2d2d2d] font-semibold">{ product.name }</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */ }
          <div className="space-y-4">
            <ProductImageGallery images={galleryImages} productName={product.name || "Product"} category={product.category} />

            {/* Free Preview Badge - Only for books with preview chapter */ }
            { product.previewChapter && (
              <Link
                href={ `/books/${slug}/preview` }
                className="block mt-6 bg-gradient-to-br from-[#e31e24] to-[#c41a1f] rounded-xl p-6 text-center text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-wider">Free Preview</span>
                </div>
                <p className="text-lg font-bold mb-1">Read Before You Buy</p>

              </Link>
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
            {/* { product.category === "books" && product.excerpt && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-3">
                  About This Book
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  { product.excerpt }
                </p>
              </div>
            ) } */}

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
      { product.previewChapter && (
        <div id="preview-section">
          <BookPreview
            previewChapter={ product.previewChapter }
            bookTitle={ product.name || "" }
            bookSlug={ slug }
          />
        </div>
      ) }

      {/* Related Products - internal linking for SEO */ }
      { relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold text-[#2d2d2d]">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              { relatedProducts.map((related: any) => {
                const relatedImage = related.images?.[ 0 ]
                  ? urlForImage(related.images[ 0 ])?.width(500).height(500).url()
                  : null;
                return (
                  <Link
                    key={ related._id }
                    href={ `/products/${related.slug}` }
                    className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      { relatedImage && (
                        <Image
                          src={ relatedImage }
                          alt={ related.images?.[ 0 ]?.alt || related.name }
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) }
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 line-clamp-2 font-bold text-[#2d2d2d] transition-colors group-hover:text-[#e31e24]">
                        { related.name }
                      </h3>
                      <p className="font-semibold text-[#e31e24]">${ (related.basePrice || 0).toFixed(2) }</p>
                    </div>
                  </Link>
                );
              }) }
            </div>
          </div>
        </section>
      ) }

      {/* Cross-section discovery CTA - de-silos shop from prayer & marriage */ }
      <section className="border-t border-gray-100 bg-white py-14">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#2d2d2d]">
            Explore More from Dr. Jomo Cousins
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Link
              href="/prayer"
              className="group rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#e31e24] hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold text-[#2d2d2d] group-hover:text-[#e31e24]">
                Prayer Library →
              </h3>
              <p className="text-sm text-gray-600">
                On-demand prayer videos for healing, finances, anxiety, and more.
              </p>
            </Link>
            <Link
              href="/marriage/blog"
              className="group rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#e31e24] hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold text-[#2d2d2d] group-hover:text-[#e31e24]">
                Couples&apos; Corner →
              </h3>
              <p className="text-sm text-gray-600">
                Faith-based marriage and relationship advice from Jomo &amp; Charmaine.
              </p>
            </Link>
          </div>
        </div>
      </section>
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

  // Clamp the meta description to ~155 chars on a word boundary (no mid-word cuts).
  const clamp = (text: string, max = 155) => {
    const t = text.replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
  };
  const description = clamp(getDescription());

  // Get product image
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).height(630).url()
    : `${baseUrl}/images/og-image.jpg`;

  // Build a <title> that stays under ~60 chars: book name first, then the most
  // descriptive suffix that still fits (falls back to shorter branding).
  const name = product.name?.trim() || "Product";
  const longSuffix =
    product.category === "books" ? "Book by Dr. Jomo Cousins" : "Dr. Jomo Cousins";
  const withLongSuffix = `${name} — ${longSuffix}`;
  const withShortSuffix = `${name} — Dr. Jomo Cousins`;
  const fullTitle =
    withLongSuffix.length <= 60
      ? withLongSuffix
      : withShortSuffix.length <= 60
        ? withShortSuffix
        : name.length <= 60
          ? name
          : `${name.slice(0, 59).trimEnd()}…`;

  return {
    title: fullTitle,
    description,
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
      description,
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
      description,
      images: [ imageUrl || "" ],
      creator: "@pastorjomo",
    },
    alternates: {
      canonical: productUrl,
    },
  };
}
