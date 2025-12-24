import Image from "next/image";
import Link from "next/link";

export default function JomoAndCharmainePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
                Helping You Achieve{" "}
                <span className="text-[#ea8125]">Better Relationships</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                We help couples develop better habits and achieve healthy,
                long-lasting relationships through counseling, coaching, and
                proven strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Request an Appointment
                </Link>
                <Link
                  href="#services"
                  className="inline-block rounded-lg border-2 border-[#0E6BB7] px-8 py-4 font-bold text-[#0E6BB7] transition-all hover:bg-[#0E6BB7] hover:text-white"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] md:h-[500px]">
              {/* Placeholder for couple image */}
              <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffaa62] to-[#ea8125]">
                <p className="text-2xl font-bold text-white">
                  Jomo & Charmaine Photo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#303030] md:text-5xl">
              Our Three Pillars
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The foundation of every successful relationship
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Love */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FAFCFE] to-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ea8125]">
                  <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">Love</h3>
              <p className="text-gray-700">
                Love is a choice, not just a feeling. We help you build a
                partnership based on commitment, respect, and intentional actions.
              </p>
            </div>

            {/* Laugh */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FAFCFE] to-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0E6BB7]">
                  <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">Laugh</h3>
              <p className="text-gray-700">
                Joy and trust are essential. We help you build intimacy and
                connection through shared experiences and genuine communication.
              </p>
            </div>

            {/* Learn */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FAFCFE] to-white p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffaa62]">
                  <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#303030]">Learn</h3>
              <p className="text-gray-700">
                Growth never stops. We provide tools and strategies for continuous
                improvement in your relationship journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Image */}
            <div className="relative h-[500px]">
              {/* Placeholder for doctors image */}
              <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#0E6BB7] to-[#0a5691]">
                <p className="text-2xl font-bold text-white">
                  The Doctors Photo
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
                Meet Dr. Jomo & Dr. Charmaine
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Jomo and Dr. Charmaine Cousins are licensed marriage and
                  family therapists dedicated to helping couples build stronger,
                  healthier relationships.
                </p>
                <p>
                  With years of experience in couples counseling and a passion
                  for helping relationships thrive, they combine clinical expertise
                  with practical, faith-based strategies.
                </p>
                <p>
                  Through their counseling practice, podcast, and resources, they've
                  helped countless couples overcome challenges and rediscover the
                  joy in their relationships.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Work With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#303030] md:text-5xl">
              How We Can <span className="text-[#ea8125]">Help You</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Specialized counseling and coaching for every stage of your relationship
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Communication Issues */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#ea8125]/10">
                <svg className="h-6 w-6 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Communication Issues</h3>
              <p className="text-gray-600">
                Learn effective communication strategies to express needs, resolve conflicts,
                and strengthen your connection.
              </p>
            </div>

            {/* Premarital Counseling */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0E6BB7]/10">
                <svg className="h-6 w-6 text-[#0E6BB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Premarital Counseling</h3>
              <p className="text-gray-600">
                Build a strong foundation for your marriage with guidance on expectations,
                finances, and conflict resolution.
              </p>
            </div>

            {/* Trust & Infidelity */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#ffaa62]/10">
                <svg className="h-6 w-6 text-[#ffaa62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Trust & Infidelity Recovery</h3>
              <p className="text-gray-600">
                Navigate the path to healing and restoration after betrayal with
                compassionate, structured support.
              </p>
            </div>

            {/* Sexual Issues */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#ea8125]/10">
                <svg className="h-6 w-6 text-[#ea8125]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Sexual Intimacy</h3>
              <p className="text-gray-600">
                Address intimacy concerns and rebuild physical connection in a safe,
                judgment-free environment.
              </p>
            </div>

            {/* Blended Families */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0E6BB7]/10">
                <svg className="h-6 w-6 text-[#0E6BB7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Blended Family Support</h3>
              <p className="text-gray-600">
                Navigate the unique challenges of blended families with strategies
                for harmony and unity.
              </p>
            </div>

            {/* General Counseling */}
            <div className="rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#ffaa62]/10">
                <svg className="h-6 w-6 text-[#ffaa62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#303030]">Relationship Enrichment</h3>
              <p className="text-gray-600">
                Strengthen a healthy relationship and take it to the next level with
                proactive strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
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
            {/* Podcast */}
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

            {/* YouTube */}
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

            {/* Blog */}
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

      {/* CTA Section */}
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
