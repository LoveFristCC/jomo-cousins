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
  // Reviews for structured data
  reviews,
  // Upsells
  upsellHeadline,
  "digitalUpsell": digitalUpsell-> {
    ${digitalProductFields}
  },
  "digitalUpsells": digitalUpsells[]-> {
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
  _updatedAt,
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
    content,
    faqSection,
    _updatedAt
  }
`);

export const recentCouplesCornerPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost"] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
  }
`);

// Feed query: includes full content + FAQs for the RSS <content:encoded> body.
export const couplesCornerFeedQuery = defineQuery(`
  *[_type == "couplesCornerPost"] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields},
    content,
    faqSection
  }
`);

export const relatedCouplesCornerPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost" && slug.current != $slug && (
    category == $category ||
    count((tags[])[@ in $tags]) > 0
  )] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
  }
`);

// Fallback query for recent posts when no related posts found
export const recentCouplesCornerPostsExcludingQuery = defineQuery(`
  *[_type == "couplesCornerPost" && slug.current != $slug] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
  }
`);

// Next blog post (newer)
export const nextCouplesCornerPostQuery = defineQuery(`
  *[_type == "couplesCornerPost" && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
    _id,
    title,
    "slug": slug.current
  }
`);

// Previous blog post (older)
export const previousCouplesCornerPostQuery = defineQuery(`
  *[_type == "couplesCornerPost" && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current
  }
`);

// Prayer Video queries
const prayerVideoFields = /* groq */ `
  _id,
  _updatedAt,
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

// Feed query: includes the full written sections + FAQs for <content:encoded>.
export const prayerFeedQuery = defineQuery(`
  *[_type == "prayerVideo"] | order(publishedAt desc) [0...$limit] {
    ${prayerVideoFields},
    personalNote,
    introParagraph,
    wordBeforePrayer,
    writtenPrayer,
    howToUse,
    fullTranscript,
    faqSection
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
    introParagraph,
    wordBeforePrayer,
    writtenPrayer,
    howToUse,
    faqSection,
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

// Next prayer (chronologically newer)
export const nextPrayerQuery = defineQuery(`
  *[_type == "prayerVideo" && publishedAt > $currentDate] | order(publishedAt asc) [0] {
    _id,
    title,
    "slug": slug.current
  }
`);

// Previous prayer (chronologically older)
export const previousPrayerQuery = defineQuery(`
  *[_type == "prayerVideo" && publishedAt < $currentDate] | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current
  }
`);

// Related marriage blog posts (by matching tags)
export const relatedMarriageBlogPostsQuery = defineQuery(`
  *[_type == "couplesCornerPost" && count(tags[@ in $tags]) > 0] | order(publishedAt desc) [0...$limit] {
    ${couplesCornerFields}
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
