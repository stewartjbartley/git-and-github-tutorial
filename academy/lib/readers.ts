export type Candle = { o: number; h: number; l: number; c: number };
export const pipPx = (v: number) => (1.08 + v * 0.0001).toFixed(4);

export function classify(v: Candle): string {
  const r = Math.max(1, v.h - v.l);
  const b = Math.abs(v.c - v.o);
  const u = v.h - Math.max(v.o, v.c);
  const w = Math.min(v.o, v.c) - v.l;
  const up = v.c > v.o;
  if (b / r <= 0.1) {
    if (w / r >= 0.6 && u / r <= 0.15) return "Dragonfly doji";
    if (u / r >= 0.6 && w / r <= 0.15) return "Gravestone doji";
    if (u / r >= 0.3 && w / r >= 0.3) return "Long-legged doji";
    return "Doji";
  }
  if (b / r >= 0.9) return up ? "Bullish marubozu" : "Bearish marubozu";
  if (w / r >= 0.6 && u / r <= 0.15) return "Hammer-type pin bar";
  if (u / r >= 0.6 && w / r <= 0.15) return "Shooting-star-type pin bar";
  if (b / r <= 0.3 && u / r >= 0.25 && w / r >= 0.25) return "Spinning top";
  if (b / r >= 0.6) return up ? "Strong bullish candle" : "Strong bearish candle";
  return up ? "Ordinary bullish candle" : "Ordinary bearish candle";
}

export function pairName(a: Candle, b: Candle): string {
  const aU = a.c >= a.o;
  const bU = b.c >= b.o;
  const aT = Math.max(a.o, a.c);
  const aB = Math.min(a.o, a.c);
  const bT = Math.max(b.o, b.c);
  const bB = Math.min(b.o, b.c);
  const ar = Math.max(1, a.h - a.l);
  const br = Math.max(1, b.h - b.l);
  const tol = Math.max(2, (0.05 * (ar + br)) / 2);
  const mid = (aT + aB) / 2;
  if (b.h <= a.h && b.l >= a.l)
    return bT <= aT && bB >= aB && aT - aB >= 0.5 * ar ? "Harami (a small candle inside a large body)" : "Inside bar";
  if (b.h > a.h && b.l < a.l)
    return bT >= aT && bB <= aB && aU !== bU ? `${bU ? "Bullish" : "Bearish"} engulfing (also an outside bar)` : "Outside bar";
  if (aU !== bU && bT >= aT && bB <= aB && bT - bB > aT - aB) return `${bU ? "Bullish" : "Bearish"} engulfing`;
  if (aU && !bU && Math.abs(a.h - b.h) <= tol) return "Tweezer top";
  if (!aU && bU && Math.abs(a.l - b.l) <= tol) return "Tweezer bottom";
  if (!aU && bU && aT - aB >= 0.5 * ar && b.c > mid && b.c < aT && b.o <= a.c + tol) return "Piercing line";
  if (aU && !bU && aT - aB >= 0.5 * ar && b.c < mid && b.c > aB && b.o >= a.c - tol) return "Dark cloud cover";
  return "No classic pattern. Read the closes instead";
}

export function readOne(v: Candle): string[] {
  const r = Math.max(1, v.h - v.l);
  const body = Math.abs(v.c - v.o);
  const upw = v.h - Math.max(v.o, v.c);
  const low = Math.min(v.o, v.c) - v.l;
  const cl = (v.c - v.l) / r;
  const br = body / r;
  const t = [classify(v)];
  t.push(`Body is ${Math.round(br * 100)}% of the range. Upper wick ${Math.round((upw / r) * 100)}%, lower wick ${Math.round((low / r) * 100)}%. It closed ${Math.round(cl * 100)}% of the way up its range.`);
  t.push(v.c > v.o ? "Bullish: it closed above the open, so buyers ended the period ahead." : v.c < v.o ? "Bearish: it closed below the open, so sellers ended the period ahead." : "Open and close are equal: nobody ended ahead.");
  t.push(cl >= 0.8 ? "It closed in the top fifth. Buyers finished in control." : cl <= 0.2 ? "It closed in the bottom fifth. Sellers finished in control." : "It closed mid-range. Neither side finished clearly in control.");
  t.push(br >= 0.7 ? "Big body: one side led throughout. That is conviction." : br <= 0.1 ? "Tiny body: a lot of pushing and no winner. That is indecision." : "Medium body: one side led, but not by a landslide.");
  if (low / r >= 0.6 && low >= 2 * body) t.push("Long lower wick: sellers pushed price down and were rejected. If it sits at support, this is a buy-side signal.");
  else if (upw / r >= 0.6 && upw >= 2 * body) t.push("Long upper wick: buyers pushed price up and were rejected. If it sits at resistance, this is a sell-side signal.");
  else if (low / r >= 0.25 && upw / r >= 0.25) t.push("Wicks on both sides: price was pushed both ways and refused both times.");
  return t;
}

export function readTwo(a: Candle, b: Candle): string[] {
  const ar = Math.max(1, a.h - a.l);
  const br = Math.max(1, b.h - b.l);
  const aT = Math.max(a.o, a.c);
  const aB = Math.min(a.o, a.c);
  const mid = (aT + aB) / 2;
  const t = [pairName(a, b)];
  if (b.c > a.h) t.push("B closed above A's high: buyers took out the whole of A. That is a decisive move up.");
  else if (b.c < a.l) t.push("B closed below A's low: sellers took out the whole of A. That is a decisive move down.");
  else t.push(`B closed inside A's range, ${b.c > mid ? "above" : "below"} the midpoint of A's body. That is hesitation, not a decision.`);
  const ov = Math.max(0, Math.min(a.h, b.h) - Math.max(a.l, b.l)) / br;
  t.push(`B overlaps A by about ${Math.round(ov * 100)}% of its own range. ${ov > 0.7 ? "Heavy overlap means balance." : ov < 0.3 ? "Little overlap means one side is dominant." : "Moderate overlap."}`);
  const sz = br / ar;
  t.push(sz > 1.5 ? "B is much bigger than A: expansion." : sz < 0.5 ? "B is much smaller than A: contraction and indecision." : "B and A are similar in size.");
  if (b.h > a.h && b.c <= a.h) t.push("B pushed above A's high and closed back at or below it: a mini sweep of the highs.");
  if (b.l < a.l && b.c >= a.l) t.push("B pushed below A's low and closed back at or above it: a mini sweep of the lows.");
  return t;
}
