"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import { client } from "@/sanity/lib/client";
import {
  recentPrayersQuery,
  prayerCategoriesQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";

type Prayer = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: any;
  categories: { title: string; slug: string }[];
  duration: string;
  publishedAt: string;
  viewCount: number;
  tags: string[];
};

type Category = {
  _id: string;
  title: string;
  slug: string;
  prayerCount: number;
};

export default function SearchPage() {
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ prayers, setPrayers ] = useState<Prayer[]>([]);
  const [ categories, setCategories ] = useState<Category[]>([]);
  const [ selectedCategories, setSelectedCategories ] = useState<string[]>([]);
  const [ sortBy, setSortBy ] = useState<"newest" | "mostWatched" | "alphabetical">(
    "newest"
  );
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);
  const resultsPerPage = 12;

  // Popular search terms for suggestions
  // const popularSearches = [
  //   "healing",
  //   "anxiety",
  //   "financial breakthrough",
  //   "relationship",
  //   "guidance",
  //   "peace",
  //   "strength",
  //   "forgiveness",
  // ];

  // Fetch prayers and categories on mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [ prayersData, categoriesData ] = await Promise.all([
        client.fetch(recentPrayersQuery, { limit: 100 }),
        client.fetch(prayerCategoriesQuery, {}),
      ]);
      setPrayers(prayersData || []);
      setCategories(categoriesData || []);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Filter and sort prayers
  const filteredPrayers = useMemo(() => {
    let filtered = prayers;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (prayer) =>
          prayer.title.toLowerCase().includes(query) ||
          prayer.excerpt?.toLowerCase().includes(query) ||
          prayer.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((prayer) =>
        prayer.categories?.some((cat) =>
          selectedCategories.includes(cat.slug)
        )
      );
    }

    // Sort
    const sorted = [ ...filtered ];
    if (sortBy === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === "mostWatched") {
      sorted.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [ prayers, searchQuery, selectedCategories, sortBy ]);

  // Paginate results
  const totalPages = Math.ceil(filteredPrayers.length / resultsPerPage);
  const paginatedPrayers = filteredPrayers.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Toggle category filter
  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [ ...prev, slug ]
    );
    setCurrentPage(1); // Reset to first page
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to Main Content Link */ }
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#e31e24] focus:px-6 focus:py-3 focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Hero/Header */ }
      <section
        id="main-content"
        className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-16 text-white md:py-20"
      >
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Search On-Demand Prayer Library
            </h1>
            <p className="text-xl text-gray-300">
              Find the prayer you need.
            </p>
          </div>
        </div>
      </section>

      {/* Search Interface */ }
      <section className="border-b border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={ 24 }
              />
              <input
                type="text"
                value={ searchQuery }
                onChange={ (e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                } }
                placeholder="Search for healing, peace, guidance..."
                className="w-full rounded-xl border-2 border-gray-300 py-4 pl-14 pr-12 text-lg focus:border-[#e31e24] focus:outline-none"
                aria-label="Search prayers"
              />
              { searchQuery && (
                <button
                  onClick={ () => setSearchQuery("") }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={ 24 } />
                </button>
              ) }
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Sort Options */ }
      <section className="border-b border-gray-200 bg-white py-6">
        <div className="container mx-auto px-5">
          {/* Category Filters */ }
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-600">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              { categories.map((category) => (
                <button
                  key={ category._id }
                  onClick={ () => toggleCategory(category.slug) }
                  className={ `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategories.includes(category.slug)
                    ? "bg-[#e31e24] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }` }
                  aria-label={ `Filter by ${category.title} prayers` }
                  aria-pressed={ selectedCategories.includes(category.slug) }
                >
                  { category.title } ({ category.prayerCount })
                </button>
              )) }
            </div>
          </div>

          {/* Sort and Results Count */ }
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-gray-700">
              <span className="font-bold">{ filteredPrayers.length }</span> prayers
              found
              { (searchQuery || selectedCategories.length > 0) && (
                <button
                  onClick={ clearFilters }
                  className="ml-4 text-sm font-semibold text-[#e31e24] hover:underline"
                >
                  Clear all filters
                </button>
              ) }
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-semibold text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={ sortBy }
                onChange={ (e) => setSortBy(e.target.value as any) }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold focus:border-[#e31e24] focus:outline-none"
                aria-label="Sort prayers by"
              >
                <option value="newest">Newest</option>
                <option value="mostWatched">Most Watched</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */ }
      <section className="py-12">
        <div className="container mx-auto px-5">
          { isLoading ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">Loading prayers...</p>
            </div>
          ) : paginatedPrayers.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                { paginatedPrayers.map((prayer) => (
                  <Link
                    key={ prayer._id }
                    href={ `/prayer/${prayer.slug}` }
                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  >
                    {/* Thumbnail */ }
                    { prayer.featuredImage && (
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                        <Image
                          src={ urlForImage(prayer.featuredImage)?.url() || "" }
                          alt={ `${prayer.title} - Prayer with Jomo Cousins` }
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="rounded-lg bg-[#e31e24] px-6 py-3 font-bold text-white">
                            Pray Now
                          </span>
                        </div>
                      </div>
                    ) }

                    {/* Prayer Info */ }
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] group-hover:text-[#e31e24]">
                        { prayer.title }
                      </h3>
                      { prayer.excerpt && (
                        <p className="mb-4 line-clamp-2 text-gray-600">
                          { prayer.excerpt.substring(0, 75) }
                          { prayer.excerpt.length > 75 ? "..." : "" }
                        </p>
                      ) }
                      <div className="mb-3 flex flex-wrap gap-2">
                        { prayer.categories?.slice(0, 2).map((cat) => (
                          <span
                            key={ cat.slug }
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                          >
                            { cat.title }
                          </span>
                        )) }
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        { prayer.duration && <span>{ prayer.duration }</span> }
                        { prayer.publishedAt && (
                          <span>
                            { format(parseISO(prayer.publishedAt), "MMM d, yyyy") }
                          </span>
                        ) }
                      </div>
                    </div>
                  </Link>
                )) }
              </div>

              {/* Pagination */ }
              { totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    onClick={ () => setCurrentPage((p) => Math.max(1, p - 1)) }
                    disabled={ currentPage === 1 }
                    className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-4 py-2 text-gray-700">
                    Page { currentPage } of { totalPages }
                  </span>
                  <button
                    onClick={ () =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={ currentPage === totalPages }
                    className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              ) }
            </>
          ) : (
            /* No Results State */
            <div className="mx-auto max-w-2xl rounded-xl bg-gray-50 p-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-[#3d3d3d]">
                { searchQuery
                  ? `We couldn't find a prayer matching "${searchQuery}"`
                  : "No prayers found with selected filters" }
              </h2>
              <p className="mb-6 text-gray-600">Try one of these options:</p>
              <ul className="mb-8 space-y-2 text-left text-gray-700">
                <li>• Browse prayers by category</li>
                <li>• Try different keywords</li>
                <li>• Send your specific prayer request to Pastor Jomo</li>
              </ul>
              <Link
                href="/prayer/submit"
                className="inline-block rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white transition-colors hover:bg-[#c41a1f]"
              >
                Send Your Prayer Request
              </Link>
            </div>
          ) }
        </div>
      </section>

      {/* Popular Searches */ }
      {/* { !searchQuery && (
        <section className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-xl font-bold text-[#3d3d3d]">
                People also searched for:
              </h2>
              <div className="flex flex-wrap gap-3">
                { popularSearches.map((term) => (
                  <button
                    key={ term }
                    onClick={ () => setSearchQuery(term) }
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition-all hover:bg-[#e31e24] hover:text-white"
                  >
                    { term }
                  </button>
                )) }
              </div>
            </div>
          </div>
        </section>
      ) } */}
    </div>
  );
}
