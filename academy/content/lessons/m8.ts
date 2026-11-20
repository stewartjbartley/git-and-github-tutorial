import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, fig, table } from "./h";

export const M8: Record<string, Lesson> = {
  "8-1": {
    goal: "Mark swing highs and swing lows consistently, and tell minor swings from major ones.",
    blocks: [
      p(`Structure is the skeleton of a chart: the sequence of highs and lows that price leaves behind. Everything in this module, trend, range, breaks and pullbacks, is built from <b>swing points</b>. A <b>swing high</b> is a candle whose high is higher than the highs of the candles on either side of it. A <b>swing low</b> is a candle whose low is lower than the lows of the candles on either side.`),
      fig("structure", "Three swing highs and three swing lows in the rally, then lower swings in the fall. Use this chart through the module.", true),
      h("How many candles on each side?"),
      p(`The simplest rule uses one candle on each side, which marks every small turn. A cleaner rule uses two candles on each side: a swing high must be higher than the two candles before and the two after. The more candles you require, the fewer and more important the swings. Choose one rule, write it down, and use it everywhere.`),
      table(["Swing size","How to find it","Used for"],[
        ["<b>Minor</b>","One or two candles each side","Entry timing on the 15-minute chart"],
        ["<b>Intermediate</b>","Two to three candles each side, or a swing that took at least a few candles to form","Stops and the structure of the 1-hour and 4-hour charts"],
        ["<b>Major</b>","The swing highs and lows on the Daily chart","The trend and the big zones"],
      ]),
      p(`A swing needs confirmation. You only know a candle was a swing high after the candles to its right have come in and failed to exceed it. This delay is built into structure, and it is one more reason to read closed candles.`),
      rule(`Pick a swing rule, write it down and use it on every chart. A consistent rule is more useful than a clever one.`),
      hw(25, `On the 4-hour EUR/USD, mark the last eight swing highs and eight swing lows using a two-candles-each-side rule. Then repeat with a one-candle rule and compare. Which is easier to trade from?`),
    ],
    qs: [
      { k: "click", chart: "structure", ans: 15, q: "Click the highest swing high of the rally.", ok: "Candle 16, the third higher high at 1.0841.", bad: "The tallest peak before the fall begins." },
      { k: "mc", q: "A swing high is a candle whose high is...", o: ["The tallest candle on the chart", "Higher than the highs of the candles on both sides of it", "Always at a round number", "Lower than its neighbours"], ans: 1, ok: "Higher than its neighbours.", bad: "Compare with both sides." },
      { k: "mc", q: "Why do you only know a swing high after the fact?", o: ["Brokers delay data", "You need the candles to its right to fail to exceed it", "It is a rule of thumb", "It is not true"], ans: 1, ok: "Confirmation needs later candles.", bad: "Think about the right side." },
      { k: "mc", q: "Which rule gives fewer, more important swings?", o: ["One candle each side", "Three candles each side", "None", "Both give the same"], ans: 1, ok: "More candles each side filters minor turns.", bad: "A stricter rule finds fewer swings." },
    ],
  },

  "8-2": {
    goal: "Read trend and range from swing points alone.",
    blocks: [
      p(`An <b>uptrend</b> is a sequence of higher highs (HH) and higher lows (HL). A <b>downtrend</b> is lower highs (LH) and lower lows (LL). If the swings overlap and neither pattern holds, the market is in a <b>range</b>. That is all a trend is. You do not need a line, a moving average or an indicator.`),
      fig("structure", "Three higher highs and higher lows (green labels), then a lower high, then lower highs and lower lows (red labels).", false),
      table(["Market","Swings","What to do"],[
        ["<b>Uptrend</b>","HH and HL","Look for buys at pullbacks. Do not fight it without a break of structure."],
        ["<b>Downtrend</b>","LH and LL","Look for sells at pullbacks."],
        ["<b>Range</b>","Highs and lows overlap between two levels","Trade the edges (sweeps, rejections) or stand aside. Do not buy the middle."],
      ]),
      h("Trends change in stages"),
      p(`A trend usually ends in a sequence. First the trend fails to make a new high (a lower high). Then it breaks the last higher low (a break of structure, the next lesson). Then it makes lower lows. Trends often pass through a range on the way from up to down. Do not expect a clean flip.`),
      h("What a range tells you"),
      p(`A range has a clear top and bottom. Inside it, price is balanced, and the most useful places are the edges. Mark the high and low of the range and treat them as pools of stops. Breakouts and sweeps of those edges are the setups from Modules 5 and 6.`),
      rule(`Trend is higher highs and higher lows, or lower highs and lower lows. If neither holds, it is a range.`),
      hw(25, `Label the last 20 swings on the Daily chart of three instruments as uptrend, downtrend or range. Which of the three is trending, and for how long?`),
    ],
    qs: [
      { k: "mc", q: "What defines an uptrend?", o: ["A rising moving average", "Higher highs and higher lows", "Green candles", "A round number"], ans: 1, ok: "HH and HL.", bad: "Swing points define trend." },
      { k: "mc", q: "Swings overlap between two levels and neither HH/HL nor LH/LL holds. What is it?", o: ["An uptrend", "A range", "A downtrend", "A gap"], ans: 1, ok: "A range.", bad: "Neither pattern holds." },
      { k: "mc", q: "Where are the most useful places in a range?", o: ["The middle", "The edges", "Nowhere", "The open"], ans: 1, ok: "Edges are pools of stops and decision points.", bad: "The middle is balance." },
      { k: "mc", q: "Do trends flip cleanly from up to down?", o: ["Always", "Usually in stages: a lower high, a break of structure, then lower lows, often via a range", "Never", "Only on Fridays"], ans: 1, ok: "They change in stages.", bad: "Think about the sequence." },
    ],
  },

  "8-3": {
    goal: "Identify a break of structure by its close, and say what it does and does not tell you.",
    blocks: [
      p(`In an uptrend, the last higher low is the line the buyers must hold. A candle that <b>closes</b> below it is a <b>break of structure</b> (BOS). In a downtrend, a close above the last lower high is a BOS the other way. A BOS says the story of the trend has ended and the other side has a chance. It does not say the other side has won.`),
      fig("structure", "Price makes a lower high at 1.0839, then a candle closes at 1.0823, below the last higher low at 1.0825. That is the BOS. The confirmation is the next lower high followed by a new lower low.", false),
      table(["Stage","What it looks like","What to do"],[
        ["1. Warning","A lower high in an uptrend","Stop adding to longs."],
        ["2. Break of structure","A close below the last higher low","The trend is in question. Stop buying dips."],
        ["3. Confirmation","A lower high, then a lower low","A new downtrend may be forming. Look for sell setups."],
      ]),
      warn(`Use closes, not wicks. A wick below a low is often a sweep, and a sweep reverses. A close below it is a decision. This is the same test as in Module 5.`),
      h("Trading the break"),
      p(`The safest use of a BOS is as a filter: it tells you to stop buying pullbacks and to start looking for the other side. The aggressive use is to sell the break, and the entry is a pullback to the broken level, with a stop above it. Because a BOS can be a sweep in disguise, wait for the close and for the next candle.`),
      rule(`A break of structure is a close beyond the last swing that defines the trend. It ends the old story. It does not write the new one.`),
      hw(25, `Find five breaks of structure on the 4-hour chart. For each, note whether a lower high and lower low followed, and whether the break was a close or a wick.`),
    ],
    qs: [
      { k: "click", chart: "structure", ans: 22, q: "Click the candle that breaks structure.", ok: "Candle 23 closes at 1.0823, below the higher low at 1.0825.", bad: "The first candle to close below the dashed line." },
      { k: "mc", q: "What does a break of structure tell you?", o: ["The other side has won", "The old trend's story has ended and the other side has a chance", "Nothing", "Buy more"], ans: 1, ok: "It ends the old story.", bad: "It does not write the new one." },
      { k: "mc", q: "A wick goes below the last higher low and closes above it. Is it a break of structure?", o: ["Yes", "No: it is more likely a sweep", "Only on Monday", "Always"], ans: 1, ok: "Closes decide.", bad: "A wick through with a close back is a sweep." },
      { k: "mc", q: "What is the safest use of a break of structure?", o: ["Sell immediately with a big position", "As a filter: stop buying pullbacks and start looking for the other side", "Ignore it", "Buy the break"], ans: 1, ok: "A filter first.", bad: "It ends the old trend's story." },
    ],
  },

  "8-4": {
    goal: "Judge trend health from the size, overlap and wicks of impulses and pullbacks.",
    blocks: [
      p(`A trend moves in pushes and pauses. The pushes are <b>impulses</b> and the pauses are <b>pullbacks</b>. How each one looks is the best gauge of strength you will find, and it is free.`),
      table(["","Impulse","Pullback"],[
        ["<b>Bodies</b>","Large","Small"],
        ["<b>Wicks</b>","Small","Larger, with rejection"],
        ["<b>Closes</b>","Near the high (in an uptrend)","Mixed"],
        ["<b>Overlap</b>","Little","A lot"],
        ["<b>Depth</b>","","Shallow, and stops above the last higher low"],
      ]),
      fig("trend", "Two strong pushes with small overlapping pullbacks. Then the push shrinks, a long upper wick appears, and the first big bearish candle arrives. Sellers are now producing the impulses.", false),
      h("The three early warnings"),
      ol(
        `<b>Smaller pushes.</b> Each impulse is shorter than the last.`,
        `<b>Bigger pullbacks.</b> The pullbacks get deeper and the candles larger.`,
        `<b>Long wicks at the extreme.</b> Rejection appears at the highs.`,
      ),
      p(`You need two of the three before you act, and the act is usually to stop adding or to take profit, not to reverse. A trend that is weakening can still make a new high. What you are measuring is the energy, not the direction.`),
      h("Depth of a pullback"),
      p(`A shallow pullback that holds the previous breakout area is strong. A pullback that returns past the last higher low breaks structure and is something else. In between, deeper pullbacks are weaker but still possible. Do not use fixed percentages. Read the overlap and the candle size, and let the swing points decide.`),
      rule(`Strong push, weak pullback: healthy. Smaller pushes, bigger pullbacks and long wicks at the extreme: tiring. Two of the three before you act.`),
      hw(25, `On a trending chart find the last three pushes and pullbacks. Write one line per leg: big or small bodies, overlap or not, wicks or not. Was the trend getting stronger or weaker? What happened next?`),
    ],
    qs: [
      { k: "click", chart: "trend", ans: 16, q: "Click the candle that shows rejection at the top of the move.", ok: "A long upper wick after the weaker push.", bad: "The candle with the long upper wick." },
      { k: "mc", q: "Which describes a healthy pullback in an uptrend?", o: ["Large bearish candles with little overlap", "Small overlapping candles with wicks that stop above the last higher low", "A single huge bearish candle", "No wicks falling fast"], ans: 1, ok: "Small, overlapping and shallow.", bad: "Big directional candles mean sellers are in control." },
      { k: "mc", q: "How many of the three early warnings do you want before acting?", o: ["One", "Two", "Three", "None"], ans: 1, ok: "Two of three.", bad: "Two." },
      { k: "mc", q: "A weakening trend can still make a new high. What are you measuring?", o: ["Direction", "Energy", "Time", "Colour"], ans: 1, ok: "Energy, not direction.", bad: "Strength of the push." },
    ],
  },

  "8-5": {
    goal: "Draw trendlines and channels with two touches, trust them at three, and read a break as a candle story.",
    blocks: [
      p(`A <b>trendline</b> joins two swing lows in an uptrend (or two swing highs in a downtrend). A third touch confirms it. It is an extra way to see the same structure, and it is useful because many traders draw it, so it becomes a place where orders gather.`),
      fig("trendline", "A rising line through three higher lows. The third touch confirms it. A candle then closes beneath it.", false),
      table(["Rule","Why"],[
        ["Two touches to draw, three to trust","Two points always make a line. A third shows the market respects it."],
        ["Use swing lows (up) or swing highs (down), by wick or by body but consistently","A consistent rule is more useful than a perfect one."],
        ["Redraw a very steep line flatter as price develops","A steep line breaks easily and means little when it does."],
        ["A break needs a close beyond the line","A wick through is often a sweep."],
        ["Trendline break plus break of structure is stronger than either alone","Two pieces of evidence."],
      ]),
      h("Channels"),
      p(`A <b>channel</b> adds a parallel line through the highs. Price moving between the lines is a trend in a lane. The edges are places: buy near the lower line in an uptrend, take profit near the upper. A break of the channel's far line can mark acceleration, and a break of the near line can mark the end.`),
      h("A break as a candle story"),
      p(`A close beyond the line is a signal about the trend. The candle that does it is read like any other: where did it close, how big was the body, did a wick sweep the line first? A sweep of the line that closes back above it is a rejection and a buy. A decisive close below with follow-through is a break.`),
      rule(`Draw with two touches, trust at three, break on a close. A trendline is one piece of evidence, not a signal.`),
      hw(25, `Find five trendlines with three touches on the 4-hour chart. Note what happened at the fourth touch and whether any break was a close or a wick.`),
    ],
    qs: [
      { k: "click", chart: "trendline", ans: 17, q: "Click the candle that closes below the trendline.", ok: "Candle 18 closes at 1.0830, below the line at about 1.0831.", bad: "The first candle to close under the rising line." },
      { k: "mc", q: "How many touches confirm a trendline?", o: ["One", "Two", "Three", "Ten"], ans: 2, ok: "Two draw it, three confirm it.", bad: "A third touch confirms." },
      { k: "mc", q: "A wick pokes below the trendline and closes above it. What is it?", o: ["A break", "More likely a sweep and a rejection", "A gap", "A doji"], ans: 1, ok: "Closes decide.", bad: "A close back above it is rejection." },
      { k: "mc", q: "A trendline break plus a break of structure is...", o: ["Weaker than either alone", "Stronger than either alone", "Unrelated", "Meaningless"], ans: 1, ok: "Two pieces of evidence.", bad: "Combine evidence." },
    ],
  },

  "8-6": {
    goal: "Align three timeframes and decide when to trade, when to halve size and when to stand aside.",
    blocks: [
      p(`Each timeframe has its own structure, and they do not always agree. The skill is reading all three and deciding what the disagreement means. You already know the rule: the larger timeframe wins. This lesson turns it into a decision.`),
      { t: "tf", cap: "The same market at three timeframes. The hourly chart shows many small swings. The 4-hour chart shows a clearer sequence. The daily chart shows the main trend. Drawn from a generated series for teaching." },
      table(["Daily","4-hour","1-hour trigger","Decision"],[
        ["Up","Up","With the trend (buy)","Full size: all three agree."],
        ["Up","Pullback (down)","A buy signal at the end of the pullback","Normal size: pullback in a trend."],
        ["Up","Down, broken structure","A sell signal","Half size or skip: you are against the Daily."],
        ["Range","Range","At an edge","Trade the edge with small size."],
        ["Down","Down","With the trend (sell)","Full size."],
        ["Up","Down","Buy at the 4-hour low","Wait: the 4-hour has not turned."],
      ]),
      p(`The table is a guide for the size of the risk, not for whether a setup exists. A setup still needs a place, a candle story and a live window. Alignment adds confidence and raises or lowers size.`),
      h("A routine"),
      ol(
        `Daily: draw the swing structure and decide up, down or range.`,
        `4-hour: do the same. Note any break of structure.`,
        `Compare. Write one line: aligned, pullback, conflict.`,
        `Take your trigger from the 1-hour or 15-minute only after the line is written.`,
      ),
      rule(`Write the alignment before you look for the trigger. Disagreement is information, not a problem.`),
      hw(25, `For three instruments, fill in the Daily and 4-hour structure and write the alignment line. Then find the 1-hour setups. Does your table change what you would trade?`),
    ],
    qs: [
      { k: "mc", q: "Daily up, 4-hour up, and a 1-hour buy trigger. What size?", o: ["Skip", "Full size: all three agree", "Double", "Half"], ans: 1, ok: "All three agree.", bad: "Alignment supports full size." },
      { k: "mc", q: "Daily up, 4-hour has broken structure down, and you see a 1-hour sell signal. What do you do?", o: ["Full size", "Half size or skip: you are against the Daily", "Double", "Ignore"], ans: 1, ok: "Against the bigger trend.", bad: "The Daily carries more weight." },
      { k: "mc", q: "Does alignment create a setup?", o: ["Yes", "No: a setup still needs a place, a story and a live window", "Only on the Daily", "Always"], ans: 1, ok: "Alignment adjusts size and confidence.", bad: "It is not a trigger." },
      { k: "mc", q: "In what order should you read the timeframes?", o: ["Smallest first", "Largest first, smallest last", "Random", "Middle first"], ans: 1, ok: "Top down.", bad: "Context first." },
    ],
  },

  "8-7": {
    exam: true,
    goal: "Mark up a week of real charts using only structure, and complete the module test.",
    blocks: [
      p(`This lab is the habit that makes structure automatic. It takes 20 minutes with a pen or your platform's drawing tools, and you should repeat it every Sunday.`),
      ol(
        `Open the Daily chart of one instrument. Mark swing highs and lows with your rule. Label up, down or range.`,
        `Open the 4-hour chart. Do the same. Mark the last break of structure if there is one.`,
        `Write the alignment line from lesson 8.6.`,
        `Draw one trendline with three touches if it exists.`,
        `Write two sentences: what has to happen for the trend to continue, and what would end it.`,
      ),
      p(`Do this for two instruments each weekend and file the screenshots in your Signals folder. After a month you will have a record of how structure played out and how often your reading was right.`),
      hw(20, `Complete the lab for two instruments this weekend. Compare it with what happened by the following Friday.`),
    ],
    qs: [
      { k: "click", chart: "structure", ans: 22, ref: "8-3", q: "Click the break of structure.", ok: "The candle that closes below the last higher low.", bad: "The first close under the dashed line." },
      { k: "click", chart: "trendline", ans: 17, ref: "8-5", q: "Click the candle that closes below the trendline.", ok: "The first close under the rising line.", bad: "After the third touch." },
      { k: "click", chart: "trend", ans: 16, ref: "8-4", q: "Click the rejection wick at the top.", ok: "The long upper wick.", bad: "The wick after the weaker push." },
      { k: "mc", ref: "8-1", q: "A swing high is...", o: ["The tallest candle", "A high higher than the highs on both sides", "A round number", "A gap"], ans: 1, ok: "Higher than its neighbours.", bad: "Compare with both sides." },
      { k: "mc", ref: "8-2", q: "What defines a downtrend?", o: ["A falling average", "Lower highs and lower lows", "Red candles", "A level"], ans: 1, ok: "LH and LL.", bad: "Swing points." },
      { k: "mc", ref: "8-3", q: "A wick goes below the last higher low and closes above it. What is it?", o: ["A break of structure", "More likely a sweep", "A gap", "A doji"], ans: 1, ok: "Closes decide.", bad: "A close back above is rejection." },
      { k: "mc", ref: "8-4", q: "How many early warnings do you want before acting on a weakening trend?", o: ["One", "Two of three", "Three", "None"], ans: 1, ok: "Two of three.", bad: "Two." },
      { k: "mc", ref: "8-6", q: "Daily up, 4-hour structure broken down, a 1-hour sell signal. Size?", o: ["Full", "Half or skip", "Double", "Ignore"], ans: 1, ok: "Against the Daily.", bad: "The Daily wins." },
    ],
  },
};
