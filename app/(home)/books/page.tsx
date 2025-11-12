import Image from "next/image";
import Link from "next/link";

export default function BooksPage() {
  const books = [
    {
      title: "God Is My Healer",
      image: "/images/books/GodIsMyHealerImage.webp",
      description:
        "Experience divine healing and restoration through faith. A powerful testimony of God's healing power in the face of adversity.",
      amazonLink: "#",
      featured: true,
    },
    {
      title: "Fully Equipped: God's Total Package",
      image: "/images/books/FULLY-EQUIPPED-FRONT-COVER.webp",
      description:
        "Discover how to unlock what God has placed inside of you—your gifts, talents, faith, peace, joy, and even the power to create wealth.",
      amazonLink: "#",
      featured: true,
    },
    {
      title: "You're In A Place Too Small For Your Call",
      image: "/images/books/YoureInAPlaceTooSmallForYourCall_cover.webp",
      description:
        "Step into the fullness of your divine calling and break free from limitations that hold you back from your God-given purpose.",
      amazonLink: "#",
      featured: true,
    },
    {
      title: "Prayer Life: The Conversation",
      image: "/images/books/Website-Image.compressed.png",
      description:
        "Whether you are new to a life of prayer, starting over, or seeking to live a more purposeful life, this guide will carry you through your prayer journey.",
      amazonLink: "#",
      featured: false,
    },
    {
      title: "How To Hear God",
      image: "/images/books/Website-Imagecompressed-111.png",
      description:
        "Dr. Cousins' sixth book, released in 2022, provides practical guidance on discerning God's voice in your daily life.",
      amazonLink: "#",
      featured: false,
    },
    {
      title: "The ABC's of Success",
      image: "/images/books/FULLY-EQUIPPED-FRONT-COVER.webp",
      description:
        "Foundational principles for achieving your goals and dreams through faith, determination, and divine purpose.",
      amazonLink: "#",
      featured: false,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-5xl font-bold text-[#2d2d2d] md:text-6xl">
              Motivational <span className="text-[#e31e24]">Books</span>
            </h1>
            <p className="text-xl text-gray-600">
              Transformative books for personal and spiritual growth by Dr. Jomo
              Cousins
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Featured <span className="text-[#e31e24]">Books</span>
            </h2>
            <p className="text-xl text-gray-600">
              Discover powerful insights for your spiritual journey
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {books
              .filter((book) => book.featured)
              .map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl"
                >
                  <div className="mb-6">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="w-full"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#2d2d2d]">
                    {book.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{book.description}</p>
                  <div className="flex gap-2">
                    <a
                      href={book.amazonLink}
                      className="flex-1 bg-[#e31e24] py-3 text-center font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                    >
                      Buy Now
                    </a>
                    <button className="border-2 border-[#2d2d2d] px-6 py-3 font-bold uppercase tracking-wide text-[#2d2d2d] transition-colors hover:bg-[#2d2d2d] hover:text-white">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All Books Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Complete <span className="text-[#e31e24]">Collection</span>
            </h2>
            <p className="text-xl text-gray-600">
              Explore all books by Dr. Jomo Cousins
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <div
                key={index}
                className="flex flex-col bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={200}
                    height={280}
                    className="h-64 w-auto object-contain"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#2d2d2d]">
                  {book.title}
                </h3>
                <p className="mb-4 flex-grow text-sm text-gray-600">
                  {book.description}
                </p>
                <a
                  href={book.amazonLink}
                  className="bg-[#e31e24] py-2 text-center font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Series/Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Additional <span className="text-[#e31e24]">Resources</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-[#2d2d2d]">
                  Watch Your Mouth: The Workbook
                </h3>
                <p className="mb-4 text-gray-600">
                  An interactive workbook designed to help you harness the power of
                  your words and speak life into every situation.
                </p>
                <a
                  href="#"
                  className="inline-block bg-[#e31e24] px-6 py-2 font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Learn More
                </a>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-[#2d2d2d]">
                  60 Prayers in 60 Seconds
                </h3>
                <p className="mb-4 text-gray-600">
                  Strictly Business - Quick, powerful prayers for busy professionals
                  seeking spiritual guidance throughout their workday.
                </p>
                <a
                  href="#"
                  className="inline-block bg-[#e31e24] px-6 py-2 font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Learn More
                </a>
              </div>
              <div className="bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-[#2d2d2d]">
                  Audio Books & More
                </h3>
                <p className="mb-4 text-gray-600">
                  Access audio versions of Dr. Cousins' books on Audible, iTunes,
                  and other major platforms.
                </p>
                <a
                  href="#"
                  className="inline-block bg-[#e31e24] px-6 py-2 font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Listen Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Logos */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-5">
          <p className="mb-8 text-center text-lg font-semibold text-gray-600">
            AVAILABLE ON ALL MAJOR PLATFORMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <Image
              src="/images/site-files/imazon.png"
              alt="Amazon"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/images/site-files/image (23).png"
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
        </div>
      </section>

      {/* About the Author Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Image
                src="/images/jc-color-pics/JC_NewPhotos Edit312.jpg"
                alt="Dr. Jomo Cousins"
                width={600}
                height={700}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                About the <span className="text-[#e31e24]">Author</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Dr. Jomo Cousins is a motivational speaker, pastor, author,
                  business coach, and former NFL defensive end. He is the founder
                  and senior pastor of Love First Christian Center in Riverview, FL.
                </p>
                <p>
                  For nearly 11 years, Dr. Cousins has consistently hosted a 6:30
                  a.m. weekday prayer line accessible via social media, touching
                  lives around the world with his daily devotions and prayers.
                </p>
                <p>
                  His unique perspective combines professional sports experience,
                  business acumen, and deep spiritual wisdom to help individuals
                  and organizations achieve breakthrough success.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block bg-[#e31e24] px-8 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Read Full Bio
                </Link>
              </div>
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
