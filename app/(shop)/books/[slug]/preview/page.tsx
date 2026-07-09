import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery, booksWithPreviewsQuery } from "@/sanity/lib/queries";
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

  // Fetch all other books with preview chapters for interlinking
  const allBooksWithPreviews = await sanityFetch({
    query: booksWithPreviewsQuery,
  });

  // Filter out the current book
  const otherPreviews = allBooksWithPreviews.filter(
    (book: any) => book.slug !== slug
  );

  // Structured Data for book preview
  const baseUrl = "https://www.jomocousins.com";
  const previewUrl = `${baseUrl}/books/${slug}/preview`;
  const productUrl = `${baseUrl}/products/${slug}`;
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).height(1200).url()
    : undefined;

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
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${baseUrl}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Preview Chapter",
            item: previewUrl,
          },
        ],
      },
      {
        "@type": "Book",
        "@id": productUrl,
        name: product.name,
        author: {
          "@type": "Person",
          name: product.author || "Dr. Jomo Cousins",
          url: baseUrl,
        },
        ...(product.isbn && { isbn: product.isbn }),
        ...(product.publisher && {
          publisher: {
            "@type": "Organization",
            name: product.publisher,
          },
        }),
        ...(product.publicationDate && { datePublished: product.publicationDate }),
        ...(product.pageCount && { numberOfPages: product.pageCount }),
        bookFormat: "https://schema.org/Paperback",
        inLanguage: "en-US",
        url: productUrl,
        image: imageUrl,
        description: product.excerpt || product.description?.[ 0 ]?.children?.[ 0 ]?.text || "",
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "USD",
          price: (product.basePrice || 0).toFixed(2),
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Person",
            name: "Dr. Jomo Cousins",
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": previewUrl,
        url: previewUrl,
        name: `${previewChapter.title} - Free Preview Chapter from ${product.name}`,
        description: `Read a free preview chapter from "${product.name}" by ${product.author || "Dr. Jomo Cousins"}.`,
        isPartOf: {
          "@type": "Book",
          "@id": productUrl,
        },
        about: {
          "@type": "Book",
          "@id": productUrl,
        },
      },
      {
        "@type": "Article",
        headline: previewChapter.title,
        name: `${previewChapter.chapterNumber ? `Chapter ${previewChapter.chapterNumber}: ` : ""}${previewChapter.title}`,
        author: {
          "@type": "Person",
          name: product.author || "Dr. Jomo Cousins",
          url: baseUrl,
        },
        isPartOf: {
          "@type": "Book",
          "@id": productUrl,
          name: product.name,
        },
        url: previewUrl,
        image: imageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Structured Data */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } }
      />
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
                    className="object-cover object-top"
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
        </div>

        {/* Other Free Previews - Interlinking (Wider Section) */ }
        { otherPreviews.length > 0 && (
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-2">
                  📚 Read More Free Previews
                </h3>
                <p className="text-gray-600">
                  Discover other books by Dr. Jomo Cousins with free preview chapters
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                { otherPreviews.map((book: any) => (
                  <Link
                    key={ book._id }
                    href={ `/books/${book.slug}/preview` }
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#e31e24]"
                  >
                    { book.images?.[ 0 ] && (
                      <div className="relative h-64 md:aspect-[2/3] md:h-auto w-full bg-gray-100">
                        <Image
                          src={ urlForImage(book.images[ 0 ])?.width(400).height(600).url() || "" }
                          alt={ book.name || "" }
                          fill
                          className="object-contain md:object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                        />
                      </div>
                    ) }
                    <div className="p-5">
                      <h4 className="font-bold text-lg text-[#2d2d2d] mb-2 group-hover:text-[#e31e24] transition-colors line-clamp-2">
                        { book.name }
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        by { book.author || "Dr. Jomo Cousins" }
                      </p>
                      { book.previewChapter && (
                        <div className="bg-blue-50 rounded px-3 py-2 mb-3">
                          <p className="text-xs text-blue-900 font-semibold">
                            Preview Chapter{ book.previewChapter.chapterNumber ? ` ${book.previewChapter.chapterNumber}` : "" }:
                          </p>
                          <p className="text-sm text-blue-800 line-clamp-1">
                            { book.previewChapter.title }
                          </p>
                        </div>
                      ) }
                      <div className="flex items-center text-[#e31e24] font-semibold text-sm group-hover:gap-2 transition-all">
                        Read Free Preview
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </Link>
                )) }
              </div>

              {/* Link to all books */ }
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/products?category=books"
                  className="inline-flex items-center gap-2 text-[#e31e24] font-bold hover:underline"
                >
                  View All Books
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) }

        {/* SEO-friendly hidden content */ }
        <div className="max-w-3xl mx-auto">
          <div className="sr-only">
            <p>
              This is a free preview chapter from "{ product.name }" by { product.author || "Dr. Jomo Cousins" }.
              The complete book is available for purchase and contains additional chapters with insights on
              personal growth, spiritual development, faith, motivation, and achieving your God-given purpose.
              { product.isbn && ` ISBN: ${product.isbn}.` }
              { product.pageCount && ` The book contains ${product.pageCount} pages.` }
              Purchase the full book to access all chapters and transform your life today.
            </p>
            { otherPreviews.length > 0 && (
              <p>
                You may also enjoy reading free preview chapters from other books by Dr. Jomo Cousins:
                { otherPreviews.map((book: any, index: number) => (
                  <span key={ book._id }>
                    { index > 0 && (index === otherPreviews.length - 1 ? ", and " : ", ") }
                    "{ book.name }"
                    { book.previewChapter?.title && ` featuring "${book.previewChapter.title}"` }
                  </span>
                )) }.
                All preview chapters are available for free and provide valuable insights from Dr. Cousins' teachings.
              </p>
            ) }
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

  // Fetch other previews for metadata keywords
  const allBooksWithPreviews = await sanityFetch({
    query: booksWithPreviewsQuery,
  });
  const otherBookNames = allBooksWithPreviews
    .filter((book: any) => book.slug !== slug)
    .map((book: any) => book.name);

  const baseUrl = "https://www.jomocousins.com";
  const previewUrl = `${baseUrl}/books/${slug}/preview`;
  const { previewChapter } = product;

  const author = product.author || "Dr. Jomo Cousins";
  const name = product.name?.trim() || "Book Preview";

  // Keyword-first <title>, kept under ~60 chars: lead with the book name (what
  // people search) and add a "Free Preview" label only while it still fits.
  const withLabel = `${name} — Free Preview`;
  const title =
    withLabel.length <= 60
      ? withLabel
      : name.length <= 60
        ? name
        : `${name.slice(0, 59).trimEnd()}…`;

  // Clamp the meta description to ~155 chars on a word boundary (no mid-word cuts).
  const clamp = (text: string, max = 155) => {
    const t = text.replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
  };
  const description = clamp(
    product.excerpt
      ? `Read a free chapter of ${name} by ${author}. ${product.excerpt}`
      : `Read a free chapter of ${name} by ${author} — insights on faith, purpose, and personal transformation.`
  );

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
      ...otherBookNames,
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
