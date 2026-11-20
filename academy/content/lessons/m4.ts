import type { Lesson } from "../types";
import { p, h, rule, ol, hw, fig, table, gallery, builder } from "./h";

export const M4: Record<string, Lesson> = {
  "4-1": {
    goal: "Describe a pin bar by its measures and the story it records, and tell it apart from a doji and an ordinary candle with a wick.",
    blocks: [
      p(`A <b>pin bar</b> (short for pinocchio bar) is a candle with one very long wick and a small body at the other end. It is the clearest single-candle record of rejection. The long wick is a probe: price went out, found no acceptance, and came back almost to where it started.`),
      gallery([
        ["hammer", "Hammer-type pin bar", "Long lower wick, small body near the top. Lower prices were rejected."],
        ["star", "Shooting-star-type pin bar", "Long upper wick, small body near the bottom. Higher prices were rejected."],
      ]),
      table(["Measure","Pin bar"],[
        ["Long wick","60% or more of the candle's range, and at least twice the body"],
        ["Body","Small, usually under 30% of the range, but above 10% (under 10% is a dragonfly or gravestone doji)"],
        ["Body position","In the far third of the range, opposite the wick"],
        ["Other wick","Tiny. A big wick on both sides makes it a spinning top, not a pin bar"],
      ]),
      p(`Compared with a doji, a pin bar has a slightly larger body and, importantly, a different role in a trade. A doji is a question. A pin bar is closer to an answer: the wick has already shown which side was refused. Both are useless without a place, which is the next lesson.`),
      builder(1),
      p(`Use the builder to make a hammer. Start from the Hammer preset, then shrink the body below 10% of the range and watch it become a dragonfly doji. Then thicken the upper wick and watch it become a spinning top. Where those boundaries are is the point.`),
      fig("hammer", "Candle 18 is the pin bar: a lower wick of 7 pips, a body of 1, almost no upper wick. The same story is told on any timeframe.", true),
      rule(`A pin bar is one long wick, one small body, one tiny wick. Two long wicks make a spinning top. A near-zero body makes a doji.`),
      hw(20, `Find ten pin bars on the 4-hour EUR/USD, five hammers and five shooting stars. Measure the long wick as a percentage of the range and the body as a percentage. Write them in a table. How often are they close to 60% on the wick?`),
    ],
    qs: [
      { k: "mc", mini: "hammer", q: "This candle has a lower wick of about 72% of its range and a small body at the top. What is it?", o: ["Dragonfly doji", "Hammer-type pin bar", "Bullish marubozu", "Spinning top"], ans: 1, ok: "Long lower wick, body above 10%, tiny upper wick.", bad: "The body is a little larger than a dragonfly's." },
      { k: "mc", q: "A candle has a long wick on both sides and a small body in the middle. What is it?", o: ["A pin bar", "A spinning top or long-legged doji", "A marubozu", "A hammer"], ans: 1, ok: "A pin bar has one long wick. Two means two-sided indecision.", bad: "A pin bar has only one long wick." },
      { k: "click", chart: "hammer", ans: 17, q: "Click the pin bar.", ok: "Candle 18: a lower wick of 7 pips, a body of 1 pip.", bad: "A small body on a long lower wick near the old low." },
      { k: "mc", q: "What is the main difference in role between a doji and a pin bar?", o: ["None", "A doji is a question to be answered by the next break. A pin bar has already shown which side was refused", "A pin bar is always bullish", "A doji is always bigger"], ans: 1, ok: "The wick already tells you who was refused.", bad: "Think about what each tells you before the next candle." },
    ],
  },

  "4-2": {
    goal: "Grade any pin bar with four tests (size, poke, place, close) and decide whether it is an A, B or leave-it-alone.",
    blocks: [
      p(`Not every long wick is worth trading. Four tests separate the good pin bars from the rest. Each test answers a different question, and the first three come straight from the way you learned to measure candles.`),
      table(["Test","Question","Passes when"],[
        ["<b>Size</b>","Is the wick big enough?","The long wick is at least 60% of the range and at least twice the body."],
        ["<b>Poke</b>","Did it go somewhere new?","The wick tip sticks out beyond the neighbouring candles: below the last two or three lows for a hammer, above the last highs for a star."],
        ["<b>Place</b>","Is there something to be rejected from?","It sits at a zone, a swing high or low, or a session extreme."],
        ["<b>Close</b>","Did it finish on the right side?","The close is in the upper third of the range for a hammer, the lower third for a star."],
      ]),
      h("Grades"),
      table(["Passes","Grade","What to do"],[
        ["All four","A","Trade it with a proper plan."],
        ["Three, including Place","B","Trade it only if the scorecard supports it. Consider half size."],
        ["Fewer than three, or fails Place","C","Leave it. Screenshot it for your library and move on."],
      ]),
      p(`Place is the test that fails most often, and it is the one that cannot be fixed. A pin bar in empty space is a shape. A pin bar at a level is a signal.`),
      h("Three pin bars graded"),
      table(["","Range","Long wick","Body","Pokes out?","At a level?","Closes in the right third?","Grade"],[
        ["<b>Pin 1</b>","12 pips","8 pips (67%)","2 pips","Yes, below the last 3 lows","Yes, old support","Yes","A"],
        ["<b>Pin 2</b>","14 pips","6 pips (43%)","4 pips","Yes","Yes","Yes","C: fails Size (43%)"],
        ["<b>Pin 3</b>","10 pips","7 pips (70%)","2 pips","No: inside the last candle's range","No level nearby","Yes","C: fails Poke and Place"],
      ]),
      p(`Pin 1 passes everything. Pin 2 has the right place and close but the wick is under 60% of the range. Pin 3 looks perfect in isolation, but with no poke and no level it is a drawing, not a signal.`),
      rule(`Grade before you trade. If it fails Place, nothing else matters.`),
      hw(30, `Take the ten pin bars from the last lesson. Grade each as A, B or C using the four tests. Then check what price did over the next three candles for each grade. If your data shows A-grade pins no better than C-grade ones, record that too.`),
    ],
    qs: [
      { k: "mc", q: "A hammer has a wick of 43% of its range, sits at support, pokes out and closes in the upper third. Which test does it fail?", o: ["Size", "Poke", "Place", "Close"], ans: 0, ok: "The wick must be at least 60% of the range.", bad: "Check the wick percentage." },
      { k: "mc", q: "A candle has a 70% wick, a good close and a poke, but sits in empty space between zones. What grade?", o: ["A", "B", "C: it fails Place", "A with half size"], ans: 2, ok: "No place means no signal, whatever else is good.", bad: "Place is the test that cannot be fixed." },
      { k: "mc", q: "A hammer's wick is entirely inside the previous candle's range. Which test does it fail?", o: ["Size", "Poke", "Place", "Close"], ans: 1, ok: "The wick must stick out beyond neighbouring candles.", bad: "It did not go anywhere new." },
      { k: "mc", q: "Which close passes the Close test for a shooting star?", o: ["In the top third of the range", "In the middle", "In the bottom third of the range", "Exactly at the high"], ans: 2, ok: "A shooting star should finish near its low.", bad: "A star is a rejection of higher prices, so it closes low." },
    ],
  },

  "4-3": {
    goal: "Trade a hammer at support with an entry, a stop beyond the wick, and a target of at least 2R.",
    blocks: [
      p(`A hammer at support is the buy-side version of rejection. Price has fallen into an area where buyers have acted before. Sellers push below it, find buyers in force, and price comes back to close near the top of the candle. The long lower wick is the record of that fight.`),
      fig("hammer", "A rally, a fall back to an old low, then a hammer that dips under it and closes above. Entry 1.0833 above the hammer's high, stop 1.0822 under the wick, target 1.0855. Risk 11, reward 22, so 2R."),
      h("The pieces"),
      table(["Piece","Rule","On the chart"],[
        ["<b>Place</b>","A zone, swing low or session low that price has respected","The old low at 1.0824 to 1.0830"],
        ["<b>Signal</b>","A hammer that passes the four tests","Candle 18: wick 7 pips, body 1 pip"],
        ["<b>Trigger</b>","A buy stop just above the hammer's high","1.0833"],
        ["<b>Stop</b>","Just below the wick tip","1.0822"],
        ["<b>Target</b>","At least 2R or the next zone","1.0855"],
      ]),
      p(`The trigger is above the hammer's high so that you enter only if buyers continue the move. If the next candle trades below the hammer's low instead, the order is never filled, and you did not take a trade that did not work.`),
      h("Where the old low comes from"),
      p(`The hammer's wick on the chart dips to 1.0823, just under the old low at 1.0824. That small poke below support is typical. It takes the stops of anyone who sold the breakdown, and then price returns. You will meet this again in Module 5. For now, notice that a hammer at support often looks like a very small sweep.`),
      h("What if the hammer closes weak?"),
      p(`If the hammer closes in the lower half of its range, the Close test fails. Buyers pushed back but could not hold it. That is a reason to wait, not to enter. Price may still reverse, but the evidence is weaker and the stop is hit more often.`),
      rule(`Entry above the hammer's high, stop below its wick, target at least 2R. If the next candle goes the other way, you did not have a trade.`),
      hw(30, `Find five hammers at support on the 1-hour or 4-hour EUR/USD or the DAX. For each, write the entry, stop and target before you look at what happened next. Then reveal and score each in R. Do not skip the ones that lost.`),
    ],
    qs: [
      { k: "click", chart: "hammer", ans: 17, q: "Click the hammer.", ok: "Candle 18, with the long lower wick poking just under the old low.", bad: "Small body on top of a long lower wick, near the shaded support." },
      { k: "mc", q: "The hammer's high is 1.0832, its wick tip 1.0823. You place a buy stop at 1.0833 and the stop at 1.0822. What is the risk in pips?", o: ["1 pip", "9 pips", "11 pips", "22 pips"], ans: 2, ok: "1.0833 minus 1.0822 is 11 pips.", bad: "Risk is entry minus stop." },
      { k: "mc", q: "With a risk of 11 pips, where is the 2R target for a long at 1.0833?", o: ["1.0844", "1.0855", "1.0866", "1.0833"], ans: 1, ok: "11 times 2 is 22 pips, and 1.0833 plus 0.0022 is 1.0855.", bad: "Add twice the risk to the entry." },
      { k: "mc", q: "The candle after the hammer trades below its low and never takes its high. What happened to your buy stop?", o: ["It was filled and stopped out", "It was never filled, so there was no trade", "It was filled at a profit", "It moved automatically"], ans: 1, ok: "The trigger above the high is the proof. No proof, no trade.", bad: "The order sat above the hammer's high." },
    ],
  },

  "4-4": {
    goal: "Trade a shooting star at resistance, and recognise it as an exhaustion signal after a long run.",
    blocks: [
      p(`The shooting star is the mirror of the hammer. Price runs up into an area where sellers have acted before, buyers push through it, and sellers reject the move so decisively that price returns to close near the bottom of the candle. The long upper wick is the record.`),
      fig("reject", "A shooting star at resistance. It tags 1.0823 and closes back at 1.0817, and the next candle breaks its low. Entry 1.0816, stop 1.0824, target 1.0800. Risk 8, reward 16, so 2R."),
      h("The pieces"),
      table(["Piece","Rule"],[
        ["<b>Place</b>","A resistance zone, swing high or session high that price has respected."],
        ["<b>Signal</b>","A shooting star passing the four tests. The close sits in the lower third."],
        ["<b>Trigger</b>","A sell stop just below the star's low."],
        ["<b>Stop</b>","Just above the wick tip."],
        ["<b>Target</b>","At least 2R or the next zone."],
      ]),
      h("Stars after a long run"),
      p(`A shooting star carries extra information when it forms after an extended run. In an extended rise each candle is larger than the last and late buyers rush in. A star at the end is the signature of exhaustion: the last buyers are sold into, and the wick marks where. This looks the same in the climax chart from Module 2, where a growing sequence ends in a 9-pip upper wick.`),
      p(`The extended-run star deserves a larger target. Price has travelled a long way from its base, and there is room to retrace. Look for the start of the move, or for 50% of it, as a first target.`),
      h("What about a star in the middle of an uptrend?"),
      p(`A shooting star that appears during a pullback inside an uptrend is not a reversal signal. It can be a minor rejection of a high. Without a level, a poke and a close, it is a C-grade candle. You can still use it as a warning that the run is stalling, but not as an entry.`),
      rule(`The star is a record of a failed push up. Trade only the break of its low, with the stop above the wick tip, and only at a place.`),
      hw(30, `Find five shooting stars at resistance on the 4-hour DAX or GBP/USD, and for each, note whether it came after an extended run (five or more candles in one direction). Compare the outcomes for extended-run stars and the rest.`),
    ],
    qs: [
      { k: "click", chart: "reject", ans: 7, q: "Click the shooting star.", ok: "Candle 8: a long upper wick of 5 pips poking above the resistance zone, closing back near its low.", bad: "A small body at the bottom with a long wick poking above the zone." },
      { k: "mc", q: "Where does the stop go for a short on a shooting star?", o: ["Just above the wick tip", "At the star's low", "At the entry", "At the zone's lower edge"], ans: 0, ok: "Beyond the rejected high.", bad: "The wick tip is the rejected price." },
      { k: "mc", q: "A shooting star forms after a long accelerating rally. What extra does it signal?", o: ["Nothing more", "Possible exhaustion: the last buyers were sold into", "A certain crash", "A gap"], ans: 1, ok: "A star at the end of an accelerating run is the exhaustion signature.", bad: "Think about what the run looked like." },
      { k: "mc", q: "A shooting star appears in the middle of a pullback inside an uptrend, with no zone nearby. What grade?", o: ["A", "B", "C: it fails Place", "A, because the star is clear"], ans: 2, ok: "No place, no signal.", bad: "Check the four tests." },
    ],
  },

  "4-5": {
    goal: "Read repeated long wicks into the same zone as absorption, and trade the break away from it.",
    blocks: [
      p(`One long wick is a rejection. Three long wicks into the same zone are a pattern with a different meaning: <b>absorption</b>. Sellers throw everything they have at a price and buyers soak up all of it, over and over. Each wick is a failed attempt by one side, and the zone itself is the evidence.`),
      fig("absorb", "Three long lower wicks into 1.0825 to 1.0828. The first is a hint, the second is a pattern, the third is a decision. The breakout candle that follows is the signal.", false),
      h("Reading the cluster of wicks"),
      p(`Look at the wicks as a group, not one by one. How close together are the tips? Are the bodies closing in the same area, or drifting? What happens to the candles between the wicks: do they get smaller, or are they still large? When the tips line up within a couple of pips and the closes keep returning to the same area, the zone is working.`),
      table(["Observation","What it suggests"],[
        ["Wick tips within a couple of pips","Orders resting at that price are being filled and absorbed."],
        ["Bodies closing higher each time","Buyers are gaining ground between probes."],
        ["Wicks getting shorter","Sellers are running out of strength to push through."],
        ["A wide-range candle away from the zone","The release: the buyers have won."],
      ]),
      h("Entry and stop"),
      p(`The trade is the break away. Enter above the swing high that formed between the wicks, or above the last candle's high, with the stop just below the lowest wick tip of the group. The stop is then a clear, structural one. If price returns below the lowest wick, the absorption has failed.`),
      p(`On the chart the three wicks reach 1.0827, 1.0826 and 1.0826, so the stop belongs under 1.0825. A breakout buy at 1.0843 (above the highest high of the small candles at 1.0842) with the stop at 1.0824 risks 19 pips, which is large. The structural stop is wide because the wicks are deep, which is the price of this setup. It tells you to size small, or to wait for a retest to cut the stop.`),
      rule(`Repeated wicks at one price are absorption. Trade the break away from the zone and put the stop beyond the deepest wick.`),
      hw(25, `Find three examples on the 4-hour of price returning to the same zone and leaving long wicks at least three times. Screenshot them. For each, note whether the break away came from the top of the cluster or from a retest, and what the stop distance was in pips.`),
    ],
    qs: [
      { k: "click", chart: "absorb", ans: 8, q: "Click the third long lower wick into the zone.", ok: "Candle 9, the last wick before the breakout.", bad: "The third candle with a long lower wick into the shaded zone." },
      { k: "mc", q: "Three long lower wicks reach the same price within 1 pip. What is the most likely reading?", o: ["Random noise", "Absorption: orders are being filled and the zone is working", "A breakdown is certain", "The market is closed"], ans: 1, ok: "Repeated rejections of one price are the signature of absorption.", bad: "Wick tips lining up is meaningful." },
      { k: "mc", q: "Where does the stop sit for a breakout long above an absorbed zone?", o: ["Just below the deepest wick tip", "At the entry", "At the highest high", "At the zone's top edge"], ans: 0, ok: "If price returns beneath the lowest wick, the absorption has failed.", bad: "Beyond the deepest wick." },
      { k: "mc", q: "The wicks are very deep and the stop would be wide. What are your options?", o: ["Ignore the risk and take full size", "Size smaller, or wait for a retest to tighten the stop", "Remove the stop", "Skip stops"], ans: 1, ok: "The stop is structural. You adjust the size, not the stop.", bad: "Size is set from the stop." },
    ],
  },

  "4-6": {
    goal: "Compare the three ways to enter a pin bar with real numbers, and choose between them by price, risk and fill rate.",
    blocks: [
      p(`There are three standard ways to enter a pin bar. They differ in entry price, stop distance and, crucially, how often you get filled. Here they are on the same hammer from lesson 4.3.`),
      table(["Entry method","Entry","Stop","Risk","Target","Reward : risk","Fill rate"],[
        ["<b>A. Break of the hammer's high</b>","1.0833","1.0822","11 pips","1.0855","2.0 : 1","High, but only if buyers confirm"],
        ["<b>B. Limit at 50% of the wick</b>","1.08265","1.0822","4.5 pips","1.0855","6.3 : 1","Lower: price often does not return"],
        ["<b>C. At the close of the hammer</b>","1.0831","1.0822","9 pips","1.0855","2.7 : 1","Highest, but includes failures"],
      ]),
      p(`The 50% limit has an attractive reward-to-risk, but only on the trades you actually get. If price runs away without retracing into the wick, you simply miss the trade, and those are often the best ones. The break entry gives away some reward in exchange for proof. The close entry gets in earliest and takes the most false signals.`),
      h("How to choose"),
      ol(
        `Start with method A (break of the far side). It is the default because it demands proof.`,
        `Use method B only at A-grade locations where you are happy to miss the trade.`,
        `Use method C only when the location and timing are exceptional, and size small.`,
      ),
      h("Expectancy: why fills matter"),
      p(`Here is a hypothetical, with invented numbers to show the logic. Suppose method A fills on 8 of 10 signals and wins 45% of fills at 2R, losing the rest at 1R. Expectancy per signal is 0.8 x (0.45 x 2 minus 0.55 x 1) = 0.28R. Method B fills only 4 of 10 but wins 40% of fills at 6.3R: 0.4 x (0.4 x 6.3 minus 0.6) = 0.77R. On paper B looks better, but if the trades B misses are the winners, that edge disappears. You can only find out from your own screenshots, so record fills and misses separately.`),
      rule(`Reward-to-risk means nothing without the fill rate. Measure both in your own data before you choose.`),
      hw(30, `For 15 pin bars in your library, calculate the result in R for all three entry methods. Mark whether the 50% limit would have filled. Total each method. Do not choose until all 15 are done.`),
    ],
    qs: [
      { k: "mc", q: "Entry 1.0833, stop 1.0822, target 1.0855. What is the reward-to-risk ratio?", o: ["1 : 1", "2 : 1", "3 : 1", "4 : 1"], ans: 1, ok: "Risk is 11 pips and reward is 22 pips.", bad: "Reward divided by risk." },
      { k: "mc", q: "A limit entry at 50% of the wick gives a high reward-to-risk but...", o: ["Always wins", "Fills less often, and the missed trades are often the best", "Needs no stop", "Is always better"], ans: 1, ok: "Missing the runaway winners is the hidden cost.", bad: "Think about what happens when price never returns." },
      { k: "mc", q: "Which method demands proof that buyers are active?", o: ["Entry at the close", "Entry above the hammer's high", "Entry at 50% of the wick", "None of them"], ans: 1, ok: "Entry above the high only fills if buyers push through it.", bad: "A stop order beyond the signal candle is the proof." },
      { k: "mc", q: "Which two numbers decide whether an entry method is worth using?", o: ["Entry price and colour", "Reward-to-risk and fill rate", "Time and date", "Spread and swap only"], ans: 1, ok: "A better ratio on fewer trades may not be a better method.", bad: "Both the ratio and how often you actually get the trade." },
    ],
  },

  "4-7": {
    exam: true,
    goal: "Separate pin bars that join a trend from pin bars that reverse one, and complete the module test.",
    blocks: [
      p(`A pin bar can do two different jobs. A <b>reversal pin</b> sits at the end of a move and says the move is over. A <b>pullback pin</b> sits at the end of a small counter-move inside a trend and says the trend is resuming. The candle looks the same, and the trade is not the same.`),
      fig("pullbackPin", "A rally, a pullback to the area where it began, a bullish pin bar with a long wick under the old support, and a trigger candle that takes the pin's high. The trend resumes.", false),
      table(["","Pullback pin","Reversal pin"],[
        ["<b>Prior move</b>","Short pullback inside a larger trend","A long run, often accelerating"],
        ["<b>Direction vs the larger trend</b>","With it","Against it"],
        ["<b>Place</b>","Support in an uptrend, resistance in a downtrend","A major zone at the end of the run"],
        ["<b>Stop</b>","Beyond the wick, usually small","Beyond the wick, often larger"],
        ["<b>Target</b>","Back to the prior high and beyond","The base of the run, or 50% of it"],
        ["<b>Risk</b>","Lower: you trade with the larger trend","Higher: you trade against it"],
      ]),
      p(`Pullback pins have a natural advantage: you are trading in the direction of the larger structure, so the odds of the larger timeframe supporting you are higher. Reversal pins can produce larger moves, but they ask the market to change direction, which is a harder thing to ask. Many professionals take pullback pins at full size and reversal pins at half.`),
      rule(`Decide which job the pin is doing before you place the order. With-trend pins earn full size. Against-trend pins earn caution.`),
      hw(30, `Find ten pin bars on the 4-hour chart and label each pullback or reversal. Write the stop distance for each. Compare the average stop size and the result in R for the two groups.`),
    ],
    qs: [
      { k: "click", chart: "pullbackPin", ans: 6, ref: "4-7", q: "Click the pullback pin bar.", ok: "Candle 7: a long lower wick under the old support that closes back above it.", bad: "A small body on a long lower wick near the support." },
      { k: "click", chart: "reject", ans: 7, ref: "4-4", q: "Click the shooting star.", ok: "Candle 8 at the resistance zone.", bad: "A small body at the bottom with a long upper wick above the zone." },
      { k: "click", chart: "absorb", ans: 6, ref: "4-5", q: "Click the second long lower wick.", ok: "Candle 7, the second of three wicks into the zone.", bad: "The second candle with a long lower wick into the shaded zone." },
      { k: "mc", ref: "4-2", q: "A pin bar has a 70% wick, a poke and a good close, but sits in empty space. What grade?", o: ["A", "B", "C: it fails Place", "A at half size"], ans: 2, ok: "Place decides.", bad: "Without a place the shape is not a signal." },
      { k: "mc", ref: "4-2", q: "Which test checks that the wick sticks out beyond neighbouring candles?", o: ["Size", "Poke", "Place", "Close"], ans: 1, ok: "Poke.", bad: "The test is about going somewhere new." },
      { k: "mc", ref: "4-3", q: "Entry 1.0833, stop 1.0822. Where is 2R?", o: ["1.0844", "1.0855", "1.0866", "1.0877"], ans: 1, ok: "11 pips of risk times 2 is 22 pips.", bad: "Add twice the risk to the entry." },
      { k: "mc", ref: "4-6", q: "A limit entry at 50% of the wick has a 6 : 1 ratio but fills on only 4 of 10 signals. What is the right conclusion?", o: ["It is always best", "You cannot judge it without comparing the winners you missed", "It is always worst", "It needs no stop"], ans: 1, ok: "Missed winners are the hidden cost.", bad: "The ratio alone is not enough." },
      { k: "mc", ref: "4-7", q: "Which job does a pin bar do at the end of a short pullback inside an uptrend?", o: ["Reversal", "Pullback: the trend is resuming", "Neither", "A breakout"], ans: 1, ok: "It marks the end of the counter-move.", bad: "It is with the larger trend." },
    ],
  },
};
