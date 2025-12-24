import Stripe from "stripe";
import { sanityFetch } from "@/sanity/lib/fetch";
import { writeClient } from "@/sanity/lib/write-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export interface SanityProduct {
  _id: string;
  _type: "product" | "digitalProduct";
  name: string;
  description: any[];
  basePrice?: number;
  price?: number; // For digital products
  stripePriceId?: string;
  stripeProductId?: string;
  category?: string;
  isSubscription?: boolean; // For digital products
  subscriptionInterval?: "month" | "year"; // For digital products
  firstMonthPrice?: number; // For digital products with trial pricing
  images?: Array<{
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  }>;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  variants?: Array<{
    _key: string;
    sku: string;
    size?: string;
    color?: string;
    price?: number;
    stripePriceId?: string;
    inventory?: number;
  }>;
}

/**
 * Sync a Sanity product to Stripe
 * Creates or updates the product and price in Stripe
 * Returns the Stripe product ID and price ID
 */
export async function syncProductToStripe(sanityProductId: string) {
  try {
    // Fetch product from Sanity - support both product and digitalProduct types
    const product = await sanityFetch<SanityProduct | any>({
      query: `*[(_type == "product" || _type == "digitalProduct") && _id == $id][0]{
        _id,
        _type,
        name,
        description,
        basePrice,
        price,
        stripePriceId,
        stripeProductId,
        category,
        isSubscription,
        subscriptionInterval,
        firstMonthPrice,
        images[]{
          asset->{
            _ref,
            url
          },
          alt
        },
        image{
          asset->{
            _ref,
            url
          },
          alt
        },
        variants[]{
          _key,
          sku,
          size,
          color,
          price,
          stripePriceId,
          inventory
        }
      }`,
      params: { id: sanityProductId },
    });

    if (!product) {
      throw new Error(`Product not found: ${sanityProductId}`);
    }

    // Get the correct price field based on product type
    const productPrice = product.basePrice || product.price;
    if (!productPrice) {
      throw new Error(`Product ${product.name} has no price set`);
    }

    // Helper function to sanitize text for Stripe
    const sanitizeText = (
      text: string | undefined,
      maxLength: number
    ): string => {
      if (!text) return "";
      return text
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width spaces
        .replace(/[^\x20-\x7E\n\r]/g, "") // Remove non-printable characters (except newlines)
        .trim()
        .substring(0, maxLength);
    };

    // Sanitize product name (Stripe limit: 250 chars)
    const sanitizedName = sanitizeText(product.name, 250) || "Untitled Product";

    // Convert description to plain text for Stripe
    const rawDescription = product.description
      ?.map((block: any) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child: any) => child.text).join("");
        }
        return "";
      })
      .join("\n")
      .trim();

    // Sanitize description (Stripe limit: 5000 chars)
    const sanitizedDescription = sanitizeText(rawDescription, 5000);

    // Sanitize category for Stripe metadata (limit: 500 chars)
    const sanitizedCategory =
      sanitizeText(product.category || product._type, 500) || "product";

    let stripeProduct: Stripe.Product;

    // Check if product already exists in Stripe
    if (product.stripeProductId) {
      try {
        // Update existing product
        stripeProduct = await stripe.products.update(product.stripeProductId, {
          name: sanitizedName,
          description: sanitizedDescription || undefined,
          metadata: {
            sanityId: product._id,
            category: sanitizedCategory,
          },
        });
        console.log(`[Stripe Sync] Updated product: ${stripeProduct.id}`);
      } catch (error) {
        // Product doesn't exist, create new one
        console.log(
          `[Stripe Sync] Product ${product.stripeProductId} not found, creating new one`
        );
        stripeProduct = await createStripeProduct(
          sanitizedName,
          sanitizedDescription,
          product._id,
          sanitizedCategory
        );
      }
    } else {
      // Create new product
      stripeProduct = await createStripeProduct(
        sanitizedName,
        sanitizedDescription,
        product._id,
        sanitizedCategory
      );
    }

    // Create or update the default price
    let stripePrice: Stripe.Price;
    const isSubscription = product.isSubscription || false;
    const subscriptionInterval = product.subscriptionInterval || "month";

    if (product.stripePriceId) {
      try {
        // Check if price exists
        stripePrice = await stripe.prices.retrieve(product.stripePriceId);

        // Check if price needs updating (amount changed OR subscription settings changed)
        const priceAmountChanged = stripePrice.unit_amount !== productPrice * 100;
        const subscriptionChanged =
          isSubscription !== !!stripePrice.recurring ||
          (isSubscription &&
            stripePrice.recurring?.interval !== subscriptionInterval);

        if (priceAmountChanged || subscriptionChanged) {
          console.log(
            `[Stripe Sync] Price or subscription settings changed, creating new price for ${product.name}`
          );
          stripePrice = await createStripePrice(
            stripeProduct.id,
            productPrice,
            isSubscription,
            subscriptionInterval
          );
        }
      } catch (error) {
        // Price doesn't exist, create new one
        stripePrice = await createStripePrice(
          stripeProduct.id,
          productPrice,
          isSubscription,
          subscriptionInterval
        );
      }
    } else {
      // Create new price
      stripePrice = await createStripePrice(
        stripeProduct.id,
        productPrice,
        isSubscription,
        subscriptionInterval
      );
    }

    // Sync variants if they exist
    const variantUpdates: Record<string, string> = {};
    if (product.variants && product.variants.length > 0) {
      console.log(
        `[Stripe Sync] Syncing ${product.variants.length} variants...`
      );

      for (const variant of product.variants) {
        const variantPrice = await syncVariantToStripe(
          stripeProduct.id,
          variant,
          productPrice
        );

        // Store the mapping of variant key to Stripe price ID
        if (variant._key) {
          variantUpdates[`variants[_key=="${variant._key}"].stripePriceId`] =
            variantPrice.id;
        }
      }
    }

    // Update Sanity with Stripe IDs
    // Remove 'drafts.' prefix if present to update the published document
    const publishedId = product._id.replace(/^drafts\./, '');

    console.log(`[Stripe Sync] Updating Sanity document: ${publishedId}`);

    const patchOperation = writeClient.patch(publishedId).set({
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });

    // Add variant updates if any
    if (Object.keys(variantUpdates).length > 0) {
      patchOperation.set(variantUpdates);
    }

    try {
      await patchOperation.commit();
      console.log(
        `[Stripe Sync] ✓ Successfully updated Sanity with Stripe IDs`
      );
    } catch (writeError) {
      console.error(`[Stripe Sync] ❌ Failed to update Sanity:`, writeError);
      throw new Error(`Stripe sync succeeded but Sanity update failed: ${writeError instanceof Error ? writeError.message : 'Unknown error'}`);
    }

    console.log(
      `[Stripe Sync] Successfully synced product: ${product.name} (${stripeProduct.id})`
    );

    return {
      success: true,
      productId: stripeProduct.id,
      priceId: stripePrice.id,
      productName: product.name,
      variantCount: product.variants?.length || 0,
    };
  } catch (error) {
    console.error("[Stripe Sync] Error syncing product:", error);
    throw error;
  }
}

