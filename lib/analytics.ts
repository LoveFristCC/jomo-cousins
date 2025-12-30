import { sendGAEvent } from '@next/third-parties/google';

/**
 * Track a conversion event with price
 * @param eventName - Name of the conversion event (e.g., 'purchase', 'add_to_cart')
 * @param value - Price/value of the conversion
 * @param currency - Currency code (default: 'USD')
 * @param additionalParams - Any additional event parameters
 */
export function trackConversion(
  eventName: string,
  value: number,
  currency: string = 'USD',
  additionalParams?: Record<string, any>
) {
  sendGAEvent('event', eventName, {
    value,
    currency,
    ...additionalParams,
  });
}

/**
 * Track a purchase conversion
 * @param transactionId - Unique transaction ID
 * @param value - Total purchase value
 * @param items - Array of purchased items (optional)
 * @param currency - Currency code (default: 'USD')
 */
export function trackPurchase(
  transactionId: string,
  value: number,
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>,
  currency: string = 'USD'
) {
  sendGAEvent('event', 'purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  });
}

/**
 * Track when user clicks a CTA button
 * @param buttonName - Name/label of the button clicked
 * @param value - Associated value (e.g., product price)
 */
export function trackButtonClick(buttonName: string, value?: number) {
  sendGAEvent('event', 'button_click', {
    button_name: buttonName,
    ...(value && { value, currency: 'USD' }),
  });
}

/**
 * Track add to cart event
 * @param itemId - Product/item ID
 * @param itemName - Product/item name
 * @param price - Item price
 * @param quantity - Quantity added
 */
export function trackAddToCart(
  itemId: string,
  itemName: string,
  price: number,
  quantity: number = 1
) {
  sendGAEvent('event', 'add_to_cart', {
    currency: 'USD',
    value: price * quantity,
    items: [
      {
        item_id: itemId,
        item_name: itemName,
        price,
        quantity,
      },
    ],
  });
}

/**
 * Track begin checkout event
 * @param value - Total cart value
 * @param items - Cart items
 */
export function trackBeginCheckout(
  value: number,
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) {
  sendGAEvent('event', 'begin_checkout', {
    currency: 'USD',
    value,
    items,
  });
}
