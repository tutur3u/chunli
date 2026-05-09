export const JUNLY_APP_NAME = "junly";

export type JunlyAdminTargetKey =
  | "dashboard"
  | "library"
  | "preview"
  | "members"
  | "settings";

type JunlyAdminTarget = {
  actionLabel: string;
  description: string;
  key: JunlyAdminTargetKey;
  label: string;
  pathSuffix: string;
};

export const JUNLY_ADMIN_TARGETS: JunlyAdminTarget[] = [
  {
    actionLabel: "Open CMS Home",
    description: "Review workspace status and jump into the content studio.",
    key: "dashboard",
    label: "CMS Home",
    pathSuffix: "",
  },
  {
    actionLabel: "Manage Library",
    description: "Edit panels, games, research, assets, and publishing workflow.",
    key: "library",
    label: "Library",
    pathSuffix: "/library",
  },
  {
    actionLabel: "Preview Delivery",
    description: "Inspect the delivered portfolio payload before publishing.",
    key: "preview",
    label: "Preview",
    pathSuffix: "/preview",
  },
  {
    actionLabel: "Manage Members",
    description: "Open CMS workspace membership and collaborator access.",
    key: "members",
    label: "Members",
    pathSuffix: "/members",
  },
  {
    actionLabel: "Open Settings",
    description: "Tune the external project binding and workspace settings.",
    key: "settings",
    label: "Settings",
    pathSuffix: "/settings",
  },
];

