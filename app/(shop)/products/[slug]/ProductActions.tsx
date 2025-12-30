"use client";

import { useState } from "react";
import type { ProductBySlugQueryResult, ProductVariant } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";

interface ProductActionsProps {
  product: ProductBySlugQueryResult;
}

/**
 * Client component for variant selection and add to cart
 * Handles size/color selection and checkout initiation
 */
export default function ProductActions({ product }: ProductActionsProps) {
  // Helper to remove hidden unicode characters
  const sanitize = (text: string | undefined | null): string => {
    if (!text) return '';
    return text
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .replace(/[^\x20-\x7E]/g, '') // Remove non-printable characters
      .trim();
  };

  const [ selectedVariant, setSelectedVariant ] = useState<ProductVariant | null>(
    product.variants?.[ 0 ] || null
  );
  const [ quantity, setQuantity ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  // Get unique sizes and colors from variants (sanitized)
  const sizes = product.variants
    ? Array.from(new Set(product.variants.map((v) => sanitize(v.size)).filter(Boolean)))
    : [];

  // Get unique colors by color name (not object reference, sanitized)
  const colors = product.variants
    ? Array.from(
      product.variants.reduce((map, v) => {
        const cleanColor = sanitize(v.color);
        const cleanHex = sanitize(v.colorHex);
        if (cleanColor && !map.has(cleanColor)) {
          map.set(cleanColor, { color: cleanColor, hex: cleanHex || null });
        }
        return map;
      }, new Map<string, { color: string; hex?: string | null }>())
    ).map(([ _, value ]) => value)
    : [];

  // Get the currently selected size and color (sanitized)
  const selectedSize = sanitize(selectedVariant?.size);
  const selectedColor = sanitize(selectedVariant?.color);

  // Handle size selection
  const handleSizeSelect = (size: string | undefined) => {
    if (!size) return;
    const variant = product.variants?.find(
      (v) => sanitize(v.size) === sanitize(size) && (!selectedColor || sanitize(v.color) === sanitize(selectedColor))
    );
    if (variant) {
      setSelectedVariant(variant);
      setError(null);
    }
  };

  // Handle color selection
  const handleColorSelect = (color: string | undefined) => {
    if (!color) return;
    const variant = product.variants?.find(
      (v) => sanitize(v.color) === sanitize(color) && (!selectedSize || sanitize(v.size) === sanitize(selectedSize))
    );
    if (variant) {
      setSelectedVariant(variant);
      setError(null);
    }
  };

  // Check if variant is available
  const isVariantAvailable = (variant: ProductVariant) => {
    if (!product.trackInventory) return true;
    return (variant.inventory || 0) > 0 || variant.allowBackorder;
  };

  // Get stock status message
  const getStockStatus = () => {
    if (!selectedVariant || !product.trackInventory) return null;

    const inventory = selectedVariant.inventory || 0;
    const threshold = product.lowStockThreshold || 5;

    if (inventory === 0 && !selectedVariant.allowBackorder) {
      return {
        message: "Out of Stock",
        className: "text-red-600 font-semibold",
      };
    }

    if (inventory <= threshold) {
      return {
        message: `Only ${inventory} left in stock!`,
        className: "text-yellow-600 font-semibold",
      };
    }

    return {
      message: `In Stock (${inventory} available)`,
      className: "text-green-600 font-semibold",
    };
  };

  // Handle checkout
  const handleBuyNow = async () => {
    if (!selectedVariant) {
      setError("Please select a variant");
      return;
    }

    if (
      product.trackInventory &&
      (selectedVariant.inventory || 0) < quantity &&
      !selectedVariant.allowBackorder
    ) {
      setError("Not enough stock available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call the create-checkout API route
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantSku: selectedVariant.sku,
          quantity,
          productName: product.name || 'Product',
          price: product.basePrice || 0,
          size: selectedVariant.size,
          color: selectedVariant.color,
          weight: product.weight || 0,
          productType: "physical", // Explicitly set as physical product
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const stockStatus = getStockStatus();
  const canPurchase = selectedVariant && isVariantAvailable(selectedVariant);

  return (
    <div className="space-y-6 bg-gray-50 rounded-2xl p-6 md:p-8">
      {/* Size selector */ }
      { sizes.length > 0 && (
        <div>
          <label className="block text-base font-bold mb-4 text-[#2d2d2d]">
            Size { selectedSize && <span className="font-normal text-gray-600">: { selectedSize }</span> }
          </label>
          <div className="flex flex-wrap gap-3">
            { sizes.map((size) => {
              const variant = product.variants?.find(
                (v) =>
                  sanitize(v.size) === sanitize(size) && (!selectedColor || sanitize(v.color) === sanitize(selectedColor))
              );
              const available = variant ? isVariantAvailable(variant) : false;

              return (
                <button
                  key={ size }
                  onClick={ () => handleSizeSelect(size!) }
                  disabled={ !available }
                  className={ `px-5 py-3 rounded-lg border-2 font-semibold transition-all ${selectedSize === size
                    ? "border-[#e31e24] bg-[#e31e24] text-white shadow-md scale-105"
                    : available
                      ? "border-[#2d2d2d] text-[#2d2d2d] hover:border-[#e31e24] hover:bg-[#e31e24] hover:text-white"
                      : "border-gray-300 text-gray-400 line-through cursor-not-allowed bg-gray-200"
                    }` }
                >
                  { size }
                </button>
              );
            }) }
          </div>
        </div>
      ) }

      {/* Color selector */ }
      { colors.length > 0 && (
        <div>
          <label className="block text-base font-bold mb-4 text-[#2d2d2d]">
            Color{ " " }
            { selectedColor && <span className="font-normal text-gray-600">: { selectedColor }</span> }
          </label>
          <div className="flex flex-wrap gap-4">
            { colors.map(({ color, hex }) => {
              if (!color) return null;

              const variant = product.variants?.find(
                (v) => {
                  const colorMatch = sanitize(v.color) === sanitize(color);
                  const sizeMatch = !selectedSize || sanitize(v.size) === sanitize(selectedSize);
                  return colorMatch && sizeMatch;
                }
              );
              const available = variant ? isVariantAvailable(variant) : false;

              return (
                <button
                  key={ color }
                  onClick={ () => handleColorSelect(color) }
                  disabled={ !available }
                  className={ `relative w-14 h-14 rounded-full border-3 transition-all shadow-md ${selectedColor === color
                    ? "border-[#e31e24] scale-110 ring-2 ring-[#e31e24] ring-offset-2"
                    : available
                      ? "border-gray-300 hover:border-[#2d2d2d] hover:scale-105"
                      : "border-gray-200 opacity-40 cursor-not-allowed"
                    }` }
                  title={ color }
                  style={ {
                    backgroundColor: hex || "#ccc",
                  } }
                >
                  { selectedColor === color && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold drop-shadow-lg">
                      ✓
                    </span>
                  ) }
                  { !available && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-400 rotate-45" />
                    </span>
                  ) }
                </button>
              );
            }) }
          </div>
        </div>
      ) }

      {/* Variant image (if available) */ }
      { selectedVariant?.image && (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
          <Image
            src={
              urlForImage(selectedVariant.image)?.width(200).height(200).url() || ""
            }
            alt={ selectedVariant.image.alt || "Variant image" }
            fill
            className="object-cover"
          />
        </div>
      ) }

      {/* Stock status */ }
      { stockStatus && (
        <div className={ `px-4 py-3 rounded-lg font-semibold ${stockStatus.className} ${stockStatus.message.includes("Out")
          ? "bg-red-50 border border-red-200"
          : stockStatus.message.includes("Low")
            ? "bg-yellow-50 border border-yellow-200"
            : "bg-green-50 border border-green-200"
          }` }>
          { stockStatus.message }
        </div>
      ) }

      {/* Quantity selector */ }
      <div className="flex flex-col items-center justify-center">
        <label className="block text-base font-bold mb-4 text-[#2d2d2d]">
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <button
            onClick={ () => setQuantity(Math.max(1, quantity - 1)) }
            className="w-12 h-12 rounded-lg border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold hover:bg-[#2d2d2d] hover:text-white transition-all"
          >
            −
          </button>

          <span className="text-2xl font-bold w-16 text-center text-[#2d2d2d]">
            { quantity }
          </span>

          <button
            onClick={ () => setQuantity(quantity + 1) }
            disabled={
              product.trackInventory &&
              selectedVariant &&
              quantity >= (selectedVariant.inventory || 0) &&
              !selectedVariant.allowBackorder
            }
            className="w-12 h-12 rounded-lg border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold hover:bg-[#2d2d2d] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>


      {/* Error message */ }
      { error && (
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 font-semibold">
          { error }
        </div>
      ) }

      {/* Buy Now button */ }
      <button
        onClick={ handleBuyNow }
        disabled={ !canPurchase || isLoading }
        className="w-full py-5 bg-[#e31e24] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#c41a1f] hover:scale-105 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        { isLoading
          ? "Processing..."
          : !canPurchase
            ? "Out of Stock"
            : `Buy Now - $${((product.basePrice || 0) * quantity).toFixed(2)}` }
      </button>

      {/* SKU display */ }
      { selectedVariant && (
        <div className="text-sm text-gray-600 pt-4 border-t border-gray-200">
          <span className="font-semibold text-[#2d2d2d]">SKU:</span> { selectedVariant.sku }
        </div>
      ) }
    </div>
  );
}
