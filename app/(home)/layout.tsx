import "../globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import {
  toPlainText,
} from "next-sanity";
import { Inter } from "next/font/google";
import Footer from "./footer";
import Nav from "./nav";
import StructuredData from "./structured-data";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  const title = settings?.title || "Dr. Jomo Cousins";
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
    authors: [ { name: "Dr. Jomo Cousins" } ],
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
      images: ogImage ? [ ogImage ] : [
        {
          url: "/images/logos/JomoCousins Logo18.webp",
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
      site: "@pastorjomo",
      images: ogImage ? [ ogImage ] : [ "/images/logos/JomoCousins Logo18.webp" ],
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
      icon: "/images/logos/Asset 1.webp",
      apple: "/images/logos/Asset 1.webp",
    },

  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: [ "latin" ],
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
    <html lang="en" className={ `${inter.variable} bg-[#3d3d3d] text-black overflow-x-hidden` }>
      <head></head>
      <body className="overflow-x-hidden">
        <StructuredData />
        <div className="pointer-events-none relative z-10">
          <div className="pointer-events-auto">
            <Nav />
          </div>
          <main className="pointer-events-auto">{ children }</main>
        </div>
        <Footer />
        <GoogleAnalytics />
        <Script
          id="fb-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={ {
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3053545348126120'); 
              fbq('track', 'PageView');`,
          } }
        />
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=3053545348126120&ev=PageView&noscript=1"
            alt='facebook pixel'
          />
        </noscript>
      </body>
    </html>
  );
}
