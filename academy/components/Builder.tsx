"use client";
import { useState } from "react";
import { type Candle, pipPx, readOne, readTwo } from "@/lib/readers";

const PRE1: Record<string, Candle[]> = {
  bull: [{ o: 20, h: 82, l: 18, c: 80 }],
  bear: [{ o: 80, h: 82, l: 18, c: 20 }],
  hammer: [{ o: 55, h: 66, l: 15, c: 62 }],
  star: [{ o: 50, h: 92, l: 40, c: 43 }],
  doji: [{ o: 50, h: 80, l: 20, c: 51 }],
  dragon: [{ o: 70, h: 72, l: 20, c: 71 }],
  grave: [{ o: 30, h: 80, l: 28, c: 29 }],
};
const PRE2: Record<string, Candle[]> = {
  bullEng: [{ o: 62, h: 64, l: 38, c: 40 }, { o: 40, h: 76, l: 36, c: 74 }],
  inside: [{ o: 30, h: 80, l: 28, c: 76 }, { o: 70, h: 74, l: 50, c: 56 }],
  pierce: [{ o: 80, h: 82, l: 40, c: 42 }, { o: 40, h: 70, l: 36, c: 68 }],
  tweez: [{ o: 40, h: 80, l: 38, c: 76 }, { o: 76, h: 80, l: 48, c: 50 }],
  outside: [{ o: 50, h: 64, l: 44, c: 60 }, { o: 62, h: 90, l: 20, c: 30 }],
};
const LABELS1: [string, string][] = [["bull", "Strong bull"], ["bear", "Strong bear"], ["hammer", "Hammer"], ["star", "Shooting star"], ["doji", "Long-legged doji"], ["dragon", "Dragonfly"], ["grave", "Gravestone"]];
const LABELS2: [string, string][] = [["bullEng", "Bullish engulfing"], ["inside", "Inside bar"], ["pierce", "Piercing line"], ["tweez", "Tweezer top"], ["outside", "Outside bar"]];
const KEYS: [keyof Candle, string][] = [["o", "Open"], ["h", "High"], ["l", "Low"], ["c", "Close"]];

export function Builder({ n }: { n: 1 | 2 }) {
  const pre = n === 1 ? PRE1 : PRE2;
  const [cs, setCs] = useState<Candle[]>(n === 1 ? PRE1.hammer : PRE2.bullEng);
  const Y = (p: number) => 34 + (100 - p) * 2.3;
  const cx = n === 1 ? [150] : [90, 210];
  const bw = n === 1 ? 60 : 50;

  function set(ci: number, k: keyof Candle, val: number) {
    setCs((prev) =>
      prev.map((c, i) => {
        if (i !== ci) return c;
        const v = { ...c, [k]: val };
        const top = Math.max(v.o, v.c);
        const bot = Math.min(v.o, v.c);
        if (k === "h" && v.h < top) v.h = top;
        else if (k === "l" && v.l > bot) v.l = bot;
        else if (k === "o" || k === "c") {
          if (v.h < top) v.h = top;
          if (v.l > bot) v.l = bot;
        }
        return v;
      }),
    );
  }
  const reading = n === 1 ? readOne(cs[0]) : readTwo(cs[0], cs[1]);

  return (
    <div className="builder">
      <svg viewBox="0 0 300 292" role="img" aria-label="Candle you can reshape">
        {cs.map((v, i) => {
          const up = v.c >= v.o;
          const col = up ? "var(--cup)" : "var(--cdown)";
          const top = Y(Math.max(v.o, v.c));
          const bot = Y(Math.min(v.o, v.c));
          return (
            <g key={i}>
              <line x1={cx[i]} x2={cx[i]} y1={Y(v.h)} y2={Y(v.l)} stroke={col} strokeWidth={2.4} />
              <rect x={cx[i] - bw / 2} y={top} width={bw} height={Math.max(2, bot - top)} rx={2} fill={col} />
              {n === 1 ? (
                <>
                  <text className="lb lb-info" x={cx[i]} y={Y(v.h) - 8} textAnchor="middle">High {pipPx(v.h)}</text>
                  <text className="lb lb-info" x={cx[i]} y={Y(v.l) + 17} textAnchor="middle">Low {pipPx(v.l)}</text>
                  <text className="lb lb-info" x={cx[i] - bw / 2 - 8} y={Y(v.o) + 4} textAnchor="end">Open {pipPx(v.o)}</text>
                  <text className="lb lb-info" x={cx[i] + bw / 2 + 8} y={Y(v.c) + 4}>Close {pipPx(v.c)}</text>
                </>
              ) : (
                <text className="lb lb-info" x={cx[i]} y={284} textAnchor="middle">{i ? "B" : "A"}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div>
        {cs.map((c, ci) => (
          <div key={ci}>
            {n > 1 && <h4 className="bgrp-h">Candle {ci ? "B" : "A"}</h4>}
            {KEYS.map(([k, label]) => (
              <div className="sl" key={k}>
                <label htmlFor={`sl-${n}${ci}${k}`}>{label}</label>
                <input id={`sl-${n}${ci}${k}`} type="range" min={0} max={100} value={c[k]} onChange={(e) => set(ci, k, +e.target.value)} />
                <output>{pipPx(c[k])}</output>
              </div>
            ))}
          </div>
        ))}
        <div className="presets">
          {(n === 1 ? LABELS1 : LABELS2).map(([id, label]) => (
            <button key={id} className="btn" onClick={() => setCs(pre[id].map((c) => ({ ...c })))}>{label}</button>
          ))}
        </div>
        <div className="bread" aria-live="polite">
          {reading.map((t, i) => (
            <p key={i} className={i === 0 ? "nm" : undefined}>{t}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
