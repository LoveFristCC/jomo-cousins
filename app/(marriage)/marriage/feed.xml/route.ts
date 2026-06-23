import { sanityFetch } from "@/sanity/lib/fetch";
import { couplesCornerFeedQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import {
  cdata,
  escapeXml,
  faqToFeedHtml,
  portableTextToFeedHtml,
  toRfc822,
} from "@/lib/rss";

const SITE_URL = "https://www.jomocousins.com";
const FEED_TITLE = "Couples Corner — Jomo Cousins Marriage";
const FEED_DESCRIPTION =
  "Marriage encouragement, biblical wisdom, and practical help for couples from Jomo Cousins.";

// Rebuild the feed at most once an hour.
export const revalidate = 3600;

export async function GET() {
  const posts = await sanityFetch({
    query: couplesCornerFeedQuery,
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

      // The body is the full content. We appended "Common Questions" directly
      // into `content` for migrated posts, so only append the FAQ separately
      // when the content doesn't already include that heading (avoids dupes).
      const contentHtml = portableTextToFeedHtml(post.content);
      const alreadyHasFaq = /common questions/i.test(contentHtml);
      const faqHtml = alreadyHasFaq ? "" : faqToFeedHtml(post.faqSection);
      const fullHtml = [contentHtml, faqHtml].filter(Boolean).join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title || "Untitled")}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        post.excerpt
          ? `      <description>${escapeXml(post.excerpt)}</description>`
          : "",
        fullHtml
          ? `      <content:encoded>${cdata(fullHtml)}</content:encoded>`
          : "",
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        "      <dc:creator>Jomo Cousins</dc:creator>",
        post.category
          ? `      <category>${escapeXml(post.category)}</category>`
          : "",
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

  // Most-recent post drives the channel's lastBuildDate.
  const latest = (posts || []).find((p: any) => p?.publishedAt);
  const lastBuildDate = toRfc822(
    latest?.publishedAt ? new Date(latest.publishedAt) : new Date()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
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
      <url>${SITE_URL}/images/logos/JomoCousins%20Logo15.png</url>
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
