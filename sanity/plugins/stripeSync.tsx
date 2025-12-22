import { useCallback, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { SyncIcon, CheckmarkIcon, WarningOutlineIcon } from "@sanity/icons";

/**
 * Sanity document action to sync a product to Stripe
 * Adds a "Sync to Stripe" button in the document toolbar
 */
export const SyncToStripeAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props;
  const { patch } = useDocumentOperation(id, type);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError(null);
    setSuccess(false);

    try {
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
        throw new Error(data.error || "Failed to sync product");
      }

      setSuccess(true);

      // Show success message for 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      console.log("[Sanity] Product synced to Stripe:", data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sync product to Stripe";
      setError(errorMessage);
      console.error("[Sanity] Error syncing to Stripe:", err);

      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setSyncing(false);
    }
  }, [id]);

  // Only show for product and digitalProduct documents
  if (type !== "product" && type !== "digitalProduct") {
    return null;
  }

  return {
    label: syncing
      ? "Syncing to Stripe..."
      : success
      ? "Synced!"
      : "Sync to Stripe",
    icon: success ? CheckmarkIcon : error ? WarningOutlineIcon : SyncIcon,
    onHandle: handleSync,
    disabled: syncing,
    tone: error ? "critical" : success ? "positive" : "primary",
  };
};
