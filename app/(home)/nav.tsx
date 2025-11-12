import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#3d3d3d] text-white">
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logos/Asset 1.png"
            alt="Jomo Cousins Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-lg font-bold tracking-wider">
            JOMO COUSINS
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/books"
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-gray-300"
            >
              Books + More
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
          <Link
            href="/contact"
            className="bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-[#c41a1f]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
