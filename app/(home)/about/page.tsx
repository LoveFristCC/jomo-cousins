import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-5xl font-bold text-[#2d2d2d] md:text-6xl">
              About <span className="text-[#e31e24]">Dr. Jomo Cousins</span>
            </h1>
            <p className="text-xl text-gray-600">
              From NFL Defensive End to Pastor, Author, and Motivational Speaker
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section with Image */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/images/jc-color-pics/JC_NewPhotos Edit571.jpg"
                alt="Dr. Jomo Cousins"
                width={600}
                height={700}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="mb-6 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                A Journey of Faith & Purpose
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Jomo Cousins is a dynamic motivational speaker, pastor, author,
                  business coach, husband, and father whose mission is to inspire and
                  guide others toward their fullest potential.
                </p>
                <p>
                  Born in Jamaica, Dr. Cousins became the first in his family to
                  attend college in the United States, paving the way for future
                  generations. His remarkable journey includes being drafted to the
                  NFL from Florida A&M University in 1998 without having prior
                  football experience before college.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFL Career Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              NFL <span className="text-[#e31e24]">Career</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                Dr. Cousins leveraged his nationally recognized status as a retired
                NFL defensive end for the Arizona Cardinals and the New York Giants
                to extend his reach within the community through self-motivation
                seminars, presentation competencies, youth partnership programs, and
                financial wealth symposiums.
              </p>
              <p>
                His unique journey from Jamaica to the NFL demonstrates the power of
                determination, faith, and hard work. His story continues to inspire
                countless individuals to pursue their dreams despite obstacles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              <span className="text-[#e31e24]">Education</span> & Credentials
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 shadow-lg">
                <div className="mb-4 text-[#e31e24]">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Doctoral Degree
                </h3>
                <p className="text-gray-600">
                  Religious Philosophy from Tabernacle Bible College
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <div className="mb-4 text-[#e31e24]">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Master's Degree
                </h3>
                <p className="text-gray-600">
                  Divinity from Tabernacle Bible College
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <div className="mb-4 text-[#e31e24]">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Bachelor's Degree
                </h3>
                <p className="text-gray-600">
                  Business Economics from Florida A&M University
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                Love First <span className="text-[#e31e24]">Christian Center</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Cousins was ordained as a pastor in 2006. Two years later, he
                  founded Love First Christian Center in Riverview, FL, holding its
                  first service on July 27, 2008.
                </p>
                <p>
                  He named the ministry "Love First" because "I'd seen so many broken
                  people, and I wanted our primary concern to be showing people love."
                  This philosophy continues to guide the church's mission today.
                </p>
                <p>
                  As the founder and senior pastor, Dr. Cousins combines his pastoral
                  wisdom with his diverse background in professional sports, ministry,
                  and business to deliver powerful messages that resonate with
                  audiences of all ages and backgrounds.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/images/jc-color-pics/JC_NewPhotos Edit623.jpg"
                alt="Dr. Jomo Cousins Speaking"
                width={600}
                height={700}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overcoming Adversity */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Overcoming <span className="text-[#e31e24]">Adversity</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                In 2014, Dr. Cousins faced one of his greatest challenges when he was
                diagnosed with colon cancer. Through faith, perseverance, and the
                support of his community, Dr. Cousins is now cancer-free by the grace
                of God.
              </p>
              <p>
                This experience has deepened his understanding of life's struggles and
                strengthened his ability to minister to others facing difficult
                circumstances. His testimony continues to inspire hope and faith in
                countless individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Family <span className="text-[#e31e24]">First</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                Of all his accolades and accomplishments, Dr. Cousins is most proud of
                his first ministry: his marriage to Dr. Charmaine and their beautiful
                children Jomo, Jamya, and Josiah.
              </p>
              <p>
                His commitment to family reflects his core values and serves as the
                foundation for his ministry and life's work. He often shares that true
                success begins at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              <a
                href="mailto:contact@jomocousins.com"
                className="inline-block bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide transition-colors hover:bg-[#c41a1f]"
              >
                Contact for Booking
              </a>
              <a
                href="https://www.youtube.com/@PASTORJOMO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-white px-12 py-4 font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-[#3d3d3d]"
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
