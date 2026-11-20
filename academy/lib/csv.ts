import type { Bar } from "./chart";

/**
 * Parses OHLC CSV exported from TradingView, MetaTrader or most other platforms.
 * Accepts a header row with open/high/low/close columns in any order, comma or semicolon separated.
 * Rows without four numeric prices are skipped.
 */
export function parseOhlcCsv(text: string): Bar[] {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const sep = lines[0].includes(";") ? ";" : lines[0].includes("\t") ? "\t" : ",";
  const head = lines[0].split(sep).map((h) => h.trim().toLowerCase().replace(/["<>]/g, ""));
  const idx = (names: string[]) => head.findIndex((h) => names.includes(h));
  const io = idx(["open", "o"]);
  const ih = idx(["high", "h"]);
  const il = idx(["low", "l"]);
  const ic = idx(["close", "c"]);
  if ([io, ih, il, ic].some((i) => i < 0)) throw new Error("CSV needs open, high, low and close columns");
  const out: Bar[] = [];
  for (const line of lines.slice(1)) {
    const f = line.split(sep);
    const o = parseFloat(f[io]);
    const h = parseFloat(f[ih]);
    const l = parseFloat(f[il]);
    const c = parseFloat(f[ic]);
    if ([o, h, l, c].every((v) => Number.isFinite(v))) out.push({ o, h, l, c });
  }
  return out;
}
