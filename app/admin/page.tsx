import { JunlyAdminClient } from "@/components/admin/JunlyAdminClient";
import {
  buildJunlyAdminLinks,
  getJunlyAdminLoginPath,
  getJunlyCmsBaseUrl,
  getJunlyWebAppUrl,
  getJunlyWorkspaceId,
  resolveJunlyAdminTargetKey,
} from "@/lib/junly-config";
import {
  getJunlyAdminSession,
  getJunlyAdminStudio,
} from "@/lib/junly-admin-api";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Junly Admin",
  description: "Authenticated Junly content management backed by Tuturuuu CMS APIs.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ target?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const targetKey = resolveJunlyAdminTargetKey(resolvedSearchParams?.target);
  const adminSession = await getJunlyAdminSession();

  if (!adminSession) {
    redirect(getJunlyAdminLoginPath(targetKey));
  }

  const workspaceId = getJunlyWorkspaceId();
  const studio = await getJunlyAdminStudio(adminSession.accessToken);

  return (
    <JunlyAdminClient
      adminLinks={buildJunlyAdminLinks(workspaceId)}
      cmsBaseUrl={getJunlyCmsBaseUrl()}
      initialStudio={studio}
      initialTarget={targetKey}
      userEmail={adminSession.user.email ?? null}
      webAppUrl={getJunlyWebAppUrl()}
      workspaceId={workspaceId}
    />
  );
}
