import { NextResponse } from "next/server";
import { requestLoginLink } from "@/lib/auth";
import { baseUrl } from "@/lib/stripe";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email : "";
  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  await requestLoginLink(email, baseUrl());
  // Same answer whether or not the email has a purchase, so the form cannot be used to probe customers.
  return NextResponse.json({ ok: true });
}
