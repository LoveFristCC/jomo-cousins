import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#f5f5f0] py-16 text-[#303030]">
      <div className="container mx-auto px-5">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Mission */ }
          <div>
            <div className="mb-6">
              <Image
                src="/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.png"
                alt="Jomo & Charmaine"
                width={ 250 }
                height={ 100 }
                className="h-auto w-48"
                quality={ 100 }
              />
            </div>
            <div className="mb-4 h-[2px] w-16 bg-[#ea8125]"></div>
            <p className="text-sm leading-relaxed text-gray-600">
              We strive to help you find your rhythm as couple and develop healthy habits that will allow you to be the best version of yourselves so you can thrive as a unit.
            </p>
          </div>

          {/* Quick Links */ }
          <div>
            <h3 className="mb-2 text-xl font-bold">Quick Links</h3>
            <div className="mb-6 h-[2px] w-16 bg-[#ea8125]"></div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/jomo-and-charmaine/about"
                  className="text-gray-700 transition-colors hover:text-[#ea8125]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/jomo-and-charmaine/couples-corner"
                  className="text-gray-700 transition-colors hover:text-[#ea8125]"
                >
                  Couples' Corner
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 transition-colors hover:text-[#ea8125]"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/jomo-and-charmaine/contact"
                  className="text-gray-700 transition-colors hover:text-[#ea8125]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/jomo-and-charmaine/contact"
                  className="text-gray-700 transition-colors hover:text-[#ea8125]"
                >
                  Request an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */ }
          <div>
            <h3 className="mb-2 text-xl font-bold">Services</h3>
            <div className="mb-6 h-[2px] w-16 bg-[#ea8125]"></div>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-700">Communication Issues</li>
              <li className="text-gray-700">Premarital Counseling</li>
              <li className="text-gray-700">Sexual Issues</li>
              <li className="text-gray-700">Infidelity & Unfaithfulness</li>
              <li className="text-gray-700">Trust Issues</li>
              <li className="text-gray-700">Blended Family Support</li>
            </ul>
          </div>

          {/* How Can We Help */ }
          <div>
            <h3 className="mb-2 text-xl font-bold">How Can We Help?</h3>
            <div className="mb-6 h-[2px] w-16 bg-[#ea8125]"></div>

            {/* Contact Icon */ }
            {/* <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ea8125]">
                <svg className="h-8 w-8 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <p className="mb-6 text-center font-semibold">Contact Now</p> */}

            {/* CTA Button */ }
            <Link
              href="/jomo-and-charmaine/contact"
              className="mb-6 block rounded-lg bg-[#ea8125] px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
            >
              Request an Appointment
            </Link>

            {/* Social Media */ }
            <div className="flex justify-center gap-4">
              <a
                href="https://www.youtube.com/jomocharmaine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ea8125] transition-colors hover:text-[#d67320]"
                aria-label="YouTube"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/JomoAndCharmaine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ea8125] transition-colors hover:text-[#d67320]"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jomoandcharmaine_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ea8125] transition-colors hover:text-[#d67320]"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/JomoCharmaine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ea8125] transition-colors hover:text-[#d67320]"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
