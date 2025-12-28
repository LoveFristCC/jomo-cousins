import { defineField, defineType } from 'sanity';
import { YouTubeUrlInput } from '@/sanity/components/YouTubeUrlInput';

export default defineType({
  name: 'prayerVideo',
  title: 'Prayer Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Prayer for Healing from Cancer"',
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
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      components: {
        input: YouTubeUrlInput,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeVideoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Auto-extracted from YouTube URL',
      hidden: true,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: '150-200 characters for meta description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'fullTranscript',
      title: 'Full Transcript',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'prayerCategories',
      title: 'Prayer Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'prayerCategory' }] }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
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
      name: 'pdfDownloadUrl',
      title: 'PDF Download',
      type: 'file',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isPrayerOfTheDay',
      title: 'Prayer of the Day',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seoMetadata',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'SEO Title' },
        { name: 'description', type: 'text', title: 'SEO Description' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }], title: 'Keywords' },
      ],
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "5:32"',
    }),
    defineField({
      name: 'personalNote',
      title: "Jomo's Personal Note",
      type: 'text',
      description: "Optional: Pastor Jomo's personal note about this prayer",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'duration',
    },
  },
});
