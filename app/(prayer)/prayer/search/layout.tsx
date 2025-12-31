import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Prayers | Find Prayer Videos by Topic",
  description: "Search Dr. Jomo Cousins' library of prayer videos by topic, category, or keyword. Find the perfect prayer for your spiritual needs.",
  keywords: [
    "prayer search",
    "find prayers",
    "prayer topics",
    "prayer videos",
    "Dr. Jomo Cousins prayers",
    "Pastor Jomo prayers",
    "prayer categories",
    "spiritual guidance",
    "Christian prayers",
    "daily prayers",
  ],
  authors: [{ name: "Dr. Jomo Cousins" }],
  creator: "Dr. Jomo Cousins",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer/search",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/prayer/search",
    siteName: "Dr. Jomo Cousins",
    title: "Search Prayers | Find Prayer Videos by Topic",
    description: "Search Dr. Jomo Cousins' library of prayer videos by topic, category, or keyword. Find the perfect prayer for your spiritual needs.",
    images: [
      {
        url: "https://www.jomocousins.com/images/og-prayer.webp",
        width: 1200,
        height: 630,
        alt: "Search Prayer Videos by Dr. Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Prayers | Find Prayer Videos by Topic",
    description: "Search Dr. Jomo Cousins' library of prayer videos by topic, category, or keyword.",
    images: ["https://www.jomocousins.com/images/og-prayer.webp"],
    creator: "@pastorjomo",
    site: "@pastorjomo",
  },
};

export default function PrayerSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
