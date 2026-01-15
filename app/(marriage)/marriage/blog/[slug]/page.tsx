import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { couplesCornerPostBySlugQuery, relatedCouplesCornerPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { PortableText } from "next-sanity";
import JCNewsletterForm from "../../JCNewsletterForm";
import ShareButtons from "./ShareButtons";

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[ 7 ].length === 11 ? match[ 7 ] : null;
}

// Custom components for Portable Text
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlForImage(value)?.width(1200).url();
      return (
        <figure className="my-8">
          { imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={ imageUrl }
                alt={ value.alt || "Blog image" }
                fill
                className="object-cover"
              />
            </div>
          ) }
          { value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              { value.caption }
            </figcaption>
          ) }
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={ value?.href }
          target={ target }
          rel={ target === "_blank" ? "noopener noreferrer" : undefined }
          className="font-semibold text-[#ea8125] underline transition-colors hover:text-[#d67320]"
        >
          { children }
        </a>
      );
    },
    highlight: ({ children, value }: any) => {
      return (
        <span
          style={ {
            backgroundColor: value?.color || "#ffaa62",
            padding: "2px 4px",
            borderRadius: "3px",
          } }
        >
          { children }
        </span>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-[#303030]">{ children }</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-bold text-[#303030]">{ children }</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-bold text-[#303030]">{ children }</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-[#ea8125] bg-gray-50 py-4 pl-6 pr-4 italic text-gray-700">
        { children }
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{ children }</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{ children }</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{ children }</ol>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await sanityFetch({
    query: couplesCornerPostBySlugQuery,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  // Fetch related posts based on category and tags
  const relatedPosts = await sanityFetch({
    query: relatedCouplesCornerPostsQuery,
    params: {
      slug,
      category: post.category,
      tags: post.tags || [],
      limit: 6
    },
  });

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : null;

  const videoId = post.youtubeVideo?.url
    ? getYouTubeVideoId(post.youtubeVideo.url)
    : null;

  const showVideoTop = post.youtubeVideo?.placement === "top" || !post.youtubeVideo?.placement;

  // Structured Data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl || undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: [
      {
        "@type": "Person",
        name: "Dr. Jomo Cousins",
      },
      {
        "@type": "Person",
        name: "Dr. Charmaine Cousins",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Jomo & Charmaine Cousins",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jomocousins.com/images/marriage/main-page/Jomo-and-Charmaine-logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.jomocousins.com/marriage/blog/${slug}`,
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.jomocousins.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marriage",
        item: "https://www.jomocousins.com/marriage",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Couples Corner",
        item: "https://www.jomocousins.com/marriage/blog",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://www.jomocousins.com/marriage/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="bg-white">
      {/* Structured Data */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(articleStructuredData) } }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbStructuredData) } }
      />
      {/* Hero Section */ }
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20">
        <div className="container mx-auto px-5">
          {/* Breadcrumb */ }
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link
              href="/marriage/blog"
              className="text-gray-600 transition-colors hover:text-[#ea8125]"
            >
              Couples Corner
            </Link>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#303030] font-semibold">{ post.title }</span>
          </div>

          {/* Title & Meta */ }
          <div className="mx-auto max-w-4xl">
            {/* Category */ }
            <div className="mb-4">
              <span className="inline-block rounded-full bg-[#ea8125] px-4 py-2 text-sm font-bold text-white">
                { post.category }
              </span>
            </div>

            {/* Title */ }
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
              { post.title }
            </h1>

            {/* Date & Tags */ }
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{ format(parseISO(post.publishedAt), "MMMM d, yyyy") }</span>
              </div>

              { post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  { post.tags.map((tag, index) => (
                    <span
                      key={ index }
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                    >
                      { tag }
                    </span>
                  )) }
                </div>
              ) }
            </div>

            {/* Featured Image */ }
            { imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={ imageUrl }
                  alt={ post.coverImage.alt || post.title }
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) }
          </div>
        </div>
      </section>

      {/* Blog Content */ }
      <section className="py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl">
            {/* YouTube Video - Top */ }
            { videoId && showVideoTop && (
              <div className="mb-12">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={ `https://www.youtube.com/embed/${videoId}` }
                    title={ post.youtubeVideo?.title || post.title }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                { post.youtubeVideo?.title && (
                  <p className="mt-3 text-center text-sm text-gray-600">
                    { post.youtubeVideo.title }
                  </p>
                ) }
              </div>
            ) }

            {/* Article Content */ }
            <article className="prose prose-lg max-w-none">
              { post.content && <PortableText value={ post.content } components={ portableTextComponents } /> }
            </article>

            {/* YouTube Video - Bottom */ }
            { videoId && !showVideoTop && (
              <div className="mt-12">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={ `https://www.youtube.com/embed/${videoId}` }
                    title={ post.youtubeVideo?.title || post.title }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                { post.youtubeVideo?.title && (
                  <p className="mt-3 text-center text-sm text-gray-600">
                    { post.youtubeVideo.title }
                  </p>
                ) }
              </div>
            ) }

            {/* Share Section */ }
            <ShareButtons
              shareUrl={ `https://www.jomocousins.com/marriage/blog/${slug}` }
              shareTitle={ post.title }
            />
          </div>
        </div>
      </section>

      {/* Marriage Counseling CTA */ }
      <section className="bg-gradient-to-r from-[#0E6BB7] to-[#0a5a9f] py-16 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Need More Support for Your Marriage?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Dr. Jomo & Dr. Charmaine offer personalized marriage counseling, premarital prep, and relationship coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/marriage/contact"
                className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-[#0E6BB7] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Schedule Counseling
              </Link>
              <Link
                href="/marriage"
                className="inline-block rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#0E6BB7]"
              >
                Learn More About Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio Section */ }
      <section className="bg-white py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/marriage/main-page/Jomo-and-Charmaine-logo.webp"
                    alt="Dr. Jomo and Dr. Charmaine Cousins"
                    width={ 150 }
                    height={ 150 }
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-[#303030]">
                    About the Authors
                  </h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    <strong>Dr. Jomo and Dr. Charmaine Cousins</strong> are Senior Pastors at Love First Christian Center and have been married for 24+ years. They've counseled over 1,000 couples and are passionate about helping marriages thrive through faith-based relationship coaching.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/marriage/about"
                      className="text-[#ea8125] font-semibold hover:underline"
                    >
                      Read Their Full Story →
                    </Link>
                    <Link
                      href="/marriage/blog"
                      className="text-[#0E6BB7] font-semibold hover:underline"
                    >
                      More Couples Corner Articles →
                    </Link>
                    <Link
                      href="/prayer/daily"
                      className="text-[#0E6BB7] font-semibold hover:underline"
                    >
                      Join Daily Prayer →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */ }
      { relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20">
          <div className="container mx-auto px-5">
            <h2 className="mb-4 text-3xl font-bold text-[#303030] md:text-4xl">
              Related Articles from <span className="text-[#ea8125]">Couples Corner</span>
            </h2>
            <p className="mb-12 text-gray-600">
              More insights on <span className="font-semibold text-[#ea8125]">{ post.category }</span> and marriage growth
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              { relatedPosts
                .slice(0, 6)
                .map((relatedPost) => {
                  const relatedImageUrl = relatedPost.coverImage
                    ? urlForImage(relatedPost.coverImage)?.width(600).height(400).url()
                    : null;

                  return (
                    <Link
                      key={ relatedPost._id }
                      href={ `/marriage/blog/${relatedPost.slug}` }
                      className="group"
                    >
                      <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
                        { relatedImageUrl && (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={ relatedImageUrl }
                              alt={ relatedPost.coverImage.alt || relatedPost.title }
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) }

                        <div className="p-6">
                          <div className="mb-2 text-sm">
                            <span className="rounded-full bg-[#0E6BB7]/10 px-3 py-1 font-semibold text-[#0E6BB7]">
                              { relatedPost.category }
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-[#303030] transition-colors group-hover:text-[#ea8125]">
                            { relatedPost.title }
                          </h3>
                          <p className="line-clamp-2 text-sm text-gray-600">{ relatedPost.excerpt }</p>
                        </div>
                      </article>
                    </Link>
                  );
                }) }
            </div>
          </div>
        </section>
      ) }

      {/* Explore More Resources */ }
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#303030] md:text-3xl">
              Explore More Marriage Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/marriage/blog"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#ea8125] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ea8125]/10">
                  <svg className="h-6 w-6 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#ea8125]">
                  All Blog Posts
                </h3>
                <p className="text-sm text-gray-600">
                  Browse all marriage advice articles
                </p>
              </Link>

              <Link
                href="/marriage/contact"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#0E6BB7] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E6BB7]/10">
                  <svg className="h-6 w-6 text-[#0E6BB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#0E6BB7]">
                  Marriage Counseling
                </h3>
                <p className="text-sm text-gray-600">
                  Get personalized support for your relationship
                </p>
              </Link>

              <Link
                href="/products?category=books"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#ea8125] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ea8125]/10">
                  <svg className="h-6 w-6 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#ea8125]">
                  Marriage Books
                </h3>
                <p className="text-sm text-gray-600">
                  Shop books on marriage and relationships
                </p>
              </Link>

              <Link
                href="/prayer/daily"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#0E6BB7] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E6BB7]/10">
                  <svg className="h-6 w-6 text-[#0E6BB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#0E6BB7]">
                  Daily Prayer
                </h3>
                <p className="text-sm text-gray-600">
                  Join the 6:30 AM prayer line
                </p>
              </Link>

              <Link
                href="/marriage/about"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#ea8125] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ea8125]/10">
                  <svg className="h-6 w-6 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#ea8125]">
                  About Us
                </h3>
                <p className="text-sm text-gray-600">
                  Meet Dr. Jomo & Dr. Charmaine
                </p>
              </Link>

              <Link
                href="/marriage"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#0E6BB7] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E6BB7]/10">
                  <svg className="h-6 w-6 text-[#0E6BB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-bold text-lg text-[#303030] group-hover:text-[#0E6BB7]">
                  Marriage Ministry
                </h3>
                <p className="text-sm text-gray-600">
                  Explore all our marriage services
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */ }
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left - eBook Image */ }
            <div className="relative flex justify-center">
              <Image
                src="/images/marriage/main-page/conversation-staters.webp"
                alt="Conversation Starters for Couples"
                width={ 500 }
                height={ 500 }
                className="w-full max-w-md h-auto"
                quality={ 100 }
              />
            </div>

            {/* Right - Form */ }
            <div>
              <JCNewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await sanityFetch({
    query: couplesCornerPostBySlugQuery,
    params: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : null;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    alternates: {
      canonical: `https://www.jomocousins.com/marriage/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.jomocousins.com/marriage/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: [ "Dr. Jomo Cousins", "Dr. Charmaine Cousins" ],
      images: imageUrl ? [ { url: imageUrl } ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [ imageUrl ] : [],
    },
  };
}
