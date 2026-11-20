"use client";
import { useEffect, useRef, useState } from "react";
import { chart } from "@/lib/chart";
import { CH, MINI } from "@/content/charts";
import type { Question } from "@/content/types";

type S = { tries: number; done: boolean; first: boolean; marks: Record<string, "ok" | "bad">; picked: number[]; fb: string; fbOk: boolean | null };
const fresh = (): S => ({ tries: 0, done: false, first: false, marks: {}, picked: [], fb: "", fbOk: null });

export function Quiz({ slug, qs, exam }: { slug: string; qs: Question[]; exam?: boolean }) {
  const [st, setSt] = useState<S[]>(() => qs.map(fresh));
  const posted = useRef(false);
  const doneN = st.filter((s) => s.done).length;
  const first = st.filter((s) => s.first).length;
  const all = doneN === qs.length;

  useEffect(() => {
    if (!all || posted.current) return;
    posted.current = true;
    fetch("/api/quiz", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, score: first, total: qs.length }) }).catch(() => {});
  }, [all, first, qs.length, slug]);

  function answer(i: number, right: boolean, pick: number | string) {
    setSt((prev) =>
      prev.map((s, j) => {
        if (j !== i || s.done) return s;
        const q = qs[i];
        const n = { ...s, marks: { ...s.marks }, picked: [...s.picked] };
        const reveal = right || s.tries >= 1;
        if (q.k === "click") {
          n.marks[String(pick)] = right ? "ok" : "bad";
          if (!right && reveal) n.marks[String(q.ans)] = "ok";
        } else {
          n.picked.push(pick as number);
        }
        if (right) {
          n.done = true;
          n.first = s.tries === 0;
          n.fb = `Correct. ${q.ok}`;
          n.fbOk = true;
        } else if (reveal) {
          n.done = true;
          n.fb = `The answer is shown. ${q.ok}${q.ref ? ` Review lesson ${q.ref}.` : ""}`;
          n.fbOk = false;
        } else {
          n.tries = s.tries + 1;
          n.fb = `Not quite. ${q.bad}${q.ref ? ` (Lesson ${q.ref})` : ""}`;
          n.fbOk = false;
        }
        return n;
      }),
    );
  }

  const hi = Math.ceil(qs.length * 0.8);
  const mid = Math.ceil(qs.length * 0.6);

  return (
    <section className="quiz">
      <h3>Check yourself</h3>
      <div className="qs">
        {qs.map((q, i) => {
          const s = st[i];
          return (
            <div className="q" key={i}>
              <p className="qt"><span className="qn">{i + 1}</span>{q.q}</p>
              {q.k === "mc" && q.mini && <div className="miniq" dangerouslySetInnerHTML={{ __html: chart(MINI[q.mini], { mini: true }) }} />}
              {q.k === "click" ? (
                <>
                  <div
                    className="scroll"
                    onClick={(e) => {
                      const hit = (e.target as Element).closest(".hit");
                      if (!hit || s.done) return;
                      const c = +(hit.getAttribute("data-i") ?? -1);
                      answer(i, c === q.ans, c);
                    }}
                    dangerouslySetInnerHTML={{ __html: chart(CH[q.chart], { clickable: !s.done, marks: s.marks }) }}
                  />
                  <div className="swipe">Swipe sideways, then tap a candle</div>
                </>
              ) : (
                <div className="opts">
                  {q.o.map((o, j) => {
                    const picked = s.picked.includes(j);
                    const cls = s.done && j === q.ans ? "ok" : picked && j !== q.ans ? "bad" : "";
                    return (
                      <button key={j} className={`opt ${cls}`} disabled={s.done || picked} onClick={() => answer(i, j === q.ans, j)}>{o}</button>
                    );
                  })}
                </div>
              )}
              <p className={`fb ${s.fbOk === null ? "" : s.fbOk ? "ok" : "bad"}`} role="status">{s.fb}</p>
            </div>
          );
        })}
      </div>
      <div className="score" role="status">
        {all ? (<>Right first time: <b>{first} of {qs.length}</b></>) : `${doneN} of ${qs.length} answered`}
        {all && exam && (
          <div className="verdict">
            {first >= hi ? "Ready. Move to the next module." : first >= mid ? "Close. Re-read the lessons named in your wrong answers, then retake this test." : "Not yet. Go back through the lessons named in your wrong answers, do the homework, then retake."}
          </div>
        )}
      </div>
    </section>
  );
}
