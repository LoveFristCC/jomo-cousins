export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.jomocousins.com/#person",
        name: "Dr. Jomo Cousins",
        url: "https://www.jomocousins.com",
        image: {
          "@type": "ImageObject",
          url: "https://www.jomocousins.com/images/jc-color-pics/JC_NewPhotos Edit477.jpg",
          width: 800,
          height: 800,
        },
        sameAs: [
          "https://www.facebook.com/pastorjomo/",
          "https://www.instagram.com/pastorjomo/",
          "https://www.youtube.com/@PASTORJOMO",
        ],
        jobTitle: "Motivational Speaker, Pastor, Author",
        description: "Motivational speaker, pastor, author, business coach, and former NFL player inspiring transformation through powerful messages.",
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Florida A&M University",
          },
          {
            "@type": "EducationalOrganization",
            name: "Tabernacle Bible College",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.jomocousins.com/#website",
        url: "https://www.jomocousins.com",
        name: "Dr. Jomo Cousins",
        description: "Motivational speaker Dr. Jomo Cousins inspires transformation through powerful messages.",
        publisher: {
          "@id": "https://www.jomocousins.com/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://www.jomocousins.com/#webpage",
        url: "https://www.jomocousins.com",
        name: "Dr. Jomo Cousins | Motivational Speaker, Pastor & Author",
        isPartOf: {
          "@id": "https://www.jomocousins.com/#website",
        },
        about: {
          "@id": "https://www.jomocousins.com/#person",
        },
        description: "Motivational speaker Dr. Jomo Cousins inspires transformation through powerful messages. Book for corporate events, church gatherings, and youth programs.",
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://www.jomocousins.com/#organization",
        name: "Dr. Jomo Cousins Ministries",
        url: "https://www.jomocousins.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.jomocousins.com/images/logos/Asset 1.png",
        },
        founder: {
          "@id": "https://www.jomocousins.com/#person",
        },
        sameAs: [
          "https://www.facebook.com/pastorjomo/",
          "https://www.instagram.com/pastorjomo/",
          "https://www.youtube.com/@PASTORJOMO",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "bookjomocousins@gmail.com",
          contactType: "Booking Inquiries",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
