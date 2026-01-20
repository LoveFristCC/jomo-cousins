import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { recentCouplesCornerPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";

export default async function RecentMarriageBlogSection() {
  // Fetch the most recent marriage blog post
  const posts = await sanityFetch({
    query: recentCouplesCornerPostsQuery,
    params: { limit: 1 },
  });

  const recentPost = posts?.[ 0 ];

  if (!recentPost) {
    return null;
  }

  const imageUrl = recentPost.coverImage
    ? urlForImage(recentPost.coverImage)?.width(1200).height(800).fit('crop').url()
    : null;

  return (
    <section className="relative overflow-hidden bg-[#303030] py-20 md:py-32">
      {/* Background Image with Overlay */ }
      { imageUrl && (
        <>
          <div className="absolute inset-0">
            <Image
              src={ imageUrl }
              alt={ recentPost.coverImage.alt || recentPost.title }
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#303030] via-[#303030]/95 to-[#303030]/80"></div>
        </>
      ) }

      <div className="container relative z-10 mx-auto px-5">
        <div className="mx-auto max-w-4xl">
          {/* Section Label */ }
          <div className="mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-[#ea8125]"></div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
              Couples' Corner
            </p>
          </div>

          {/* Content */ }
          <div className="grid gap-8 md:grid-cols-3">
            {/* Left Column - Title & Meta */ }
            <div className="md:col-span-2">
              {/* Category Badge */ }
              { recentPost.category && (
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-[#ea8125]/20 px-4 py-2 text-sm font-semibold text-[#ea8125]">
                    { recentPost.category }
                  </span>
                </div>
              ) }

              <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                { recentPost.title }
              </h2>

              { recentPost.excerpt && (
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  { recentPost.excerpt }
                </p>
              ) }

              {/* Date */ }
              { recentPost.publishedAt && (
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{ format(parseISO(recentPost.publishedAt), "MMMM d, yyyy") }</span>
                </div>
              ) }
            </div>

            {/* Right Column - CTA */ }
            <div className="flex flex-col justify-center gap-4">
              <Link
                href={ `/marriage/blog/${recentPost.slug}` }
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#ea8125] px-8 py-4 text-center font-bold uppercase tracking-wide text-white shadow-xl transition-all hover:bg-[#d67320] hover:shadow-2xl"
              >
                Read Now
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/marriage/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-center font-bold uppercase tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
              >
                All Articles
              </Link>

              {/* Decorative Element */ }
              <div className="mt-4 hidden md:block">
                <div className="flex items-center gap-3">

                  <p className="text-xs text-gray-400">
                    By Jomo & Charmaine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
