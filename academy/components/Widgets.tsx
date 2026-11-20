"use client";
import { useEffect, useState } from "react";

export function Calc() {
  const [bal, setBal] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [stop, setStop] = useState(20);
  const [pip, setPip] = useState(10);
  const amt = (bal * risk) / 100;
  const ok = stop > 0 && pip > 0 && amt >= 0;
  const num = (f: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => f(parseFloat(e.target.value) || 0);
  return (
    <div className="calc">
      <div className="f"><label htmlFor="k-bal">Account balance</label><input id="k-bal" type="number" value={bal} min={0} onChange={num(setBal)} /></div>
      <div className="f"><label htmlFor="k-risk">Risk per trade (%)</label><input id="k-risk" type="number" value={risk} min={0} step={0.1} onChange={num(setRisk)} /></div>
      <div className="f"><label htmlFor="k-stop">Stop distance (pips)</label><input id="k-stop" type="number" value={stop} min={1} onChange={num(setStop)} /></div>
      <div className="f"><label htmlFor="k-pip">Value of 1 pip per 1 lot</label><input id="k-pip" type="number" value={pip} min={0} step={0.1} onChange={num(setPip)} /></div>
      <div className="res" aria-live="polite">
        {ok ? (<>Money at risk: <b>{amt.toFixed(2)}</b><br />Position size: <b>{(amt / (stop * pip)).toFixed(2)} lots</b></>) : "Enter a stop distance and pip value above zero."}
      </div>
    </div>
  );
}

const ROWS: [string, [number, number][]][] = [["Asia", [[0, 8]]], ["London and EU cash", [[9, 17.5]]], ["New York FX", [[14, 22]]], ["US cash", [[15.5, 22]]], ["Daily roll", [[23, 24]]]];
const X = (h: number) => 150 + (h / 24) * 550;
function msg(t: number) {
  if (t < 8) return "Asian hours. Small ranges, small bodies, plenty of dojis. Mark this range: its high and low are the targets for the London sweep.";
  if (t < 9) return "Pre-London. Spreads are wide and moves are thin. Wait for the open.";
  if (t < 11) return "London open window. The most common time for a sweep of the Asian high or low, followed by the move of the day.";
  if (t < 14) return "Mid-session. Often slower, rangebound inside the London move.";
  if (t < 14.5) return "New York is arriving. Step aside before the 14:30 data.";
  if (t < 15) return "US data window. Long wicks both ways are normal. Do not trade the news candle.";
  if (t < 17.5) return "London and New York overlap, with the US stock market opening at 15:30. This is the second prime window, and sweeps of the London high or low are common here.";
  if (t < 22) return "London has closed. New York is alone, active first, then drifting into the 22:00 close.";
  if (t < 23) return "Late and thin. Avoid fresh signals.";
  return "The Daily candle rolls at 23:00 CET. New day, thin liquidity. Avoid fresh signals.";
}

export function Clock() {
  const [v, setV] = useState(36);
  const now = () => {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()).split(":");
      setV(Math.min(95, Math.round((+parts[0] + +parts[1] / 60) * 4)));
    } catch {}
  };
  useEffect(now, []);
  const t = v / 4;
  const hh = Math.floor(t);
  const mm = Math.round((t - hh) * 60);
  const two = (n: number) => (n < 10 ? "0" : "") + n;
  return (
    <div className="clock">
      <div className="nowline"><span className="time">{two(hh)}:{two(mm)} CET</span><button className="btn" onClick={now}>Now in Spain</button></div>
      <input type="range" min={0} max={95} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Time of day in CET" />
      <div className="cs">
        <svg viewBox="0 0 720 150" role="img" aria-label="24-hour session map in CET">
          {Array.from({ length: 9 }, (_, i) => i * 3).map((h) => (
            <g key={h}><line x1={X(h)} x2={X(h)} y1={10} y2={120} stroke="var(--line)" /><text x={X(h)} y={140} textAnchor="middle">{two(h % 24)}:00</text></g>
          ))}
          {ROWS.map(([name, spans], i) => (
            <g key={name}>
              <text x={144} y={28 + i * 21} textAnchor="end">{name}</text>
              {spans.map(([s, e]) => (
                <rect key={s} x={X(s)} y={17 + i * 21} width={X(e) - X(s)} height={14} rx={3} fill="var(--accent)" fillOpacity={t >= s && t < e ? 0.75 : 0.28} />
              ))}
            </g>
          ))}
          <line x1={X(t)} x2={X(t)} y1={8} y2={122} stroke="var(--ink)" strokeWidth={2} />
        </svg>
      </div>
      <p className="say" aria-live="polite">{msg(t)}</p>
    </div>
  );
}

