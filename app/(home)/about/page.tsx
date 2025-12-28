import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Jomo Cousins | NFL Veteran, Pastor & Motivational Speaker",
  description: "Meet Dr. Jomo Cousins: NFL defensive end turned pastor, motivational speaker, and cancer survivor. Founder of Love First Christian Center and creator of The Gap success formula.",
  keywords: [
    "Dr. Jomo Cousins biography",
    "NFL player pastor",
    "motivational speaker Tampa",
    "cancer survivor speaker",
    "Love First Christian Center founder",
    "Florida A&M University alumni",
    "Arizona Cardinals alumni",
    "New York Giants alumni",
    "The Gap success formula",
    "retired NFL speaker",
    "Christian motivational speaker",
    "corporate speaker Tampa Florida"
  ],
  alternates: {
    canonical: "https://www.jomocousins.com/about",
  },
  openGraph: {
    title: "About Dr. Jomo Cousins | NFL Veteran, Pastor & Cancer Survivor",
    description: "From NFL defensive end to pastor and motivational speaker. Dr. Jomo Cousins inspires transformation through faith, perseverance, and The Gap success formula.",
    url: "https://www.jomocousins.com/about",
    type: "profile",
    siteName: "Dr. Jomo Cousins",
    images: [
      {
        url: "/images/jc-color-pics/aboutProfilePictures.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Jomo Cousins - Motivational Speaker and Pastor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Jomo Cousins | NFL Veteran & Motivational Speaker",
    description: "From NFL to ministry: Dr. Jomo Cousins' inspiring journey of faith, resilience, and transformation.",
    creator: "@pastorjomo",
    images: ["/images/jc-color-pics/aboutProfilePictures.jpg"],
  },
};

export default function AboutPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.jomocousins.com/#jomo",
    name: "Dr. Jomo Cousins",
    alternateName: "Jomo Cousins",
    description: "NFL veteran, pastor, motivational speaker, author, and cancer survivor. Founder of Love First Christian Center.",
    url: "https://www.jomocousins.com",
    image: "https://www.jomocousins.com/images/jc-color-pics/aboutProfilePictures.jpg",
    jobTitle: ["Pastor", "Motivational Speaker", "Author", "Business Coach"],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Motivational Speaker",
        occupationLocation: {
          "@type": "City",
          name: "Tampa, Florida"
        }
      },
      {
        "@type": "Occupation",
        name: "Pastor",
        occupationLocation: {
          "@type": "Place",
          name: "Love First Christian Center"
        }
      }
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Florida A&M University"
      },
      {
        "@type": "EducationalOrganization",
        name: "Tabernacle Bible College",
        degree: "PhD"
      }
    ],
    memberOf: [
      {
        "@type": "SportsTeam",
        name: "Arizona Cardinals",
        sport: "American Football"
      },
      {
        "@type": "SportsTeam",
        name: "New York Giants",
        sport: "American Football"
      }
    ],
    founder: {
      "@type": "Organization",
      name: "Love First Christian Center",
      url: "https://www.lfcc.tv"
    },
    spouse: {
      "@type": "Person",
      name: "Dr. Charmaine Cousins"
    },
    sameAs: [
      "https://www.facebook.com/pastorjomo",
      "https://www.instagram.com/pastorjomo",
      "https://www.youtube.com/@PASTORJOMO",
      "https://twitter.com/pastorjomo"
    ],
    award: "NFL Defensive End (Retired)",
    knowsAbout: [
      "Motivational Speaking",
      "Financial Literacy",
      "Youth Development",
      "Spiritual Leadership",
      "Cancer Survival",
      "The Gap Success Formula"
    ]
  };

  return (
    <div className="bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - Screenshot 1 */ }
      <section className="relative overflow-hidden pt-0 md:pt-20">
        {/* Background Image */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/aboutBackground.jpg"
            alt="About Background"
            fill
            className="object-cover"
            priority
          />
          {/* Light overlay for readability */ }
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        {/* Content */ }
        <div className="relative container mx-auto px-5">
          <div className="grid md:grid-cols-2">
            {/* Left side - Text */ }
            <div className="flex items-center min-h-[400px] md:min-h-[650px] py-8 md:py-0">
              <div className="text-center md:text-left">
                {/* Red icon */ }
                <div className="mb-4 flex justify-center md:justify-start">
                  <svg className="w-12 h-12 text-[#e31e24]" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-[#2d2d2d] mb-6">
                  ABOUT
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The esteemed Dr. Cousins is the Founder and senior pastor of <Link href='https://www.lfcc.tv'>Love First Christian Center</Link> in Riverview, FL. He is an accomplished author and contributing benefactor.
                </p>
              </div>
            </div>

            {/* Right side - Hero Image */ }
            <div className="relative h-[500px] md:h-[650px] flex items-end">
              <Image
                src="/images/jc-png/aboutHeroJomo.png"
                alt="Dr. Jomo Cousins"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section - Screenshot 2 */ }
      <section className="bg-[#141414] py-10">
        <div className="grid md:grid-cols-2 gap-0 md:min-h-screen">
          {/* Left side - Large Portrait */ }
          <div className="relative h-[500px] md:h-auto bg-[#141414]">
            <Image
              src="/images/jc-color-pics/aboutProfilePictures.jpg"
              alt="Dr. Jomo Cousins Portrait"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Right side - Bio Text */ }
          <div className="bg-[#141414] p-8 md:p-16 flex flex-col justify-center">
            {/* Red Logo */ }
            <div className="mb-8 flex justify-center">
              <div className="relative w-24 h-24">
                <Image
                  src="/images/logos/JomoCousins Logo15.png"
                  alt="Dr. Jomo Cousins Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Name */ }
            <h2 className="text-center mb-8">
              <div className="text-sm tracking-widest text-gray-400 mb-2">DR.</div>
              <div className="text-4xl md:text-5xl font-bold text-[#e31e24]">JOMO</div>
              <div className="text-sm tracking-widest text-gray-400 mt-2">COUSINS</div>
            </h2>

            {/* Bio Text */ }
            <div className="space-y-6 text-white leading-relaxed">
              <p>
                The esteemed Dr. Cousins is the Founder and senior pastor of <Link href='https://www.lfcc.tv'>Love First Christian Center</Link> in Riverview, FL. He is an accomplished author and contributing benefactor and producer of the critically acclaimed movie, "A Question of Faith." Leveraging his nationally recognized status as a retired NFL defensive end for the Arizona Cardinals and the New York Giants, he has extended his reach within the community through self-motivation seminars, presentation competencies, youth partnership programs, and financial wealth symposiums.
              </p>
              <p>
                Dr. Cousins is an alumnus of Florida A&M University where his motivational speaking journey began, encouraging high school students to seek a higher education. He was the first generation in his family to go to college. Dr. Cousins went on to earn his PhD from Tabernacle Bible College.
              </p>
              <p>
                Included in his accolades is his creation of The Gap (The Guaranteed Achievable Plan), a formula derived to achieve unlimited success and capital gain. Of all his accolades and accomplishments, Dr. Cousins is most proud of his first ministry, his marriage to Dr. Charmaine and their beautiful children Jomo, Jamya, and Josiah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Screenshot 3 */ }
      <section>
        {/* Top - White background */ }
        <div className="bg-white py-16">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-[#e31e24]">SERV</span>
              <span className="text-[#2d2d2d]">ICES</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Leaving audiences inspired and ready to achieve.
            </p>
          </div>
        </div>

        {/* Bottom - Black background */ }
        <div className="bg-black py-20 md:py-32">
          <div className="container mx-auto px-5">
            <h3 className="text-white text-4xl md:text-5xl font-bold text-center mb-4">
              BOOK DR. COUSINS
            </h3>
            <div className="w-24 h-1 bg-white mx-auto mb-16"></div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Motivational Speaking */ }
              <div className="text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/jc-png/_JC_NewPhotos Edit358_BW.png"
                    alt="Motivational Speaking"
                    fill
                    className="object-cover object-top"
                    quality={ 100 }
                  />
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">
                  Motivational<br />Speaking
                </h4>
                <p className="text-gray-300">
                  Get inspired to keep life I.R.I.E., and learn the action steps needed to take your life to the next level.
                </p>
              </div>

              {/* Financial Seminars */ }
              <div className="text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/jc-png/_JC_NewPhotos Edit334_BW.png"
                    alt="Financial Seminars"
                    fill
                    className="object-cover object-top"
                    quality={ 100 }
                  />
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">
                  Financial<br />Seminars
                </h4>
                <p className="text-gray-300">
                  Unlock your potential with financial literacy and financial discipline tips from Dr. Cousins.
                </p>
              </div>

              {/* Youth Programs */ }
              <div className="text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/jc-png/_JC_NewPhotos Edit414_edited.png"
                    alt="Youth Programs"
                    fill
                    className="object-cover object-top"
                    quality={ 100 }
                  />
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">
                  Youth<br />Programs
                </h4>
                <p className="text-gray-300">
                  The future is already here. Set your youth up for limitless success in all aspects of their life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survivor Section - Screenshot 4 */ }
      <section className="py-20 md:py-32 relative">
        {/* Background Image - Fixed on desktop */ }
        <div className="absolute inset-0 bg-cover bg-top bg-fixed" style={{ backgroundImage: "url('/images/jc-color-pics/JC_NewPhotos Edit623_edited.jpg')" }}></div>
        {/* Dark overlay for text readability */ }
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80"></div>

        <div className="container mx-auto px-5 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Title */ }
            <h2 className="text-center text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gray-400">SURV</span>
              <span className="text-blue-500">IVOR</span>
            </h2>

            {/* Bible Verse Box */ }
            <div className="bg-blue-500 text-white px-8 py-4 mb-12 max-w-3xl mx-auto text-center">
              <p className="text-md md:text-base">
                "For this light momentary affliction is preparing for us an eternal weight of glory beyond all comparison."
                <br />
                <span className="font-bold">2 Corinthians 4:17</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thriving After Cancer Section - Screenshot 5 */ }
      <section className="bg-gradient-to-br from-gray-700 to-gray-800 pt-20 md:pt-32 relative overflow-hidden">
        <div className="container mx-auto px-5 relative">
          <div className="max-w-6xl mx-auto relative min-h-[60vh] md:min-h-[760px]">

            {/* Text Content */ }
            <div className="relative max-w-xl pt-8 pb-[400px] md:pb-0 z-0 md:z-30">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-gray-300">THRIVING AFTER</span>
                <br />
                <span className="text-blue-500 text-5xl md:text-6xl">
                  CANCER
                </span>
              </h2>

              <p className="text-white leading-relaxed text-lg mb-12">
                Dr. Cousins was diagnosed with colon cancer in 2014. During those
                trying times, he kept his faith and commitment to God's people,
                fighting every day to spread inspiration. Dr. Cousins is now
                cancer-free by the grace of God. Life is precious, and it's never
                too soon to unlock the power of your potential!
              </p>
            </div>

            {/* Ribbon – Bottom Background */ }
            <div className="absolute bottom-16 md:bottom-[-100px] left-1/2 -translate-x-1/2 w-[220%] md:w-[170%] h-[25vh] md:h-[600px] z-10 pointer-events-none">
              <Image
                src="/images/icons/Jomo Cancer_03.png"
                alt="Cancer Awareness Ribbon"
                fill
                priority
                className="object-contain object-center-bottom"
              />
            </div>

            {/* Foreground Image – Dr. Cousins */ }
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 w-[72%] md:w-[46%] h-[50vh] md:h-[700px] z-20 drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/jc-png/_JC_NewPhotos Edit515_edited.png"
                alt="Dr. Jomo Cousins - Cancer Free"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 45vw"
                className="object-contain object-bottom"
              />
            </div>

          </div>
        </div>
      </section>




      {/* CTA Section */ }
      <section className="bg-[#3d3d3d] py-20 text-white md:py-32">
        <div className="container mx-auto px-5">
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
        </div>
      </section>
    </div>
  );
}
