import CustomPortableText from "@/app/(home)/portable-text";

interface BookPreviewProps {
  previewChapter?: {
    title?: string;
    chapterNumber?: number;
    content?: any;
  };
  bookTitle: string;
}

/**
 * Book preview/free chapter component
 * This content is fully indexable by search engines for SEO
 * Provides valuable content that helps Google understand what the book is about
 */
export default function BookPreview({
  previewChapter,
  bookTitle,
}: BookPreviewProps) {
  if (!previewChapter || !previewChapter.title || !previewChapter.content) return null;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Preview Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#e31e24] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
              Free Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4">
              {previewChapter.chapterNumber
                ? `Chapter ${previewChapter.chapterNumber}: `
                : ""}
              {previewChapter.title}
            </h2>
            <p className="text-xl text-gray-600">
              From <span className="font-semibold">{bookTitle}</span> by Dr.
              Jomo Cousins
            </p>
          </div>

          {/* Chapter Content - Fully Indexable */}
          <article className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <CustomPortableText value={previewChapter.content} />
            </div>

            {/* CTA after preview */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <div className="text-center">
                <p className="text-xl text-gray-700 mb-6">
                  Want to keep reading?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      const addToCart = document.querySelector(
                        '[data-add-to-cart]'
                      );
                      if (addToCart) {
                        addToCart.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }}
                    className="inline-block rounded-lg bg-[#e31e24] px-8 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    Get the Full Book
                  </button>
                  <a
                    href="#description"
                    className="inline-block rounded-lg border-2 border-[#2d2d2d] px-8 py-4 font-bold uppercase tracking-wide text-[#2d2d2d] transition-all hover:bg-[#2d2d2d] hover:text-white"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* SEO Note - Hidden from users but helps Google */}
          <div className="sr-only">
            <p>
              This is a free preview chapter from {bookTitle} by Dr. Jomo
              Cousins. The full book is available for purchase and contains
              additional chapters with powerful insights on personal growth,
              spiritual development, and achieving your God-given purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
