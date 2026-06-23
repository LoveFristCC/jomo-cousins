import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] py-16 text-white">
      <div className="container mx-auto px-5">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */ }
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-6 inline-flex items-center gap-3">
              <Image
                src="/images/logos/Asset 1.webp"
                alt="Jomo Cousins Logo"
                width={ 48 }
                height={ 48 }
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-black tracking-wider transition-colors group-hover:text-[#e31e24]">
                JOMO COUSINS
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Motivational speaker, pastor, and author inspiring transformation through powerful messages.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/pastorjomo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#e31e24] hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pastorjomo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#e31e24] hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@PASTORJOMO"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#e31e24] hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dr-jomo-cousins-277279138/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#e31e24] hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#e31e24] hover:scale-110"
                aria-label="RSS feed"
              >
                <svg className="h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */ }
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-wider text-gray-500">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Books & Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Other Sites */ }
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-wider text-gray-500">More Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/prayer" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Prayer Ministry
                </Link>
              </li>
              <li>
                <Link href="/marriage" className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#ea8125]">
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Marriage Counseling
                </Link>
              </li>
              <li>
                <a
                  href="https://jomo-cousins.mykajabi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-gray-400 transition-colors hover:text-[#e31e24]"
                >
                  <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  Member Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */ }
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-wider text-gray-500">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:bookjomocousins@gmail.com" className="transition-colors hover:text-white">
                  bookjomocousins@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Riverview, FL
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */ }
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/return-policy" className="transition-colors hover:text-white">
                Return Policy
              </Link>
            </div>
            <p>&copy; { new Date().getFullYear() } Dr. Jomo Cousins. All rights reserved.</p>
          </div>
          <div className="mt-10 text-center text-xs text-gray-500">
            Website by{ " " }
            <Link
              href="https://www.khalstead.com"
              className="transition-colors hover:text-gray-300"
            >
              Kevin Halstead, EliteWebWrxs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
