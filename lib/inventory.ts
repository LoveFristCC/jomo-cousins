import { createClient } from "@sanity/client";
import { InventoryUpdateResult, LowStockAlert } from "./types";

// Helper to sanitize SKUs (remove hidden unicode characters)
function sanitizeSku(sku: string | undefined): string {
  if (!sku) return "";
  return sku
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width spaces
    .replace(/[^\x20-\x7E]/g, "") // Remove non-printable characters
    .trim();
}

// Server-side client with write token for inventory updates
const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false, // Don't use CDN for writes
});

/**
 * Decrements inventory for a specific product variant by SKU
 * Uses Sanity's PATCH API to atomically update inventory
 */
export async function decrementInventory(
  sku: string,
  quantity: number
): Promise<InventoryUpdateResult> {
  try {
    console.log(
      `[Inventory] Attempting to decrement ${quantity} units for SKU: ${sku}`
    );

    // Find the product containing this variant SKU
    const product = await sanityWriteClient.fetch(
      `*[_type == "product" && variants[].sku == $sku][0]{
        _id,
        name,
        trackInventory,
        lowStockThreshold,
        variants
      }`,
      { sku }
    );

    if (!product) {
      console.error(`[Inventory] Product not found for SKU: ${sku}`);
      return {
        success: false,
        error: "Product not found",
        sku,
      };
    }

    if (!product.trackInventory) {
      console.log(
        `[Inventory] Inventory tracking disabled for product: ${product.name}`
      );
      return {
        success: true,
        sku,
        newInventory: -1, // -1 indicates tracking is disabled
      };
    }

    // Find the variant index (with sanitization)
    const variantIndex = product.variants.findIndex(
      (v: any) => sanitizeSku(v.sku) === sanitizeSku(sku)
    );

    if (variantIndex === -1) {
      console.error(`[Inventory] Variant not found with SKU: ${sku}`);
      return {
        success: false,
        error: "Variant not found",
        sku,
      };
    }

    const currentInventory = product.variants[variantIndex].inventory;
    const newInventory = Math.max(0, currentInventory - quantity);

    console.log(
      `[Inventory] Current: ${currentInventory}, Decrementing: ${quantity}, New: ${newInventory}`
    );

    // Use PATCH to atomically update the inventory
    await sanityWriteClient
      .patch(product._id)
      .set({
        [`variants[${variantIndex}].inventory`]: newInventory,
      })
      .commit();

    console.log(`[Inventory] ✓ Successfully updated inventory for SKU: ${sku}`);

    return {
      success: true,
      newInventory,
      sku,
    };
  } catch (error) {
    console.error(
      `[Inventory] Error decrementing inventory for SKU ${sku}:`,
      error
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      sku,
    };
  }
}

/**
 * Checks if product inventory is low and returns alert data
 */
export async function checkLowStock(
  sku: string
): Promise<LowStockAlert | null> {
  console.log("🚀 ~ sku:", sku);
  try {
    const product = await sanityWriteClient.fetch(
      `*[
    _type == "product" &&
    count(variants[sku == $sku]) > 0][0]{
    _id,
    name,
    lowStockThreshold,
    "variant": variants[sku == $sku][0]
  }`,
      { sku }
    );

    if (!product) {
      return null;
    }

    const variant = product.variant.find(
      (v: any) => sanitizeSku(v.sku) === sanitizeSku(sku)
    );

    if (!variant) {
      return null;
    }

    if (variant.inventory <= product.lowStockThreshold) {
      return {
        sku,
        productName: product.name,
        currentInventory: variant.inventory,
        threshold: product.lowStockThreshold,
        productId: product._id,
      };
    }

    return null;
  } catch (error) {
    console.error(
      `[Inventory] Error checking low stock for SKU ${sku}:`,
      error
    );
    return null;
  }
}

/**
 * Sends a low stock alert email
 * Uses Gmail SMTP configured in environment variables
 */
