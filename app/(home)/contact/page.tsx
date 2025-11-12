"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - you can integrate with your backend or email service
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-5xl font-bold text-[#2d2d2d] md:text-6xl">
              Get In <span className="text-[#e31e24]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600">
              Book Dr. Jomo Cousins for your next event or get in touch with our
              team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                Send Us a <span className="text-[#e31e24]">Message</span>
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-semibold text-[#2d2d2d]"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#e31e24] focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-semibold text-[#2d2d2d]"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#e31e24] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-semibold text-[#2d2d2d]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#e31e24] focus:outline-none"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label
                    htmlFor="eventType"
                    className="mb-2 block font-semibold text-[#2d2d2d]"
                  >
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#e31e24] focus:outline-none"
                  >
                    <option value="">Select Event Type</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="church">Church Event</option>
                    <option value="youth">Youth Program</option>
                    <option value="financial">Financial Wealth Seminar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-semibold text-[#2d2d2d]"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#e31e24] focus:outline-none"
                    placeholder="Tell us about your event and how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e31e24] py-4 font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c41a1f]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#2d2d2d] md:text-4xl">
                Contact <span className="text-[#e31e24]">Information</span>
              </h2>

              {/* Booking Information */}
              <div className="mb-8 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-[#2d2d2d]">
                  Book Dr. Cousins
                </h3>
                <p className="mb-4 text-gray-700">
                  Available for booking at your next:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#e31e24]">•</span>
                    Company Events
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#e31e24]">•</span>
                    Church Events
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#e31e24]">•</span>
                    Youth Programs
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#e31e24]">•</span>
                    Financial Wealth Seminars
                  </li>
                </ul>
              </div>

              {/* Love First Christian Center */}
              <div className="mb-8 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-[#2d2d2d]">
                  Love First Christian Center
                </h3>
                <p className="text-gray-700">
                  <strong>Senior Pastor:</strong> Dr. Jomo Cousins
                </p>
                <p className="mt-2 text-gray-700">
                  <strong>Location:</strong> Riverview, FL
                </p>
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-[#2d2d2d]">
                  Connect on Social Media
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/pastorjomo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-[#e31e24] text-white transition-colors hover:bg-[#c41a1f]"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/pastorjomo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-[#e31e24] text-white transition-colors hover:bg-[#c41a1f]"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@PASTORJOMO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-[#e31e24] text-white transition-colors hover:bg-[#c41a1f]"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/wearelovefirst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-[#e31e24] text-white transition-colors hover:bg-[#c41a1f]"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-[#2d2d2d]">
                  Email
                </h3>
                <a
                  href="mailto:contact@jomocousins.com"
                  className="text-lg text-[#e31e24] hover:underline"
                >
                  contact@jomocousins.com
                </a>
              </div>

              {/* Additional Resources */}
              <div className="bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-[#2d2d2d]">
                  6:30 AM Prayer Line
                </h3>
                <p className="text-gray-700">
                  Join Dr. Cousins for his daily 6:30 AM weekday prayer line
                  accessible via social media. For nearly 11 years, he has
                  consistently hosted this prayer line, touching lives around the
                  world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Opportunities */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-[#2d2d2d] md:text-5xl">
              Speaking <span className="text-[#e31e24]">Opportunities</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-8 text-center shadow-md">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-16 w-16 text-[#e31e24]"
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
                  Corporate Events
                </h3>
                <p className="text-gray-600">
                  Inspire your team with powerful leadership messages
                </p>
              </div>
              <div className="bg-white p-8 text-center shadow-md">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-16 w-16 text-[#e31e24]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Church Events
                </h3>
                <p className="text-gray-600">
                  Dynamic preaching that strengthens faith communities
                </p>
              </div>
              <div className="bg-white p-8 text-center shadow-md">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-16 w-16 text-[#e31e24]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Youth Programs
                </h3>
                <p className="text-gray-600">
                  Engaging presentations that inspire young people
                </p>
              </div>
              <div className="bg-white p-8 text-center shadow-md">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-16 w-16 text-[#e31e24]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Financial Seminars
                </h3>
                <p className="text-gray-600">
                  Practical wisdom on building wealth through faith
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3d3d3d] py-20 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Let's Make Your Event{" "}
              <span className="text-[#e31e24]">Unforgettable</span>
            </h2>
            <p className="mb-10 text-xl text-gray-300">
              Dr. Jomo Cousins brings inspiration, wisdom, and transformative
              messages to every speaking engagement.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block bg-[#e31e24] px-12 py-4 font-bold uppercase tracking-wide transition-colors hover:bg-[#c41a1f]"
            >
              Fill Out Contact Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
