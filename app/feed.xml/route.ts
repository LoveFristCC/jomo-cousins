import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerFeedQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import {
  cdata,
  escapeXml,
  faqToFeedHtml,
  portableTextToFeedHtml,
  sectionHtml,
  toRfc822,
} from "@/lib/rss";

const SITE_URL = "https://www.jomocousins.com";
const FEED_TITLE = "Pray with Pastor Jomo Cousins";
const FEED_DESCRIPTION =
  "New prayer videos from Pastor Jomo Cousins — biblical encouragement and personal prayer for healing, finances, relationships, and more.";

// Rebuild the feed at most once an hour.
export const revalidate = 3600;

/**
 * Assemble a prayer's written sections into one HTML body for <content:encoded>,
 * mirroring the order shown on the prayer page. fullTranscript is a fallback
 * used only when the structured sections are empty.
 */
function buildPrayerHtml(prayer: any): string {
  const hasStructured =
    prayer.introParagraph ||
    prayer.wordBeforePrayer?.length ||
    prayer.writtenPrayer?.length ||
    prayer.howToUse?.length;

  const parts = [
    sectionHtml("A Note from Pastor Jomo", portableTextToFeedHtml(prayer.personalNote)),
    prayer.introParagraph ? `<p>${escapeXml(prayer.introParagraph)}</p>` : "",
    sectionHtml("A Word Before You Pray", portableTextToFeedHtml(prayer.wordBeforePrayer)),
    sectionHtml("The Prayer", portableTextToFeedHtml(prayer.writtenPrayer)),
    sectionHtml("How to Use This Prayer", portableTextToFeedHtml(prayer.howToUse)),
    hasStructured
      ? ""
      : sectionHtml("Full Prayer Text", portableTextToFeedHtml(prayer.fullTranscript)),
    faqToFeedHtml(prayer.faqSection, "Frequently Asked Questions"),
  ];

  return parts.filter(Boolean).join("\n");
}

export async function GET() {
  const prayers = await sanityFetch({
    query: prayerFeedQuery,
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

      const fullHtml = buildPrayerHtml(prayer);

      return [
        "    <item>",
        `      <title>${escapeXml(prayer.title || "Untitled Prayer")}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        prayer.excerpt
          ? `      <description>${escapeXml(prayer.excerpt)}</description>`
          : "",
        fullHtml
          ? `      <content:encoded>${cdata(fullHtml)}</content:encoded>`
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
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
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