/**
 * Create a new Stripe product
 */
async function createStripeProduct(
  name: string,
  description: string,
  sanityId: string,
  category: string
): Promise<Stripe.Product> {
  const stripeProduct = await stripe.products.create({
    name: name,
    description: description || undefined,
    metadata: {
      sanityId: sanityId,
      category: category,
    },
  });

  console.log(`[Stripe Sync] Created product: ${stripeProduct.id}`);
  return stripeProduct;
}

/**
 * Create a new Stripe price
 */
async function createStripePrice(
  productId: string,
  price: number,
  isSubscription?: boolean,
  subscriptionInterval?: "month" | "year"
): Promise<Stripe.Price> {
  const priceData: Stripe.PriceCreateParams = {
    product: productId,
    unit_amount: Math.round(price * 100), // Convert to cents
    currency: "usd",
  };

  // Add recurring billing for subscriptions
  if (isSubscription) {
    priceData.recurring = {
      interval: subscriptionInterval || "month",
    };
  }

  const stripePrice = await stripe.prices.create(priceData);

  console.log(
    `[Stripe Sync] Created ${isSubscription ? "subscription" : "one-time"} price: ${stripePrice.id}`
  );
  return stripePrice;
}

/**
 * Sync a product variant to Stripe
 * Creates or updates a Stripe Price for the variant with metadata
 */
async function syncVariantToStripe(
  stripeProductId: string,
  variant: SanityProduct["variants"][number],
  basePrice: number
): Promise<Stripe.Price> {
  // Use variant price if available, otherwise use base price
  const variantPrice = variant.price || basePrice;

  // Helper function to sanitize metadata values (Stripe limit: 500 chars)
  const sanitizeMetadata = (text: string | undefined): string => {
    if (!text) return "";
    return text
      .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width spaces
      .replace(/[^\x20-\x7E]/g, "") // Remove non-printable characters
      .trim()
      .substring(0, 500);
  };

  // Build metadata for the variant with sanitized values
  const metadata: Record<string, string> = {
    sku: sanitizeMetadata(variant.sku) || "unknown",
  };
  if (variant.size) metadata.size = sanitizeMetadata(variant.size);
  if (variant.color) metadata.color = sanitizeMetadata(variant.color);

  let stripePrice: Stripe.Price;

  // Check if variant already has a Stripe price
  if (variant.stripePriceId) {
    try {
      // Check if price exists
      stripePrice = await stripe.prices.retrieve(variant.stripePriceId);

      // If price amount changed, create new price (prices are immutable)
      if (stripePrice.unit_amount !== variantPrice * 100) {
        console.log(
          `[Stripe Sync] Variant ${variant.sku} price changed, creating new price`
        );
        stripePrice = await stripe.prices.create({
          product: stripeProductId,
          unit_amount: Math.round(variantPrice * 100),
          currency: "usd",
          metadata,
        });
        console.log(
          `[Stripe Sync] Created variant price: ${stripePrice.id} for ${variant.sku}`
        );
      } else {
        // Price unchanged, but update metadata if needed
        const needsMetadataUpdate =
          stripePrice.metadata.sku !== variant.sku ||
          stripePrice.metadata.size !== (variant.size || "") ||
          stripePrice.metadata.color !== (variant.color || "");

        if (needsMetadataUpdate) {
          stripePrice = await stripe.prices.update(variant.stripePriceId, {
            metadata,
          });
          console.log(
            `[Stripe Sync] Updated variant metadata: ${stripePrice.id} for ${variant.sku}`
          );
        }
      }
    } catch (error) {
      // Price doesn't exist, create new one
      console.log(
        `[Stripe Sync] Variant price ${variant.stripePriceId} not found, creating new one`
      );
      stripePrice = await stripe.prices.create({
        product: stripeProductId,
        unit_amount: Math.round(variantPrice * 100),
        currency: "usd",
        metadata,
      });
      console.log(
        `[Stripe Sync] Created variant price: ${stripePrice.id} for ${variant.sku}`
      );
    }
  } else {
    // Create new price for variant
    stripePrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: Math.round(variantPrice * 100),
      currency: "usd",
      metadata,
    });
    console.log(
      `[Stripe Sync] Created variant price: ${stripePrice.id} for ${variant.sku}`
    );
  }

  return stripePrice;
}
