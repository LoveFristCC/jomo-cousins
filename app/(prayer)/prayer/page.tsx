import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  recentPrayersQuery,
  prayerCategoriesQuery,
  approvedTestimonialsQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import SeriesSection from "./week/_components/SeriesSection";
import TeachingsSection from "./teaching/_components/TeachingsSection";

// Enable ISR with revalidation every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Prayer for Every Need | Pray With Pastor Jomo",
  description: "Join Pastor Jomo Cousins in prayer. Watch daily prayer videos, find prayers for healing, finances, anxiety, and more. Send your prayer request.",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer",
  },
  openGraph: {
    title: "Prayer for Every Need | Pray With Pastor Jomo",
    description: "Join Jomo in prayer. Daily prayer videos for healing, finances, anxiety, and more. You're not alone - Jomo is praying with you.",
    url: "https://www.jomocousins.com/prayer",
    type: "website",
    siteName: "Dr. Jomo Cousins",
    images: [
      {
        url: "/images/logos/Asset 1.webp",
        width: 1200,
        height: 630,
        alt: "Pray with Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pray With Jomo Cousins",
    description: "Daily prayer videos and spiritual guidance. Jomo is praying with you.",
    creator: "@pastorjomo",
    site: "@pastorjomo",
    images: [ "/images/logos/Asset 1.webp" ],
  },
};

export default async function PrayerPage() {
  const [ recentPrayers, categories, testimonials ] =
    await Promise.all([
      sanityFetch({ query: recentPrayersQuery, params: { limit: 6 } }),
      sanityFetch({ query: prayerCategoriesQuery }),
      sanityFetch({ query: approvedTestimonialsQuery, params: { limit: 3 } }),
    ]);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.jomocousins.com/#person",
        name: "Jomo Cousins",
        jobTitle: "Pastor & Spiritual Leader",
        description: "Pastor Jomo Cousins leads daily prayer and provides spiritual guidance through personal prayer videos.",
        url: "https://www.jomocousins.com",
        sameAs: [
          "https://www.facebook.com/pastorjomo",
          "https://www.instagram.com/pastorjomo",
          "https://www.youtube.com/@PASTORJOMO",
          "https://www.linkedin.com/in/dr-jomo-cousins-277279138/",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://www.jomocousins.com/prayer/#organization",
        name: "Pray with Jomo Prayer Ministry",
        founder: {
          "@id": "https://www.jomocousins.com/#person",
        },
        url: "https://www.jomocousins.com/prayer",
        description: "Personal prayer ministry led by Pastor Jomo Cousins, offering daily prayers and spiritual guidance.",
      },
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
        ],
      },
    ],
  };

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

      {/* Hero Section */ }
      <section
        id="main-content"
        className="relative bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] pt-12 text-white sm:pt-16 lg:pt-12"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            {/* Left - Content */ }
            <div className="pb-2 lg:py-12">
              <h1 className="mb-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                Prayer for Every Need
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-300 sm:text-xl">
                Find peace, healing, and guidance through daily prayer. You're
                not alone.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/prayer/search"
                  className="rounded-lg bg-[#e31e24] px-6 py-3.5 text-center text-base font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f] hover:shadow-xl"
                  aria-label="Search prayer library to find a prayer"
                >
                  Find a Prayer Now
                </Link>
                <Link
                  href="/prayer/submit"
                  className="rounded-lg border-2 border-white px-6 py-3.5 text-center text-base font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
                  aria-label="Send your prayer request to Jomo Cousins"
                >
                  Send Prayer Request
                </Link>
              </div>
            </div>

            {/* Right - Image */ }
            <div className="relative mx-auto w-full max-w-sm self-end lg:max-w-none">
              <div className="aspect-[5/4] overflow-hidden rounded-t-2xl lg:aspect-square">
                <Image
                  src="/images/jc-png/_JC_NewPhotos Edit240.webp"
                  alt="Pray with Jomo Cousins"
                  width={ 600 }
                  height={ 600 }
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 384px"
                  className="h-full w-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prayer Series (first content section) */ }
      <SeriesSection />

      {/* Prayer Teachings */ }
      <TeachingsSection />

      {/* Popular Prayer Topics Grid */ }
      { categories && categories.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 max-w-2xl sm:mb-10">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Pray with Pastor Jomo about...
              </h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Find prayers for every area of your life. Pastor Jomo is praying with
                you.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              { categories.slice(0, 8).map((category: any) => (
                <Link
                  key={ category._id }
                  href={ `/prayer/category/${category.slug}` }
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#e31e24] hover:shadow-md"
                >
                  { category.icon && (
                    <div className="mb-4">
                      <Image
                        src={ urlForImage(category.icon)?.url() || "" }
                        alt={ `${category.title} prayer category icon` }
                        width={ 48 }
                        height={ 48 }
                        loading="lazy"
                        className="h-12 w-12 transition-transform group-hover:scale-110"
                      />
                    </div>
                  ) }
                  <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                    { category.title }
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-600">
                    { category.description }
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-gray-500">
                      { category.prayerCount }{ " " }
                      { category.prayerCount === 1 ? "prayer" : "prayers" }
                    </p>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#e31e24] transition-transform group-hover:translate-x-1">
                      View
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )) }
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/prayer/category"
                className="inline-block font-bold text-[#e31e24] transition-colors hover:text-[#c41a1f]"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </section>
      ) }

      {/* Recent Prayers Grid */ }
      { recentPrayers && recentPrayers.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 max-w-2xl sm:mb-10">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Recent Prayers
              </h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Watch the latest prayers from Pastor Jomo
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              { recentPrayers.map((prayer: any) => {
                const imageUrl = prayer.featuredImage
                  ? urlForImage(prayer.featuredImage)?.width(600).height(400).url()
                  : null;

                return (
                  <Link
                    key={ prayer._id }
                    href={ `/prayer/${prayer.slug}` }
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      { imageUrl ? (
                        <Image
                          src={ imageUrl }
                          alt={ `${prayer.title} - Prayer with Pastor Jomo Cousins` }
                          fill
                          sizes="(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-300">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      ) }
                      { prayer.duration && (
                        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                          { prayer.duration }
                        </div>
                      ) }
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                        { prayer.title }
                      </h3>
                      { prayer.excerpt && (
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                          { prayer.excerpt }
                        </p>
                      ) }
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3 text-xs text-gray-500">
                        <span>Led by Pastor Jomo Cousins</span>
                        { prayer.publishedAt && (
                          <span>
                            { format(parseISO(prayer.publishedAt), "MMM d, yyyy") }
                          </span>
                        ) }
                      </div>
                    </div>
                  </Link>
                );
              }) }
            </div>
          </div>
        </section>
      ) }

      {/* Personal Message from Jomo */ }
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="relative">
              <div className="mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl md:max-w-none">
                <Image
                  src="/images/jc-png/Instagram post 2_Master_Pic.webp"
                  alt="Jomo Cousins"
                  width={ 500 }
                  height={ 500 }
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Prayer Changes Everything
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Prayer has transformed my life, and I'm committed to praying for
                  you. Whether you're facing a challenge, seeking guidance, or
                  simply need encouragement, I want to partner with you in prayer.
                </p>
                <p>
                  Each prayer video you find here comes from my heart. I believe
                  in the power of personal, intimate prayer - and I'm honored to
                  pray with you.
                </p>
                <p className="italic">
                  You're not alone. Let's pray together.
                </p>
                <p className="font-bold">- Pastor Jomo Cousins</p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block font-bold text-[#e31e24] transition-colors hover:text-[#c41a1f]"
                >
                  Learn More About Pastor Jomo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */ }
      { testimonials && testimonials.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 max-w-2xl sm:mb-10">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Prayer Stories
              </h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Hear from others who have experienced God's power through prayer
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              { testimonials.map((testimonial: any) => (
                <div
                  key={ testimonial._id }
                  className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
                >
                  <p className="mb-6 italic leading-relaxed text-gray-700">
                    "{ testimonial.testimonialText }"
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-[#3d3d3d]">
                      { testimonial.name }
                    </p>
                    { testimonial.location && (
                      <p className="text-sm text-gray-500">
                        { testimonial.location }
                      </p>
                    ) }
                  </div>
                </div>
              )) }
            </div>
          </div>
        </section>
      ) }

      {/* Dual CTA Section */ }
      <section className="bg-[#3d3d3d] py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Need prayer right now?
            </h2>
            <p className="mb-10 text-xl text-gray-300">
              Pastor Jomo is praying with you. Find the prayer you need or send your
              personal request.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                href="/prayer/search"
                className="rounded-lg bg-white px-6 py-3.5 text-center text-base font-bold text-[#3d3d3d] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                Search Prayer Library
              </Link>
              <Link
                href="/prayer/submit"
                className="rounded-lg border-2 border-white bg-[#e31e24] px-6 py-3.5 text-center text-base font-bold text-white transition-all hover:bg-[#c41a1f]"
              >
                Send Pastor Jomo Your Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
