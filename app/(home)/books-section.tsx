import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { featuredBooksQuery, newestBooksQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { SlideInTop, StaggerChildren, StaggerItem, FadeIn, FadeInUp } from "./animations";

export default async function BooksSection() {
  // Try to fetch featured books first
  let books = await sanityFetch({
    query: featuredBooksQuery,
    params: { limit: 3 },
  });

  // If no featured books, fall back to newest books
  if (!books || books.length === 0) {
    books = await sanityFetch({
      query: newestBooksQuery,
      params: { limit: 3 },
    });
  }

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section id="books" className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-5">
        <SlideInTop>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Books & <span className="text-[#e31e24]">Resources</span>
            </h2>
            <p className="text-xl text-gray-600">
              Fill up on empowerment any time with motivational books
            </p>
          </div>
        </SlideInTop>

        {/* Book Images Grid */ }
        <StaggerChildren staggerDelay={ 0.2 }>
          <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-8">
            { books.map((book) => (
              <StaggerItem key={ book._id }>
                <div className="text-center max-w-xs">
                  <div className="mb-4 transition-transform hover:scale-105">
                    { book.images?.[ 0 ] && (
                      <div className="relative w-48 md:w-64 mx-auto aspect-[3/4]">
                        <Image
                          src={ urlForImage(book.images[ 0 ])?.width(800).url() || "" }
                          alt={ book.images[ 0 ].alt || book.name || "Book cover" }
                          fill
                          quality={ 100 }
                          className="object-cover object-top"
                        />
                      </div>
                    ) }
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#2d2d2d]">{ book.name }</h3>
                  { book.description && (
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      { typeof book.description === 'string'
                        ? book.description
                        : book.description[ 0 ]?.children?.[ 0 ]?.text || '' }
                    </p>
                  ) }
                  <Link
                    href={ `/products/${book.slug}` }
                    className="inline-block rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    View Book
                  </Link>
                </div>
              </StaggerItem>
            )) }
          </div>
        </StaggerChildren>

        {/* Platform Logos */ }
        <FadeIn delay={ 0.4 }>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
            <Image
              src="/images/site-files/image (23).png"
              alt="Audible"
              width={ 120 }
              height={ 40 }
              className="h-10 w-auto"
            />
            <Image
              src="/images/site-files/image (24).png"
              alt="Audible"
              width={ 120 }
              height={ 40 }
              className="h-10 w-auto"
            />
            <Image
              src="/images/site-files/image (22).png"
              alt="iTunes"
              width={ 120 }
              height={ 40 }
              className="h-10 w-auto"
            />
          </div>
        </FadeIn>

        <FadeInUp delay={ 0.6 }>
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
            >
              View All Books
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
