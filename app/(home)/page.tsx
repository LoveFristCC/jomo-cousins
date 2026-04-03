import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import BooksSection from "./books-section";
import RecentPrayerSection from "./recent-prayer-section";
import RecentMarriageBlogSection from "./recent-marriage-blog-section";
import NewsletterSection from "./NewsLetterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Dr. Jomo Cousins | Motivational Speaker & Pastor | Tampa, FL",
  },
  description:
    "Book Dr. Jomo Cousins for motivational speaking, financial seminars, and youth programs. NFL veteran, cancer survivor, and pastor based in Tampa, FL.",
  alternates: {
    canonical: "https://www.jomocousins.com/",
  },
};

// Revalidate every 20 minutes to match Sanity CDN caching
export const revalidate = 1200;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of events does Dr. Jomo Cousins speak at?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Jomo Cousins speaks at corporate events, church gatherings, youth programs, financial seminars, and conferences. He is available for both in-person and virtual engagements nationwide.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Dr. Jomo Cousins based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Jomo Cousins is based in Riverview, FL (Tampa Bay area). He is the founder and senior pastor of Love First Christian Center and travels nationwide for speaking engagements.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book Dr. Jomo Cousins for a speaking engagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can request booking information by filling out the contact form on jomocousins.com/contact. The team typically responds within 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "What is the I.R.I.E. Method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The I.R.I.E. Method is Dr. Jomo Cousins' motivational speaking framework. It stands for Impact, Resonate, Inspire, and Entertain. Born in Jamaica where 'everything is irie' (meaning all good), Dr. Cousins built this approach around authenticity and actionable takeaways.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* FAQ Schema */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } }
      />

      {/* Hero Section */ }
      <section
        id="home"
        className="relative overflow-hidden pt-12 md:pt-8"
      >
        {/* Background Image - This is the LCP element */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/herobackground.webp"
            alt="Decorative background pattern"
            fill
            className="object-cover opacity-20"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={ 75 }
          />
        </div>

        <div className="container relative z-10 mx-auto px-5 pt-6 ">
          <div className="flex flex-col items-center justify-center gap-0 md:flex-row md:items-end">
            <div className="self-center text-center md:text-left">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-[#2d2d2d] md:text-5xl lg:text-6xl">
                <Image
                  src="/images/icons/hearts.webp"
                  alt="Heart Icon"
                  width={ 184 }
                  height={ 178 }
                  className="mb-6 hidden h-16 w-auto md:block"
                  loading="lazy"
                />
                UNLOCK THE
                <br />
                POWER OF
                <br />
                PURPOSE IN
                <br />
                YOUR <span className="text-[#e31e24]">LIFE!</span>
              </h1>
              <p className="mb-8 max-w-md text-base leading-relaxed text-gray-700">
                From schools to boardrooms to Sunday services, motivational speaker and pastor Dr. Jomo Cousins helps people take action on their goals and live with intention.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
              >
                Book Dr. Cousins
              </Link>
            </div>
            <div className="relative w-full max-w-[600px]">
              <Image
                src="/images/jc-png/heroJomo.webp"
                alt="Dr. Jomo Cousins - Motivational Speaker and Pastor in Tampa, FL"
                width={ 600 }
                height={ 700 }
                className="mx-auto w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */ }
      <section id="about" className="relative bg-gray-50 py-20 md:py-32">
        {/* Background Image - Fixed on desktop, scroll on mobile */ }
        <div className="absolute inset-0 bg-cover bg-top md:bg-fixed" style={ { backgroundImage: "url('/images/jc-color-pics/main-page-about.webp')" } }>
          {/* Overlay - only on mobile */ }
          <div className="absolute inset-0 bg-black/50 md:bg-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="flex justify-end">
            <div className="w-full max-w-2xl p-8 text-center md:p-12 md:text-left">
              <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <Image
                    src="/images/icons/_JC01.webp"
                    alt="Icon"
                    width={ 184 }
                    height={ 177 }
                    className="h-16 w-auto"
                  />
                  About{ ' ' }
                </div>
                <span className="text-[#e31e24]">Dr. Jomo Cousins</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-white">
                <p>
                  Dr. Jomo Cousins is a retired NFL defensive end who played for the New York Giants and the Arizona Cardinals. After football, he turned that same discipline toward ministry, founding Love First Christian Center in Riverview, FL. Today he speaks at corporate events, churches, schools, and youth programs across the country.
                </p>
                <p className="flex items-start justify-center gap-3 md:justify-start">
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>
                    First in his family to attend college
                    <br />
                    (Florida A&M University, PhD from Tabernacle Bible College)
                  </span>
                </p>
                <p className="flex items-start justify-center gap-3 md:justify-start">
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Creator of The Gap (The Guaranteed Achievable Plan),
                    <br />
                    a step-by-step framework for setting and reaching goals
                  </span>
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                >
                  Read Full Bio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* I.R.I.E. Method Section */ }
      <section className="relative bg-gray-100 py-20 md:py-32">
        {/* Background Image */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/iriebackground.webp"
            alt="Background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl lg:text-6xl">
              THE <span className="text-[#e31e24]">I.R.I.E.</span> METHOD
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-700">
              Dr. Jomo Cousins was born in Jamaica where "everything's irie." In other words, "it's all good." Staying true to his roots, he crafted the I.R.I.E. Method for motivational speaking.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* IMPACT */ }
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                IMPACT
              </h3>
              <p className="text-gray-700">
                Every audience is different, and Dr. Jomo Cousins prepares for each one. The goal is always the same: leave people with something they can act on, not just feel good about.
              </p>
            </div>

            {/* RESONATE */ }
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                RESONATE
              </h3>
              <p className="text-gray-700">
                Dr. Cousins speaks from experience, not a script. When you've played in the NFL, beaten cancer, and built a church from the ground up, people can tell you mean what you say.
              </p>
            </div>

            {/* INSPIRE */ }
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                INSPIRE
              </h3>
              <p className="text-gray-700">
                James 2:14-26 teaches us faith without works is dead. A message without action isn't inspiring — it's just words — it's inaction.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                ENTERTAIN
              </h3>
              <p className="text-gray-700">
                There's nothing like good humor. But there's a method to the jokes. Laughter helps. After all, people won't forget what made them laugh.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
            >
              Book Dr. Cousins
            </Link>
          </div>
        </div>
      </section>

      {/* Spiritually Empowers Section */ }
      <section className="relative bg-[#2d2d2d] py-40 md:py-40">
        {/* Background Image - Fixed on desktop, scroll on mobile */ }
        <div className="absolute inset-0 bg-cover bg-top md:bg-fixed" style={ { backgroundImage: "url('/images/backgrounds/empowersbackground.webp')" } }>
          {/* Dark Overlay */ }
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="max-w-2xl">
            <div className="text-white">
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                SPIRITUALLY
                <br />
                EM<span className="text-[#e31e24]">POWERS</span>
                <svg className="ml-2 inline h-12 w-12 text-[#e31e24]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                "His charismatic presence speaks to the heart of business and spiritual issues... He turns knowledge into plans for action, leaving audiences inspired and ready to achieve."
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mt-5">- WordPress Business Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */ }
      <Suspense fallback={
        <section id="books" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-5">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
                Books & <span className="text-[#e31e24]">Resources</span>
              </h2>
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          </div>
        </section>
      }>
        <BooksSection />
      </Suspense>

      {/* Inspire Lives Section */ }
      <section className="relative overflow-hidden bg-[#2d2d2d] py-20 md:py-32">
        {/* Background Image - covers entire section, positioned left */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/inspirebackground.webp"
            alt="Inspire Background"
            fill
            className="object-cover"
            style={ { objectPosition: "-500px center" } }
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            {/* Left side - spacer */ }
            <div></div>

            {/* Right Content */ }
            <div className="text-white">
              <h2 className="mb-6 flex items-center gap-3 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                <span className="text-[#e31e24]">INSPIRE</span> LIVES
                <svg className="h-12 w-12 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </h2>

              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                Dr. Jomo Cousins shares weekly messages on faith, discipline, and personal growth on YouTube. Whether you're working through a tough season or looking for a new perspective, his videos offer honest, practical advice rooted in real experience.
              </p>

              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                Subscribe to the channel so you don't miss new content. Thousands of viewers tune in each week.
              </p>

              {/* Video Embeds */ }
              {/* <div className="mb-8 grid gap-4 md:grid-cols-2">
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/videoseries?list=UU-jomocousins"
                      title="You Are Fully Equipped"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/videoseries?list=UU-jomocousins"
                      title="How To Hear God"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div> */}

              <p className="mb-8 text-base italic text-gray-400">
                Real talk about faith, purpose, and what it takes to keep going when things get hard.
              </p>

              {/* Social Media Icons */ }
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/pastorjomo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Visit Pastor Jomo on Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/pastorjomo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Visit Pastor Jomo on Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@PASTORJOMO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Visit Pastor Jomo on YouTube"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/dr-jomo-cousins-277279138/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Visit Pastor Jomo on LinkedIn"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Prayer Video Section */ }
      <Suspense fallback={
        <section className="relative bg-white py-20 md:py-32">
          <div className="container mx-auto px-5">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
                Most Recent <span className="text-[#e31e24]">Prayer Video</span>
              </h2>
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          </div>
        </section>
      }>
        <RecentPrayerSection />
      </Suspense>

      {/* Recent Marriage Blog Section */ }
      <Suspense fallback={
        <section className="relative overflow-hidden bg-[#303030] py-20 md:py-32">
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-1 w-12 bg-[#ea8125]"></div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
                  Couples' Corner
                </p>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Loading...
              </h2>
            </div>
          </div>
        </section>
      }>
        <RecentMarriageBlogSection />
      </Suspense>

      {/* Prayer Line Section */ }
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <svg
                className="h-20 w-20 text-[#e31e24]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={ 2 }
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-8 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Join the <span className="text-[#e31e24]">6:30 AM Prayer Line</span>
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              Every weekday morning at 6:30 AM, Dr. Jomo Cousins goes live on social media to pray with people around the world. He's done this for over 11 years straight, rain or shine, including through his own cancer treatment.
            </p>
            <p className="mb-10 text-lg text-gray-600">
              Start your morning with prayer, encouragement, and a community of believers who show up for each other every day.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/prayer/daily"
                className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
              >
                Join Prayer
              </Link>
              <a
                href="https://www.youtube.com/@PASTORJOMO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-[#2d2d2d] px-12 py-4 font-bold uppercase tracking-wide text-[#2d2d2d] shadow-md transition-all hover:scale-105 hover:bg-[#2d2d2d] hover:text-white hover:shadow-lg"
              >
                Join on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */ }
      <section className="py-20 md:py-20">
        <div className="grid items-stretch gap-0 md:grid-cols-3">
          {/* Left Panel - Client Logos */ }
          <ul className="flex flex-col items-center justify-center gap-12 p-12">
            <li className="grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/hc-logo2.webp"
                alt="Hillsborough County Florida"
                width={ 200 }
                height={ 80 }
                className="h-auto w-48"
              />
            </li>
            <li className="grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/_00Logos_JC_09.webp"
                alt="Hillsborough County Public Schools"
                width={ 200 }
                height={ 80 }
                className="h-auto w-48"
              />
            </li>
          </ul>

          {/* Center Panel - Call to Action */ }
          <div className="bg-[#2d2d2d] p-12 text-center text-white">
            <div className="mb-6 flex justify-center">
              <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              OUR
              <br />
              <span className="text-[#e31e24]">CLIENTS</span>
            </h2>
            <p className="mb-4 text-lg text-gray-300">
              Everything's I.R.I.E., and these clients think so too.
            </p>
            <p className="mb-6 text-base text-gray-400">
              You could be next!
            </p>
            <Link
              href="/contact"
              className="inline-block border-b-2 border-white pb-1 font-bold uppercase tracking-wide transition-all hover:border-[#e31e24] hover:text-[#e31e24] hover:translate-x-1"
            >
              Contact Me Today
            </Link>
          </div>

          {/* Right Panel - Client Logos */ }
          <ul className="grid grid-cols-2 gap-8 p-12">
            <li className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/_00Logos_JC_18.webp"
                alt="UNCF"
                width={ 150 }
                height={ 80 }
                className="h-auto w-32"
              />
            </li>
            <li className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/_00Logos_JC_07.webp"
                alt="Keller Williams"
                width={ 150 }
                height={ 80 }
                className="h-auto w-32"
              />
            </li>
            <li className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/_00Logos_JC_14.webp"
                alt="Boys & Girls Club"
                width={ 150 }
                height={ 80 }
                className="h-auto w-32"
              />
            </li>
            <li className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <Image
                src="/images/clients/_00Logos_JC_05.webp"
                alt="RE/MAX"
                width={ 150 }
                height={ 80 }
                className="h-auto w-32"
              />
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */ }
      <section id="contact" className="bg-[#3d3d3d] py-20 text-white md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Book Dr. Cousins for Your Next <span className="text-[#e31e24]">Event</span>
            </h2>
            <p className="mb-4 text-xl text-gray-300">
              Corporate keynotes, church events, youth programs, and financial seminars. Available in-person or virtual, nationwide.
            </p>
            <p className="mb-10 text-sm text-gray-400">
              Fill out a quick form and our team will get back to you within 48 hours.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
              >
                Request Booking Info
              </Link>
              <a
                href="https://www.youtube.com/@PASTORJOMO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-white px-12 py-4 font-bold uppercase tracking-wide shadow-md transition-all hover:scale-105 hover:bg-white hover:text-[#3d3d3d] hover:shadow-lg"
              >
                Watch Videos
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter Section - Homepage Only */ }
      <NewsletterSection />
    </div>
  );
}
