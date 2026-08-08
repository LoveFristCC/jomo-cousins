import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { prayerWeekBySlugQuery } from "@/sanity/lib/queries";
import { jsPDF } from "jspdf";

/**
 * Generates a printable PDF of a week's prayer points — the day-by-day focus
 * and scriptures, plus any not-yet-sorted pool. Mirrors the styling of
 * /api/generate-prayer-pdf.
 *
 *   GET /api/generate-week-pdf?slug=week-1-the-anatomy-of-a-breakthrough
 */
export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Week slug is required" }, { status: 400 });
    }

    const week: any = await sanityFetch({
      query: prayerWeekBySlugQuery,
      params: { slug },
    });

    if (!week) {
      return NextResponse.json({ error: "Week not found" }, { status: 404 });
    }

    const days = (week.days || []).filter((d: any) => d?.day);
    const pool = week.unsortedScriptures || [];
    if (days.length === 0 && pool.length === 0) {
      return NextResponse.json(
        { error: "This week has no prayer points yet" },
        { status: 404 }
      );
    }

    const RED: [number, number, number] = [227, 30, 36];
    const CHARCOAL: [number, number, number] = [61, 61, 61];
    const MUTED: [number, number, number] = [102, 102, 102];

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    /** Ensure `needed` mm fits; otherwise start a new page. */
    const ensure = (needed: number) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    /** Write wrapped text at the given size/color and advance y. */
    const write = (
      text: string,
      size: number,
      color: [number, number, number],
      lineH: number,
      opts: { indent?: number; gap?: number } = {}
    ) => {
      const indent = opts.indent ?? 0;
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, maxWidth - indent);
      ensure(lines.length * lineH);
      doc.text(lines, margin + indent, y);
      y += lines.length * lineH + (opts.gap ?? 0);
    };

    const seriesTitle = week.series?.title || "Prayer Points";

    // Header
    write(seriesTitle, 11, RED, 6, { gap: 2 });
    write(`Week ${week.weekNumber}: ${week.title}`, 20, CHARCOAL, 9, { gap: 3 });
    write(
      "Prayer points to pray over each morning, Monday through Friday.",
      11,
      MUTED,
      6,
      { gap: 6 }
    );

    doc.setDrawColor(...RED);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /** Render one scripture: reference · translation, then the verse text. */
    const renderScripture = (s: any) => {
      const ref = [s.reference, s.translation].filter(Boolean).join("  ·  ");
      ensure(14);
      write(ref, 11, RED, 6, { gap: 1 });
      write(s.text || "", 11, CHARCOAL, 6, { gap: 6 });
    };

    // Days
    for (const day of days) {
      ensure(20);
      write(`${day.day}${day.focus ? " — " + day.focus : ""}`, 14, CHARCOAL, 8, {
        gap: 2,
      });
      if (day.prompt) write(day.prompt, 10, MUTED, 5, { gap: 4 });
      for (const s of day.scriptures || []) renderScripture(s);
      y += 4;
    }

    // Unsorted pool
    if (pool.length > 0) {
      ensure(20);
      write(
        days.length > 0 ? "More Prayer Points This Week" : "This Week's Prayer Points",
        14,
        CHARCOAL,
        8,
        { gap: 4 }
      );
      for (const s of pool) renderScripture(s);
    }

    // Footer on every page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(153, 153, 153);
      doc.text(
        "Provided by Pastor Jomo Cousins",
        pageWidth / 2,
        pageHeight - 15,
        { align: "center" }
      );
      doc.setTextColor(...RED);
      doc.text("www.jomocousins.com", pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
    }

    const pdfBuffer = doc.output("arraybuffer");
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}-prayer-points.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating week PDF:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
