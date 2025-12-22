"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#3d3d3d]/95 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logos/Asset 1.png"
                alt="Jomo Cousins Logo"
                width={40}
                height={40}
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-lg font-bold tracking-wider group-hover:text-[#e31e24] transition-colors">
              JOMO COUSINS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="relative text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e31e24] after:transition-all hover:after:w-full"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="relative text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e31e24] after:transition-all hover:after:w-full"
            >
              About
            </Link>
            <Link
              href="/products"
              className="relative text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e31e24] after:transition-all hover:after:w-full"
            >
              Books + More
            </Link>
            <Link
              href="/contact"
              className="relative text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e31e24] after:transition-all hover:after:w-full"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-[#e31e24] px-6 py-2.5 text-sm font-bold uppercase tracking-wide shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] py-2"
            >
              About
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] py-2"
            >
              Books + More
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#e31e24] py-2"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg bg-[#e31e24] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-center shadow-lg transition-all hover:bg-[#c41a1f] mt-2"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
