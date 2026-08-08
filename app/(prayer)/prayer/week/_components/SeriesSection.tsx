import Link from "next/link";
import { format, parseISO } from "date-fns";
import { sanityFetch } from "@/sanity/lib/fetch";
import { activePrayerSeriesQuery } from "@/sanity/lib/queries";
import RelatedVideos, { type RelatedVideo } from "./RelatedVideos";

type Week = {
  _id?: string;
  weekNumber?: number | null;
  title?: string | null;
  slug?: string | null;
  weekOf?: string | null;
  scriptureCount?: number | null;
  relatedVideos?: RelatedVideo[] | null;
};

type Series = {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  totalWeeks?: number | null;
  weeks?: Week[] | null;
} | null;

/**
 * The week to feature. Once weeks have "Week Of" dates, the most recent one
 * that has started wins; until then it falls back to Week 1.
 */
function pickCurrentWeek(weeks: Week[]): Week | undefined {
  const today = new Date().toISOString().slice(0, 10);
  const started = weeks
    .filter((w) => w.weekOf && w.weekOf <= today)
    .sort((a, b) => (a.weekOf! < b.weekOf! ? 1 : -1));
  if (started.length) return started[0];
  return [...weeks].sort((a, b) => (a.weekNumber ?? 99) - (b.weekNumber ?? 99))[0];
}

/**
 * Featured prayer-series block for the main /prayer page. Fetches the active
 * series and renders the current week plus the full week list. Returns null
 * when there's no active series, so the page is unaffected until one exists.
 */
export default async function SeriesSection() {
  const series = (await sanityFetch({
    query: activePrayerSeriesQuery,
  })) as Series;

  const weeks = (series?.weeks ?? []).filter((w) => w.slug);
  if (!series || weeks.length === 0) return null;

  const current = pickCurrentWeek(weeks);
  const totalWeeks = series.totalWeeks ?? weeks.length;

  return (
    <section className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white py-16 md:py-20">
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
              {totalWeeks}-Week Prayer Series
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
              {series.title}
            </h2>
            {series.subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
                {series.subtitle}
              </p>
            )}
          </div>

          {/* Current week callout */}
          {current && (
            <Link
              href={`/prayer/week/${current.slug}`}
              className="block rounded-2xl border border-[#e31e24] bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#e31e24]">
                Praying this week
              </p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                Week {current.weekNumber}: {current.title}
              </h3>
              <p className="mt-3 text-sm font-bold text-[#e31e24]">
                Open this week's prayer points &rarr;
              </p>
            </Link>
          )}

          {/* All weeks */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const n = i + 1;
              const week = weeks.find((w) => w.weekNumber === n);
              if (!week) {
                return (
                  <div
                    key={`ph-${n}`}
                    className="rounded-xl border border-dashed border-gray-300 bg-white/50 p-5"
                  >
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                      Week {n}
                    </p>
                    <p className="mt-1 text-gray-400">Coming soon</p>
                  </div>
                );
              }
              const dated = week.weekOf
                ? format(parseISO(week.weekOf), "MMM d")
                : null;
              return (
                <Link
                  key={week._id || n}
                  href={`/prayer/week/${week.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
                    Week {n}
                    {dated ? ` · ${dated}` : ""}
                  </p>
                  <h4 className="mt-1 font-bold leading-snug text-gray-900">
                    {week.title}
                  </h4>
                  {typeof week.scriptureCount === "number" &&
                    week.scriptureCount > 0 && (
                      <p className="mt-2 text-sm text-gray-500">
                        {week.scriptureCount} scripture
                        {week.scriptureCount === 1 ? "" : "s"}
                      </p>
                    )}
                </Link>
              );
            })}
          </div>

          {/* Current week's related videos */}
          {current?.relatedVideos && current.relatedVideos.length > 0 && (
            <RelatedVideos
              videos={current.relatedVideos}
              heading="Prayer videos for this week"
            />
          )}
        </div>
      </div>
    </section>
  );
}
