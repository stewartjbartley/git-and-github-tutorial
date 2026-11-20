import type { ChartSpec } from "@/lib/chart";

/** Minutes to a HH:MM label, one label every `every` fifteen-minute candles. */
const clk = (startMin: number, every: number) => (i: number) => {
  const m = startMin + i * 15;
  if (i % every) return null;
  const h = Math.floor(m / 60);
  return `${h < 10 ? "0" : ""}${h}:${m % 60 < 10 ? "0" : ""}${m % 60}`;
};

// Teaching charts. Prices are pips above 1.0800. They are drawn to show each idea cleanly, not recorded from a market.
export const CH: Record<string, ChartSpec> = {
  anatomy: { alt: "Fifteen candles: a rally, then a sharp sell-off", start: 0, c: [[6,2,2],[3,3,2],[8,2,1],[5,2,3],[4,4,2],[14,1,1],[12,3,1],[16,2,2],[13,3,2],[10,2,3],[-2,1,2],[-1,3,2],[-4,2,2],[-3,3,3],[1,2,2]] },
  dojiCont: { alt: "Strong rally, a small doji pause, then the rally continues", start: 0, c: [[5,1,1],[11,1,1],[17,1,1],[23,1,1],[23.5,3,3],[30,1,1],[35,2,1],[41,1,1]],
    ann: [{ t: "tag", i: 4, side: "top", text: "Doji: pause", kind: "info" }, { t: "tag", i: 5, side: "top", text: "Answer: up", kind: "up" }] },
  dojiRev: { alt: "Rally into resistance, a gravestone doji, then a drop", start: 0,
    c: [[6,1,1],[12,1,1],[18,1,1],[24,2,1],[29,2,1],[29.3,6,0.5],[22,1,1],[18,2,1],[20,2,1],[14,1,2],[10,1,1]],
    ann: [{ t: "zone", kind: "res", i1: 3, i2: 10, p1: 31, p2: 35, label: "Resistance" }, { t: "tag", i: 5, side: "top", text: "Gravestone doji", kind: "down" }, { t: "trade", i: 6, n: 5, entry: 28, stop: 36, target: 12 }] },
  dojiCluster: { alt: "Four small candles compress under a high, then a breakout", start: 40,
    c: [[46,2,1],[52,2,1],[51,3,3],[51.5,3,3],[50.8,3,3],[51.2,2,3],[58,2,1],[63,2,1],[66,2,1]],
    ann: [{ t: "hline", p: 55, i1: 2, i2: 6 }, { t: "hline", p: 47.8, i1: 2, i2: 6 }, { t: "box", i1: 2, i2: 5, label: "Compression" }, { t: "tag", i: 6, side: "bottom", text: "Break", kind: "up" }] },
  hammer: { alt: "Rally, fall back to an old low, hammer, then recovery with a trade plan", start: 30,
    c: [[27,2,3],[33,2,1],[39,2,2],[46,2,1],[52,3,2],[58,2,1],[56,3,2],[60,3,1],[55,3,2],[50,2,2],[51,3,2],[45,1,3],[41,2,2],[43,3,2],[36,1,3],[32,2,2],[30,2,2],[31,1,7],[38,2,1],[42,2,2],[40,3,2],[46,2,1],[49,3,2],[47,2,3],[54,2,1]],
    ann: [{ t: "zone", kind: "sup", i1: 0, i2: 24, p1: 23, p2: 30, label: "Support: the old low" }, { t: "tag", i: 17, side: "bottom", text: "Hammer", kind: "up" }, { t: "trade", i: 18, n: 7, entry: 33, stop: 22, target: 55 }] },
  reject: { alt: "Shooting star at resistance with a short trade plan", start: 0,
    c: [[8,2,1],[15,2,1],[20,2,2],[14,2,2],[9,1,2],[13,2,1],[18,2,2],[17,5,1],[11,1,2],[7,2,2],[10,2,1],[5,1,2],[1,1,2],[3,2,1]],
    ann: [{ t: "zone", kind: "res", i1: 2, i2: 9, p1: 20, p2: 23, label: "Resistance 20 to 23" }, { t: "tag", i: 7, side: "top", text: "Shooting star", kind: "down" }, { t: "trade", i: 8, n: 5, entry: 16, stop: 24, target: 0 }] },
  absorb: { alt: "Three long lower wicks into the same zone, then a breakout", start: 60,
    c: [[54,2,2],[48,2,2],[42,2,2],[36,1,2],[39,2,9],[36,3,2],[38,2,10],[35,3,2],[38,2,9],[46,2,2],[53,2,1],[58,2,1]],
    ann: [{ t: "zone", kind: "sup", i1: 3, i2: 9, p1: 25, p2: 28, label: "Demand zone" }, { t: "tag", i: 4, side: "bottom", text: "wick 1", kind: "up" }, { t: "tag", i: 6, side: "bottom", text: "wick 2", kind: "up" }, { t: "tag", i: 8, side: "bottom", text: "wick 3", kind: "up" }, { t: "tag", i: 9, side: "top", text: "Breakout", kind: "up" }] },
  sweepLow: { alt: "Equal lows, a sweep candle that closes back inside, then a rally", start: 60,
    c: [[52,2,2],[46,2,2],[41,1,3],[47,2,1],[52,2,1],[48,2,2],[42,1,3],[44,2,2],[49,2,1],[46,2,2],[42,1,2],[43,2,8],[50,2,1],[55,2,1],[52,3,2],[58,2,1],[63,2,1],[61,2,2]],
    ann: [{ t: "hline", p: 38.5, i1: 2, i2: 11, label: "Equal lows: stops sit below" }, { t: "tag", i: 2, side: "bottom", text: "Low 1", kind: "info" }, { t: "tag", i: 6, side: "bottom", text: "Low 2", kind: "info" }, { t: "tag", i: 11, side: "bottom", text: "Sweep", kind: "up" }, { t: "trade", i: 12, n: 6, entry: 43, stop: 33, target: 63 }] },
  fakeout: { alt: "Resistance tested four times, a sweep above it, then a drop", start: 20,
    c: [[26,2,1],[32,2,1],[38,2,1],[34,2,2],[29,1,2],[33,2,1],[38,2,2],[35,2,2],[31,1,2],[36,2,1],[39,1,1],[38,5,1],[33,1,2],[28,1,2],[25,2,2],[29,2,1],[24,1,2],[20,1,1]],
    ann: [{ t: "hline", p: 40, i1: 2, i2: 11, label: "Equal highs 40" }, { t: "tag", i: 11, side: "top", text: "Sweep of highs", kind: "down" }, { t: "trade", i: 12, n: 6, entry: 37, stop: 45, target: 21 }] },
  trueBreak: { alt: "A genuine breakout: wide candle closes beyond resistance and the next candles hold", start: 20,
    c: [[26,2,1],[32,2,1],[38,2,1],[34,2,2],[29,1,2],[33,2,1],[38,2,2],[35,2,2],[31,1,2],[36,2,1],[39,1,1],[47,2,1],[50,2,2],[48,2,3],[55,2,1],[60,2,1]],
    ann: [{ t: "hline", p: 40, i1: 2, i2: 11, label: "Resistance 40" }, { t: "hline", p: 43, i1: 11, i2: 14, label: "Half of the body" }, { t: "tag", i: 11, side: "top", text: "Closes beyond", kind: "up" }, { t: "tag", i: 13, side: "bottom", text: "Holds", kind: "up" }] },
  climax: { alt: "Candles grow larger, then a huge wick appears and sellers answer", start: 0,
    c: [[4,1,1],[9,1,1],[15,1,1],[22,1,1],[30,1,1],[40,1,1],[54,1,0.5],[53,9,2],[45,1,2],[42,2,2],[46,3,2],[38,1,2]],
    ann: [{ t: "box", i1: 4, i2: 6, label: "Bodies keep growing" }, { t: "tag", i: 7, side: "top", text: "Long wick", kind: "down" }, { t: "tag", i: 8, side: "bottom", text: "Sellers answer", kind: "down" }] },
  engulf: { alt: "Uptrend, pullback, then a bullish engulfing candle", start: 40,
    c: [[46,2,2],[52,2,1],[57,3,2],[62,2,1],[60,3,2],[64,2,2],[60,2,2],[56,2,3],[51,1,2],[49,2,3],[57,1,4],[61,2,1],[59,3,2],[65,2,1],[69,3,2],[66,2,2],[72,2,1]],
    ann: [{ t: "zone", kind: "sup", i1: 0, i2: 16, p1: 38, p2: 46, label: "Old launch area" }, { t: "box", i1: 9, i2: 10, label: "Bullish engulfing" }] },
  inside: { alt: "Uptrend, a large mother bar, an inside bar, then a breakout", start: 100,
    c: [[106,2,2],[112,2,1],[118,3,1],[124,2,2],[121,3,2],[127,4,2],[125,2,2],[134,2,1],[138,2,2],[135,3,2],[141,2,2],[146,3,1],[143,2,2]],
    ann: [{ t: "hline", p: 131, i1: 5, i2: 8, label: "Mother high" }, { t: "hline", p: 119, i1: 5, i2: 8 }, { t: "tag", i: 5, side: "bottom", text: "Mother bar", kind: "info" }, { t: "tag", i: 6, side: "top", text: "Inside", kind: "info" }, { t: "tag", i: 7, side: "bottom", text: "Breakout", kind: "up" }] },
  evening: { alt: "Rally then an evening star reversal", start: 60,
    c: [[66,2,2],[72,2,1],[77,2,2],[74,3,2],[80,2,2],[86,2,1],[87,4,3],[79,2,2],[74,2,2],[76,3,2],[70,2,3],[66,1,2]],
    ann: [{ t: "box", i1: 5, i2: 7, label: "Evening star" }] },
  retest: { alt: "Resistance zone, a wide breakout candle, a retest that holds, with a long trade plan", start: 20,
    c: [[26,2,1],[32,2,1],[38,2,1],[44,2,1],[50,3,1],[46,2,2],[41,1,2],[38,2,2],[43,2,1],[48,2,1],[51,2,2],[47,1,2],[43,1,2],[40,1,1],[44,2,1],[49,3,1],[52,1,2],[50,2,1],[48,1,2],[59,2,1],[62,3,1],[58,2,2],[54,1,2],[56,2,4],[61,2,1],[66,2,1],[64,3,2],[70,2,1],[74,2,1]],
    ann: [{ t: "zone", kind: "res", i1: 4, i2: 28, p1: 49, p2: 54, label: "Old resistance, now support" }, { t: "tag", i: 19, side: "top", text: "Wide breakout candle", kind: "up" }, { t: "tag", i: 23, side: "bottom", text: "Retest holds", kind: "up" }, { t: "trade", i: 24, n: 5, entry: 56, stop: 49, target: 70 }] },
  londonSweep: { alt: "Fifteen-minute chart: Asian range, London open sweeps the low, reclaims and rallies", start: 50, h: 380, strips: [1, 2],
    c: [[51,1,1],[49,1,1],[51,1,1],[50,1,1],[52,1,1],[51,1,1],[53,1,1],[52,1,1],[50,1,1],[49,1,1],[50,1,1],[49.5,1,1],[48,1,2],[48.5,1,7],[55,1,1],[59,2,1],[57,2,2],[62,2,1],[65,2,1],[63,2,2],[67,2,1],[70,2,1],[68,2,2],[72,2,1]],
    ann: [{ t: "strip", row: 0, i1: 0, i2: 11, label: "Asia range builds" }, { t: "strip", row: 1, i1: 12, i2: 23, label: "London open 09:00 CET" }, { t: "zone", kind: "neu", i1: 0, i2: 11, p1: 48, p2: 54, label: "Asian range 48 to 54" }, { t: "tag", i: 13, side: "bottom", text: "Sweep 09:15", kind: "up" }, { t: "trade", i: 14, n: 8, entry: 48.5, stop: 40, target: 65.5 }],
    xl: clk(360, 4) },
  ny: { alt: "Fifteen-minute chart around the 14:30 data release and the 15:30 US cash open", start: 50,
    c: [[51,1,1],[50,1,1],[58,10,2],[47,3,3],[49,2,2],[48,2,2],[55,3,2],[60,2,1],[58,2,2],[63,2,1],[61,2,2],[66,2,1],[64,2,2],[65,1,1],[63,1,1],[64,1,1]],
    ann: [{ t: "box", i1: 2, i2: 3, label: "14:30 data: noise" }, { t: "tag", i: 6, side: "bottom", text: "US open 15:30", kind: "up" }],
    xl: clk(840, 4) },
  day: { alt: "A typical hourly day with an Asian range, a London sweep and rally, and a news spike", start: 50, h: 400, strips: [1, 2, 3],
    c: [[52,2,2],[49,2,2],[52,2,1],[50,2,2],[53,2,2],[51,2,2],[52,2,2],[50,2,2],[51,2,2],[49,1,6],[58,2,1],[63,2,1],[61,3,2],[64,2,2],[56,10,3],[59,3,3],[62,2,2],[60,2,2],[61,2,2],[59,2,2],[60,1,1],[58,1,1],[59,1,1],[58,1,1]],
    ann: [{ t: "strip", row: 0, i1: 0, i2: 8, label: "Asia" }, { t: "strip", row: 1, i1: 9, i2: 17, label: "London" }, { t: "strip", row: 2, i1: 14, i2: 22, label: "New York" },
      { t: "zone", kind: "neu", i1: 0, i2: 8, p1: 47, p2: 55, label: "Asian range" }, { t: "tag", i: 9, side: "bottom", text: "London sweeps low", kind: "down" }, { t: "tag", i: 14, side: "top", text: "14:30 data", kind: "info" }],
    xl: (i: number) => (i % 3 === 0 ? `${i < 10 ? "0" : ""}${i}:00` : null) },
  exam1: { alt: "Downtrend, a bounce, then a shooting star and further decline", start: 80,
    c: [[74,2,2],[68,2,2],[62,2,1],[66,2,2],[70,3,2],[68,2,2],[67,8,1],[60,1,2],[55,2,2],[57,2,1],[50,1,2],[46,2,2]] },
};

