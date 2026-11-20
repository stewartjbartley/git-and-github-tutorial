/* eslint-disable @typescript-eslint/no-explicit-any */
// SVG candlestick renderer. Pure function: returns an SVG string, so it runs on the server and in the browser.

export type Bar = { o: number; h: number; l: number; c: number };
export type Ann = Record<string, any>;
export type ChartSpec = {
  alt?: string;
  start?: number;
  /** Compact form: [close, upperWick, lowerWick, openOverride?]; open defaults to the previous close. */
  c?: number[][];
  /** Explicit bars (used for real data and aggregated series). */
  bars?: Bar[];
  base?: number;
  /** Real prices: show raw values with this many decimals instead of pips above `base`. */
  real?: { dec: number };
  h?: number;
  strips?: unknown[];
  ann?: Ann[];
  xl?: (i: number) => string | null;
};
export type ChartOpt = {
  mini?: boolean;
  w?: number;
  h?: number;
  clickable?: boolean;
  bare?: boolean;
  marks?: Record<string, "ok" | "bad">;
};

export function toBars(spec: ChartSpec): Bar[] {
  if (spec.bars) return spec.bars;
  let prev = spec.start ?? 0;
  return (spec.c ?? []).map((r) => {
    const o = r[3] !== undefined ? r[3] : prev;
    const c = r[0];
    prev = c;
    return { o, c, h: Math.max(o, c) + r[1], l: Math.min(o, c) - r[2] };
  });
}

/** Group every k bars into one (e.g. 4 hourly bars into one 4-hour bar). */
export function aggregate(bars: Bar[], k: number): Bar[] {
  const out: Bar[] = [];
  for (let i = 0; i + k <= bars.length; i += k) {
    const g = bars.slice(i, i + k);
    out.push({
      o: g[0].o,
      c: g[g.length - 1].c,
      h: Math.max(...g.map((b) => b.h)),
      l: Math.min(...g.map((b) => b.l)),
    });
  }
  return out;
}

/** Deterministic pseudo-random series for teaching charts. */
export function genSeries(seed: number, n: number, start: number, vol: number, drift = 0): Bar[] {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out: Bar[] = [];
  let prev = start;
  for (let i = 0; i < n; i++) {
    const step = (rnd() - 0.5) * 2 * vol + drift;
    const o = prev;
    const c = o + step;
    out.push({
      o,
      c,
      h: Math.max(o, c) + rnd() * vol * 0.7,
      l: Math.min(o, c) - rnd() * vol * 0.7,
    });
    prev = c;
  }
  return out;
}

