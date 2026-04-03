import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - NFL Veteran, Pastor & Speaker",
  description: "Dr. Jomo Cousins played for the NY Giants and Arizona Cardinals before founding Love First Christian Center. Cancer survivor, author, and speaker.",
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
    title: "About Dr. Jomo Cousins | NFL Veteran & Cancer Survivor",
    description: "Dr. Jomo Cousins played for the NY Giants and Arizona Cardinals, survived cancer, and founded Love First Christian Center in Tampa, FL.",
    url: "https://www.jomocousins.com/about",
    type: "profile",
    siteName: "Dr. Jomo Cousins",
    images: [
      {
        url: "/images/jc-color-pics/aboutProfilePictures.webp",
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
    site: "@pastorjomo",
    images: [ "/images/jc-color-pics/aboutProfilePictures.webp" ],
  },
};

export default function AboutPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.jomocousins.com/#person",
    name: "Dr. Jomo Cousins",
    alternateName: "Jomo Cousins",
    description: "NFL veteran, pastor, motivational speaker, author, and cancer survivor. Founder of Love First Christian Center.",
    url: "https://www.jomocousins.com",
    image: "https://www.jomocousins.com/images/jc-color-pics/aboutProfilePictures.webp",
    jobTitle: [ "Pastor", "Motivational Speaker", "Author", "Business Coach" ],
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
          "@type": "City",
          name: "Riverview",
          containedInPlace: {
            "@type": "State",
            name: "Florida"
          }
        }
      }
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Florida A&M University"
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Tabernacle Bible College"
      }
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "PhD",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Tabernacle Bible College"
      }
    },
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
    affiliation: {
      "@type": "Organization",
      name: "Love First Christian Center",
      url: "https://www.lfcc.tv"
    },
    worksFor: {
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
      "https://twitter.com/pastorjomo",
      "https://www.linkedin.com/in/dr-jomo-cousins-277279138/"
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
      {/* Preload background image */ }
      <link rel="preload" as="image" href="/images/jc-color-pics/JC_NewPhotos Edit623_edited.webp" />

      {/* Structured Data */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } }
      />

      {/* Hero Section - Screenshot 1 */ }
      <section className="relative overflow-hidden pt-0 md:pt-20">
        {/* Background Image */ }
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/aboutBackground.webp"
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
                  ABOUT <span className="text-[#e31e24]">DR. JOMO COUSINS</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  NFL veteran. Cancer survivor. Founder and senior pastor of <Link href='https://www.lfcc.tv'>Love First Christian Center</Link> in Riverview, FL. Author, speaker, and the first in his family to go to college.
                </p>
              </div>
            </div>

            {/* Right side - Hero Image */ }
            <div className="relative h-[500px] md:h-[650px] flex items-end">
              <Image
                src="/images/jc-png/aboutHeroJomo.webp"
                alt="Dr. Jomo Cousins - NFL Veteran and Motivational Speaker"
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
              src="/images/jc-color-pics/aboutProfilePictures.webp"
              alt="Dr. Jomo Cousins - Pastor and Motivational Speaker Portrait"
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
                  src="/images/logos/JomoCousins Logo15.webp"
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
                Dr. Cousins is the founder and senior pastor of <Link href='https://www.lfcc.tv'>Love First Christian Center</Link> in Riverview, FL. He is an author, a producer of the movie "A Question of Faith," and a retired NFL defensive end who played for the Arizona Cardinals and the New York Giants. After football, he channeled that same competitive drive into ministry, motivational speaking, financial seminars, and youth development programs.
              </p>
              <p>
                Dr. Cousins was the first in his family to attend college. He went to Florida A&M University, where he started speaking to high school students about pursuing higher education. He later earned his PhD from Tabernacle Bible College.
              </p>
              <p>
                He also created The Gap (The Guaranteed Achievable Plan), a goal-setting framework that breaks down big ambitions into concrete, actionable steps. But of everything he's accomplished, Dr. Cousins says he's most proud of his marriage to Dr. Charmaine and their three children: Jomo, Jamya, and Josiah.
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
              What your audience walks away with.
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
                    src="/images/jc-png/_JC_NewPhotos Edit358_BW.webp"
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
                  Your audience leaves with a clear plan of action, not just motivation. Dr. Cousins shares real stories and practical steps drawn from the NFL, ministry, and beating cancer.
                </p>
              </div>

              {/* Financial Seminars */ }
              <div className="text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/jc-png/_JC_NewPhotos Edit334_BW.webp"
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
                  Practical sessions on budgeting, building wealth, and developing financial discipline. Designed for corporate teams, church groups, and community organizations.
                </p>
              </div>

              {/* Youth Programs */ }
              <div className="text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/jc-png/_JC_NewPhotos Edit414_edited.webp"
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
                  Programs focused on leadership, goal-setting, and college readiness. Dr. Cousins was the first in his family to attend college and speaks directly to what young people need to hear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survivor Section - Screenshot 4 */ }
      <section className="py-20 md:py-32 relative">
        {/* Background Image - Fixed on desktop */ }
        <div className="absolute inset-0 bg-cover bg-top bg-fixed" style={ { backgroundImage: "url('/images/jc-color-pics/JC_NewPhotos Edit623_edited.webp')" } }></div>
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
                Dr. Cousins was diagnosed with colon cancer in 2014. Through treatment, he never stopped showing up for his congregation or his daily prayer line. He is now cancer-free by the grace of God. That fight changed how he sees everything, and it shows in every message he delivers.
              </p>
            </div>

            {/* Ribbon – Bottom Background */ }
            <div className="absolute bottom-16 md:bottom-[-100px] left-1/2 -translate-x-1/2 w-[220%] md:w-[170%] h-[25vh] md:h-[600px] z-10 pointer-events-none">
              <Image
                src="/images/icons/Jomo Cancer_03.webp"
                alt="Cancer Awareness Ribbon"
                fill
                priority
                className="object-contain object-center-bottom"
              />
            </div>

            {/* Foreground Image – Dr. Cousins */ }
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 w-[72%] md:w-[46%] h-[50vh] md:h-[700px] z-20 drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/jc-png/_JC_NewPhotos Edit515_edited.webp"
                alt="Dr. Jomo Cousins - Cancer Survivor and Motivational Speaker"
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
    </div>
  );
}
