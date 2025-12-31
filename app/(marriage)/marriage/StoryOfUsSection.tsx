"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";

export default function StoryOfUsSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      {/* The Story of US Section */}
      <section className="relative bg-white">
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="group relative w-full cursor-pointer transition-all hover:opacity-90"
          aria-label="Watch The Story of Us video"
        >
          <div className="relative w-full">
            <Image
              src="/images/marriage/main-page/The-Story-of-Us-7.webp"
              alt="The Story of Us - Jomo and Charmaine"
              width={1920}
              height={400}
              className="w-full h-auto"
              quality={100}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ea8125] shadow-2xl transition-all group-hover:scale-110 group-hover:bg-[#d67320]">
                <svg className="h-10 w-10 fill-white text-white ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="MDpU-VhpRyE"
        startTime={2}
      />
    </>
  );
}
