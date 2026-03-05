import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ProposalInputSchema } from "@/lib/schemas/proposal";
import { runComplianceCheck } from "@/lib/compliance/engine";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// 10 compliance checks per minute per IP
const RATE_LIMIT = { maxRequests: 10, windowMs: 60 * 1000 };

export async function POST(request: NextRequest) {
  const limited = rateLimit(getClientIp(request.headers), RATE_LIMIT);
  if (limited) return limited;

  try {
    const body = await request.json();
    const input = ProposalInputSchema.parse(body);
    const { id, result } = await runComplianceCheck(input);

    return NextResponse.json({ id, result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.flatten() },
        { status: 400 }
      );
    }
    console.error("Compliance check failed:", error);
    return NextResponse.json(
      { error: "Compliance check failed. Please try again later." },
      { status: 500 }
    );
  }
}
