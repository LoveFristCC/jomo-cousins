"use client";

import Image from "next/image";

export default function CTNAnnouncement() {
  return (
    <>
      {/* CTN TV Appearance Announcement */ }
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-5xl">
            {/* Announcement Badge */ }
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-[#e31e24] px-6 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg">
                Special TV Appearance
              </span>
            </div>

            {/* Main Content */ }
            <div className="overflow-hidden rounded-2xl border-4 border-[#e31e24] bg-white shadow-2xl">
              <div className="grid gap-8 md:grid-cols-2 md:gap-0">
                {/* Left Side - Image */ }
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src="/images/CTN-image.webp"
                    alt="Pastor Jomo Cousins appearing on Come Home with Jen Mallan on CTN - Friday January 16th"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Right Side - Details */ }
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <h2 className="mb-4 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                    Watch Pastor Jomo on{ " " }
                    <span className="text-[#e31e24]">CTN!</span>
                  </h2>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-[#2d2d2d]">
                          Friday, January 16th, 2026
                        </p>
                        <p className="text-gray-600">
                          5:30 AM | 10:00 AM | 10:00 PM EST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-[#2d2d2d]">
                          Channel 22 (Tampa Area)
                        </p>
                        <p className="text-gray-600">
                          Or watch online at{ " " }
                          <a
                            href="https://ctnonline.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e31e24] underline hover:text-[#c41a1f]"
                          >
                            CTNOnline.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-6 w-6 flex-shrink-0 text-[#e31e24]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-700">
                          Joining "Come Home with Jen Mallan"
                          <br />
                          <span className="text-sm text-gray-500">
                            Check your local listing for viewing
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://ctnonline.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-lg bg-[#e31e24] px-8 py-3 text-center font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:bg-[#c41a1f] hover:shadow-xl"
                    >
                      Watch Online
                    </a>
                    <button
                      onClick={ () => {
                        if (navigator.share) {
                          navigator.share({
                            title: "Pastor Jomo on CTN",
                            text: "Watch Pastor Jomo Cousins on CTN Channel 22 - Friday, January 16th at 5:30 AM, 10 AM & 10 PM EST!",
                            url: window.location.href,
                          });
                        }
                      } }
                      className="inline-block rounded-lg border-2 border-[#e31e24] px-8 py-3 text-center font-bold uppercase tracking-wide text-[#e31e24] shadow-md transition-all hover:scale-105 hover:bg-[#e31e24] hover:text-white hover:shadow-lg"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */ }
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Set your alarm and invite a friend!{ " " }
                <span className="font-semibold text-[#e31e24]">
                  Don't miss this inspiring conversation.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Schema Markup for SEO */ }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ {
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BroadcastEvent",
            name: "Pastor Jomo Cousins on Come Home with Jen Mallan",
            description:
              "Watch Pastor Jomo Cousins share inspiring insights on Come Home with Jen Mallan on CTN. Tune in for a powerful conversation about faith, purpose, and transformation.",
            startDate: "2026-01-16T05:30:00-05:00",
            endDate: "2026-01-16T22:30:00-05:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              name: "CTN (Christian Television Network) - Channel 22 Tampa / CTNOnline.com",
              url: "https://ctnonline.com",
            },
            broadcastOfEvent: {
              "@type": "Event",
              name: "Come Home with Jen Mallan",
            },
            publishedOn: {
              "@type": "BroadcastService",
              name: "CTN (Christian Television Network)",
              broadcastDisplayName: "Channel 22",
              videoFormat: "TV",
            },
            performer: {
              "@type": "Person",
              name: "Dr. Jomo Cousins",
              url: "https://www.jomocousins.com",
              description:
                "Pastor, Author, and Motivational Speaker. Former NFL player, creator of The I.R.I.E. Method.",
            },
            organizer: {
              "@type": "Organization",
              name: "Christian Television Network (CTN)",
              url: "https://ctnonline.com",
            },
            isAccessibleForFree: true,
          }),
        } }
      />
    </>
  );
}
