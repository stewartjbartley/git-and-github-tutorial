"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Bias, Group } from "@/content/candles";

export type ExplorerItem = {
  id: string; group: Group; name: string; aka?: string; svg: string; bias: Bias;
  story: string; shows: string; where: string; expect: string; confirm: string; lesson: string; lessonReady: boolean;
};

const GROUPS: [Group | "all", string][] = [["all", "All"], ["single", "Single"], ["pair", "Two candles"], ["triple", "Three or more"], ["context", "In context"]];
const BIASES: [Bias | "all", string][] = [["all", "Any bias"], ["bullish", "Bullish"], ["bearish", "Bearish"], ["neutral", "Neutral"], ["continuation", "Continuation"]];

export function CandleExplorer({ items, labels }: { items: ExplorerItem[]; labels: Record<Bias, string> }) {
  const [group, setGroup] = useState<Group | "all">("all");
  const [bias, setBias] = useState<Bias | "all">("all");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => items.filter((c) => (group === "all" || c.group === group) && (bias === "all" || c.bias === bias) && (!q || (c.name + " " + (c.aka ?? "") + " " + c.story).toLowerCase().includes(q.toLowerCase()))),
    [items, group, bias, q],
  );
  return (
    <div>
      <div className="filters" role="group" aria-label="Filters">
        <input type="search" placeholder="Search candles" aria-label="Search candles" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="chipset">{GROUPS.map(([k, l]) => <button key={k} className="btn" aria-pressed={group === k} onClick={() => setGroup(k)}>{l}</button>)}</div>
        <div className="chipset">{BIASES.map(([k, l]) => <button key={k} className="btn" aria-pressed={bias === k} onClick={() => setBias(k)}>{l}</button>)}</div>
      </div>
      <p className="legal">{list.length} of {items.length} candles</p>
      {list.length === 0 && <p className="msg">No candles match. Clear a filter or the search box.</p>}
      <div className="candle-grid">
        {list.map((c) => (
          <article className="candle" key={c.id}>
            <div className="cmini" dangerouslySetInnerHTML={{ __html: c.svg }} />
            <div className="cbody">
              <h3>{c.name} <span className={`bias bias-${c.bias}`}>{labels[c.bias]}</span></h3>
              {c.aka && <p className="aka">{c.aka}</p>}
              <p><b>Story.</b> {c.story}</p>
              <p><b>Looks like.</b> {c.shows}</p>
              <p><b>Where it matters.</b> {c.where}</p>
              <p><b>What to expect.</b> {c.expect}</p>
              <p><b>Confirmation.</b> {c.confirm}</p>
              <p className="legal">{c.lessonReady ? <Link href={`/course/${c.lesson}`}>Lesson {c.lesson.replace("-", ".")}</Link> : <>Lesson {c.lesson.replace("-", ".")}</>}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
