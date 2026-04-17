import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  prayerCategoryBySlugQuery,
  prayersByCategoryQuery,
  featuredPrayerByCategoryQuery,
  testimonialsByCategoryQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "../../../../(home)/portable-text";
import { format, parseISO } from "date-fns";
import { getYouTubeVideoId } from "@/lib/youtube";
import YouTubePlayer from "@/components/YouTubePlayer";

type Props = {
  params: Promise<{ slug: string }>;
};

// Enable ISR with revalidation every 6 hours
export const revalidate = 21600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await sanityFetch({
    query: prayerCategoryBySlugQuery,
    params: { slug },
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const metaTitle =
    category.seoContent?.metaTitle ||
    `${category.title} | Prayers with Pastor Jomo Cousins`;
  const metaDescription =
    category.seoContent?.metaDescription ||
    `Find peace through ${category.title.toLowerCase()} prayers with Pastor Jomo Cousins. Watch video prayers, read prayer guides, and send your personal prayer request today.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: category.seoContent?.targetKeywords || [
      `${category.title} prayers`,
      "Jomo Cousins prayer",
      "video prayers",
      category.title.toLowerCase(),
    ],
    alternates: {
      canonical: `https://www.jomocousins.com/prayer/category/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `https://www.jomocousins.com/prayer/category/${slug}`,
      images: category.featuredImage
        ? [
          {
            url: urlForImage(category.featuredImage)?.url() || "",
            width: 1200,
            height: 630,
            alt: `${category.title} prayers with Jomo Cousins`,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: category.featuredImage
        ? [ urlForImage(category.featuredImage)?.url() || "" ]
        : [],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // First fetch the category
  const category = await sanityFetch({
    query: prayerCategoryBySlugQuery,
    params: { slug },
  });

  if (!category) {
    notFound();
  }

  // Then fetch all related data with the actual category ID
  const [ actualPrayers, actualFeaturedPrayer, actualTestimonials ] = await Promise.all([
    sanityFetch({
      query: prayersByCategoryQuery,
      params: { categoryId: category._id },
    }),
    sanityFetch({
      query: featuredPrayerByCategoryQuery,
      params: { categoryId: category._id },
    }),
    sanityFetch({
      query: testimonialsByCategoryQuery,
      params: { categoryId: category._id, limit: 2 },
    }),
  ]);

  // Structured Data
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
            name: "Prayer",
            item: "https://www.jomocousins.com/prayer",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.title,
            item: `https://www.jomocousins.com/prayer/category/${category.slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${category.title} Prayers with Jomo Cousins`,
        description: category.description,
        url: `https://www.jomocousins.com/prayer/category/${category.slug}`,
        numberOfItems: actualPrayers?.length || 0,
        author: {
          "@type": "Person",
          name: "Jomo Cousins",
          jobTitle: "Pastor & Spiritual Leader",
        },
        mainEntity: actualPrayers && actualPrayers.length > 0
          ? {
            "@type": "ItemList",
            numberOfItems: actualPrayers.length,
            itemListElement: actualPrayers.map((prayer: any, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              name: prayer.title,
              url: `https://www.jomocousins.com/prayer/${prayer.slug}`,
            })),
          }
          : undefined,
      },
      {
        "@type": "Person",
        "@id": "https://www.jomocousins.com/#jomo",
        name: "Jomo Cousins",
        jobTitle: "Pastor & Spiritual Leader",
        url: "https://www.jomocousins.com",
      },
    ],
  };

  // Add FAQ Schema if available
  if (category.faqSection && category.faqSection.length > 0) {
    (structuredData[ "@graph" ] as any[]).push({
      "@type": "FAQPage",
      mainEntity: category.faqSection.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const h1Title =
    category.seoContent?.h1Override ||
    `${category.title} Prayers with Pastor Jomo Cousins`;

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to Main Content Link */ }
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#e31e24] focus:px-6 focus:py-3 focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Structured Data */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } }
      />

      {/* Breadcrumbs */ }
      <div className="border-b border-gray-200 bg-gray-50 py-3">
        <div className="container mx-auto px-5">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#e31e24] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/prayer" className="hover:text-[#e31e24] transition-colors">
              Prayer
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#3d3d3d] font-semibold truncate">
              { category.title }
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */ }
      <section
        id="main-content"
        className="relative bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-16 text-white md:py-24"
      >
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left - Content */ }
            <div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                { h1Title }
              </h1>
              { category.description && (
                <p className="mb-8 text-xl leading-relaxed text-gray-300">
                  { category.description }
                </p>
              ) }
              <a
                href="#prayers-list"
                className="inline-block rounded-lg bg-[#e31e24] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f] hover:shadow-xl"
                aria-label={ `Scroll to ${category.title} prayers list` }
              >
                Find Your Prayer
              </a>
            </div>

            {/* Right - Featured Image */ }
            { category.featuredImage && (
              <div className="relative h-[400px] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={ urlForImage(category.featuredImage)?.url() || "" }
                  alt={ `${category.title} prayers with Jomo Cousins` }
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) }
          </div>
        </div>
      </section>

      {/* Featured Prayer of the Category */ }
      { actualFeaturedPrayer && (() => {
        const featuredVideoId = getYouTubeVideoId(actualFeaturedPrayer.youtubeVideoId, actualFeaturedPrayer.youtubeUrl);
        return (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-5">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                  <span className="inline-block rounded-full bg-[#e31e24] px-4 py-1 text-sm font-bold text-white">
                    Most Watched
                  </span>
                  <h2 className="mt-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                    Featured Prayer
                  </h2>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                  {/* Video Embed */ }
                  { featuredVideoId ? (
                    <YouTubePlayer
                      videoId={ featuredVideoId }
                      title={ actualFeaturedPrayer.title }
                      thumbnailUrl={ actualFeaturedPrayer.featuredImage ? urlForImage(actualFeaturedPrayer.featuredImage)?.url() : undefined }
                    />
                  ) : (
                    <div className="relative aspect-video w-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600">Video not available</p>
                    </div>
                  ) }

                  {/* Prayer Info */ }
                  <div className="p-8">
                    <h3 className="mb-3 text-2xl font-bold text-[#3d3d3d]">
                      { actualFeaturedPrayer.title }
                    </h3>
                    { actualFeaturedPrayer.excerpt && (
                      <p className="mb-4 text-gray-600">
                        { actualFeaturedPrayer.excerpt }
                      </p>
                    ) }
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      { actualFeaturedPrayer.duration && (
                        <span>{ actualFeaturedPrayer.duration }</span>
                      ) }
                    </div>
                    <Link
                      href={ `/prayer/${actualFeaturedPrayer.slug}` }
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e31e24] px-6 py-3 font-bold text-white transition-colors hover:bg-[#c41a1f]"
                    >
                      Read Prayer Transcript
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })() }

      {/* All Category Prayers */ }
      <section id="prayers-list" className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#3d3d3d] md:text-4xl">
              Pray With Pastor Jomo About { category.title }
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              { actualPrayers?.length || 0 } video prayers to watch and pray along with
            </p>
          </div>

          { actualPrayers && actualPrayers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              { actualPrayers.map((prayer: any) => {
                const videoId = getYouTubeVideoId(prayer.youtubeVideoId, prayer.youtubeUrl);
                const thumbnailSrc = prayer.featuredImage
                  ? urlForImage(prayer.featuredImage)?.url() || ""
                  : videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : "";

                return (
                  <Link
                    key={ prayer._id }
                    href={ `/prayer/${prayer.slug}` }
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#e31e24]/30"
                    aria-label={ `Watch prayer: ${prayer.title}` }
                  >
                    {/* Thumbnail with play indicator + duration badge */ }
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                      { thumbnailSrc && (
                        <Image
                          src={ thumbnailSrc }
                          alt={ `${prayer.title} - Prayer with Jomo Cousins` }
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) }

                      {/* Dark gradient for legibility */ }
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Play button — always visible */ }
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e31e24] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c41a1f]">
                          <svg className="ml-0.5 h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Duration badge */ }
                      { prayer.duration && (
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-semibold tabular-nums text-white">
                          { prayer.duration }
                        </span>
                      ) }
                    </div>

                    {/* Prayer Info */ }
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                        { prayer.title }
                      </h3>
                      { prayer.excerpt && (
                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                          { prayer.excerpt }
                        </p>
                      ) }

                      {/* Meta row */ }
                      <div className="mt-auto flex items-center gap-3 text-xs text-gray-400">
                        { prayer.viewCount > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={ 2 } viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            { prayer.viewCount.toLocaleString() }
                          </span>
                        ) }
                        { prayer.publishedAt && (
                          <span>
                            { format(parseISO(prayer.publishedAt), "MMM d, yyyy") }
                          </span>
                        ) }
                      </div>

                      {/* CTA */ }
                      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#e31e24] transition-colors group-hover:text-[#c41a1f]">
                        <span>Watch Prayer</span>
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={ 2.5 } viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              }) }
            </div>
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-md ring-1 ring-gray-200/60">
              <p className="text-gray-600">
                Prayers for this category are coming soon. Check back soon or{ " " }
                <Link
                  href="/prayer/submit"
                  className="font-bold text-[#e31e24] hover:underline"
                >
                  send your prayer request
                </Link>
                .
              </p>
            </div>
          ) }
        </div>
      </section>

      {/* Category Overview Content */ }
      { (category.hubPageContent || (!category.hubPageContent && category.biblicalFoundation)) && (
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
          <div className="container relative mx-auto px-5">
            <div className="mx-auto max-w-5xl">
              { category.hubPageContent ? (
                <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-shadow hover:shadow-2xl md:p-10">
                  <div className="mb-6">
                    <h2 className="text-center text-2xl font-bold leading-tight text-[#3d3d3d] md:text-4xl">
                      Why Prayer Matters for { category.title }
                    </h2>
                  </div>
                  <div className="prose prose-lg mx-auto text-gray-700">
                    <CustomPortableText value={ category.hubPageContent } />
                  </div>
                </div>
              ) : category.biblicalFoundation ? (
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl md:p-10">
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[#e31e24]/5 blur-2xl transition-transform group-hover:scale-110" />
                  <div className="relative">
                    <div className="mb-6">
                      <div className="mb-4 inline-block rounded-lg bg-[#e31e24]/10 px-4 py-2">
                        <span className="text-sm font-bold text-[#e31e24]">Scripture</span>
                      </div>
                      <h3 className="text-2xl font-bold leading-tight text-[#3d3d3d] md:text-3xl">
                        Biblical Foundation
                      </h3>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <CustomPortableText value={ category.biblicalFoundation } />
                    </div>
                  </div>
                </div>
              ) : null }
            </div>
          </div>
        </section>
      ) }

      {/* FAQ Section */ }
      { category.faqSection && category.faqSection.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Common Questions About { category.title } Prayer
              </h2>
              <div className="space-y-6">
                { category.faqSection.map((faq: any, index: number) => (
                  <div
                    key={ index }
                    className="rounded-xl bg-white p-8 shadow-md"
                  >
                    <h3 className="mb-3 text-xl font-bold text-[#3d3d3d]">
                      { faq.question }
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      { faq.answer }
                    </p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </section>
      ) }

      {/* Testimonials */ }
      { actualTestimonials && actualTestimonials.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#3d3d3d] md:text-4xl">
              Stories from Prayer Partners
            </h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              { actualTestimonials.map((testimonial: any) => (
                <div
                  key={ testimonial._id }
                  className="rounded-xl bg-gray-50 p-8"
                >
                  <p className="mb-4 italic text-gray-700">
                    "{ testimonial.testimonialText }"
                  </p>
                  <div className="text-sm font-semibold text-[#3d3d3d]">
                    — { testimonial.name }
                    { testimonial.location && `, ${testimonial.location}` }
                  </div>
                </div>
              )) }
            </div>
          </div>
        </section>
      ) }

      {/* Related Prayer Topics */ }
      { category.relatedCategories && category.relatedCategories.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#3d3d3d] md:text-4xl">
              You Might Also Pray About...
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              { category.relatedCategories.map((related: any) => (
                <Link
                  key={ related._id }
                  href={ `/prayer/category/${related.slug}` }
                  className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
                >
                  { related.icon && (
                    <div className="mb-4 h-12 w-12">
                      <Image
                        src={ urlForImage(related.icon)?.url() || "" }
                        alt={ `${related.title} prayer category icon` }
                        width={ 48 }
                        height={ 48 }
                        loading="lazy"
                        className="transition-transform group-hover:scale-110"
                      />
                    </div>
                  ) }
                  <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] group-hover:text-[#e31e24]">
                    { related.title }
                  </h3>
                  <p className="mb-3 text-gray-600">{ related.description }</p>
                  <p className="text-sm text-gray-500">
                    { related.prayerCount } prayers
                  </p>
                </Link>
              )) }
            </div>
          </div>
        </section>
      ) }

      {/* Personal CTA Section */ }
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#3d3d3d] to-[#2d2d2d] p-12 text-center text-white shadow-2xl">
            <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
              <Image
                src="/images/jc-color-pics/_JC_NewPhotos Edit141.webp"
                alt="Jomo Cousins"
                width={ 96 }
                height={ 96 }
                className="object-cover"
              />
            </div>
            <p className="mb-8 text-xl leading-relaxed">
              Can't find exactly what you're looking for? I'd love to pray with
              you personally.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/search"
                className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
              >
                Search All Prayers
              </Link>
              <Link
                href="/prayer/submit"
                className="rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f]"
              >
                Send Your Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
