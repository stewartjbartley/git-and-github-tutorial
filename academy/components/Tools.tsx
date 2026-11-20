"use client";
import { useState } from "react";

const PAIRS: [string, string, string][] = [
  ["EUR/USD", "EUR", "USD"], ["GBP/USD", "GBP", "USD"], ["AUD/USD", "AUD", "USD"], ["NZD/USD", "NZD", "USD"],
  ["USD/JPY", "USD", "JPY"], ["USD/CHF", "USD", "CHF"], ["USD/CAD", "USD", "CAD"], ["EUR/GBP", "EUR", "GBP"],
  ["EUR/JPY", "EUR", "JPY"], ["GBP/JPY", "GBP", "JPY"], ["EUR/CHF", "EUR", "CHF"], ["AUD/JPY", "AUD", "JPY"],
];
const ACCOUNTS = ["EUR", "USD", "GBP", "CHF", "CAD", "AUD", "JPY"];
const num = (f: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => f(parseFloat(e.target.value));
const fmt = (n: number, d = 2) => (Number.isFinite(n) ? n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d }) : "-");

export function PipCalc() {
  const [pi, setPi] = useState(0);
  const [lots, setLots] = useState(1);
  const [contract, setContract] = useState(100000);
  const [dir, setDir] = useState<"buy" | "sell">("buy");
  const [entry, setEntry] = useState(1.085);
  const [exit, setExit] = useState(1.087);
  const [acct, setAcct] = useState("EUR");
  const [rate, setRate] = useState<number>(NaN);
  const [risk, setRisk] = useState(100);
  const [stopPips, setStopPips] = useState(20);

  const [name, base, quote] = PAIRS[pi];
  const pipSize = quote === "JPY" ? 0.01 : 0.0001;
  const sameCcy = acct === quote;
  const conv = sameCcy ? 1 : rate;
  const pipValueQuote = pipSize * contract;
  const pipValueAcct = pipValueQuote * conv;
  const pips = ((exit - entry) / pipSize) * (dir === "buy" ? 1 : -1);
  const pnl = pips * pipValueAcct * lots;
  const needRate = !sameCcy && !(rate > 0);
  const sizeLots = risk / (stopPips * pipValueAcct);

  return (
    <div className="calc tool" style={{ maxWidth: 680 }}>
      <div className="f"><label htmlFor="pc-pair">Currency pair</label>
        <select id="pc-pair" value={pi} onChange={(e) => setPi(+e.target.value)}>{PAIRS.map((p, i) => <option key={p[0]} value={i}>{p[0]}</option>)}</select></div>
      <div className="f"><label htmlFor="pc-acct">Account currency</label>
        <select id="pc-acct" value={acct} onChange={(e) => setAcct(e.target.value)}>{ACCOUNTS.map((a) => <option key={a}>{a}</option>)}</select></div>
      {!sameCcy && (
        <div className="f"><label htmlFor="pc-rate">1 {quote} = how many {acct}? (current rate)</label>
          <input id="pc-rate" type="number" step="0.0001" value={Number.isFinite(rate) ? rate : ""} onChange={num(setRate)} placeholder="enter live rate" /></div>
      )}
      <div className="f"><label htmlFor="pc-lots">Position size (lots)</label><input id="pc-lots" type="number" step="0.01" min="0" value={lots} onChange={num(setLots)} /></div>
      <div className="f"><label htmlFor="pc-cs">Units in one lot</label><input id="pc-cs" type="number" value={contract} min="1" onChange={num(setContract)} /></div>
      <div className="f"><label htmlFor="pc-dir">Direction</label>
        <select id="pc-dir" value={dir} onChange={(e) => setDir(e.target.value as "buy" | "sell")}><option value="buy">Buy (long)</option><option value="sell">Sell (short)</option></select></div>
      <div className="f"><label htmlFor="pc-in">Entry price</label><input id="pc-in" type="number" step={pipSize / 10} value={entry} onChange={num(setEntry)} /></div>
      <div className="f"><label htmlFor="pc-out">Exit price</label><input id="pc-out" type="number" step={pipSize / 10} value={exit} onChange={num(setExit)} /></div>
      <div className="res" aria-live="polite">
        <div className="small">{name}: 1 pip = {pipSize} ({base} per {quote}). Position values are in {quote} before conversion.</div>
        Pips moved: <b>{fmt(pips, 1)}</b><br />
        Pip value per lot: <b>{fmt(pipValueQuote)} {quote}</b>{!sameCcy && !needRate && <> = <b>{fmt(pipValueAcct)} {acct}</b></>}<br />
        {needRate ? <>Enter the conversion rate to see profit or loss in {acct}.</> : <>Profit or loss: <b className={pnl >= 0 ? "pos" : "neg"}>{fmt(pnl)} {acct}</b></>}
      </div>
      <h4 style={{ margin: "16px 0 4px" }}>Size from risk</h4>
      <div className="f"><label htmlFor="pc-risk">Money to risk ({acct})</label><input id="pc-risk" type="number" value={risk} min="0" onChange={num(setRisk)} /></div>
      <div className="f"><label htmlFor="pc-stop">Stop distance (pips)</label><input id="pc-stop" type="number" value={stopPips} min="0.1" step="0.1" onChange={num(setStopPips)} /></div>
      <div className="res" aria-live="polite">
        {needRate || !(stopPips > 0) ? "Enter the conversion rate and a stop distance." : <>Position size: <b>{fmt(sizeLots, 2)} lots</b> ({fmt(sizeLots * contract, 0)} units)<br />Round down to your broker&apos;s smallest step.</>}
      </div>
      <p className="small">Spot prices and your broker&apos;s contract can differ. Check its specification. Use the live conversion rate, not an old one.</p>
    </div>
  );
}

