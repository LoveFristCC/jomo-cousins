'use client';

import Script from 'next/script';
import { useState } from 'react';

export default function NewsletterSection() {
  const [ key, setKey ] = useState(0);

  return (
    <section className="bg-[#3D3D3D] py-16 sm:py-20 text-white">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mx-auto">



          {/* Form Container with better styling */ }
          <div className="newsletter-form-container bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl border border-white/10">
            <div
              key={ key }
              dangerouslySetInnerHTML={ {
                __html: `<script src="https://jomo-cousins.mykajabi.com/forms/2148913798/embed.js"></script>`,
              } }
            />
          </div>
        </div>
      </div>


    </section>
  );
}
