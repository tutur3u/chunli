import {
  getJunlyApiBaseUrl,
  getJunlyWorkspaceId,
} from "@/lib/junly-config";
import { getJunlyAdminSession } from "@/lib/junly-admin-api";
import { junlyExternalProjectManifest } from "@/lib/junly-external-project-manifest";
import { linkPublicFolderAssets } from "@/lib/tuturuuu-public-folder-sync";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function readApiError(response: Response) {
  const fallback = `Tuturuuu sync diff failed with status ${response.status}`;
  const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
  return typeof data?.error === "string" && data.error.trim() ? data.error : fallback;
}

export async function POST() {
  const session = await getJunlyAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaceId = getJunlyWorkspaceId();
  const apiBaseUrl = getJunlyApiBaseUrl();
  const manifest = linkPublicFolderAssets(junlyExternalProjectManifest);
  const setupResponse = await fetch(
    `${apiBaseUrl.replace(/\/+$/, "")}/workspaces/${encodeURIComponent(
      workspaceId,
    )}/external-projects/setup`,
    {
      body: JSON.stringify({ manifest }),
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `${session.tokenType} ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  if (!setupResponse.ok) {
    return NextResponse.json(
      { error: await readApiError(setupResponse) },
      { status: setupResponse.status },
    );
  }

  const response = await fetch(
    `${apiBaseUrl.replace(/\/+$/, "")}/workspaces/${encodeURIComponent(
      workspaceId,
    )}/external-projects/sync/diff`,
    {
      body: JSON.stringify({ manifest }),
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `${session.tokenType} ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  if (!response.ok) {
    return NextResponse.json({ error: await readApiError(response) }, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
