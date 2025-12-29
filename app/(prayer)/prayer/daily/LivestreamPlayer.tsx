"use client";

export default function LivestreamPlayer() {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src="https://www.youtube.com/embed/live_stream?channel=UCTE0GojjBjxsxB8ojlRc0ug"
          title="Live Prayer with Pastor Jomo Cousins"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          aria-label="Live prayer and teaching stream with Pastor Jomo"
        />
      </div>

      {/* Backup link when stream shows error */}
      <div className="rounded-lg border-2 border-red-100 bg-red-50 p-4 text-center">
        <p className="mb-3 text-sm text-gray-700">
          If the stream doesn't load above, you can watch directly on YouTube:
        </p>
        <a
          href="https://www.youtube.com/@PASTORJOMO/streams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch Live on YouTube
        </a>
      </div>
    </div>
  );
}
