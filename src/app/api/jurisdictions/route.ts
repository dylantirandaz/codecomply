import { NextRequest, NextResponse } from "next/server";
import { listJurisdictions } from "@/lib/codes/loader";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// 30 lookups per minute per IP
const RATE_LIMIT = { maxRequests: 30, windowMs: 60 * 1000 };

export async function GET(request: NextRequest) {
  const limited = rateLimit(getClientIp(request.headers), RATE_LIMIT);
  if (limited) return limited;

  return NextResponse.json({ jurisdictions: listJurisdictions() });
}
