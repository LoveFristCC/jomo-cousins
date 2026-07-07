import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/utils";
import { escapeXml } from "@/lib/rss";
import { format, subDays } from "date-fns";

/**
 * Weekly newsletter builder.
 *
 * Pulls the last N days (default 7) of prayers and Couples Corner posts from
 * Sanity — the same content that powers /feed.xml and /marriage/feed.xml — and
 * renders an email-safe HTML digest you can paste into a Kajabi broadcast.
 *
 * Usage:
 *   /newsletter-preview            -> rendered preview + "Copy HTML" button
 *   /newsletter-preview?raw=1      -> raw HTML source only (select-all, copy)
 *   /newsletter-preview?days=14    -> change the look-back window
 *   /newsletter-preview?key=SECRET -> required only if NEWSLETTER_PREVIEW_SECRET is set
 *
 * This route is intentionally not indexed (noindex header + meta + robots.ts)
 * and is not listed in the sitemap.
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.jomocousins.com";
const LOGO_URL = `${SITE_URL}/images/logos/JomoCousins%20Logo15.png`;

// Brand palette (pulled from the site components).
const RED = "#e31e24";
const CHARCOAL = "#2d2d2d";
const MUTED = "#6b6b6b";
const BORDER = "#e6e6e6";
const BG = "#f4f4f5";

const prayersQuery = /* groq */ `
  *[_type == "prayerVideo" && defined(slug.current) && publishedAt >= $since]
    | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      featuredImage,
      publishedAt,
      "category": prayerCategories[0]->title
    }
`;

const couplesQuery = /* groq */ `
  *[_type == "couplesCornerPost" && defined(slug.current)
    && coalesce(publishedAt, _createdAt) >= $since]
    | order(coalesce(publishedAt, _createdAt) desc) {
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      category,
      "publishedAt": coalesce(publishedAt, _createdAt)
    }
`;

type Item = {
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  image?: string;
  link?: string;
};

function imgUrl(source: any): string | undefined {
  if (!source) return undefined;
  return urlForImage(source)?.width(1200).height(630).fit("crop").url();
}

/** One content card: image, optional category pill, title, excerpt, button. */
function renderCard(item: Item): string {
  const title = escapeXml(item.title || "Untitled");
  const link = escapeXml(item.link || "#");
  const excerpt = item.excerpt ? escapeXml(item.excerpt) : "";
  const pill = item.category
    ? `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${RED};padding:0 0 8px 0;">${escapeXml(
        item.category
      )}</span><br />`
    : "";
  const image = item.image
    ? `<a href="${link}" style="text-decoration:none;"><img src="${escapeXml(
        item.image
      )}" alt="${title}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border-radius:10px;border:0;outline:none;text-decoration:none;" /></a>`
    : "";

  return `
  <tr>
    <td style="padding:0 0 34px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:12px;overflow:hidden;background:#ffffff;">
        ${image ? `<tr><td style="padding:0;">${image}</td></tr>` : ""}
        <tr>
          <td style="padding:20px 22px 22px 22px;">
            ${pill}
            <h3 style="margin:0 0 8px 0;font-size:20px;line-height:1.3;font-weight:700;color:${CHARCOAL};font-family:Georgia,'Times New Roman',serif;">
              <a href="${link}" style="color:${CHARCOAL};text-decoration:none;">${title}</a>
            </h3>
            ${
              excerpt
                ? `<p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:${MUTED};">${excerpt}</p>`
                : ""
            }
            <a href="${link}" style="display:inline-block;background:${RED};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:11px 22px;border-radius:6px;">Read more &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/** Section heading with a red underline accent. */
function renderSectionHeading(label: string): string {
  return `
  <tr>
    <td style="padding:8px 0 20px 0;">
      <h2 style="margin:0;font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${CHARCOAL};padding-bottom:10px;border-bottom:3px solid ${RED};display:inline-block;">${escapeXml(
        label
      )}</h2>
    </td>
  </tr>`;
}

