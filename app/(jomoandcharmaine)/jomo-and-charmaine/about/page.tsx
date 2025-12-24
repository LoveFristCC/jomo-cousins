import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
                About Drs. Jomo &{" "}
                <span className="text-[#ea8125]">Charmaine Cousins</span>
              </h1>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Jomo and Dr. Charmaine Cousins are the Senior Pastors of Love First
                  Christian Center in Riverview, FL. Together, they have been married for
                  24 years and are blessed with three beautiful children.
                </p>
                <p>
                  Their passion is to help couples thrive in their relationships and create
                  a community of people who aspire to enjoy life together. Through their
                  counseling practice, they've helped over 1,000 couples build stronger,
                  healthier relationships.
                </p>
                <p>
                  With extensive training in marriage and family therapy, they bring both
                  clinical expertise and personal experience to every counseling session.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/jomo-and-charmaine/contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Request an Appointment
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[500px]">
              {/* Placeholder for couple image */}
              <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffaa62] to-[#ea8125]">
                <p className="text-2xl font-bold text-white">
                  Couple Photo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#303030] md:text-5xl">
              Helping Couples <span className="text-[#ea8125]">Thrive as a Unit</span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                We understand that relationships face challenges. Whether you're struggling
                with communication, intimacy, trust, or other issues, we're here to help
                you navigate these difficulties together.
              </p>
              <p>
                Our approach combines clinical expertise with faith-based principles,
                providing you with practical tools and spiritual guidance to strengthen
                your relationship. We believe that every couple has the potential to not
                just survive, but truly thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-br from-[#FAFCFE] to-white py-20">
        <div className="container mx-auto px-5">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Couples Counseled */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ea8125]">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-[#ea8125]">1,000+</div>
              <div className="text-xl font-semibold text-[#303030]">Couples Counseled</div>
            </div>

            {/* Years of Marriage */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0E6BB7]">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-[#0E6BB7]">24</div>
              <div className="text-xl font-semibold text-[#303030]">Years of Marriage</div>
            </div>

            {/* Conferences & Seminars */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ffaa62]">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-[#ffaa62]">200+</div>
              <div className="text-xl font-semibold text-[#303030]">Conferences & Seminars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#303030] md:text-5xl">
              Areas of <span className="text-[#ea8125]">Expertise</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We provide specialized counseling for various relationship challenges
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Communication Issues */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ea8125]/10 transition-all group-hover:bg-[#ea8125]">
                <svg className="h-8 w-8 text-[#ea8125] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Communication Issues</h3>
              <p className="text-gray-600">
                Learn to express yourself clearly and listen actively to strengthen your connection.
              </p>
            </div>

            {/* Premarital Counseling */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0E6BB7]/10 transition-all group-hover:bg-[#0E6BB7]">
                <svg className="h-8 w-8 text-[#0E6BB7] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Premarital Counseling</h3>
              <p className="text-gray-600">
                Prepare for marriage with guidance on expectations, finances, and communication.
              </p>
            </div>

            {/* Sexual Issues */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffaa62]/10 transition-all group-hover:bg-[#ffaa62]">
                <svg className="h-8 w-8 text-[#ffaa62] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Sexual Issues</h3>
              <p className="text-gray-600">
                Address intimacy concerns in a safe, professional, judgment-free environment.
              </p>
            </div>

            {/* Infidelity & Unfaithfulness */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ea8125]/10 transition-all group-hover:bg-[#ea8125]">
                <svg className="h-8 w-8 text-[#ea8125] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Infidelity & Unfaithfulness</h3>
              <p className="text-gray-600">
                Navigate the path to healing and restoration with compassionate support.
              </p>
            </div>

            {/* Trust Issues */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0E6BB7]/10 transition-all group-hover:bg-[#0E6BB7]">
                <svg className="h-8 w-8 text-[#0E6BB7] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Trust Issues</h3>
              <p className="text-gray-600">
                Rebuild trust and security in your relationship through proven strategies.
              </p>
            </div>

            {/* Blended Family Support */}
            <div className="group rounded-xl border-2 border-gray-100 p-8 transition-all hover:border-[#ea8125] hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffaa62]/10 transition-all group-hover:bg-[#ffaa62]">
                <svg className="h-8 w-8 text-[#ffaa62] transition-all group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#303030]">Blended Family Support</h3>
              <p className="text-gray-600">
                Navigate the unique dynamics of blended families with expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#ea8125] to-[#ffaa62] py-20 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-10 text-xl">
              Let's work together to build the relationship you've always wanted.
            </p>
            <Link
              href="/jomo-and-charmaine/contact"
              className="inline-block rounded-lg bg-white px-12 py-4 font-bold text-[#ea8125] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Request an Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "About Drs. Jomo & Charmaine Cousins - Marriage & Family Therapists",
  description: "Learn about Dr. Jomo and Dr. Charmaine Cousins, licensed marriage and family therapists with 24 years of marriage experience and over 1,000 couples counseled.",
};
