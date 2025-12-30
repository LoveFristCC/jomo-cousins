import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jomo & Charmaine | Marriage Counseling & Coaching",
  description: "Schedule an appointment with Jomo and Charmaine for couples counseling, marriage therapy, or premarital counseling. Expert guidance for your relationship journey.",
  keywords: [
    "marriage counseling",
    "couples therapy",
    "marriage coaching",
    "relationship counseling",
    "premarital counseling",
    "Jomo and Charmaine",
    "Love First Christian Center",
    "Riverview FL counseling",
    "Christian marriage counselor",
    "couples communication",
  ],
  authors: [
    { name: "Jomo Cousins" },
    { name: "Charmaine Cousins" },
  ],
  creator: "Jomo & Charmaine Cousins",
  alternates: {
    canonical: "https://www.jomocousins.com/marriage/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/marriage/contact",
    siteName: "Jomo & Charmaine",
    title: "Contact Jomo & Charmaine | Marriage Counseling & Coaching",
    description: "Schedule an appointment with Jomo and Charmaine for couples counseling, marriage therapy, or premarital counseling. Expert guidance for your relationship journey.",
    images: [
      {
        url: "https://www.jomocousins.com/images/marriage/contact/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Jomo & Charmaine for Marriage Counseling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jomo & Charmaine | Marriage Counseling & Coaching",
    description: "Schedule an appointment for couples counseling, marriage therapy, or premarital counseling with Jomo and Charmaine.",
    images: ["https://www.jomocousins.com/images/marriage/contact/contact-hero.jpg"],
    creator: "@JomoCharmaine",
  },
};

export default function MarriageContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