const nice = (raw: number) => {
  const m = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / m;
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * m;
};
export const px = (v: number, base?: number) => ((base || 1.08) + v * 0.0001).toFixed(4);
export const esc = (t: unknown) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function chart(spec: ChartSpec, opt: ChartOpt = {}): string {
  const mini = !!opt.mini;
  const B = toBars(spec);
  const n = B.length;
  const quiet = opt.clickable || opt.bare;
  const W = opt.w || (mini ? 120 : 720);
  const H = opt.h || (mini ? 150 : spec.h || 340);
  const strips = spec.strips ? spec.strips.length : 0;
  const ml = mini ? 8 : 10;
  const mr = mini ? 8 : 64;
  const mt = mini ? 10 : 16 + strips * 17;
  const mb = mini ? 10 : spec.xl ? 26 : 14;
  const price = (v: number) => (spec.real ? v.toFixed(spec.real.dec) : px(v, spec.base));
  const ann = mini
    ? []
    : (spec.ann || []).filter((a) => !quiet || a.t === "hline" || a.t === "zone" || a.t === "strip" || a.t === "line");
  let lo = Math.min(...B.map((b) => b.l));
  let hi = Math.max(...B.map((b) => b.h));
  ann.forEach((a) => {
    [a.p, a.p1, a.p2, a.entry, a.stop, a.target].forEach((v) => {
      if (typeof v === "number") {
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
    });
  });
  const pad = (hi - lo) * (mini ? 0.14 : 0.12);
  lo -= pad;
  hi += pad;
  const step = (W - ml - mr) / n;
  const bw = Math.max(mini ? 4 : 2.5, Math.min(mini ? 34 : 26, step * 0.62));
  const X = (i: number) => ml + (i + 0.5) * step;
  const Y = (p: number) => mt + ((hi - p) / (hi - lo)) * (H - mt - mb);
  const s: string[] = [
    `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.alt || "Candlestick chart")}" xmlns="http://www.w3.org/2000/svg">`,
  ];
  if (!mini) {
    const gs = nice((hi - lo) / 5);
    const v0 = Math.ceil(lo / gs) * gs;
    s.push('<g class="grid axis">');
    for (let v = v0; v < hi; v += gs) {
      s.push(
        `<line x1="${ml}" x2="${W - mr}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${W - mr + 8}" y="${Y(v) + 4}">${price(v)}</text>`,
      );
    }
    if (spec.xl) {
      for (let i = 0; i < n; i++) {
        const t = spec.xl(i);
        if (t) s.push(`<text x="${X(i)}" y="${H - 8}" text-anchor="middle">${t}</text>`);
      }
    }
    s.push("</g>");
  }
  ann.forEach((a) => {
    if (a.t === "strip") {
      const y = 5 + a.row * 17;
      s.push(
        `<rect class="st" x="${X(a.i1) - step / 2 + 1}" y="${y}" width="${(a.i2 - a.i1 + 1) * step - 2}" height="14" rx="3"/><text class="st-t" x="${(X(a.i1) + X(a.i2)) / 2}" y="${y + 10.5}" text-anchor="middle">${esc(a.label)}</text>`,
      );
    }
    if (a.t === "zone") {
      const x1 = X(a.i1) - step / 2;
      const x2 = X(a.i2) + step / 2;
      const y1 = Y(a.p2);
      const y2 = Y(a.p1);
      s.push(`<rect class="z-${a.kind || "neu"}" x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}"/>`);
      if (a.label)
        s.push(`<text class="lb lb-${a.kind || "neu"}" x="${x1 + 6}" y="${y1 - 4}">${esc(a.label)}</text>`);
    }
    if (a.t === "trade") {
      const tx1 = X(a.i) - step / 2;
      const tw = a.n * step;
      const ye = Y(a.entry);
      const ys = Y(a.stop);
      const yt = Y(a.target);
      s.push(
        `<rect class="tr-win" x="${tx1}" y="${Math.min(ye, yt)}" width="${tw}" height="${Math.abs(yt - ye)}"/><rect class="tr-loss" x="${tx1}" y="${Math.min(ye, ys)}" width="${tw}" height="${Math.abs(ys - ye)}"/>`,
      );
    }
  });
  B.forEach((b, i) => {
    const up = b.c >= b.o;
    const top = Y(Math.max(b.o, b.c));
    const bot = Y(Math.min(b.o, b.c));
    s.push(
      `<g class="${up ? "up" : "dn"}"><line class="wk" x1="${X(i)}" x2="${X(i)}" y1="${Y(b.h)}" y2="${Y(b.l)}"/><rect class="bd" x="${X(i) - bw / 2}" y="${top}" width="${bw}" height="${Math.max(2, bot - top)}" rx="1"/></g>`,
    );
  });
  ann.forEach((a) => {
    if (a.t === "hline") {
      const x1 = X(a.i1) - step / 2;
      const x2 = X(a.i2) + step / 2;
      s.push(`<line class="hl" x1="${x1}" x2="${x2}" y1="${Y(a.p)}" y2="${Y(a.p)}"/>`);
      if (a.label) s.push(`<text class="lb lb-info" x="${x1}" y="${Y(a.p) - 5}">${esc(a.label)}</text>`);
    }
    if (a.t === "line") {
      s.push(`<line class="hl" style="stroke-dasharray:none;stroke-width:1.8" x1="${X(a.i1)}" y1="${Y(a.p1)}" x2="${X(a.i2)}" y2="${Y(a.p2)}"/>`);
      if (a.label) s.push(`<text class="lb lb-info" x="${X(a.i2) - 4}" y="${Y(a.p2) + 16}" text-anchor="end">${esc(a.label)}</text>`);
    }
    if (a.t === "box") {
      let hb = -1e9;
      let lb = 1e9;
      for (let i = a.i1; i <= a.i2; i++) {
        hb = Math.max(hb, B[i].h);
        lb = Math.min(lb, B[i].l);
      }
      const bx1 = X(a.i1) - step / 2 + 3;
      const bx2 = X(a.i2) + step / 2 - 3;
      const by = Y(hb) - 6;
      s.push(
        `<rect class="bx" x="${bx1}" y="${by}" width="${bx2 - bx1}" height="${Y(lb) + 6 - by}" rx="4"/><text class="lb lb-info" x="${(bx1 + bx2) / 2}" y="${by - 5}" text-anchor="middle">${esc(a.label)}</text>`,
      );
    }
    if (a.t === "tag") {
      const b = B[a.i];
      const k = a.kind || "info";
      const x = X(a.i);
      if (a.side === "bottom") {
        const y = Y(b.l) + 2;
        s.push(
          `<polygon class="tg-${k}" points="${x - 4},${y + 7} ${x + 4},${y + 7} ${x},${y}"/><text class="lb lb-${k}" x="${x}" y="${y + 19}" text-anchor="middle">${esc(a.text)}</text>`,
        );
      } else {
        const y2 = Y(b.h) - 2;
        s.push(
          `<polygon class="tg-${k}" points="${x - 4},${y2 - 7} ${x + 4},${y2 - 7} ${x},${y2}"/><text class="lb lb-${k}" x="${x}" y="${y2 - 11}" text-anchor="middle">${esc(a.text)}</text>`,
        );
      }
    }
    if (a.t === "trade") {
      const tx1 = X(a.i) - step / 2;
      const tx2 = tx1 + a.n * step;
      const rr = Math.abs((a.target - a.entry) / (a.entry - a.stop)).toFixed(1);
      s.push(
        `<line class="tl-t" x1="${tx1}" x2="${tx2}" y1="${Y(a.target)}" y2="${Y(a.target)}"/><line class="tl-e" x1="${tx1}" x2="${tx2}" y1="${Y(a.entry)}" y2="${Y(a.entry)}"/><line class="tl-s" x1="${tx1}" x2="${tx2}" y1="${Y(a.stop)}" y2="${Y(a.stop)}"/>`,
      );
      s.push(
        `<text class="lb lb-up" x="${tx2 - 4}" y="${Y(a.target) + (a.target < a.entry ? -5 : 14)}" text-anchor="end">Target ${price(a.target)} (${rr}R)</text>`,
      );
      s.push(
        `<text class="lb lb-info" x="${tx2 - 4}" y="${Y(a.entry) + (a.entry > a.stop ? -5 : 14)}" text-anchor="end">Entry ${price(a.entry)}</text>`,
      );
      s.push(
        `<text class="lb lb-down" x="${tx2 - 4}" y="${Y(a.stop) + (a.stop > a.entry ? -5 : 14)}" text-anchor="end">Stop ${price(a.stop)}</text>`,
      );
    }
  });
  if (opt.marks) {
    Object.keys(opt.marks).forEach((i) => {
      const b = B[+i];
      s.push(
        `<rect class="ring-${opt.marks![i]}" x="${X(+i) - step / 2 + 1}" y="${Y(b.h) - 5}" width="${step - 2}" height="${Y(b.l) - Y(b.h) + 10}" rx="5"/>`,
      );
    });
  }
  if (opt.clickable) {
    B.forEach((_, i) => {
      s.push(
        `<rect class="hit" data-i="${i}" x="${X(i) - step / 2}" y="${mt}" width="${step}" height="${H - mt - mb}"/>`,
      );
    });
  }
  s.push("</svg>");
  return s.join("");
}
