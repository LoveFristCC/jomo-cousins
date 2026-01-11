import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      organization,
      eventDate,
      eventType,
      message,
      bookingType = "jomo",
      recaptchaToken,
    } = body;

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification is required" },
        { status: 400 }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

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

    // Determine recipients based on booking type
    const recipients =
      bookingType === "jomo-charmaine"
        ? "tiffanie@lovefirstchristiancenter.com, bookjomocousins@gmail.com"
        : "tiffanie@lovefirstchristiancenter.com, bookjomocousins@gmail.com,";

    // Prepare email content
    const bookingTypeLabel =
      bookingType === "jomo-charmaine"
        ? "Jomo & Charmaine"
        : "Pastor Jomo Cousins";
    const emailSubject = `New Booking Request - ${bookingTypeLabel}${
      eventType ? ` (${eventType})` : ""
    }`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3d3d3d; border-bottom: 3px solid #e31e24; padding-bottom: 10px;">
          New Booking Request - ${bookingTypeLabel}
        </h2>

        <div style="margin: 20px 0;">
          <h3 style="color: #3d3d3d; margin-bottom: 15px;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${
            organization
              ? `<p><strong>Organization:</strong> ${organization}</p>`
              : ""
          }
        </div>

        ${
          eventDate || eventType
            ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #3d3d3d; margin-bottom: 15px;">Event Details</h3>
            ${
              eventType
                ? `<p><strong>Event Type:</strong> ${eventType}</p>`
                : ""
            }
            ${
              eventDate
                ? `<p><strong>Event Date:</strong> ${eventDate}</p>`
                : ""
            }
          </div>
        `
            : ""
        }

        <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #e31e24; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #3d3d3d;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This booking request was submitted through jomocousins.com</p>
          <p>Submitted on: ${new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            dateStyle: "full",
            timeStyle: "short",
          })}</p>
        </div>
      </div>
    `;

    const emailText = `
New Booking Request - ${bookingTypeLabel}

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
${organization ? `Organization: ${organization}` : ""}

${
  eventDate || eventType
    ? `
Event Details:
${eventType ? `Event Type: ${eventType}` : ""}
${eventDate ? `Event Date: ${eventDate}` : ""}
`
    : ""
}

Message:
${message}

---
Submitted on: ${new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    })}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Jomo Cousins Booking Requests" <${process.env.GOOGLE_EMAIL}>`,
      to: recipients,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      replyTo: email, // Allow easy reply to the requester
    });

    console.log(`✅ Booking request email sent successfully to: ${recipients}`);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending booking request email:", error);
    return NextResponse.json(
      { error: "Failed to submit booking request. Please try again." },
      { status: 500 }
    );
  }
}
