import Stripe from "stripe";

let client: Stripe | null = null;
export function stripe() {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}

export const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

/** Reads the live price from Stripe so the sales page can never disagree with checkout. Falls back to an env label. */
export async function getPriceLabel(): Promise<string | null> {
  try {
    const id = process.env.STRIPE_PRICE_ID;
    if (id && process.env.STRIPE_SECRET_KEY) {
      const pr = await stripe().prices.retrieve(id);
      if (pr.unit_amount != null) {
        return new Intl.NumberFormat("en-IE", { style: "currency", currency: pr.currency.toUpperCase(), maximumFractionDigits: pr.unit_amount % 100 === 0 ? 0 : 2 }).format(pr.unit_amount / 100);
      }
    }
  } catch {}
  return process.env.NEXT_PUBLIC_PRICE_LABEL ?? null;
}
