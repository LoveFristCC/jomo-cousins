import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Dr. Jomo Cousins | Book for Speaking Engagements",
  description: "Book Dr. Jomo Cousins for your next corporate event, church service, youth program, or financial wealth seminar. Former NFL player, pastor, and motivational speaker.",
  keywords: [
    "book Dr. Jomo Cousins",
    "speaking engagement",
    "motivational speaker",
    "Christian speaker",
    "corporate events",
    "church events",
    "youth programs",
    "financial seminars",
    "Pastor Jomo",
    "NFL speaker",
    "Love First Christian Center",
  ],
  authors: [{ name: "Dr. Jomo Cousins" }],
  creator: "Dr. Jomo Cousins",
  alternates: {
    canonical: "https://www.jomocousins.com/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/contact",
    siteName: "Dr. Jomo Cousins",
    title: "Contact Dr. Jomo Cousins | Book for Speaking Engagements",
    description: "Book Dr. Jomo Cousins for your next event. Former NFL player, pastor, and motivational speaker available for corporate events, church services, youth programs, and seminars.",
    images: [
      {
        url: "https://www.jomocousins.com/images/jc-bw-pics/JC_APAEvent BW Edit208.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Dr. Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dr. Jomo Cousins | Book for Speaking Engagements",
    description: "Book Dr. Jomo Cousins for your next event. Available for corporate events, church services, youth programs, and financial seminars.",
    images: ["https://www.jomocousins.com/images/jc-bw-pics/JC_APAEvent BW Edit208.jpg"],
    creator: "@pastorjomo",
    site: "@pastorjomo",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