export const MINI: Record<string, ChartSpec> = {
  bullMaru: { start: 0, c: [[14,0.5,0.5]] }, bearMaru: { start: 0, c: [[-14,0.5,0.5]] }, spin: { start: 0, c: [[3,6,6]] }, doji: { start: 0, c: [[0.3,9,9]] },
  dragon: { start: 0, c: [[0.3,0.5,11]] }, grave: { start: 0, c: [[-0.3,11,0.5]] }, hammer: { start: 0, c: [[3,0.5,9]] }, star: { start: 0, c: [[-3,9,0.5]] },
  bullEng: { start: 10, c: [[6,1,1],[3,1,1],[11,1,2]] }, bearEng: { start: 0, c: [[6,1,1],[9,1,1],[1,1,2]] },
  insideB: { start: 0, c: [[4,1,1],[10,2,1],[8,1,1]] }, outside: { start: 0, c: [[4,1,1],[8,1,1],[2,6,4]] }, harami: { start: 12, c: [[4,1,1],[7,1,1]] },
  pierce: { start: 12, c: [[4,1,1],[9,1,2]] }, dark: { start: 0, c: [[8,1,1],[3,2,1]] },
  tweezTop: { start: 0, c: [[4,1,1],[8,2,1],[3,2,1]] }, tweezBot: { start: 10, c: [[6,1,1],[2,1,2],[6,2,2]] },
  soldiers: { start: 0, c: [[5,1,1],[10,1,1],[15,1,1]] }, crows: { start: 15, c: [[10,1,1],[5,1,1],[0,1,1]] },
  morning: { start: 20, c: [[14,1,1],[8,1,1],[7,2,3],[14,1,1]] },
};
