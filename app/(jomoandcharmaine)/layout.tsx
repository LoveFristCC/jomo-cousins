import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./nav";
import Footer from "./footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jomocousins.com"),
  title: {
    template: "%s | Jomo & Charmaine - Couples Counseling",
    default: "Jomo & Charmaine - Marriage & Family Therapy",
  },
  description: "Dr. Jomo and Dr. Charmaine Cousins provide professional couples counseling, marriage therapy, and relationship coaching to help you build a stronger, healthier relationship.",
  keywords: [
    "Jomo and Charmaine",
    "couples counseling",
    "marriage therapy",
    "relationship coaching",
    "premarital counseling",
    "marriage counselor",
    "family therapist",
    "Tampa couples therapy",
    "Riverview FL counseling",
    "Love First Christian Center",
  ],
  authors: [ { name: "Dr. Jomo Cousins" }, { name: "Dr. Charmaine Cousins" } ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/jomo-and-charmaine",
    siteName: "Jomo & Charmaine",
    title: "Jomo & Charmaine - Marriage & Family Therapy",
    description: "Professional couples counseling and marriage therapy helping you build stronger, healthier relationships.",
    images: [
      {
        url: "/images/og-image-jomo-charmaine.jpg",
        width: 1200,
        height: 630,
        alt: "Jomo & Charmaine - Couples Counseling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jomo & Charmaine - Marriage & Family Therapy",
    description: "Professional couples counseling and marriage therapy",
    creator: "@JomoCharmaine",
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
  icons: {
    icon: "/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.png",
    apple: "/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.png",
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
    <html lang="en" className={ `${inter.variable} bg-white text-black` }>
      <body>
        {/* Simple Navigation */ }
        <Nav />

        {/* Main Content */ }
        <main>{ children }</main>

        {/* Footer */ }
        <Footer />
        {/* Work in Progress Banner */ }
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white text-sm text-center py-10 px-4">
          🚧 This section of the site is a work in progress. Thank you for your patience.
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
