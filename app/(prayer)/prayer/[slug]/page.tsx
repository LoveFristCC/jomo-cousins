import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerBySlugQuery, relatedPrayersQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "../../../(home)/portable-text";
import { format, parseISO } from "date-fns";
import {
  Facebook,
  Twitter,
  Mail,
  Link as LinkIcon,
  Download,
} from "lucide-react";

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
    `Watch Pastor Jomo Cousins pray. Find hope, biblical encouragement, and download the prayer transcript. Pastor Jomo is praying with you.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: prayer.seoMetadata?.keywords || [
      prayer.title,
      "Jomo Cousins prayer",
      "video prayer",
      ...prayer.tags,
    ],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "video.other",
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

  // Fetch related prayers
  const relatedPrayers = await sanityFetch({
    query: relatedPrayersQuery,
    params: {
      excludeId: prayer._id,
      categoryIds,
      limit: 4,
    },
  });

  // Get primary category for breadcrumb
  const primaryCategory = prayer.categories?.[ 0 ];

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
        duration: prayer.duration,
        contentUrl: prayer.youtubeUrl,
        embedUrl: `https://www.youtube.com/embed/${prayer.youtubeVideoId}`,
        author: {
          "@type": "Person",
          name: "Jomo Cousins",
          jobTitle: "Pastor & Spiritual Leader",
          url: "https://jomocousins.com",
        },
        ...(prayer.fullTranscript && { transcript: prayer.fullTranscript }),
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
        ...(prayer.fullTranscript && { articleBody: prayer.fullTranscript }),
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
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#e31e24]">
              Home
            </Link>
            <span>/</span>
            <Link href="/prayer" className="hover:text-[#e31e24]">
              Prayer
            </Link>
            { primaryCategory && (
              <>
                <span>/</span>
                <Link
                  href={ `/prayer/category/${primaryCategory.slug}` }
                  className="hover:text-[#e31e24]"
                >
                  { primaryCategory.title }
                </Link>
              </>
            ) }
            <span>/</span>
            <span className="font-semibold text-[#3d3d3d]">
              { prayer.title }
            </span>
          </nav>
        </div>
      </div>

      {/* Prayer Header */ }
      <section
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
              { prayer.viewCount && <span>{ prayer.viewCount } views</span> }
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
      </section>

      {/* Video Section */ }
      <section className="bg-black py-8">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-video w-full">
              <iframe
                src={ `https://www.youtube.com/embed/${prayer.youtubeVideoId}` }
                title={ prayer.title }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                aria-label={ `Prayer video: ${prayer.title}` }
              />
            </div>
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
                      src="/images/jomo-profile.jpg"
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
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
            {/* Share Buttons */ }
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Share:</span>
              <a
                href={ `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Facebook size={ 16 } />
                Facebook
              </a>
              <a
                href={ `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                <Twitter size={ 16 } />
                Twitter
              </a>
              <a
                href={ `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}` }
                className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                <Mail size={ 16 } />
                Email
              </a>
              <button
                onClick={ () => {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Link copied to clipboard!");
                } }
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300"
              >
                <LinkIcon size={ 16 } />
                Copy Link
              </button>
            </div>

            {/* Download PDF */ }
            { prayer.pdfDownloadUrl && (
              <a
                href={ prayer.pdfDownloadUrl }
                download
                className="flex items-center gap-2 rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c41a1f]"
              >
                <Download size={ 16 } />
                Download Prayer Transcript
              </a>
            ) }
          </div>
        </div>
      </section>

      {/* Full Prayer Transcript */ }
      { prayer.fullTranscript && (
        <section className="py-16">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-[#3d3d3d]">
                Prayer Transcript
              </h2>
              <div className="prose prose-lg max-w-none">
                <CustomPortableText value={ prayer.fullTranscript } />
              </div>
            </div>
          </div>
        </section>
      ) }

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
                src="/images/jomo-profile.jpg"
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
                href="/prayer"
                className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
              >
                Explore More Prayers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
