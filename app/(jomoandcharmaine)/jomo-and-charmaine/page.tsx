import Image from "next/image";
import Link from "next/link";
import JCNewsletterForm from "./JCNewsletterForm";

export default function JomoAndCharmainePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.jomocousins.com/jomo-and-charmaine/#organization",
        "name": "Jomo & Charmaine Ministries",
        "url": "https://www.jomocousins.com/jomo-and-charmaine",
        "logo": "https://www.jomocousins.com/images/jomo-and-charmaine/main-page/Jomo-and-Charmaine-logo.png",
        "description": "Marriage counseling ministry led by Dr. Jomo and Dr. Charmaine Cousins, Senior Pastors helping couples thrive together through faith-based counseling and relationship coaching.",
        "founder": [
          {
            "@type": "Person",
            "name": "Dr. Jomo Cousins",
            "jobTitle": "Senior Pastor & Marriage Counselor",
            "url": "https://www.jomocousins.com/jomo-and-charmaine/about"
          },
          {
            "@type": "Person",
            "name": "Dr. Charmaine Cousins",
            "jobTitle": "Senior Pastor & Marriage Counselor",
            "url": "https://www.jomocousins.com/jomo-and-charmaine/about"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riverview",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        "areaServed": ["Tampa Bay", "Riverview", "Florida"],
        "sameAs": [
          "https://www.facebook.com/JomoAndCharmaine",
          "https://www.instagram.com/jomoandcharmaine_",
          "https://www.youtube.com/jomocharmaine",
          "https://twitter.com/JomoCharmaine"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.jomocousins.com/jomo-and-charmaine/#service",
        "name": "Jomo & Charmaine Marriage Counseling",
        "description": "Faith-based marriage counseling and relationship coaching by experienced Senior Pastors",
        "provider": {
          "@id": "https://www.jomocousins.com/jomo-and-charmaine/#organization"
        },
        "serviceType": [
          "Marriage Counseling",
          "Pastoral Counseling",
          "Premarital Counseling",
          "Relationship Coaching",
          "Christian Counseling",
          "Couples Ministry"
        ],
        "areaServed": {
          "@type": "City",
          "name": "Riverview",
          "containedIn": {
            "@type": "State",
            "name": "Florida"
          }
        }
      }
    ]
  };

  return (
    <div className="bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */ }
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px]">
        {/* Background Image */ }
        <Image
          src="/images/jomo-and-charmaine/contact/contact-hero.jpg"
          alt="Jomo and Charmaine Cousins"
          fill
          className="object-cover object-top"
          priority
          quality={ 100 }
        />

        {/* Dark Overlay for text readability */ }
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */ }
        <div className="relative flex h-full items-center">
          <div className="container mx-auto px-5">
            <div className="max-w-2xl">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Helping You Achieve Better Relationships
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-white md:text-xl">
                We show you how you can learn more about one another and have a better relationship through our counseling services.
              </p>
              <Link
                href="#contact"
                className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
              >
                Schedule an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */ }
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
              Love, Laugh & Learn
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              At the core of what we live and teach is 'Love, Laugh & Learn.' These three pillars are integral to our relationship and something we try to incorporate daily.
            </p>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {/* Love */ }
            <div className="bg-gray-50 p-12 text-center">
              <div className="mb-8 flex justify-center">
                <svg className="h-16 w-16 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-[#303030]">Love</h3>
              <p className="text-gray-600 leading-relaxed">
                Love is an act of will. It's a choice we make, moment by moment, to put our partner's needs above our own.
              </p>
            </div>

            {/* Laugh */ }
            <div className="bg-[#ea8125] p-12 text-center shadow-2xl relative z-10 transform md:scale-105">
              <div className="mb-8 flex justify-center">
                <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-white">Laugh</h3>
              <p className="text-white leading-relaxed">
                Laughter, outside of just being plain fun, helps to build trust and intimacy. When we laugh with someone, we are sharing a special moment that creates a bond between us.
              </p>
            </div>

            {/* Learn */ }
            <div className="bg-gray-50 p-12 text-center">
              <div className="mb-8 flex justify-center">
                <svg className="h-16 w-16 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-[#303030]">Learn</h3>
              <p className="text-gray-600 leading-relaxed">
                When you stop learning about your partner and how to be a better partner for them, it's easy to take them for granted and start taking the relationship for granted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story of US Section */ }
      <section className="relative bg-white">
        <div className="relative w-full">
          <Image
            src="/images/jomo-and-charmaine/main-page/The-Story-of-Us-7.png"
            alt="The Story of Us - Jomo and Charmaine"
            width={ 1920 }
            height={ 400 }
            className="w-full h-auto"
            quality={ 100 }
          />
        </div>
      </section>

      {/* About Us Section */ }
      <section className="bg-gray-50 pt-20 md:pt-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left Image */ }
            <div className="relative">
              <Image
                src="/images/jomo-and-charmaine/main-page/Cousins-Together-Main-page.png"
                alt="Drs. Jomo and Charmaine Cousins"
                width={ 600 }
                height={ 700 }
                className="w-full h-auto"
                quality={ 100 }
              />
            </div>

            {/* Right Content */ }
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#ea8125]"></div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
                  How Can We Help You?
                </p>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-[#303030] md:text-4xl lg:text-5xl">
                We are Drs. Jomo & Charmaine Cousins
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                We've been married for 24 years and have three lovely children. Our goal is to create a community of people who aspire to enjoy life together as a couple. With a strong foundation in Christ, we hope to inspire and motivate those who may need a little guidance on their journey.
              </p>
              <Link
                href="/jomo-and-charmaine/about"
                className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */ }
      <section id="services" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Content */ }
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#ea8125]"></div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
                  Best Support
                </p>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-[#303030] md:text-4xl lg:text-5xl">
                Our Service and Support
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Are you ready to improve your overall relationship quality? We provide you with a safe and non-judgmental environment in which you will learn to reduce and manage stress, set goals, and create a plan to achieve them.
              </p>
              <div>
                <Link
                  href="#contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Request an Appointment
                </Link>
              </div>
            </div>

            {/* Right - Service Cards Grid */ }
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Sessions */ }
              <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <svg className="h-12 w-12 text-[#c17a54]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#303030]">Personal Sessions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ideal for those that may not be ready to speak as a couple.
                </p>
              </div>

              {/* Relationship Assessments */ }
              <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <svg className="h-12 w-12 text-[#c17a54]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#303030]">Relationship Assessments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get a pulse on where you are as a couple so you know where you are starting from and where you'd like to go.
                </p>
              </div>

              {/* Family Session */ }
              <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <svg className="h-12 w-12 text-[#c17a54]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#303030]">Family Session</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our family sessions get everyone talking about how relationships impact the whole family.
                </p>
              </div>

              {/* Life & Financial Planning */ }
              <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <svg className="h-12 w-12 text-[#c17a54]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#303030]">Life & Financial Planning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Combining your lives together can naturally cause conflict. Learn some tips for how to plan effectively as a unit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books/Products Section */ }
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="space-y-16">
            {/* The Mechanics of Marriage */ }
            <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
              <div className="relative">
                <Image
                  src="/images/jomo-and-charmaine/main-page/reading-marriage-book.jpg"
                  alt="The Mechanics of Marriage"
                  width={ 600 }
                  height={ 500 }
                  className="w-full h-auto"
                  quality={ 100 }
                />
              </div>
              <div>
                <h3 className="mb-4 text-3xl font-bold text-[#303030] md:text-4xl">
                  The Mechanics of Marriage
                </h3>
                <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                  Are you ready to hit the gas pedal on reaching the marriage of your dreams? It's full speed ahead once you learn the mechanics of marriage!
                </p>
                <a
                  href="#"
                  className="inline-block rounded-lg bg-[#ea8125] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Get Your Copy Today
                </a>
              </div>
            </div>

            {/* Transform Your Mind Transform Your Marriage */ }
            <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
              <div className="relative">
                <Image
                  src="/images/jomo-and-charmaine/main-page/tym-book.jpg"
                  alt="Transform Your Mind Transform Your Marriage"
                  width={ 600 }
                  height={ 500 }
                  className="w-full h-auto"
                  quality={ 100 }
                />
              </div>
              <div>
                <h3 className="mb-4 text-3xl font-bold text-[#303030] md:text-4xl">
                  Transform Your Mind Transform Your Marriage
                </h3>
                <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                  Allow your marriage to be transformed by the renewing of your mind.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-lg bg-[#ea8125] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Get Your Copy Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */ }
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-[#ea8125]"></div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
              Our Services
            </p>
          </div>
          <p className="mb-12 text-lg text-gray-600 max-w-2xl">
            No matter what you and your partner may be dealing with, we are here to help.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Communication Issues */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/communication.jpg"
                  alt="Communication Issues"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Communication Issues</h3>
            </div>

            {/* Premarital Counseling */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/pre-marriage.jpg"
                  alt="Premarital Counseling"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Premarital Counseling</h3>
            </div>

            {/* Sexual Issues */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/sexual-issues.jpg"
                  alt="Sexual Issues"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Sexual Issues</h3>
            </div>

            {/* Infidelity & Unfaithfulness */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/cheating.jpg"
                  alt="Infidelity & Unfaithfulness"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Infidelity & Unfaithfulness</h3>
            </div>

            {/* Trust Issues */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/trust.jpg"
                  alt="Trust Issues"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Trust Issues</h3>
            </div>

            {/* Blended Family Support */ }
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden">
                <Image
                  src="/images/jomo-and-charmaine/main-page/blended-family.jpg"
                  alt="Blended Family Support"
                  width={ 800 }
                  height={ 800 }
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  quality={ 100 }
                />
              </div>
              <h3 className="text-xl font-bold text-[#303030] text-center">Blended Family Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */ }
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
              Resources for Your Relationship
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our goal is to equip you with all the tools and guidance necessary to maintain a healthy, strong relationship.
            </p>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {/* Podcast */ }
            <div className="bg-gray-50 p-12 text-center flex flex-col items-center justify-between min-h-[400px]">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-8">
                  <svg className="h-16 w-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                  </svg>
                </div>
                <h3 className="mb-6 text-2xl font-bold text-[#303030]">Podcast</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Listen to Relationship Tips & Advice on Jomo & Charmaine Podcast.
                </p>
              </div>
              <a href="#" className="text-sm font-bold uppercase tracking-wider text-[#ea8125] border-b-2 border-[#ea8125] hover:opacity-80">
                Listen Now
              </a>
            </div>

            {/* YouTube */ }
            <div className="bg-[#ea8125] p-12 text-center flex flex-col items-center justify-between min-h-[400px] shadow-2xl relative z-10 transform md:scale-105">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-8">
                  <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                  </svg>
                </div>
                <h3 className="mb-6 text-2xl font-bold text-white">YouTube</h3>
                <p className="text-white leading-relaxed mb-8">
                  Our channel will provide you with relationship advice, marriage tools, and dating goals for the modern couple.
                </p>
              </div>
              <a href="#" className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-white hover:opacity-80">
                Watch Now
              </a>
            </div>

            {/* Couples' Corner */ }
            <div className="bg-gray-50 p-12 text-center flex flex-col items-center justify-between min-h-[400px]">
              <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="mb-6 text-2xl font-bold text-[#303030] mt-16">Couples' Corner</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  From dating ideas, to prayers for your marriage, get tips and resources that will help strengthen your bond.
                </p>
              </div>
              <Link href="/jomo-and-charmaine/couples-corner" className="text-sm font-bold uppercase tracking-wider text-[#ea8125] border-b-2 border-[#ea8125] hover:opacity-80">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation Starters Section */ }
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left - eBook Image */ }
            <div className="relative flex justify-center">
              <Image
                src="/images/jomo-and-charmaine/main-page/conversation-staters.png"
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

      {/* Testimonials Section */ }
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-[#ea8125]"></div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
              Testimonials
            </p>
            <div className="h-[2px] w-12 bg-[#ea8125]"></div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
              A Community of Satisfied Couples
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              It's an honor to see those we've counseled benefit from our sessions and most importantly that they are able to restore their relationships.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */ }
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-6">
                <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Jomo and Charmaine just have an innate ability to relate to others. They were honest and transparent and shared a lot about struggles they've had and how they navigated through those situations.
              </p>
              <div className="mb-6 flex justify-center gap-1">
                { [ ...Array(5) ].map((_, i) => (
                  <svg key={ i } className="h-5 w-5 text-[#ea8125]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )) }
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200"></div>
                <p className="font-bold text-[#303030]">B. & F. Simmons</p>
              </div>
            </div>

            {/* Testimonial 2 */ }
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-6">
                <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="mb-6 text-gray-600 leading-relaxed">
                I was ready to give up. After learning my husband cheated, I was broken and didn't think we could come back from that pain. After speaking first individually with both Drs. Jomo and Charmaine, we eventually were able to start sessions together and work through our issues. I owe the health of my marriage to the Cousins.
              </p>
              <div className="mb-6 flex justify-center gap-1">
                { [ ...Array(5) ].map((_, i) => (
                  <svg key={ i } className="h-5 w-5 text-[#ea8125]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )) }
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200"></div>
                <p className="font-bold text-[#303030]">J. and W. Brushier</p>
              </div>
            </div>

            {/* Testimonial 3 */ }
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-6">
                <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="mb-6 text-gray-600 leading-relaxed">
                After following Dr. Jomo and Charmaine for a while on YouTube, I wanted to get tips for how I could be a better wife for my husband. Charmaine was so supportive and offered such great tips and ideas that I've implemented in my marriage. Thank you, Dr. Charmaine.
              </p>
              <div className="mb-6 flex justify-center gap-1">
                { [ ...Array(5) ].map((_, i) => (
                  <svg key={ i } className="h-5 w-5 text-[#ea8125]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )) }
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200"></div>
                <p className="font-bold text-[#303030]">M. McKenny</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */ }
      <section id="contact" className="bg-gradient-to-r from-[#ea8125] to-[#ffaa62] py-20 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Transform Your Relationship?
            </h2>
            <p className="mb-10 text-xl">
              Take the first step toward a stronger, healthier relationship today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="inline-block rounded-lg bg-white px-12 py-4 font-bold text-[#ea8125] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                Request an Appointment
              </a>
              <a
                href="#"
                className="inline-block rounded-lg border-2 border-white px-12 py-4 font-bold shadow-lg transition-all hover:bg-white hover:text-[#ea8125] hover:shadow-xl"
              >
                Download Free eBook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "Marriage Counseling & Relationship Coaching",
  description: "Drs. Jomo & Charmaine Cousins help couples thrive together through faith-based marriage counseling. Senior Pastors with 24 years of marriage, serving 1,000+ couples at Love First Christian Center. Expert guidance for communication, intimacy, trust, infidelity, and blended families.",
  alternates: {
    canonical: "https://www.jomocousins.com/jomo-and-charmaine",
  },
  openGraph: {
    type: "website",
    siteName: "Dr. Jomo Cousins",
    title: "Jomo & Charmaine - Marriage Counseling Ministry",
    description: "Senior Pastors helping couples build stronger marriages. 24 years married, 1,000+ couples counseled.",
    url: "https://www.jomocousins.com/jomo-and-charmaine",
    images: [
      {
        url: "/images/jomo-and-charmaine/main-page/Cousins-Together-Main-page.png",
        width: 1200,
        height: 630,
        alt: "Dr. Jomo and Dr. Charmaine Cousins - Marriage Counseling Pastors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jomo & Charmaine - Marriage Counseling Ministry",
    description: "Senior Pastors helping couples build stronger marriages. 24 years married, 1,000+ couples counseled.",
    images: ["/images/jomo-and-charmaine/main-page/Cousins-Together-Main-page.png"],
  },
};
