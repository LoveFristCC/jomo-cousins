/**
 * Migration script to extract YouTube video IDs from existing prayer videos
 * Run this in Sanity Studio Vision or as a standalone script
 */

/**
 * Extract YouTube video ID from various YouTube URL formats
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
 * Main migration function
 * Use this GROQ query in Vision to extract and update video IDs:
 *
 * Run this in Vision with "Listen" mode:
 */
export const migrationGroq = `
*[_type == "prayerVideo" && defined(youtubeUrl)] {
  _id,
  _type,
  youtubeUrl,
  youtubeVideoId
}
`;

/**
 * For each result from the query above, run this patch in Vision:
 *
 * For URL: https://www.youtube.com/watch?v=zVHgAUenZNY
 * Video ID: zVHgAUenZNY
 *
 * Patch command:
 * sanityClient.patch('DOCUMENT_ID').set({youtubeVideoId: 'VIDEO_ID'}).commit()
 */

// Example: For the walking-in-the-spirit video
// sanityClient.patch('DOCUMENT_ID').set({youtubeVideoId: 'zVHgAUenZNY'}).commit()

console.log(`
Migration Instructions:
1. Go to Sanity Studio Vision at /studio/vision
2. Run this query to find all prayer videos:
   ${migrationGroq}

3. For each video without a youtubeVideoId, extract the ID from the youtubeUrl
4. Update manually or use the patch command:
   sanityClient.patch('DOCUMENT_ID').set({youtubeVideoId: 'VIDEO_ID'}).commit()

Example for https://www.youtube.com/watch?v=zVHgAUenZNY:
  Video ID: zVHgAUenZNY
`);

// Export the extractor function for use in other scripts
export { extractYouTubeVideoId };
