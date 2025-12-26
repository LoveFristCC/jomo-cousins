"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowLeft } from "lucide-react";

export default function Nav() {
  const [ isOpen, setIsOpen ] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "HOME", href: "/jomo-and-charmaine" },
    { name: "ABOUT US", href: "/jomo-and-charmaine/about" },
    { name: "COUPLES' CORNER", href: "/jomo-and-charmaine/couples-corner" },
    { name: "CONTACT US", href: "/jomo-and-charmaine/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */ }
            <Link href="/jomo-and-charmaine" className="flex items-center">
              <Image
                src="/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.png"
                alt="Jomo & Charmaine"
                width={ 220 }
                height={ 70 }
                priority
                className="h-10 w-auto md:h-12"
              />
            </Link>

            {/* Desktop Navigation */ }
            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-10 mr-8">
                { navLinks.map((link) => {
                  // For home, only match exact path. For others, match exact or nested routes
                  const isActive = link.href === "/jomo-and-charmaine"
                    ? pathname === link.href
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={ link.name }
                      href={ link.href }
                      className={ `text-sm font-bold uppercase tracking-wide transition-colors ${isActive
                        ? "text-[#ea8125]"
                        : "text-[#303030] hover:text-[#ea8125]"
                        }` }
                    >
                      { link.name }
                    </Link>
                  );
                }) }
              </div>

              {/* Main Site Link */ }
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
                className="rounded-lg bg-[#ea8125] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
              >
                Request an Appointment
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

      {/* Mobile Overlay */ }
      { isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={ () => setIsOpen(false) }
        />
      ) }

      {/* Mobile Drawer */ }
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
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Navigation
            </p>

            { navLinks.map((link) => {
              // For home, only match exact path. For others, match exact or nested routes
              const isActive = link.href === "/jomo-and-charmaine"
                ? pathname === link.href
                : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={ link.name }
                  href={ link.href }
                  onClick={ () => setIsOpen(false) }
                  className={ `text-xl font-bold transition-colors ${isActive
                    ? "text-[#ea8125]"
                    : "text-[#303030] hover:text-[#ea8125]"
                    }` }
                >
                  { link.name }
                </Link>
              );
            }) }
          </div>

          <div className="mt-auto flex flex-col gap-4">
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
              Request an Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
