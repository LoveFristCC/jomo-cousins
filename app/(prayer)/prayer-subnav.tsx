"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Send, Calendar, LayoutGrid } from "lucide-react";

export default function PrayerSubNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/prayer") return pathname === "/prayer";
    return pathname?.startsWith(path);
  };

  const subNavLinks = [
    { name: "Prayer Home", href: "/prayer", icon: BookOpen },
    { name: "Daily Prayer", href: "/prayer/daily", icon: Calendar },
    { name: "All Categories", href: "/prayer/category", icon: LayoutGrid },
    { name: "Search Prayers", href: "/prayer/search", icon: Search },
    { name: "Submit Request", href: "/prayer/submit", icon: Send },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-start gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          {/* Left: Section Title */ }
          <div className="hidden md:block">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              On-Demand Prayer
            </h2>
          </div>

          {/* Center/Right: Sub Navigation Links */ }
          <nav className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap md:w-auto">
            { subNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={ link.name }
                  href={ link.href }
                  className={ `flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all sm:justify-start md:px-4 md:py-2 ${isActive(link.href)
                    ? "bg-[#e31e24] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#e31e24]"
                    }` }
                >
                  <Icon size={ 20 } className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{ link.name }</span>
                </Link>
              );
            }) }
          </nav>
        </div>
      </div>
    </div>
  );
}
