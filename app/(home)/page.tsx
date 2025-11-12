"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerChildren, StaggerItem, FadeIn, SlideInTop } from "./animations";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden min-h-screen"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/herobackground.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-5 pt-6 ">
          <div className="flex flex-col items-center justify-center gap-0 md:flex-row md:items-end">
            {/* Left Content */}
            {/* <FadeInLeft> */}
              <div className="self-center text-center md:text-left">
                <h1 className="mb-6 text-4xl font-bold leading-tight text-[#2d2d2d] md:text-5xl lg:text-6xl">
                  <Image
                    src="/images/icons/hearts.png"
                    alt="Heart Icon"
                    width={64}
                    height={64}
                    className="mb-6 hidden h-16 w-16 md:block"
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
                Whether at a school, an organization, or the general public, motivational speaker and pastor Dr. Jomo Cousins inspires you to transform your thoughts and maximize your potential.
                </p>
                <Link
                  href="#contact"
                  className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                >
                  Book Now
                </Link>
              </div>
            {/* </FadeInLeft> */}

            {/* Right Image */}
            {/* <FadeInRight delay={0.2}> */}
              <div className="relative w-full max-w-[600px]">
                <Image
                  src="/images/jc-png/heroJomo.png"
                  alt="Dr. Jomo Cousins"
                  width={600}
                  height={700}
                  className="mx-auto w-full h-auto"
                  priority
                />
              </div>
            {/* </FadeInRight> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative bg-gray-50 py-20 md:py-32">
        {/* Background Image - Fixed on desktop, not on mobile */}
        <div className="absolute inset-0 bg-cover bg-top md:bg-fixed" style={{ backgroundImage: "url('/images/jc-color-pics/main-page-about.jpg')" }}>
          {/* Overlay - only on mobile */}
          <div className="absolute inset-0 bg-black/50 md:bg-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="flex justify-end">
            <FadeInRight>
              <div className="w-full max-w-2xl p-8 text-center md:p-12 md:text-left">
                <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    <Image
                      src="/images/icons/_JC01.png"
                      alt="Icon"
                      width={80}
                      height={80}
                      className="h-16 w-16"
                    />
                    About
                  </div>
                  <span className="text-[#e31e24]">Dr. Jomo Cousins</span>
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-white">
                  <p>
                    Dr. Cousins has been hailed as "a millennial leader of the Christian community" and "a beacon of faith" by both international and national media. A retired NFL defensive end for the New York Giants and the Arizona Cardinals, he has extended his reach within the community through self-motivation seminars, presentation competencies, financial wealth symposiums, and youth partnership programs.
                  </p>
                  <p className="flex items-start justify-center gap-3 md:justify-start">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Alumnus of Florida A&M University
                      <br/>
                      and Tabernacle Bible College
                    </span>
                  </p>
                  <p className="flex items-start justify-center gap-3 md:justify-start">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Creator of The Gap
                      <br/>
                      (The Guaranteed Achievable Plan)
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
            </FadeInRight>
          </div>
        </div>
      </section>



      {/* I.R.I.E. Method Section */}
      <section className="relative bg-gray-100 py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/iriebackground.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <SlideInTop>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl lg:text-6xl">
                THE <span className="text-[#e31e24]">I.R.I.E.</span> METHOD
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-700">
              Dr. Cousins was born in Jamaica where "everything's irie." In other words, "it's all good." Staying true to his roots, he crafted the I.R.I.E. Method for motivational speaking.
              </p>
            </div>
          </SlideInTop>

          <StaggerChildren>
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* IMPACT */}
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                    IMPACT
                  </h3>
                  <p className="text-gray-700">
                    Each engagement presents a new opportunity to make a lasting impact every time. Dr. Cousins is ready to make a lasting impact every time.
                  </p>
                </div>
              </StaggerItem>

              {/* RESONATE */}
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                    RESONATE
                  </h3>
                  <p className="text-gray-700">
                    Authenticity? Check. Connecting with people on a human level? Check. Dr. Cousins is bound to resonate when these two things are present.
                  </p>
                </div>
              </StaggerItem>

              {/* INSPIRE */}
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                    INSPIRE
                  </h3>
                  <p className="text-gray-700">
                    James 2:14-26 teaches us faith without works is dead. A message without action isn't inspiring — it's just words — it's inaction.
                  </p>
                </div>
              </StaggerItem>

              {/* ENTERTAIN */}
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[#2d2d2d]">
                    ENTERTAIN
                  </h3>
                  <p className="text-gray-700">
                    There's nothing like good humor. But there's a method to the jokes. Laughter helps. After all, people won't forget what made them laugh.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerChildren>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Spiritually Empowers Section */}
      <section className="relative bg-[#2d2d2d] py-40 md:py-40">
        {/* Background Image - Fixed on desktop, not on mobile */}
        <div className="absolute inset-0 bg-cover bg-top md:bg-fixed" style={{ backgroundImage: "url('/images/backgrounds/empowersbackground.jpg')" }}>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="max-w-2xl">
            <FadeInLeft>
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
            </FadeInLeft>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <SlideInTop>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
                Books & <span className="text-[#e31e24]">Resources</span>
              </h2>
              <p className="text-xl text-gray-600">
                Fill up on empowerment any time with motivational books
              </p>
            </div>
          </SlideInTop>

          {/* Book Images Grid */}
          <StaggerChildren staggerDelay={0.2}>
            <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-8">
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 transition-transform hover:scale-105">
                    <Image
                      src="/images/books/Website-Image.compressed.png"
                      alt="God Is My Healer"
                      width={250}
                      height={350}
                      className="h-auto w-48 md:w-64"
                    />
                  </div>
                  <Link
                    href="/books/god-is-my-healer"
                    className="inline-block rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    View Book
                  </Link>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 transition-transform hover:scale-105">
                    <Image
                      src="/images/books/FULLY-EQUIPPED-FRONT-COVER.webp"
                      alt="Fully Equipped: God's Total Package"
                      width={250}
                      height={350}
                      className="h-auto w-48 md:w-64"
                    />
                  </div>
                  <Link
                    href="/books/fully-equipped"
                    className="inline-block rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    View Book
                  </Link>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="mb-4 transition-transform hover:scale-105">
                    <Image
                      src="/images/books/YoureInAPlaceTooSmallForYourCall_cover.webp"
                      alt="You're In A Place Too Small For Your Call"
                      width={250}
                      height={350}
                      className="h-auto w-48 md:w-64"
                    />
                  </div>
                  <Link
                    href="/books/youre-in-a-place-too-small"
                    className="inline-block rounded-lg bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                  >
                    View Book
                  </Link>
                </div>
              </StaggerItem>
            </div>
          </StaggerChildren>

          {/* Platform Logos */}
          <FadeIn delay={0.4}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
              <Image
                src="/images/site-files/image (23).png"
                alt="Audible"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="/images/site-files/image (24).png"
                alt="Audible"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="/images/site-files/image (22).png"
                alt="iTunes"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </FadeIn>

          <FadeInUp delay={0.6}>
            <div className="mt-12 text-center">
              <Link
                href="/books"
                className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
              >
                View All Books
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Inspire Lives Section */}
      <section className="relative overflow-hidden bg-[#2d2d2d] py-20 md:py-32">
        {/* Background Image - covers entire section, positioned left */}
        <div className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('/images/backgrounds/inspirebackground.jpg')", backgroundPosition: "-500px center" }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-5">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            {/* Left side - spacer */}
            <div></div>

            {/* Right Content */}
            <FadeInRight>
              <div className="text-white">
                <h2 className="mb-6 flex items-center gap-3 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  <span className="text-[#e31e24]">INSPIRE</span> LIVES
                  <svg className="h-12 w-12 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                Whether you're seeking personal growth, spiritual enlightenment, or a fresh perspective, Dr. Cousins has got you covered. If you haven't already, make sure to check out some of Dr. Cousins' most recent videos on YouTube. They are packed with life-changing insights, practical advice, and soul-stirring motivation.
                </p>

                <p className="mb-8 text-lg leading-relaxed text-gray-300">
                Join the movement of individuals who are embracing a life of purpose and fulfillment. Hit that subscribe button and turn on the notification bell, so you never miss an update.
                </p>

                {/* Video Embeds */}
                <div className="mb-8 grid gap-4 md:grid-cols-2">
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
                </div>

                <p className="mb-8 text-base italic text-gray-400">
                Get ready to unlock your full potential and embark on an incredible journey of personal growth with God in the center. Welcome to the movement!
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/wearelovefirst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
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
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Prayer Line Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <FadeInUp>
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
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mb-8 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
                Join the <span className="text-[#e31e24]">6:30 AM Prayer Line</span>
              </h2>
              <p className="mb-6 text-xl leading-relaxed text-gray-700">
                For nearly 11 years, Dr. Cousins has consistently hosted a 6:30 AM
                weekday prayer line accessible via social media, touching lives around
                the world with daily devotions and prayers.
              </p>
              <p className="mb-10 text-lg text-gray-600">
                Start your day with powerful prayer and encouragement. Connect with
                believers worldwide every weekday morning.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="https://www.facebook.com/pastorjomo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                >
                  Join on Facebook
                </a>
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
          </FadeInUp>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 md:py-20">
        <div className="grid items-stretch gap-0 md:grid-cols-3">
          {/* Left Panel - Client Logos */}
          <FadeInLeft>
            <div className="flex flex-col items-center justify-center gap-12 p-12">
              <div className="grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/hc-logo2.png"
                  alt="Hillsborough County Florida"
                  width={200}
                  height={80}
                  className="h-auto w-48"
                />
              </div>
              <div className="grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/_00Logos_JC_09.png"
                  alt="Hillsborough County Public Schools"
                  width={200}
                  height={80}
                  className="h-auto w-48"
                />
              </div>
            </div>
          </FadeInLeft>

          {/* Center Panel - Call to Action */}
          <FadeIn delay={0.2}>
            <div className="bg-[#2d2d2d] p-12 text-center text-white">
              <div className="mb-6 flex justify-center">
                <svg className="h-16 w-16 text-[#e31e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
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
                See More
              </Link>
            </div>
          </FadeIn>

          {/* Right Panel - Client Logos */}
          {/* <FadeInRight delay={0.4}> */}
            <div className="grid grid-cols-2 gap-8 p-12">
              <div className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/_00Logos_JC_18.png"
                  alt="UNCF"
                  width={150}
                  height={80}
                  className="h-auto w-32"
                />
              </div>
              <div className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/_00Logos_JC_07.png"
                  alt="Keller Williams"
                  width={150}
                  height={80}
                  className="h-auto w-32"
                />
              </div>
              <div className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/_00Logos_JC_14.png"
                  alt="Boys & Girls Club"
                  width={150}
                  height={80}
                  className="h-auto w-32"
                />
              </div>
              <div className="flex items-center justify-center grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image
                  src="/images/clients/_00Logos_JC_05.png"
                  alt="RE/MAX"
                  width={150}
                  height={80}
                  className="h-auto w-32"
                />
              </div>
            </div>
          {/* </FadeInRight> */}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-[#3d3d3d] py-20 text-white md:py-32">
        <div className="container mx-auto px-5">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Ready to Transform Your <span className="text-[#e31e24]">Event?</span>
              </h2>
              <p className="mb-10 text-xl text-gray-300">
                Book Dr. Jomo Cousins for your next company event, church gathering,
                youth program, or financial seminar.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                >
                  Contact for Booking
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
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
