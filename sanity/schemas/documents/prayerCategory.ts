import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'prayerCategory',
  title: 'Prayer Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Healing", "Finances", "Relationships"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: '1-2 sentences',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text for hub page intro',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Icon or emoji for this category',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'For hub page hero',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'jomoMessage',
      title: "Jomo's Message",
      type: 'text',
      description: 'Personal message from Jomo about praying for this topic',
    }),
    defineField({
      name: 'seoContent',
      title: 'SEO Content',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        {
          name: 'targetKeywords',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Target Keywords',
        },
        { name: 'h1Override', type: 'string', title: 'H1 Override (optional)' },
      ],
    }),
    defineField({
      name: 'hubPageContent',
      title: 'Hub Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'SEO-rich content for the category hub page',
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedCategories',
      title: 'Related Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'prayerCategory' }] }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'For sorting on main page (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'biblicalFoundation',
      title: 'Biblical Foundation',
      type: 'text',
      description: 'Optional: Key scriptures related to this category',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
