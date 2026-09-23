import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Prayer Teaching
 *
 * A short teaching from Pastor Jomo on how to pray — e.g., "Speaking Life" or
 * "Give It to God." Each one opens with a key scripture, walks through the
 * teaching (paragraphs with scripture cards placed inline, in reading order),
 * and closes with prayer videos to pray along with.
 *
 * Linked from the /prayer hub; each lives at /prayer/teaching/[slug].
 */
export default defineType({
  name: "prayerTeaching",
  title: "Prayer Teaching",
  icon: BookIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Position on the Prayer page. Lower numbers show first.",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "One or two sentences shown on the Prayer page card and in search results.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "keyScripture",
      title: "Key Scripture",
      type: "scripture",
      description: "The anchor verse, shown at the top of the teaching.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Teaching",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "scripture" }),
      ],
      description:
        'The teaching itself. Use "Scripture" from the + menu to place a verse card between paragraphs.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedVideos",
      title: "Related Prayer Videos",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "prayerVideo" }] })],
      description:
        "Three prayer videos that go with this teaching. Shown at the bottom of the page.",
      validation: (rule) => rule.max(3).unique(),
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
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      reference: "keyScripture.reference",
      order: "order",
    },
    prepare({ title, reference, order }) {
      return {
        title: order ? `${order}. ${title}` : title,
        subtitle: reference,
      };
    },
  },
});
