import { useCallback, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { SparklesIcon, PublishIcon, CheckmarkIcon } from "@sanity/icons";
import { cleanDocument } from "@/sanity/lib/cleanHiddenCharacters";

/**
 * Complete workflow action: Clean → Sync to Stripe → Publish
 * This combines cleaning hidden characters, syncing to Stripe, and publishing
 */
export const CleanSyncPublishAction: DocumentActionComponent = (props) => {
  const { id, type, published, draft, onComplete } = props;
  const { publish, patch } = useDocumentOperation(id, type);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "cleaning" | "syncing" | "publishing" | null
  >(null);

  const handleCleanSyncPublish = useCallback(async () => {
    setIsProcessing(true);

    try {
      // Step 1: Clean the document
      setCurrentStep("cleaning");
      if (draft) {
        console.log("🧹 Step 1/3: Cleaning document:", id);

        const cleanedDoc = cleanDocument(draft);
        const hasChanges = JSON.stringify(draft) !== JSON.stringify(cleanedDoc);

        if (hasChanges) {
          console.log("🧹 Found hidden characters, cleaning...");

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

      // Step 2: Sync to Stripe
      setCurrentStep("syncing");
      console.log("🔄 Step 2/3: Syncing to Stripe:", id);

      const response = await fetch("/api/sync-product-to-stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sync to Stripe");
      }

      console.log("✅ Synced to Stripe successfully");

      // Wait a moment for Stripe sync to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 3: Publish
      setCurrentStep("publishing");
      console.log("📤 Step 3/3: Publishing document:", id);

      publish.execute();

      console.log("✅ All steps completed successfully!");
    } catch (err) {
      console.error("❌ Error in clean, sync & publish workflow:", err);
      alert(
        `Failed during ${currentStep}: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);

      // Call onComplete to finish the action
      if (onComplete) {
        onComplete();
      }
    }
  }, [id, draft, publish, patch, onComplete, currentStep]);

  // Only show for product and digitalProduct documents
  if (type !== "product" && type !== "digitalProduct") {
    return null;
  }

  // If the document is already published and there are no changes, don't show this action
  if (published && !draft) {
    return null;
  }

  // Dynamic label based on current step
  let label = "Clean, Sync & Publish";
  if (isProcessing) {
    if (currentStep === "cleaning") {
      label = "Cleaning...";
    } else if (currentStep === "syncing") {
      label = "Syncing to Stripe...";
    } else if (currentStep === "publishing") {
      label = "Publishing...";
    }
  }

  return {
    label,
    icon: isProcessing ? SparklesIcon : PublishIcon,
    onHandle: handleCleanSyncPublish,
    disabled: Boolean(publish.disabled) || isProcessing,
    tone: "primary",
  };
};
