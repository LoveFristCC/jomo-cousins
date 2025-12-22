import { useCallback, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { SparklesIcon } from "@sanity/icons";
import { cleanDocument } from "@/sanity/lib/cleanHiddenCharacters";

/**
 * Manual action to clean hidden Unicode characters from a document
 * This can be used to clean existing documents without publishing
 */
export const CleanDocumentAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const { patch } = useDocumentOperation(id, type);
  const [isCleaning, setIsCleaning] = useState(false);

  const handleClean = useCallback(async () => {
    setIsCleaning(true);

    try {
      // Use the draft if it exists, otherwise use the published version
      const docToClean = draft || published;

      if (!docToClean) {
        alert("No document to clean");
        return;
      }

      console.log("🧹 Cleaning document:", id);

      // Clean the document
      const cleanedDoc = cleanDocument(docToClean);

      // Check if anything was actually cleaned
      const hasChanges = JSON.stringify(docToClean) !== JSON.stringify(cleanedDoc);

      if (!hasChanges) {
        alert("✅ No hidden characters found. Document is already clean!");
        return;
      }

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
      alert("✅ Document cleaned! Hidden characters have been removed.");
    } catch (err) {
      console.error("❌ Error cleaning document:", err);
      alert(`Failed to clean document: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsCleaning(false);

      // Call onComplete to finish the action
      if (onComplete) {
        onComplete();
      }
    }
  }, [id, draft, published, patch, onComplete]);

  // Only apply to documents that might have hidden characters
  if (type !== "post" && type !== "product" && type !== "digitalProduct") {
    return null;
  }

  return {
    label: isCleaning ? "Cleaning..." : "Clean Hidden Characters",
    icon: SparklesIcon,
    onHandle: handleClean,
    disabled: isCleaning,
    tone: "positive",
  };
};
