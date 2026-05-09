import { clearJunlySessionCookie } from "@/lib/junly-session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  clearJunlySessionCookie(response);
  return response;
}
