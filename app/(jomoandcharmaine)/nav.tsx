import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          {/* Logo / Brand */ }
          <Link href="/jomo-and-charmaine" className="text-2xl font-bold text-[#303030]">
            Jomo & <span className="text-[#ea8125]">Charmaine</span>
          </Link>

          {/* Navigation Links */ }
          <div className="flex items-center gap-6">
            <Link
              href="/jomo-and-charmaine"
              className="font-medium text-[#303030] transition-colors hover:text-[#ea8125]"
            >
              Home
            </Link>
            <Link
              href="/jomo-and-charmaine/about"
              className="font-medium text-[#303030] transition-colors hover:text-[#ea8125]"
            >
              About
            </Link>
            <Link
              href="/jomo-and-charmaine/couples-corner"
              className="font-medium text-[#303030] transition-colors hover:text-[#ea8125]"
            >
              Couples Corner
            </Link>


            {/* Primary Action Button */ }
            <Link
              href="/jomo-and-charmaine/contact"
              className="rounded-lg bg-[#ea8125] px-6 py-2 font-bold text-white transition-all hover:bg-[#d67320]"
            >
              Contact
            </Link>
            {/* Subtle link back to main Jomo Cousins site */ }
            <Link
              href="/"
              className="font-medium text-gray-400 text-sm italic transition-colors hover:text-[#ea8125]"
            >
              Back to Jomo Cousins
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}
