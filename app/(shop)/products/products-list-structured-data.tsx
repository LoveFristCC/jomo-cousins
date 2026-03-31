import { urlForImage } from "@/sanity/lib/utils";
import type { AllProductsQueryResult } from "@/sanity.types";

interface ProductReview {
  reviewerName?: string;
  rating?: number;
  reviewText?: string;
}

interface ProductsListStructuredDataProps {
  products: AllProductsQueryResult;
}

/**
 * Generates structured data (JSON-LD) for the products listing page
 * Uses multiple script tags - one per product - to avoid truncation issues
 */
export default function ProductsListStructuredData({
  products,
}: ProductsListStructuredDataProps) {
  const baseUrl = "https://www.jomocousins.com";

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/products#breadcrumb`,
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
    ],
  };

  // Collection page schema
  const collectionPageSchema = {
    "@type": "CollectionPage",
    "@id": `${baseUrl}/products`,
    url: `${baseUrl}/products`,
    name: "Shop Dr. Jomo Cousins Books & Products",
    description:
      "Browse books, apparel, and inspirational products by Dr. Jomo Cousins. Resources for growth, faith, and transformation.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    },
  };

  // Page-level structured data (includes shipping/return policy for all products to reference)
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      collectionPageSchema,
      breadcrumbSchema,
      getShippingDetails(baseUrl),
      getReturnPolicy(baseUrl),
    ],
  };

  return (
    <>
      {/* Page-level schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
      />

      {/* Individual product schemas */}
      {products.map((product) => (
        <ProductSchema key={product._id} product={product} baseUrl={baseUrl} />
      ))}
    </>
  );
}

// Shared shipping details schema
function getShippingDetails(baseUrl: string) {
  return {
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
}

// Shared return policy schema
function getReturnPolicy(baseUrl: string) {
  return {
    "@type": "MerchantReturnPolicy",
    "@id": `${baseUrl}#returnpolicy`,
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  };
}

/**
 * Individual product schema component
 */
function ProductSchema({
  product,
  baseUrl,
}: {
  product: AllProductsQueryResult[number];
  baseUrl: string;
}) {
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.images?.[0]
    ? urlForImage(product.images[0])?.width(1200).height(1200).url()
    : `${baseUrl}/images/og-image.jpg`;

  // Extract plain text description
  const description =
    typeof product.description === "string"
      ? product.description
      : (product.description as any)?.[0]?.children?.[0]?.text ||
        product.excerpt ||
        `${product.name} by Dr. Jomo Cousins. Shop now at jomocousins.com`;

  // Build reviews array (filter incomplete reviews)
  const reviews = (product.reviews as ProductReview[] | undefined)?.filter(
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

  // Check if this is a book
  const isBook =
    product.category?.toLowerCase() === "books" ||
    product.category?.toLowerCase() === "book";

  // Base offers object
  const offers = {
    "@type": "Offer",
    url: productUrl,
    priceCurrency: "USD",
    price: (product.basePrice || 0).toFixed(2),
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Person",
      name: "Dr. Jomo Cousins",
    },
    shippingDetails: { "@id": `${baseUrl}#shipping` },
    hasMerchantReturnPolicy: { "@id": `${baseUrl}#returnpolicy` },
  };

  // Build the product/book schema
  let productSchema;

  if (isBook) {
    productSchema = {
      "@type": ["Book", "Product"],
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
      ...(product.isbn && {
        isbn: product.isbn.replace(/-/g, ""),
        gtin13: product.isbn.replace(/-/g, ""),
      }),
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
      offers,
      ...(aggregateRating && { aggregateRating }),
      ...(reviewSchemas && { review: reviewSchemas }),
    };
  } else {
    productSchema = {
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
      offers,
      ...(aggregateRating && { aggregateRating }),
      ...(reviewSchemas && { review: reviewSchemas }),
    };
  }

  // Product schema only - shipping/return policy defined in page-level schema, referenced by @id
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...productSchema }) }}
    />
  );
}
