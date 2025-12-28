'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [ email, setEmail ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ message, setMessage ] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#3D3D3D] py-16 sm:py-20 text-white">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-[#e31e24] p-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Connected</h2>
            <p className="text-lg text-gray-300">
              Get the latest updates, inspirational content, and exclusive resources delivered to your inbox.
            </p>
          </div>

          {/* Form Container */ }
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl border border-white/10">
            <form onSubmit={ handleSubmit } className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={ firstName }
                    onChange={ (e) => setFirstName(e.target.value) }
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:border-[#e31e24] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/50"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={ lastName }
                    onChange={ (e) => setLastName(e.target.value) }
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:border-[#e31e24] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/50"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-[#e31e24]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:border-[#e31e24] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/50"
                  placeholder="john@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={ isSubmitting }
                className="w-full rounded-lg bg-[#e31e24] px-6 py-4 font-bold text-white transition-all hover:bg-[#c41a1f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                { isSubmitting ? 'Subscribing...' : 'Subscribe Now' }
              </button>

              { message && (
                <div
                  className={ `rounded-lg p-4 text-center font-semibold ${message.type === 'success'
                    ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                    : 'bg-red-500/20 text-red-200 border border-red-500/30'
                    }` }
                >
                  { message.text }
                </div>
              ) }
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
