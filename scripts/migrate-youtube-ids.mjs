/**
 * Migration script to extract and update YouTube video IDs for existing prayer videos
 * Run with: node scripts/migrate-youtube-ids.mjs
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to create this token
  useCdn: false,
});

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
function extractYouTubeVideoId(url) {
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
  } catch (error) {
    console.error(`Failed to parse URL: ${url}`, error);
    return null;
  }
}

async function migrateYouTubeIds() {
  console.log("🔍 Fetching all prayer videos...\n");

  // Fetch all prayer videos
  const videos = await client.fetch(`
    *[_type == "prayerVideo" && defined(youtubeUrl)] {
      _id,
      title,
      youtubeUrl,
      youtubeVideoId
    }
  `);

  console.log(`Found ${videos.length} prayer videos\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const video of videos) {
    const videoId = extractYouTubeVideoId(video.youtubeUrl);

    if (!videoId) {
      console.log(`❌ Could not extract video ID from: ${video.youtubeUrl}`);
      failed++;
      continue;
    }

    // Skip if already has the correct video ID
    if (video.youtubeVideoId === videoId) {
      console.log(`⏭️  Already has correct ID: ${video.title}`);
      skipped++;
      continue;
    }

    // Update the document
    try {
      await client.patch(video._id).set({ youtubeVideoId: videoId }).commit();
      console.log(`✅ Updated "${video.title}": ${videoId}`);
      updated++;
    } catch (error) {
      console.error(`❌ Failed to update ${video.title}:`, error);
      failed++;
    }
  }

  console.log(`\n📊 Migration complete!`);
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
}

// Run the migration
migrateYouTubeIds().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
