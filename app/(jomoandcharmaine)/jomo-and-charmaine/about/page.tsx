import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */ }
      <section className="relative h-[600px] md:h-[500px]">
        {/* Background Image */ }
        <Image
          src="/images/jomo-and-charmaine/about/about-hero.jpg"
          alt="About Drs. Jomo and Charmaine Cousins"
          fill
          className="object-cover object-top"
          priority
          quality={ 100 }
        />

        {/* Dark Overlay for text readability */ }
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */ }
        <div className="relative flex h-full items-end pb-12">
          <div className="container mx-auto px-5">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl max-w-2xl">
              About Drs. Jomo & Charmaine Cousins
            </h1>
          </div>
        </div>
      </section>

      {/* About Us Section */ }
      <section className="bg-gray-50 pt-20 md:pt-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left Image */ }
            <div className="relative">
              <Image
                src="/images/jomo-and-charmaine/about/about-us.png"
                alt="Dr. Jomo and Dr. Charmaine Cousins"
                width={ 600 }
                height={ 700 }
                className="w-full h-auto"
                quality={ 100 }
              />
            </div>

            {/* Right Content */ }
            <div className="text-center md:text-left">
              <h2 className="mb-8 text-4xl font-bold text-[#303030] md:text-5xl">
                About Us
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                <p>
                  Dr. Jomo and Dr. Charmaine are Senior Pastors at Love First Christian Center in Riverview, FL. They have been married for 24 years and have three lovely children. Their goal is to create a community of people who aspire to enjoy life together as a couple. With a strong foundation in Christ, they hope to inspire and motivate those who may need a little guidance on their journey.
                </p>
                <p>
                  Jomo and Charmaine have had an amazing impact on not only the church family but also the community at large. They have dedicated their time and knowledge in order to support the growth of others. Get in touch today.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/jomo-and-charmaine/contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Request an Appointment
                </Link>
              </div>
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

      {/* Helping Couples Section */ }
      <section className="bg-[#4a4a4a] py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left Content */ }
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#ea8125]"></div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#ea8125]">
                  Ready to Support
                </p>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Helping Couples Thrive as a Unit
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-200">
                <p>
                  There are so many things life throws at you as a couple. It's important to cultivate and develop your relationship so you don't allow life to get in the way and cause division between you. They don't claim to be perfect, but their hope is that through sharing what they've experienced as a couple and what they've learned counseling 1000's of couples over the years is that they can offer tips and advice to help you and your partner thrive as a couple.
                </p>
                <p>
                  Whether you are experiencing challenges with communication, sex, trust, or just want to give your relationship some much needed attention to ensure you are both in a good place, let Jomo and Charmaine help.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/jomo-and-charmaine/contact"
                  className="inline-block rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl"
                >
                  Request an Appointment
                </Link>
              </div>
            </div>

            {/* Right Image */ }
            <div className="relative">
              <Image
                src="/images/jomo-and-charmaine/about/helping-couples.jpg"
                alt="Jomo and Charmaine helping couples"
                width={ 600 }
                height={ 700 }
                className="w-full h-auto"
                quality={ 100 }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */ }
      <section className="bg-gray-50 pt-20 md:pt-32">
        <div className="container mx-auto px-5">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left Image */ }
            <div className="relative">
              <Image
                src="/images/jomo-and-charmaine/about/why-choose-us.png"
                alt="Dr. Jomo and Dr. Charmaine Cousins"
                width={ 1000 }
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
                  Why Choose Us?
                </p>
              </div>
              <h2 className="mb-12 text-3xl font-bold text-[#303030] md:text-4xl lg:text-5xl">
                Relatable, Real and Ready to See You Succeed.
              </h2>

              <div className="space-y-10">
                {/* Couples Counseled */ }
                <div>
                  <div className="mb-2 text-5xl font-bold text-[#ea8125] md:text-6xl">1k</div>
                  <h3 className="mb-2 text-xl font-bold text-[#303030]">Couples Counseled</h3>
                  <p className="text-gray-600">Restoring relationships one couple at a time.</p>
                </div>

                {/* Years of Marriage */ }
                <div>
                  <div className="mb-2 text-5xl font-bold text-[#ea8125] md:text-6xl">24</div>
                  <h3 className="mb-2 text-xl font-bold text-[#303030]">Years of Marriage</h3>
                  <p className="text-gray-600">Sharing our experiences and what we've learned along the way.</p>
                </div>

                {/* Conferences & Seminars */ }
                <div>
                  <div className="mb-2 text-5xl font-bold text-[#ea8125] md:text-6xl">200+</div>
                  <h3 className="mb-2 text-xl font-bold text-[#303030]">Conferences & Seminars</h3>
                  <p className="text-gray-600">Relationship education and workshops to help couples learn the basics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */ }
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

      {/* CTA Section */ }
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
  title: "About Us - Senior Pastors & Marriage Counselors",
  description: "Meet Dr. Jomo and Dr. Charmaine Cousins, Senior Pastors at Love First Christian Center. Married 24 years with 3 children, they've counseled over 1,000 couples. Their ministry helps couples thrive together through faith-based relationship coaching, premarital counseling, and marriage counseling in Riverview, FL.",
  alternates: {
    canonical: "https://www.jomocousins.com/jomo-and-charmaine/about",
  },
  openGraph: {
    type: "website",
    siteName: "Dr. Jomo Cousins",
    title: "About Jomo & Charmaine - Senior Pastors & Marriage Counselors",
    description: "Senior Pastors at Love First Christian Center. 24 years married, 1,000+ couples counseled. Helping relationships thrive through faith-based ministry.",
    url: "https://www.jomocousins.com/jomo-and-charmaine/about",
    images: [
      {
        url: "/images/jomo-and-charmaine/about/about-us.png",
        width: 1200,
        height: 630,
        alt: "Dr. Jomo and Dr. Charmaine Cousins - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jomo & Charmaine - Senior Pastors & Marriage Counselors",
    description: "Senior Pastors at Love First Christian Center. 24 years married, 1,000+ couples counseled.",
    images: ["/images/jomo-and-charmaine/about/about-us.png"],
  },
};
