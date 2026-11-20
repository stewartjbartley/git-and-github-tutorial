import type { Lesson } from "../types";
import { p, h, rule, ol, hw, fig, table } from "./h";

export const M9: Record<string, Lesson> = {
  "9-1": {
    goal: "Explain why price reacts at support and resistance, and why the same level can flip its role.",
    blocks: [
      p(`Support is a price area where buyers have stepped in before. Resistance is where sellers have. They hold because people remember. Traders who bought and got hurt at a level want out when price returns to it. Traders who missed the move want in. Large participants who still have an order to fill at the level add to it. Orders cluster, and clusters stop price.`),
      fig("sr", "Price hits a zone three times and fails each time. A wide candle then closes above it. Later the old resistance acts as support.", true),
      h("Why a level can flip"),
      p(`When price breaks a resistance zone, the traders who sold at the zone are now in losing positions. Some close at breakeven when price returns, which is buying pressure. Traders who missed the breakout buy the retest. Both groups put orders at the old zone, and it becomes support. The same logic works in reverse for support that breaks.`),
      h("Levels are places, not signals"),
      p(`A level tells you where to look. It does not tell you what will happen. You still need a candle story at the level, as in Modules 3 to 7. The level is the place, the candle is the story, the time is the window.`),
      rule(`Levels exist because traders remember and orders cluster. A level is a place to look for a signal, never a signal by itself.`),
      hw(20, `Pick any instrument. Find three levels where price reacted at least twice on the 4-hour chart. For each, write who is likely trapped or waiting there, in one sentence.`),
    ],
    qs: [
      { k: "mc", q: "Why do levels hold?", o: ["By chance", "Traders remember them and orders cluster there", "Brokers draw them", "They don't"], ans: 1, ok: "Memory and clustered orders.", bad: "Think about orders." },
      { k: "mc", q: "Why does old resistance often become support after a breakout?", o: ["Luck", "Sellers who were trapped close near breakeven and breakout-missers buy the retest", "It never does", "Rules"], ans: 1, ok: "Both groups buy.", bad: "Trapped traders and latecomers." },
      { k: "mc", q: "Is a level a signal?", o: ["Yes", "No: it is a place to look for a candle story", "Always", "Only daily"], ans: 1, ok: "Place, story, time.", bad: "A signal needs a candle." },
      { k: "click", chart: "sr", ans: 19, q: "Click the breakout candle.", ok: "The wide candle that closes above the zone.", bad: "The wide candle above the shaded zone." },
    ],
  },

  "9-2": {
    goal: "Draw zones, not lines, with a repeatable procedure on every chart.",
    blocks: [
      p(`Price rarely turns at an exact number. Orders spread across a band, so draw a <b>zone</b>: a rectangle from the body extremes to the wick extremes of the candles that turned. On any timeframe a zone about the height of one average candle is usually right.`),
      fig("sr", "The resistance zone spans about 1.0849 to 1.0854. The support zone spans about 1.0836 to 1.0840.", false),
      h("A procedure"),
      ol(
        `Start on the Daily chart. Find the places where price turned at least twice.`,
        `Draw a rectangle that covers the wick tips of those turns and the nearest body closes.`,
        `Check the height against the average candle. A very wide zone is too loose, so tighten it to the most active part.`,
        `Extend it to the right. Label it with the reason: three touches, flip, round number.`,
        `Repeat on the 4-hour chart, but keep only zones that add something new.`,
        `Limit yourself to the four or five zones nearest to price.`,
      ),
      table(["Mistake","Fix"],[
        ["Too many zones","Keep four or five. More is decoration."],
        ["Lines instead of zones","Draw a band."],
        ["Zones far from price","Hide them. They are not relevant now."],
        ["Redrawing after the fact","Mark zones before the session. Do not move them to fit."],
      ]),
      rule(`Zones, not lines. Four or five of them, drawn in advance, with a reason written on each.`),
      hw(25, `On the Daily and 4-hour charts of your main instrument, draw the four or five nearest zones using the procedure. Screenshot them. A week later, check which held.`),
    ],
    qs: [
      { k: "mc", q: "Why draw a zone instead of a line?", o: ["Lines are harder to see", "Price rarely turns at an exact number: orders spread across a band", "Platforms require it", "Zones are always 50 pips"], ans: 1, ok: "Orders cluster in a band.", bad: "A band, not a price." },
      { k: "mc", q: "How many zones should you keep on a chart?", o: ["One", "Four or five nearest to price", "Twenty", "As many as possible"], ans: 1, ok: "More is decoration.", bad: "Four or five." },
      { k: "mc", q: "A zone is far wider than an average candle. What do you do?", o: ["Keep it", "Tighten it to the most active part", "Delete the chart", "Widen it"], ans: 1, ok: "A very wide zone is too loose.", bad: "Tighten it." },
      { k: "mc", q: "When should you mark your zones?", o: ["After the session", "Before the session, in advance", "During the trade", "Never"], ans: 1, ok: "In advance.", bad: "Hindsight." },
    ],
  },

  "9-3": {
    goal: "Trade the flip: a zone that breaks, is retested from the other side, and holds.",
    blocks: [
      p(`A flip is a zone that changes role. Resistance that breaks becomes support, and support that breaks becomes resistance. The retest of the broken zone is among the most reliable moments in price action, because several groups of traders have a reason to act there at once.`),
      fig("sr", "Three tests of 1.0849 to 1.0854 fail. A wide candle closes above. Price returns and the retest candle dips into the zone and closes above it. The zone has flipped.", false),
      table(["Piece","Rule"],[
        ["<b>Zone</b>","Tested at least twice."],
        ["<b>Break</b>","A wide-range candle closes beyond it, with a body of 60% or more of its range."],
        ["<b>Retest</b>","Price returns to the zone within a few candles."],
        ["<b>Hold</b>","The retest candle wicks into the zone and closes back beyond it."],
        ["<b>Entry</b>","At the close of the retest candle or above its high. Stop beyond the retest wick."],
      ]),
      h("How it fails"),
      p(`The flip fails when the retest closes back inside the zone, or when the next candle closes beyond it again. Then the breakout was a trap and the zone is back to its old role. If there is no retest and price runs away, you missed the trade. That is fine.`),
      rule(`Break, retest, hold. If any of the three is missing, there is no flip trade.`),
      hw(25, `Find six flips on the 4-hour chart. For each, mark the break, retest and hold. Which of the six held and which failed? What was different?`),
    ],
    qs: [
      { k: "click", chart: "sr", ans: 23, q: "Click the retest that held.", ok: "The candle that dipped into the zone and closed above it.", bad: "After the breakout, the candle with the long lower wick." },
      { k: "mc", q: "What happens to a zone when a wide candle closes beyond it and the retest holds?", o: ["Nothing", "It flips role", "It disappears", "It doubles"], ans: 1, ok: "Resistance becomes support.", bad: "Roles swap." },
      { k: "mc", q: "The retest closes back inside the old zone. What do you conclude?", o: ["Flip confirmed", "The flip failed: the breakout may have been a trap", "A gap", "Nothing"], ans: 1, ok: "The hold failed.", bad: "It must close beyond." },
      { k: "mc", q: "Price breaks and never retests. What have you got?", o: ["A trade", "A missed trade, which costs nothing", "A loss", "A trap"], ans: 1, ok: "No retest, no trade.", bad: "No entry." },
    ],
  },

  "9-4": {
    goal: "Use round numbers and previous highs and lows as automatic zones.",
    blocks: [
      p(`Two kinds of level need no drawing skill, because everybody sees them. <b>Round numbers</b> such as 1.0900 and 1.1000 in forex, 20,000 in an index or 2,500 in gold attract orders, because people place them there: targets, stops and entries. The <b>00 and 50</b> levels are the strongest. <b>Previous highs and lows</b> (yesterday, last week, last month) are the other kind.`),
      fig("roundNum", "Price rises into 1.0900 and stalls twice. The second touch pokes above and is rejected. Price then breaks, retests the number from above and holds.", false),
      table(["Level","Why it attracts orders"],[
        ["<b>00 levels</b> (1.0900, 1.1000)","Round numbers are natural targets and stops."],
        ["<b>50 levels</b> (1.0850, 1.0950)","The next most popular."],
        ["<b>Yesterday's high and low</b>","Day traders anchor to them. Pools of stops."],
        ["<b>Last week's high and low</b>","Bigger pools, matter most early in the week."],
        ["<b>Monthly open</b>","Longer-term reference."],
      ]),
      p(`Round numbers are weaker as a signal than a candle at a zone, because they are everywhere. Their value is as a <b>confluence</b>: a pin bar at a zone that is also a round number scores better than one at a zone alone.`),
      rule(`Draw the 00 and 50 levels on the Daily chart and yesterday's high and low every morning. Treat them as zones, add a candle story, and count them as confluence.`),
      hw(20, `On the 1-hour EUR/USD mark every 00 and 50 level in the last week's range. How many reacted? Did the 00 levels react more than the 50s?`),
    ],
    qs: [
      { k: "click", chart: "roundNum", ans: 9, q: "Click the candle that was rejected at the round number.", ok: "It poked above 1.0900 and closed back below.", bad: "The candle whose wick goes above the zone and closes below it." },
      { k: "mc", q: "Which of these is a round number level?", o: ["1.0872", "1.0900", "1.0933", "1.0817"], ans: 1, ok: "1.0900.", bad: "A 00 level." },
      { k: "mc", q: "A round number alone is how strong as a signal?", o: ["Very strong", "Weak: it is everywhere, so use it as confluence with a candle at a zone", "Useless", "A certain reversal"], ans: 1, ok: "Confluence.", bad: "It is common." },
      { k: "mc", q: "Which levels matter most early in the week?", o: ["Last week's high and low", "Next week's open", "None", "Intraday noise"], ans: 0, ok: "Before the week has its own range.", bad: "Previous extremes." },
    ],
  },

  "9-5": {
    goal: "Score the quality of any zone with five simple questions.",
    blocks: [
      p(`Not all zones are equal. Scoring each one before you trade it stops you from treating a weak zone like a strong one. Use five questions, one point each.`),
      table(["Question","One point if"],[
        ["<b>Reaction</b>","Price made a clear, fast move away from it last time (several candles or more)."],
        ["<b>Touches</b>","Two or three touches, not more than four."],
        ["<b>Timeframe</b>","It shows up on the 4-hour or Daily chart."],
        ["<b>Freshness</b>","The last touch was recent enough to still be in view, not months ago."],
        ["<b>Confluence</b>","It lines up with a round number, a previous high or low, a trendline or a flip."],
      ]),
      table(["Score","Quality","How to use it"],[
        ["5","Excellent","Full-size setups at this zone."],
        ["3 to 4","Good","Normal setups."],
        ["0 to 2","Weak","Skip, or use only with half size and a strong candle story."],
      ]),
      p(`Remember that a level weakens each time it is tested, because each test uses up orders. A level touched five times is very obvious and very likely to break. That is why the touches question stops at four.`),
      rule(`Score the zone before you trade it. A strong zone with a poor candle is a skip, and a strong candle on a weak zone is a skip too.`),
      hw(25, `Score every zone on your Daily and 4-hour charts. Then check the zones that scored 4 or 5 against those that scored 2 or less. Which reacted more?`),
    ],
    qs: [
      { k: "mc", q: "A zone has two touches, shows on the Daily chart, lines up with a round number, and price left it fast last time. Last touched two weeks ago. Score?", o: ["2", "3", "5", "0"], ans: 2, ok: "Reaction, touches, timeframe, freshness and confluence each score.", bad: "Check each of the five questions." },
      { k: "mc", q: "Why does the touches question stop at four?", o: ["Convention", "More touches mean the resting orders are used up and the level is likely to break", "Four is lucky", "It does not"], ans: 1, ok: "Each test consumes orders.", bad: "A level does not get stronger by being hit." },
      { k: "mc", q: "A zone scores 1. What do you do?", o: ["Trade it at full size", "Skip it, or use half size with a strong candle story", "Double it", "Move it"], ans: 1, ok: "Weak.", bad: "Weak zones are skipped." },
      { k: "mc", q: "A strong zone has a poor candle story. What do you do?", o: ["Trade it", "Skip it: place, story and time all matter", "Double it", "Remove the stop"], ans: 1, ok: "All three.", bad: "Place and story." },
    ],
  },

  "9-6": {
    goal: "Match each candle story to the kind of zone where it works best.",
    blocks: [
      p(`You now have candles, structure and zones. This lesson puts them together. The question is: which candle at which zone means what?`),
      table(["At a ...","A ... means","Setup"],[
        ["<b>Support zone after a fall</b>","Hammer, dragonfly doji, bullish engulfing, morning star, piercing line","Setup 1 or 5 (buy)"],
        ["<b>Resistance zone after a rise</b>","Shooting star, gravestone doji, bearish engulfing, evening star, dark cloud","Setup 1 or 5 (sell)"],
        ["<b>Equal highs or lows, or a previous extreme</b>","A sweep candle closing back inside","Setup 2"],
        ["<b>A broken zone being retested</b>","A pin bar or engulfing that holds","Setup 3"],
        ["<b>A zone with compression beside it</b>","An inside bar, a doji cluster, then a break","Setup 4"],
        ["<b>A pullback to a zone in a trend</b>","A pin bar or engulfing in the trend's direction","Setup 1 or 5"],
      ]),
      fig("hammer", "A hammer at an old low: the candle for a support zone after a fall.", true),
      fig("dojiRev", "A gravestone doji at resistance: the candle for a resistance zone after a rise.", true),
      p(`The same candle in the wrong place scores nothing. A hammer at the top of a rally is a hanging man, and a gravestone at support is a failed rejection. Look at the zone first, and ask which candles it could produce.`),
      rule(`Zone first, candle second. List which candles would be meaningful at the zone before price arrives.`),
      hw(30, `For three zones near price, write down the two candles you would trade if they appeared and the two that would make you skip. Check them over the next week.`),
    ],
    qs: [
      { k: "mc", q: "A hammer appears at a resistance zone after a rise. What is it?", o: ["A strong buy", "A hanging-man shape at the wrong place: no signal", "A sweep", "A gap"], ans: 1, ok: "Wrong place, no signal.", bad: "A hammer needs support." },
      { k: "mc", q: "Which candle suits a support zone after a fall?", o: ["Shooting star", "Hammer", "Dark cloud cover", "Evening star"], ans: 1, ok: "A buy-side rejection.", bad: "Lower prices rejected." },
      { k: "mc", q: "Which setup fits a sweep of the previous day's high?", o: ["Setup 1", "Setup 2 (sweep and reclaim)", "Setup 3", "Setup 4"], ans: 1, ok: "Sweep and reclaim.", bad: "A sweep with a close back inside." },
      { k: "mc", q: "What do you ask first?", o: ["Which candle is on the chart", "Which candles would be meaningful at this zone before price arrives", "What the news is", "Which colour"], ans: 1, ok: "Zone first.", bad: "Place before story." },
    ],
  },

  "9-7": {
    exam: true,
    goal: "Build a weekly zone-mapping routine, and complete the module test.",
    blocks: [
      p(`A zone-mapping routine keeps your charts clean and your levels in advance. Do it on Sunday evening and refresh it each morning.`),
      ol(
        `Clear every drawing from last week.`,
        `Daily chart: mark the last two weeks of swing highs and lows. Draw the four or five nearest zones.`,
        `Score each zone with the five questions.`,
        `Add yesterday's high and low, the 00 and 50 levels near price, and the weekly high and low.`,
        `4-hour chart: add any zone that is new and scores 3 or more.`,
        `Write one line per zone: why it matters and which candle you would trade there.`,
        `Screenshot and save with the date.`,
      ),
      p(`Review the previous week's screenshot against what happened. Zones that held, zones that broke and zones you missed all teach something. After a month you will know which kinds of zone work on your instruments.`),
      hw(20, `Run the routine on Sunday for two instruments. On the next Sunday compare your screenshot with the week's chart.`),
    ],
    qs: [
      { k: "click", chart: "sr", ans: 23, ref: "9-3", q: "Click the retest that held.", ok: "The candle that dipped into the zone and closed above it.", bad: "The long-wicked candle after the breakout." },
      { k: "click", chart: "roundNum", ans: 14, ref: "9-4", q: "Click the retest of the round number that held.", ok: "It dipped to 1.0899 and closed at 1.0902.", bad: "After the breakout, the candle with a lower wick into the zone." },
      { k: "mc", ref: "9-1", q: "Why do levels hold?", o: ["By chance", "Traders remember them and orders cluster", "Brokers", "They don't"], ans: 1, ok: "Memory and orders.", bad: "Think about orders." },
      { k: "mc", ref: "9-2", q: "How many zones do you keep on a chart?", o: ["One", "Four or five nearest to price", "Twenty", "None"], ans: 1, ok: "Four or five.", bad: "More is decoration." },
      { k: "mc", ref: "9-3", q: "Price breaks and never retests. What have you got?", o: ["A trade", "A missed trade, which costs nothing", "A loss", "A trap"], ans: 1, ok: "No retest, no trade.", bad: "No entry." },
      { k: "mc", ref: "9-4", q: "A round number alone is...", o: ["A sure reversal", "A weak signal on its own, best used as confluence", "Useless", "A trend"], ans: 1, ok: "Confluence.", bad: "It is common." },
      { k: "mc", ref: "9-5", q: "How many touches does the quality score reward?", o: ["Two or three, not more than four", "As many as possible", "One", "Ten"], ans: 0, ok: "More touches use up orders.", bad: "Stops at four." },
      { k: "mc", ref: "9-6", q: "What do you ask first when price approaches a zone?", o: ["Which candle is on the chart now", "Which candles would be meaningful here", "The colour", "The news"], ans: 1, ok: "Zone first.", bad: "Place before story." },
    ],
  },
};
