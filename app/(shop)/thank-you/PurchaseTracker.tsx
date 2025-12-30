'use client';

import { useEffect, useRef } from 'react';
import { trackPurchase } from '@/lib/analytics';

interface PurchaseTrackerProps {
  transactionId: string;
  totalValue: number;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
  currency?: string;
}

/**
 * Client component to track purchase conversion in Google Analytics
 * Prevents duplicate tracking even across page refreshes using sessionStorage
 */
export default function PurchaseTracker({
  transactionId,
  totalValue,
  items,
  currency = 'USD',
}: PurchaseTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Check if this transaction has already been tracked (prevents duplicates on refresh)
    const storageKey = `ga_tracked_${transactionId}`;
    const alreadyTracked = sessionStorage.getItem(storageKey);

    if (!hasTracked.current && !alreadyTracked) {
      console.log('[GA] Tracking purchase:', {
        transactionId,
        totalValue,
        itemCount: items.length,
      });

      trackPurchase(transactionId, totalValue, items, currency);

      // Mark as tracked in both component state and session storage
      hasTracked.current = true;
      sessionStorage.setItem(storageKey, 'true');
    } else if (alreadyTracked) {
      console.log('[GA] Purchase already tracked, skipping:', transactionId);
    }
  }, [transactionId, totalValue, items, currency]);

  // This component doesn't render anything visible
  return null;
}
