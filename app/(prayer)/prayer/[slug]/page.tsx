import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  prayerBySlugQuery,
  relatedPrayersQuery,
  nextPrayerQuery,
  previousPrayerQuery,
  productBySlugQuery
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "../../../(home)/portable-text";
import { format, parseISO } from "date-fns";
import ShareButtons from "./ShareButtons";
import { getYouTubeVideoId } from "@/lib/youtube";
import YouTubePlayer from "@/components/YouTubePlayer";
import DownloadPrayerPDFButton from "@/components/DownloadPrayerPDFButton";

// Convert Portable Text to plain text for structured data
function portableTextToPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

// Convert duration string to ISO 8601 format
function convertToISO8601Duration(duration: string | undefined): string | undefined {
  if (!duration) return undefined;

  // Match patterns like "3:19", "1:30:45", "5 minutes", etc.
  const timePattern = /(\d+):(\d+)(?::(\d+))?/;
  const match = duration.match(timePattern);

  if (match) {
    const hours = match[3] ? parseInt(match[1]) : 0;
    const minutes = match[3] ? parseInt(match[2]) : parseInt(match[1]);
    const seconds = match[3] ? parseInt(match[3]) : parseInt(match[2]);

    let iso = "PT";
    if (hours > 0) iso += `${hours}H`;
    if (minutes > 0) iso += `${minutes}M`;
    if (seconds > 0) iso += `${seconds}S`;

    return iso;
  }

  return undefined;
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Enable ISR with revalidation every 12 hours
export const revalidate = 43200;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prayer = await sanityFetch({
    query: prayerBySlugQuery,
    params: { slug },
  });

  if (!prayer) {
    return {
      title: "Prayer Not Found",
    };
  }

  const metaTitle =
    prayer.seoMetadata?.title || `${prayer.title} | Jomo Cousins`;
  const metaDescription =
    prayer.seoMetadata?.description ||
    prayer.excerpt ||
    `Watch Pastor Jomo Cousins pray. Find hope, biblical encouragement, and download the full prayer text. Pastor Jomo is praying with you.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: prayer.seoMetadata?.keywords || [
      prayer.title,
      "Jomo Cousins prayer",
      "video prayer",
      // ...prayer.tags,
    ],
    alternates: {
      canonical: `https://www.jomocousins.com/prayer/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "video.other",
      url: `https://www.jomocousins.com/prayer/${slug}`,
      videos: prayer.youtubeUrl ? [ prayer.youtubeUrl ] : [],
      images: prayer.featuredImage
        ? [
          {
            url: urlForImage(prayer.featuredImage)?.url() || "",
            width: 1200,
            height: 630,
            alt: prayer.title,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: prayer.featuredImage
        ? [ urlForImage(prayer.featuredImage)?.url() || "" ]
        : [],
    },
  };
}

const categoryBookMap: Record<string, string> = {
  "healing": "my-god-is-a-healer",
  "prayer": "prayer-life-the-conversation",
  "speech": "speak-it",
  "direction": "how-to-hear-god",
  "wisdom": "how-to-hear-god",
  "anxiety-fear-worry": "prayer-life-the-conversation",
  "courage": "fully-equipped-you-have-all-you-need-to-succeed",
  "faith": "fully-equipped-you-have-all-you-need-to-succeed",
  "identity": "youre-in-a-place-too-small-for-your-call",
  "acceptance": "youre-in-a-place-too-small-for-your-call",
};

const defaultBookSlug = "prayer-life-the-conversation";

