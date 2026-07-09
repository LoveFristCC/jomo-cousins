import Link from "next/link";

export type Crumb = { name: string; href?: string };

/**
 * Accessible, semantic breadcrumb for the marriage section.
 * Renders <nav aria-label="Breadcrumb"> with an ordered list; the last item is
 * marked aria-current="page". Keep the item labels in sync with the page's
 * BreadcrumbList JSON-LD so the visible trail mirrors the structured data.
 */
export default function Breadcrumb({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={ className }>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        { items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={ index } className="flex min-w-0 items-center gap-2">
              { item.href && !isLast ? (
                <Link
                  href={ item.href }
                  className="text-gray-600 transition-colors hover:text-[#ea8125]"
                >
                  { item.name }
                </Link>
              ) : (
                <span
                  aria-current={ isLast ? "page" : undefined }
                  className={
                    isLast
                      ? "truncate max-w-[60vw] font-semibold text-[#303030] md:max-w-md"
                      : "text-gray-600"
                  }
                >
                  { item.name }
                </span>
              ) }
              { !isLast && (
                <svg
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                </svg>
              ) }
            </li>
          );
        }) }
      </ol>
    </nav>
  );
}
