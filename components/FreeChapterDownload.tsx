"use client";

import { Download } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

interface FreeChapterDownloadProps {
  pdfUrl: string;
  bookTitle: string;
  chapterTitle?: string;
}

/**
 * Free chapter PDF download card.
 */
export default function FreeChapterDownload({
  pdfUrl,
  bookTitle,
  chapterTitle,
}: FreeChapterDownloadProps) {
  const filename = `${bookTitle.replace(/[^\w\s-]/g, "").trim() || "book"} - Free Chapter.pdf`;
  // Sanity's CDN forces a download with the given filename via ?dl=
  const downloadUrl = `${pdfUrl}?dl=${encodeURIComponent(filename)}`;

  return (
    <div className="rounded-2xl border-2 border-[#e31e24] bg-white p-8 shadow-xl md:p-10">
      <div className="mb-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-[#e31e24] p-4">
            <Download className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-[#2d2d2d] md:text-3xl">
          Download the Free Chapter (PDF)
        </h3>
        <p className="text-gray-600">
          Get { chapterTitle ? <span className="font-semibold text-[#2d2d2d]">{ chapterTitle }</span> : "a free chapter" } from{ " " }
          <span className="font-semibold text-[#2d2d2d]">{ bookTitle }</span> to read anytime, anywhere.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <a
          href={ downloadUrl }
          download={ filename }
          onClick={ () =>
            sendGAEvent("event", "file_download", {
              file_name: filename,
              book_title: bookTitle,
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#e31e24] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#c41a1f] hover:shadow-xl"
        >
          <Download className="h-5 w-5" />
          Download Free Chapter
        </a>
        <p className="mt-3 text-center text-xs text-gray-500">
          No sign-up required
        </p>
      </div>
    </div>
  );
}
