"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type PrayerVideoPlayerProps = {
  videoId: string | null;
  thumbnailUrl: string | null;
  title: string;
};

export default function PrayerVideoPlayer({
  videoId,
  thumbnailUrl,
  title,
}: PrayerVideoPlayerProps) {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isMobile, setIsMobile ] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!videoId) {
    return (
      <div className="relative w-full aspect-video md:aspect-auto md:h-full bg-black">
        { thumbnailUrl ? (
          <Image
            src={ thumbnailUrl }
            alt={ title }
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Video not available</p>
          </div>
        ) }
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video md:aspect-auto md:h-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={ `https://www.youtube.com/embed/${videoId}?autoplay=1${isMobile ? "&mute=1" : ""
            }` }
          title={ title }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <button
      onClick={ () => setIsPlaying(true) }
      className="group relative w-full aspect-video md:aspect-auto md:h-full cursor-pointer overflow-hidden bg-black block"
      aria-label={ `Play ${title}` }
    >
      {/* Thumbnail */ }
      <div className="absolute inset-0">
        { thumbnailUrl ? (
          <Image
            src={ thumbnailUrl }
            alt={ title }
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <Image
            src={ `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }
            alt={ title }
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) }
      </div>

      {/* Dark overlay on hover */ }
      <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40 pointer-events-none" />

      {/* Play Button */ }
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e31e24] shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c41a1f]">
          <svg
            className="ml-1 h-10 w-10 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
