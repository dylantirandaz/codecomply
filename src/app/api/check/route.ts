import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ProposalInputSchema } from "@/lib/schemas/proposal";
import { runComplianceCheck } from "@/lib/compliance/engine";

export async function POST(request: NextRequest) {
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
      {
        error: "Compliance check failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
