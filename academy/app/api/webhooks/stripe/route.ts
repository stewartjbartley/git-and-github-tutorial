import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, baseUrl } from "@/lib/stripe";
import { db } from "@/lib/db";
import { issueLoginLink, normaliseEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return NextResponse.json({ error: "Not configured" }, { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, sig, secret);
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = normaliseEmail(s.customer_details?.email ?? s.customer_email ?? "");
    if (s.payment_status === "paid" && email) {
      const accepted = s.metadata?.terms_accepted_at ? new Date(s.metadata.terms_accepted_at) : null;
      await db.purchase.upsert({
        where: { stripeSessionId: s.id },
        update: {},
        create: {
          email,
          stripeSessionId: s.id,
          stripePaymentIntent: typeof s.payment_intent === "string" ? s.payment_intent : null,
          amountTotal: s.amount_total ?? 0,
          currency: s.currency ?? "eur",
          termsAcceptedAt: accepted,
        },
      });
      await issueLoginLink(email, baseUrl());
    }
  }

  if (event.type === "charge.refunded") {
    const c = event.data.object as Stripe.Charge;
    if (typeof c.payment_intent === "string") {
      await db.purchase.updateMany({
        where: { stripePaymentIntent: c.payment_intent },
        data: { status: "refunded" },
      });
    }
  }
  return NextResponse.json({ received: true });
}
