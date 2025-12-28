import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerBySlugQuery } from "@/sanity/lib/queries";
import { jsPDF } from "jspdf";
import { PortableTextBlock } from "sanity";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Prayer slug is required" },
        { status: 400 }
      );
    }

    // Fetch prayer data from Sanity
    const prayer = await sanityFetch({
      query: prayerBySlugQuery,
      params: { slug },
    });

    if (!prayer) {
      return NextResponse.json(
        { error: "Prayer not found" },
        { status: 404 }
      );
    }

    if (!prayer.fullTranscript) {
      return NextResponse.json(
        { error: "Prayer does not have a transcript" },
        { status: 404 }
      );
    }

    // Helper function to convert Portable Text to plain text
    const portableTextToPlainText = (blocks: PortableTextBlock[]): string => {
      if (!blocks || !Array.isArray(blocks)) return "";
      return blocks
        .map((block: any) => {
          if (block._type !== "block" || !block.children) return "";
          return block.children.map((child: any) => child.text || "").join("");
        })
        .join("\n\n");
    };

    // Extract data
    const categories = prayer.categories?.map((cat: any) => cat.title) || [];
    const prayerText = portableTextToPlainText(prayer.fullTranscript);

    // Create PDF using jsPDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(61, 61, 61);
    doc.text(prayer.title, margin, yPosition, { maxWidth });
    yPosition += 15;

    // Categories
    if (categories.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(102, 102, 102);
      doc.text(`Categories: ${categories.join(", ")}`, margin, yPosition, { maxWidth });
      yPosition += 8;
    }

    // Published date
    if (prayer.publishedAt) {
      doc.text(`Published: ${new Date(prayer.publishedAt).toLocaleDateString()}`, margin, yPosition, { maxWidth });
      yPosition += 8;
    }

    // Branding
    doc.setFontSize(10);
    doc.setTextColor(227, 30, 36);
    doc.text("Prayer with Pastor Jomo Cousins", margin, yPosition);
    yPosition += 15;

    // Divider line
    doc.setDrawColor(227, 30, 36);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Personal Note (if exists)
    if (prayer.personalNote) {
      doc.setFillColor(249, 249, 249);
      doc.rect(margin, yPosition, maxWidth, 30, 'F');
      yPosition += 5;

      doc.setFontSize(9);
      doc.setTextColor(102, 102, 102);
      doc.text("A Personal Note from Pastor Jomo:", margin + 5, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setTextColor(61, 61, 61);
      const noteLines = doc.splitTextToSize(prayer.personalNote, maxWidth - 10);
      doc.text(noteLines, margin + 5, yPosition);
      yPosition += (noteLines.length * 5) + 10;
    }

    // Prayer Text
    doc.setFontSize(14);
    doc.setTextColor(61, 61, 61);
    doc.text("Full Prayer Text", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    const paragraphs = prayerText.split("\n\n").filter(p => p.trim());

    for (const paragraph of paragraphs) {
      const lines = doc.splitTextToSize(paragraph, maxWidth);

      // Check if we need a new page
      if (yPosition + (lines.length * 6) > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(lines, margin, yPosition);
      yPosition += (lines.length * 6) + 8;
    }

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(153, 153, 153);
      doc.text("This prayer guide is provided by Pastor Jomo Cousins", pageWidth / 2, pageHeight - 15, { align: "center" });
      doc.setTextColor(227, 30, 36);
      doc.text("www.jomocousins.com", pageWidth / 2, pageHeight - 10, { align: "center" });
    }

    // Generate PDF as ArrayBuffer
    const pdfBuffer = doc.output("arraybuffer");

    // Create filename
    const filename = `${prayer.slug}-prayer-guide.pdf`;

    // Convert to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF as downloadable file
    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
