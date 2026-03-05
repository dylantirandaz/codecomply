import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { callClaude } from "@/lib/anthropic";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// 5 PDF uploads per minute per IP
const RATE_LIMIT = { maxRequests: 5, windowMs: 60 * 1000 };

export async function POST(request: NextRequest) {
  const limited = rateLimit(getClientIp(request.headers), RATE_LIMIT);
  if (limited) return limited;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 10MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const pdfData = await parser.getText();
    const pdfText = pdfData.text.slice(0, 8000);

    const prompt = `Extract building development proposal data from this document text. Return ONLY valid JSON with these fields (use null for fields you cannot determine):

{
  "projectName": string or null,
  "projectAddress": string or null,
  "zoningDistrict": string or null (e.g. "th-1a", "th-2a", "th-3a"),
  "lotArea": number or null (in square feet),
  "lotWidth": number or null (in feet),
  "numberOfUnits": number or null,
  "numberOfBuildings": number or null,
  "buildingHeight": number or null (in feet),
  "numberOfStories": number or null,
  "frontYardSetback": number or null (in feet),
  "sideYardSetback": number or null (in feet),
  "rearYardSetback": number or null (in feet),
  "buildingFootprint": number or null (in square feet),
  "parkingSpaces": number or null
}

Document text:
${pdfText}`;

    const response = await callClaude(prompt);

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Could not extract data from PDF" },
        { status: 422 }
      );
    }

    const extractedData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ extractedData });
  } catch (error) {
    console.error("PDF upload failed:", error);
    return NextResponse.json(
      { error: "PDF processing failed. Please try again later." },
      { status: 500 }
    );
  }
}
