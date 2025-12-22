import { useCallback, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { CheckmarkIcon, PublishIcon } from "@sanity/icons";

/**
 * Automatically sync product to Stripe after publishing
 * This wraps the default publish action
 */
export const AutoStripeSyncAction: DocumentActionComponent = (props) => {
  const { id, type, published, draft, onComplete } = props;
  const { publish } = useDocumentOperation(id, type);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);

    try {
      // First, publish the document
      publish.execute();

      // Wait for publish to complete (increased timeout)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Then sync to Stripe
      console.log(`[Auto Sync] Syncing ${id} to Stripe after publish`);

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
        console.error("[Auto Sync] Failed to sync to Stripe:", data.error);
        alert(`Published successfully, but Stripe sync failed: ${data.error}`);
      } else {
        console.log("[Auto Sync] Successfully synced to Stripe:", data);
      }
    } catch (err) {
      console.error("[Auto Sync] Error syncing to Stripe:", err);
      alert(`Published successfully, but Stripe sync failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsPublishing(false);

      // Call onComplete to finish the action
      if (onComplete) {
        onComplete();
      }
    }
  }, [id, publish, onComplete]);

  // Only show for product and digitalProduct documents
  if (type !== "product" && type !== "digitalProduct") {
    return null;
  }

  // If the document is already published and there are no changes, don't show this action
  if (published && !draft) {
    return null;
  }

  return {
    label: isPublishing ? "Publishing & Syncing..." : "Publish & Sync to Stripe",
    icon: isPublishing ? CheckmarkIcon : PublishIcon,
    onHandle: handlePublish,
    disabled: Boolean(publish.disabled) || isPublishing,
    tone: "primary",
  };
};
