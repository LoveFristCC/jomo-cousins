import Link from "next/link";
import CustomPortableText from "@/app/(home)/portable-text";

interface BookPreviewProps {
  previewChapter?: {
    title?: string;
    chapterNumber?: number;
    content?: any;
  };
  bookTitle: string;
  bookSlug: string;
}

/**
 * Book preview teaser on product page
 * Shows excerpt with CTA to read full chapter on dedicated preview page
 */
export default function BookPreview({
  previewChapter,
  bookTitle,
  bookSlug,
}: BookPreviewProps) {
  if (!previewChapter || !previewChapter.title || !previewChapter.content) return null;

  // Extract first paragraph for preview
  const getExcerpt = () => {
    if (Array.isArray(previewChapter.content)) {
      const firstBlock = previewChapter.content[0];
      if (firstBlock?.children?.[0]?.text) {
        return firstBlock.children[0].text.substring(0, 300) + "...";
      }
    }
    return "Read a free preview chapter from this book.";
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Preview Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-[#e31e24] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
              📖 Free Preview Available
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
              Read Before You Buy
            </h2>
            <p className="text-xl text-gray-600">
              Get a taste of what's inside with a free chapter
            </p>
          </div>

          {/* Preview Card */}
          <article className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
            {/* Chapter Title */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-2">
                {previewChapter.chapterNumber
                  ? `Chapter ${previewChapter.chapterNumber}: `
                  : ""}
                {previewChapter.title}
              </h3>
              <p className="text-gray-500">
                From <span className="font-semibold text-[#2d2d2d]">{bookTitle}</span>
              </p>
            </div>

            {/* Excerpt */}
            <div className="mb-8 text-gray-700 leading-relaxed text-lg italic border-l-4 border-[#e31e24] pl-6 py-2 bg-gray-50">
              "{getExcerpt()}"
            </div>

            {/* CTA to Read Full Chapter */}
            <div className="text-center pt-6 border-t-2 border-gray-100">
              <Link
                href={`/books/${bookSlug}/preview`}
                className="inline-block rounded-lg bg-gradient-to-r from-[#e31e24] to-[#c41a1f] px-10 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl mb-4"
              >
                Read Full Preview Chapter →
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                No purchase required • 100% free to read
              </p>
            </div>
          </article>

          {/* SEO Note - Hidden from users but helps Google */}
          <div className="sr-only">
            <p>
              A free preview chapter from {bookTitle} by Dr. Jomo Cousins is
              available to read. The full book contains additional chapters with
              powerful insights on personal growth, spiritual development, and
              achieving your God-given purpose. Read the preview chapter to get
              a sample of the book's content before purchasing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
