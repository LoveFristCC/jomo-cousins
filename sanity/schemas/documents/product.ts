import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Product variant object schema
 * Represents individual SKUs with size, color, and inventory tracking
 */
export const productVariant = defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",
  fields: [
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "Unique identifier for this variant",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "e.g., S, M, L, XL",
      options: {
        list: [
          { title: "Small", value: "S" },
          { title: "Medium", value: "M" },
          { title: "Large", value: "L" },
          { title: "X-Large", value: "XL" },
          { title: "2X-Large", value: "2XL" },
          { title: "3X-Large", value: "3XL" },
          { title: "One Size", value: "ONE_SIZE" },
        ],
      },
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Color name",
    }),
    defineField({
      name: "colorHex",
      title: "Color Hex Code",
      type: "string",
      description: "Hex color code for color swatches (e.g., #FF0000)",
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "inventory",
      title: "Inventory Count",
      type: "number",
      description: "Current available inventory",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "reservedInventory",
      title: "Reserved Inventory",
      type: "number",
      description: "Inventory reserved for pending orders",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "price",
      title: "Variant Price",
      type: "number",
      description:
        "Optional variant-specific price (overrides base price). Leave empty to use base price.",
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description:
        "Stripe price ID for this variant (auto-generated when synced)",
      readOnly: true,
    }),
    defineField({
      name: "image",
      title: "Variant Image",
      type: "image",
      description:
        "Optional variant-specific image (minimum 800px recommended)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "allowBackorder",
      title: "Allow Backorder",
      type: "boolean",
      description: "Allow purchases when out of stock",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      sku: "sku",
      size: "size",
      color: "color",
      inventory: "inventory",
      price: "price",
      allowBackorder: "allowBackorder",
    },
    prepare({ sku, size, color, inventory, price, allowBackorder }) {
      const stockStatus =
        inventory === 0 && !allowBackorder
          ? "🔴"
          : inventory <= 5
          ? "🟡"
          : "🟢";

      const variantTitle = [size, color].filter(Boolean).join(" - ");
      const priceText = price ? ` | $${price}` : "";

      return {
        title: `${sku} (${variantTitle || "Default"})`,
        subtitle: `${stockStatus} Stock: ${inventory}${priceText}`,
      };
    },
  },
});

/**
 * Product document schema
 * Main product catalog with variants and inventory management
 */
