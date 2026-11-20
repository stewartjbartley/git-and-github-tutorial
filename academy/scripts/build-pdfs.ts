/**
 * Builds the learner PDFs into private/pdfs/.
 * Run from the academy folder:  npx tsx scripts/build-pdfs.ts
 * Needs Playwright with Chromium (npm i -D playwright, then npx playwright install chromium).
 * Uses the same chart engine as the lessons, so the pictures always match the course.
 */
import { readFileSync, mkdirSync } from "fs";
import path from "path";
import { chart } from "../lib/chart";
import { CH, MINI } from "../content/charts";
import { CANDLES, BIAS_LABEL, GROUP_LABEL, type Group } from "../content/candles";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { chromium } = require("playwright");

const root = process.cwd();
const globals = readFileSync(path.join(root, "app", "globals.css"), "utf8");
const chartCss = globals.slice(globals.indexOf("/* chart svg */"), globals.indexOf("/* widgets */"));

const BASE = `
:root{--bg:#fff;--surface:#fff;--soft:#EEF2F6;--ink:#12171E;--muted:#566170;--line:#CBD3DC;--accent:#1D4ED8;--cup:#16845A;--cdown:#C93A30}
*{box-sizing:border-box}
body{font-family:Helvetica,Arial,sans-serif;font-size:9.5pt;color:#12171E;margin:0;line-height:1.4}
h1{font-size:19pt;margin:0 0 2px;letter-spacing:-.01em}
.sub{color:#566170;margin:0 0 8px}
h2{font-size:11.5pt;margin:12px 0 4px;border-bottom:1px solid #CBD3DC;padding-bottom:2px}
h3{font-size:10pt;margin:8px 0 2px}
p{margin:3px 0 6px}
table{border-collapse:collapse;width:calc(100% - 2px);margin:4px 0 8px;font-size:8.8pt}
th,td{border:1px solid #CBD3DC;padding:3px 5px;text-align:left;vertical-align:top}
th{background:#EEF2F6;font-size:7.6pt;text-transform:uppercase;letter-spacing:.04em}
.blank td{height:21px}
.line{border-bottom:1px solid #12171E;height:21px;margin:2px 0}
.field{display:flex;gap:6px;align-items:flex-end;margin:4px 0}
.field b{white-space:nowrap}
.field span{flex:1;border-bottom:1px solid #12171E;height:16px}
.box{border:1px solid #12171E;height:12px;width:12px;display:inline-block;vertical-align:middle;margin-right:6px}
.chk{margin:4px 0}
.rule{border-left:3px solid #1D4ED8;background:#F4F7FB;padding:5px 8px;margin:8px 0}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.card{border:1px solid #CBD3DC;border-radius:4px;padding:4px;text-align:center;font-size:8pt}
.card svg{width:100%;height:auto;max-height:80px}
.card b{display:block;font-size:8.4pt}
.fig svg{width:100%;height:auto}
.fig p{font-size:8pt;color:#566170;margin:2px 0 6px}
.small{font-size:8pt;color:#566170}
.entry{display:grid;grid-template-columns:62px 1fr;gap:8px;border:1px solid #CBD3DC;border-radius:4px;padding:5px;break-inside:avoid;margin:0 0 6px;font-size:7.8pt;line-height:1.3}
.entry svg{width:100%;height:auto}
.entry h3{margin:0 0 1px;font-size:9pt}
.entry p{margin:1px 0}
.bias{font-size:6.6pt;text-transform:uppercase;letter-spacing:.04em;border:1px solid #CBD3DC;border-radius:3px;padding:0 4px;margin-left:4px;font-weight:700}
.bias.bullish{color:#16845A;border-color:#16845A}.bias.bearish{color:#C93A30;border-color:#C93A30}.bias.continuation{color:#1D4ED8;border-color:#1D4ED8}
.cols2{column-count:2;column-gap:8px}
.page{page-break-after:always}.page:last-child{page-break-after:auto}
.rgrid{height:300px;border:1px solid #12171E;background-image:linear-gradient(#DDE3EA 1px,transparent 1px),linear-gradient(90deg,#DDE3EA 1px,transparent 1px);background-size:15px 15px}
.tiny td,.tiny th{font-size:7.4pt;padding:2px 3px}
.tiny .blank td{height:27px}
${chartCss}
`;

