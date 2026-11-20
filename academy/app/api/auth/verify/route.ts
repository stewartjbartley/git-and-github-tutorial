import { NextResponse } from "next/server";
import { consumeToken, setSession } from "@/lib/auth";
import { baseUrl } from "@/lib/stripe";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const user = token ? await consumeToken(token) : null;
  if (!user) return NextResponse.redirect(new URL("/login?error=1", baseUrl()));
  await setSession(user.id, user.email);
  return NextResponse.redirect(new URL("/course", baseUrl()));
}
