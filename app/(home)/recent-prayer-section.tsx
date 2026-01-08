import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { recentPrayersQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { getYouTubeVideoId } from "@/lib/youtube";
import { format, parseISO } from "date-fns";
import PrayerVideoPlayer from "./prayer-video-player";

export default async function RecentPrayerSection() {
  // Fetch the most recent prayer video
  const prayers = await sanityFetch({
    query: recentPrayersQuery,
    params: { limit: 1 },
  });

  const recentPrayer = prayers?.[0];

  if (!recentPrayer) {
    return null;
  }

  // Get video ID with fallback
  const videoId = getYouTubeVideoId(recentPrayer.youtubeVideoId, recentPrayer.youtubeUrl);

  // Get thumbnail URL with proper dimensions for 16:9 aspect ratio
  const thumbnailUrl = recentPrayer.featuredImage
    ? urlForImage(recentPrayer.featuredImage)?.width(1280).height(720).fit('crop').url()
    : videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;

  return (
    <section className="relative bg-white py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #e31e24 0, #e31e24 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px'
        }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-5">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#e31e24]">
            Latest Prayer
          </p>
          <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
            Most Recent <span className="text-[#e31e24]">Prayer Video</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join Pastor Jomo Cousins in prayer. Watch the latest prayer video and find spiritual guidance and encouragement.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="grid md:grid-cols-2 md:items-stretch">
              {/* Video Player - No padding, fills completely */}
              <div className="relative w-full md:h-full">
                <PrayerVideoPlayer
                  videoId={videoId}
                  thumbnailUrl={thumbnailUrl}
                  title={recentPrayer.title}
                />
              </div>

              {/* Prayer Details */}
              <div className="flex flex-col justify-center p-8">
                <h3 className="mb-4 text-2xl font-bold text-[#3d3d3d] md:text-3xl">
                  {recentPrayer.title}
                </h3>

                {recentPrayer.excerpt && (
                  <p className="mb-6 text-gray-700 leading-relaxed">
                    {recentPrayer.excerpt}
                  </p>
                )}

                {/* Meta Info */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {recentPrayer.publishedAt && (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {format(parseISO(recentPrayer.publishedAt), "MMMM d, yyyy")}
                    </span>
                  )}
                  {recentPrayer.duration && (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recentPrayer.duration}
                    </span>
                  )}
                </div>

                {/* Categories */}
                {recentPrayer.categories && recentPrayer.categories.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {recentPrayer.categories.map((category: any) => (
                      <span
                        key={category.slug}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-[#3d3d3d]"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/prayer/${recentPrayer.slug}`}
                    className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 text-center font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    Watch Full Prayer
                  </Link>
                  <Link
                    href="/prayer"
                    className="inline-block rounded-lg border-2 border-[#3d3d3d] px-8 py-3 text-center font-bold uppercase tracking-wide text-[#3d3d3d] shadow-md transition-all hover:scale-105 hover:bg-[#3d3d3d] hover:text-white hover:shadow-lg"
                  >
                    More Prayers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
