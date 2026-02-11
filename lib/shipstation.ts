import Stripe from "stripe";
import nodemailer from "nodemailer";
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
      return null;
    }

    if (!session.customer_details?.email) {
      throw new Error("No customer email found in session");
    }

    // Get shipping address - check multiple locations for Link compatibility
    // 1. session.shipping_details (standard checkout)
    // 2. session.customer.shipping (Link checkout with expanded customer)
    // 3. session.customer_details (fallback)
    const expandedCustomer = typeof session.customer === 'object' ? session.customer : null;
    const shippingAddress =
      (session as any).shipping_details?.address ||
      expandedCustomer?.shipping?.address ||
      (session as any).customer_details?.address;

    if (!shippingAddress) {
      console.error(
        `[ShipStation] No shipping address found in session ${session.id}`
      );
      throw new Error(
        `No shipping address found in session. Make sure shipping address collection is enabled in Stripe Checkout.`
      );
    }

    const customerDetails = session.customer_details;
    // Get shipping name from various possible locations
    const shippingName =
      (session as any).shipping_details?.name ||
      expandedCustomer?.shipping?.name ||
      customerDetails?.name;

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
          unitPrice:
            ((session.amount_total || 0) -
              (session.total_details?.amount_shipping || 0) -
              (session.total_details?.amount_tax || 0)) /
            100,
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

    // Send email notification to Dorothy
    try {
      await sendShipStationOrderNotification(order, shipstationOrder.orderId);
    } catch (emailError) {
      console.error(
        "[ShipStation] Failed to send email notification:",
        emailError
      );
      // Don't fail the order creation if email fails
    }

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

/**
 * Send email notification to Dorothy about new ShipStation order
 */
export async function sendShipStationOrderNotification(
  order: ShipStationOrder,
  shipstationOrderId?: number
): Promise<void> {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_EMAIL_PASSWORD,
      },
    });

    const emailSubject = `New ShipStation Order - ${order.orderNumber}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3d3d3d; border-bottom: 3px solid #e31e24; padding-bottom: 10px;">
          New ShipStation Order
        </h2>

        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">📦 Action Required</p>
          <p style="margin: 5px 0 0 0;">Please login to ShipStation to print shipping labels for this order.</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #3d3d3d; margin-bottom: 10px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Order Number:</td>
              <td style="padding: 8px;">${order.orderNumber}</td>
            </tr>
            ${
              shipstationOrderId
                ? `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">ShipStation Order ID:</td>
              <td style="padding: 8px;">${shipstationOrderId}</td>
            </tr>
            `
                : ""
            }
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Order Date:</td>
              <td style="padding: 8px;">${new Date(
                order.orderDate
              ).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
                timeZone: "America/New_York",
              })}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Customer Email:</td>
              <td style="padding: 8px;">${order.customerEmail}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Total Amount:</td>
              <td style="padding: 8px;">$${order.amountPaid.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #3d3d3d; margin-bottom: 10px;">Shipping Address</h3>
          <p style="margin: 5px 0; line-height: 1.6;">
            <strong>${order.shipTo.name}</strong><br/>
            ${order.shipTo.street1}<br/>
            ${order.shipTo.street2 ? `${order.shipTo.street2}<br/>` : ""}
            ${order.shipTo.city}, ${order.shipTo.state} ${
      order.shipTo.postalCode
    }<br/>
            ${order.shipTo.country}
            ${order.shipTo.phone ? `<br/>Phone: ${order.shipTo.phone}` : ""}
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #3d3d3d; margin-bottom: 10px;">Order Items</h3>
          ${order.items
            .map(
              (item) => `
            <div style="background-color: #f5f5f5; padding: 15px; margin-bottom: 10px; border-left: 4px solid #e31e24;">
              <p style="margin: 0 0 5px 0;"><strong>${item.name}</strong></p>
              <p style="margin: 5px 0; color: #666;">SKU: ${item.sku}</p>
              <p style="margin: 5px 0; color: #666;">Quantity: ${
                item.quantity
              }</p>
              <p style="margin: 5px 0; color: #666;">Unit Price: $${item.unitPrice.toFixed(
                2
              )}</p>
              ${
                item.options && item.options.length > 0
                  ? `
                <p style="margin: 5px 0; color: #666;">
                  ${item.options
                    .map((opt) => `${opt.name}: ${opt.value}`)
                    .join(", ")}
                </p>
              `
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #3d3d3d; margin-bottom: 10px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Subtotal:</td>
              <td style="padding: 8px; text-align: right;">$${(
                order.amountPaid -
                order.shippingAmount -
                order.taxAmount
              ).toFixed(2)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Shipping:</td>
              <td style="padding: 8px; text-align: right;">$${order.shippingAmount.toFixed(
                2
              )}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Tax:</td>
              <td style="padding: 8px; text-align: right;">$${order.taxAmount.toFixed(
                2
              )}</td>
            </tr>
            <tr style="border-top: 2px solid #3d3d3d;">
              <td style="padding: 8px; font-weight: bold;">Total Paid:</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">$${order.amountPaid.toFixed(
                2
              )}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #e8f5e9; border-radius: 5px;">
          <p style="margin: 0; font-weight: bold; color: #2e7d32;">Next Steps:</p>
          <ol style="margin: 10px 0; padding-left: 20px; color: #2e7d32;">
            <li>Login to ShipStation</li>
            <li>Locate order #${order.orderNumber}</li>
            <li>Print shipping labels</li>
            <li>Prepare package for shipment</li>
          </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was automatically generated from jomocousins.com</p>
          <p>Order created: ${new Date(order.orderDate).toLocaleString(
            "en-US",
            {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: "America/New_York",
            }
          )}</p>
        </div>
      </div>
    `;

    const emailText = `
