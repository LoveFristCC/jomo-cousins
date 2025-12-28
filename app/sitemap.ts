import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allProductsQuery,
  recentPrayersQuery,
  prayerCategoriesQuery,
  allCouplesCornerPostsQuery
} from "@/sanity/lib/queries";

/**
 * Dynamic sitemap generation for SEO
 * Automatically includes all products, prayers, categories, and static pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.jomocousins.com";

  // Fetch all dynamic content in parallel
  const [products, prayers, prayerCategories, couplesCornerPosts] = await Promise.all([
    sanityFetch({ query: allProductsQuery }),
    sanityFetch({ query: recentPrayersQuery, params: { limit: 1000 } }),
    sanityFetch({ query: prayerCategoriesQuery }),
    sanityFetch({ query: allCouplesCornerPostsQuery }),
  ]);

  // Static pages - Main site
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Prayer section static pages
  const prayerStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/prayer`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prayer/daily`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prayer/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/prayer/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Marriage site static pages
  const marriageStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/jomo-and-charmaine`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jomo-and-charmaine/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jomo-and-charmaine/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/jomo-and-charmaine/couples-corner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: product.category === "books" ? 0.9 : 0.7,
  }));

  // Book preview pages (for SEO and traffic generation)
  const bookPreviewPages: MetadataRoute.Sitemap = products
    .filter((product) => product.category === "books" && product.previewChapter)
    .map((book) => ({
      url: `${baseUrl}/books/${book.slug}/preview`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8, // High priority - drives traffic and conversions
    }));

  // Dynamic prayer video pages
  const prayerPages: MetadataRoute.Sitemap = prayers.map((prayer: any) => ({
    url: `${baseUrl}/prayer/${prayer.slug}`,
    lastModified: prayer.publishedAt ? new Date(prayer.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic prayer category pages
  const prayerCategoryPages: MetadataRoute.Sitemap = prayerCategories.map((category: any) => ({
    url: `${baseUrl}/prayer/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic couples corner post pages
  const couplesCornerPages: MetadataRoute.Sitemap = couplesCornerPosts.map((post: any) => ({
    url: `${baseUrl}/jomo-and-charmaine/couples-corner/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...prayerStaticPages,
    ...marriageStaticPages,
    ...productPages,
    ...bookPreviewPages,
    ...prayerPages,
    ...prayerCategoryPages,
    ...couplesCornerPages,
  ];
}
