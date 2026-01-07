import "../globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../(home)/nav";
import PrayerSubNav from "./prayer-subnav";
import Footer from "../(home)/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jomocousins.com"),
  title: {
    template: "%s",
    default: "Pray with Pastor Jomo Cousins | Personal Prayer Videos",
  },
  description: "Join Pastor Jomo Cousins in powerful prayer. Find personalized prayer videos for healing, finances, relationships, and more. Experience intimate, one-on-one prayer ministry that brings hope and transformation.",
  applicationName: "Pray with Pastor Jomo",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Pastor Jomo Cousins prayer",
    "prayer videos",
    "Christian prayer",
    "healing prayer",
    "financial prayer",
    "relationship prayer",
    "daily prayer",
    "pray with pastor",
    "prayer ministry",
    "Tampa pastor prayer",
    "Love First Christian Center prayer",
    "submit prayer request",
    "prayer testimonials",
  ],
  authors: [ { name: "Pastor Jomo Cousins", url: "https://www.jomocousins.com" } ],
  creator: "Pastor Jomo Cousins",
  publisher: "Love First Christian Center",
  alternates: {
    canonical: "https://www.jomocousins.com/prayer",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/prayer",
    siteName: "Dr. Jomo Cousins",
    title: "Pray with Pastor Jomo Cousins | Personal Prayer Ministry",
    description: "Experience intimate, powerful prayer with Pastor Jomo. Find personalized prayer videos for every area of your life. Hope, healing, and transformation through prayer.",
    images: [
      {
        url: "/images/logos/Asset 1.webp",
        width: 1200,
        height: 630,
        alt: "Pray with Pastor Jomo Cousins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pray with Pastor Jomo Cousins",
    description: "Experience powerful, intimate prayer with Pastor Jomo. Find personalized prayer videos for every area of your life.",
    creator: "@pastorjomo",
    site: "@pastorjomo",
    images: [ "/images/logos/Asset 1.webp" ],
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
  category: "Prayer & Spiritual Ministry",
  icons: {
    icon: "/images/logos/Asset 1.webp",
    apple: "/images/logos/Asset 1.webp",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: [ "latin" ],
  display: "swap",
});

export default function PrayerLayout({
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
        <Nav />
        <PrayerSubNav />
        <main>{ children }</main>
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
          />
        </noscript>
      </body>
    </html>
  );
}
