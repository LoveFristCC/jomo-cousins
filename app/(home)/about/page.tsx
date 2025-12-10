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
              <span className="text-[#e31e24]">About</span>
            </h1>
            <p className="text-xl text-gray-600">
              Dr. Jomo Cousins
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
                Dr. <span className="text-[#e31e24]">Jomo</span> Cousins
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Jomo Cousins is a Christian, pastor, husband, and beloved father on a mission to inspire others with motivational speaking.
                </p>
                <p>
                  The esteemed Dr. Cousins is the founder and senior pastor of <a href="https://lfcc.tv/" target="_blank" rel="noopener noreferrer" className="text-[#e31e24] underline">Love First Christian Center</a> in Riverview, FL. He is an accomplished author and contributing benefactor and producer of the critically acclaimed movie, "A Question of Faith." Leveraging his nationally recognized status as a retired NFL defensive end for the Arizona Cardinals and the New York Giants, he has extended his reach within the community through self-motivation seminars, presentation competencies, youth partnership programs, and financial wealth symposiums.
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
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              <span className="text-[#e31e24]">Serv</span>ices
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600">
              Leaving audiences inspired and ready to achieve.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 shadow-lg text-center">
                <h3 className="mb-3 text-xl font-bold text-[#2d2d2d]">
                  Motivational Speaking
                </h3>
                <p className="text-gray-700">
                  Get inspired to keep life I.R.I.E., and learn the action steps needed to take your life to the next level.
                </p>
              </div>

              <div className="bg-white p-8 shadow-lg text-center">
                <h3 className="mb-3 text-xl font-bold text-[#2d2d2d]">
                  Financial Seminars
                </h3>
                <p className="text-gray-700">
                  Unlock your potential with financial literacy and financial discipline tips from Dr. Cousins.
                </p>
              </div>

              <div className="bg-white p-8 shadow-lg text-center">
                <h3 className="mb-3 text-xl font-bold text-[#2d2d2d]">
                  Youth Programs
                </h3>
                <p className="text-gray-700">
                  The future is already here. Set your youth up for limitless success in all aspects of their life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overcoming Adversity */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Thriving After <span className="text-[#e31e24]">Cancer</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p className="text-xl font-semibold italic text-[#2d2d2d]">
                "For this light momentary affliction is preparing for us an eternal weight of glory beyond all comparison."
                <br />
                <span className="text-base">2 Corinthians 4:17</span>
              </p>
              <p>
                Dr. Cousins was diagnosed with colon cancer in 2014. During those trying times, he kept his faith and commitment to God's people, fighting every day to spread inspiration. Dr. Cousins is now cancer-free by the grace of God. Life is precious, and it's never too soon to unlock the power of your potential!
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
