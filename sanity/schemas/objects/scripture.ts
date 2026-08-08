import { defineField, defineType } from "sanity";

/**
 * A single Scripture reference used in prayer points.
 *
 * Kept deliberately small and reusable: a reference, the translation it's
 * quoted from, and the verse text itself. Reused inside prayerDay and in the
 * week's unsorted pool.
 */
export default defineType({
  name: "scripture",
  title: "Scripture",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      description: 'e.g., "Jeremiah 33:3" or "Philippians 4:6-7"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "translation",
      title: "Translation",
      type: "string",
      description: "Short code shown after the reference, e.g., AMP, NKJV, NLT, MSG.",
    }),
    defineField({
      name: "text",
      title: "Verse Text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      reference: "reference",
      translation: "translation",
      text: "text",
    },
    prepare({ reference, translation, text }) {
      return {
        title: [reference, translation].filter(Boolean).join(" · "),
        subtitle: text,
      };
    },
  },
});
