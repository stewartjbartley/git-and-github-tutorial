import type { ReactNode } from "react";

export type IconName =
  | "candle" | "globe" | "dots" | "pin" | "pulse" | "bolt" | "pair" | "trend" | "layers" | "clock" | "target" | "shield"
  | "compass" | "flask" | "briefcase" | "bank" | "news" | "calculator" | "book" | "journal" | "download" | "check" | "x"
  | "lock" | "search" | "menu" | "chevron-right" | "chevron-left" | "chevron-down" | "eye" | "lightbulb" | "alert"
  | "pencil" | "grid" | "user" | "list";

const P: Record<IconName, ReactNode> = {
  candle: <><path d="M7 3v3M7 17v4M17 6v3M17 15v5" /><rect x="4.5" y="6" width="5" height="11" rx="1.2" /><rect x="14.5" y="9" width="5" height="6" rx="1.2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18" /></>,
  dots: <><circle cx="6.5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="17.5" cy="12" r="1.5" /></>,
  pin: <><path d="M12 21V9M7.5 13.5L12 9l4.5 4.5M6 4h12" /></>,
  pulse: <><path d="M3 12h4l2.5-6 4 12 2.5-6H21" /></>,
  bolt: <><path d="M13 2.5L4.5 13.5H11L10 21.5l8.5-11H12z" /></>,
  pair: <><rect x="3.5" y="9" width="7" height="10" rx="1.6" /><rect x="13.5" y="5" width="7" height="14" rx="1.6" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-9" /><path d="M15 6h6v6" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.8-3.4 8-8 9.5C7.4 20 4 16.8 4 12V6z" /><path d="M8.7 12l2.3 2.3 4.3-4.6" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.8 8.2l-2 5.6-5.6 2 2-5.6z" /></>,
  flask: <><path d="M9 3h6M10 3v6L4.7 18.6A1.6 1.6 0 0 0 6.1 21h11.8a1.6 1.6 0 0 0 1.4-2.4L14 9V3" /><path d="M7.5 15h9" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.6" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" /></>,
  bank: <><path d="M3 10l9-6 9 6" /><path d="M5.5 10v8M9.8 10v8M14.2 10v8M18.5 10v8M3 20.5h18" /></>,
  news: <><rect x="4" y="4" width="16" height="16" rx="2.6" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2.6" /><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5V5.5" /></>,
  journal: <><rect x="5" y="3" width="14" height="18" rx="2.4" /><path d="M9 3v18M12.5 8h3.5M12.5 12h3.5" /></>,
  download: <><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></>,
  check: <><path d="M5 12.5l4.5 4.5L19 7" /></>,
  x: <><path d="M6 6l12 12M18 6L6 18" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2.6" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  menu: <><path d="M4 8h16M4 16h16" /></>,
  "chevron-right": <><path d="M9.5 5l7 7-7 7" /></>,
  "chevron-left": <><path d="M14.5 5l-7 7 7 7" /></>,
  "chevron-down": <><path d="M5 9.5l7 7 7-7" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  lightbulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" /></>,
  alert: <><path d="M12 4l9.5 16.5h-19z" /><path d="M12 10v4.2M12 17.2h.01" /></>,
  pencil: <><path d="M4 20l1-4.2L16.6 4.2a2.2 2.2 0 0 1 3.2 3.2L8.2 19z" /><path d="M14.5 6.4l3.1 3.1" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.6" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" /></>,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.8" cy="6" r=".8" /><circle cx="4.8" cy="12" r=".8" /><circle cx="4.8" cy="18" r=".8" /></>,
};

export function Icon({ name, size = 20, className, strokeWidth = 1.7 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {P[name]}
    </svg>
  );
}

/** App-icon style tile for a module: gradient rounded square with a white glyph. */
const MODS: Record<number, [IconName, string, string]> = {
  1: ["globe", "#0A84FF", "#0060DF"], 2: ["candle", "#30D158", "#1FA044"], 3: ["dots", "#8E8E93", "#636366"], 4: ["pin", "#FF9F0A", "#E07B00"],
  5: ["pulse", "#BF5AF2", "#8E3FCC"], 6: ["bolt", "#FFD60A", "#FF9F0A"], 7: ["pair", "#40C8E0", "#1AA0C0"], 8: ["trend", "#34C759", "#1E9E3E"],
  9: ["layers", "#5E5CE6", "#3C3AB8"], 10: ["clock", "#FF453A", "#D1281E"], 11: ["target", "#FF375F", "#D01A40"], 12: ["shield", "#0A84FF", "#0A55C0"],
  13: ["compass", "#32ADE6", "#0C82BE"], 14: ["flask", "#AF52DE", "#7B2FA8"], 15: ["briefcase", "#636366", "#3A3A3C"], 16: ["bank", "#FF9F0A", "#CC6A00"], 17: ["news", "#FF6482", "#D53A5A"],
};

export function ModuleIcon({ no, size = 40 }: { no: number; size?: number }) {
  const [icon, from, to] = MODS[no] ?? MODS[1];
  return (
    <span className="appicon" style={{ width: size, height: size, background: `linear-gradient(160deg, ${from}, ${to})` }} aria-hidden="true">
      <Icon name={icon} size={Math.round(size * 0.55)} strokeWidth={1.8} />
    </span>
  );
}

export function ProgressRing({ pct, size = 56, label }: { pct: number; size?: number; label?: string }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="pring" style={{ width: size, height: size }} role="img" aria-label={label ?? `${pct}% complete`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--soft)" strokeWidth="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <span className="pring-n">{pct}%</span>
    </span>
  );
}
