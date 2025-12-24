import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

// Product queries
const productFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  category,
  images,
  basePrice,
  stripePriceId,
  weight,
  variants,
  lowStockThreshold,
  trackInventory,
  status,
  // Book-specific fields
  isbn,
  author,
  publisher,
  publicationDate,
  pageCount,
  previewChapter,
  excerpt,
  amazonLink,
  audibleLink,
  // Upsells
  upsellHeadline,
  "upsells": upsells[]-> {
    _id,
    name,
    "slug": slug.current,
    category,
    images,
    basePrice,
    excerpt,
    author,
    status,
    stripePriceId,
    weight,
    variants
  }
`;

export const allProductsQuery = defineQuery(`
  *[_type == "product" && status == "active"] | order(name asc) {
    ${productFields}
  }
`);

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug && status == "active"] [0] {
    ${productFields}
  }
`);

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && category == $category && status == "active"] | order(name asc) {
    ${productFields}
  }
`);

// Digital product queries
const digitalProductFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  stripePriceId,
  kajabiOfferId,
  upsellPosition,
  headline,
  subheadline,
  bulletPoints,
  image,
  discount,
  ctaText,
  status
`;

export const digitalProductByPositionQuery = defineQuery(`
  *[_type == "digitalProduct" && upsellPosition == $position && status == "active"] [0] {
    ${digitalProductFields}
  }
`);

export const digitalProductBySlugQuery = defineQuery(`
  *[_type == "digitalProduct" && slug.current == $slug && status == "active"] [0] {
    ${digitalProductFields}
  }
`);

// Book queries
const bookFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  images,
  basePrice,
  category
`;

export const newestBooksQuery = defineQuery(`
  *[_type == "product" && category == "books" && status == "active"] | order(_createdAt desc) [0...$limit] {
    ${bookFields}
  }
`);

// Couples Corner Blog queries
const couplesCornerFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  tags,
  youtubeVideo,
  "publishedAt": coalesce(publishedAt, _createdAt),
  featured,
  seo
`;

export const allCouplesCornerPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost"] | order(publishedAt desc) {
    ${couplesCornerFields}
  }
`);

export const featuredCouplesCornerPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost" && featured == true] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
  }
`);

export const couplesCornerPostsByCategoryQuery = defineQuery(`
  *[_type == "couplesCornerPost" && category == $category] | order(publishedAt desc) {
    ${couplesCornerFields}
  }
`);

export const couplesCornerPostBySlugQuery = defineQuery(`
  *[_type == "couplesCornerPost" && slug.current == $slug] [0] {
    ${couplesCornerFields},
    content
  }
`);

export const recentCouplesCornerPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost"] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
  }
`);
