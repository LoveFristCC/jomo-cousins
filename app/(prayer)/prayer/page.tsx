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

// Enable ISR with revalidation every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pray With Pastor Jomo | Daily Prayer & Spiritual Guidance",
  description: "Join Pastor Jomo Cousins in prayer. Watch daily prayer videos, find prayers for healing, finances, anxiety, and more. Send your prayer request.",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer",
  },
  openGraph: {
    title: "Pray With Pastor Jomo | Daily Prayer Videos & Spiritual Guidance",
    description: "Join Jomo in prayer. Daily prayer videos for healing, finances, anxiety, and more. You're not alone - Jomo is praying with you.",
    url: "https://www.jomocousins.com/prayer",
    type: "website",
    siteName: "Pray with Jomo Cousins",
    images: [
      {
        url: "/images/logos/Asset 1.png",
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
    images: [ "/images/logos/Asset 1.png" ],
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
        "@id": "https://www.jomocousins.com/#jomo",
        name: "Jomo Cousins",
        jobTitle: "Pastor & Spiritual Leader",
        description: "Pastor Jomo Cousins leads daily prayer and provides spiritual guidance through personal prayer videos.",
        url: "https://www.jomocousins.com",
        sameAs: [
          "https://www.facebook.com/pastorjomo",
          "https://www.instagram.com/pastorjomo",
          "https://www.youtube.com/@PASTORJOMO",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://www.jomocousins.com/prayer/#organization",
        name: "Pray with Jomo Prayer Ministry",
        founder: {
          "@id": "https://www.jomocousins.com/#jomo",
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
        className="relative bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] pt-20 text-white md:pt-32"
      >
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left - Content */ }
            <div>
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                Pray With Pastor Jomo
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-gray-300 md:text-2xl">
                Find peace, healing, and guidance through daily prayer. You're
                not alone.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/prayer/search"
                  className="rounded-lg bg-[#e31e24] px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f] hover:shadow-xl"
                  aria-label="Search prayer library to find a prayer"
                >
                  Find a Prayer Now
                </Link>
                <Link
                  href="/prayer/submit"
                  className="rounded-lg border-2 border-white px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
                  aria-label="Send your prayer request to Jomo Cousins"
                >
                  Send Prayer Request
                </Link>
              </div>
            </div>

            {/* Right - Image */ }
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/jc-png/_JC_NewPhotos Edit240.png"
                  alt="Pray with Jomo Cousins"
                  width={ 600 }
                  height={ 600 }
                  className="h-full w-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Prayer Topics Grid */ }
      { categories && categories.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-5">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Pray with Pastor Jomo about...
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Find prayers for every area of your life. Pastor Jomo is praying with
                you.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              { categories.slice(0, 8).map((category: any) => (
                <Link
                  key={ category._id }
                  href={ `/prayer/category/${category.slug}` }
                  className="group overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-md transition-all hover:shadow-xl"
                >
                  { category.icon && (
                    <div className="mb-4">
                      <Image
                        src={ urlForImage(category.icon)?.url() || "" }
                        alt={ `${category.title} prayer category icon` }
                        width={ 48 }
                        height={ 48 }
                        loading="lazy"
                        className="h-12 w-12"
                      />
                    </div>
                  ) }
                  <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                    { category.title }
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    { category.description }
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    { category.prayerCount }{ " " }
                    { category.prayerCount === 1 ? "prayer" : "prayers" }
                  </p>
                </Link>
              )) }
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/prayer/search"
                className="inline-block font-bold text-[#e31e24] transition-colors hover:text-[#c41a1f]"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </section>
      ) }

      {/* Recent Prayers Carousel */ }
      { recentPrayers && recentPrayers.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-5">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Recent Prayers
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Watch the latest prayers from Pastor Jomo
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              { recentPrayers.map((prayer: any) => {
                const imageUrl = prayer.featuredImage
                  ? urlForImage(prayer.featuredImage)?.width(600).height(400).url()
                  : null;

                return (
                  <Link
                    key={ prayer._id }
                    href={ `/prayer/${prayer.slug}` }
                    className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      { imageUrl ? (
                        <Image
                          src={ imageUrl }
                          alt={ `${prayer.title} - Prayer with Pastor Jomo Cousins` }
                          fill
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

                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                        { prayer.title }
                      </h3>
                      { prayer.excerpt && (
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                          { prayer.excerpt }
                        </p>
                      ) }
                      <div className="flex items-center justify-between text-xs text-gray-500">
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
      <section className="bg-white py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/jc-png/Instagram post 2_Master_Pic.png"
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
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-5">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
                Prayer Stories
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Hear from others who have experienced God's power through prayer
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              { testimonials.map((testimonial: any) => (
                <div
                  key={ testimonial._id }
                  className="rounded-xl bg-white p-8 shadow-md"
                >
                  <p className="mb-6 italic leading-relaxed text-gray-700">
                    "{ testimonial.testimonialText }"
                  </p>
                  <div>
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
      <section className="bg-[#3d3d3d] py-20 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Need prayer right now?
            </h2>
            <p className="mb-10 text-xl text-gray-300">
              Pastor Jomo is praying with you. Find the prayer you need or send your
              personal request.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/search"
                className="rounded-lg bg-white px-8 py-4 text-center text-lg font-bold text-[#3d3d3d] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                Search Prayer Library
              </Link>
              <Link
                href="/prayer/submit"
                className="rounded-lg border-2 border-white bg-[#e31e24] px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-[#c41a1f]"
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
