import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, fig, table, gallery } from "./h";

export const M6: Record<string, Lesson> = {
  "6-1": {
    goal: "Spot a wide-range candle by measuring it against its neighbours, and say why it appeared.",
    blocks: [
      p(`A <b>wide-range candle</b> is one whose range is 1.5 times or more the average range of the last ten candles. You met the measure in Module 2. This module is about what to do with it. A wide-range candle is the market raising its voice: something unusual is happening, and your job is to find out what.`),
      gallery([["wideRange", "Wide-range candle", "A quiet run, then a candle far larger than the ones around it."]]),
      h("Why a wide-range candle appears"),
      table(["Cause","What it looks like","What it means"],[
        ["<b>Out of compression</b>","Follows a run of small candles","Stored energy released. The most useful kind."],
        ["<b>At a level</b>","Breaks or rejects a zone","A real decision at a place."],
        ["<b>At news</b>","Lands at 14:30 or another release","Noise. Do not trade the candle itself."],
        ["<b>At the end of a trend</b>","Follows an accelerating run","May be a climax. Check for a wick."],
        ["<b>At an open</b>","The first candle of London or the US session","A burst. Wait for the close and the next candle."],
      ]),
      fig("dojiCluster", "Four quiet candles, then a wide-range candle that breaks the compression. The cause is clear: stored energy.", true),
      h("What to do"),
      ol(
        `Measure it: its range divided by the average of the last ten.`,
        `Name the cause from the table. If it is news, stop here.`,
        `Mark its midpoint. The next lessons use it.`,
        `Do not enter on the candle. Wait for the close and the next candle.`,
      ),
      rule(`A wide-range candle is a prompt to investigate, not a signal. Measure it, name its cause, mark its midpoint and wait.`),
      hw(25, `On the 1-hour EUR/USD find the ten widest candles of the last month. For each, name the cause from the table, using the time and the chart. How many were at news or an open, and how many followed compression?`),
    ],
    qs: [
      { k: "mc", q: "The last ten candles averaged 8 pips. A new candle has a 14-pip range. Is it wide-range?", o: ["No, it is under 20 pips", "Yes, 14 / 8 is 1.75, above 1.5", "Only on a Monday", "It depends on colour"], ans: 1, ok: "1.75 times the average.", bad: "Divide the range by the average of the last ten." },
      { k: "mc", q: "A wide-range candle appears at 14:30 CET on a US data day. What is it most likely?", o: ["A clean breakout signal", "A news candle: noise, not a signal", "A doji", "A sweep"], ans: 1, ok: "Release candles are noise.", bad: "Think about the time." },
      { k: "click", chart: "dojiCluster", ans: 6, q: "Click the wide-range candle.", ok: "The candle that breaks out of the quiet cluster.", bad: "The first big candle after the small ones." },
      { k: "mc", q: "What should you do on the wide-range candle itself?", o: ["Enter at once", "Measure it, name its cause, mark its midpoint, and wait for the close and the next candle", "Double your size", "Ignore it"], ans: 1, ok: "Investigate first.", bad: "It is a prompt, not a signal." },
    ],
  },

  "6-2": {
    goal: "Read marubozu candles as strength, and tell steady strength from a climax.",
    blocks: [
      p(`A <b>marubozu</b> is the extreme wide-range candle: a body of 90% or more of the range, with almost no wicks. A bullish marubozu opens at the low and closes at the high, so buyers were in control every moment of the period. A bearish one is the mirror. No wick means no rejection: nobody pushed back.`),
      gallery([["bullMaru", "Bullish marubozu", "Opened at the low and closed at the high."], ["bearMaru", "Bearish marubozu", "Opened at the high and closed at the low."]]),
      table(["Where it appears","Reading"],[
        ["Out of compression or through a zone","Genuine strength. The most reliable context."],
        ["In the middle of a clean trend","A normal impulse candle."],
        ["After a long, accelerating run","Possible climax. Look at the next candle for a wick or a reversal."],
        ["At news","Noise. Wait."],
      ]),
      p(`Marubozu candles are also called <b>opening</b> and <b>closing</b> marubozus when only one wick is missing, but the course treats them all the same: measure the body and the wicks.`),
      h("What follows"),
      p(`The candle itself never tells you what comes next. The test is the following candle. If it holds above the midpoint of a bullish marubozu's body, buyers are still in charge. If it closes back through the midpoint, the move has failed. The next lesson turns this into a rule.`),
      rule(`A marubozu is strength, but strength can be the end of a move. Context decides: out of compression is real, after a long acceleration is suspect.`),
      hw(20, `Find ten marubozu candles on the 4-hour chart. For each, note whether it came out of compression, in a trend or after a long run, and what the next candle did.`),
    ],
    qs: [
      { k: "mc", mini: "bullMaru", q: "What is this candle?", o: ["Hammer", "Bullish marubozu", "Spinning top", "Doji"], ans: 1, ok: "A body that is nearly the entire range.", bad: "No wicks, large body." },
      { k: "mc", q: "A marubozu appears after a long accelerating rally. What do you suspect?", o: ["Certain continuation", "A possible climax, so watch the next candle", "A gap", "Nothing"], ans: 1, ok: "Strength can mark the end.", bad: "Context matters." },
      { k: "mc", q: "What does no wick on a marubozu tell you?", o: ["Nobody pushed back during the period", "The candle is small", "A level is nearby", "It is a news candle"], ans: 0, ok: "No wick means no rejection.", bad: "Wicks record rejection." },
      { k: "mc", q: "How do you decide whether a bullish marubozu has follow-through?", o: ["Its colour", "The next candle holds above half of its body", "Its size", "The time of day"], ans: 1, ok: "The midpoint test.", bad: "The next candle decides." },
    ],
  },

  "6-3": {
    goal: "Apply the midpoint test: say whether a momentum candle has follow-through or has failed.",
    blocks: [
      p(`A momentum candle shows strength for one period. Follow-through shows it was real. The test is simple: take the body of the momentum candle, find its <b>midpoint</b>, and watch the next one or two candles. If they hold on the strong side of that midpoint, the move has follow-through. If a candle closes back through it, the move has failed.`),
      fig("trueBreak", "The breakout candle spans 1.0839 to 1.0847, so its midpoint is 1.0843. The next two candles dip to 1.0845 and hold above it. Follow-through.", false),
      table(["Result","Reading","What to do"],[
        ["Next candles hold above the midpoint","Follow-through. Buyers are still in charge.","Look for the pullback entry in lesson 6.6."],
        ["Next candle closes inside the body but above the midpoint","Hesitation. Not failed, not proven.","Wait one more candle."],
        ["Next candle closes below the midpoint","The move has failed. It may be a trap.","Do not enter. Consider the opposite if there is a level."],
      ]),
      p(`Why the midpoint? Because it is the price at which half of the candle's gain has been given back. A market that returns half of a decisive move in one candle has shown that sellers are willing to fight, and a decisive move should not need to be defended so quickly.`),
      p(`The test works on bearish momentum candles in reverse: the next candles must hold below the midpoint of the body.`),
      rule(`Hold the midpoint and the move is real. Close back through it and it has failed.`),
      hw(25, `Find eight breakout candles on the 1-hour chart. Mark each midpoint and score the next two candles as hold, hesitate or fail. What did price do afterwards in each group?`),
    ],
    qs: [
      { k: "click", chart: "trueBreak", ans: 11, q: "Click the momentum candle whose midpoint you would mark.", ok: "The wide candle closing at 1.0847, with a midpoint at 1.0843.", bad: "The wide candle that breaks above the dashed line." },
      { k: "mc", q: "A bullish momentum candle spans 1.0839 to 1.0847. What is its midpoint?", o: ["1.0841", "1.0843", "1.0845", "1.0847"], ans: 1, ok: "(1.0839 + 1.0847) / 2 = 1.0843.", bad: "Add open and close and halve." },
      { k: "mc", q: "The next candle closes below the midpoint of the bullish momentum candle. What does that mean?", o: ["Follow-through", "The move has failed", "A pause", "A doji"], ans: 1, ok: "Half the gain was given back at once.", bad: "A close back through the midpoint is a failure." },
      { k: "mc", q: "Why is the midpoint a sensible line?", o: ["It is arbitrary", "It marks where half of the candle's gain has been given back", "It is a round number", "Brokers use it"], ans: 1, ok: "A decisive move should not need defending that quickly.", bad: "Think about half of the gain." },
    ],
  },

  "6-4": {
    goal: "Recognise acceleration and exhaustion: growing bodies, a climax wick and the answer.",
    blocks: [
      p(`Trends that end on a climax have a pattern. The candles <b>keep growing</b>: each body is larger than the last as late buyers rush in. Then the biggest candle appears, followed by a candle with a very long wick, then a strong candle the other way. The long wick is where the last buyers were sold into.`),
      fig("climax", "Each body is larger than the last. The final push is the biggest of all, the next candle spikes 9 pips above its close and gets rejected, and sellers answer with a strong candle.", false),
      table(["Stage","What you see","What it means"],[
        ["<b>Acceleration</b>","Bodies grow candle by candle","Strength, and late participants arriving."],
        ["<b>The climax</b>","The biggest body of the run","Everyone who wants in is in."],
        ["<b>The wick</b>","A long wick at the extreme","The last buyers were sold into."],
        ["<b>The answer</b>","A strong candle the other way","Sellers have taken over, at least for now."],
      ]),
      p(`Exhaustion is a <b>sequence</b>, not a candle. A long wick alone, with no acceleration before it, is only a wick. The sequence needs growth, a climax and an answer.`),
      h("How to trade it"),
      p(`The cleanest entry is the break of the climax-wick candle's low (for a high), with the stop above the wick. Targets are a retracement of the run: halfway back, or the base. Because the stop is above a long wick, risk is large. The setup passes only if there is room for 2R.`),
      warn(`Do not call a top in a strong trend because the candles are large. Large candles in a strong trend are normal. You need the wick and the answer.`),
      rule(`Acceleration, climax, wick, answer. Without all four it is a strong trend, not an exhaustion.`),
      hw(25, `Find five possible climaxes on the 4-hour chart. Check each against the four stages. How many had all four, and how did price behave after the ones that did?`),
    ],
    qs: [
      { k: "click", chart: "climax", ans: 7, q: "Click the exhaustion wick.", ok: "A 9-pip upper wick right after the biggest body.", bad: "The candle with the very long upper wick after the biggest bullish candle." },
      { k: "mc", q: "A long upper wick appears with no growth in candle bodies before it. Is it a climax?", o: ["Yes", "No: acceleration, climax, wick and answer are all needed", "Only on daily", "Always"], ans: 1, ok: "A wick alone is only a wick.", bad: "It is a sequence." },
      { k: "mc", q: "Where does the stop go on a short from a climax wick?", o: ["Above the wick tip", "At the body", "At the entry", "Below the low"], ans: 0, ok: "Beyond the rejected high.", bad: "Where the story fails." },
      { k: "mc", q: "Large candles in a strong trend are...", o: ["Always climaxes", "Normal: you need the wick and the answer to call exhaustion", "A sell signal", "News"], ans: 1, ok: "Do not call tops on size alone.", bad: "Need the full sequence." },
    ],
  },

  "6-5": {
    goal: "Spot a momentum trap: a wide breakout candle that is undone by the next candle, and decide what to do.",
    blocks: [
      p(`A <b>momentum trap</b> is a wide-range candle that breaks a level, draws in breakout traders, and is reversed at once. It looks like strength and it ends in a fall. The test from lesson 6.3 catches it: the next candle closes back through the midpoint of the breakout body.`),
      fig("momTrap", "A wide candle closes at 1.0847, above resistance at 1.0840. The next candle closes at 1.0836, below the midpoint at 1.0843 and below the breakout candle's open. The breakout failed.", false),
      table(["Sign","What it tells you"],[
        ["The next candle closes below the midpoint","The breakout was not defended."],
        ["The next candle closes back below the level","The break is a false one: a sweep with a wide body."],
        ["Long upper wick on the breakout candle","The strength was met by sellers."],
        ["It breaks against a strong higher-timeframe trend","The bigger trend wins."],
      ]),
      h("What to do"),
      p(`If you were long, exit when the candle closes below the midpoint, before the stop if possible. If you were not in, there is nothing to do, and you have avoided the trap by waiting. If the level is clear, the same candle is a <b>sweep with a wide body</b>, and the sweep trade from Module 5 applies: the traders who bought the breakout are trapped, and their stops are fuel.`),
      rule(`A breakout that does not hold its midpoint is a trap. Do not buy it, and consider the sweep trade the other way.`),
      hw(25, `Find five breakouts that failed on the 1-hour chart. Check how many failed the midpoint test on the very next candle. What was the higher-timeframe trend in each case?`),
    ],
    qs: [
      { k: "click", chart: "momTrap", ans: 12, q: "Click the candle that shows the breakout has failed.", ok: "It closes at 1.0836, below the midpoint at 1.0843.", bad: "The bearish candle right after the wide breakout candle." },
      { k: "mc", q: "You are long and the next candle closes below the breakout candle's midpoint. What do you do?", o: ["Hold, the stop will decide", "Exit: the breakout has failed", "Add", "Widen the stop"], ans: 1, ok: "The midpoint test failed.", bad: "Exit on the close." },
      { k: "mc", q: "A failed breakout at a clear level is closely related to...", o: ["A doji", "A sweep with a wide body", "A gap", "A news candle"], ans: 1, ok: "Trapped breakout buyers.", bad: "Think about Module 5." },
      { k: "mc", q: "You did not enter the breakout and it fails. What have you got?", o: ["A missed trade", "A trap avoided", "A loss", "A sweep trade you must take"], ans: 1, ok: "Waiting paid.", bad: "You are not exposed." },
    ],
  },

  "6-6": {
    exam: true,
    goal: "Enter momentum with a pullback, recognise the three-methods patterns, and complete the module test.",
    blocks: [
      p(`Never chase a momentum candle. Wait for a small <b>pullback candle</b> that holds the midpoint, then enter on its break. You get a tighter stop and proof that the move is real.`),
      fig("momEntry", "A wide breakout candle, a small pullback candle that holds above half of its body, and a buy stop above it. Entry 1.0853, stop 1.0844 under the pullback, target 1.0871. Risk 9, reward 18, so 2R. Price reaches the target four candles later.", false),
      table(["Piece","Rule"],[
        ["<b>Signal</b>","A wide-range candle through a level, with follow-through so far."],
        ["<b>Pullback</b>","One to three small candles that hold above the midpoint."],
        ["<b>Trigger</b>","A buy stop just above the pullback candle's high."],
        ["<b>Stop</b>","Just below the pullback's low."],
        ["<b>Target</b>","The next zone or 2R."],
        ["<b>Skip if</b>","The pullback closes below the midpoint. The pullback candles are large. There is no room to the next zone."],
      ]),
      h("Rising and falling three methods"),
      p(`Traditional candle books describe the same idea as a pattern. <b>Rising three methods</b> is a long bullish candle, three small candles inside its range, and then another long bullish candle closing above its high. <b>Falling three methods</b> is the mirror. They are the pullback entry drawn as a picture, and the same filters apply.`),
      gallery([["rise3", "Rising three methods", "A pause inside an up trend, then continuation."], ["fall3", "Falling three methods", "A pause inside a down trend, then continuation."]]),
      rule(`Wait for the first small candle that holds the midpoint, and enter on its break. If there is no pullback, there is no trade.`),
      hw(25, `Find eight breakouts with a clean pullback and write the entry, stop and target before checking the result. Score each in R, including those that did not trigger.`),
    ],
    qs: [
      { k: "click", chart: "momEntry", ans: 13, ref: "6-6", q: "Click the pullback candle that holds the midpoint.", ok: "A small candle above half of the breakout body.", bad: "The small candle after the wide one." },
      { k: "click", chart: "climax", ans: 7, ref: "6-4", q: "Click the exhaustion wick.", ok: "The long upper wick after the biggest body.", bad: "The long wick on top of the accelerating run." },
      { k: "click", chart: "momTrap", ans: 12, ref: "6-5", q: "Click the candle that shows the breakout failed.", ok: "It closes below the midpoint.", bad: "The bearish candle after the wide one." },
      { k: "mc", ref: "6-1", q: "The last ten candles averaged 10 pips. A new candle has a range of 16 pips. What is it?", o: ["Quiet", "Normal", "Wide-range", "A doji"], ans: 2, ok: "1.6 times the average.", bad: "Divide by the average." },
      { k: "mc", ref: "6-2", q: "A marubozu appears after a long, accelerating run. What do you suspect?", o: ["Certain continuation", "A possible climax", "A gap", "Nothing"], ans: 1, ok: "Strength can mark the end.", bad: "Context matters." },
      { k: "mc", ref: "6-3", q: "Momentum candle spans 1.0839 to 1.0847. Next candle closes at 1.0841. What happened?", o: ["Follow-through", "The move failed: it closed below the midpoint at 1.0843", "A doji", "Nothing"], ans: 1, ok: "1.0841 is below 1.0843.", bad: "Compare with the midpoint." },
      { k: "mc", ref: "6-6", q: "Entry 1.0853, stop 1.0844, target 1.0871. What is the reward-to-risk?", o: ["1 : 1", "2 : 1", "3 : 1", "1.5 : 1"], ans: 1, ok: "Risk 9, reward 18.", bad: "Reward divided by risk." },
      { k: "mc", ref: "6-5", q: "You did not enter a breakout that then fails. What do you have?", o: ["A loss", "A trap avoided", "A missed trade you must chase", "A sweep"], ans: 1, ok: "Waiting paid.", bad: "You are not exposed." },
    ],
  },
};
