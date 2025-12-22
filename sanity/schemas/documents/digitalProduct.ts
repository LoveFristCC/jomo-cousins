import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Digital Product schema for upsell offers (courses, coaching, etc.)
 * These are delivered through Kajabi after purchase
 */
export default defineType({
  name: "digitalProduct",
  title: "Digital Product",
  icon: RocketIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) =>
        rule.required().max(250).custom((value) => {
          // Check for hidden unicode characters
          if (value && /[\u200B-\u200D\uFEFF]/.test(value)) {
            return "Product name contains hidden characters. Please re-type the name.";
          }
          return true;
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Price in dollars",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description: "Stripe price ID for checkout (auto-generated when synced)",
      readOnly: true,
    }),
    defineField({
      name: "stripeProductId",
      title: "Stripe Product ID",
      type: "string",
      description: "Stripe product ID (auto-generated when synced)",
      readOnly: true,
    }),
    defineField({
      name: "kajabiOfferId",
      title: "Kajabi Offer ID",
      type: "string",
      description: "Kajabi offer ID for enrollment",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "upsellPosition",
      title: "Upsell Position",
      type: "string",
      options: {
        list: [
          { title: "First Upsell", value: "upsell_1" },
          { title: "Second Upsell", value: "upsell_2" },
        ],
      },
      description: "Which upsell page should display this offer",
    }),
    defineField({
      name: "headline",
      title: "Upsell Headline",
      type: "string",
      description: "Compelling headline for the upsell page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "string",
      description: "Supporting text below the headline",
    }),
    defineField({
      name: "bulletPoints",
      title: "Key Benefits",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key benefits/features",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "discount",
      title: "Discount Percentage",
      type: "number",
      description: "Discount shown on upsell page (e.g., 50 for 50% off)",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the accept button",
      initialValue: "Yes, Add This!",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Draft", value: "draft" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
      position: "upsellPosition",
      status: "status",
    },
    prepare({ title, media, price, position, status }) {
      const statusIndicator = status === "active" ? "✓" : status === "draft" ? "📝" : "📦";
      const positionLabel = position === "upsell_1" ? "Upsell 1" : position === "upsell_2" ? "Upsell 2" : "No position";

      return {
        title: `${statusIndicator} ${title}`,
        media,
        subtitle: `$${price} | ${positionLabel}`,
      };
    },
  },
});
