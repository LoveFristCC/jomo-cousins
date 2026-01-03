import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerCategoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

// Enable ISR with revalidation every 12 hours
export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Prayer Categories | Browse All Prayer Topics with Pastor Jomo Cousins",
  description:
    "Explore all prayer categories with Pastor Jomo Cousins. Find prayers for healing, finances, relationships, anxiety, spiritual growth, and more. Jomo is praying with you.",
  keywords: [
    "prayer categories",
    "prayer topics",
    "types of prayer",
    "healing prayer",
    "financial prayer",
    "relationship prayer",
    "anxiety prayer",
    "Jomo Cousins prayers",
    "Christian prayer categories",
    "biblical prayer topics",
  ],
  alternates: {
    canonical: "https://www.jomocousins.com/prayer/category",
  },
  openGraph: {
    title: "All Prayer Categories | Pray with Pastor Jomo Cousins",
    description:
      "Browse all prayer categories and find the spiritual guidance you need. Pastor Jomo Cousins offers prayers for every area of your life.",
    url: "https://www.jomocousins.com/prayer/category",
    type: "website",
    siteName: "Dr. Jomo Cousins",
    images: [
      {
        url: "/images/logos/Asset 1.webp",
        width: 1200,
        height: 630,
        alt: "Prayer Categories - Pray with Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Prayer Categories | Pastor Jomo Cousins",
    description:
      "Browse all prayer categories. Find prayers for healing, finances, relationships, and more.",
    creator: "@pastorjomo",
    site: "@pastorjomo",
    images: [ "/images/logos/Asset 1.webp" ],
  },
};

export default async function PrayerCategoriesPage() {
  const categories = await sanityFetch({ query: prayerCategoriesQuery });

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.jomocousins.com/prayer/category#breadcrumb",
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
            name: "Prayer Categories",
            item: "https://www.jomocousins.com/prayer/category",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.jomocousins.com/prayer/category",
        name: "Prayer Categories",
        description:
          "Browse all prayer categories with Pastor Jomo Cousins. Find prayers for every area of your life.",
        url: "https://www.jomocousins.com/prayer/category",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: categories?.length || 0,
          itemListElement: categories?.map((category: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.jomocousins.com/prayer/category/${category.slug}`,
            name: category.title,
          })),
        },
        breadcrumb: {
          "@id": "https://www.jomocousins.com/prayer/category#breadcrumb",
        },
        about: {
          "@type": "Person",
          name: "Jomo Cousins",
          jobTitle: "Pastor & Spiritual Leader",
          url: "https://www.jomocousins.com",
        },
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

      {/* Breadcrumbs */ }
      <nav
        className="border-b border-gray-200 bg-gray-50 py-3"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-5">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#e31e24]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link
                href="/prayer"
                className="transition-colors hover:text-[#e31e24]"
              >
                Prayer
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="font-semibold text-[#3d3d3d]">
                All Categories
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */ }
      <header
        id="main-content"
        className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-16 text-white md:py-20"
      >
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              All Prayer Categories
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-300 md:text-2xl">
              Explore every prayer topic with Pastor Jomo Cousins. Find the
              spiritual guidance and support you need for any area of your life.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/search"
                className="rounded-lg bg-[#e31e24] px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f] hover:shadow-xl"
              >
                Search Prayers
              </Link>
              <Link
                href="/prayer/submit"
                className="rounded-lg border-2 border-white px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
              >
                Send Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* All Categories Grid */ }
      <section className="bg-white py-20">
        <div className="container mx-auto px-5">
          { categories && categories.length > 0 ? (
            <>
              <div className="mb-12 text-center">
                <h2 className="mb-3 text-2xl font-bold text-[#3d3d3d] md:text-3xl">
                  Browse { categories.length } Prayer Categories
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Select a category to find prayers that speak to your specific
                  needs. Pastor Jomo is praying with you.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { categories.map((category: any) => (
                  <Link
                    key={ category._id }
                    href={ `/prayer/category/${category.slug}` }
                    className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-[#e31e24] hover:shadow-2xl"
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
                    <p className="mb-4 text-sm text-gray-600">
                      { category.description }
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-500">
                        { category.prayerCount }{ " " }
                        { category.prayerCount === 1 ? "prayer" : "prayers" }
                      </p>
                      <span className="flex items-center gap-1 text-sm font-bold text-[#e31e24] transition-transform group-hover:translate-x-1">
                        View
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={ 2 }
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                )) }
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">
                No categories available at this time.
              </p>
            </div>
          ) }
        </div>
      </section>

      {/* CTA Section */ }
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#3d3d3d] to-[#2d2d2d] p-12 text-center text-white shadow-2xl">
            <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
              <Image
                src="/images/jc-color-pics/_JC_NewPhotos Edit141.webp"
                alt="Pastor Jomo Cousins"
                width={ 96 }
                height={ 96 }
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Can't Find What You're Looking For?
            </h2>
            <p className="mb-8 text-xl leading-relaxed">
              Send your specific prayer request directly to Pastor Jomo. You're
              not alone—I'm praying with you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/submit"
                className="rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#c41a1f]"
              >
                Send Your Prayer Request
              </Link>
              <Link
                href="/prayer"
                className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#3d3d3d]"
              >
                Back to Prayer Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