New ShipStation Order - Action Required

📦 Please login to ShipStation to print shipping labels for this order.

Order Details:
--------------
Order Number: ${order.orderNumber}
${
  shipstationOrderId ? `ShipStation Order ID: ${shipstationOrderId}\n` : ""
}Order Date: ${new Date(order.orderDate).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/New_York",
    })}
Customer Email: ${order.customerEmail}
Total Amount: $${order.amountPaid.toFixed(2)}

Shipping Address:
-----------------
${order.shipTo.name}
${order.shipTo.street1}
${order.shipTo.street2 ? `${order.shipTo.street2}\n` : ""}${
      order.shipTo.city
    }, ${order.shipTo.state} ${order.shipTo.postalCode}
${order.shipTo.country}
${order.shipTo.phone ? `Phone: ${order.shipTo.phone}` : ""}

Order Items:
------------
${order.items
  .map(
    (item) => `
${item.name}
SKU: ${item.sku}
Quantity: ${item.quantity}
Unit Price: $${item.unitPrice.toFixed(2)}
${
  item.options && item.options.length > 0
    ? item.options.map((opt) => `${opt.name}: ${opt.value}`).join(", ")
    : ""
}
`
  )
  .join("\n")}

Order Summary:
--------------
Subtotal: $${(
      order.amountPaid -
      order.shippingAmount -
      order.taxAmount
    ).toFixed(2)}
Shipping: $${order.shippingAmount.toFixed(2)}
Tax: $${order.taxAmount.toFixed(2)}
Total Paid: $${order.amountPaid.toFixed(2)}

Next Steps:
-----------
1. Login to ShipStation
2. Locate order #${order.orderNumber}
3. Print shipping labels
4. Prepare package for shipment

---
This email was automatically generated from jomocousins.com
Order created: ${new Date(order.orderDate).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/New_York",
    })}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Jomo Cousins Shop" <${process.env.GOOGLE_EMAIL}>`,
      to: "dorothy@lovefirstchristiancenter.com",
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log("✅ ShipStation order notification sent to Dorothy");
  } catch (error) {
    console.error("❌ Error sending ShipStation order notification:", error);
    // Don't throw - we don't want to fail the order creation if email fails
  }
}
