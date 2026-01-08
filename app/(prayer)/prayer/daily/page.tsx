import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { recentPrayersQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import LivestreamPlayer from "./LivestreamPlayer";

// Enable ISR with revalidation every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Daily Prayer | Pastor Jomo Cousins",
  description: "Join Pastor Jomo Cousins for daily prayer. Start each morning with spiritual encouragement, biblical guidance, and peace. Subscribe to pray with Jomo every day.",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer/daily",
  },
  openGraph: {
    title: "Daily Prayer with Pastor Jomo Cousins",
    description: "Start each day grounded in prayer. Join Jomo for daily spiritual encouragement.",
    url: "https://www.jomocousins.com/prayer/daily",
    type: "website",
    images: [
      {
        url: "/images/jc-color-pics/JC_NewPhotos Edit539_edited.webp",
        width: 1200,
        height: 630,
        alt: "Prayer Categories - Pray with Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Prayer with Pastor Jomo Cousins",
    description: "Daily prayer videos for spiritual growth and guidance.",
  },
};

export default async function DailyPrayerPage() {
  const recentDailyPrayers = await sanityFetch({
    query: recentPrayersQuery,
    params: { limit: 12 }
  });

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
          {
            "@type": "ListItem",
            position: 3,
            name: "Daily Prayer",
            item: "https://jomocousins.com/prayer/daily",
          },
        ],
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

  // Add ItemList for recent prayers
  // if (recentDailyPrayers && recentDailyPrayers.length > 0) {
  //   (structuredData[ "@graph" ] as any[]).push({
  //     "@type": "ItemList",
  //     name: "Recent Daily Prayers",
  //     itemListElement: recentDailyPrayers.map((prayer: any, index: number) => ({
  //       "@type": "ListItem",
  //       position: index + 1,
  //       item: {
  //         "@type": "VideoObject",
  //         name: prayer.title,
  //         url: `https://jomocousins.com/prayer/${prayer.slug}`,
  //       },
  //     })),
  //   });
  // }

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

      {/* Hero/Header */ }
      <section
        id="main-content"
        className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-16 text-white md:py-24"
      >
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Daily Prayer with Pastor Jomo
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 md:text-2xl">
              Start each day grounded in prayer. Join Pastor Jomo for daily spiritual
              encouragement.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Prayer/Teaching Video */ }
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <span className="mb-2 inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-bold uppercase tracking-wider text-white">
                Latest Video
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Most Recent Prayer or Teaching
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Watch the latest from Pastor Jomo's daily prayer sessions
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <LivestreamPlayer />

              <div className="bg-gray-50 p-6 text-center md:p-8">
                <p className="text-gray-700">
                  Join Pastor Jomo live for prayer Monday-Friday at 6:30 AM (EST).{ " " }
                  <a
                    href="https://www.youtube.com/@PASTORJOMO?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#e31e24] hover:underline"
                  >
                    Subscribe on YouTube
                  </a>
                  { " " }and turn on notifications to join live or catch up on past prayers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Subscribe */ }
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-5xl">
            {/* About Section */ }
            <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/jc-color-pics/JC_NewPhotos Edit539_edited.webp"
                    alt="Jomo Cousins praying"
                    width={ 500 }
                    height={ 500 }
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                  Pray with Pastor Jomo Every Morning
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Every weekday morning at 6:30 AM (EST), I go live to pray with you
                    and share a word of encouragement. These aren't just prayers -
                    they're personal moments where I'm inviting you to join me in
                    real-time conversation with our Father.
                  </p>
                  <p>
                    Can't make it live? No problem! All prayers are saved so you can
                    watch them anytime. Whether you're facing challenges, seeking guidance, or
                    simply wanting to grow closer to God, starting your day in prayer changes everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Subscribe Section */ }
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 text-center md:p-12">
              <h3 className="mb-4 text-2xl font-bold text-[#3d3d3d] md:text-3xl">
                Join the Daily Prayer Community
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                Subscribe and turn on notifications to join Pastor Jomo live Monday-Friday at 6:30 AM (EST)
              </p>

              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <a
                  href="https://www.youtube.com/@PASTORJOMO?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-red-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
                  aria-label="Subscribe to Jomo Cousins on YouTube"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Subscribe on YouTube
                </a>

                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/pastorjomo/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white transition-transform hover:scale-110"
                    aria-label="Follow Jomo Cousins on Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/pastorjomo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110"
                    aria-label="Follow Jomo Cousins on Facebook"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Daily Prayers Archive */ }
      { recentDailyPrayers && recentDailyPrayers.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-5">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Recent Prayers
              </h2>
              <p className="text-lg text-gray-600">
                Catch up on prayers you might have missed
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              { recentDailyPrayers.map((prayer: any) => (
                <Link
                  key={ prayer._id }
                  href={ `/prayer/${prayer.slug}` }
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl"
                >
                  {/* Thumbnail */ }
                  { prayer.featuredImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                      <Image
                        src={ urlForImage(prayer.featuredImage)?.url() || "" }
                        alt={ `${prayer.title} - Prayer with Jomo Cousins` }
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <svg
                          className="h-16 w-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      { prayer.duration && (
                        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                          { prayer.duration }
                        </div>
                      ) }
                    </div>
                  ) }

                  {/* Prayer Info */ }
                  <div className="p-4">
                    <h3 className="mb-2 font-bold text-[#3d3d3d] group-hover:text-[#e31e24]">
                      { prayer.title }
                    </h3>
                    { prayer.publishedAt && (
                      <p className="text-sm text-gray-500">
                        { format(parseISO(prayer.publishedAt), "MMMM d, yyyy") }
                      </p>
                    ) }
                  </div>
                </Link>
              )) }
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/prayer/search"
                className="inline-block rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white transition-colors hover:bg-[#c41a1f]"
              >
                View All Prayers
              </Link>
            </div>
          </div>
        </section>
      ) }
    </div>
  );
}
