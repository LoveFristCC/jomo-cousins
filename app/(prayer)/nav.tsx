"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowLeft } from "lucide-react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/prayer") return pathname === "/prayer";
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { name: "Prayer Home", href: "/prayer" },
    { name: "Daily Prayer", href: "/prayer/daily" },
    { name: "Submit Request", href: "/prayer/submit" },
    { name: "Search Prayers", href: "/prayer/search" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-5">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/prayer" className="group flex items-center gap-3">
              <Image
                src="/images/logos/Asset 1.webp"
                alt="Pray with Pastor Jomo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-600">
                  PRAY WITH
                </span>
                <span className="text-lg font-black tracking-tight text-[#3d3d3d]">
                  PASTOR JOMO
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-[#e31e24]"
                      : "text-gray-700 hover:text-[#e31e24]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Back to Main Site */}
              <Link
                href="/"
                className="group flex items-center gap-1.5 border-l border-gray-300 pl-6 text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors hover:text-[#3d3d3d]"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Main Site
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="rounded-lg p-2 text-gray-700 lg:hidden hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-6 top-6 p-2 text-gray-500 hover:text-black"
          aria-label="Close navigation menu"
        >
          <X size={28} />
        </button>

        <div className="flex h-full flex-col p-8 pt-20">
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Navigation
            </p>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-bold transition-colors ${
                  isActive(link.href)
                    ? "text-[#e31e24]"
                    : "text-gray-700 hover:text-[#e31e24]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto border-t border-gray-100 pt-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-bold italic text-gray-400"
            >
              <ArrowLeft size={16} /> Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
