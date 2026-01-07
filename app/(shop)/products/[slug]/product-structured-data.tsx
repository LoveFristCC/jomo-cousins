import { urlForImage } from "@/sanity/lib/utils";

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
  const imageUrl = product.images?.[0]
    ? urlForImage(product.images[0])?.width(1200).height(1200).url()
    : `${baseUrl}/images/og-image.jpg`;

  // Extract plain text description
  const description =
    typeof product.description === "string"
      ? product.description
      : product.description?.[0]?.children?.[0]?.text ||
        product.excerpt ||
        "";

  // Base Product schema
  const productSchema = {
    "@type": "Product",
    "@id": productUrl,
    name: product.name,
    description: description,
    image: imageUrl,
    url: productUrl,
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
    },
  };

  // For books, use Book schema instead
  // Check if this is a book by category or presence of book-specific fields
  const isBook =
    product.category?.toLowerCase() === "books" ||
    product.category?.toLowerCase() === "book" ||
    !!(product.isbn || product.author || product.pageCount || product.publisher);

  const bookSchema = isBook
    ? {
        "@type": "Book",
        "@id": productUrl,
        name: product.name,
        description: product.excerpt || description,
        image: imageUrl,
        url: productUrl,
        author: {
          "@type": "Person",
          name: product.author || "Dr. Jomo Cousins",
          url: baseUrl,
        },
        ...(product.isbn && { isbn: product.isbn }),
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
    "@graph": [bookSchema || productSchema, breadcrumbSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
