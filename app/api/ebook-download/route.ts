import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * GET /api/ebook-download?session_id=cs_...
 * Streams the purchased eBook PDF after verifying the Stripe session was paid.
 * The Sanity file URL is never exposed to the buyer.
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid download link" }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Invalid download link" }, { status: 404 });
  }

  const productSlug = session.metadata?.productSlug;
  if (
    session.payment_status !== "paid" ||
    session.metadata?.productType !== "ebook" ||
    !productSlug
  ) {
    return NextResponse.json({ error: "Invalid download link" }, { status: 403 });
  }

  const ebook = await client.fetch<{ name: string; url: string | null } | null>(
    `*[_type == "product" && slug.current == $slug][0]{ name, "url": ebookFile.asset->url }`,
    { slug: productSlug }
  );

  if (!ebook?.url) {
    console.error(`[eBook Download] No eBook file for product: ${productSlug}`);
    return NextResponse.json(
      { error: "eBook file not found. Please contact support@pastorjomo.com" },
      { status: 404 }
    );
  }

  const fileResponse = await fetch(ebook.url);
  if (!fileResponse.ok || !fileResponse.body) {
    console.error(`[eBook Download] Failed to fetch file: ${fileResponse.status}`);
    return NextResponse.json(
      { error: "Download failed. Please try again or contact support@pastorjomo.com" },
      { status: 502 }
    );
  }

  const filename = `${ebook.name.replace(/[^\w\s-]/g, "").trim() || "ebook"}.pdf`;

  return new NextResponse(fileResponse.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
