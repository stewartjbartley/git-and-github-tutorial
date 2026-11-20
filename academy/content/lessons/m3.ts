import type { Lesson } from "../types";
import { p, h, rule, ol, hw, fig, table, gallery, builder } from "./h";

export const M3: Record<string, Lesson> = {
  "3-1": {
    goal: "Tell quiet indecision from contested indecision, and say why indecision is where the next move gets its energy.",
    blocks: [
      p(`Indecision means neither side won the period. In candle terms the body is small, the open and close are close together, and the market finished roughly where it started. That sounds like nothing happened, but there are two very different kinds of nothing, and telling them apart is the first skill in this module.`),
      h("Quiet and contested"),
      table(["Kind","What the candle looks like","What happened","What it tells you"],[
        ["<b>Quiet</b>","Small body, small wicks, small range","Few orders. Nobody bothered to push either way.","Low interest. Often a pause, or the middle of compression."],
        ["<b>Contested</b>","Small body, long wicks on one or both sides","Price was pushed hard and refused. A real fight with no winner.","Information. Look at which wick points at a level."],
      ]),
      p(`Quiet indecision is the market resting. Contested indecision is the market arguing. A doji with 1-pip wicks and a doji with 12-pip wicks have the same body and almost nothing else in common. Always measure the wicks and compare them with the neighbouring candles, as you learned in Module 2.`),
      builder(1),
      p(`Use the builder to make one of each. For a quiet doji, shrink the whole range. For a contested one, keep the open and close together and pull the high and low far away. Watch the name and the reading change.`),
      h("Why indecision matters"),
      p(`A market cannot stay balanced forever. Balance is a build-up. While price sits still, orders accumulate on both sides: stops beyond the highs and lows, pending entries just outside, profit-taking from earlier moves. When one side finally breaks the balance, those accumulated orders release together, which is why a run of indecision is often followed by a burst of range.`),
      fig("dojiCluster", "Four quiet candles under 1.0855. The compression resolves in a wide-range break. The indecision was not the signal. The break from it was.", true),
      rule(`Indecision is not a signal. It is a condition. The signal is how it resolves, and where it happened.`),
      hw(20, `On the 1-hour EUR/USD, find ten candles with a body under 15% of their range. Classify each as quiet or contested using the wicks. Then note what the next two candles did. Do contested dojis resolve differently from quiet ones?`),
    ],
    qs: [
      { k: "mc", q: "Two candles both have a tiny body. One has 1-pip wicks and the other has 12-pip wicks on both sides. What is the difference?", o: ["None, a doji is a doji", "The first is quiet indecision and the second is a contested fight with no winner", "The second is a marubozu", "The first is a hammer"], ans: 1, ok: "The wicks tell you how hard the market was pushed before it settled.", bad: "Look at the wicks, not just the body." },
      { k: "mc", q: "Why is a run of small candles often followed by a burst of range?", o: ["Markets always trend afterwards", "Orders build up on both sides while price rests, and release together when one side breaks the balance", "Small candles predict big candles by law", "Brokers widen spreads"], ans: 1, ok: "Balance is a build-up of orders.", bad: "Think about stops and pending orders accumulating." },
      { k: "click", chart: "dojiCluster", ans: 6, q: "Click the candle that resolves the compression.", ok: "The wide-range candle that breaks out of the quiet cluster.", bad: "The first big candle after the small ones." },
      { k: "mc", mini: "doji", q: "This candle has a small body and long wicks on both sides. What kind of indecision is it?", o: ["Quiet", "Contested", "A marubozu", "A hammer"], ans: 1, ok: "Long wicks both ways mean price was pushed hard in both directions and refused.", bad: "Quiet candles have small wicks." },
    ],
  },

  "3-2": {
    goal: "Name the five indecision candles by their measures and say what story each one tells.",
    blocks: [
      p(`The doji family is five candles, all with a small body, separated by what the wicks do. The measures are the same ones from Module 2. Learn the thresholds and you can name any of them in a second.`),
      gallery([
        ["spin", "Spinning top", "Body up to 30% of the range, wicks on both sides of 25% or more."],
        ["doji", "Long-legged doji", "Body under 10%, both wicks long. The widest fight with no winner."],
        ["dragon", "Dragonfly doji", "Body under 10%, lower wick 60% or more, almost no upper wick."],
        ["grave", "Gravestone doji", "Body under 10%, upper wick 60% or more, almost no lower wick."],
        ["hammer", "Pin-bar cousin", "A hammer has a slightly larger body (over 10%). It is the same story as a dragonfly with more body."],
      ]),
      table(["Candle","Story","Where it matters most"],[
        ["<b>Spinning top</b>","Both sides pushed, neither won, the body is a little larger than a doji.","After a strong run: the run is losing energy."],
        ["<b>Long-legged doji</b>","A violent two-sided fight with a level finish.","At major turning points, and before news. A very high-information candle."],
        ["<b>Dragonfly doji</b>","Sellers drove price down, buyers took it all back to the open.","At support or after a fall: sellers failed."],
        ["<b>Gravestone doji</b>","Buyers drove price up, sellers took it all back to the open.","At resistance or after a rise: buyers failed."],
      ]),
      p(`Notice the dragonfly and the gravestone are mirror images. Both are rejections, so the wick is the story, and each one points at a level. The long-legged doji is the only one that is truly two-sided.`),
      h("The close does not matter as much"),
      p(`For the doji family the close sits almost on the open, so the close location is determined by where the body sits in the range. A dragonfly closes in the top fifth, but that is a consequence of the shape, not a sign of buyers winning the period. Do not read a dragonfly as strongly bullish just because it closed high. The information is in the rejection of lower prices.`),
      rule(`For a doji, read the wicks, not the close. The body is almost zero, so the wicks carry all of the story.`),
      hw(20, `Collect one example of each of the four dojis and the spinning top from your 4-hour charts. Screenshot each, note the level (if any) the long wick pointed at, and write the story in one sentence. Save the set to your Signals folder.`),
    ],
    qs: [
      { k: "mc", mini: "dragon", q: "What is this candle?", o: ["Gravestone doji", "Dragonfly doji", "Hammer-type pin bar", "Spinning top"], ans: 1, ok: "Body under 10%, long lower wick, almost no upper wick.", bad: "The long wick is below." },
      { k: "mc", mini: "grave", q: "At a resistance zone this candle forms. What story does it tell?", o: ["Buyers won, buy more", "Buyers pushed up and sellers took it all back: a rejection of higher prices", "Nothing happened", "Sellers drove price down"], ans: 1, ok: "A gravestone is a rejection of the high, and the zone is what it was rejected from.", bad: "The long wick points up and the close is at the open." },
      { k: "mc", mini: "spin", q: "What is this candle?", o: ["Spinning top", "Long-legged doji", "Marubozu", "Dragonfly"], ans: 0, ok: "A small body of up to 30% with wicks on both sides.", bad: "Check the body ratio and both wicks." },
      { k: "mc", q: "A dragonfly doji closes in the top fifth of its range. Is that evidence buyers won the period?", o: ["Yes, always", "No. The close location comes from the shape. The evidence is the rejection of lower prices", "Only on daily charts", "Only at night"], ans: 1, ok: "The close sits on the open by definition. Read the wick.", bad: "In a doji the close and open are nearly equal." },
    ],
  },

  "3-3": {
    goal: "Recognise a doji that is only a pause in a strong run, and trade the break of it in the direction of the run.",
    blocks: [
      p(`Not every doji is a reversal. In a clean, strong run, a doji is far more often a rest. Traders take profit, new traders hesitate, and for a candle or two the market breathes before continuing. The skill is telling that apart from a doji that marks the end.`),
      fig("dojiCont", "Four strong bullish candles, a doji pause with modest wicks, and then a candle closing above the doji's high. The next candle answered the doji's question.", false),
      h("Four checks that it is only a pause"),
      ol(
        `<b>The run was strong and clean.</b> Large bodies, little overlap, closes near the highs.`,
        `<b>No level is nearby.</b> There is no resistance zone or prior high just above for sellers to defend.`,
        `<b>The doji is not unusual in size.</b> Its range is similar to or smaller than the candles before it. A giant doji at the end of a run is a very different thing.`,
        `<b>The wicks are modest.</b> A long upper wick pointing at nothing is still a warning, but a doji with short wicks inside a run is typical rest.`,
      ),
      p(`If all four are true, the default reading is a pause. Then you trade the answer: place an entry beyond the high of the doji in the direction of the run. If price takes out the high, the pause is over and the trend continues. If it breaks the low instead, you have a different situation and your stop is hit.`),
      h("The plan"),
      table(["Piece","Where","Why"],[
        ["<b>Entry</b>","A stop order just above the doji's high.","You enter only if buyers come back."],
        ["<b>Stop</b>","Just below the doji's low.","If sellers take the low, the pause was a turn."],
        ["<b>Target</b>","The next zone, or at least 2R.","The run suggests room to move."],
      ]),
      p(`Here is a worked example using the chart. The doji's high is about 1.0827 and its low 1.0820. A stop order at 1.0828 with the stop at 1.0819 risks 9 pips. A 2R target is 18 pips above entry, at 1.0846. The chart's next three candles close at 1.0830, 1.0835 and 1.0841, so a 2R target is nearly reached.`),
      rule(`A doji inside a clean run, away from any level, is a pause until proven otherwise. Trade the break of its high, and let the stop sit under its low.`),
      hw(25, `Find five strong runs on the 1-hour EUR/USD or GBP/USD where a doji appeared in the middle. Apply the four checks. Mark each as pause or turn using only what you could see at the time, then check the next three candles. Keep the tally.`),
    ],
    qs: [
      { k: "click", chart: "dojiCont", ans: 4, q: "Click the doji that is only a pause in a strong run.", ok: "A small body with modest wicks in the middle of a clean rally, with no level above.", bad: "Find the small-bodied candle in the middle of the rally." },
      { k: "mc", q: "In a pause trade the stop sits...", o: ["Above the doji high", "Just below the doji's low", "At the entry", "At the next round number"], ans: 1, ok: "If the doji's low is taken the pause was a turn.", bad: "The idea is wrong if price breaks the other side of the doji." },
      { k: "mc", q: "Which of these makes a doji more likely to be a reversal than a pause?", o: ["It sits just below a major resistance zone after a long run", "Its wicks are short", "It is smaller than the candles before it", "It appears early in the run"], ans: 0, ok: "A level nearby gives sellers somewhere to defend.", bad: "Check for a level above." },
      { k: "mc", q: "The doji's high is 1.0827, low 1.0820. You enter at 1.0828 with a stop at 1.0819. What price is 2R?", o: ["1.0837", "1.0846", "1.0855", "1.0830"], ans: 1, ok: "Risk is 9 pips. Twice that is 18 pips above 1.0828, which is 1.0846.", bad: "Risk is entry minus stop. Add twice the risk to the entry." },
    ],
  },

  "3-4": {
    goal: "Trade a doji at a level as a rejection, with the break of the doji as the trigger and the stop beyond its wick.",
    blocks: [
      p(`A doji changes completely when it forms at a level. At a resistance zone after a rise, a gravestone doji is not a pause. It is a specific record: buyers pushed price up into the zone, and sellers sold all of it back. At support after a fall, a dragonfly is the same story in reverse.`),
      fig("dojiRev", "A rally runs into a resistance zone. A gravestone doji pokes into it and finishes back at its open. The next candle breaks the doji's low and the move down follows. Entry 1.0828, stop 1.0836, target 1.0812. Risk 8, reward 16, so 2R."),
      h("The conditions"),
      ol(
        `<b>A level.</b> A zone that price has respected before, or a prior swing high or low.`,
        `<b>A run into it.</b> Price must have travelled to the level. A doji that sits at the level but did not arrive from anywhere is a different thing.`,
        `<b>A long wick toward the level.</b> The wick should point at the zone and, ideally, poke into it.`,
        `<b>The right close.</b> It finishes back away from the level.`,
      ),
      p(`When all four are present you have a rejection with a precise location. Use the doji as the signal and the <b>break of its far side</b> as the trigger: below the doji's low for a gravestone, above its high for a dragonfly.`),
      h("Stops and targets"),
      p(`The stop goes beyond the tip of the wick, just above the gravestone's high. That is where the story is proved wrong. The first target is the base of the run that led to the level, or the next zone, whichever is closer. A 2R minimum keeps the maths honest. If the wick is very long, the risk becomes large, and in that case the trade may not offer 2R before the next obvious zone. That is a reason to skip it.`),
      h("How it fails"),
      p(`A doji at a level fails when the next candle closes beyond the wick tip. At resistance, a close above the gravestone's high says buyers absorbed the rejection and are still in charge. If you are in the trade, the stop does its job. If you are not, that close is evidence of a breakout and a reason to watch for a retest.`),
      rule(`A doji at a level is a rejection record, not a prediction. Trade only the break of its far side, and put the stop beyond the wick.`),
      hw(30, `Find five resistance or support zones on the 4-hour EUR/USD or the DAX. For each, find the last time price ran into it and look for a doji at the touch. Mark the entry, stop and target on a screenshot and note whether it paid 2R before the stop. Be honest about the ones that failed.`),
    ],
    qs: [
      { k: "click", chart: "dojiRev", ans: 5, q: "Click the gravestone doji.", ok: "A tiny body at the bottom and a long upper wick poking into the resistance zone.", bad: "A small body with a long wick pointing up into the shaded zone." },
      { k: "mc", q: "The gravestone's high is 1.0835. Where does the stop go on a short?", o: ["Just above 1.0835", "At the doji's low", "At the entry", "At the zone's lower edge"], ans: 0, ok: "The idea is wrong if price trades back above the rejected high.", bad: "Beyond the wick tip." },
      { k: "mc", q: "A doji forms at a level but price did not run into it. It had been drifting sideways. What do you do?", o: ["Take it, a doji at a level is always a signal", "Treat it with caution: without a run into the level it is not the same rejection story", "Double the size", "Assume it is a breakout"], ans: 1, ok: "The run into the level is part of the story.", bad: "A rejection needs an approach." },
      { k: "mc", q: "The candle after a gravestone doji at resistance closes above the doji's high. What does that suggest?", o: ["The short is working", "The rejection failed and buyers are still in charge", "Nothing", "A bigger doji"], ans: 1, ok: "Failing to hold the rejection is evidence of a breakout.", bad: "A close beyond the wick tip means the rejection did not hold." },
    ],
  },

  "3-5": {
    goal: "Trade the break of a compression cluster using its high and low, and avoid guessing the direction in advance.",
    blocks: [
      p(`Three or more small candles in a row, many of them dojis or spinning tops, is a <b>compression cluster</b>. Each candle shrinks the available range and the market looks like it is going nowhere. In practice it is storing energy.`),
      fig("dojiCluster", "Four small candles bounded by 1.0855 above and 1.0848 below. The break is a wide-range candle closing beyond the cluster high.", false),
      h("Mark it, then wait"),
      p(`Draw a line at the highest high of the cluster and another at the lowest low. Do not guess the direction. If the cluster follows a strong move in one direction, there is a mild bias that the move resumes. If it sits at a level, the level matters more. But every bias is weaker than the actual break. The cluster has two exits, and you trade the one price takes.`),
      h("The break must be a close"),
      p(`A wick through the cluster edge is not a break. Many clusters end with a poke that fails. The rule is simple: wait for a candle to <b>close</b> beyond the edge, ideally a wide-range candle. Then enter on the next candle's open or on a small pullback to the broken edge.`),
      table(["Piece","Rule"],[
        ["<b>Trigger</b>","A candle closes beyond the cluster high (long) or low (short), preferably with a body over 60% of its range."],
        ["<b>Stop</b>","Back inside the cluster: just beyond the opposite edge for safety, or at the cluster's midpoint for a tighter risk."],
        ["<b>Target</b>","At least 2R, or the next zone. A rough guide is the height of the cluster projected from the break, but treat it as a guide only."],
        ["<b>Skip if</b>","The cluster is already inside a larger zone, or the break candle immediately closes back inside."],
      ]),
      p(`In the chart the cluster is 7 pips tall (1.0848 to 1.0855). A long entry at 1.0856 with the stop at 1.0847 risks 9 pips. A 2R target at 1.0874 is above the last candle's close of 1.0866, so on this example price travelled about 1.1R by the end of the chart. That is a useful reminder that not every break pays 2R.`),
      rule(`Never guess the exit of a cluster. Mark both edges, wait for a close beyond one of them, and trade that.`),
      hw(25, `Find ten clusters of three or more small candles on the 1-hour GBP/USD or EUR/USD. For each, mark the high and low and note whether the first close beyond an edge held or failed. How many held? How many reversed within three candles?`),
    ],
    qs: [
      { k: "click", chart: "dojiCluster", ans: 6, q: "Click the candle that breaks the cluster with a close beyond its high.", ok: "The wide-range candle closing at 1.0858, beyond the cluster high at 1.0855.", bad: "The first candle that closes above the top dashed line." },
      { k: "mc", q: "A candle's wick pokes above the cluster high but closes back inside. Is that a breakout?", o: ["Yes, always", "No. A break needs a close beyond the edge", "Only on daily charts", "Only after 15:30 CET"], ans: 1, ok: "A wick through the edge is often a failed poke.", bad: "The rule is a close beyond the edge." },
      { k: "mc", q: "Why do you not guess the direction in advance?", o: ["Because clusters never trend", "Because the cluster has two exits and any bias is weaker than the actual break", "Because brokers forbid it", "Because it is impossible to place two orders"], ans: 1, ok: "You trade the exit price takes.", bad: "A bias is not evidence." },
      { k: "mc", q: "The cluster is 7 pips tall and you enter at the top with a 9-pip stop. What is the 2R target distance from the entry?", o: ["7 pips", "9 pips", "18 pips", "14 pips"], ans: 2, ok: "Twice the 9-pip risk is 18 pips.", bad: "Reward is a multiple of your risk, not of the cluster height." },
    ],
  },

  "3-6": {
    exam: true,
    goal: "Pull the module together: three doji trade plans, a lab on real charts, and a ten-question test.",
    blocks: [
      p(`You now have three ways to trade indecision. They share one structure: a candle story, a place, a trigger beyond the candle, a stop on the far side, and a target of at least 2R.`),
      table(["Plan","Story","Trigger","Stop","Target"],[
        ["<b>Pause continuation</b>","Doji in a clean run, no level near","Break of the doji's high (long) or low (short), in the run's direction","Opposite side of the doji","2R, or next zone"],
        ["<b>Level rejection</b>","Gravestone or dragonfly at a level after a run into it","Break of the doji's far side","Beyond the wick tip","Base of the run, or next zone"],
        ["<b>Cluster break</b>","Three or more small candles","A close beyond the cluster edge","Opposite edge or midpoint","2R, or cluster height projected"],
      ]),
      p(`Each of these needs a closed candle and an order beyond it. None is a guess. The most common beginner mistake in this module is trading the doji itself, either by entering at its close or by anticipating the break. Wait for the break.`),
      h("The lab"),
      p(`Build a doji spreadsheet. Make one row per doji you find on your 1-hour and 4-hour charts, with columns for date and time in CET, instrument, timeframe, type (pause, rejection or cluster), location (level, none), wick direction, the break candle, the result in R, and a screenshot name. Fill it in for 15 dojis over the next week.`),
      hw(30, `Complete 15 rows of the doji spreadsheet from real charts. Sort the sheet by type and compute the average result in R for each. Which of the three plans works best on your market? Do not tune your answer. Just record it.`),
    ],
    qs: [
      { k: "click", chart: "dojiRev", ans: 5, ref: "3-4", q: "Click the gravestone doji.", ok: "Long upper wick into the zone, closing back at its open.", bad: "A small body with a long upper wick poking into the zone." },
      { k: "click", chart: "dojiCont", ans: 4, ref: "3-3", q: "Click the doji that is only a pause.", ok: "A modest doji in the middle of a clean run, with no level above.", bad: "The small-bodied candle in the middle of the rally." },
      { k: "click", chart: "dojiCluster", ans: 6, ref: "3-5", q: "Click the break of the compression cluster.", ok: "The first wide-range candle closing above the cluster high.", bad: "The first candle closing beyond the upper line." },
      { k: "mc", ref: "3-1", mini: "doji", q: "What kind of indecision is this candle?", o: ["Quiet", "Contested", "Neither", "A marubozu"], ans: 1, ok: "Long wicks on both sides with a tiny body is a contested fight.", bad: "The wicks are long." },
      { k: "mc", ref: "3-2", mini: "dragon", q: "What is this candle?", o: ["Gravestone doji", "Dragonfly doji", "Spinning top", "Marubozu"], ans: 1, ok: "A tiny body at the top with a long lower wick.", bad: "The long wick points down." },
      { k: "mc", ref: "3-3", q: "A doji forms in the middle of a clean run with no level nearby. What is the default reading?", o: ["A pause: trade the break of the doji in the run's direction", "A certain reversal", "Nothing to do with trend", "Always short"], ans: 0, ok: "Without a level or unusual size it is a rest.", bad: "No level, no rejection story." },
      { k: "mc", ref: "3-4", q: "Where does the stop go for a short on a gravestone doji at resistance?", o: ["Just above the wick tip", "At the doji's low", "At the zone's lower edge", "At the entry"], ans: 0, ok: "Beyond the wick tip is where the story is proved wrong.", bad: "The wick tip is the rejected high." },
      { k: "mc", ref: "3-5", q: "A cluster's high is 1.0855. A candle's wick touches 1.0858 but closes at 1.0852. What is it?", o: ["A breakout", "A failed poke: wait for a close beyond the edge", "A reversal", "A gap"], ans: 1, ok: "The close stayed inside, so there is no break.", bad: "A break needs a close beyond the edge." },
      { k: "mc", ref: "3-6", q: "Which is the most common beginner mistake with dojis?", o: ["Waiting for the break", "Trading the doji itself instead of waiting for the break of its far side", "Setting stops beyond the wick", "Measuring the wicks"], ans: 1, ok: "The doji is the question. The break is the answer.", bad: "Dojis need a trigger." },
      { k: "mc", ref: "3-2", q: "A dragonfly doji closes in the top fifth of its range. What does that tell you about who won the period?", o: ["Buyers won clearly", "Very little: the close sits on the open, and the evidence is the rejection of lower prices", "Sellers won", "Nothing about the range"], ans: 1, ok: "The close sits on the open by definition. Read the wick.", bad: "In a doji the close is by definition near the open." },
    ],
  },
};
