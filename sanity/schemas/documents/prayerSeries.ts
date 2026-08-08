import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Prayer Series
 *
 * The top-level container for a multi-week prayer arc that tracks a sermon
 * series. Each series holds several `prayerWeek` documents. Mark one series
 * `isActive` and it becomes the one featured at /prayer.
 */
export default defineType({
  name: "prayerSeries",
  title: "Prayer Series",
  icon: BookIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g., "Call to Me — A 10-Week Prayer Journey"',
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "One short line shown under the title.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "What this series is about. Shown on the series hub.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "The Monday the series begins.",
    }),
    defineField({
      name: "totalWeeks",
      title: "Total Weeks",
      type: "number",
      description: "How many weeks the series runs (e.g., 10). Used for progress display.",
      initialValue: 10,
    }),
    defineField({
      name: "isActive",
      title: "Active series",
      type: "boolean",
      description:
        "Turn on for the current series. The active series is the one featured at /prayer.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "coverImage" },
  },
});
