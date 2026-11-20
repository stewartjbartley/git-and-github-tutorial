import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes } from "crypto";
import { db } from "./db";
import { sendLoginEmail } from "./email";

const COOKIE = "nca_session";
const MAX_AGE = 60 * 60 * 24 * 30;

function key() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters");
  return new TextEncoder().encode(s);
}

export type Session = { userId: string; email: string };

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    const { payload } = await jwtVerify(raw, key());
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    return { userId: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export async function setSession(userId: string, email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(key());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

const sha = (t: string) => createHash("sha256").update(t).digest("hex");
export const normaliseEmail = (e: string) => e.trim().toLowerCase();

/** Sends a one-time sign-in link. Does nothing (silently) for emails without a purchase. */
export async function requestLoginLink(emailRaw: string, baseUrl: string) {
  const email = normaliseEmail(emailRaw);
  const bought = await db.purchase.findFirst({ where: { email, status: "paid" } });
  if (!bought) return;
  const recent = await db.loginToken.count({
    where: { email, createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) } },
  });
  if (recent >= 3) return;
  await issueLoginLink(email, baseUrl);
}

export async function issueLoginLink(email: string, baseUrl: string) {
  const token = randomBytes(32).toString("base64url");
  await db.loginToken.create({
    data: { email, tokenHash: sha(token), expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
  });
  await sendLoginEmail(email, `${baseUrl}/api/auth/verify?token=${token}`);
}

/** Consumes a token and returns the user, or null. */
export async function consumeToken(token: string) {
  const row = await db.loginToken.findUnique({ where: { tokenHash: sha(token) } });
  if (!row || row.usedAt || row.expiresAt < new Date()) return null;
  const claimed = await db.loginToken.updateMany({
    where: { id: row.id, usedAt: null },
    data: { usedAt: new Date() },
  });
  if (claimed.count !== 1) return null;
  return db.user.upsert({ where: { email: row.email }, update: {}, create: { email: row.email } });
}

export async function hasAccess(email: string | null | undefined) {
  if (process.env.DEV_UNLOCK_ALL === "1" && process.env.NODE_ENV !== "production") return true;
  if (!email) return false;
  const p = await db.purchase.findFirst({ where: { email: normaliseEmail(email), status: "paid" } });
  return !!p;
}
