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
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
              Couples <span className="text-[#ea8125]">Corner</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              Insights, tips, and advice for building stronger, healthier relationships.
              Read our latest thoughts on communication, intimacy, trust, and more.
            </p>
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
    </div>
  );
}

export const metadata = {
  title: "Couples Corner - Relationship Advice Blog",
  description: "Read expert advice on communication, intimacy, trust, and building stronger relationships from Dr. Jomo and Dr. Charmaine Cousins.",
};
