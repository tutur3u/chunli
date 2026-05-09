import {
  buildJunlyCentralizedLoginUrl,
  resolveJunlyAdminTargetKey,
} from "@/lib/junly-config";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const targetKey = resolveJunlyAdminTargetKey(request.nextUrl.searchParams.get("next"));
  const nextUrl = targetKey === "dashboard" ? "/admin" : `/admin?target=${targetKey}`;

  return NextResponse.redirect(
    buildJunlyCentralizedLoginUrl({
      appBaseUrl: request.nextUrl.origin,
      nextUrl,
    }),
  );
}
