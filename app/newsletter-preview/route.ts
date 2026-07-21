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
 * The editorial pieces (Pastor Jomo's note, verse of the week, the weekly
 * challenge) live in WEEKLY below — edit that object each week before sending.
 * The short ones can also be overridden per-request, e.g.
 *   ?verse=...&verseRef=James%201:19&challenge=...
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

const CREAM = "#faf7f2";

/**
 * Marks copy that still needs writing. Any field containing this string is
 * flagged in the preview toolbar so placeholders never reach a real send.
 */
const TODO = "[EDIT ME]";

/**
 * EDIT ME EACH WEEK.
 *
 * Everything here is plain text — it gets HTML-escaped before rendering, so
 * write apostrophes and quotes normally. Leave a field empty ("") or set
 * `note: []` to drop that block from the email entirely.
 */
const WEEKLY = {
  /** Greeting line above the note. */
  greeting: "Friend,",
  /** One string per paragraph in Pastor Jomo's note. */
  note: [
    `${TODO} — Write this week's note from Pastor Jomo here. One string per paragraph; add or remove entries as needed.`,
  ],
  /** Optional line above the signature, e.g. "In His grip,". "" omits it. */
  signOff: "",
  signature: "Pastor Jomo",

  /** Verse of the week. Set `verse: ""` to hide the block. */
  verse: `${TODO} — Drop this week's verse here.`,
  verseRef: `${TODO} — Book Chapter:Verse`,

  /** Dark call-out near the bottom. Set to "" to hide. */
  challenge: `${TODO} — Give couples one concrete thing to do this week.`,

  /** Prayer-request CTA. Set `prayerCtaHeading: ""` to hide the block. */
  prayerCtaHeading: "How can we pray for you?",
  prayerCtaBody:
    "Hit reply and tell us what you're believing God for this week, or send your request below. Every one of them is prayed over.",
  prayerCtaButton: "Send a prayer request",
  prayerCtaPath: "/prayer/submit",
};

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
function renderCard(item: Item, ctaLabel = "Read more"): string {
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
            <a href="${link}" style="display:inline-block;background:${RED};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:11px 22px;border-radius:6px;">${escapeXml(
              ctaLabel
            )} &rarr;</a>
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

/** Pastor Jomo's opening note: greeting, paragraphs, sign-off. */
function renderNote(w: typeof WEEKLY): string {
  if (!w.note?.length && !w.greeting) return "";

  const p = (text: string, last = false) =>
    `<p style="margin:0 0 ${
      last ? "0" : "14px"
    } 0;font-size:16px;line-height:1.7;color:${CHARCOAL};">${text}</p>`;

  const body = w.note.map((para) => p(escapeXml(para))).join("\n            ");
  const signature = w.signature
    ? `<span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;">${escapeXml(
        w.signature
      )}</span>`
    : "";
  const signOff =
    w.signOff || signature
      ? p(
          [w.signOff ? escapeXml(w.signOff) : "", signature]
            .filter(Boolean)
            .join("<br />"),
          true
        )
      : "";

  return `
        <tr>
          <td style="padding:26px 30px 6px 30px;">
            ${w.greeting ? p(escapeXml(w.greeting)) : ""}
            ${body}
            ${signOff}
          </td>
        </tr>`;
}

/** Cream call-out with a red left rule holding the verse of the week. */
function renderVerse(w: typeof WEEKLY): string {
  if (!w.verse) return "";

  return `
        <tr>
          <td style="padding:22px 30px 8px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CREAM};border-left:4px solid ${RED};border-radius:0 10px 10px 0;">
              <tr>
                <td style="padding:20px 22px;">
                  <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${RED};">Verse for your week</p>
                  <p style="margin:0 0 8px 0;font-size:17px;line-height:1.6;color:${CHARCOAL};font-family:Georgia,'Times New Roman',serif;font-style:italic;">&ldquo;${escapeXml(
                    w.verse
                  )}&rdquo;</p>
                  ${
                    w.verseRef
                      ? `<p style="margin:0;font-size:13px;font-weight:700;color:${MUTED};">${escapeXml(
                          w.verseRef
                        )}</p>`
                      : ""
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

/** Dark "this week's challenge" card. Lives inside the body table. */
function renderChallenge(w: typeof WEEKLY): string {
  if (!w.challenge) return "";

  return `
  <tr>
    <td style="padding:0 0 34px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CHARCOAL};border-radius:12px;">
        <tr>
          <td style="padding:24px 26px;">
            <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${RED};">This week&apos;s challenge</p>
            <p style="margin:0;font-size:16px;line-height:1.7;color:#ffffff;">${escapeXml(
              w.challenge
            )}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/** Prayer-request CTA card. Lives inside the body table. */
function renderPrayerCta(w: typeof WEEKLY, link: string): string {
  if (!w.prayerCtaHeading) return "";

  return `
  <tr>
    <td style="padding:0 0 26px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:12px;background:${CREAM};">
        <tr>
          <td style="padding:26px 26px;text-align:center;">
            <h2 style="margin:0 0 10px 0;font-size:19px;line-height:1.3;font-weight:700;color:${CHARCOAL};font-family:Georgia,'Times New Roman',serif;">${escapeXml(
              w.prayerCtaHeading
            )}</h2>
            ${
              w.prayerCtaBody
                ? `<p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:${MUTED};">${escapeXml(
                    w.prayerCtaBody
                  )}</p>`
                : ""
            }
            <a href="${escapeXml(
              link
            )}" style="display:inline-block;background:${RED};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:6px;">${escapeXml(
    w.prayerCtaButton
  )} &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function buildEmailHtml(opts: {
  prayers: Item[];
  couples: Item[];
  rangeLabel: string;
  siteLink: string;
  weekly: typeof WEEKLY;
  prayerCtaLink: string;
}): string {
  const { prayers, couples, rangeLabel, siteLink, weekly, prayerCtaLink } =
    opts;

  const prayerSection =
    prayers.length > 0
      ? renderSectionHeading("Latest Prayers") +
        prayers.map((p) => renderCard(p, "Pray this prayer")).join("")
      : "";

  const couplesSection =
    couples.length > 0
      ? renderSectionHeading("Couples Corner") +
        couples.map((c) => renderCard(c, "Read the article")).join("")
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
        <!-- Personal note from Pastor Jomo -->${renderNote(weekly)}
        <!-- Verse of the week -->${renderVerse(weekly)}
        <!-- Body -->
        <tr>
          <td style="padding:18px 30px 8px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${prayerSection}
              ${couplesSection}
              ${emptyNote}
              ${renderChallenge(weekly)}
              ${renderPrayerCta(weekly, prayerCtaLink)}
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

  // Per-request overrides for the short editorial fields, so a one-off send can
  // be tweaked without editing WEEKLY. Anything not passed keeps its default.
  const weekly = {
    ...WEEKLY,
    verse: url.searchParams.get("verse") ?? WEEKLY.verse,
    verseRef: url.searchParams.get("verseRef") ?? WEEKLY.verseRef,
    challenge: url.searchParams.get("challenge") ?? WEEKLY.challenge,
  };

  const emailHtml = buildEmailHtml({
    prayers,
    couples,
    rangeLabel,
    siteLink: withUtm(SITE_URL, "footer"),
    weekly,
    prayerCtaLink: withUtm(
      `${SITE_URL}${weekly.prayerCtaPath}`,
      "prayer-request-cta"
    ),
  });

  // Which editorial fields are still placeholder text? Surfaced in the toolbar.
  const unwritten = (
    [
      ["Note", weekly.note.join(" ")],
      ["Verse", `${weekly.verse} ${weekly.verseRef}`],
      ["Challenge", weekly.challenge],
    ] as const
  )
    .filter(([, value]) => value.includes(TODO))
    .map(([label]) => label);

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
    .warn { background:#fff4d6; color:#7a5300; border-bottom:1px solid #e8cf92; padding:10px 16px; font-size:13px; font-weight:600; }
    .warn code { background:#f5e3b8; padding:1px 5px; border-radius:3px; font-weight:700; }
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
  ${
    unwritten.length > 0
      ? `<div class="warn">Still to write before sending: <b>${unwritten.join(
          ", "
        )}</b> — edit <code>WEEKLY</code> in <code>app/newsletter-preview/route.ts</code>.</div>`
      : ""
  }
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
