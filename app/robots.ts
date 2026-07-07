import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for search engine crawling
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.jomocousins.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          "/_next/",
          "/admin/",
          "/checkout/",
          "/thank-you/complete/",
          "/thank-you/upsell-2/",
          "/newsletter-preview",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          "/admin/",
          "/checkout/",
          "/thank-you/complete/",
          "/thank-you/upsell-2/",
          "/newsletter-preview",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
