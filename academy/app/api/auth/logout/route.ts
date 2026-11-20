import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";
import { baseUrl } from "@/lib/stripe";

export async function POST() {
  await clearSession();
  return NextResponse.redirect(new URL("/", baseUrl()), 303);
}