function isEnabled(value: string | undefined) {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function getAdminDevMode() {
  return isEnabled(process.env.DEV_MODE ?? process.env.NEXT_PUBLIC_DEV_MODE);
}

function getConfiguredUrl({
  envName,
  localUrl,
  productionUrl,
}: {
  envName: string;
  localUrl: string;
  productionUrl: string;
}) {
  const configured = process.env[envName] ?? process.env[`NEXT_PUBLIC_${envName}`];

  if (configured?.trim()) {
    return trimTrailingSlash(configured.trim());
  }

  return getAdminDevMode() ? localUrl : productionUrl;
}

export function getJunlyApiBaseUrl() {
  return (
    process.env.TUTURUUU_API_BASE_URL ??
    process.env.NEXT_PUBLIC_TUTURUUU_API_BASE_URL ??
    "https://tuturuuu.com/api/v1"
  );
}

export function getJunlyWorkspaceId() {
  const workspaceId =
    process.env.TUTURUUU_JUNLY_WORKSPACE_ID ??
    process.env.NEXT_PUBLIC_TUTURUUU_JUNLY_WORKSPACE_ID;

  if (!workspaceId?.trim()) {
    throw new Error(
      "[junly] Missing TUTURUUU_JUNLY_WORKSPACE_ID. Point it at the EPM workspace that uses the junly adapter.",
    );
  }

  return workspaceId.trim();
}

export function getJunlyAppId() {
  return (process.env.JUNLY_APP_ID ?? JUNLY_APP_NAME).trim().toLowerCase();
}

export function getJunlyAppSecret() {
  const secret =
    process.env.JUNLY_APP_SECRET ?? process.env.TUTURUUU_JUNLY_APP_SECRET;

  if (!secret?.trim()) {
    throw new Error("[junly] Missing JUNLY_APP_SECRET.");
  }

  return secret.trim();
}

export function getJunlyCmsBaseUrl() {
  return getConfiguredUrl({
    envName: "TUTURUUU_CMS_APP_URL",
    localUrl: "http://localhost:7811",
    productionUrl: "https://cms.tuturuuu.com",
  });
}

export function getJunlyWebAppUrl() {
  return getConfiguredUrl({
    envName: "TUTURUUU_WEB_APP_URL",
    localUrl: "http://localhost:7803",
    productionUrl: "https://tuturuuu.com",
  });
}

export function getJunlyAppBaseUrl(requestOrigin?: string) {
  const configured =
    process.env.JUNLY_APP_URL ??
    process.env.NEXT_PUBLIC_JUNLY_APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL;

  if (configured?.trim()) {
    return trimTrailingSlash(configured.trim());
  }

  if (requestOrigin?.trim()) {
    return trimTrailingSlash(requestOrigin.trim());
  }

  if (process.env.VERCEL_URL?.trim()) {
    return `https://${trimTrailingSlash(process.env.VERCEL_URL.trim())}`;
  }

  return "http://localhost:3000";
}

export function sanitizeJunlyNextPath(
  rawValue: string | null | undefined,
  requestOrigin = "http://localhost",
  fallbackPath = "/admin",
) {
  if (!rawValue?.trim() || rawValue.startsWith("//")) {
    return fallbackPath;
  }

  try {
    const parsed = new URL(rawValue, requestOrigin);

    if (parsed.origin !== requestOrigin) {
      return fallbackPath;
    }

    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return fallbackPath;
  }
}

export function getJunlyLoginPath(nextUrl = "/admin") {
  const loginUrl = new URL("/login", "http://junly.local");
  loginUrl.searchParams.set("nextUrl", nextUrl);
  return `${loginUrl.pathname}${loginUrl.search}`;
}

export function resolveJunlyAdminTargetKey(
  value: string | null | undefined,
): JunlyAdminTargetKey {
  return JUNLY_ADMIN_TARGETS.some((target) => target.key === value)
    ? (value as JunlyAdminTargetKey)
    : "library";
}

export function getJunlyAdminTarget(key: JunlyAdminTargetKey) {
  return (
    JUNLY_ADMIN_TARGETS.find((target) => target.key === key) ??
    JUNLY_ADMIN_TARGETS[1]
  );
}

export function getJunlyCmsWorkspacePath(
  targetKey: JunlyAdminTargetKey,
  workspaceId = getJunlyWorkspaceId(),
) {
  const target = getJunlyAdminTarget(targetKey);
  return `/${encodeURIComponent(workspaceId)}${target.pathSuffix}`;
}

export function buildJunlyCmsUrl({
  cmsBaseUrl = getJunlyCmsBaseUrl(),
  targetKey,
  workspaceId = getJunlyWorkspaceId(),
}: {
  cmsBaseUrl?: string;
  targetKey: JunlyAdminTargetKey;
  workspaceId?: string;
}) {
  return new URL(getJunlyCmsWorkspacePath(targetKey, workspaceId), cmsBaseUrl).toString();
}

export function buildJunlyCentralizedLoginUrl({
  appBaseUrl = getJunlyAppBaseUrl(),
  nextUrl = "/admin",
  webAppUrl = getJunlyWebAppUrl(),
}: {
  appBaseUrl?: string;
  nextUrl?: string;
  webAppUrl?: string;
}) {
  const appOrigin = new URL(appBaseUrl).origin;
  const verifyUrl = new URL("/verify-token", appOrigin);
  verifyUrl.searchParams.set("nextUrl", sanitizeJunlyNextPath(nextUrl, appOrigin));

  const loginUrl = new URL("/login", webAppUrl);
  loginUrl.searchParams.set("returnUrl", verifyUrl.toString());
  return loginUrl.toString();
}

export function getJunlyAdminLoginPath(targetKey: JunlyAdminTargetKey) {
  return `/admin/login?next=${encodeURIComponent(targetKey)}`;
}

export function buildJunlyAdminLinks(workspaceId = getJunlyWorkspaceId()) {
  const cmsBaseUrl = getJunlyCmsBaseUrl();

  return JUNLY_ADMIN_TARGETS.map((target) => ({
    ...target,
    cmsHref: buildJunlyCmsUrl({
      cmsBaseUrl,
      targetKey: target.key,
      workspaceId,
    }),
    loginHref: getJunlyAdminLoginPath(target.key),
  }));
}
