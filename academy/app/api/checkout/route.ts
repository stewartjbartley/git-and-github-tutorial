import { NextResponse } from "next/server";
import { stripe, baseUrl } from "@/lib/stripe";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  // EU consumers keep a 14-day right to cancel digital content unless they agree to immediate access
  // and acknowledge losing that right. Both boxes must be ticked before we create the session.
  if (body.acceptTerms !== true || body.waiveWithdrawal !== true) {
    return NextResponse.json({ error: "Tick both boxes to continue." }, { status: 400 });
  }
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) return NextResponse.json({ error: "Checkout is not configured yet." }, { status: 500 });

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    customer_email: email,
    allow_promotion_codes: true,
    billing_address_collection: process.env.STRIPE_TAX === "1" ? "required" : "auto",
    ...(process.env.STRIPE_TAX === "1" ? { automatic_tax: { enabled: true } } : {}),
    success_url: `${baseUrl()}/welcome`,
    cancel_url: `${baseUrl()}/#pricing`,
    metadata: {
      terms_accepted_at: new Date().toISOString(),
      withdrawal_waived: "yes",
    },
  });
  return NextResponse.json({ url: session.url });
}
