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

// Digital product queries (defined first so it can be used in productFields)
const digitalProductFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  isSubscription,
  subscriptionInterval,
  firstMonthPrice,
  stripePriceId,
  kajabiWebhookUrl,
  upsellPosition,
  headline,
  subheadline,
  bulletPoints,
  image,
  discount,
  ctaText,
  status
`;

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
  featured,
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
  "digitalUpsell": digitalUpsell-> {
    ${digitalProductFields}
  },
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

export const productByNameQuery = defineQuery(`
  *[_type == "product" && name == $name] [0] {
    ${productFields}
  }
`);

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

export const featuredBooksQuery = defineQuery(`
  *[_type == "product" && category == "books" && status == "active" && featured == true] | order(_createdAt desc) [0...$limit] {
    ${bookFields}
  }
`);

export const booksWithPreviewsQuery = defineQuery(`
  *[_type == "product" && category == "books" && status == "active" && defined(previewChapter.content)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    author,
    images,
    previewChapter {
      title,
      chapterNumber
    }
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

// Prayer Video queries
const prayerVideoFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  youtubeUrl,
  youtubeVideoId,
  excerpt,
  "categories": prayerCategories[]->{ title, "slug": slug.current },
  tags,
  featuredImage,
  publishedAt,
  isPrayerOfTheDay,
  duration,
  personalNote,
  viewCount
`;

export const prayerOfTheDayQuery = defineQuery(`
  *[_type == "prayerVideo" && isPrayerOfTheDay == true] | order(publishedAt desc) [0] {
    ${prayerVideoFields}
  }
`);

export const recentPrayersQuery = defineQuery(`
  *[_type == "prayerVideo"] | order(publishedAt desc) [0...$limit] {
    ${prayerVideoFields}
  }
`);

export const prayerCategoriesQuery = defineQuery(`
  *[_type == "prayerCategory"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    "prayerCount": count(*[_type == "prayerVideo" && references(^._id)])
  }
`);

export const approvedTestimonialsQuery = defineQuery(`
  *[_type == "prayerTestimonial" && isApproved == true] | order(submittedAt desc) [0...$limit] {
    _id,
    name,
    testimonialText,
    location,
    submittedAt
  }
`);

// Category hub page query
export const prayerCategoryBySlugQuery = defineQuery(`
  *[_type == "prayerCategory" && slug.current == $slug] [0] {
    _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    icon,
    featuredImage,
    jomoMessage,
    seoContent,
    hubPageContent,
    faqSection,
    "relatedCategories": relatedCategories[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      "prayerCount": count(*[_type == "prayerVideo" && references(^._id)])
    },
    biblicalFoundation,
    "prayerCount": count(*[_type == "prayerVideo" && references(^._id)])
  }
`);

// Prayers by category query
export const prayersByCategoryQuery = defineQuery(`
  *[_type == "prayerVideo" && references($categoryId)] | order(publishedAt desc) {
    ${prayerVideoFields}
  }
`);

// Featured prayer for category (most viewed)
export const featuredPrayerByCategoryQuery = defineQuery(`
  *[_type == "prayerVideo" && references($categoryId)] | order(viewCount desc) [0] {
    ${prayerVideoFields},
    fullTranscript
  }
`);

// Individual prayer by slug query
export const prayerBySlugQuery = defineQuery(`
  *[_type == "prayerVideo" && slug.current == $slug] [0] {
    ${prayerVideoFields},
    fullTranscript,
    "pdfDownloadUrl": pdfDownloadUrl.asset->url,
    seoMetadata
  }
`);

// Related prayers (same category)
export const relatedPrayersQuery = defineQuery(`
  *[_type == "prayerVideo" && _id != $excludeId && count((prayerCategories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] {
    ${prayerVideoFields}
  }
`);

// Category-specific testimonials
export const testimonialsByCategoryQuery = defineQuery(`
  *[_type == "prayerTestimonial" && isApproved == true && category._ref == $categoryId] | order(submittedAt desc) [0...$limit] {
    _id,
    name,
    testimonialText,
    location,
    submittedAt
  }
`);
