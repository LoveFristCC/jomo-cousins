import { sanityFetch } from "@/sanity/lib/fetch";
import { recentCouplesCornerPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

const SITE_URL = "https://www.jomocousins.com";
const FEED_TITLE = "Couples Corner — Jomo Cousins Marriage";
const FEED_DESCRIPTION =
  "Marriage encouragement, biblical wisdom, and practical help for couples from Jomo Cousins.";

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
  const posts = await sanityFetch({
    query: recentCouplesCornerPostsQuery,
    params: { limit: 50 },
  });

  const items = (posts || [])
    .filter((post: any) => post?.slug)
    .map((post: any) => {
      const link = `${SITE_URL}/marriage/blog/${post.slug}`;
      const pubDate = post.publishedAt
        ? toRfc822(new Date(post.publishedAt))
        : undefined;
      const imageUrl = post.coverImage
        ? urlForImage(post.coverImage)?.width(1200).height(630).fit("crop").url()
        : undefined;

      return [
        "    <item>",
        `      <title>${escapeXml(post.title || "Untitled")}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        post.excerpt
          ? `      <description>${escapeXml(post.excerpt)}</description>`
          : "",
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        "      <dc:creator>Jomo Cousins</dc:creator>",
        post.category
          ? `      <category>${escapeXml(post.category)}</category>`
          : "",
        imageUrl
          ? `      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />`
          : "",
        imageUrl
          ? `      <media:content url="${escapeXml(imageUrl)}" medium="image" />`
          : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  // Most-recent post drives the channel's lastBuildDate.
  const latest = (posts || []).find((p: any) => p?.publishedAt);
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
    <link>${SITE_URL}/marriage/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-US</language>
    <copyright>Copyright ${new Date().getFullYear()} Jomo Cousins</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/images/logos/Asset 1.webp</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}/marriage/blog</link>
    </image>
    <atom:link href="${SITE_URL}/marriage/feed.xml" rel="self" type="application/rss+xml" />
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
