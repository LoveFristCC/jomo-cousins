"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactMethod: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate with actual email service or API
    console.log("Form submitted:", formData);

    // Simulate submission
    setTimeout(() => {
      alert("Thank you for contacting us! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        contactMethod: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
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
      <section className="relative bg-gradient-to-br from-[#FAFCFE] to-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#303030] md:text-5xl lg:text-6xl">
              Let's <span className="text-[#ea8125]">Connect</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              Whether you are experiencing challenges with communication, intimacy, trust,
              or other relationship issues, we're here to help. Reach out today to schedule
              your appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-5">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Left - Contact Form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#303030] md:text-4xl">
                Send Us a <span className="text-[#ea8125]">Message</span>
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-semibold text-[#303030]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#ea8125] focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-semibold text-[#303030]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#ea8125] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label
                    htmlFor="contactMethod"
                    className="mb-2 block font-semibold text-[#303030]"
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#ea8125] focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="call">Call</option>
                    <option value="message">Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-semibold text-[#303030]"
                  >
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#ea8125] focus:outline-none"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-semibold text-[#303030]"
                  >
                    What do you need assistance with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:border-[#ea8125] focus:outline-none"
                    placeholder="Tell us about what brings you here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#ea8125] py-4 font-bold text-white transition-all hover:bg-[#d67320] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right - Contact Info & Social */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#303030] md:text-4xl">
                Get in <span className="text-[#ea8125]">Touch</span>
              </h2>

              {/* Info Cards */}
              <div className="mb-8 space-y-6">
                {/* Location */}
                <div className="rounded-xl bg-gradient-to-br from-[#FAFCFE] to-white p-6 shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea8125]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#303030]">Location</h3>
                      <p className="text-gray-600">
                        Love First Christian Center
                        <br />
                        Riverview, FL
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="rounded-xl bg-gradient-to-br from-[#FAFCFE] to-white p-6 shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E6BB7]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#303030]">Services</h3>
                      <p className="text-gray-600">
                        Couples Counseling
                        <br />
                        Marriage Therapy
                        <br />
                        Premarital Counseling
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="mb-4 text-xl font-bold text-[#303030]">
                  Connect on Social Media
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.youtube.com/jomocharmaine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea8125] text-white transition-all hover:scale-110 hover:bg-[#d67320]"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/JomoAndCharmaine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E6BB7] text-white transition-all hover:scale-110 hover:bg-[#0a5691]"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/jomoandcharmaine_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffaa62] text-white transition-all hover:scale-110 hover:bg-[#ea8125]"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/JomoCharmaine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#303030] text-white transition-all hover:scale-110 hover:bg-[#000000]"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#ea8125] to-[#ffaa62] py-16 text-white">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-4 text-3xl font-bold">
              Prefer to Schedule Directly?
            </h3>
            <p className="mb-6 text-lg">
              Click below to view our calendar and book your appointment now.
            </p>
            <a
              href="#"
              className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-[#ea8125] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Request an Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
