import Image from "next/image";
import Link from "next/link";

export default function JomoAndCharmainePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */ }
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px]">
        {/* Background Image */ }
        <Image
          src="/images/jomo-and-charmaine/contact/contact-hero.jpg"
          alt="Jomo and Charmaine Cousins"
          fill
          className="object-cover object-top"
          priority
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
            <div className="bg-[#ea8125] p-12 text-center">
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
                className="inline-block bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#d67320]"
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
                  className="inline-block bg-[#ea8125] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#d67320]"
                >
                  Request an Appointment
                </Link>
              </div>
            </div>

            {/* Right - Service Cards Grid */ }
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Sessions */ }
              <div className="rounded-lg bg-white p-8 shadow-md border border-gray-100">
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
              <div className="rounded-lg bg-white p-8 shadow-md border border-gray-100">
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
              <div className="rounded-lg bg-white p-8 shadow-md border border-gray-100">
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
              <div className="rounded-lg bg-white p-8 shadow-md border border-gray-100">
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

      {/* Resources Section */ }
      <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#303030] md:text-5xl">
              Resources & <span className="text-[#ea8125]">Products</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Tools to strengthen your relationship journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Podcast */ }
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ea8125]">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">Podcast</h3>
              <p className="mb-6 text-gray-700">
                Listen to real conversations about relationships, faith, and growth.
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-[#ea8125] px-6 py-3 font-bold text-white transition-all hover:bg-[#d67320]"
              >
                Listen Now
              </a>
            </div>

            {/* YouTube */ }
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0E6BB7]">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">YouTube Channel</h3>
              <p className="mb-6 text-gray-700">
                Watch practical tips and advice for building better relationships.
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-[#0E6BB7] px-6 py-3 font-bold text-white transition-all hover:bg-[#0a5691]"
              >
                Watch Now
              </a>
            </div>

            {/* Blog */ }
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffaa62]">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">Couples' Corner Blog</h3>
              <p className="mb-6 text-gray-700">
                Read articles and insights on relationship topics that matter.
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-[#ffaa62] px-6 py-3 font-bold text-white transition-all hover:bg-[#ea8125]"
              >
                Read More
              </a>
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
                className="inline-block rounded-lg bg-white px-12 py-4 font-bold text-[#ea8125] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Request an Appointment
              </a>
              <a
                href="#"
                className="inline-block rounded-lg border-2 border-white px-12 py-4 font-bold transition-all hover:bg-white hover:text-[#ea8125]"
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
  title: "Jomo & Charmaine - Couples Counseling & Relationship Coaching",
  description: "Helping couples achieve better relationships through counseling, coaching, and proven strategies. Expert marriage and family therapists.",
};
