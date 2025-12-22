import { useCallback, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { SparklesIcon, PublishIcon } from "@sanity/icons";
import { cleanDocument } from "@/sanity/lib/cleanHiddenCharacters";

/**
 * Automatically clean hidden Unicode characters before publishing
 * This wraps the default publish action
 */
export const CleanOnPublishAction: DocumentActionComponent = (props) => {
  const { id, type, published, draft, onComplete } = props;
  const { publish, patch } = useDocumentOperation(id, type);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);

    try {
      // Clean the draft document before publishing
      if (draft) {
        console.log("🧹 Cleaning document before publish:", id);

        // Clean the document
        const cleanedDoc = cleanDocument(draft);

        // Check if anything was actually cleaned
        const hasChanges = JSON.stringify(draft) !== JSON.stringify(cleanedDoc);

        if (hasChanges) {
          console.log("🧹 Found hidden characters, cleaning...");

          // Patch the document with cleaned version
          patch.execute([
            {
              set: cleanedDoc,
            },
          ]);

          // Wait for patch to complete
          await new Promise((resolve) => setTimeout(resolve, 500));

          console.log("✅ Document cleaned successfully");
        } else {
          console.log("✅ No hidden characters found");
        }
      }

      // Now publish the document
      publish.execute();

      console.log("✅ Document published");
    } catch (err) {
      console.error("❌ Error cleaning document:", err);
      alert(`Failed to clean document: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsPublishing(false);

      // Call onComplete to finish the action
      if (onComplete) {
        onComplete();
      }
    }
  }, [id, draft, publish, patch, onComplete]);

  // Only apply to documents that might have hidden characters
  // (posts and products with portable text fields)
  if (type !== "post" && type !== "product" && type !== "digitalProduct") {
    return null;
  }

  // If the document is already published and there are no changes, don't show this action
  if (published && !draft) {
    return null;
  }

  return {
    label: isPublishing ? "Cleaning & Publishing..." : "Clean & Publish",
    icon: isPublishing ? SparklesIcon : PublishIcon,
    onHandle: handlePublish,
    disabled: Boolean(publish.disabled) || isPublishing,
    tone: "primary",
  };
};
