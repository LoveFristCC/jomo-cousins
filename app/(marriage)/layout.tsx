import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./nav";
import Footer from "./footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jomocousins.com"),
  title: {
    template: "%s | Jomo & Charmaine",
    default: "Jomo & Charmaine - Marriage Counseling & Relationship Coaching | Christian Pastors",
  },
  description: "Dr. Jomo and Dr. Charmaine Cousins are Senior Pastors helping couples thrive together through faith-based marriage counseling. With 24 years of marriage and 1,000+ couples counseled, they provide relationship coaching, premarital counseling, and marriage support at Love First Christian Center in Riverview, FL.",
  applicationName: "Jomo & Charmaine Ministries",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.jomocousins.com/marriage",
  },
  keywords: [
    "Jomo and Charmaine",
    "Jomo Charmaine Cousins",
    "marriage counseling",
    "Christian marriage counseling",
    "faith-based couples counseling",
    "relationship coaching",
    "premarital counseling",
    "pastor marriage counselor",
    "pastoral counseling",
    "couples ministry",
    "communication issues",
    "infidelity counseling",
    "trust issues",
    "sexual intimacy counseling",
    "blended family support",
    "Tampa Bay marriage counseling",
    "Riverview FL couples counseling",
    "Love First Christian Center",
    "Dr. Jomo Cousins",
    "Dr. Charmaine Cousins",
    "Christian relationship coaching",
  ],
  authors: [
    { name: "Dr. Jomo Cousins", url: "https://www.jomocousins.com/marriage/about" },
    { name: "Dr. Charmaine Cousins", url: "https://www.jomocousins.com/marriage/about" }
  ],
  creator: "Dr. Jomo and Dr. Charmaine Cousins",
  publisher: "Jomo & Charmaine Ministries",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/marriage",
    siteName: "Jomo & Charmaine",
    title: "Jomo & Charmaine - Christian Pastors Helping Couples Thrive",
    description: "Senior Pastors with 24 years of marriage experience. Helping couples build stronger relationships through faith-based counseling and coaching. Over 1,000 couples counseled at Love First Christian Center.",
    images: [
      {
        url: "/images/og-image-jomo-charmaine.webp",
        width: 1200,
        height: 630,
        alt: "Dr. Jomo and Dr. Charmaine Cousins - Marriage Counselors and Pastors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jomo & Charmaine - Marriage Counseling Ministry",
    description: "Senior Pastors helping couples thrive together. 24 years married, 1,000+ couples counseled.",
    creator: "@JomoCharmaine",
    site: "@JomoCharmaine",
    images: [ "/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.webp" ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Marriage Counseling & Relationship Therapy",
  icons: {
    icon: "/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.webp",
    apple: "/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.webp",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: [ "latin" ],
  display: "swap",
});

export default function JomoAndCharmaineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ `${inter.variable} bg-white text-black overflow-x-hidden` }>
      <head>
        <link rel="preconnect" href="https://o451059184212377.ingest.us.sentry.io" />
        <link rel="dns-prefetch" href="https://o451059184212377.ingest.us.sentry.io" />
      </head>
      <body className="overflow-x-hidden">
        <GoogleAnalytics />
        {/* Simple Navigation */ }
        <Nav />

        {/* Main Content */ }
        <main>{ children }</main>

        {/* Footer */ }
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
