import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Prayer Request | Pray with Pastor Jomo",
  description: "Submit your prayer request to Dr. Jomo Cousins. Share your needs and join the prayer community for spiritual support and guidance.",
  keywords: [
    "prayer request",
    "submit prayer",
    "prayer support",
    "spiritual guidance",
    "Pastor Jomo prayer",
    "Christian prayer request",
    "prayer community",
    "prayer help",
    "faith support",
    "daily prayer line",
  ],
  authors: [{ name: "Dr. Jomo Cousins" }],
  creator: "Dr. Jomo Cousins",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer/submit",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/prayer/submit",
    siteName: "Dr. Jomo Cousins",
    title: "Submit Prayer Request | Pray with Pastor Jomo",
    description: "Submit your prayer request to Dr. Jomo Cousins. Join the prayer community for spiritual support and guidance.",
    images: [
      {
        url: "https://www.jomocousins.com/images/og-prayer.jpg",
        width: 1200,
        height: 630,
        alt: "Submit Prayer Request to Dr. Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit Prayer Request | Pray with Pastor Jomo",
    description: "Submit your prayer request to Dr. Jomo Cousins for spiritual support and guidance.",
    images: ["https://www.jomocousins.com/images/og-prayer.jpg"],
    creator: "@pastorjomo",
    site: "@pastorjomo",
  },
};

export default function PrayerSubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
