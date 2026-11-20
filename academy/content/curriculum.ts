import type { Lesson, LessonMeta, Module } from "./types";
import { LESSONS } from "./lessons";

type L = [title: string, minutes: number, summary: string];
const mod = (no: number, title: string, summary: string, ls: L[]): Module => ({
  no,
  title,
  summary,
  lessons: ls.map(([t, m, s], i) => ({ slug: `${no}-${i + 1}`, title: t, minutes: m, summary: s })),
});

export const MODULES: Module[] = [
  mod(1, "Markets, charts and your setup", "What price is, what you will trade, how timeframes and sessions work in CET, and how to build a clean chart and a study routine.", [
    ["Who moves price", 30, "Bid, ask, spread, order types and why candles record orders."],
    ["What you will trade: FX, gold and indices", 30, "Pips, lots, points, CFDs, leverage limits and the character of each market."],
    ["Spot, CFDs and futures: how the markets differ", 30, "Cash, CFD and futures prices, contract specifications, roll gaps, volume and which rules apply to each."],
    ["Candlesticks and other chart types", 25, "Why candles, what they hide, and what colour really means."],
    ["Timeframes and the top-down method", 35, "One market at three resolutions, and the order to read them in."],
    ["Trading styles: scalping, day trading, swing and position", 35, "How long you hold, what each style asks of you, and the risks and advantages of each."],
    ["Building a clean chart", 30, "No indicators, a CET clock, drawing standards, templates and a screenshot library."],
    ["Time zones, sessions and candle clocks", 30, "London, New York and index hours in CET, and when each candle closes."],
    ["How to study this course", 30, "The weekly rhythm, the 100-signal rule, and your baseline."],
  ]),
  mod(2, "Reading a single candle", "The five measures behind every candle name: four prices, close location, body, wicks and size.", [
    ["Four prices, one story", 30, "Open, high, low, close and why a candle is only a story once it closes."],
    ["Close location: who won", 30, "Where a candle closes inside its own range, in five bands."],
    ["Body and range: conviction", 30, "Body-to-range ratios and what a fat or thin body says."],
    ["Wicks: the record of rejection", 35, "Upper and lower wicks, which one matters, and what a wick really is."],
    ["Size against neighbours", 35, "Wide-range and quiet candles, and measuring normal for your market."],
    ["Candle personalities", 35, "Marubozu, spinning top, dojis, hammer and shooting star, by their measures."],
    ["Reading sequences left to right", 25, "A repeatable method for narrating a run of candles."],
    ["Module 2 practice lab and test", 20, "Eight mixed questions and a real-chart reading task."],
  ]),
  mod(3, "Doji and indecision", "The doji family, the three places a doji can sit, and how to trade the answer.", [
    ["What indecision looks like", 25, "Balance, pause and compression."],
    ["The doji family one by one", 30, "Standard, long-legged, dragonfly, gravestone and spinning top."],
    ["Doji after a run: the pause", 30, "When a doji is only a rest."],
    ["Doji at a level: the rejection", 35, "Long wicks at zones, and the break of the doji as the trigger."],
    ["Clusters and compression", 30, "Several small candles in a row and the break that follows."],
    ["Trading dojis: triggers, stops and targets", 30, "Full plans, plus a lab on real charts."],
  ]),
  mod(4, "Rejection candles: pin bars and long wicks", "Hammers, shooting stars and wick clusters, graded with four tests.", [
    ["Anatomy of a pin bar", 30, "The shape, the story and the measures."],
    ["The four tests", 35, "Size, poke, place and close."],
    ["Hammers at support", 35, "Buy-side rejections, with real-chart grading."],
    ["Shooting stars at resistance", 35, "Sell-side rejections and exhaustion."],
    ["Wick clusters and absorption", 35, "Three wicks into one zone."],
    ["Entry methods compared", 35, "Break of the far side, 50% of the wick, and the close."],
    ["Trend pullback pins and reversal pins", 35, "Same candle, two jobs."],
  ]),
  mod(5, "Sweep candles and liquidity", "How price takes the stops at obvious levels and what to do next.", [
    ["Where the stops are", 30, "Order clusters at swing points."],
    ["Anatomy of a sweep", 35, "Level, wick through, close back inside."],
    ["Equal highs, equal lows and double tops", 35, "The cleanest pools."],
    ["Previous day and week highs and lows", 35, "The levels every desk sees."],
    ["Sweep or breakout", 40, "The tests that tell them apart."],
    ["Entries, stops and targets for sweeps", 35, "Three entry options, with plans."],
    ["Failed sweeps and when they become breakouts", 30, "Knowing when you are wrong."],
    ["Sweeps in the sessions: Asia and London", 30, "The Asian range and the London open."],
  ]),
  mod(6, "Momentum candles and follow-through", "Wide-range candles, the midpoint test, exhaustion and traps.", [
    ["Wide-range candles", 30, "Measuring a candle against its neighbours."],
    ["Marubozu and strength", 30, "When one side owns the whole candle."],
    ["The follow-through test", 35, "Holding the midpoint."],
    ["Acceleration and exhaustion", 35, "Growing bodies into a wick."],
    ["Momentum traps", 25, "Big candles that fail."],
    ["Trading momentum: the pullback entry", 25, "Waiting for the first small candle."],
  ]),
  mod(7, "Candle pairs and triples", "How candles read each other: engulfing, inside bars, harami, tweezers, stars and strings.", [
    ["Five questions to ask of every candle", 30, "Closes against the last high, low and midpoint; overlap; size."],
    ["Engulfing", 40, "Bullish, bearish and outside bars."],
    ["Inside and outside bars", 40, "Compression and expansion."],
    ["Harami, piercing line and dark cloud", 35, "Partial reversals."],
    ["Tweezers", 30, "Same high, same low."],
    ["Stars and three-candle patterns", 35, "Morning star, evening star."],
    ["Soldiers, crows and strings", 30, "Runs of candles."],
    ["Pattern location lab", 30, "Filtering pattern lists with levels and time."],
  ]),
  mod(8, "Market structure and trend", "Swing points, trends, ranges, breaks of structure and multi-timeframe alignment.", [
    ["Swing points", 30, "Highs and lows that matter."],
    ["Trends and ranges", 30, "Higher highs, lower lows, and the rest."],
    ["Break of structure", 35, "Closes, not wicks."],
    ["Pullbacks and trend health", 35, "Impulse against correction."],
    ["Trendlines and channels", 30, "Two touches to draw, three to trust."],
    ["Multi-timeframe alignment", 30, "When the bigger timeframe wins."],
    ["Structure lab", 20, "Mark up a week of real charts."],
  ]),
  mod(9, "Support, resistance and zones", "Why levels exist, how to draw zones, flips, round numbers and zone quality.", [
    ["Why levels exist", 30, "Memory and order clusters."],
    ["Drawing zones", 35, "Bands, not lines."],
    ["Flips and retests", 35, "Resistance becomes support."],
    ["Round numbers and prior highs and lows", 30, "Automatic zones."],
    ["Zone quality scoring", 30, "Touches, age, reaction and timeframe."],
    ["Candles at zones lab", 30, "Every signal needs a place."],
    ["The zone mapping routine", 20, "Four or five zones, nothing more."],
  ]),
  mod(10, "Time, sessions and daily levels", "How candles change meaning across the day in CET, and how to build a daily routine.", [
    ["Sessions in depth", 35, "Asia, London, New York and the overlaps."],
    ["The Asian range and the London open", 40, "The most common sweep window."],
    ["US data and the New York open", 40, "14:30 and 15:30 CET."],
    ["Daily, weekly and monthly opens and levels", 35, "Where desks anchor."],
    ["Index opens and gaps: DAX, US500, IBEX", 35, "Cash opens and overnight gaps."],
    ["Trading around news", 30, "What to do before, during and after."],
    ["Building a daily routine in CET", 25, "A written plan for your day."],
  ]),
  mod(11, "The setup playbook", "Five setups with trigger, stop and target, and a scorecard for choosing between them.", [
    ["Anatomy of a trade plan", 30, "Level, story, time, plan."],
    ["Setup 1: pin bar or doji at a level", 30, "Rejection entries."],
    ["Setup 2: sweep and reclaim", 35, "Session-timed sweeps."],
    ["Setup 3: break and retest", 30, "Momentum, then a hold."],
    ["Setup 4: inside bar break", 30, "Compression with the trend."],
    ["Setup 5: engulfing at a pullback", 30, "Trapped traders."],
    ["Scoring and selecting", 25, "The six-point scorecard."],
  ]),
  mod(12, "Risk, psychology and the journal", "Sizing, stops, expectancy, the losing streak, and a journal that finds your edge.", [
    ["Risk per trade and position sizing", 35, "Size from the stop."],
    ["Trading costs: spreads, commission, slippage and financing", 30, "What each trade really costs, in pips and in R, and how slippage changes your plan."],
    ["Stops, targets and trade management", 35, "Where to exit and when."],
    ["Expectancy and R-multiples", 30, "Why 2R matters more than win rate."],
    ["Drawdown and recovery", 35, "Why a 50% loss needs a 100% gain, how long recovery takes, and how to limit drawdown."],
    ["The psychology of the losing streak", 30, "Rules that survive a bad week."],
    ["The journal and the weekly review", 30, "Finding your edge in your own data."],
    ["Why you need a trading plan", 30, "What a plan is, how it works, and what it does for your results."],
    ["Writing your trading plan: template and limits", 20, "Your one-page plan, your limits and the module test."],
  ]),
  mod(13, "Market playbooks", "How the method adapts to EUR/USD, GBP/USD, USD/JPY, gold, the DAX, IBEX and US indices.", [
    ["EUR/USD and GBP/USD", 35, "Session behaviour and candle character."],
    ["USD/JPY", 25, "Trends and the Asian session."],
    ["Gold (XAU/USD)", 30, "Big ranges, New York and news."],
    ["DAX and IBEX", 30, "European cash opens."],
    ["US500 and Nasdaq", 30, "The US cash open."],
  ]),
  mod(14, "Practice lab and capstone", "Replay practice, a 100-signal backtest, review, demo rules, and your own trading plan.", [
    ["The replay method", 30, "Practising without hindsight."],
    ["Backtesting 100 signals", 60, "Collecting your own data."],
    ["Reviewing your data", 45, "What worked, when and why."],
    ["Demo trading rules", 30, "How to move to live safely."],
    ["Capstone: your trading plan", 45, "One document, written by you."],
  ]),
  mod(15, "Funded accounts and prop firms", "How proprietary-firm evaluations work, the standard rules, how to size within them, and how to judge whether one is worth the fee.", [
    ["How prop firms work", 30, "Evaluations, funded accounts, where the money comes from and what is simulated."],
    ["The standard rules", 30, "Profit targets, daily and total loss limits, trailing drawdown, consistency and news rules."],
    ["Fitting the method to the rules", 30, "Sizing so you cannot breach, plus a pass-rate simulator for your own numbers."],
    ["Is it worth it? Economics and red flags", 30, "Expected value of a challenge fee, warning signs, and what to do instead."],
  ]),
];

export const COURSE_MINUTES = MODULES.reduce((a, m) => a + m.lessons.reduce((b, l) => b + l.minutes, 0), 0);
/** Rounded for marketing copy. Lesson 1.9 hard-codes the same figure: scripts/check-content.ts fails if they drift apart. */
export const COURSE_HOURS = Math.round(COURSE_MINUTES / 60);
export const moduleMinutes = (m: Module) => m.lessons.reduce((a, l) => a + l.minutes, 0);
export const fmtHours = (min: number) => {
  const h = min / 60;
  return Number.isInteger(h) ? `${h}` : h.toFixed(1);
};

export type Found = { module: Module; meta: LessonMeta; lesson?: Lesson };

export function findLesson(slug: string): Found | null {
  for (const m of MODULES) {
    const meta = m.lessons.find((l) => l.slug === slug);
    if (meta) return { module: m, meta, lesson: LESSONS[slug] };
  }
  return null;
}

/** Previous and next lesson slugs in course order. */
export function neighbours(slug: string) {
  const all = MODULES.flatMap((m) => m.lessons.map((l) => l.slug));
  const i = all.indexOf(slug);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