type Inst = { name: string; ccy: string; vpp: number; note: string; whole?: boolean };
const INSTS: Inst[] = [
  { name: "DAX 40 CFD", ccy: "EUR", vpp: 1, note: "Often 1 EUR per point per contract. Check your broker." },
  { name: "IBEX 35 CFD", ccy: "EUR", vpp: 1, note: "Often 1 EUR per point per contract. Check your broker." },
  { name: "US500 CFD", ccy: "USD", vpp: 1, note: "Often 1 USD per point per contract. Check your broker." },
  { name: "US100 CFD", ccy: "USD", vpp: 1, note: "Often 1 USD per point per contract. Check your broker." },
  { name: "E-mini S&P 500 future (ES)", ccy: "USD", vpp: 50, note: "50 USD per point. Tick 0.25 = 12.50 USD.", whole: true },
  { name: "Micro E-mini S&P 500 future (MES)", ccy: "USD", vpp: 5, note: "5 USD per point. Tick 0.25 = 1.25 USD.", whole: true },
  { name: "DAX future (FDAX)", ccy: "EUR", vpp: 25, note: "25 EUR per point. Tick 0.5 = 12.50 EUR.", whole: true },
  { name: "Mini-DAX future (FDXM)", ccy: "EUR", vpp: 5, note: "5 EUR per point. Tick 1 = 5 EUR.", whole: true },
  { name: "Gold future (GC)", ccy: "USD", vpp: 100, note: "100 troy ounces: 100 USD per 1.00 move.", whole: true },
  { name: "Micro gold future (MGC)", ccy: "USD", vpp: 10, note: "10 troy ounces: 10 USD per 1.00 move.", whole: true },
  { name: "Gold CFD (XAU/USD)", ccy: "USD", vpp: 100, note: "Often 100 USD per 1.00 move per lot. Check your broker." },
  { name: "Custom", ccy: "", vpp: 1, note: "Enter the value per point from your contract specification." },
];

export function PointCalc() {
  const [ii, setIi] = useState(0);
  const [vpp, setVpp] = useState(INSTS[0].vpp);
  const [size, setSize] = useState(1);
  const [dir, setDir] = useState<"buy" | "sell">("buy");
  const [entry, setEntry] = useState(18000);
  const [exit, setExit] = useState(18040);
  const [risk, setRisk] = useState(100);
  const [stop, setStop] = useState(40);
  const inst = INSTS[ii];
  const pts = (exit - entry) * (dir === "buy" ? 1 : -1);
  const pnl = pts * vpp * size;
  const exact = stop > 0 && vpp > 0 ? risk / (stop * vpp) : NaN;
  const whole = Math.floor(exact);
  const ccy = inst.ccy || "account currency";
  return (
    <div className="calc tool" style={{ maxWidth: 680 }}>
      <div className="f"><label htmlFor="pt-inst">Instrument</label>
        <select id="pt-inst" value={ii} onChange={(e) => { const i = +e.target.value; setIi(i); setVpp(INSTS[i].vpp); }}>{INSTS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}</select></div>
      <div className="f"><label htmlFor="pt-v">Value of 1 point per contract ({ccy})</label><input id="pt-v" type="number" step="0.01" value={vpp} min="0" onChange={num(setVpp)} /></div>
      <p className="small" style={{ margin: "0 0 8px" }}>{inst.note}</p>
      <div className="f"><label htmlFor="pt-n">Contracts or lots</label><input id="pt-n" type="number" step="0.01" min="0" value={size} onChange={num(setSize)} /></div>
      <div className="f"><label htmlFor="pt-d">Direction</label>
        <select id="pt-d" value={dir} onChange={(e) => setDir(e.target.value as "buy" | "sell")}><option value="buy">Buy (long)</option><option value="sell">Sell (short)</option></select></div>
      <div className="f"><label htmlFor="pt-in">Entry price</label><input id="pt-in" type="number" step="0.25" value={entry} onChange={num(setEntry)} /></div>
      <div className="f"><label htmlFor="pt-out">Exit price</label><input id="pt-out" type="number" step="0.25" value={exit} onChange={num(setExit)} /></div>
      <div className="res" aria-live="polite">
        Points moved: <b>{fmt(pts, 2)}</b><br />
        Profit or loss: <b className={pnl >= 0 ? "pos" : "neg"}>{fmt(pnl)} {inst.ccy}</b>
      </div>
      <h4 style={{ margin: "16px 0 4px" }}>Size from risk</h4>
      <div className="f"><label htmlFor="pt-r">Money to risk ({ccy})</label><input id="pt-r" type="number" value={risk} min="0" onChange={num(setRisk)} /></div>
      <div className="f"><label htmlFor="pt-s">Stop distance (points)</label><input id="pt-s" type="number" value={stop} min="0.25" step="0.25" onChange={num(setStop)} /></div>
      <div className="res" aria-live="polite">
        {Number.isFinite(exact) ? <>Size: <b>{fmt(exact, 2)}</b> contracts{inst.whole && <>. Whole contracts only: <b>{whole}</b>{whole < 1 && " (the stop is too wide for this risk: use a micro contract or a smaller risk)"}</>}</> : "Enter a stop distance and a value per point."}
      </div>
      <p className="small">If the contract is quoted in a currency other than your account currency, convert the result at the live rate. A CFD&apos;s value per point depends on your broker.</p>
    </div>
  );
}