const wrap = (title: string, sub: string, body: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head><body><h1>${title}</h1><p class="sub">${sub}</p>${body}</body></html>`;

const field = (label: string) => `<div class="field"><b>${label}</b><span></span></div>`;
const lines = (n: number) => Array.from({ length: n }, () => `<div class="line"></div>`).join("");
const blankRows = (cols: number, n: number) => Array.from({ length: n }, () => `<tr class="blank">${"<td></td>".repeat(cols)}</tr>`).join("");
const mini = (id: string, label: string, note: string) => `<div class="card">${chart(MINI[id], { mini: true, w: 90, h: 100 })}<b>${label}</b>${note}</div>`;

type Doc = { id: string; landscape?: boolean; html: string };

const DOCS: Doc[] = [
  {
    id: "candle-measures",
    html: wrap("Candle measures cheat sheet", "Read first, name second. Take the five measures on every candle before you give it a name.", `
<h2>The five measures</h2>
<table><tr><th>Measure</th><th>How to take it</th><th>What it says</th></tr>
<tr><td><b>Close location</b></td><td>(close - low) / (high - low)</td><td>80-100% top fifth: buyers finished in control. 0-20% bottom fifth: sellers did. 40-60% balanced.</td></tr>
<tr><td><b>Body / range</b></td><td>|close - open| / (high - low)</td><td>90%+ marubozu. 70-90% strong. 30-70% medium. 10-30% small. Under 10% doji.</td></tr>
<tr><td><b>Upper wick / range</b></td><td>(high - top of body) / range</td><td>60%+ means higher prices were rejected.</td></tr>
<tr><td><b>Lower wick / range</b></td><td>(bottom of body - low) / range</td><td>60%+ means lower prices were rejected.</td></tr>
<tr><td><b>Size vs neighbours</b></td><td>range / average range of last 10</td><td>1.5 or more: wide-range. Under 0.5: quiet.</td></tr></table>
<div class="rule"><b>Remember:</b> a wick is evidence only if it points at something (a zone, a swing, a session extreme). A candle that has not closed is a rumour.</div>
<h2>The eight single candles</h2>
<div class="grid4">
${mini("bullMaru", "Bullish marubozu", "Body 90%+, closes at the high")}
${mini("bearMaru", "Bearish marubozu", "Body 90%+, closes at the low")}
${mini("spin", "Spinning top", "Body 30% or less, both wicks 25%+")}
${mini("doji", "Long-legged doji", "Body under 10%, both wicks long")}
${mini("dragon", "Dragonfly doji", "Body under 10%, lower wick 60%+")}
${mini("grave", "Gravestone doji", "Body under 10%, upper wick 60%+")}
${mini("hammer", "Hammer-type pin bar", "Small body on top, lower wick 60%+")}
${mini("star", "Shooting-star pin bar", "Small body below, upper wick 60%+")}
</div>
<h2>Ten-candle practice grid</h2>
<p class="small">Pick ten consecutive candles on a 1-hour chart. Work out each measure, then write the reading in one line.</p>
<table><tr><th>#</th><th>Close loc. %</th><th>Body %</th><th>Upper wick %</th><th>Lower wick %</th><th>Size vs avg</th><th>Reading (who won, how clearly, what the wicks say)</th></tr>
${Array.from({ length: 10 }, (_, i) => `<tr class="blank"><td>${i + 1}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}</table>`),
  },
  {
    id: "session-map-cet",
    html: wrap("Session and time map (CET)", "Times are in CET (Spain). Check every one against your own platform before you rely on it.", `
<h2>The day in CET</h2>
<table><tr><th>Window</th><th>What happens</th><th>What candles tend to look like</th></tr>
<tr><td><b>23:00</b></td><td>Daily candle roll (17:00 New York). Thin, wide spreads.</td><td>Erratic. Avoid fresh signals.</td></tr>
<tr><td><b>00:00-08:00</b></td><td>Asia. Quiet for EUR and GBP pairs, active for JPY and AUD.</td><td>Small bodies, small ranges, many dojis. Mark the high and low.</td></tr>
<tr><td><b>09:00</b></td><td>London and EU cash open. DAX and IBEX cash trade 09:00-17:30.</td><td>Wide-range candles. Sweeps of the Asian range are common.</td></tr>
<tr><td><b>09:00-11:00</b></td><td>London open window.</td><td>The first move of the day.</td></tr>
<tr><td><b>11:00-14:00</b></td><td>Mid-session lull.</td><td>Slower, rangebound.</td></tr>
<tr><td><b>14:30</b></td><td>US data (jobs, CPI, retail sales). ECB decision 14:15, press conference 14:45. Bank of England 13:00.</td><td>Long wicks both ways. Do not trade the news candle.</td></tr>
<tr><td><b>15:30</b></td><td>US cash open (09:30 New York).</td><td>A burst. Sweeps of the London high or low.</td></tr>
<tr><td><b>14:30-17:30</b></td><td>London and New York overlap.</td><td>The widest ranges of the day.</td></tr>
<tr><td><b>17:30-18:00</b></td><td>London close.</td><td>Reversals of the day's move are common.</td></tr>
<tr><td><b>20:00</b></td><td>Fed decision, press conference 20:30.</td><td>Violent. Stand aside.</td></tr>
<tr><td><b>22:00</b></td><td>US cash close.</td><td>Drift or fade.</td></tr></table>
<h2>Candle close times (FX, many platforms)</h2>
<table><tr><th>Timeframe</th><th>Closes at (CET)</th></tr>
<tr><td>1-hour</td><td>On the hour</td></tr>
<tr><td>4-hour</td><td>03:00, 07:00, 11:00, 15:00, 19:00, 23:00. The London open (09:00) is inside the 07:00-11:00 candle.</td></tr>
<tr><td>Daily</td><td>23:00</td></tr>
<tr><td>Weekly</td><td>Friday 23:00. The new week opens Sunday 23:00.</td></tr></table>
<p class="small">Europe changes its clocks in the last weekend of March and October. The US changes earlier in March and later in the autumn, so New York times shift by an hour for two or three weeks a year. London is always one hour behind CET.</p>
<h2>My platform</h2>
${field("Chart time zone set to:")}${field("Broker server time is CET plus:")}${field("My 4-hour candles close at:")}${field("My Daily candle opens at (CET):")}
<h2>Daily routine</h2>
<table><tr><th>Time</th><th>Task</th></tr>
<tr><td>07:30</td><td>Check the calendar. Mark stand-aside windows.</td></tr>
<tr><td>08:00</td><td>Daily and 4-hour: trend, zones, yesterday's high and low, daily open.</td></tr>
<tr><td>08:30</td><td>Mark the Asian range on the 15-minute chart.</td></tr>
<tr><td>09:00-11:00</td><td>London open: sweep or breakout, planned setups only.</td></tr>
<tr><td>14:15-15:00</td><td>Stand aside for data. Mark the London high and low.</td></tr>
<tr><td>15:30-17:30</td><td>US open and overlap: planned setups only.</td></tr>
<tr><td>Evening</td><td>Screenshot, journal, one sentence on what you learned.</td></tr></table>`),
  },
  {
    id: "sweep-breakout-card",
    html: wrap("Sweep or breakout decision card", "Both trade through an obvious level. The close and the next candle tell you which one it is.", `
<table><tr><th></th><th>Sweep</th><th>Genuine breakout</th></tr>
<tr><td><b>The close</b></td><td>Back inside the level</td><td>Beyond the level, with a wide body</td></tr>
<tr><td><b>The wick</b></td><td>Long, pointing through the level</td><td>Small. The body does the work.</td></tr>
<tr><td><b>Next candle</b></td><td>Moves away from the level, back the way it came</td><td>Holds beyond the level, above half of the breakout body</td></tr>
<tr><td><b>Speed back</b></td><td>Fast: one or two candles</td><td>No return, or a slow retest that holds</td></tr></table>
<h2>The decision process</h2>
<ol><li>Is there an obvious level that price has just traded through? If not, stop. No level, no sweep.</li><li><b>Wait for the candle to close.</b></li><li>Inside with a long wick: a sweep candidate. Beyond with a wide body: a breakout candidate.</li><li>Check the next candle. A sweep moves away. A breakout holds beyond.</li><li>If neither is clear, stay out.</li></ol>
<div class="rule"><b>Exit rule for a sweep trade:</b> if the next candle closes beyond the sweep's extreme, exit. The sweep has become a breakout.</div>
<div class="grid2">
<div class="fig">${chart(CH.fakeout, { w: 520, h: 300 })}<p>A sweep: five touches at 1.0840, a spike to 1.0844, a close back at 1.0838.</p></div>
<div class="fig">${chart(CH.trueBreak, { w: 520, h: 300 })}<p>A genuine breakout: a wide candle closes at 1.0847 and the next candles hold above half of its body.</p></div>
</div>
<h2>Entries, stops and targets for a sweep</h2>
<table><tr><th>Entry</th><th>Where</th><th>Stop</th><th>Target</th></tr>
<tr><td>At the close of the sweep candle</td><td>Earliest, smallest stop</td><td>Beyond the sweep extreme</td><td>Opposite pool, or 2R</td></tr>
<tr><td>Break of the sweep candle's other extreme</td><td>More proof, worse price</td><td>Beyond the sweep extreme</td><td>Opposite pool, or 2R</td></tr>
<tr><td>Retest of the swept level</td><td>Best price, may never fill</td><td>Beyond the sweep extreme</td><td>Opposite pool, or 2R</td></tr></table>`),
  },
  {
    id: "setup-playbook",
    landscape: true,
    html: wrap("Five-setup playbook", "Level, story, time, plan. If you cannot fill all four, you do not have a trade.", `
<table><tr><th>Setup</th><th>Trigger</th><th>Stop</th><th>Target</th><th>Best time (CET)</th><th>Skip if</th></tr>
<tr><td><b>1. Pin bar or doji at a level</b></td><td>Stop order beyond the signal candle's far side</td><td>Beyond the wick tip</td><td>Next zone, at least 2R</td><td>09:00-11:00, 14:30-17:30</td><td>Wick in empty space, close on the wrong side, no room</td></tr>
<tr><td><b>2. Sweep and reclaim</b></td><td>Close of the sweep candle, or break of its far extreme</td><td>Beyond the sweep extreme</td><td>Opposite side of the range, or 2R</td><td>London first hour, around 15:30</td><td>No named level swept, close not clearly back inside</td></tr>
<tr><td><b>3. Break and retest</b></td><td>Close of the retest candle that holds</td><td>Beyond the retest wick</td><td>Next zone, at least 2R</td><td>Any live window</td><td>Breakout candle not wide, retest closes back inside</td></tr>
<tr><td><b>4. Inside bar break</b></td><td>Close or stop order beyond the mother bar, with the trend</td><td>Opposite side of the mother bar, or the inside bar</td><td>2R or next zone</td><td>Any live window</td><td>Mother bar over about twice the average candle</td></tr>
<tr><td><b>5. Engulfing at a pullback</b></td><td>Stop order beyond the engulfing candle</td><td>Beyond its extreme</td><td>Previous swing, at least 2R</td><td>After a pullback into a zone</td><td>Deep, heavy pullback, or 2R runs through a zone</td></tr></table>
<h2>Every setup</h2>
<table><tr><th>Level</th><th>Story</th><th>Time</th><th>Plan</th></tr>
<tr><td>A zone, swing, session extreme or previous high or low that price has respected</td><td>A candle or pair that records what happened there</td><td>A live window: 09:00-11:00 or 14:30-17:30 CET</td><td>Trigger, stop, target, size, and the exit rule if the idea fails</td></tr></table>
<div class="rule">Place is mandatory. A signal with no place is a shape. Minimum 2R to the next zone. Risk 1% or less. Never trade a candle that has not closed. Skipping is a position.</div>`),
  },
  {
    id: "trade-plan-card",
    html: wrap("Trade plan card and scorecard", "Complete before every order. No card, no order.", `
<div class="grid2"><div>${field("Date and time (CET)")}${field("Instrument and timeframe")}${field("Setup (1 to 5)")}${field("Signal candle")}</div><div>${field("Bias (4-hour and Daily)")}${field("The level and why it matters")}${field("Window (live or not)")}${field("Scorecard total (/6)")}</div></div>
<h2>The plan</h2>
<div class="grid2"><div>${field("Trigger price")}${field("Stop price")}${field("Stop distance (pips)")}</div><div>${field("Target price")}${field("Reward : risk")}${field("Size and money at risk")}</div></div>
${field("Exit rule if the idea fails before the stop")}
<h2>Six-point scorecard</h2>
<div class="chk"><span class="box"></span><b>Location.</b> The signal sits at a zone, swing high or low, or session extreme. (Mandatory)</div>
<div class="chk"><span class="box"></span><b>Trend.</b> The direction agrees with the 4-hour and Daily structure.</div>
<div class="chk"><span class="box"></span><b>Candle quality.</b> It passes the tests for its type and has fully closed.</div>
<div class="chk"><span class="box"></span><b>Time.</b> It formed in a live window: 09:00-11:00 or 14:30-17:30 CET.</div>
<div class="chk"><span class="box"></span><b>Room.</b> At least 2R to the next zone.</div>
<div class="chk"><span class="box"></span><b>Risk.</b> The stop is beyond the signal wick and size risks 1% or less. (Mandatory)</div>
<table><tr><th>Score</th><th>Grade</th><th>Action</th></tr><tr><td>6</td><td>A</td><td>Full size</td></tr><tr><td>5</td><td>B</td><td>Half size</td></tr><tr><td>4</td><td>C</td><td>Watch only</td></tr><tr><td>3 or less, or a mandatory box unticked</td><td>None</td><td>No trade</td></tr></table>
<h2>After the trade</h2>
${field("Result in R")}${field("Spread and slippage")}${field("Followed the plan? (yes or no)")}${field("One thing I would do differently")}
<p class="small">Screenshot name: date_instrument_timeframe_setup.png</p>`),
  },
  {
    id: "trading-styles",
    html: wrap("Trading styles comparison", "Pick the style that fits your schedule, account and temperament. Then your instruments, then your setups.", `
<table><tr><th>Style</th><th>Holding time</th><th>Timeframes</th><th>Trades</th><th>Typical EUR/USD stop</th></tr>
<tr><td><b>Scalping</b></td><td>Seconds to minutes</td><td>1 to 5 minute</td><td>Many per day</td><td>3-10 pips</td></tr>
<tr><td><b>Day trading</b></td><td>Minutes to hours, flat by day end</td><td>5 minute to 1 hour, 4-hour for context</td><td>1-5 per day</td><td>10-30 pips</td></tr>
<tr><td><b>Swing</b></td><td>Days to weeks</td><td>4-hour to Daily</td><td>A few per week</td><td>40-150 pips</td></tr>
<tr><td><b>Position</b></td><td>Weeks to months</td><td>Daily to Weekly</td><td>A few per month</td><td>150+ pips</td></tr></table>
<h2>Advantages and risks</h2>
<table><tr><th>Style</th><th>Advantages</th><th>Risks</th></tr>
<tr><td><b>Scalping</b></td><td>Many trades, fast feedback. Small stops. No overnight risk.</td><td>Costs dominate. Slippage. Constant attention. Overtrading and stress. Some brokers and prop firms restrict it.</td></tr>
<tr><td><b>Day trading</b></td><td>No overnight gap or financing risk. Clear session structure. Moderate number of trades.</td><td>Must be at the screen in live windows. News and opens. Easy to overtrade.</td></tr>
<tr><td><b>Swing</b></td><td>Fits around a job. Costs negligible against wide stops. Larger R. Less noise.</td><td>Overnight and weekend gaps. Financing. Wide stops mean small size. Fewer trades, slower learning, longer drawdowns.</td></tr>
<tr><td><b>Position</b></td><td>Least time at the screen. Large trends. Low costs.</td><td>Long drawdowns. Macro and gap risk. Capital tied up. Very few trades to test an edge.</td></tr></table>
<h2>Real reward-to-risk of a planned 2R trade after a 1-pip spread</h2>
<table><tr><th>Stop</th><th>5 pips</th><th>10 pips</th><th>20 pips</th><th>100 pips</th></tr><tr><td>Real R</td><td>1.50</td><td>1.73</td><td>1.86</td><td>1.97</td></tr></table>
<p class="small">Formula: (2 x stop - spread) / (stop + spread). This course teaches an intraday approach with short-swing extensions, not scalping.</p>
<h2>My style statement</h2>
${field("CET windows I can trade")}${field("Timeframes: context / setup / trigger")}${field("Maximum trades per day")}${field("Typical stop (pips) and holding time")}${field("Real reward-to-risk at my typical stop")}`),
  },
  {
    id: "risk-reference",
    html: wrap("Risk, sizing and recovery reference", "Size from the stop. Keep risk small. Count costs in R.", `
<h2>Position size</h2>
<div class="rule"><b>Size = money at risk / (stop distance x value per pip or point per lot)</b>. Money at risk = balance x risk %.</div>
<table><tr><th>Market</th><th>Risk</th><th>Stop</th><th>Value per unit</th><th>Size</th></tr>
<tr><td>EUR/USD, 10,000 EUR account</td><td>1% = 100</td><td>20 pips</td><td>about 9.2 EUR per pip per lot</td><td>about 0.54 lots</td></tr>
<tr><td>DAX CFD</td><td>100 EUR</td><td>40 points</td><td>typically 1 EUR per point</td><td>2.5 contracts</td></tr>
<tr><td>Gold (check your contract)</td><td>100 USD</td><td>5 USD</td><td>often 100 USD per 1 USD move per lot</td><td>0.2 lots</td></tr></table>
<p class="small">Always read your broker's contract specification. Margin is not risk.</p>
<div class="grid2"><div>
<h2>Drawdown and recovery</h2>
<table><tr><th>Drawdown</th><th>Gain to recover</th></tr><tr><td>10%</td><td>11.1%</td></tr><tr><td>20%</td><td>25%</td></tr><tr><td>30%</td><td>42.9%</td></tr><tr><td>40%</td><td>66.7%</td></tr><tr><td>50%</td><td>100%</td></tr><tr><td>60%</td><td>150%</td></tr><tr><td>70%</td><td>233%</td></tr><tr><td>80%</td><td>400%</td></tr><tr><td>90%</td><td>900%</td></tr></table>
<p class="small">Recovery = drawdown / (1 - drawdown). Trades to recover is about recovery % / (expectancy x risk %).</p></div><div>
<h2>Drawdown after consecutive losses</h2>
<table><tr><th>Risk</th><th>5 losses</th><th>10</th><th>20</th></tr><tr><td>1%</td><td>4.9%</td><td>9.6%</td><td>18.2%</td></tr><tr><td>2%</td><td>9.6%</td><td>18.3%</td><td>33.2%</td></tr><tr><td>5%</td><td>22.6%</td><td>40.1%</td><td>64.2%</td></tr></table>
<h2>Expectancy per trade</h2>
<table><tr><th>Win rate</th><th>Average win</th><th>Expectancy</th></tr><tr><td>40%</td><td>2R</td><td>+0.20R</td></tr><tr><td>50%</td><td>1.5R</td><td>+0.25R</td></tr><tr><td>35%</td><td>2R</td><td>+0.05R</td></tr><tr><td>30%</td><td>3R</td><td>+0.20R</td></tr><tr><td>60%</td><td>0.8R</td><td>+0.08R</td></tr></table>
<p class="small">(win rate x average win) - (loss rate x average loss)</p></div></div>
<h2>Real reward-to-risk of a planned 2R trade, by spread and stop</h2>
<table><tr><th>Spread</th><th>10-pip stop</th><th>20-pip stop</th><th>40-pip stop</th></tr><tr><td>0.5 pip</td><td>1.86R</td><td>1.93R</td><td>1.96R</td></tr><tr><td>1 pip</td><td>1.73R</td><td>1.86R</td><td>1.93R</td></tr><tr><td>2 pips</td><td>1.50R</td><td>1.73R</td><td>1.86R</td></tr></table>
<h2>My step-down rule</h2>
${field("At ___% below my peak I will")}${field("At ___% below my peak I will")}${field("My daily loss limit / weekly loss limit")}`),
  },
  {
    id: "journal-template",
    landscape: true,
    html: wrap("Trade journal", "Record the same things every time. Results in R, not money.", `
<table><tr><th style="width:9%">Date, time (CET), instrument</th><th style="width:11%">Setup (1-5) and signal candle</th><th style="width:7%">Score /6</th><th style="width:20%">Entry, stop, target, R</th><th style="width:12%">Screenshot name</th><th style="width:8%">Result (R)</th><th>One thing I would do differently</th></tr>${blankRows(7, 13)}</table>
<h2>Friday review: five questions</h2>
<ol><li>How many trades did I take, and how many followed the plan?</li><li>What was my total in R, and the average per trade?</li><li>Which setup, hour and score earned the most R? Which lost the most?</li><li>Which rule did I break, and what did it cost?</li><li>What is one change I will make next week?</li></ol>
<h2>Monthly summary by setup</h2>
<table><tr><th>Setup</th><th>Trades</th><th>Win rate</th><th>Average R</th><th>Total R</th><th>Keep, reduce or drop?</th></tr>${blankRows(6, 5)}</table>`),
  },
  {
    id: "trading-plan",
    html: wrap("My trading plan", "One page. Written when calm, read when not. Change one rule at a time, after review, and date every version.", `
${[
  ["1. Markets", "The two instruments I trade and why."],
  ["2. Hours", "The CET windows I trade and the windows I stand aside."],
  ["3. Method", "The setups I trade (1 to 5) and the ones I skip."],
  ["4. Selection", "Minimum scorecard score. Place is mandatory."],
  ["5. Risk", "Risk per trade, daily loss limit, weekly loss limit, step-down rule."],
  ["6. Stops and targets", "My stop rule per setup and my management method."],
  ["7. News", "My stand-aside windows around releases."],
  ["8. After a loss and after a win", "Pre-committed rules."],
  ["9. Review", "The day and time of my weekly review."],
  ["10. Going live", "Logged signals required, demo period, and the results I need to see first."],
].map(([h, q]) => `<h3>${h}</h3><p class="small" style="margin:0">${q}</p>${lines(2)}`).join("")}
<div class="grid2" style="margin-top:10px"><div>${field("Signed")}</div><div>${field("Date / version")}</div></div>`),
  },
  {
    id: "prop-firm-checklist",
    html: wrap("Prop firm checklist and expected-value worksheet", "Answer every line from the firm's own terms, not reviews or videos. This is not a recommendation of any firm.", `
<table><tr><th style="width:36%">Question</th><th>Answer, and where in their terms</th></tr>
<tr><td>Legal entity, country and registration</td><td></td></tr>
<tr><td>Are evaluation trades simulated or live?</td><td></td></tr>
<tr><td>Are funded-account trades live, copied or simulated?</td><td></td></tr>
<tr><td>Fee, reset fee, any monthly fee. Refund terms.</td><td></td></tr>
<tr><td>Profit target and time limit</td><td></td></tr>
<tr><td>Daily loss limit: balance or equity? What marks the start of the day?</td><td></td></tr>
<tr><td>Total loss limit: static or trailing? From what?</td><td></td></tr>
<tr><td>Minimum trading days</td><td></td></tr>
<tr><td>Consistency rule</td><td></td></tr>
<tr><td>News, weekend and overnight rules</td><td></td></tr>
<tr><td>Prohibited methods (scalping, automation, copying)</td><td></td></tr>
<tr><td>Profit split, first payout, minimum payout, schedule</td><td></td></tr>
<tr><td>Complaints process. Can rules change after purchase?</td><td></td></tr></table>
<h2>Warning signs</h2>
<div class="chk"><span class="box"></span>I cannot find the legal entity, country or registration.</div>
<div class="chk"><span class="box"></span>Key rules are vague (daily loss definition, live or simulated, payouts).</div>
<div class="chk"><span class="box"></span>Rules were changed after purchase, or reset fees apply to breaches I did not understand.</div>
<div class="chk"><span class="box"></span>Marketing leans on payout screenshots, lifestyle imagery or a discount that expires today.</div>
<div class="chk"><span class="box"></span>The only reviews are from people paid to promote the firm.</div>
<div class="chk"><span class="box"></span>No clear refund, reset or complaints process.</div>
<h2>Expected-value worksheet</h2>
<div class="rule"><b>Expected value = (probability of passing x average payouts if funded) - fee</b>. Use your own pass rate from the simulator, then halve it.</div>
<table><tr><th></th><th>Fee</th><th>Pass rate</th><th>Average payouts if funded</th><th>Expected value</th></tr>
<tr class="blank"><td>My estimate</td><td></td><td></td><td></td><td></td></tr>
<tr class="blank"><td>Pass rate halved</td><td></td><td></td><td></td><td></td></tr></table>
<p class="small">If the result is negative when the pass rate is halved, write down what would have to be true for you to proceed. If you have no logged results, your pass rate is a guess.</p>
${lines(3)}`),
  },

  {
    id: "candle-encyclopedia",
    html: wrap("Candlestick reference chart", "Every candle and pattern in the course: its name, the story it tells, where it matters, what to expect and what confirms it. Expectations are tendencies, not forecasts. A pattern matters only at a place, in the right trend and at a live hour.", (["single", "pair", "triple", "context"] as Group[]).map((g) => `<h2>${GROUP_LABEL[g]}</h2><div class="cols2">${CANDLES.filter((c) => c.group === g).map((c) => `<div class="entry"><div>${chart(MINI[c.mini], { mini: true, w: 80, h: 100 })}</div><div><h3>${c.name}<span class="bias ${c.bias}">${BIAS_LABEL[c.bias]}</span></h3>${c.aka ? `<p class="small">${c.aka}</p>` : ""}<p><b>Story.</b> ${c.story}</p><p><b>Looks like.</b> ${c.shows}</p><p><b>Where.</b> ${c.where}</p><p><b>Expect.</b> ${c.expect}</p><p><b>Confirm.</b> ${c.confirm} <span class="small">Lesson ${c.lesson.replace("-", ".")}</span></p></div></div>`).join("")}</div>`).join("") + `<p class="small">Education only, not financial advice.</p>`),
  },
  {
    id: "trading-journal",
    landscape: true,
    html: (() => {
      const logCols = ["#", "Date", "Time CET", "Instrument, TF", "Setup", "Score /6", "Dir", "Entry", "Stop", "Target", "Risk %", "Plan R", "Result R", "Spread, slip", "Plan kept?", "Notes"];
      const widths = [3, 6, 5, 8, 5, 4, 4, 6, 6, 6, 4, 4, 5, 5, 4, 25];
      const logPage = (n: number) => `<section class="page"><h2>Trade log ${n} of 6</h2><table class="tiny"><colgroup>${widths.map((w) => `<col style="width:${w}%">`).join("")}</colgroup><tr>${logCols.map((c) => `<th>${c}</th>`).join("")}</tr>${Array.from({ length: 18 }, (_, i) => `<tr class="blank"><td>${(n - 1) * 18 + i + 1}</td>${"<td></td>".repeat(15)}</tr>`).join("")}</table></section>`;
      const weekly = (n: number) => `<section class="page"><h2>Weekly review ${n}</h2><div class="grid4">${["Week of", "Trades taken", "Plan followed (of those)", "Total R"].map((l) => field(l)).join("")}</div><div class="grid4">${["Average R", "Win rate", "Best setup", "Worst setup"].map((l) => field(l)).join("")}</div><div class="grid2"><div><h3>1. How many trades did I take, and how many followed the plan?</h3>${lines(2)}<h3>2. What was my total in R, and the average per trade?</h3>${lines(2)}<h3>3. Which setup, hour and score earned the most R? Which lost the most?</h3>${lines(3)}</div><div><h3>4. Which rule did I break, and what did it cost?</h3>${lines(3)}<h3>5. What is the one change I will make next week?</h3>${lines(2)}<h3>Lesson of the week</h3>${lines(2)}</div></div></section>`;
      const cells = Array.from({ length: 10 }, (_, r) => `<tr>${Array.from({ length: 10 }, (_, c) => `<td style="height:34px"><b>${r * 10 + c + 1}</b> <span class="box" style="width:9px;height:9px"></span></td>`).join("")}</tr>`).join("");
      const body = `
<section class="page"><div style="padding-top:40px"><h1 style="font-size:34pt">Trading journal</h1><p class="sub" style="font-size:12pt">Naked Chart School</p>${field("Name")}${field("Started")}${field("Instruments")}${field("Trading style and timeframes")}${field("Journal number")}<div class="rule" style="margin-top:20px"><b>How to use it.</b> 1. Write the trade plan before the order. 2. Log every signal you take, and every signal you skip with the reason. 3. Record results in R, not money. 4. Screenshot every signal and name the file date_instrument_timeframe_setup. 5. Review every Friday and change one thing at a time. Education only, not financial advice.</div></div></section>
<section class="page"><h2>My plan on one page</h2><div class="grid2"><div>${["Markets", "Hours (CET)", "Setups I trade", "Minimum score"].map(field).join("")}</div><div>${["Risk per trade", "Daily loss limit", "Weekly loss limit", "Step-down rule"].map(field).join("")}</div></div><h3>My rules after a loss and after a win</h3>${lines(3)}<h3>Conditions for going live (logged signals, demo period, results needed)</h3>${lines(3)}${field("Signed")}${field("Date / version")}</section>
<section class="page"><h2>The 100-signal tracker</h2><p class="small">Tick each signal you log with entry, stop, target and result. Do not trade real money until you have logged 100 and reviewed them.</p><table>${cells}</table><div class="grid4">${["Setup 1 count", "Setup 2 count", "Setup 3 count", "Setup 4 count", "Setup 5 count", "Reached 2R", "Stopped out", "Skipped (no trade)"].map(field).join("")}</div></section>
${[1, 2, 3, 4, 5, 6].map(logPage).join("")}
${[1, 2, 3, 4].map(weekly).join("")}
<section class="page"><h2>Monthly summary</h2>${field("Month")}<div class="grid2"><div><h3>By setup</h3><table><tr><th>Setup</th><th>Trades</th><th>Win %</th><th>Avg R</th><th>Total R</th><th>Keep, reduce, drop</th></tr>${blankRows(6, 5)}</table><h3>By window (CET)</h3><table><tr><th>Window</th><th>Trades</th><th>Avg R</th><th>Total R</th></tr><tr class="blank"><td>09:00 to 11:00</td><td></td><td></td><td></td></tr><tr class="blank"><td>14:30 to 17:30</td><td></td><td></td><td></td></tr><tr class="blank"><td>Other</td><td></td><td></td><td></td></tr></table></div><div><h3>By score</h3><table><tr><th>Score</th><th>Trades</th><th>Avg R</th><th>Total R</th></tr><tr class="blank"><td>6</td><td></td><td></td><td></td></tr><tr class="blank"><td>5</td><td></td><td></td><td></td></tr><tr class="blank"><td>4 or less</td><td></td><td></td><td></td></tr></table><h3>Costs</h3>${field("Average spread (pips)")}${field("Average slippage (pips)")}${field("Cost as a share of an average R")}</div></div></section>
<section class="page"><h2>Cumulative R curve</h2><p class="small">Plot your running total in R after each trade. Mark every drawdown.</p><div class="rgrid"></div>${field("Peak (R)")}${field("Largest drawdown (R)")}</section>
<section class="page"><h2>Drawdown tracker</h2><table><tr><th>Date</th><th>Account peak</th><th>Account now</th><th>Drawdown %</th><th>Recovery needed %</th><th>Action from my step-down rule</th></tr>${blankRows(6, 12)}</table><p class="small">Recovery needed = drawdown / (1 - drawdown). A 20% drawdown needs 25%. A 50% drawdown needs 100%.</p></section>
<section class="page"><h2>Psychology and discipline log</h2><table><tr><th>Date</th><th>State (rested, tired, stressed)</th><th>Rules broken</th><th>What I felt before and after</th><th>What I will do next time</th></tr>${blankRows(5, 12)}</table></section>
<section class="page"><h2>Screenshot index</h2><table><tr><th>File name</th><th>Trade #</th><th>What it shows</th><th>Lesson to revisit</th></tr>${blankRows(4, 16)}</table></section>`;
      return wrap("", "", body).replace("<h1></h1><p class=\"sub\"></p>", "");
    })(),
  },

  {
    id: "broker-checklist",
    html: wrap("Broker checklist, order types and margin card", "Check a broker from primary sources before you deposit. Learn the orders and the margin maths before you trade.", `
<h2>Verification</h2>
<div class="chk"><span class="box"></span>I found the legal entity that will hold my account (footer or terms).</div>
<div class="chk"><span class="box"></span>I looked it up on the regulator's own public register, not a link from the broker's site.</div>
<div class="chk"><span class="box"></span>The licence permissions cover what I will trade.</div>
<div class="chk"><span class="box"></span>I read the order execution policy and the conflicts policy.</div>
<div class="chk"><span class="box"></span>Client money is segregated and an investor compensation scheme applies (limits checked).</div>
<div class="chk"><span class="box"></span>For EU retail CFDs: leverage within ESMA limits, 50% margin close-out, negative balance protection.</div>
<div class="chk"><span class="box"></span>I tested a small withdrawal early.</div>
<h2>Warning signs</h2>
<table><tr><th>Sign</th><th>Seen?</th></tr>
<tr><td>No verifiable regulator, or only an offshore licence</td><td></td></tr>
<tr><td>Promised returns or pressure to deposit more</td><td></td></tr>
<tr><td>Bonuses with withdrawal conditions</td><td></td></tr>
<tr><td>Unsolicited "account manager" or social media contact</td><td></td></tr>
<tr><td>Leverage far above the limits for my region</td><td></td></tr>
<tr><td>Offers to recover lost funds for a fee</td><td></td></tr></table>
<h2>Cost comparison</h2>
<table><tr><th></th><th>Broker A</th><th>Broker B</th></tr>
<tr class="blank"><td>Legal entity and regulator</td><td></td><td></td></tr>
<tr class="blank"><td>Execution model</td><td></td><td></td></tr>
<tr class="blank"><td>EUR/USD spread at 10:00 CET</td><td></td><td></td></tr>
<tr class="blank"><td>Commission per lot</td><td></td><td></td></tr>
<tr class="blank"><td>Overnight financing (long / short)</td><td></td><td></td></tr>
<tr class="blank"><td>Inactivity, conversion and withdrawal fees</td><td></td><td></td></tr>
<tr class="blank"><td>Platforms offered</td><td></td><td></td></tr></table>
<h2>Order types</h2>
<table><tr><th>Order</th><th>What it does</th><th>Use it for</th></tr>
<tr><td>Market</td><td>Trades now at the best price</td><td>Entering at the close of a signal candle</td></tr>
<tr><td>Limit</td><td>Your price or better</td><td>A retest entry, or a target</td></tr>
<tr><td>Stop (entry)</td><td>Becomes a market order past a level</td><td>A break entry beyond a signal candle</td></tr>
<tr><td>Stop loss</td><td>Closes at your stop</td><td>Every trade, attached on entry</td></tr>
<tr><td>Take profit</td><td>Closes at your target</td><td>The target</td></tr>
<tr><td>Stop-limit</td><td>A stop that becomes a limit order</td><td>When you will not accept slippage (it may not fill)</td></tr>
<tr><td>OCO</td><td>One fill cancels the other</td><td>A stop above and below a compression cluster</td></tr></table>
<h2>Margin</h2>
<table><tr><th>Term</th><th>Formula</th></tr>
<tr><td>Used margin</td><td>Notional value / leverage</td></tr>
<tr><td>Equity</td><td>Balance + floating profit or loss</td></tr>
<tr><td>Free margin</td><td>Equity - used margin</td></tr>
<tr><td>Margin level</td><td>Equity / used margin x 100</td></tr></table>
<div class="rule"><b>Remember:</b> margin is the deposit, risk is the loss at the stop. Size from the stop. Attach the stop on entry. Only move a stop toward profit. Put an expiry on every trigger order.</div>`),
  },
  {
    id: "macro-planner",
    landscape: true,
    html: wrap("Weekly macro planner (CET)", "Complete on Sunday in twenty minutes. Its only job is to tell you what to stand aside from and what mood the markets are in.", `
<table class="tiny"><tr><th style="width:9%">Day</th><th style="width:9%">Time (CET)</th><th>Release or event</th><th style="width:10%">Previous</th><th style="width:10%">Forecast</th><th style="width:10%">Actual</th><th style="width:16%">Stand-aside window</th><th style="width:20%">First four 15-minute candles</th></tr>
${["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => `<tr class="blank"><td>${d}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}</table>
<div class="grid2"><div>${field("Mood: risk-on, risk-off or mixed (indices, dollar chart)")}${field("Rate story: who is expected to tighten or ease")}${field("What would change my mind?")}</div><div>${field("Central bank events and press conferences")}${field("Instruments most exposed this week")}${field("Size changes for event risk")}</div></div>
<h2>Friday review</h2>
<table class="tiny"><tr><th>Release</th><th>Forecast vs actual</th><th>Did price move the way the headline implied?</th><th>What I learned</th></tr>${blankRows(4, 4)}</table>
<p class="small">Typical times (CET): US jobs, CPI, retail sales 14:30. ECB 14:15, conference 14:45. Bank of England 13:00. Fed 20:00, conference 20:30. Eurozone flash PMIs and German Ifo about 10:00. UK CPI and jobs about 08:00. US flash PMIs 15:45, ISM 16:00. Check an economic calendar for exact times.</p>`),
  },
];

async function main() {
  const outDir = path.join(root, "private", "pdfs");
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const d of DOCS) {
    await page.setContent(d.html, { waitUntil: "load" });
    await page.pdf({
      path: path.join(outDir, `${d.id}.pdf`),
      format: "A4",
      landscape: !!d.landscape,
      printBackground: true,
      margin: { top: "14mm", bottom: "16mm", left: "14mm", right: "14mm" },
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="font-size:7pt;color:#566170;width:100%;padding:0 14mm;display:flex;justify-content:space-between;font-family:Helvetica,Arial,sans-serif"><span>Naked Chart School. Education only, not financial advice.</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
    });
    console.log("built", d.id);
  }
  await browser.close();
}
main();
