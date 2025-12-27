"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  prayerCategoriesQuery,
  prayersByCategoryQuery,
} from "@/sanity/lib/queries";

export default function SubmitPage() {
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    category: "",
    request: "",
    anonymous: false,
  });
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ suggestedPrayers, setSuggestedPrayers ] = useState<any[]>([]);
  const [ categories, setCategories ] = useState<any[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      const data = await client.fetch(prayerCategoriesQuery, {});
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally save to Sanity and send email
      // For now, we'll simulate the submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fetch suggested prayers based on category
      if (formData.category) {
        const category = categories.find((c) => c.title === formData.category);
        if (category) {
          const prayers = await client.fetch(prayersByCategoryQuery, {
            categoryId: category._id,
          });
          setSuggestedPrayers((prayers || []).slice(0, 3));
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting prayer request:", error);
      alert("There was an error submitting your prayer request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    // Thank You Page
    return (
      <div className="min-h-screen bg-white">
        {/* Skip Link */ }
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#e31e24] focus:px-6 focus:py-3 focus:font-bold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>

        <section
          id="main-content"
          className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-20 text-white"
        >
          <div className="container mx-auto px-5">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
                <Image
                  src="/images/jc-color-pics/_JC_NewPhotos Edit141.jpg"
                  alt="Jomo Cousins"
                  width={ 96 }
                  height={ 96 }
                  priority
                  className="object-cover"
                />
              </div>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                Thank You - Pastor Jomo is Praying for You
              </h1>
              <p className="text-xl leading-relaxed text-gray-300">
                I've received your prayer request and I'm lifting you up in
                prayer right now. Trust that God hears us and cares deeply about
                what you're facing.
              </p>
            </div>
          </div>
        </section>

        {/* Suggested Prayers */ }
        { suggestedPrayers.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-5">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-center text-3xl font-bold text-[#3d3d3d]">
                  While you wait, you might find comfort in these prayers:
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  { suggestedPrayers.map((prayer) => (
                    <Link
                      key={ prayer._id }
                      href={ `/prayer/${prayer.slug}` }
                      className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
                    >
                      <h3 className="mb-2 font-bold text-[#3d3d3d] group-hover:text-[#e31e24]">
                        { prayer.title }
                      </h3>
                      { prayer.excerpt && (
                        <p className="text-sm text-gray-600">{ prayer.excerpt }</p>
                      ) }
                    </Link>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        {/* CTA */ }
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-5 text-center">
            <Link
              href="/prayer"
              className="inline-block rounded-lg bg-[#e31e24] px-8 py-4 font-bold text-white transition-colors hover:bg-[#c41a1f]"
            >
              Explore More Prayers
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Prayer Request Form
  return (
    <div className="min-h-screen bg-white">
      {/* Skip Link */ }
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#e31e24] focus:px-6 focus:py-3 focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Hero */ }
      <section
        id="main-content"
        className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] py-16 text-white md:py-20"
      >
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
                <Image
                  src="/images/jc-color-pics/_JC_NewPhotos Edit141.jpg"
                  alt="Jomo Cousins"
                  width={ 96 }
                  height={ 96 }
                  priority
                  className="object-cover"
                />
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Send Your Prayer Request to Pastor Jomo
              </h1>
              <p className="text-xl leading-relaxed text-gray-300">
                I'm honored to pray with you. Share your prayer need below, and
                I'll lift you up in prayer. You're not alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */ }
      <section className="py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={ handleSubmit } className="space-y-6">
              {/* Name */ }
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-semibold text-[#3d3d3d]"
                >
                  Your First Name <span className="text-[#e31e24]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={ formData.name }
                  onChange={ (e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={ formData.anonymous }
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#e31e24] focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
                  aria-required="true"
                />
              </div>

              {/* Email */ }
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-[#3d3d3d]"
                >
                  Email Address{ " " }
                  <span className="text-sm font-normal text-gray-600">
                    (optional - if you'd like prayer updates)
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={ formData.email }
                  onChange={ (e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#e31e24] focus:outline-none"
                />
              </div>

              {/* Category */ }
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block font-semibold text-[#3d3d3d]"
                >
                  Prayer Request Category
                </label>
                <select
                  id="category"
                  value={ formData.category }
                  onChange={ (e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#e31e24] focus:outline-none"
                  aria-label="Select prayer category"
                >
                  <option value="">Select a category...</option>
                  { categories.map((cat) => (
                    <option key={ cat._id } value={ cat.title }>
                      { cat.title }
                    </option>
                  )) }
                </select>
              </div>

              {/* Prayer Request */ }
              <div>
                <label
                  htmlFor="request"
                  className="mb-2 block font-semibold text-[#3d3d3d]"
                >
                  Your Prayer Request <span className="text-[#e31e24]">*</span>
                </label>
                <textarea
                  id="request"
                  value={ formData.request }
                  onChange={ (e) =>
                    setFormData({ ...formData, request: e.target.value })
                  }
                  required
                  rows={ 6 }
                  placeholder="Share what's on your heart. Jomo is listening..."
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#e31e24] focus:outline-none"
                  aria-required="true"
                />
              </div>

              {/* Anonymous */ }
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={ formData.anonymous }
                  onChange={ (e) =>
                    setFormData({
                      ...formData,
                      anonymous: e.target.checked,
                      name: e.target.checked ? "" : formData.name,
                    })
                  }
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-[#e31e24] focus:ring-2 focus:ring-[#e31e24]"
                />
                <label
                  htmlFor="anonymous"
                  className="cursor-pointer text-gray-700"
                >
                  Submit anonymously?{ " " }
                  <span className="text-sm text-gray-600">
                    (Your name won't be shared publicly)
                  </span>
                </label>
              </div>

              {/* Privacy Assurance */ }
              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                <p>
                  Your prayer request is confidential. Jomo takes your privacy
                  seriously. Read our{ " " }
                  <Link href="/privacy" className="font-semibold text-[#e31e24] hover:underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              {/* Submit Button */ }
              <button
                type="submit"
                disabled={ isSubmitting }
                className="w-full rounded-lg bg-[#e31e24] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-[#c41a1f] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit prayer request"
              >
                { isSubmitting ? "Sending to Jomo..." : "Send to Jomo" }
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonial */ }
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
            <p className="mb-4 text-lg italic text-gray-700">
              "Jomo's prayers have been a source of strength and comfort during
              my darkest moments. Knowing he's praying with me gives me hope."
            </p>
            <p className="font-semibold text-[#3d3d3d]">— Sarah M., Atlanta</p>
          </div>
        </div>
      </section>
    </div>
  );
}
