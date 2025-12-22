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
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
