export type Download = {
  id: string;
  file: string;
  title: string;
  desc: string;
  /** Lesson slugs where this download is offered. */
  lessons: string[];
};

export const DOWNLOADS: Download[] = [
  { id: "broker-checklist", file: "broker-checklist.pdf", title: "Broker checklist, order types and margin card", desc: "Verification steps, warning signs, a cost comparison, every order type and the margin formulas.", lessons: ["16-1", "16-3", "16-4"] },
  { id: "macro-planner", file: "macro-planner.pdf", title: "Weekly macro planner (CET)", desc: "A Sunday sheet for releases, stand-aside windows, mood, rate story and a Friday review.", lessons: ["17-3", "17-5"] },
  { id: "candle-encyclopedia", file: "candle-encyclopedia.pdf", title: "Candlestick reference chart", desc: "Every candle and pattern in the course with its name, story, where it matters, what to expect and what confirms it.", lessons: ["2-6", "7-1", "7-8"] },
  { id: "trading-journal", file: "trading-journal.pdf", title: "Trading journal (full printable workbook)", desc: "Cover, plan page, 100-signal tracker, six trade-log pages, four weekly reviews, monthly summary, R curve, drawdown tracker, psychology log and screenshot index.", lessons: ["12-7", "14-2"] },
  { id: "candle-measures", file: "candle-measures.pdf", title: "Candle measures cheat sheet", desc: "The five measures, the thresholds, the eight candle types with pictures, and a 10-candle practice grid.", lessons: ["2-6", "2-9"] },
  { id: "session-map-cet", file: "session-map-cet.pdf", title: "Session and time map (CET)", desc: "Sessions, candle close times, news times and a daily routine, with space to record your own platform's clock.", lessons: ["1-8", "10-1", "10-7"] },
  { id: "sweep-breakout-card", file: "sweep-breakout-card.pdf", title: "Sweep or breakout decision card", desc: "The tests and the five-step decision process, with the two reference charts.", lessons: ["5-5"] },
  { id: "setup-playbook", file: "setup-playbook.pdf", title: "Five-setup playbook one-pager", desc: "Trigger, stop, target, best time and skip rule for every setup.", lessons: ["11-1", "11-7"] },
  { id: "trade-plan-card", file: "trade-plan-card.pdf", title: "Trade plan card and scorecard", desc: "A fill-in card to complete before every order, with the six-point scorecard.", lessons: ["11-1", "11-7"] },
  { id: "trading-styles", file: "trading-styles.pdf", title: "Trading styles comparison", desc: "Scalping, day, swing and position trading side by side, with a style statement to complete.", lessons: ["1-6"] },
  { id: "risk-reference", file: "risk-reference.pdf", title: "Risk, sizing and recovery reference", desc: "Position sizing, drawdown recovery, loss streaks, expectancy and the cost of the spread, on one page.", lessons: ["12-1", "12-2", "12-5"] },
  { id: "journal-template", file: "journal-template.pdf", title: "Trade journal and weekly review sheet", desc: "A printable journal with the seven fields and the five Friday review questions.", lessons: ["12-7"] },
  { id: "trading-plan", file: "trading-plan.pdf", title: "Trading plan template", desc: "A one-page plan with ten sections to complete, sign and date.", lessons: ["12-8", "12-9"] },
  { id: "prop-firm-checklist", file: "prop-firm-checklist.pdf", title: "Prop firm checklist and expected-value worksheet", desc: "Questions to answer from a firm's own terms, and a worksheet for the expected value of the fee.", lessons: ["15-1", "15-4"] },
];

export const findDownload = (id: string) => DOWNLOADS.find((d) => d.id === id);
export const downloadsForLesson = (slug: string) => DOWNLOADS.filter((d) => d.lessons.includes(slug));
