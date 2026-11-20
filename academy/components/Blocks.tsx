import { chart, aggregate, genSeries } from "@/lib/chart";
import { realSpec } from "@/lib/realChart";
import { CH, MINI } from "@/content/charts";
import type { Block } from "@/content/types";
import { Builder } from "./Builder";
import { Calc, ChallengeSim, Clock, ScoreCard } from "./Widgets";

const Fig = ({ html, cap }: { html: string; cap: string }) => (
  <figure className="fig">
    <div className="scroll" dangerouslySetInnerHTML={{ __html: html }} />
    <div className="swipe">Swipe the chart sideways</div>
    <figcaption>{cap}</figcaption>
  </figure>
);

function Timeframes({ cap }: { cap: string }) {
  const h1 = genSeries(7, 120, 40, 2.2, 0.05);
  const h4 = aggregate(h1, 4);
  const d1 = aggregate(h1, 24);
  const spec = (bars: typeof h1, alt: string) => ({ bars, alt, base: 1.08 });
  return (
    <figure className="fig">
      {[
        ["1-hour candles: 120 of them, five days", spec(h1, "Hourly candles")],
        ["4-hour candles: the same five days as 30 candles", spec(h4, "Four-hour candles")],
        ["Daily candles: the same five days as 5 candles", spec(d1, "Daily candles")],
      ].map(([label, s]) => (
        <div key={label as string} style={{ marginBottom: 10 }}>
          <div className="swipe" style={{ display: "block", marginBottom: 4 }}>{label as string}</div>
          <div className="scroll" dangerouslySetInnerHTML={{ __html: chart(s as Parameters<typeof chart>[0], { h: 230 }) }} />
        </div>
      ))}
      <figcaption>{cap}</figcaption>
    </figure>
  );
}

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p": return <p dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "h": return <h3>{b.text}</h3>;
    case "rule": return <aside className="rule"><b>Pro rule</b> <span dangerouslySetInnerHTML={{ __html: b.html }} /></aside>;
    case "warn": return <aside className="rule warn"><b>Risk</b> <span dangerouslySetInnerHTML={{ __html: b.html }} /></aside>;
    case "ol": return <ol>{b.items.map((x, i) => <li key={i} dangerouslySetInnerHTML={{ __html: x }} />)}</ol>;
    case "hw": return (
      <section className="hw"><h3>Homework on a real chart <span className="mins">{b.minutes} min</span></h3><p dangerouslySetInnerHTML={{ __html: b.html }} /></section>
    );
    case "fig": return <Fig html={chart(CH[b.id], { bare: b.bare })} cap={b.cap} />;
    case "tf": return <Timeframes cap={b.cap} />;
    case "real": return <Fig html={chart(realSpec(b.file, b.from, b.count, b.dec, b.ann))} cap={b.cap} />;
    case "gallery": return (
      <div className="gal">{b.items.map(([id, t, d]) => (
        <figure key={id}><div dangerouslySetInnerHTML={{ __html: chart(MINI[id], { mini: true }) }} /><h4>{t}</h4><p>{d}</p></figure>
      ))}</div>
    );
    case "table": return (
      <div className="tw"><table>
        <thead><tr>{b.head.map((x) => <th key={x}>{x}</th>)}</tr></thead>
        <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>)}</tbody>
      </table></div>
    );
    case "builder": return <Builder n={b.n} />;
    case "calc": return <Calc />;
    case "clock": return <Clock />;
    case "score": return <ScoreCard />;
    case "sim": return <ChallengeSim />;
  }
}
