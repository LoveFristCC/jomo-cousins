import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  prayerTeachingBySlugQuery,
  prayerTeachingsQuery,
} from "@/sanity/lib/queries";
import CustomPortableText from "@/app/(home)/portable-text";
import { ScriptureCard, type Scripture } from "../../week/_components/ScriptureCard";
import RelatedVideos, { type RelatedVideo } from "../../week/_components/RelatedVideos";

export const revalidate = 3600;

const SITE_URL = "https://www.jomocousins.com";

type BodyItem = { _key?: string; _type?: string } & Record<string, any>;

type Teaching = {
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  keyScripture?: Scripture | null;
  body?: BodyItem[] | null;
  relatedVideos?: RelatedVideo[] | null;
};

type TeachingLink = { _id: string; title?: string | null; slug?: string | null };

/**
 * Splits the body into runs of prose and standalone scripture cards, so the
 * shared portable-text renderer handles the prose and scriptures render as
 * the same cards used on the prayer-week pages.
 */
function groupBody(body: BodyItem[]) {
  const groups: ({ kind: "prose"; blocks: BodyItem[] } | { kind: "scripture"; item: BodyItem })[] = [];
  for (const item of body) {
    if (item._type === "scripture") {
      groups.push({ kind: "scripture", item });
    } else {
      const last = groups[groups.length - 1];
      if (last?.kind === "prose") last.blocks.push(item);
      else groups.push({ kind: "prose", blocks: [item] });
    }
  }
  return groups;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teaching = (await sanityFetch({
    query: prayerTeachingBySlugQuery,
    params: { slug },
  })) as Teaching | null;

  if (!teaching) return { title: "Prayer Teaching" };

  const title = `${teaching.title} | Prayer Teaching with Pastor Jomo`;
  const description = teaching.summary ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/prayer/teaching/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/prayer/teaching/${slug}`,
      type: "article",
    },
  };
}

export default async function PrayerTeachingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [teaching, all] = await Promise.all([
    sanityFetch({ query: prayerTeachingBySlugQuery, params: { slug } }) as Promise<Teaching | null>,
    sanityFetch({ query: prayerTeachingsQuery }) as Promise<TeachingLink[]>,
  ]);

  if (!teaching) notFound();

  const others = (all ?? []).filter((t) => t.slug && t.slug !== slug);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-3xl px-5 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/prayer" className="hover:text-[#e31e24]">
            Prayer
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Teaching</span>
        </nav>

        {/* Header */}
        <header className="border-b border-gray-200 pb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
            Prayer Teaching
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {teaching.title}
          </h1>
          {teaching.summary && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {teaching.summary}
            </p>
          )}
        </header>

        {/* Key scripture */}
        {teaching.keyScripture?.text && (
          <div className="mt-8">
            <ScriptureCard scripture={teaching.keyScripture} />
          </div>
        )}

        {/* Teaching body */}
        <div className="mt-8 grid gap-6">
          {groupBody(teaching.body ?? []).map((group, i) =>
            group.kind === "scripture" ? (
              <ScriptureCard
                key={group.item._key ?? `s-${i}`}
                scripture={group.item as Scripture}
              />
            ) : (
              <div key={group.blocks[0]?._key ?? `p-${i}`} className="prose prose-lg max-w-none text-gray-700">
                <CustomPortableText value={group.blocks} />
              </div>
            ),
          )}
        </div>

        {/* Prayer videos */}
        <RelatedVideos
          videos={teaching.relatedVideos}
          heading="Pray along with Pastor Jomo"
        />

        {/* More teachings */}
        {others.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              More prayer teachings
            </h2>
            <div className="mt-5 grid gap-3">
              {others.map((t) => (
                <Link
                  key={t._id}
                  href={`/prayer/teaching/${t.slug}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 font-bold text-gray-900 shadow-sm transition-colors hover:border-[#e31e24] hover:text-[#e31e24]"
                >
                  {t.title}
                  <span aria-hidden>&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        )}

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
