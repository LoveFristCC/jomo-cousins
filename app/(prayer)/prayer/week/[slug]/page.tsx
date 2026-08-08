import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerWeekBySlugQuery } from "@/sanity/lib/queries";
import CustomPortableText from "@/app/(home)/portable-text";
import DayCard, { type Day } from "../_components/DayCard";
import { ScriptureCard, type Scripture } from "../_components/ScriptureCard";
import DownloadPointsButton from "../_components/DownloadPointsButton";
import RelatedVideos, { type RelatedVideo } from "../_components/RelatedVideos";

export const revalidate = 3600;

const SITE_URL = "https://www.jomocousins.com";

type Week = {
  weekNumber?: number | null;
  title?: string | null;
  slug?: string | null;
  weekOf?: string | null;
  sermonUrl?: string | null;
  sermonLabel?: string | null;
  intro?: any;
  days?: Day[] | null;
  unsortedScriptures?: Scripture[] | null;
  relatedVideos?: RelatedVideo[] | null;
  series?: {
    title?: string | null;
    slug?: string | null;
    subtitle?: string | null;
    totalWeeks?: number | null;
  } | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const week = (await sanityFetch({
    query: prayerWeekBySlugQuery,
    params: { slug },
  })) as Week | null;

  if (!week) return { title: "Breakthrough Prayers" };

  const seriesName = week.series?.title ?? "Prayer Series";
  const title = `Week ${week.weekNumber}: ${week.title} | ${seriesName}`;
  const description = `Prayer points to pray each morning this week — ${week.title}. Part of ${seriesName} with Pastor Jomo Cousins.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/prayer/week/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/prayer/week/${slug}`,
      type: "article",
    },
  };
}

export default async function PrayerWeekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const week = (await sanityFetch({
    query: prayerWeekBySlugQuery,
    params: { slug },
  })) as Week | null;

  if (!week) notFound();

  const days = (week.days ?? []).filter((d) => d?.day);
  const pool = week.unsortedScriptures ?? [];
  const dated = week.weekOf ? format(parseISO(week.weekOf), "MMMM d, yyyy") : null;
  const seriesName = week.series?.title ?? "Prayer Series";

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-3xl px-5 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/prayer" className="hover:text-[#e31e24]">
            {seriesName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Week {week.weekNumber}</span>
        </nav>

        {/* Header */}
        <header className="border-b border-gray-200 pb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
            Week {week.weekNumber}
            {week.series?.totalWeeks ? ` of ${week.series.totalWeeks}` : ""}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {week.title}
          </h1>
          {dated && (
            <p className="mt-3 text-gray-500">Week of {dated}</p>
          )}
          <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
            Prayer points to pray over each morning, Monday through Friday.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {(days.length > 0 || pool.length > 0) && (
              <DownloadPointsButton slug={week.slug!} />
            )}
            {week.sermonUrl && (
              <a
                href={week.sermonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#e31e24] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#c11a1f]"
              >
                {week.sermonLabel || "Watch the sermon"} &rarr;
              </a>
            )}
          </div>
        </header>

        {/* Intro */}
        {week.intro && (
          <div className="prose prose-lg mt-8 max-w-none text-gray-700">
            <CustomPortableText value={week.intro} />
          </div>
        )}

        {/* Days */}
        {days.length > 0 && (
          <div className="mt-10 grid gap-6">
            {days.map((day, i) => (
              <DayCard key={`${day.day}-${i}`} day={day} />
            ))}
          </div>
        )}

        {/* Unsorted pool */}
        {pool.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              {days.length > 0 ? "More prayer points this week" : "This week's prayer points"}
            </h2>
            <div className="mt-5 grid gap-4">
              {pool.map((s, i) => (
                <ScriptureCard key={`pool-${i}`} scripture={s} />
              ))}
            </div>
          </section>
        )}

        {days.length === 0 && pool.length === 0 && (
          <p className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
            Prayer points for this week are being prepared. Check back soon.
          </p>
        )}

        {/* Related prayer videos */}
        <RelatedVideos videos={week.relatedVideos} />

        {/* Footer nav */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href="/prayer"
            className="text-sm font-bold text-[#e31e24] hover:underline"
          >
            &larr; Back to Prayer
          </Link>
        </div>
      </div>
    </div>
  );
}
