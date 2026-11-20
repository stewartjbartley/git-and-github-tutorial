import Link from "next/link";
import { chart } from "@/lib/chart";
import { MINI } from "@/content/charts";
import { CANDLES, BIAS_LABEL } from "@/content/candles";
import { LESSONS } from "@/content/lessons";
import { CandleExplorer, type ExplorerItem } from "@/components/CandleExplorer";

export const metadata = {
  title: "Candlestick reference chart",
  description: "Every candlestick pattern in the course: its name, the story it tells, where it matters, what to expect and what confirms it.",
};

export default function CandlesPage() {
  const items: ExplorerItem[] = CANDLES.map((c) => ({
    id: c.id, group: c.group, name: c.name, aka: c.aka, bias: c.bias,
    story: c.story, shows: c.shows, where: c.where, expect: c.expect, confirm: c.confirm, lesson: c.lesson,
    lessonReady: !!LESSONS[c.lesson],
    svg: chart(MINI[c.mini], { mini: true, w: 110, h: 130 }),
  }));
  return (
    <main className="wide">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <h1>Every candle, what it is called and what to expect</h1>
        <p>{CANDLES.length} candles and candle patterns from the Naked Chart School course. Filter by type or bias, or search by name.</p>
        <div className="rule" style={{ maxWidth: 760 }}>
          <b>Read this first</b> The expectations are tendencies, not forecasts. A candle means something only at a place, in the right trend and at a live hour, and it needs its confirmation before it is a signal. Test every pattern on your own market.
        </div>
      </section>
      <CandleExplorer items={items} labels={BIAS_LABEL} />
      <p className="legal" style={{ margin: "32px 0" }}>This reference is free to use. The full course teaches how to measure, grade and trade each of these. <Link href="/#curriculum">See the curriculum</Link>. Education only, not financial advice.</p>
    </main>
  );
}