export async function sendLowStockAlert(
  alertData: LowStockAlert
): Promise<boolean> {
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_EMAIL_PASSWORD,
      },
    });

    const studioUrl = `${process.env.NEXT_PUBLIC_URL}/studio/desk/product;${alertData.productId}`;

    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: process.env.GOOGLE_EMAIL, // Send to yourself
      subject: `🟡 Low Stock Alert: ${alertData.productName} (SKU: ${alertData.sku})`,
      html: `
        <h2>Low Stock Alert</h2>
        <p><strong>Product:</strong> ${alertData.productName}</p>
        <p><strong>SKU:</strong> ${alertData.sku}</p>
        <p><strong>Current Inventory:</strong> ${alertData.currentInventory} units</p>
        <p><strong>Low Stock Threshold:</strong> ${alertData.threshold} units</p>
        <p><a href="${studioUrl}">View in Sanity Studio</a></p>
        <p><em>This is an automated alert from your e-commerce system.</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Inventory] ✓ Low stock alert sent for SKU: ${alertData.sku}`);
    return true;
  } catch (error) {
    console.error(`[Inventory] Error sending low stock alert:`, error);
    return false;
  }
}

/**
 * Reserve inventory for a pending order
 * Useful for holding inventory during checkout
 */
export async function reserveInventory(
  sku: string,
  quantity: number
): Promise<InventoryUpdateResult> {
  try {
    console.log(`[Inventory] Reserving ${quantity} units for SKU: ${sku}`);

    const product = await sanityWriteClient.fetch(
      `*[_type == "product" && variants[].sku == $sku][0]{
        _id,
        name,
        variants
      }`,
      { sku }
    );

    if (!product) {
      return {
        success: false,
        error: "Product not found",
        sku,
      };
    }

    const variantIndex = product.variants.findIndex(
      (v: any) => sanitizeSku(v.sku) === sanitizeSku(sku)
    );

    if (variantIndex === -1) {
      return {
        success: false,
        error: "Variant not found",
        sku,
      };
    }

    const currentReserved =
      product.variants[variantIndex].reservedInventory || 0;
    const newReserved = currentReserved + quantity;

    await sanityWriteClient
      .patch(product._id)
      .set({
        [`variants[${variantIndex}].reservedInventory`]: newReserved,
      })
      .commit();

    console.log(`[Inventory] ✓ Reserved inventory for SKU: ${sku}`);

    return {
      success: true,
      newInventory: newReserved,
      sku,
    };
  } catch (error) {
    console.error(`[Inventory] Error reserving inventory:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      sku,
    };
  }
}

/**
 * Check if variant has sufficient inventory
 */
export async function checkInventoryAvailability(
  sku: string,
  quantity: number
): Promise<{
  available: boolean;
  currentInventory: number;
  allowBackorder: boolean;
}> {
  try {
    // Fetch all products and filter with sanitization (GROQ can't sanitize)
    const products = await sanityWriteClient.fetch(
      `*[_type == "product" && defined(variants)]{
        _id,
        trackInventory,
        variants
      }`
    );

    // Find product with matching variant SKU (using sanitization)
    const product = products.find((p: any) =>
      p.variants?.some((v: any) => sanitizeSku(v.sku) === sanitizeSku(sku))
    );

    if (!product) {
      console.error(`[Inventory] Product not found for SKU: ${sku}`);
      return { available: false, currentInventory: 0, allowBackorder: false };
    }

    const variant = product.variants.find(
      (v: any) => sanitizeSku(v.sku) === sanitizeSku(sku)
    );

    if (!variant) {
      return { available: false, currentInventory: 0, allowBackorder: false };
    }

    if (!product.trackInventory) {
      return { available: true, currentInventory: -1, allowBackorder: false };
    }

    const available = variant.inventory >= quantity || variant.allowBackorder;

    return {
      available,
      currentInventory: variant.inventory,
      allowBackorder: variant.allowBackorder || false,
    };
  } catch (error) {
    console.error(`[Inventory] Error checking availability:`, error);
    return { available: false, currentInventory: 0, allowBackorder: false };
  }
}