export default defineType({
  name: "product",
  title: "Product",
  icon: PackageIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .max(250)
          .custom((value) => {
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
      description: "URL-friendly identifier",
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
      validation: (rule) =>
        rule.required().custom((blocks: any) => {
          // Check for hidden unicode characters in text blocks
          if (Array.isArray(blocks)) {
            for (const block of blocks) {
              if (block?._type === "block" && Array.isArray(block?.children)) {
                for (const child of block.children) {
                  if (child?.text && /[\u200B-\u200D\uFEFF]/.test(child.text)) {
                    return "Description contains hidden unicode characters. Please re-type the content or paste as plain text.";
                  }
                }
              }
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Books", value: "books" },
          { title: "T-Shirts", value: "tshirts" },
          { title: "Hoodies", value: "hoodies" },
          { title: "Accessories", value: "accessories" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          // Check for hidden unicode characters
          if (value && /[\u200B-\u200D\uFEFF]/.test(value)) {
            return "Category contains hidden characters. Please re-select from the dropdown.";
          }
          return true;
        }),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      description:
        "Upload high-quality product images (minimum 1000px width recommended for best display quality)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "basePrice",
      title: "Base Price",
      type: "number",
      description: "Base price in dollars (can be overridden by variant price)",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description:
        "Default Stripe price ID for this product (auto-generated when synced)",
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
      name: "weight",
      title: "Weight (oz)",
      type: "number",
      description: "Product weight in ounces for shipping calculation",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [{ type: "productVariant" }],
      description: "Size, color, and inventory variations",
    }),
    defineField({
      name: "lowStockThreshold",
      title: "Low Stock Threshold",
      type: "number",
      description: "Alert when inventory falls below this number",
      initialValue: 5,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "trackInventory",
      title: "Track Inventory",
      type: "boolean",
      description: "Enable inventory tracking for this product",
      initialValue: true,
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
    // Book-specific fields for SEO
    defineField({
      name: "isbn",
      title: "ISBN",
      type: "string",
      description: "ISBN number for books (important for SEO)",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Book author (typically 'Dr. Jomo Cousins')",
      initialValue: "Dr. Jomo Cousins",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
      description: "Book publisher",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      description: "When the book was published",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "pageCount",
      title: "Page Count",
      type: "number",
      description: "Number of pages in the book",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "previewChapter",
      title: "Preview Chapter (Free)",
      type: "object",
      description:
        "Free chapter for SEO indexing - helps Google understand book content",
      hidden: ({ document }) => document?.category !== "books",
      fields: [
        {
          name: "title",
          title: "Chapter Title",
          type: "string",
          validation: (rule) =>
            rule.required().custom((value: string) => {
              if (value && /[\u200B-\u200D\uFEFF]/.test(value)) {
                return "Chapter title contains hidden characters. Please re-type it.";
              }
              return true;
            }),
        },
        {
          name: "chapterNumber",
          title: "Chapter Number",
          type: "number",
          description: "e.g., 1 for Chapter 1",
        },
        {
          name: "content",
          title: "Chapter Content",
          type: "array",
          of: [{ type: "block" }],
          description:
            "Full chapter content - will be indexed by Google. TIP: Paste as plain text to avoid hidden characters.",
          validation: (rule) =>
            rule.required().custom((blocks: any) => {
              // Check for hidden unicode characters in chapter content
              if (Array.isArray(blocks)) {
                for (const block of blocks) {
                  if (
                    block?._type === "block" &&
                    Array.isArray(block?.children)
                  ) {
                    for (const child of block.children) {
                      if (
                        child?.text &&
                        /[\u200B-\u200D\uFEFF]/.test(child.text)
                      ) {
                        return "Chapter content contains hidden unicode characters. Please paste as plain text (Ctrl+Shift+V / Cmd+Shift+V) or re-type the content.";
                      }
                    }
                  }
                }
              }
              return true;
            }),
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Book Excerpt/Summary",
      type: "text",
      description:
        "Short excerpt or summary for SEO (200-300 words) - This appears in search results",
      rows: 6,
      hidden: ({ document }) => document?.category !== "books",
      validation: (rule) =>
        rule.custom((value) => {
          if (value && /[\u200B-\u200D\uFEFF]/.test(value)) {
            return "Excerpt contains hidden unicode characters. Please re-type or paste as plain text (Ctrl+Shift+V / Cmd+Shift+V).";
          }
          return true;
        }),
    }),
    defineField({
      name: "amazonLink",
      title: "Amazon Link",
      type: "url",
      description: "Direct link to Amazon product page",
      hidden: ({ document }) => document?.category !== "books",
    }),
    defineField({
      name: "audibleLink",
      title: "Audible Link",
      type: "url",
      description: "Link to Audible audiobook",
      hidden: ({ document }) => document?.category !== "books",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      category: "category",
      variants: "variants",
      status: "status",
    },
    prepare({ title, media, category, variants, status }) {
      const variantCount = variants?.length || 0;
      const totalInventory =
        variants?.reduce(
          (sum: number, v: any) => sum + (v.inventory || 0),
          0
        ) || 0;

      const statusIndicator =
        status === "active" ? "✓" : status === "draft" ? "📝" : "📦";

      return {
        title: `${statusIndicator} ${title}`,
        media,
        subtitle: `${category} | ${variantCount} variant${
          variantCount !== 1 ? "s" : ""
        } | Stock: ${totalInventory}`,
      };
    },
  },
});
