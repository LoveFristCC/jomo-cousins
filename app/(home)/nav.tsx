"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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

            {/* Mobile Menu Button - Hamburger Only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
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
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[51] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#3d3d3d] text-white shadow-2xl z-[52] lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close menu"
        >
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
        </button>

        <div className="flex flex-col h-full p-6 pt-20">
          {/* Logo in drawer */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/logos/Asset 1.png"
                alt="Jomo Cousins Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-base font-bold tracking-wider">
                JOMO COUSINS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 flex-1">
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
          </div>

          {/* Book Now Button */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg bg-[#e31e24] px-6 py-3 text-sm font-bold uppercase tracking-wide text-center shadow-lg transition-all hover:bg-[#c41a1f] mt-auto"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
