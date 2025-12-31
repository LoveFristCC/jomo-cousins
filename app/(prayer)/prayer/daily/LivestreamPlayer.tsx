export default function LivestreamPlayer() {
  return (
    <div className="space-y-4">
      {/* Section Header */ }
      {/* <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Latest Teaching</h3>
        <p className="text-gray-600">Watch the most recent message from Pastor Jomo</p>
      </div> */}

      {/* Video Player - Shows most recent upload */ }
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-xl">
        <iframe
          src="https://www.youtube.com/embed?listType=playlist&list=UUTE0GojjBjxsxB8ojlRc0ug"
          title="Latest Teaching from Pastor Jomo Cousins"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          aria-label="Latest teaching and prayer videos from Pastor Jomo"
        />
      </div>

      {/* Call to Action */ }
      <div className="text-center">
        <a
          href="https://www.youtube.com/@PASTORJOMO/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          View All Teachings on YouTube
        </a>
      </div>
    </div>
  );
}
