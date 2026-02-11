'use client';

import Script from "next/script";
import { useEffect, useState } from "react";

interface GoogleReviewsSurveyProps {
  orderId: string;
  email: string;
  deliveryCountry: string;
  estimatedDeliveryDate?: string;
  products?: Array<{ gtin?: string }>;
}

export default function GoogleReviewsSurvey({
  orderId,
  email,
  deliveryCountry,
  estimatedDeliveryDate,
  products = [],
}: GoogleReviewsSurveyProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Define the renderOptIn function before script loads
  useEffect(() => {
    console.log('[GoogleReviewsSurvey] Setting up renderOptIn function');

    (window as any).renderOptIn = function () {
      console.log('[GoogleReviewsSurvey] renderOptIn called');

      if (!(window as any).gapi) {
        console.error('[GoogleReviewsSurvey] gapi is not available');
        return;
      }

      (window as any).gapi.load('surveyoptin', function () {
        console.log('[GoogleReviewsSurvey] surveyoptin loaded');

        const surveyConfig: any = {
          merchant_id: 5712970239,
          order_id: orderId,
          email: email,
          delivery_country: deliveryCountry,
          estimated_delivery_date: estimatedDeliveryDate,
        };

        // Add optional products field if available
        if (products && products.length > 0) {
          surveyConfig.products = products.filter((p: any) => p.gtin);
        }

        console.log('[GoogleReviewsSurvey] Rendering survey with config:', surveyConfig);

        try {
          (window as any).gapi.surveyoptin.render(surveyConfig);
          console.log('[GoogleReviewsSurvey] Survey rendered successfully');
        } catch (error) {
          console.error('[GoogleReviewsSurvey] Error rendering survey:', error);
        }
      });
    };
  }, [orderId, email, deliveryCountry, estimatedDeliveryDate, products]);

  return (
    <>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[GoogleReviewsSurvey] Script loaded');
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error('[GoogleReviewsSurvey] Script failed to load:', e);
        }}
      />
    </>
  );
}
