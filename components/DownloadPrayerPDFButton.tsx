"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface DownloadPrayerPDFButtonProps {
  slug: string;
  title: string;
}

export default function DownloadPrayerPDFButton({
  slug,
  title,
}: DownloadPrayerPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Fetch the PDF from the API
      const response = await fetch(`/api/generate-prayer-pdf?slug=${slug}`);

      if (!response.ok) {
        const error = await response.json();
        console.error("PDF Generation Error:", error);
        throw new Error(error.details || error.error || "Failed to generate PDF");
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-prayer-guide.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      const message = error instanceof Error ? error.message : "Failed to download PDF";
      alert(`Failed to download PDF: ${message}\n\nPlease check the console for more details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="flex items-center gap-2 rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c41a1f] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={16} className={isGenerating ? "animate-bounce" : ""} />
      {isGenerating ? "Generating PDF..." : "Download Prayer Guide PDF"}
    </button>
  );
}
