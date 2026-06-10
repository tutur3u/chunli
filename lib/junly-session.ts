import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { getJunlyApiBaseUrl, getJunlyWorkspaceId } from "@/lib/junly-config";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

const JUNLY_SESSION_COOKIE = "junly_admin_session";
const SESSION_VERSION = "v1";

export type JunlyAdminSession = {
  accessToken: string;
  app: {
    name: string;
  };
  expiresAt: string;
  tokenType: "Bearer";
  workspaceId: string;
  user: {
    email: string | null;
    id: string;
  };
};

function getSessionSecret() {
  const secret = process.env.JUNLY_SESSION_SECRET ?? process.env.JUNLY_APP_SECRET;

  if (!secret?.trim()) {
    throw new Error("[junly] Missing JUNLY_SESSION_SECRET or JUNLY_APP_SECRET.");
  }

  return createHash("sha256").update(secret.trim()).digest();
}

function encode(value: Buffer) {
  return value.toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url");
}

function sealSession(session: JunlyAdminSession) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getSessionSecret(), iv);
  const plaintext = Buffer.from(JSON.stringify(session), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [SESSION_VERSION, encode(iv), encode(tag), encode(ciphertext)].join(".");
}

function unsealSession(value: string): JunlyAdminSession | null {
  const [version, encodedIv, encodedTag, encodedCiphertext] = value.split(".");

  if (version !== SESSION_VERSION || !encodedIv || !encodedTag || !encodedCiphertext) {
    return null;
  }

  try {
    const decipher = createDecipheriv("aes-256-gcm", getSessionSecret(), decode(encodedIv));
    decipher.setAuthTag(decode(encodedTag));
    const plaintext = Buffer.concat([
      decipher.update(decode(encodedCiphertext)),
      decipher.final(),
    ]).toString("utf8");
    const session = JSON.parse(plaintext) as JunlyAdminSession;

    if (!session.accessToken || !session.user?.id || !session.expiresAt || !session.workspaceId) {
      return null;
    }

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      return null;
    }

    if (session.workspaceId !== getJunlyWorkspaceId()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function getJunlySessionValidationUrl(workspaceId: string) {
  const apiBaseUrl = getJunlyApiBaseUrl().replace(/\/+$/, "");
  return `${apiBaseUrl}/workspaces/${encodeURIComponent(workspaceId)}/external-projects/summary`;
}

async function validateJunlySession(session: JunlyAdminSession) {
  try {
    const response = await fetch(getJunlySessionValidationUrl(session.workspaceId), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `${session.tokenType} ${session.accessToken}`,
      },
    });

    return response.ok ? session : null;
  } catch {
    return null;
  }
}

export async function getJunlySessionFromCookies() {
  const cookieStore = await cookies();
  const value = cookieStore.get(JUNLY_SESSION_COOKIE)?.value;
  const session = value ? unsealSession(value) : null;

  return session ? validateJunlySession(session) : null;
}

export function setJunlySessionCookie(
  response: NextResponse,
  session: JunlyAdminSession,
) {
  response.cookies.set(JUNLY_SESSION_COOKIE, sealSession(session), {
    expires: new Date(session.expiresAt),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearJunlySessionCookie(response: NextResponse) {
  response.cookies.set(JUNLY_SESSION_COOKIE, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
