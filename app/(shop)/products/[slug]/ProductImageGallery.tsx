"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ProductImage";

type ProductImageGalleryProps = {
  images: { url: string; alt?: string }[];
  productName: string;
  category?: string;
};

export default function ProductImageGallery({ images, productName, category }: ProductImageGalleryProps) {
  const isApparel = category === "tshirts" || category === "hoodies";
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!isLightboxOpen) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isLightboxOpen]);

  if (!images || images.length === 0) return (
    <div className="relative aspect-square rounded-2xl overflow-hidden"><Image alt={productName} fill /></div>
  );

  return (
    <>
      <div className="space-y-4">
        {/* Main image - smaller for apparel */}
        <button
          type="button"
          aria-label={`Enlarge image of ${productName}`}
          className={`relative block w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 cursor-zoom-in group ${isApparel ? "aspect-[4/5] max-w-md mx-auto" : "aspect-square"}`}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].alt || productName}
            fill
            className="object-contain p-6 sm:p-8 transition-transform duration-300 group-hover:scale-[1.03]"
            priority
            sizes={isApparel ? "(max-width: 768px) 100vw, 448px" : "(max-width: 768px) 100vw, 50vw"}
            quality={85}
          />
          {/* Zoom icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-3 shadow-lg">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto p-1">
            {images.map((image, idx) => (
              <button
                key={image.url}
                type="button"
                aria-label={`View image ${idx + 1} of ${productName}`}
                aria-pressed={selectedImageIndex === idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative h-20 w-20 shrink-0 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden transition-all ${
                  selectedImageIndex === idx
                    ? "ring-2 ring-[#e31e24]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="80px"
                  quality={90}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <dialog
          ref={dialogRef}
          aria-label={`${productName} image gallery`}
          onClose={() => setIsLightboxOpen(false)}
          className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 z-50 bg-black/90 text-white open:flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute z-10 top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(selectedImageIndex - 1);
              }}
              className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Main lightbox image */}
          <div className="relative w-full max-w-5xl h-[80dvh]">
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].alt || productName}
              fill
              className="object-contain"
              sizes="90vw"
              quality={85}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Next button */}
          {selectedImageIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(selectedImageIndex + 1);
              }}
              className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </dialog>
      )}
    </>
  );
}
