import { defineField, defineType } from "sanity";

/**
 * One day (Mon–Fri) of a prayer week.
 *
 * The `day` is a fixed weekday so the site can auto-highlight "today." Each day
 * carries its own focus, an optional prompt for how to pray, and the scriptures
 * for that morning. Weeks that haven't been split into days yet keep their
 * verses in the week's "unsorted" pool instead.
 */
export default defineType({
  name: "prayerDay",
  title: "Day",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      options: {
        list: [
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focus",
      title: "Focus",
      type: "string",
      description: 'The theme for this morning, e.g., "God invites us to call on Him".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "prompt",
      title: "How to pray (optional)",
      type: "text",
      rows: 3,
      description: "A short prompt or pastoral lead-in for praying these scriptures.",
    }),
    defineField({
      name: "scriptures",
      title: "Scriptures",
      type: "array",
      of: [{ type: "scripture" }],
    }),
  ],
  preview: {
    select: {
      day: "day",
      focus: "focus",
      count: "scriptures",
    },
    prepare({ day, focus, count }) {
      const n = Array.isArray(count) ? count.length : 0;
      return {
        title: [day, focus].filter(Boolean).join(" — "),
        subtitle: `${n} scripture${n === 1 ? "" : "s"}`,
      };
    },
  },
});
