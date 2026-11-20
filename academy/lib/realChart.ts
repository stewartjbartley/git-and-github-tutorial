import { readFileSync } from "fs";
import path from "path";
import { parseOhlcCsv } from "./csv";
import type { ChartSpec, Ann } from "./chart";

/**
 * Builds a chart spec from a CSV in content/real/.
 * Export from TradingView (Export chart data) or MT5 (Charts > Save as), then reference it from a lesson block:
 * { t: "real", file: "eurusd-h1-2025-03.csv", from: 120, count: 40, dec: 5, cap: "...", ann: [...] }
 */
export function realSpec(file: string, from: number, count: number, dec: number, ann: Ann[] = [], alt = ""): ChartSpec {
  const safe = path.basename(file);
  const text = readFileSync(path.join(process.cwd(), "content", "real", safe), "utf8");
  const bars = parseOhlcCsv(text).slice(from, from + count);
  return { bars, real: { dec }, ann, alt: alt || `Real price chart from ${safe}` };
}
