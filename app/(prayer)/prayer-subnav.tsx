"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Send, Calendar } from "lucide-react";

export default function PrayerSubNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/prayer") return pathname === "/prayer";
    return pathname?.startsWith(path);
  };

  const subNavLinks = [
    { name: "Prayer Home", href: "/prayer", icon: BookOpen },
    { name: "Daily Prayer", href: "/prayer/daily", icon: Calendar },
    { name: "Search Prayers", href: "/prayer/search", icon: Search },
    { name: "Submit Request", href: "/prayer/submit", icon: Send },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-start gap-3 py-4 md:flex-row md:items-center md:justify-between">
          {/* Left: Section Title */ }
          <div className="hidden md:block">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              On-Demand Prayer
            </h2>
          </div>

          {/* Center/Right: Sub Navigation Links */ }
          <nav className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-2">
            { subNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={ link.name }
                  href={ link.href }
                  className={ `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all md:px-4 md:py-2 ${isActive(link.href)
                    ? "bg-[#e31e24] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#e31e24]"
                    }` }
                >
                  <Icon size={ 18 } className="flex-shrink-0" />
                  <span className="hidden sm:inline">{ link.name }</span>
                  <span className="sm:hidden">{ link.name.split(" ")[ 0 ] }</span>
                </Link>
              );
            }) }
          </nav>
        </div>
      </div>
    </div>
  );
}