const SCORE_ITEMS = [
  ["Location.", "The signal sits at a zone, a swing high or low, or a session extreme."],
  ["Trend.", "The direction agrees with the 4-hour and Daily structure."],
  ["Candle quality.", "It passes the size tests for its type and has fully closed."],
  ["Time.", "It formed in a live window: 09:00 to 11:00 or 14:30 to 17:30 CET."],
  ["Room.", "At least 2R to the next zone."],
  ["Risk.", "The stop is beyond the signal wick and size risks 1% or less."],
];
export function ScoreCard() {
  const [on, setOn] = useState<boolean[]>(SCORE_ITEMS.map(() => false));
  const s = on.filter(Boolean).length;
  const g = !on[0] ? "No trade. Location is mandatory: without a place the candle is only a shape." : !on[5] ? "No trade. The risk rule is mandatory." : s === 6 ? "A. Take it at full size." : s === 5 ? "B. Take it at half size." : s === 4 ? "C. Watch it, do not trade it." : "No trade.";
  return (
    <div className="score-card">
      {SCORE_ITEMS.map(([b, t], i) => (
        <label key={b}><input type="checkbox" checked={on[i]} onChange={() => setOn((p) => p.map((x, j) => (j === i ? !x : x)))} /><span><b>{b}</b> {t}</span></label>
      ))}
      <div className="out" aria-live="polite">Score <span className="big">{s} / 6</span>. {g}</div>
    </div>
  );
}

type SimResult = { pass: number; dd: number; day: number; timeout: number; median: number | null };

export function ChallengeSim() {
  const [win, setWin] = useState(35);
  const [avgR, setAvgR] = useState(2);
  const [risk, setRisk] = useState(0.5);
  const [target, setTarget] = useState(8);
  const [dd, setDd] = useState(10);
  const [daily, setDaily] = useState(5);
  const [perDay, setPerDay] = useState(2);
  const [res, setRes] = useState<SimResult | null>(null);
  const num = (f: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => f(parseFloat(e.target.value) || 0);

  function run() {
    const runs = 3000;
    const maxTrades = 400;
    const perDayN = Math.max(1, Math.round(perDay));
    let pass = 0, ddF = 0, dayF = 0, to = 0;
    const passTrades: number[] = [];
    for (let r = 0; r < runs; r++) {
      let eq = 0, t = 0, outcome = "to";
      outer: while (t < maxTrades) {
        let dayPnl = 0;
        for (let k = 0; k < perDayN && t < maxTrades; k++) {
          const pnl = Math.random() < win / 100 ? avgR * risk : -risk;
          eq += pnl; dayPnl += pnl; t++;
          if (eq <= -dd) { outcome = "dd"; break outer; }
          if (dayPnl <= -daily) { outcome = "day"; break outer; }
          if (eq >= target) { outcome = "pass"; break outer; }
        }
      }
      if (outcome === "pass") { pass++; passTrades.push(t); }
      else if (outcome === "dd") ddF++;
      else if (outcome === "day") dayF++;
      else to++;
    }
    passTrades.sort((a, b) => a - b);
    const pc = (n: number) => Math.round((n / runs) * 1000) / 10;
    setRes({ pass: pc(pass), dd: pc(ddF), day: pc(dayF), timeout: pc(to), median: passTrades.length ? passTrades[Math.floor(passTrades.length / 2)] : null });
  }

  return (
    <div className="calc" style={{ maxWidth: 640 }}>
      <div className="f"><label htmlFor="s-win">Win rate (%)</label><input id="s-win" type="number" value={win} min={1} max={99} onChange={num(setWin)} /></div>
      <div className="f"><label htmlFor="s-r">Average win (R)</label><input id="s-r" type="number" value={avgR} min={0.1} step={0.1} onChange={num(setAvgR)} /></div>
      <div className="f"><label htmlFor="s-risk">Risk per trade (% of start balance)</label><input id="s-risk" type="number" value={risk} min={0.05} step={0.05} onChange={num(setRisk)} /></div>
      <div className="f"><label htmlFor="s-t">Profit target (%)</label><input id="s-t" type="number" value={target} min={0.5} step={0.5} onChange={num(setTarget)} /></div>
      <div className="f"><label htmlFor="s-dd">Maximum total loss (%)</label><input id="s-dd" type="number" value={dd} min={0.5} step={0.5} onChange={num(setDd)} /></div>
      <div className="f"><label htmlFor="s-d">Maximum daily loss (%)</label><input id="s-d" type="number" value={daily} min={0.5} step={0.5} onChange={num(setDaily)} /></div>
      <div className="f"><label htmlFor="s-n">Trades per day</label><input id="s-n" type="number" value={perDay} min={1} step={1} onChange={num(setPerDay)} /></div>
      <p className="legal" style={{ margin: "8px 0" }}>These starting numbers are placeholders for a thin edge, not a forecast. Replace them with your own journal figures.</p>
      <button className="btn primary" onClick={run}>Run 3,000 attempts</button>
      <div className="res" aria-live="polite">
        {res ? (
          <>
            Passed: <b>{res.pass}%</b><br />
            Failed on total loss: <b>{res.dd}%</b><br />
            Failed on daily loss: <b>{res.day}%</b><br />
            Timed out after 400 trades: <b>{res.timeout}%</b><br />
            Median trades to pass: <b>{res.median ?? "none passed"}</b>
          </>
        ) : "Set your numbers and run it."}
      </div>
    </div>
  );
}
