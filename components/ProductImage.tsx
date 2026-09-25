"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Sanity already resizes and optimizes these images at its CDN.
function sanityLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 85));
  url.searchParams.set("auto", "format");
  return url.toString();
}

export default function ProductImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src?: string | null }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (!src || failedSource === src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 p-6 text-center text-gray-400" role="img" aria-label={`${alt} — image unavailable`}>
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15 8h.01" />
        </svg>
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return <Image {...props} src={src} alt={alt} loader={src.startsWith("https://cdn.sanity.io/") ? sanityLoader : undefined} onError={() => setFailedSource(src)} />;
}
