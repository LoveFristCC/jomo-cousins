import { NextRequest, NextResponse } from "next/server";

// Kajabi form IDs for different newsletter types
const KAJABI_FORMS = {
  main: "2148913798", // Dr. Jomo Cousins main newsletter
  "jomo-charmaine": "2149392774", // Jomo & Charmaine couples ministry
} as const;

type NewsletterType = keyof typeof KAJABI_FORMS;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, type = "main" } = body;

    // Validate newsletter type
    if (!KAJABI_FORMS[type as NewsletterType]) {
      return NextResponse.json(
        { error: "Invalid newsletter type" },
        { status: 400 }
      );
    }

    // Validate email
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

    // Get the appropriate Kajabi form ID
    const formId = KAJABI_FORMS[type as NewsletterType];

    // Submit to Kajabi
    const kajabiResponse = await fetch(
      `https://jomo-cousins.mykajabi.com/forms/${formId}/form_submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      }
    );

    if (!kajabiResponse.ok) {
      console.error("Kajabi submission failed:", await kajabiResponse.text());
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    // Custom success messages based on type
    const successMessages = {
      main: "Successfully subscribed!",
      "jomo-charmaine": "Successfully subscribed! Check your email for the free eBook.",
    };

    return NextResponse.json(
      {
        success: true,
        message: successMessages[type as NewsletterType],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
