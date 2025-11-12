import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import Footer from "./footer";
import Nav from "./nav";
import PortableText from "./portable-text";
import StructuredData from "./structured-data";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || "Dr. Jomo Cousins | Motivational Speaker, Pastor & Author";
  const description = settings?.description || demo.description;
  const plainDescription = toPlainText(description) || "Motivational speaker Dr. Jomo Cousins inspires transformation through powerful messages. Book for corporate events, church gatherings, and youth programs.";

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : new URL("https://www.jomocousins.com");
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: plainDescription,
    keywords: [
      "Dr. Jomo Cousins",
      "motivational speaker",
      "pastor",
      "author",
      "keynote speaker",
      "Tampa Florida speaker",
      "Christian speaker",
      "corporate events speaker",
      "youth programs",
      "church events",
      "NFL speaker",
      "business coach",
      "spiritual empowerment",
      "IRIE method",
      "Love First Christian Center"
    ],
    authors: [{ name: "Dr. Jomo Cousins" }],
    creator: "Dr. Jomo Cousins",
    publisher: "Dr. Jomo Cousins",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.jomocousins.com",
      siteName: "Dr. Jomo Cousins",
      title: title,
      description: plainDescription,
      images: ogImage ? [ogImage] : [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Dr. Jomo Cousins - Motivational Speaker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: plainDescription,
      creator: "@pastorjomo",
      images: ogImage ? [ogImage] : ["/images/og-image.jpg"],
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
    verification: {
      google: "your-google-verification-code",
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const data = await sanityFetch({ query: settingsQuery });
  // const footer = data?.footer || [];
  // const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-[#3d3d3d] text-black`}>
      <body>
        <StructuredData />
        <div className="pointer-events-none relative z-10">
          <div className="pointer-events-auto">
            <Nav />
          </div>
          <main className="pointer-events-auto pb-96">{children}</main>
        </div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
