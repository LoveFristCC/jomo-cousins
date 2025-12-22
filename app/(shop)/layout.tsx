import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "../(home)/footer";
import Nav from "../(home)/nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dr. Jomo Cousins Shop",
    default: "Shop | Dr. Jomo Cousins",
  },
  description: "Shop for books, apparel, and accessories from Dr. Jomo Cousins",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#3d3d3d] text-black`}>
      <body className="min-h-screen flex flex-col">
        <div className="pointer-events-none relative z-10 flex-grow flex flex-col">
          <div className="pointer-events-auto">
            <Nav />
          </div>
          <main className="pointer-events-auto flex-grow">{children}</main>
        </div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
