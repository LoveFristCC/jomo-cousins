import "../globals.css";
import Script from "next/script";
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
        url: "/images/marriage/contact/contact-hero.webp",
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
    images: [ "/images/marriage/contact/contact-hero.webp" ],
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
    icon: "/images/marriage/main-page/Jomo-and-Charmaine-logo.webp",
    apple: "/images/marriage/main-page/Jomo-and-Charmaine-logo.webp",
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
        <Nav />
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
