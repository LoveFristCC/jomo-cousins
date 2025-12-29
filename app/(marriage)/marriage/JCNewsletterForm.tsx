"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function JCNewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          type: "jomo-charmaine",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage({
          type: "success",
          text: data.message || "Successfully subscribed! Check your email.",
        });
        setEmail("");
        setName("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to subscribe. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/Conversation-Starters-for-Couples.pdf";
    link.download = "Conversation-Starters-for-Couples.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold text-[#303030] md:text-4xl lg:text-5xl">
        Conversation Starters for Couples
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        {isSuccess
          ? "Your free eBook is ready to download!"
          : "Enter Your Email Address and Download the Free eBook"}
      </p>

      {!isSuccess ? (
        <>
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ea8125] text-sm font-bold text-white">
                1
              </div>
              <div className="h-[2px] w-16 bg-gray-300"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-bold text-gray-400">
                2
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#ea8125] focus:outline-none focus:ring-2 focus:ring-[#ea8125]/50"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#ea8125] focus:outline-none focus:ring-2 focus:ring-[#ea8125]/50"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </button>

            {message && message.type === "error" && (
              <div className="rounded-lg p-4 text-center font-semibold bg-red-500/20 text-red-700 border border-red-500/30">
                {message.text}
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          {/* Success - Download Section */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-bold text-gray-400">
                1
              </div>
              <div className="h-[2px] w-16 bg-[#ea8125]"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ea8125] text-sm font-bold text-white">
                2
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {message && message.type === "success" && (
              <div className="rounded-lg p-4 text-center font-semibold bg-green-500/20 text-green-700 border border-green-500/30">
                {message.text}
              </div>
            )}

            <div className="rounded-lg border-2 border-[#ea8125] bg-[#ea8125]/5 p-8">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#ea8125] p-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-xl font-bold text-[#303030]">
                Your eBook is Ready!
              </h3>
              <p className="mb-6 text-center text-gray-600">
                Click the button below to download your free Conversation Starters for Couples eBook.
              </p>
              <button
                onClick={handleDownload}
                className="w-full rounded-lg bg-[#ea8125] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#d67320] hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download eBook (PDF)
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Also check your email for a copy of the eBook and additional resources!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
