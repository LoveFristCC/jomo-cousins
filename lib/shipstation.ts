import Stripe from "stripe";
import {
  ShipStationOrder,
  ShipStationOrderResponse,
  CheckoutMetadata,
} from "./types";

/**
 * Creates a ShipStation order from a Stripe checkout session
 * This function is called after a successful Stripe payment
 */
export async function createShipStationOrder(
  session: Stripe.Checkout.Session | any
): Promise<ShipStationOrderResponse | null> {
  try {
    const metadata = session.metadata as unknown as CheckoutMetadata;

    // Only create ShipStation orders for physical products
    if (metadata.productType === "digital") {
      console.log("[ShipStation] Skipping digital product order");
      return null;
    }

    if (!session.customer_details?.email) {
      throw new Error("No customer email found in session");
    }

    // In Stripe API 2025-12-15.clover, shipping address is in customer_details.address
    // Check both old and new locations for compatibility
    const shippingDetails =
      (session as any).shipping_details || (session as any).customer_details;
    const shippingAddress =
      shippingDetails?.address || shippingDetails?.shipping_address;

    if (!shippingAddress) {
      console.error(
        `[ShipStation] No shipping address found in session ${session.id}`
      );
      throw new Error(
        `No shipping address found in session. Make sure shipping address collection is enabled in Stripe Checkout.`
      );
    }

    const customerDetails = session.customer_details;
    const shippingName =
      shippingDetails?.name ||
      (session as any).shipping_details?.name ||
      customerDetails.name;

    // Build the ShipStation order object
    const order: ShipStationOrder = {
      orderNumber: session.id,
      orderDate: new Date(session.created * 1000).toISOString(),
      orderStatus: "awaiting_shipment",
      customerEmail: customerDetails.email,

      // Billing address (use shipping if no separate billing)
      billTo: {
        name: customerDetails.name || "Customer",
        street1: shippingAddress.line1 || "",
        street2: shippingAddress.line2 || undefined,
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        postalCode: shippingAddress.postal_code || "",
        country: shippingAddress.country || "US",
        phone: customerDetails.phone || undefined,
      },

      // Shipping address
      shipTo: {
        name: shippingName || "Customer",
        street1: shippingAddress.line1 || "",
        street2: shippingAddress.line2 || undefined,
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        postalCode: shippingAddress.postal_code || "",
        country: shippingAddress.country || "US",
        phone: customerDetails.phone || undefined,
        residential: true,
      },

      // Order items
      items: [
        {
          sku: metadata.variantSku,
          name: metadata.productName,
          quantity: parseInt(metadata.quantity),
          // Unit price = total - shipping - tax (product price only)
          unitPrice: ((session.amount_total || 0) - (session.total_details?.amount_shipping || 0) - (session.total_details?.amount_tax || 0)) / 100,
          weight: {
            value: parseFloat(metadata.weight),
            units: "ounces",
          },
          options: [
            metadata.size && {
              name: "Size",
              value: metadata.size,
            },
            metadata.color && {
              name: "Color",
              value: metadata.color,
            },
          ].filter(Boolean) as Array<{ name: string; value: string }>,
        },
      ],

      amountPaid: (session.amount_total || 0) / 100,
      shippingAmount: (session.total_details?.amount_shipping || 0) / 100,
      taxAmount: (session.total_details?.amount_tax || 0) / 100,

      // Store Stripe payment ID in custom field for reference
      advancedOptions: {
        customField1: session.payment_intent as string,
        source: "Online Store",
      },
    };

    // Make API request to ShipStation
    const response = await fetch(
      "https://ssapi.shipstation.com/orders/createorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SHIPSTATION_API_KEY}:${process.env.SHIPSTATION_API_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ShipStation] API Error:", errorText);
      throw new Error(`ShipStation API error: ${response.status} ${errorText}`);
    }

    const shipstationOrder: ShipStationOrderResponse = await response.json();

    console.log(
      `[ShipStation] ✓ Order created successfully. ShipStation Order ID: ${shipstationOrder.orderId}`
    );

    return shipstationOrder;
  } catch (error) {
    console.error("[ShipStation] Error creating order:", error);
    throw error;
  }
}

/**
 * Get order details from ShipStation
 */
export async function getShipStationOrder(
  orderId: string
): Promise<ShipStationOrderResponse | null> {
  try {
    const response = await fetch(
      `https://ssapi.shipstation.com/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SHIPSTATION_API_KEY}:${process.env.SHIPSTATION_API_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ShipStation] Get order error:", errorText);
      return null;
    }

    const order: ShipStationOrderResponse = await response.json();
    return order;
  } catch (error) {
    console.error("[ShipStation] Error fetching order:", error);
    return null;
  }
}

/**
 * Cancel a ShipStation order
 */
export async function cancelShipStationOrder(
  orderId: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://ssapi.shipstation.com/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SHIPSTATION_API_KEY}:${process.env.SHIPSTATION_API_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ShipStation] Cancel order error:", errorText);
      return false;
    }

    console.log(`[ShipStation] ✓ Order ${orderId} cancelled`);
    return true;
  } catch (error) {
    console.error("[ShipStation] Error cancelling order:", error);
    return false;
  }
}
