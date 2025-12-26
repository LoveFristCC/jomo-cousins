import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allCouplesCornerPostsQuery, featuredCouplesCornerPostsQuery } from "@/sanity/lib/queries";
import type { AllCouplesCornerPostsQueryResult, FeaturedCouplesCornerPostsQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";

export default async function CouplesCornerPage() {
  const [allPosts, featuredPosts] = await Promise.all([
    sanityFetch({
      query: allCouplesCornerPostsQuery,
    }),
    sanityFetch({
      query: featuredCouplesCornerPostsQuery,
      params: { limit: 3 },
    }),
  ]);

  // Get unique categories from all posts
  const categories = Array.from(new Set(allPosts.map((post) => post.category).filter(Boolean)));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        {/* Background Image */}
        <Image
          src="/images/jomo-and-charmaine/couples-corner/couple-corner-hero.jpg"
          alt="Couples' Corner"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative flex h-full items-center justify-center">
          <div className="container mx-auto px-5">
            <h1 className="text-center text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Couples' Corner
            </h1>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
              Resources for Your Relationship
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              From dating ideas, to prayers for your marriage, get tips and resources that will help strengthen your bond.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Podcast */}
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <svg className="h-16 w-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-[#303030]">Podcast</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Listen to Relationship Tips & Advice on Jomo & Charmaine Podcast.
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
              >
                Listen Now
              </a>
            </div>

            {/* YouTube */}
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <svg className="h-16 w-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-[#303030]">YouTube</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our channel will provide you with relationship advice, marriage tools, and dating goals for the modern couple.
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-5">
            <h2 className="mb-12 text-3xl font-bold text-[#303030] md:text-4xl">
              Featured <span className="text-[#ea8125]">Articles</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => {
                const imageUrl = post.coverImage
                  ? urlForImage(post.coverImage)?.width(800).height(600).url()
                  : null;

                return (
                  <Link
                    key={post._id}
                    href={`/jomo-and-charmaine/couples-corner/${post.slug}`}
                    className="group"
                  >
                    <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl">
                      {/* Featured Badge */}
                      <div className="relative">
                        {imageUrl && (
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.coverImage.alt || post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="absolute right-4 top-4 rounded-full bg-[#ea8125] px-4 py-2 text-xs font-bold text-white shadow-lg">
                          ⭐ Featured
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Category & Date */}
                        <div className="mb-3 flex items-center gap-3 text-sm">
                          <span className="rounded-full bg-[#0E6BB7]/10 px-3 py-1 font-semibold text-[#0E6BB7]">
                            {post.category}
                          </span>
                          <span className="text-gray-500">
                            {format(parseISO(post.publishedAt), "MMM d, yyyy")}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-xl font-bold text-[#303030] transition-colors group-hover:text-[#ea8125]">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="line-clamp-3 text-gray-600">{post.excerpt}</p>

                        {/* Read More */}
                        <div className="mt-4 flex items-center font-semibold text-[#ea8125]">
                          Read More
                          <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20">
        <div className="container mx-auto px-5">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-[#303030] md:text-4xl">
              All <span className="text-[#ea8125]">Articles</span>
            </h2>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((category) => (
                  <span
                    key={category}
                    className="cursor-pointer rounded-full border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-[#ea8125] hover:text-[#ea8125]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {allPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => {
                const imageUrl = post.coverImage
                  ? urlForImage(post.coverImage)?.width(800).height(600).url()
                  : null;

                return (
                  <Link
                    key={post._id}
                    href={`/jomo-and-charmaine/couples-corner/${post.slug}`}
                    className="group"
                  >
                    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
                      {imageUrl && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.coverImage.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category & Date */}
                        <div className="mb-3 flex items-center gap-3 text-sm">
                          <span className="rounded-full bg-[#0E6BB7]/10 px-3 py-1 font-semibold text-[#0E6BB7]">
                            {post.category}
                          </span>
                          <span className="text-gray-500">
                            {format(parseISO(post.publishedAt), "MMM d, yyyy")}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-xl font-bold text-[#303030] transition-colors group-hover:text-[#ea8125]">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="line-clamp-3 text-gray-600">{post.excerpt}</p>

                        {/* Read More */}
                        <div className="mt-4 flex items-center font-semibold text-[#ea8125]">
                          Read More
                          <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-600">
                No blog posts yet. Check back soon for relationship insights!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Conversation Starters Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left - eBook Image */}
            <div className="relative flex justify-center">
              <Image
                src="/images/jomo-and-charmaine/main-page/conversation-staters.png"
                alt="Conversation Starters for Couples"
                width={500}
                height={500}
                className="w-full max-w-md h-auto"
                quality={100}
              />
            </div>

            {/* Right - Form */}
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#303030] md:text-4xl lg:text-5xl">
                Conversation Starters for Couples
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Enter Your Email Address and Download the Free eBook
              </p>

              {/* Progress Indicator */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ea8125] text-sm font-bold text-white">
                    1
                  </div>
                  <div className="h-[2px] w-16 bg-gray-300"></div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-bold text-gray-400">
                    2
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#ea8125] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#ea8125] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "Couples' Corner - Marriage & Relationship Blog",
  description: "Expert marriage advice and relationship tips from Drs. Jomo & Charmaine Cousins. Discover practical guidance on communication, intimacy, trust, dating ideas, prayers for marriage, and building stronger relationships. Faith-based wisdom from experienced Senior Pastors.",
  openGraph: {
    title: "Couples' Corner - Marriage Advice from Jomo & Charmaine",
    description: "Relationship resources, dating ideas, marriage prayers, and expert counseling tips from experienced Senior Pastors.",
  },
};
