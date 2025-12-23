import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/(home)/portable-text";

/**
 * Dedicated free chapter preview page
 * Provides a clean reading experience with strong CTAs to purchase the book
 * Each preview chapter gets its own URL for SEO and sharing
 */
export default async function BookPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  // Verify this is a book with a preview chapter
  if (
    !product ||
    !product.previewChapter?.content
  ) {
    notFound();
  }

  const { previewChapter } = product;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header with book info and CTA */ }
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Book info */ }
            <div className="flex items-center gap-4">
              { product.images?.[ 0 ] && (
                <div className="relative w-12 h-16 rounded overflow-hidden shadow-md hidden sm:block">
                  <Image
                    src={ urlForImage(product.images[ 0 ])?.width(100).url() || "" }
                    alt={ product.name || "" }
                    fill
                    className="object-cover"
                  />
                </div>
              ) }
              <div>
                <Link
                  href={ `/products/${slug}` }
                  className="text-sm text-gray-600 hover:text-[#e31e24] transition-colors"
                >
                  ← Back to { product.name }
                </Link>
                <p className="text-xs text-gray-500 hidden sm:block">
                  by { product.author || "Dr. Jomo Cousins" }
                </p>
              </div>
            </div>

            {/* Sticky CTA */ }
            <Link
              href={ `/products/${slug}#add-to-cart` }
              className="inline-block rounded-lg bg-[#e31e24] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] whitespace-nowrap"
            >
              Get Full Book
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */ }
      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Preview Badge */ }
          <div className="text-center mb-8">
            <span className="inline-block bg-gradient-to-r from-[#e31e24] to-[#c41a1f] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
              📖 Free Preview Chapter
            </span>
          </div>

          {/* Chapter Title */ }
          <header className="text-center mb-12 pb-8 border-b-2 border-gray-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d] mb-4 leading-tight">
              { previewChapter.chapterNumber
                ? `Chapter ${previewChapter.chapterNumber}: `
                : "" }
              { previewChapter.title }
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-4">
              From <span className="font-bold text-[#2d2d2d]">{ product.name }</span>
            </p>
            <p className="text-lg text-gray-500 mt-2">
              by { product.author || "Dr. Jomo Cousins" }
            </p>
          </header>

          {/* Chapter Content - Fully Indexable by Google */ }
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="prose prose-lg md:prose-xl max-w-none">
              <CustomPortableText value={ previewChapter.content as any } />
            </div>
          </div>

          {/* End of Preview CTA */ }
          <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Want to Keep Reading?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                This is just one chapter from <strong className="text-white">{ product.name }</strong>.
                Get the complete book and discover { product.pageCount ? `${product.pageCount} pages of ` : "" }
                powerful insights, practical wisdom, and life-changing guidance from Dr. Jomo Cousins.
              </p>

              {/* Book excerpt/benefits */ }
              { product.excerpt && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-left">
                  <h3 className="text-lg font-bold mb-3">What You'll Get:</h3>
                  <p className="text-gray-200 leading-relaxed">
                    { product.excerpt.substring(0, 200) }
                    { product.excerpt.length > 200 ? "..." : "" }
                  </p>
                </div>
              ) }

              {/* CTA Buttons */ }
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href={ `/products/${slug}` }
                  className="w-full sm:w-auto inline-block rounded-lg bg-[#e31e24] px-10 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                >
                  Get the Full Book - ${ product.basePrice?.toFixed(2) }
                </Link>

                { (product.amazonLink || product.audibleLink) && (
                  <div className="flex gap-3">
                    { product.amazonLink && (
                      <a
                        href={ product.amazonLink }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-4 bg-[#FF9900] text-white font-bold rounded-lg hover:bg-[#e88b00] transition-all hover:scale-105 shadow-lg"
                        title="Buy on Amazon"
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
                        className="inline-flex items-center gap-2 px-6 py-4 bg-[#F5792A] text-white font-bold rounded-lg hover:bg-[#dc6b25] transition-all hover:scale-105 shadow-lg"
                        title="Listen on Audible"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                        </svg>
                        Audible
                      </a>
                    ) }
                  </div>
                ) }
              </div>

              {/* Trust indicators */ }
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-gray-400">
                  ✓ Secure checkout &nbsp;•&nbsp; ✓ Money-back guarantee
                </p>
              </div>
            </div>
          </div>

          {/* About the Author */ }
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#2d2d2d] mb-4">
              About the Author
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Dr. Jomo Cousins</strong> is a renowned motivational speaker, pastor, and author
              who has inspired thousands through his powerful messages of faith, purpose, and personal
              transformation. As a former NFL player and founder of Love First Christian Center,
              Dr. Cousins brings a unique perspective on achieving success while staying grounded in
              spiritual principles.
            </p>
            <Link
              href="/about"
              className="text-[#e31e24] font-semibold hover:underline"
            >
              Learn more about Dr. Jomo Cousins →
            </Link>
          </div>

          {/* SEO-friendly hidden content */ }
          <div className="sr-only">
            <p>
              This is a free preview chapter from "{ product.name }" by { product.author || "Dr. Jomo Cousins" }.
              The complete book is available for purchase and contains additional chapters with insights on
              personal growth, spiritual development, faith, motivation, and achieving your God-given purpose.
              { product.isbn && ` ISBN: ${product.isbn}.` }
              { product.pageCount && ` The book contains ${product.pageCount} pages.` }
              Purchase the full book to access all chapters and transform your life today.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

/**
 * Generate metadata for SEO
 * Each preview chapter gets optimized metadata for search engines
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

  if (!product || !product.previewChapter) {
    return {
      title: "Preview Not Found",
    };
  }

  const baseUrl = "https://www.jomocousins.com";
  const previewUrl = `${baseUrl}/books/${slug}/preview`;
  const { previewChapter } = product;

  const title = `${previewChapter.title} - Free Chapter from ${product.name}`;
  const description = `Read a free preview chapter from "${product.name}" by ${product.author || "Dr. Jomo Cousins"}. ${product.excerpt?.substring(0, 100) || "Discover powerful insights on faith, purpose, and personal transformation."}`;

  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).height(630).url()
    : `${baseUrl}/images/og-image.jpg`;

  return {
    title,
    description,
    keywords: [
      product.name || "",
      previewChapter.title || "",
      product.author || "Dr. Jomo Cousins",
      "free chapter",
      "book preview",
      "Christian book",
      "motivational book",
      "spiritual growth",
      "personal development",
      "faith",
      "inspiration",
    ].filter(Boolean),
    authors: [ { name: product.author || "Dr. Jomo Cousins" } ],
    openGraph: {
      type: "article",
      url: previewUrl,
      title,
      description,
      images: [
        {
          url: imageUrl || "",
          width: 1200,
          height: 630,
          alt: `Preview of ${product.name}`,
        },
      ],
      article: {
        authors: [ product.author || "Dr. Jomo Cousins" ],
        tags: [ "book preview", "free chapter", "Christian book", "motivational" ],
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ imageUrl || "" ],
      creator: "@pastorjomo",
    },
    alternates: {
      canonical: previewUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}
