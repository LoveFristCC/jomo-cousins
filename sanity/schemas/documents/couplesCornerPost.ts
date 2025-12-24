import { HeartIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

/**
 * Couples Corner Blog Post Schema
 * Blog posts specifically for Jomo & Charmaine's relationship counseling content
 */

export default defineType({
  name: "couplesCornerPost",
  title: "Couples Corner Post",
  icon: HeartIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of your blog post",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the title (e.g., 'how-to-improve-communication')",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short summary that appears in blog listings (2-3 sentences recommended)",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image for the blog post",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describe the image for SEO and accessibility",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return "Alt text is required when an image is uploaded";
              }
              return true;
            });
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Main topic category for this post",
      options: {
        list: [
          { title: "Communication", value: "communication" },
          { title: "Intimacy", value: "intimacy" },
          { title: "Trust & Forgiveness", value: "trust-forgiveness" },
          { title: "Conflict Resolution", value: "conflict-resolution" },
          { title: "Dating & Courtship", value: "dating-courtship" },
          { title: "Marriage", value: "marriage" },
          { title: "Premarital", value: "premarital" },
          { title: "Parenting", value: "parenting" },
          { title: "Faith & Relationships", value: "faith-relationships" },
          { title: "Self-Care", value: "self-care" },
          { title: "General", value: "general" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Keywords for this post (helpful for search and filtering)",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "youtubeVideo",
      title: "YouTube Video",
      type: "object",
      description: "Optional: Add a YouTube video to this post",
      fields: [
        {
          name: "url",
          title: "YouTube URL",
          type: "url",
          description: "Full YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)",
          validation: (rule) =>
            rule.uri({
              scheme: ["http", "https"],
            }),
        },
        {
          name: "title",
          title: "Video Title",
          type: "string",
          description: "Title for the embedded video",
        },
        {
          name: "placement",
          title: "Video Placement",
          type: "string",
          description: "Where should the video appear?",
          options: {
            list: [
              { title: "Top of Post (before content)", value: "top" },
              { title: "Bottom of Post (after content)", value: "bottom" },
            ],
            layout: "radio",
          },
          initialValue: "top",
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description: "Main blog post content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
              {
                name: "highlight",
                type: "object",
                title: "Highlight",
                fields: [
                  {
                    name: "color",
                    type: "string",
                    title: "Color",
                    options: {
                      list: [
                        { title: "Orange", value: "#ea8125" },
                        { title: "Blue", value: "#0E6BB7" },
                        { title: "Yellow", value: "#ffaa62" },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When should this post be published?",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Mark this as a featured post (appears prominently on the blog homepage)",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      description: "Optional: Customize SEO metadata for this post",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Custom title for search engines (leave blank to use post title)",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Custom description for search engines (leave blank to use excerpt)",
          rows: 3,
          validation: (rule) => rule.max(160),
        },
        {
          name: "keywords",
          title: "Focus Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "SEO keywords for this post",
          options: {
            layout: "tags",
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, media, category, date, featured }) {
      const subtitles = [
        category && `${category}`,
        date && `${format(parseISO(date), "MMM d, yyyy")}`,
        featured && "⭐ Featured",
      ].filter(Boolean);

      return {
        title,
        media,
        subtitle: subtitles.join(" • "),
      };
    },
  },
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Oldest",
      name: "publishedDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title, A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
