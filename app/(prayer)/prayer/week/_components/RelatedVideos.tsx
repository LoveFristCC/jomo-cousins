import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";

export type RelatedVideo = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  duration?: string | null;
  category?: string | null;
  featuredImage?: any;
};

/**
 * A rail of related prayer videos. Presentational and plain so it renders in
 * server components. Returns null when there's nothing to show.
 */
export default function RelatedVideos({
  videos,
  heading = "Prayer videos for this week",
}: {
  videos?: RelatedVideo[] | null;
  heading?: string;
}) {
  const list = (videos || []).filter((v) => v?.slug);
  if (list.length === 0) return null;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
        {heading}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {list.map((v) => {
          const img = v.featuredImage
            ? urlForImage(v.featuredImage)?.width(640).height(360).fit("crop").url()
            : undefined;
          return (
            <Link
              key={v._id || v.slug}
              href={`/prayer/${v.slug}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {img && (
                  <Image
                    src={img}
                    alt={v.title || "Prayer video"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white/90 drop-shadow" />
                </span>
                {v.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
                    {v.duration}
                  </span>
                )}
              </div>
              <div className="p-4">
                {v.category && (
                  <p className="text-xs font-bold uppercase tracking-wider text-[#e31e24]">
                    {v.category}
                  </p>
                )}
                <h3 className="mt-1 font-bold leading-snug text-gray-900 group-hover:text-[#e31e24]">
                  {v.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
