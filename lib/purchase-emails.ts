import nodemailer from "nodemailer";

interface ProductItem {
  name: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface EmailData {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  items: ProductItem[];
  productType: "physical" | "digital";
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function sendPurchaseThankYouEmail(data: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_EMAIL_PASSWORD,
    },
  });

  const subject =
    data.productType === "digital"
      ? "Thank You for Your Purchase - Access Your Content"
      : "Thank You for Your Order!";

  const htmlContent = generateEmailHTML(data);
  const textContent = generateEmailText(data);

  try {
    await transporter.sendMail({
      from: `"Jomo Cousins" <${process.env.GOOGLE_EMAIL}>`,
      replyTo: "support@pastorjomo.com",
      to: data.customerEmail,
      subject,
      html: htmlContent,
      text: textContent,
    });
    console.log(`Thank you email sent to ${data.customerEmail}`);
  } catch (error) {
    console.error("Error sending thank you email:", error);
    throw error;
  }
}

function generateEmailHTML(data: EmailData): string {
  const itemsList = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.name}${item.size ? ` - Size: ${item.size}` : ""}${
        item.color ? ` - Color: ${item.color}` : ""
      }
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${item.quantity}
      </td>
    </tr>
  `
    )
    .join("");

  if (data.productType === "digital") {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
    <h1 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Your Purchase!</h1>

    <p>Hi ${data.customerName},</p>

    <p>Thank you so much for your purchase! I'm excited to have you as part of our community.</p>

    <div style="background-color: #4CAF50; color: white; padding: 20px; border-radius: 5px; margin: 30px 0; text-align: center;">
      <h2 style="margin: 0 0 15px 0; color: white;">Access Your Content Now</h2>
      <p style="margin: 0 0 20px 0;">Click the button below to log in and access your digital content:</p>
      <a href="https://jomo-cousins.mykajabi.com/login"
         style="display: inline-block; background-color: white; color: #4CAF50; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
        Access Your Content
      </a>
    </div>

    <p><strong>Login URL:</strong> <a href="https://jomo-cousins.mykajabi.com/login">https://jomo-cousins.mykajabi.com/login</a></p>

    <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>First time accessing?</strong></p>
      <p style="margin: 0;">If you didn't receive a registration email from Kajabi, you can register your account here: <a href="https://jomo-cousins.mykajabi.com/password/new">https://jomo-cousins.mykajabi.com/password/new</a></p>
    </div>

    <div style="margin: 30px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 10px;">Order Details</h3>
      <p><strong>Order Number:</strong> ${data.orderNumber}</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr>
            <th style="padding: 10px; border-bottom: 2px solid #2c3e50; text-align: left;">Item</th>
            <th style="padding: 10px; border-bottom: 2px solid #2c3e50; text-align: right;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>
    </div>

    <p style="margin-top: 30px;">If you have any questions or need assistance, please email us at <a href="mailto:support@pastorjomo.com">support@pastorjomo.com</a></p>

    <p style="margin-top: 20px;">Blessings,<br><strong>Jomo Cousins</strong></p>
  </div>

  <div style="margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px;">
    <p>You received this email because you made a purchase at jomocousins.com</p>
  </div>
</body>
</html>
    `;
  } else {
    // Physical product email
    const shippingAddressHTML = data.shippingAddress
      ? `
    <div style="margin: 20px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 10px;">Shipping Address</h3>
      <p style="margin: 5px 0;">
        ${data.shippingAddress.line1}${
          data.shippingAddress.line2 ? `<br>${data.shippingAddress.line2}` : ""
        }<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.state} ${
          data.shippingAddress.postal_code
        }<br>
        ${data.shippingAddress.country}
      </p>
    </div>
    `
      : "";

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
    <h1 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Your Order!</h1>

    <p>Hi ${data.customerName},</p>

    <p>Thank you so much for your order! I truly appreciate your support.</p>

    <div style="background-color: #3498db; color: white; padding: 20px; border-radius: 5px; margin: 30px 0;">
      <h3 style="margin: 0 0 10px 0; color: white;">What Happens Next?</h3>
      <p style="margin: 5px 0;">You'll receive a shipping confirmation email with tracking information once your order ships.</p>
    </div>

    <div style="margin: 30px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 10px;">Order Details</h3>
      <p><strong>Order Number:</strong> ${data.orderNumber}</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr>
            <th style="padding: 10px; border-bottom: 2px solid #2c3e50; text-align: left;">Item</th>
            <th style="padding: 10px; border-bottom: 2px solid #2c3e50; text-align: right;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>
    </div>

    ${shippingAddressHTML}

    <p style="margin-top: 30px;">If you have any questions about your order, please email us at <a href="mailto:support@pastorjomo.com">support@pastorjomo.com</a></p>

    <p style="margin-top: 20px;">Blessings,<br><strong>Jomo Cousins</strong></p>
  </div>

  <div style="margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px;">
    <p>You received this email because you made a purchase at jomocousins.com</p>
  </div>
</body>
</html>
    `;
  }
}

function generateEmailText(data: EmailData): string {
  const itemsList = data.items
    .map(
      (item) =>
        `- ${item.name}${item.size ? ` - Size: ${item.size}` : ""}${
          item.color ? ` - Color: ${item.color}` : ""
        } (Qty: ${item.quantity})`
    )
    .join("\n");

  if (data.productType === "digital") {
    return `
Thank You for Your Purchase!

Hi ${data.customerName},

Thank you so much for your purchase! We're excited to have you as part of our community.

ACCESS YOUR CONTENT NOW
Click here to log in and access your digital content:
https://jomo-cousins.mykajabi.com/login

FIRST TIME ACCESSING?
If you didn't receive a registration email from Kajabi, you can register your account here:
https://jomo-cousins.mykajabi.com/password/new

Order Details:
Order Number: ${data.orderNumber}

Items:
${itemsList}

If you have any questions or need assistance, please email us at support@pastorjomo.com

Blessings,
Jomo Cousins

---
You received this email because you made a purchase at jomocousins.com
    `.trim();
  } else {
    const shippingAddressText = data.shippingAddress
      ? `
Shipping Address:
${data.shippingAddress.line1}
${data.shippingAddress.line2 || ""}
${data.shippingAddress.city}, ${data.shippingAddress.state} ${
          data.shippingAddress.postal_code
        }
${data.shippingAddress.country}
      `.trim()
      : "";

    return `
Thank You for Your Order!

Hi ${data.customerName},

Thank you so much for your order! We truly appreciate your support.

WHAT HAPPENS NEXT?
You'll receive a shipping confirmation email with tracking information once your order ships.

Order Details:
Order Number: ${data.orderNumber}

Items:
${itemsList}

${shippingAddressText}

If you have any questions about your order, please email us at support@pastorjomo.com

Blessings,
Jomo Cousins

---
You received this email because you made a purchase at jomocousins.com
    `.trim();
  }
}
