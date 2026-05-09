import {
  getJunlyAdminSession,
  revalidateJunlyContent,
  updateJunlyAdminCollection,
} from "@/lib/junly-admin-api";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const adminSession = await getJunlyAdminSession();

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { collectionId } = await params;
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const collection = await updateJunlyAdminCollection(
      adminSession.accessToken,
      collectionId,
      body ?? {},
    );

    revalidateJunlyContent();

    return NextResponse.json(collection);
  } catch (error) {
    console.error("[junly:admin] Failed to update collection", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update collection" },
      { status: 500 },
    );
  }
}
