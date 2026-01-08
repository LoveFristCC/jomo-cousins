import "../globals.css";

import { Inter } from "next/font/google";
// import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: [ "latin" ],
  display: "swap",
});

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ inter.variable }>
      <body className="min-h-screen">
        {/* <GoogleAnalytics /> */ }
        { children }
      </body>
    </html>
  );
}
