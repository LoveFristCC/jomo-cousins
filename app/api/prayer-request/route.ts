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
    const { name, email, category, request: prayerRequest, anonymous, recaptchaToken } = body;

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
    if (!prayerRequest) {
      return NextResponse.json(
        { error: "Prayer request is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!anonymous && !name) {
      return NextResponse.json(
        { error: "Name is required when not submitting anonymously" },
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

    // Prepare email content
    const displayName = anonymous ? "Anonymous" : name;
    const emailSubject = `New Prayer Request${
      category ? ` - ${category}` : ""
    }`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3d3d3d; border-bottom: 3px solid #e31e24; padding-bottom: 10px;">
          New Prayer Request
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${displayName}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          ${category ? `<p><strong>Category:</strong> ${category}</p>` : ""}
          ${
            anonymous
              ? `<p style="color: #e31e24;"><em>Submitted Anonymously</em></p>`
              : ""
          }
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #e31e24; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #3d3d3d;">Prayer Request:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${prayerRequest}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This prayer request was submitted through jomocousins.com</p>
          <p>Submitted on: ${new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            dateStyle: "full",
            timeStyle: "short",
          })}</p>
        </div>
      </div>
    `;

    const emailText = `
New Prayer Request

From: ${displayName}
${email ? `Email: ${email}` : ""}
${category ? `Category: ${category}` : ""}
${anonymous ? "Submitted Anonymously" : ""}

Prayer Request:
${prayerRequest}

---
Submitted on: ${new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    })}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Jomo Cousins Prayer Requests" <${process.env.GOOGLE_EMAIL}>`,
      to: "prayer@lovefirstchristiancenter.com",
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log("✅ Prayer request email sent successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Prayer request submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending prayer request email:", error);
    return NextResponse.json(
      { error: "Failed to submit prayer request. Please try again." },
      { status: 500 }
    );
  }
}
