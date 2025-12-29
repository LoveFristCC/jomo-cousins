import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { couplesCornerPostBySlugQuery, recentCouplesCornerPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { PortableText } from "next-sanity";
import JCNewsletterForm from "../../JCNewsletterForm";
import ShareButtons from "./ShareButtons";

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
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
          {imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={value.alt || "Blog image"}
                fill
                className="object-cover"
              />
            </div>
          )}
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="font-semibold text-[#ea8125] underline transition-colors hover:text-[#d67320]"
        >
          {children}
        </a>
      );
    },
    highlight: ({ children, value }: any) => {
      return (
        <span
          style={{
            backgroundColor: value?.color || "#ffaa62",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          {children}
        </span>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-[#303030]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-bold text-[#303030]">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-bold text-[#303030]">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-[#ea8125] bg-gray-50 py-4 pl-6 pr-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, recentPosts] = await Promise.all([
    sanityFetch({
      query: couplesCornerPostBySlugQuery,
      params: { slug },
    }),
    sanityFetch({
      query: recentCouplesCornerPostsQuery,
      params: { limit: 3 },
    }),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : null;

  const videoId = post.youtubeVideo?.url
    ? getYouTubeVideoId(post.youtubeVideo.url)
    : null;

  const showVideoTop = post.youtubeVideo?.placement === "top" || !post.youtubeVideo?.placement;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20">
        <div className="container mx-auto px-5">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link
              href="/marriage/blog"
              className="text-gray-600 transition-colors hover:text-[#ea8125]"
            >
              Couples Corner
            </Link>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#303030] font-semibold">{post.title}</span>
          </div>

          {/* Title & Meta */}
          <div className="mx-auto max-w-4xl">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block rounded-full bg-[#ea8125] px-4 py-2 text-sm font-bold text-white">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Date & Tags */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{format(parseISO(post.publishedAt), "MMMM d, yyyy")}</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={imageUrl}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl">
            {/* YouTube Video - Top */}
            {videoId && showVideoTop && (
              <div className="mb-12">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={post.youtubeVideo?.title || post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                {post.youtubeVideo?.title && (
                  <p className="mt-3 text-center text-sm text-gray-600">
                    {post.youtubeVideo.title}
                  </p>
                )}
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              {post.content && <PortableText value={post.content} components={portableTextComponents} />}
            </article>

            {/* YouTube Video - Bottom */}
            {videoId && !showVideoTop && (
              <div className="mt-12">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={post.youtubeVideo?.title || post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                {post.youtubeVideo?.title && (
                  <p className="mt-3 text-center text-sm text-gray-600">
                    {post.youtubeVideo.title}
                  </p>
                )}
              </div>
            )}

            {/* Share Section */}
            <ShareButtons
              shareUrl={`https://www.jomocousins.com/marriage/blog/${slug}`}
              shareTitle={post.title}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20">
          <div className="container mx-auto px-5">
            <h2 className="mb-12 text-3xl font-bold text-[#303030] md:text-4xl">
              More from <span className="text-[#ea8125]">Couples Corner</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {recentPosts
                .filter((relatedPost) => relatedPost._id !== post._id)
                .slice(0, 3)
                .map((relatedPost) => {
                  const relatedImageUrl = relatedPost.coverImage
                    ? urlForImage(relatedPost.coverImage)?.width(600).height(400).url()
                    : null;

                  return (
                    <Link
                      key={relatedPost._id}
                      href={`/marriage/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
                        {relatedImageUrl && (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={relatedImageUrl}
                              alt={relatedPost.coverImage.alt || relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <div className="p-6">
                          <div className="mb-2 text-sm">
                            <span className="rounded-full bg-[#0E6BB7]/10 px-3 py-1 font-semibold text-[#0E6BB7]">
                              {relatedPost.category}
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-[#303030] transition-colors group-hover:text-[#ea8125]">
                            {relatedPost.title}
                          </h3>
                          <p className="line-clamp-2 text-sm text-gray-600">{relatedPost.excerpt}</p>
                        </div>
                      </article>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left - eBook Image */}
            <div className="relative flex justify-center">
              <Image
                src="/images/marriage/main-page/conversation-staters.png"
                alt="Conversation Starters for Couples"
                width={500}
                height={500}
                className="w-full max-w-md h-auto"
                quality={100}
              />
            </div>

            {/* Right - Form */}
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
      publishedTime: post.publishedAt,
      authors: ["Dr. Jomo Cousins", "Dr. Charmaine Cousins"],
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}
