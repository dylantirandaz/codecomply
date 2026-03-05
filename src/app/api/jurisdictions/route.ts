import { NextResponse } from "next/server";
import { listJurisdictions } from "@/lib/codes/loader";

export async function GET() {
  return NextResponse.json({ jurisdictions: listJurisdictions() });
}
