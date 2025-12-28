"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  aspectRatio?: "video" | "square";
}

export default function YouTubePlayer({
  videoId,
  title,
  thumbnailUrl,
  aspectRatio = "video",
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Use YouTube's high quality thumbnail as fallback
  const thumbnail =
    thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Build YouTube URL with autoplay for single-click UX
  const getYouTubeUrl = () => {
    // Autoplay WITHOUT mute for view counting
    // Note: On some mobile browsers, autoplay may not work without mute
    // In those cases, user will see YouTube's play button
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
  };

  return (
    <div
      className={`relative w-full ${
        aspectRatio === "video" ? "aspect-video" : "aspect-square"
      }`}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail with Play Button */}
          <div className="absolute inset-0">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 transition-opacity hover:bg-black/40" />

          {/* Play button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Play ${title}`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e31e24] shadow-2xl transition-all group-hover:scale-110 group-hover:bg-[#c41a1f]">
              <Play className="h-10 w-10 fill-white text-white ml-1" />
            </div>
          </button>
        </>
      ) : (
        /* YouTube iframe */
        <iframe
          src={getYouTubeUrl()}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          aria-label={`Video player: ${title}`}
        />
      )}
    </div>
  );
}
