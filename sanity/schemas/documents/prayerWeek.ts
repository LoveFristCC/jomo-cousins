import { CalendarIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

/**
 * Prayer Week
 *
 * One week of a `prayerSeries` — the prayer points that go with a single
 * sermon, prayed over each morning Monday–Friday.
 *
 * Two ways to hold verses, by design:
 *   • `days`   — once the week is organized, each weekday gets its own focus,
 *                prompt, and scriptures. The site auto-highlights "today."
 *   • `unsortedScriptures` — a pool for verses not yet assigned to a day. Drop
 *                everything here first; move verses into `days` as the plan for
 *                the week firms up. The page shows this pool under
 *                "This week's prayer points."
 */
export default defineType({
  name: "prayerWeek",
  title: "Prayer Week",
  icon: CalendarIcon,
  type: "document",
  fields: [
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "prayerSeries" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weekNumber",
      title: "Week Number",
      type: "number",
      description: "1–10.",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "title",
      title: "Sermon / Week Title",
      type: "string",
      description: "The theme of this week's sermon.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weekOf",
      title: "Week Of",
      type: "date",
      description: "The Monday of this week.",
    }),
    defineField({
      name: "intro",
      title: "Intro (optional)",
      type: "array",
      of: [{ type: "block" }],
      description: "A short pastoral lead-in shown at the top of the week.",
    }),
    defineField({
      name: "sermonUrl",
      title: "Sermon Link (optional)",
      type: "url",
      description:
        "Link to this week's sermon — the sermon notes, or a video/audio to watch or listen. Set the button text below.",
    }),
    defineField({
      name: "sermonLabel",
      title: "Sermon Link — Button Text",
      type: "string",
      description:
        'The button text, e.g., "Read the sermon notes" or "Watch the sermon". Defaults to "Read the sermon notes". Only used if a sermon link is set.',
      hidden: ({ parent }) => !parent?.sermonUrl,
    }),
    defineField({
      name: "days",
      title: "Days (Mon–Fri)",
      type: "array",
      of: [{ type: "prayerDay" }],
      description:
        "Add a day once you know its focus and verses. Leave empty and use the pool below until then.",
    }),
    defineField({
      name: "unsortedScriptures",
      title: "Prayer points — not yet assigned to a day",
      type: "array",
      of: [{ type: "scripture" }],
      description:
        "The week's pool of scriptures. Shown together on the page until you move them into days above.",
    }),
    defineField({
      name: "relatedVideos",
      title: "Related Prayer Videos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "prayerVideo" }] }],
      description:
        "Prayer videos tied to this week's points. Shown at the bottom of the week (and the current week's videos on the Breakthrough Prayers hub).",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Week number",
      name: "weekNumberAsc",
      by: [{ field: "weekNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      weekNumber: "weekNumber",
      title: "title",
      weekOf: "weekOf",
      series: "series.title",
    },
    prepare({ weekNumber, title, weekOf, series }) {
      const dated = weekOf ? format(parseISO(weekOf), "MMM d, yyyy") : null;
      return {
        title: `Week ${weekNumber}: ${title}`,
        subtitle: [series, dated].filter(Boolean).join(" · "),
      };
    },
  },
});
