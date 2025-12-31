import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "../(home)/footer";
import Nav from "../(home)/nav";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: [ "latin" ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jomocousins.com"),
  title: {
    template: "%s | Dr. Jomo Cousins Shop",
    default: "Shop | Dr. Jomo Cousins",
  },
  description: "Shop for books, apparel, and accessories from Dr. Jomo Cousins",
  applicationName: "Dr. Jomo Cousins Shop",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Dr. Jomo Cousins",
    "books",
    "apparel",
    "accessories",
    "shop",
    "merchandise",
    "Christian books",
    "motivational speaker books",
  ],
  authors: [ { name: "Dr. Jomo Cousins" } ],
  creator: "Dr. Jomo Cousins",
  publisher: "Dr. Jomo Cousins",
  alternates: {
    canonical: "https://www.jomocousins.com/products",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jomocousins.com/products",
    siteName: "Dr. Jomo Cousins",
    title: "Shop | Dr. Jomo Cousins",
    description: "Shop for books, apparel, and accessories from Dr. Jomo Cousins",
    images: [
      {
        url: "/images/logos/JomoCousins Logo18.png",
        width: 1200,
        height: 630,
        alt: "Dr. Jomo Cousins Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Dr. Jomo Cousins",
    description: "Shop for books, apparel, and accessories from Dr. Jomo Cousins",
    creator: "@pastorjomo",
    site: "@pastorjomo",
    images: [ "/images/logos/JomoCousins Logo18.png" ],
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
    icon: "/images/logos/Asset 1.png",
    apple: "/images/logos/Asset 1.png",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ `${inter.variable} bg-[#3d3d3d] text-black` }>
      <head>
        <link rel="preconnect" href="https://o451059184212377.ingest.us.sentry.io" />
        <link rel="dns-prefetch" href="https://o451059184212377.ingest.us.sentry.io" />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics />
        <div className="pointer-events-none relative z-10 flex-grow flex flex-col">
          <div className="pointer-events-auto">
            <Nav />
          </div>
          <main className="pointer-events-auto flex-grow">{ children }</main>
        </div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
