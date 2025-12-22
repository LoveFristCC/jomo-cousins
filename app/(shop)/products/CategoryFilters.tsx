"use client";

import Link from "next/link";

interface CategoryFiltersProps {
  activeCategory?: string;
}

const categories = [
  { id: "", label: "All Products" },
  { id: "books", label: "Books" },
  { id: "tshirts", label: "T-Shirts" },
  { id: "hoodies", label: "Hoodies" },
  { id: "accessories", label: "Accessories" },
];

export default function CategoryFilters({ activeCategory }: CategoryFiltersProps) {
  return (
    <div className="mb-12 flex gap-3 flex-wrap justify-center md:justify-start">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id || (!activeCategory && cat.id === "");

        return (
          <Link
            key={cat.id}
            href={cat.id ? `/products?category=${cat.id}` : "/products"}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isActive
                ? "bg-[#e31e24] text-white shadow-lg scale-105"
                : "border-2 border-[#2d2d2d] text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white hover:scale-105"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
