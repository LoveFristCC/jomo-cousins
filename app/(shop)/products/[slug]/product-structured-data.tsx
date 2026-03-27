import { urlForImage } from "@/sanity/lib/utils";

interface ProductReview {
  reviewerName?: string;
  rating?: number;
  reviewText?: string;
}

interface ProductStructuredDataProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description?: any;
    category: string;
    images?: Array<{ alt?: string; asset?: any }>;
    basePrice: number;
    isbn?: string;
    author?: string;
    publisher?: string;
    publicationDate?: string;
    pageCount?: number;
    excerpt?: string;
    reviews?: ProductReview[];
  };
}

/**
 * Generates structured data (JSON-LD) for product pages
 * Includes Product schema and Book schema for books
 */
export default function ProductStructuredData({
  product,
}: ProductStructuredDataProps) {
  const baseUrl = "https://www.jomocousins.com";
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.images?.[ 0 ]
    ? urlForImage(product.images[ 0 ])?.width(1200).height(1200).url()
    : `${baseUrl}/images/og-image.jpg`;

  // Extract plain text description with fallback
  const description =
    typeof product.description === "string"
      ? product.description
      : product.description?.[ 0 ]?.children?.[ 0 ]?.text ||
      product.excerpt ||
      `${product.name} by Dr. Jomo Cousins. Shop now at jomocousins.com`;

  // Shipping details (US shipping)
  const shippingDetails = {
    "@type": "OfferShippingDetails",
    "@id": `${baseUrl}#shipping`,
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "5.00",
      currency: "USD",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "US",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 3,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 3,
        maxValue: 7,
        unitCode: "DAY",
      },
    },
  };

  // Return policy - All sales final (except defective/damaged items within 7 days)
  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    "@id": `${baseUrl}#returnpolicy`,
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  };

  // Build reviews array for structured data (filter out incomplete reviews)
  const reviews = product.reviews?.filter(
    (r): r is ProductReview & { reviewerName: string; rating: number } =>
      !!r.reviewerName && !!r.rating
  );
  const hasReviews = reviews && reviews.length > 0;

  // Calculate aggregate rating
  const aggregateRating = hasReviews
    ? {
      "@type": "AggregateRating",
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
    }
    : undefined;

  // Build individual review schemas
  const reviewSchemas = hasReviews
    ? reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: review.reviewerName,
      },
      ...(review.reviewText && { reviewBody: review.reviewText }),
    }))
    : undefined;

  // Base Product schema
  const productSchema = {
    "@type": "Product",
    "@id": productUrl,
    name: product.name,
    description: description,
    image: imageUrl,
    url: productUrl,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: "Dr. Jomo Cousins",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "USD",
      price: product.basePrice.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Person",
        name: "Dr. Jomo Cousins",
      },
      shippingDetails: { "@id": `${baseUrl}#shipping` },
      hasMerchantReturnPolicy: { "@id": `${baseUrl}#returnpolicy` },
    },
    ...(aggregateRating && { aggregateRating }),
    ...(reviewSchemas && { review: reviewSchemas }),
  };

  // For books, use Book schema instead - only check category
  const isBook =
    product.category?.toLowerCase() === "books" ||
    product.category?.toLowerCase() === "book";

  const bookSchema = isBook
    ? {
      "@type": "Book",
      "@id": productUrl,
      name: product.name,
      description: product.excerpt || description,
      image: imageUrl,
      url: productUrl,
      sku: product.slug,
      author: {
        "@type": "Person",
        name: product.author || "Dr. Jomo Cousins",
        url: baseUrl,
      },
      ...(product.isbn && { isbn: product.isbn, gtin13: product.isbn.replace(/-/g, "") }),
      ...(product.publisher && {
        publisher: {
          "@type": "Organization",
          name: product.publisher,
        },
      }),
      ...(product.publicationDate && {
        datePublished: product.publicationDate,
      }),
      ...(product.pageCount && { numberOfPages: product.pageCount }),
      bookFormat: "https://schema.org/Paperback",
      inLanguage: "en-US",
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "USD",
        price: product.basePrice.toFixed(2),
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Person",
          name: "Dr. Jomo Cousins",
        },
        shippingDetails: { "@id": `${baseUrl}#shipping` },
        hasMerchantReturnPolicy: { "@id": `${baseUrl}#returnpolicy` },
      },
    }
    : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${productUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  // Combine all schemas
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      bookSchema || productSchema,
      breadcrumbSchema,
      shippingDetails,
      returnPolicy,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } }
    />
  );
}
