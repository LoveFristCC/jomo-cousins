"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react"; // Optional: npm install lucide-react

export default function Nav() {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Books + More", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#3d3d3d]/90 text-white backdrop-blur-md">
        <div className="container mx-auto px-5">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */ }
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/images/logos/Asset 1.png"
                alt="Logo"
                width={ 40 }
                height={ 40 }
                className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
              />
              <span className="text-lg font-black tracking-tighter transition-colors group-hover:text-[#e31e24]">
                JOMO COUSINS
              </span>
            </Link>

            {/* Desktop Navigation */ }
            <div className="hidden items-center gap-1 lg:flex">
              <div className="flex items-center gap-6 mr-6">
                { navLinks.map((link) => (
                  <Link
                    key={ link.name }
                    href={ link.href }
                    className={ `relative text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#e31e24] ${isActive(link.href) ? "text-[#e31e24]" : "text-gray-300"
                      }` }
                  >
                    { link.name }
                  </Link>
                )) }
              </div>

              {/* The "Subtle Bridge" Link */ }
              <div className="mr-6 flex items-center border-l border-white/20 pl-6">
                <Link
                  href="/jomo-and-charmaine"
                  className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-all hover:text-white"
                >
                  <span className="text-[#ea8125]">J&C</span>
                  <span className="hidden xl:inline group-hover:translate-x-1 transition-transform">Marriage</span>
                </Link>
              </div>

              <Link
                href="/contact"
                className="rounded-full bg-[#e31e24] px-7 py-2.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-red-900/20 transition-all hover:scale-105 hover:bg-[#c41a1f] active:scale-95"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Toggle */ }
            <button
              onClick={ () => setMobileMenuOpen(true) }
              className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu size={ 28 } />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */ }
      <div
        className={ `fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }` }
        onClick={ () => setMobileMenuOpen(false) }
      />

      <div
        className={ `fixed right-0 top-0 z-[70] h-full w-[300px] bg-[#2d2d2d] p-8 shadow-2xl transition-transform duration-500 ease-out lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }` }
      >
        <button
          onClick={ () => setMobileMenuOpen(false) }
          className="absolute right-6 top-6 text-gray-400 hover:text-white"
        >
          <X size={ 32 } />
        </button>

        <div className="mt-12 flex flex-col gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Menu</p>
          { navLinks.map((link) => (
            <Link
              key={ link.name }
              href={ link.href }
              onClick={ () => setMobileMenuOpen(false) }
              className={ `text-2xl font-bold tracking-tight ${isActive(link.href) ? "text-[#e31e24]" : "text-white"
                }` }
            >
              { link.name }
            </Link>
          )) }

          <div className="mt-4 border-t border-white/10 pt-8">
            <Link
              href="/jomo-and-charmaine"
              onClick={ () => setMobileMenuOpen(false) }
              className="flex items-center gap-3 text-lg font-bold text-[#ea8125]"
            >
              Jomo & Charmaine <Heart size={ 18 } fill="#ea8125" />
            </Link>
            <p className="mt-1 text-xs text-gray-400">Visit our marriage & couples site</p>
          </div>

          <Link
            href="/contact"
            onClick={ () => setMobileMenuOpen(false) }
            className="mt-4 rounded-xl bg-[#e31e24] py-4 text-center text-sm font-black uppercase tracking-widest text-white shadow-xl"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}