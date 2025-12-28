/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);

    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
      return urlObj.searchParams.get("v");
    }

    // Handle youtu.be/VIDEO_ID
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1); // Remove leading slash
    }

    // Handle youtube.com/embed/VIDEO_ID
    if (urlObj.hostname.includes("youtube.com") && urlObj.pathname.includes("/embed/")) {
      return urlObj.pathname.split("/embed/")[1]?.split("?")[0];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get YouTube video ID with fallback
 * First tries to use the provided videoId, then falls back to extracting from URL
 */
export function getYouTubeVideoId(videoId: string | null | undefined, youtubeUrl: string | null | undefined): string | null {
  // First, try to use the provided video ID
  if (videoId) {
    return videoId;
  }

  // Fallback to extracting from URL
  if (youtubeUrl) {
    return extractYouTubeVideoId(youtubeUrl);
  }

  return null;
}