function buildEmailHtml(opts: {
  prayers: Item[];
  couples: Item[];
  rangeLabel: string;
  siteLink: string;
}): string {
  const { prayers, couples, rangeLabel, siteLink } = opts;

  const prayerSection =
    prayers.length > 0
      ? renderSectionHeading("Latest Prayers") +
        prayers.map(renderCard).join("")
      : "";

  const couplesSection =
    couples.length > 0
      ? renderSectionHeading("Couples Corner") +
        couples.map(renderCard).join("")
      : "";

  const emptyNote =
    prayers.length === 0 && couples.length === 0
      ? `<tr><td style="padding:20px 0;font-size:15px;color:${MUTED};text-align:center;">No new posts were published in this window. Try a wider range with <b>?days=14</b>.</td></tr>`
      : "";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="padding:30px 30px 18px 30px;text-align:center;border-bottom:1px solid ${BORDER};">
            <img src="${LOGO_URL}" alt="Jomo Cousins" width="150" style="display:inline-block;width:150px;max-width:60%;height:auto;border:0;" />
            <p style="margin:14px 0 0 0;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTED};">Weekly Update &middot; ${escapeXml(
              rangeLabel
            )}</p>
          </td>
        </tr>
        <!-- Intro -->
        <tr>
          <td style="padding:26px 30px 6px 30px;">
            <p style="margin:0;font-size:16px;line-height:1.6;color:${CHARCOAL};">Friend, here is what's new this week — fresh prayers and encouragement for your marriage. Take a moment to be filled up.</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:18px 30px 8px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${prayerSection}
              ${couplesSection}
              ${emptyNote}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:22px 30px 30px 30px;border-top:1px solid ${BORDER};text-align:center;">
            <p style="margin:0 0 6px 0;font-size:14px;color:${CHARCOAL};font-weight:700;">Jomo Cousins</p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">You are receiving this because you subscribed at jomocousins.com.<br />
            <a href="${escapeXml(siteLink)}" style="color:${MUTED};">jomocousins.com</a></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Optional lock: only enforced when the env var is set.
  const secret = process.env.NEWSLETTER_PREVIEW_SECRET;
  if (secret && url.searchParams.get("key") !== secret) {
    return new Response("Not found", { status: 404 });
  }

  const days = Math.min(
    Math.max(parseInt(url.searchParams.get("days") || "7", 10) || 7, 1),
    90
  );
  const raw = url.searchParams.get("raw") === "1";

  const now = new Date();
  const since = subDays(now, days);
  const rangeLabel = `${format(since, "MMM d")} – ${format(now, "MMM d, yyyy")}`;

  // UTM tagging so clicks are attributable in GA4. Source/medium/campaign are
  // overridable via query params; campaign defaults to the send date so each
  // weekly send is its own campaign in reports.
  const utmSource = url.searchParams.get("utm_source") || "kajabi";
  const utmMedium = url.searchParams.get("utm_medium") || "email";
  const utmCampaign =
    url.searchParams.get("campaign") ||
    `weekly-newsletter-${format(now, "yyyy-MM-dd")}`;

  /** Append UTM params to an internal link. `content` identifies the item. */
  function withUtm(link: string, content: string): string {
    const u = new URL(link);
    u.searchParams.set("utm_source", utmSource);
    u.searchParams.set("utm_medium", utmMedium);
    u.searchParams.set("utm_campaign", utmCampaign);
    if (content) u.searchParams.set("utm_content", content);
    return u.toString();
  }

  const [prayersRaw, couplesRaw] = await Promise.all([
    sanityFetch({ query: prayersQuery, params: { since: since.toISOString() } }),
    sanityFetch({ query: couplesQuery, params: { since: since.toISOString() } }),
  ]);

  const prayers: Item[] = (prayersRaw || []).map((p: any) => ({
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishedAt: p.publishedAt,
    image: imgUrl(p.featuredImage),
    link: withUtm(`${SITE_URL}/prayer/${p.slug}`, `prayer-${p.slug}`),
  }));

  const couples: Item[] = (couplesRaw || []).map((c: any) => ({
    title: c.title,
    excerpt: c.excerpt,
    category: c.category,
    publishedAt: c.publishedAt,
    image: imgUrl(c.coverImage),
    link: withUtm(`${SITE_URL}/marriage/blog/${c.slug}`, `couples-${c.slug}`),
  }));

  const emailHtml = buildEmailHtml({
    prayers,
    couples,
    rangeLabel,
    siteLink: withUtm(SITE_URL, "footer"),
  });

  // Raw mode: hand back just the email source as plain text for copying.
  if (raw) {
    return new Response(emailHtml, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    });
  }

  // Preview mode: a small toolbar (not part of the email) + a one-click copy,
  // plus the rendered email below it.
  const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Weekly Newsletter — ${escapeXml(rangeLabel)}</title>
  <style>
    body { margin:0; background:${BG}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
    .toolbar { position:sticky; top:0; z-index:10; background:${CHARCOAL}; color:#fff; padding:12px 16px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; box-shadow:0 2px 8px rgba(0,0,0,.15); }
    .toolbar b { font-size:14px; }
    .toolbar .hint { font-size:12px; color:#c9c9c9; }
    .btn { background:${RED}; color:#fff; border:0; font-size:13px; font-weight:700; padding:9px 16px; border-radius:6px; cursor:pointer; }
    .btn.secondary { background:transparent; border:1px solid #666; }
    .btn:active { transform:translateY(1px); }
    a.tool { color:#fff; font-size:13px; text-decoration:underline; }
    #ok { color:#7CFC9B; font-size:13px; font-weight:700; display:none; }
  </style>
</head>
<body>
  <div class="toolbar">
    <b>Weekly Newsletter</b>
    <span class="hint">${escapeXml(rangeLabel)} · ${prayers.length} prayer(s), ${couples.length} couples post(s) · UTM campaign: <b>${escapeXml(utmCampaign)}</b></span>
    <button class="btn" id="copyBtn" type="button">Copy HTML for Kajabi</button>
    <a class="tool" href="?raw=1">View raw source</a>
    <span class="hint">Change window: <a class="tool" href="?days=14">?days=14</a></span>
    <span id="ok">Copied! Paste into a Kajabi Custom Code block.</span>
  </div>
  <textarea id="src" style="position:absolute;left:-9999px;top:-9999px;" aria-hidden="true">${escapeXml(
    emailHtml
  )}</textarea>
  ${emailHtml}
  <script>
    document.getElementById('copyBtn').addEventListener('click', async function () {
      var src = document.getElementById('src').value;
      try {
        await navigator.clipboard.writeText(src);
      } catch (e) {
        var ta = document.getElementById('src');
        ta.style.left = '0'; ta.style.top = '0'; ta.focus(); ta.select();
        document.execCommand('copy');
        ta.style.left = '-9999px';
      }
      var ok = document.getElementById('ok');
      ok.style.display = 'inline';
      setTimeout(function () { ok.style.display = 'none'; }, 4000);
    });
  </script>
</body>
</html>`;

  return new Response(page, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
