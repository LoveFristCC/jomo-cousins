import { useCallback } from "react";
import { StringInputProps, set, unset, useFormValue, useClient } from "sanity";
import { TextInput, Stack, Text } from "@sanity/ui";

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
 * Custom input component for YouTube URL that auto-extracts video ID
 */
export function YouTubeUrlInput(props: StringInputProps) {
  const { onChange, value, elementProps } = props;
  const documentValue = useFormValue([]) as any;
  const client = useClient({ apiVersion: "2024-01-01" });

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      onChange(newValue ? set(newValue) : unset());

      // Auto-extract and update video ID
      if (newValue) {
        const videoId = extractYouTubeVideoId(newValue);

        if (videoId && documentValue?._id) {
          try {
            // Patch the document to update the youtubeVideoId field
            await client
              .patch(documentValue._id)
              .set({ youtubeVideoId: videoId })
              .commit();

            console.log("Auto-extracted YouTube Video ID:", videoId);
          } catch (error) {
            console.error("Failed to update video ID:", error);
          }
        }
      }
    },
    [onChange, documentValue?._id, client]
  );

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        value={value || ""}
        onChange={handleChange}
        placeholder="https://www.youtube.com/watch?v=..."
      />
      {value && (
        <Text size={1} muted>
          Video ID: {extractYouTubeVideoId(value as string) || "Could not extract ID"}
        </Text>
      )}
    </Stack>
  );
}
