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
      name: 'introParagraph',
      title: 'Intro Paragraph (answer-first)',
      type: 'text',
      rows: 5,
      description:
        'Answer-first opening shown beneath the video. Lead with what the prayer is for so the reader (and AI search) gets the answer immediately.',
    }),
    defineField({
      name: 'wordBeforePrayer',
      title: 'A Word Before You Pray',
      type: 'array',
      of: [{ type: 'block' }],
      description: "Pastor Jomo's pastoral lead-in before the written prayer.",
    }),
    defineField({
      name: 'writtenPrayer',
      title: 'Written Prayer Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full written prayer the reader can pray along with.',
    }),
    defineField({
      name: 'howToUse',
      title: 'How to Use This Prayer',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Practical guidance on how/when to pray this prayer.',
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ (for AI search / structured data)',
      type: 'array',
      description:
        "Question & answer pairs for FAQPage structured data. IMPORTANT: only add Q&As whose answers already appear in the prayer content above — this markup mirrors visible content, it doesn't replace it.",
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description: "Plain-text answer (must match what's in the content)",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'fullTranscript',
      title: 'Full Transcript (legacy / fallback)',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Legacy single transcript field. Used as a fallback when the structured sections above are empty.',
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
