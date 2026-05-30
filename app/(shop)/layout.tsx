import "../globals.css";
import Script from "next/script";
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
    template: "%s",
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
        url: "/images/logos/JomoCousins Logo18.webp",
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
    images: [ "/images/logos/JomoCousins Logo18.webp" ],
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

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ `${inter.variable} bg-[#3d3d3d] text-black overflow-x-hidden` }>
      <head></head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <div className="pointer-events-none relative z-10 flex-grow flex flex-col">
          <div className="pointer-events-auto">
            <Nav />
          </div>
          <main className="pointer-events-auto flex-grow">{ children }</main>
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
              fbq('init', '1773876080649146'); 
              fbq('track', 'PageView');`,
          } }
        />
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=1773876080649146&ev=PageView&noscript=1"
            alt='facebook pixel'
          />
        </noscript>
      </body>
    </html>
  );
}
