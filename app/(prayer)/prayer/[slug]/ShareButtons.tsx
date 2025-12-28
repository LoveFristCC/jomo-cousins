"use client";

import { Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

type ShareButtonsProps = {
  shareUrl: string;
  shareTitle: string;
};

export default function ShareButtons({ shareUrl, shareTitle }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start md:gap-3">
      <span className="hidden text-sm font-semibold text-gray-600 sm:inline">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:px-4 md:py-2"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} className="flex-shrink-0" />
        <span className="hidden sm:inline">Facebook</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600 md:px-4 md:py-2"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} className="flex-shrink-0" />
        <span className="hidden sm:inline">Twitter</span>
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
        className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 md:px-4 md:py-2"
        aria-label="Share via Email"
      >
        <Mail size={18} className="flex-shrink-0" />
        <span className="hidden sm:inline">Email</span>
      </a>
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300 md:px-4 md:py-2"
        aria-label="Copy link to clipboard"
      >
        <LinkIcon size={18} className="flex-shrink-0" />
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
        <span className="sm:hidden">{copied ? "✓" : "Link"}</span>
      </button>
    </div>
  );
}
