import { toHTML } from "@portabletext/to-html";
import { urlForImage } from "@/sanity/lib/utils";

/** Escape a string for safe inclusion in XML text/attribute nodes. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Format a date as an RFC-822 string, which is what RSS 2.0 requires. */
export function toRfc822(date: Date): string {
  return date.toUTCString();
}

/** Wrap an HTML string in CDATA, splitting any literal "]]>" so it stays valid. */
export function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** Render a Portable Text array to HTML for an RSS <content:encoded> body. */
export function portableTextToFeedHtml(blocks: any): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }: any) => {
          const url = urlForImage(value)?.width(1200).fit("max").url();
          if (!url) return "";
          const alt = escapeXml(value?.alt || "");
          const caption = value?.caption
            ? `<figcaption>${escapeXml(value.caption)}</figcaption>`
            : "";
          return `<figure><img src="${escapeXml(url)}" alt="${alt}" loading="lazy" />${caption}</figure>`;
        },
      },
      marks: {
        // Highlights add color styling on the site; in a feed, plain text is safer.
        highlight: ({ children }: any) => children,
        link: ({ children, value }: any) => {
          const href = value?.href || "";
          return `<a href="${escapeXml(href)}" rel="noopener">${children}</a>`;
        },
      },
    },
  });
}

/** Render a faqSection (array of {question, answer}) as a Q&A HTML block. */
export function faqToFeedHtml(faqSection: any, heading = "Common Questions"): string {
  if (!Array.isArray(faqSection) || faqSection.length === 0) return "";
  const items = faqSection
    .filter((f: any) => f?.question && f?.answer)
    .map(
      (f: any) =>
        `<h3>${escapeXml(f.question)}</h3>\n<p>${escapeXml(f.answer)}</p>`
    )
    .join("\n");
  if (!items) return "";
  return `<h2>${escapeXml(heading)}</h2>\n${items}`;
}

/** Wrap an HTML fragment under an h2 heading; returns "" if the fragment is empty. */
export function sectionHtml(heading: string, innerHtml: string): string {
  if (!innerHtml) return "";
  return `<h2>${escapeXml(heading)}</h2>\n${innerHtml}`;
}
