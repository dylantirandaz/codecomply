import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// 30 lookups per minute per IP
const RATE_LIMIT = { maxRequests: 30, windowMs: 60 * 1000 };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const limited = rateLimit(getClientIp(request.headers), RATE_LIMIT);
  if (limited) return limited;

  const { id } = await params;
  const result = store.get(id);

  if (!result) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
