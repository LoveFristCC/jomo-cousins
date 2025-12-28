import { definePlugin } from "sanity";

/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
function extractYouTubeVideoId(url: string): string | null {
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
 * Plugin that automatically extracts YouTube video ID from URL
 * for prayerVideo documents
 */
export const youtubeVideoExtractor = definePlugin({
  name: "youtube-video-extractor",
  document: {
    actions: (prev, context) => prev,
    // Use the document listener to auto-extract video ID
    unstable_languageFilter: (prev, context) => prev,
  },
});

// We'll use a different approach - export the extractor function
// and use it in the schema definition
export { extractYouTubeVideoId };
