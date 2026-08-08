"use client";

import { useState } from "react";
import { Download } from "lucide-react";

/** Downloads a week's prayer points as a PDF via /api/generate-week-pdf. */
export default function DownloadPointsButton({ slug }: { slug: string }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const res = await fetch(`/api/generate-week-pdf?slug=${slug}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.details || err.error || "Failed to generate PDF");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-prayer-points.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading prayer points:", error);
      alert(
        `Sorry — the download failed.\n\n${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:border-[#e31e24] hover:text-[#e31e24] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Download size={16} />
      {isGenerating ? "Preparing PDF…" : "Download prayer points"}
    </button>
  );
}
