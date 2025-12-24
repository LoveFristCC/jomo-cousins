"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";

export default function Nav() {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/jomo-and-charmaine" },
    { name: "About", href: "/jomo-and-charmaine/about" },
    { name: "Couples Corner", href: "/jomo-and-charmaine/couples-corner" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */ }
            <Link href="/jomo-and-charmaine" className="group text-2xl font-bold tracking-tight text-[#303030]">
              Jomo & <span className="text-[#ea8125] transition-colors group-hover:text-[#d67320]">Charmaine</span>
            </Link>

            {/* Desktop Navigation */ }
            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-8 mr-8">
                { navLinks.map((link) => (
                  <Link
                    key={ link.name }
                    href={ link.href }
                    className="text-sm font-bold text-[#303030] transition-colors hover:text-[#ea8125]"
                  >
                    { link.name }
                  </Link>
                )) }
              </div>

              {/* Separated Main Site Link */ }
              <div className="flex items-center border-l border-gray-200 pl-8 mr-8">
                <Link
                  href="/"
                  className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-[#303030]"
                >
                  <ArrowLeft size={ 14 } className="transition-transform group-hover:-translate-x-1" />
                  Main Site
                </Link>
              </div>

              <Link
                href="/jomo-and-charmaine/contact"
                className="rounded-full bg-[#ea8125] px-7 py-2.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-orange-100 transition-all hover:scale-105 hover:bg-[#d67320] active:scale-95"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */ }
            <button
              className="rounded-lg p-2 text-[#303030] md:hidden hover:bg-gray-100"
              onClick={ toggleMenu }
              aria-label="Toggle menu"
            >
              <Menu size={ 28 } />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Darkens background) */ }
      { isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={ () => setIsOpen(false) }
        />
      ) }

      {/* Mobile Side Drawer (Solid White) */ }
      <div
        className={ `fixed right-0 top-0 z-[70] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }` }
      >
        <button
          onClick={ () => setIsOpen(false) }
          className="absolute right-6 top-6 p-2 text-gray-500 hover:text-black"
        >
          <X size={ 28 } />
        </button>

        <div className="flex flex-col h-full p-8 pt-20">
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Navigation</p>
            { navLinks.map((link) => (
              <Link
                key={ link.name }
                href={ link.href }
                onClick={ () => setIsOpen(false) }
                className="text-xl font-bold text-[#303030] hover:text-[#ea8125]"
              >
                { link.name }
              </Link>
            )) }
          </div>

          <div className="mt-auto flex flex-col gap-4">
            {/* Subtle separator for mobile bridge */ }
            <div className="border-t border-gray-100 pt-6">
              <Link
                href="/"
                onClick={ () => setIsOpen(false) }
                className="flex items-center gap-2 text-sm font-bold text-gray-400 italic"
              >
                <ArrowLeft size={ 16 } /> Back to Jomo Cousins
              </Link>
            </div>

            <Link
              href="/jomo-and-charmaine/contact"
              onClick={ () => setIsOpen(false) }
              className="rounded-xl bg-[#ea8125] py-4 text-center text-lg font-bold text-white shadow-lg shadow-orange-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}