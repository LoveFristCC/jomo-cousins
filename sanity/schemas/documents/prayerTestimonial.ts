import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'prayerTestimonial',
  title: 'Prayer Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'First name or "Anonymous"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Prayer Category',
      type: 'reference',
      to: [{ type: 'prayerCategory' }],
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Approve testimonial to display on site',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional: "City, State" for social proof',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      approved: 'isApproved',
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${title}${approved ? ' ✓' : ' (Pending)'}`,
        subtitle,
      };
    },
  },
});
