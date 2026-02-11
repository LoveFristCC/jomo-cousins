'use client';

import Script from "next/script";

export default function MerchantWidget() {
  return (
    <Script
      src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
      strategy="afterInteractive"
      onLoad={ () => {
        console.log('Merchant widget script loaded');
        if (typeof window !== 'undefined' && (window as any).merchantwidget) {
          console.log('Starting merchant widget with merchant_id: 5712970239');
          (window as any).merchantwidget.start({
            merchant_id: 5712970239,
            position: 'BOTTOM_LEFT',
            region: 'US',
          });
          console.log('Merchant widget started');
        } else {
          console.error('merchantwidget is not available on window object');
        }
      } }
      onError={ (e) => {
        console.error('Failed to load merchant widget script:', e);
      } }
    />
  );
}