export default async function PrayerVideoPage({ params }: Props) {
  const { slug } = await params;
  const prayer = await sanityFetch({
    query: prayerBySlugQuery,
    params: { slug },
  });

  if (!prayer) {
    notFound();
  }

  // Get category IDs for related prayers
  const categoryIds = prayer.categories?.map((cat: any) => cat._ref) || [];

  // Get primary category for breadcrumb and book recommendation
  const primaryCategory = prayer.categories?.[ 0 ];
  const bookSlug = (primaryCategory?.slug && categoryBookMap[primaryCategory.slug]) || defaultBookSlug;

  // Fetch all related content in parallel
  const [ relatedPrayers, nextPrayer, previousPrayer, prayerBook ] = await Promise.all([
    sanityFetch({
      query: relatedPrayersQuery,
      params: {
        excludeId: prayer._id,
        categoryIds,
        limit: 4,
      },
    }),
    sanityFetch({
      query: nextPrayerQuery,
      params: { currentDate: prayer.publishedAt },
    }),
    sanityFetch({
      query: previousPrayerQuery,
      params: { currentDate: prayer.publishedAt },
    }),
    sanityFetch({
      query: productBySlugQuery,
      params: { slug: bookSlug },
    }),
  ]);

  // Get video ID with fallback
  const videoId = getYouTubeVideoId(prayer.youtubeVideoId, prayer.youtubeUrl);

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
            item: "https://jomocousins.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Prayer",
            item: "https://jomocousins.com/prayer",
          },
          ...(primaryCategory
            ? [
              {
                "@type": "ListItem",
                position: 3,
                name: primaryCategory.title,
                item: `https://jomocousins.com/prayer/category/${primaryCategory.slug}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: prayer.title,
                item: `https://jomocousins.com/prayer/${prayer.slug}`,
              },
            ]
            : [
              {
                "@type": "ListItem",
                position: 3,
                name: prayer.title,
                item: `https://jomocousins.com/prayer/${prayer.slug}`,
              },
            ]),
        ],
      },
      {
        "@type": "VideoObject",
        name: prayer.title,
        description: prayer.excerpt,
        thumbnailUrl: prayer.featuredImage
          ? urlForImage(prayer.featuredImage)?.url()
          : undefined,
        uploadDate: prayer.publishedAt,
        ...(convertToISO8601Duration(prayer.duration) && { duration: convertToISO8601Duration(prayer.duration) }),
        contentUrl: prayer.youtubeUrl,
        embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : undefined,
        author: {
          "@type": "Person",
          name: "Jomo Cousins",
          jobTitle: "Pastor & Spiritual Leader",
          url: "https://jomocousins.com",
        },
        ...(prayer.fullTranscript && { transcript: portableTextToPlainText(prayer.fullTranscript) }),
      },
      {
        "@type": "Article",
        headline: prayer.title,
        author: {
          "@type": "Person",
          name: "Jomo Cousins",
          jobTitle: "Pastor & Spiritual Leader",
        },
        datePublished: prayer.publishedAt,
        ...(prayer.fullTranscript && { articleBody: portableTextToPlainText(prayer.fullTranscript) }),
      },
      {
        "@type": "Person",
        "@id": "https://jomocousins.com/#jomo",
        name: "Jomo Cousins",
        jobTitle: "Pastor & Spiritual Leader",
        url: "https://jomocousins.com",
      },
    ],
  };

  const shareUrl = `https://jomocousins.com/prayer/${prayer.slug}`;
  const shareTitle = `${prayer.title} - Prayer with Pastor Jomo Cousins`;

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
            { primaryCategory && (
              <>
                <span className="text-gray-400">/</span>
                <Link
                  href={ `/prayer/category/${primaryCategory.slug}` }
                  className="hover:text-[#e31e24] transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  { primaryCategory.title }
                </Link>
              </>
            ) }
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-[#3d3d3d] truncate">
              { prayer.title }
            </span>
          </nav>
        </div>
      </div>

      {/* Prayer Article - Main Content */ }
      <article>
        {/* Prayer Header */ }
        <header
          id="main-content"
          className="border-b border-gray-200 bg-white py-8"
        >
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-5xl">
              <h1 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl lg:text-5xl">
                { prayer.title }
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-semibold">Led by Pastor Jomo Cousins</span>
                { prayer.publishedAt && (
                  <span>{ format(parseISO(prayer.publishedAt), "MMMM d, yyyy") }</span>
                ) }
                { prayer.duration && <span>{ prayer.duration }</span> }
              </div>
              {/* Category Tags */ }
              { prayer.categories && prayer.categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  { prayer.categories.map((category: any) => (
                    <Link
                      key={ category.slug }
                      href={ `/prayer/category/${category.slug}` }
                      className="rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold text-[#3d3d3d] transition-colors hover:bg-[#e31e24] hover:text-white"
                      aria-label={ `View all ${category.title} prayers` }
                    >
                      { category.title }
                    </Link>
                  )) }
                </div>
              ) }
            </div>
          </div>
        </header>

        {/* Video Section */ }
        <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] py-10 md:py-14">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-center gap-3 text-center">
                <div className="h-px flex-1 max-w-16 bg-white/20" />
                <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                  Press play to pray with Pastor Jomo
                </p>
                <div className="h-px flex-1 max-w-16 bg-white/20" />
              </div>
              { videoId ? (
                <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <YouTubePlayer
                    videoId={ videoId }
                    title={ prayer.title }
                    thumbnailUrl={ prayer.featuredImage ? urlForImage(prayer.featuredImage)?.url() : undefined }
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-800 flex items-center justify-center shadow-xl">
                  <p className="text-gray-400">Video not available</p>
                </div>
              ) }
              { prayer.duration && (
                <p className="mt-4 text-center text-sm text-white/50">
                  { prayer.duration } min prayer
                </p>
              ) }
            </div>
          </div>
        </section>

        {/* Prayer Description & Personal Note */ }
        <section className="py-12">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              { prayer.excerpt && (
                <div className="mb-8">
                  <p className="text-xl leading-relaxed text-gray-700">
                    { prayer.excerpt }
                  </p>
                </div>
              ) }

              {/* Jomo's Personal Note */ }
              { prayer.personalNote && Array.isArray(prayer.personalNote) && (
                <div className="mb-8 rounded-xl border-l-4 border-[#e31e24] bg-gray-50 p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src="/images/jomo-profile.webp"
                        alt="Jomo Cousins"
                        width={ 48 }
                        height={ 48 }
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#3d3d3d]">A Note from Pastor Jomo</p>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <CustomPortableText value={ prayer.personalNote } />
                  </div>
                </div>
              ) }
            </div>
          </div>
        </section>

        {/* Action Bar */ }
        <section className="border-y border-gray-200 bg-gray-50 py-6">
          <div className="container mx-auto px-5">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
              {/* Share Buttons */ }
              <ShareButtons shareUrl={ shareUrl } shareTitle={ shareTitle } />

              {/* Download PDF */ }
              { prayer.fullTranscript && (
                <DownloadPrayerPDFButton
                  slug={ prayer.slug }
                  title={ prayer.title }
                />
              ) }
            </div>
          </div>
        </section>

        {/* Full Prayer Text */ }
        { prayer.fullTranscript && (
          <section className="py-16">
            <div className="container mx-auto px-5">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-3xl font-bold text-[#3d3d3d]">
                  Full Prayer Text
                </h2>
                <div className="prose prose-lg max-w-none">
                  <CustomPortableText value={ prayer.fullTranscript } />
                </div>
              </div>
            </div>
          </section>
        ) }

        {/* Next/Previous Prayer Navigation */ }
        { (previousPrayer || nextPrayer) && (
          <section className="border-t border-gray-200 bg-white py-8">
            <div className="container mx-auto px-5">
              <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
                { previousPrayer ? (
                  <Link
                    href={ `/prayer/${previousPrayer.slug}` }
                    className="group flex items-center gap-2 text-[#3d3d3d] transition-colors hover:text-[#e31e24]"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs uppercase text-gray-500">Previous Prayer</div>
                      <div className="font-semibold group-hover:underline">{ previousPrayer.title }</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                ) }
                { nextPrayer ? (
                  <Link
                    href={ `/prayer/${nextPrayer.slug}` }
                    className="group flex items-center gap-2 text-[#3d3d3d] transition-colors hover:text-[#e31e24]"
                  >
                    <div className="text-right">
                      <div className="text-xs uppercase text-gray-500">Next Prayer</div>
                      <div className="font-semibold group-hover:underline">{ nextPrayer.title }</div>
                    </div>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div />
                ) }
              </div>
            </div>
          </section>
        ) }
      </article>

      {/* Related Prayers Section */ }
      { relatedPrayers && relatedPrayers.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-3xl font-bold text-[#3d3d3d]">
                { primaryCategory
                  ? `More ${primaryCategory.title} Prayers with Pastor Jomo`
                  : "More Prayers with Pastor Jomo" }
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                { relatedPrayers.map((relatedPrayer: any) => (
                  <Link
                    key={ relatedPrayer._id }
                    href={ `/prayer/${relatedPrayer.slug}` }
                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  >
                    { relatedPrayer.featuredImage && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={
                            urlForImage(relatedPrayer.featuredImage)?.url() || ""
                          }
                          alt={ `${relatedPrayer.title} - Prayer with Jomo Cousins` }
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) }
                    <div className="p-4">
                      <h3 className="mb-2 font-bold text-[#3d3d3d] group-hover:text-[#e31e24]">
                        { relatedPrayer.title }
                      </h3>
                      { relatedPrayer.duration && (
                        <p className="text-sm text-gray-500">
                          { relatedPrayer.duration }
                        </p>
                      ) }
                    </div>
                  </Link>
                )) }
              </div>
              { primaryCategory && (
                <div className="mt-8 text-center">
                  <Link
                    href={ `/prayer/category/${primaryCategory.slug}` }
                    className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 font-bold text-white transition-colors hover:bg-[#c41a1f]"
                  >
                    See All { primaryCategory.title } Prayers with Pastor Jomo
                  </Link>
                </div>
              ) }
            </div>
          </div>
        </section>
      ) }

      {/* Personal CTA Box */ }
      <section className="py-16">
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
              Need personal prayer? I'm here for you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/submit"
                className="rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f]"
              >
                Send Your Prayer Request to Pastor Jomo
              </Link>
              <Link
                href="/prayer/daily"
                className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
              >
                Pray Daily
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Book Section */ }
      { prayerBook && prayerBook.status === "active" && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <p className="text-sm uppercase tracking-wide text-[#e31e24] font-semibold mb-2">
                  { primaryCategory ? `Recommended for ${primaryCategory.title}` : "Continue Your Journey" }
                </p>
                <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">
                  { primaryCategory ? `Go Deeper in ${primaryCategory.title}` : "Deepen Your Prayer Life" }
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Continue what God started in this prayer with a resource handpicked for your journey.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Book Image */ }
                  <div className="flex items-center justify-center">
                    { prayerBook.images && prayerBook.images.length > 0 && (
                      <div className="relative w-full max-w-sm aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={ urlForImage(prayerBook.images[ 0 ])?.url() || "" }
                          alt={ prayerBook.name }
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) }
                  </div>

                  {/* Book Details */ }
                  <div className="flex flex-col justify-center">
                    { primaryCategory && (
                      <span className="mb-2 inline-block w-fit rounded-full bg-[#e31e24]/10 px-3 py-1 text-xs font-semibold text-[#e31e24]">
                        Pastor Jomo&apos;s Pick for { primaryCategory.title }
                      </span>
                    ) }
                    <h3 className="text-2xl font-bold text-[#3d3d3d] mb-4">
                      { prayerBook.name }
                    </h3>
                    { prayerBook.excerpt && (
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        { prayerBook.excerpt }
                      </p>
                    ) }

                    {/* CTA Button */ }
                    <Link
                      href={ `/products/${prayerBook.slug}` }
                      className="inline-block text-center rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f] mb-6"
                    >
                      Get Your Copy
                    </Link>

                    {/* Trust Badges */ }
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Fast Shipping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Checkout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) }
    </div>
  );
}
