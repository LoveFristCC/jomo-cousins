import { NextRequest, NextResponse } from "next/server";

// Kajabi form IDs for different newsletter types
const KAJABI_FORMS = {
  main: "2148913798", // Dr. Jomo Cousins main newsletter
  "jomo-charmaine": "2149392774", // Jomo & Charmaine couples ministry
  "prayer-request": "2149399091", // Prayer request submissions
} as const;

type NewsletterType = keyof typeof KAJABI_FORMS;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, type = "main", formId, customFields } = body;

    // Determine which form ID to use (direct formId or from type)
    let targetFormId: string;

    if (formId) {
      // Use directly provided formId
      targetFormId = formId;
    } else if (KAJABI_FORMS[type as NewsletterType]) {
      // Use predefined form ID from type
      targetFormId = KAJABI_FORMS[type as NewsletterType];
    } else {
      return NextResponse.json(
        { error: "Invalid newsletter type or formId" },
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

    // Prepare submission data
    // Try different formats for Kajabi
    const submissionData: Record<string, any> = customFields
      ? {
          email,
          name,
          ...customFields, // Try nested format
        }
      : {
          email,
          name,
        };

    // Submit to Kajabi
    const kajabiResponse = await fetch(
      `https://jomo-cousins.mykajabi.com/forms/${targetFormId}/form_submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      }
    );

    if (!kajabiResponse.ok) {
      const errorText = await kajabiResponse.text();
      console.error("Kajabi submission failed:", errorText);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    // Custom success messages based on type
    const successMessages = {
      main: "Successfully subscribed!",
      "jomo-charmaine": "Successfully subscribed! Download the book now. ",
      "prayer-request": "Prayer request submitted to Kajabi successfully!",
    };

    return NextResponse.json(
      {
        success: true,
        message:
          successMessages[type as NewsletterType] || "Successfully submitted!",
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
