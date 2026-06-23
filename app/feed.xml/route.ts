import { sanityFetch } from "@/sanity/lib/fetch";
import { recentPrayersQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

const SITE_URL = "https://www.jomocousins.com";
const FEED_TITLE = "Pray with Pastor Jomo Cousins";
const FEED_DESCRIPTION =
  "New prayer videos from Pastor Jomo Cousins — biblical encouragement and personal prayer for healing, finances, relationships, and more.";

// Rebuild the feed at most once an hour.
export const revalidate = 3600;

/** Escape a string for safe inclusion in XML text/attribute nodes. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Format a date as an RFC-822 string, which is what RSS 2.0 requires. */
function toRfc822(date: Date): string {
  return date.toUTCString();
}

export async function GET() {
  const prayers = await sanityFetch({
    query: recentPrayersQuery,
    params: { limit: 50 },
  });

  const items = (prayers || [])
    .filter((prayer: any) => prayer?.slug)
    .map((prayer: any) => {
      const link = `${SITE_URL}/prayer/${prayer.slug}`;
      const pubDate = prayer.publishedAt
        ? toRfc822(new Date(prayer.publishedAt))
        : undefined;
      const imageUrl = prayer.featuredImage
        ? urlForImage(prayer.featuredImage)?.width(1200).height(630).fit("crop").url()
        : undefined;

      const categories: string[] = (prayer.categories || [])
        .map((cat: any) => cat?.title)
        .filter(Boolean);

      return [
        "    <item>",
        `      <title>${escapeXml(prayer.title || "Untitled Prayer")}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        prayer.excerpt
          ? `      <description>${escapeXml(prayer.excerpt)}</description>`
          : "",
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        "      <dc:creator>Pastor Jomo Cousins</dc:creator>",
        ...categories.map(
          (cat) => `      <category>${escapeXml(cat)}</category>`
        ),
        imageUrl
          ? `      <media:content url="${escapeXml(imageUrl)}" medium="image" />`
          : "",
        imageUrl
          ? `      <media:thumbnail url="${escapeXml(imageUrl)}" />`
          : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  // Most-recent prayer drives the channel's lastBuildDate / pubDate.
  const latest = (prayers || []).find((p: any) => p?.publishedAt);
  const lastBuildDate = toRfc822(
    latest?.publishedAt ? new Date(latest.publishedAt) : new Date()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/prayer</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-US</language>
    <copyright>Copyright ${new Date().getFullYear()} Jomo Cousins</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/images/logos/JomoCousins%20Logo15.png</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}/prayer</link>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
