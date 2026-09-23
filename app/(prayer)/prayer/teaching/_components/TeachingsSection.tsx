import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerTeachingsQuery } from "@/sanity/lib/queries";

type Teaching = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  keyReference?: string | null;
};

/**
 * "Learn to Pray" block for the /prayer page — one card per prayer teaching.
 * Returns null until at least one teaching is published.
 */
export default async function TeachingsSection() {
  const teachings = ((await sanityFetch({
    query: prayerTeachingsQuery,
  })) as Teaching[]).filter((t) => t.slug);

  if (teachings.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
            Prayer Teachings
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#3d3d3d] md:text-4xl">
            Learn to Pray with Pastor Jomo
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Short teachings on prayer, each with prayer videos to pray along with.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachings.map((t) => (
            <Link
              key={t._id}
              href={`/prayer/teaching/${t.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#e31e24] hover:shadow-md"
            >
              {t.keyReference && (
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {t.keyReference}
                </p>
              )}
              <h3 className="mt-2 text-xl font-bold text-[#3d3d3d] transition-colors group-hover:text-[#e31e24]">
                {t.title}
              </h3>
              {t.summary && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {t.summary}
                </p>
              )}
              <span className="mt-auto pt-5 text-sm font-bold text-[#e31e24] transition-transform group-hover:translate-x-1">
                Read the teaching &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
