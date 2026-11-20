import type { Lesson } from "../types";
import { p, h, rule, ol, hw, fig, table, gallery, builder } from "./h";

export const M7: Record<string, Lesson> = {
  "7-1": {
    goal: "Compare any candle with the one before using five questions, and name the relationship before you name the pattern.",
    blocks: [
      p(`A single candle is a sentence. A pair is a conversation, and the patterns you may have heard of (engulfing, harami, piercing line) are just names for particular answers to a few questions. If you learn the questions, you can read any pair, including ones that have no name.`),
      table(["Question","What the answer says"],[
        ["<b>Where did it close compared with the last candle's high and low?</b>","Above the high or below the low is a decisive move. Inside the range is hesitation."],
        ["<b>Compared with the last candle's midpoint?</b>","Closing past the midpoint of a big candle is the minimum for a reversal."],
        ["<b>How much did it overlap?</b>","Heavy overlap means balance. Little overlap means one side is dominant."],
        ["<b>How big is it, relative to the last?</b>","Much bigger is expansion. Much smaller is contraction and indecision."],
        ["<b>Did it take out the last candle's extreme and fail?</b>","A poke beyond the high or low that closes back is a sweep in miniature."],
      ]),
      h("Build a pair"),
      p(`Candle A is on the left and candle B on the right. Set them yourself or press a preset. The panel compares B with A, names any classic pattern, and tells you what the relationship says. Try to make a pattern with no name and read it with the five questions alone.`),
      builder(2),
      h("A worked example"),
      p(`Candle A is a bullish candle with a range of 10 pips (low 1.0800, high 1.0810) and a body from 1.0802 to 1.0808. Candle B opens at 1.0808 and closes at 1.0798, with a high of 1.0809 and a low of 1.0797. B closed below A's low (question 1), well past A's body midpoint of 1.0805 (question 2), was 1.2 times its size (question 4). Overlap (question 3) tells you little here, because B opened inside A. Reading: sellers took out the whole of A and closed beyond it. That is a bearish engulfing candle, and an outside bar too, but you reached the reading before the name.`),
      fig("engulf", "A bullish engulfing at the base of a pullback. Candle B (candle 11) covers A and the candle before, and takes out their lows. Apply the five questions to it.", true),
      rule(`Read the relationship, then name it. The five questions work on a pair that has no textbook name.`),
      hw(25, `Pick 20 consecutive candles on the 1-hour EUR/USD. For each candle against the previous, write the answers to questions 1 and 3 (close vs last high or low, and overlap in rough percent). Only after that, give any pair a name. Keep the page.`),
    ],
    qs: [
      { k: "click", chart: "engulf", ans: 10, q: "Click candle B, the one that closes well above the previous candles' highs after the pullback.", ok: "The engulfing candle, closing at 1.0857 above the previous candles' highs.", bad: "The bullish candle at the base of the pullback with a body bigger than the candles before it." },
      { k: "mc", q: "B closes inside A's range, just below A's midpoint. What does that say?", o: ["A decisive move", "Hesitation: neither side took the other's extreme", "A sweep", "An engulfing"], ans: 1, ok: "Inside the range means no decision.", bad: "A decisive move closes beyond the high or low." },
      { k: "mc", q: "B has almost no overlap with A and closes beyond A's high. What is the reading?", o: ["Balance", "One side is dominant", "Indecision", "A doji"], ans: 1, ok: "Little overlap means one side is in control.", bad: "Heavy overlap is balance. Little overlap is dominance." },
      { k: "mc", q: "A poke beyond A's high that closes back at or below it is...", o: ["A breakout", "A mini sweep of the highs", "A gap", "An engulfing"], ans: 1, ok: "It is the same story as a sweep, on a small scale.", bad: "The close back inside is the key." },
    ],
  },

  "7-2": {
    goal: "Identify bullish and bearish engulfing candles, judge their quality, and trade them at a pullback with a plan.",
    blocks: [
      p(`An <b>engulfing candle</b> is a candle whose body completely covers the body of the previous candle, in the opposite direction. The story is one of trapped traders. Sellers pushed down for a candle or two, then buyers arrived so strongly that the new candle wipes out the previous body. Everyone who sold on the previous candle is now underwater, and their stop orders become buying fuel.`),
      gallery([
        ["bullEng", "Bullish engulfing", "A bullish body covers the previous bearish body. Late sellers are trapped."],
        ["bearEng", "Bearish engulfing", "A bearish body covers the previous bullish body. Late buyers are trapped."],
      ]),
      h("Quality"),
      table(["Feature","Stronger","Weaker"],[
        ["<b>Body size</b>","Much larger than the previous body","Only slightly larger"],
        ["<b>Candles covered</b>","Covers two or three previous bodies","Covers only one small body"],
        ["<b>Wicks</b>","Takes out the previous low (bullish) or high (bearish), so it is also an outside bar","Stays inside the previous range"],
        ["<b>Close location</b>","Closes in the top fifth (bullish) or bottom fifth (bearish)","Closes in the middle"],
        ["<b>Place</b>","At a zone or the end of a pullback in a trend","In empty space"],
      ]),
      fig("engulfTrade", "A shallow pullback in an uptrend, then a bullish engulfing candle that covers two bodies. Entry 1.0864 above its high, stop 1.0852 below its low, target 1.0888. Risk 12, reward 24, so 2R."),
      h("The plan"),
      table(["Piece","Rule","On the chart"],[
        ["<b>Signal</b>","An engulfing candle at a pullback or zone","Candle 8, body 1.0856 to 1.0862"],
        ["<b>Trigger</b>","A stop order just beyond its far extreme","1.0864 (above the high of 1.0863)"],
        ["<b>Stop</b>","Beyond the engulfing candle's other extreme","1.0852 (below the low of 1.0854 and the previous low of 1.0853)"],
        ["<b>Target</b>","The previous swing, or at least 2R","1.0888"],
      ]),
      p(`Entering on the close of the engulfing candle is possible when the pattern is strong and the place is excellent. The stop order above its high demands proof that buyers are still active, at the cost of a few pips. Because the stop is beyond the whole candle, the risk is its full range plus a buffer, which is why large engulfing candles often do not offer 2R.`),
      rule(`An engulfing candle at a pullback in a trend is a signal. In the middle of nowhere it is a big candle. Check the place first, then the quality.`),
      hw(30, `Find ten engulfing candles on the 1-hour GBP/USD or EUR/USD. For each, score the five quality features. Then check what price did over the next three candles and whether 2R was available before the stop. Which feature mattered most?`),
    ],
    qs: [
      { k: "click", chart: "engulfTrade", ans: 7, q: "Click the bullish engulfing candle.", ok: "Candle 8, with a body from 1.0856 to 1.0862 covering the small bearish body before it.", bad: "The bullish candle after the shallow pullback, bigger than the bearish candle before it." },
      { k: "mc", q: "Entry 1.0864, stop 1.0852, target 1.0888. What is the reward-to-risk?", o: ["1 : 1", "2 : 1", "3 : 1", "1 : 2"], ans: 1, ok: "Risk 12, reward 24.", bad: "Divide the reward by the risk." },
      { k: "mc", q: "Why does the stop go beyond the whole engulfing candle?", o: ["Convention only", "If price takes out the far extreme, the trapped-trader story is invalid", "Brokers require it", "To reduce the risk"], ans: 1, ok: "The extreme is where the story is proved wrong.", bad: "Beyond the candle is where the idea fails." },
      { k: "mc", q: "Which engulfing candle is strongest?", o: ["Slightly larger body, mid-range, in empty space", "Much larger body, covers two or three bodies, closes in the top fifth at a pullback", "A doji", "One with a long upper wick"], ans: 1, ok: "Size, coverage, close and place all help.", bad: "Quality comes from all five features together." },
    ],
  },

  "7-3": {
    goal: "Trade the break of an inside bar with the trend, and read an outside bar as expansion and often a sweep.",
    blocks: [
      p(`An <b>inside bar</b> is a candle whose high and low are both inside the range of the previous candle, called the <b>mother bar</b>. Price is compressing. The market has failed to take either extreme of the mother bar and has gone quiet. A break beyond either extreme gives the direction.`),
      fig("insideTrade", "The mother bar spans 1.0819 to 1.0831. The inside bar stays within it. The next candle breaks above 1.0831. Entry 1.0832, stop 1.0822 just under the inside bar's low, target 1.0852. Risk 10, reward 20, so 2R."),
      h("Trade the break, with the trend"),
      ol(
        `Mark the mother bar's high and low.`,
        `Decide the bias from the larger structure. In an uptrend, look only at breaks above the mother high.`,
        `Place a buy stop one pip above the mother high. Place the stop below the inside bar's low (tighter) or the mother bar's low (safer).`,
        `Target at least 2R or the next zone.`,
      ),
      p(`The choice of stop is a trade-off. Using the inside bar's low gives a small risk and many stopped trades. Using the mother bar's low gives a larger risk with fewer stops. On the chart the inside bar's low is 1.0823 (stop 1.0822, risk 10) and the mother bar's low is 1.0819 (stop 1.0818, risk 14). The first gives 2R to a target of 1.0852, and the second needs 1.0860 for 2R. Record which you use.`),
      h("Mother bar size"),
      p(`A very large mother bar makes the pattern less useful, because the stop is too far for a sensible reward. A small mother bar gives a tight, tradable range. If the mother bar is more than about twice the average candle, skip it or use the inside bar's low for the stop.`),
      h("Outside bars"),
      p(`An <b>outside bar</b> is the reverse: a candle whose range exceeds both ends of the previous candle's range. It is expansion. If the outside bar takes out the previous low and closes well above it, it is a sweep and an engulfing candle in one. If it closes in the middle, it is simply volatile and tells you little. Read the close.`),
      rule(`Trade inside bars only in the direction of the larger trend, with a stop order beyond the mother bar. A very large mother bar means the risk is too big.`),
      hw(25, `Find ten inside bars on the 1-hour or 4-hour chart. For each, mark the mother bar and note the trend direction, the mother bar's size relative to the average candle, and the result of the first break. Do breaks with the trend do better than breaks against it?`),
    ],
    qs: [
      { k: "click", chart: "insideTrade", ans: 6, q: "Click the inside bar.", ok: "Candle 7: its high and low sit inside the mother bar's range.", bad: "The small candle entirely within the range of the big candle before it." },
      { k: "mc", q: "In an uptrend, an inside bar forms. Which break do you trade?", o: ["Either one", "The break above the mother bar's high", "The break below the mother bar's low", "Neither"], ans: 1, ok: "Trade with the larger trend.", bad: "Decide the bias from the larger structure." },
      { k: "mc", q: "The mother bar is three times the average candle. What should you consider?", o: ["Take it at full size", "Skip it, or use the inside bar's low for a tighter stop", "Double the position", "Use no stop"], ans: 1, ok: "The risk can be too large for a sensible reward.", bad: "A huge mother bar makes the stop far away." },
      { k: "mc", q: "An outside bar takes out the previous low and closes near its high. What is it?", o: ["An inside bar", "A sweep and an engulfing candle in one", "A doji", "A gap"], ans: 1, ok: "It combines both stories.", bad: "It took out the low and closed back above." },
    ],
  },

  "7-4": {
    goal: "Recognise the three partial-reversal pairs (harami, piercing line, dark cloud cover) and know that they need confirmation.",
    blocks: [
      p(`Not every reversal pair engulfs. Three common pairs show a reversal that goes only part of the way. They are weaker than engulfing candles, and they usually need confirmation.`),
      gallery([
        ["harami", "Harami", "A small candle sits inside the body of a large candle. Momentum is stalling."],
        ["pierce", "Piercing line", "After a large bearish candle, a bullish candle closes past its midpoint but below its open."],
        ["dark", "Dark cloud cover", "After a large bullish candle, a bearish candle closes past its midpoint but above its open."],
      ]),
      table(["Pair","Rule","What it says"],[
        ["<b>Harami</b>","B's body sits inside A's body. A's body is large (at least half of its range).","The momentum that drove A has stopped. Neither side has taken over yet."],
        ["<b>Piercing line</b>","A is a large bearish candle. B is bullish, opens at or below A's close and closes above A's midpoint but below A's open.","Buyers recovered more than half of A. A partial reversal."],
        ["<b>Dark cloud cover</b>","A is a large bullish candle. B is bearish, opens at or above A's close and closes below A's midpoint but above A's open.","Sellers recovered more than half of A. A partial reversal."],
      ]),
      p(`These are the weaker cousins of the engulfing candle. An engulfing candle takes back all of A. A piercing line takes back more than half but not all, so buyers have shown strength without proving they are in control. That is why the next candle matters.`),
      h("Confirmation"),
      p(`Treat each of these as a watch signal. Mark the high and low of B and wait for the next candle. If it closes beyond B's far extreme, you have a trigger. If it closes back beyond A's open (in the piercing case, closes below B's low), the pattern failed. The stop goes beyond B's extreme, and the target is the same as for any reversal: the next zone, or at least 2R.`),
      p(`Because the confirmation costs a candle, these patterns have the smallest rewards of the pair family. Their value is as context: a harami at resistance after a long run is a good reason to stop adding to a long position even if you do not short.`),
      rule(`Harami, piercing line and dark cloud cover are partial. Wait for the next candle to close beyond B's far extreme before you trade.`),
      hw(25, `Find five examples of each of the three patterns on the 4-hour chart. For each, mark where they sat (a level or not) and what the next candle did. Which of the three is most often followed by a real reversal on your market?`),
    ],
    qs: [
      { k: "mc", mini: "harami", q: "What are these two candles?", o: ["Engulfing", "Harami", "Piercing line", "Tweezer"], ans: 1, ok: "A small candle fully inside the body of a large one.", bad: "B's body sits inside A's body." },
      { k: "mc", mini: "pierce", q: "What are these two candles?", o: ["Bullish engulfing", "Piercing line", "Harami", "Inside bar"], ans: 1, ok: "B closes past A's midpoint but below its open.", bad: "B recovers more than half of A but does not exceed its open." },
      { k: "mc", mini: "dark", q: "What are these two candles?", o: ["Bearish engulfing", "Dark cloud cover", "Harami", "Tweezer top"], ans: 1, ok: "A bearish candle closing past the midpoint of a large bullish one without engulfing it.", bad: "B closes below A's midpoint but above its open." },
      { k: "mc", q: "Why do these patterns usually need confirmation?", o: ["They never work", "They are partial reversals: buyers or sellers have shown strength but not proved control", "Because they are rare", "Because they only occur on Mondays"], ans: 1, ok: "Partial means unproven.", bad: "Think about how much of A was recovered." },
    ],
  },

  "7-5": {
    goal: "Spot tweezer tops and bottoms, and read them as a two-candle version of equal highs and equal lows.",
    blocks: [
      p(`A <b>tweezer top</b> is two candles with almost the same high. A <b>tweezer bottom</b> is two candles with almost the same low. The market tried the same price twice and failed twice. It is the smallest possible version of equal highs or equal lows from Module 5.`),
      gallery([
        ["tweezTop", "Tweezer top", "The first candle is bullish, the second bearish, with nearly identical highs."],
        ["tweezBot", "Tweezer bottom", "The first candle is bearish, the second bullish, with nearly identical lows."],
      ]),
      table(["Feature","Stronger","Weaker"],[
        ["Equality of the extremes","Within a pip or two (about 10% of the average range)","Several pips apart"],
        ["Colours","Opposite: bullish then bearish at the top","Same colour"],
        ["Place","At resistance or support","In empty space"],
        ["Wicks","The wicks point at the level","No wick at all, just two equal closes"],
      ]),
      p(`Tweezers are weaker as a signal than a sweep or an engulfing candle, because nothing has been trapped. They are a good flag that a level is working. The two candles at the same price tell you the level exists and has been tested twice. The trade is the break of the lower extreme of the pair (for a top), with the stop above the shared high.`),
      h("Tweezer or sweep?"),
      p(`If the second candle goes a little above the first candle's high and closes back below it, it has stopped being a tweezer and become a sweep. The close decides, as always. A tweezer top has two highs that stop at the same price. A sweep top has a second high that pokes beyond the first and is rejected.`),
      rule(`A tweezer shows a level is working. Trade only the break of the pair's far side, with the stop beyond the shared extreme, and only at a place.`),
      hw(20, `Find eight tweezer tops or bottoms on the 1-hour GBP/USD. For each, record the gap in pips between the two extremes, whether it sat at a level, and what the next two candles did. Do the ones at levels behave differently?`),
    ],
    qs: [
      { k: "mc", mini: "tweezTop", q: "What is this pattern?", o: ["Tweezer top", "Tweezer bottom", "Harami", "Engulfing"], ans: 0, ok: "Two candles with the same high.", bad: "The highs line up." },
      { k: "mc", mini: "tweezBot", q: "What is this pattern?", o: ["Tweezer top", "Tweezer bottom", "Piercing line", "Marubozu"], ans: 1, ok: "Two candles with the same low.", bad: "The lows line up." },
      { k: "mc", q: "The second candle goes a pip above the first's high and closes back below it. What is it?", o: ["A tweezer top", "A sweep of the high", "A breakout", "A harami"], ans: 1, ok: "A poke beyond that closes back is a sweep.", bad: "The poke beyond the extreme matters." },
      { k: "mc", q: "Where does the stop go for a short from a tweezer top?", o: ["Just above the shared high", "At the low", "At the entry", "At the midpoint"], ans: 0, ok: "Beyond the shared extreme, where the story is proved wrong.", bad: "The tested level is the high." },
    ],
  },

  "7-6": {
    goal: "Read morning and evening stars as three-candle stories and enter only after the third candle closes.",
    blocks: [
      p(`A <b>morning star</b> (at a low) or <b>evening star</b> (at a high) is three candles. The first is a strong candle in the direction of the trend. The second is a small candle that shows hesitation, often a doji or spinning top. The third is a strong candle in the opposite direction that closes well into the body of the first. The story is a trend, a pause and a reversal.`),
      fig("evening", "An evening star after a rally. Buyers push hard, hesitate on a small candle, then sellers close the third candle deep inside the first one's body.", false),
      gallery([["morning", "Morning star", "A big bearish candle, a small star, then a big bullish candle that closes into the first body."]]),
      table(["Candle","Needs","Why"],[
        ["<b>First</b>","Strong body in the direction of the move (body 60% or more of its range)","It shows the trend was in force."],
        ["<b>Second (the star)</b>","Small body (under 30%), ideally a doji or spinning top","It shows hesitation."],
        ["<b>Third</b>","Strong body the other way, closing beyond the midpoint of the first body","It shows the other side took over."],
      ]),
      h("Entry"),
      p(`The pattern is only complete when the third candle has closed. Enter below the third candle's low (for an evening star) with the stop above the star's high, which is usually the highest point of the pattern. Because the pattern spans three candles, the stop can be large. If the risk exceeds what a sensible 2R target allows, skip it.`),
      p(`On the chart the star's high is 1.0891 and the third candle's low is 1.0877. A sell stop at 1.0876 with the stop at 1.0892 risks 16 pips. A 2R target of 1.0844 sits well below the chart's visible price, so the next zone matters more than a fixed multiple. The pattern is a good argument to stop buying, and a better trade only when the place is excellent.`),
      rule(`Three candles, one story: trend, pause, reversal. Do not act until the third candle closes beyond the first body's midpoint.`),
      hw(25, `Find five evening or morning stars on the 4-hour chart. Check each against the three-candle table. Which ones sat at a level? What was the stop distance in pips? Could you have had 2R before the next zone?`),
    ],
    qs: [
      { k: "click", chart: "evening", ans: 7, q: "Click the third candle that completes the evening star.", ok: "Candle 8: a strong bearish candle closing at 1.0879, well inside the first bullish body.", bad: "The strong bearish candle after the small star." },
      { k: "mc", q: "What must the third candle of an evening star do?", o: ["Be a doji", "Close beyond the midpoint of the first candle's body", "Gap up", "Match the second candle"], ans: 1, ok: "It must show the other side took over.", bad: "It closes deep into the first body." },
      { k: "mc", q: "When is it safe to treat the pattern as complete?", o: ["When the second candle closes", "Only after the third candle closes", "When the first candle opens", "Never"], ans: 1, ok: "A forming third candle is not a signal.", bad: "Wait for the third close." },
      { k: "mc", q: "The star's high is far above the entry, making the stop large. What do you do?", o: ["Ignore the stop", "Skip it if it cannot offer 2R before the next zone", "Double the size", "Remove the stop"], ans: 1, ok: "Size and stop decide; the pattern does not.", bad: "A pattern is not a reason to take a bad ratio." },
    ],
  },

  "7-7": {
    goal: "Read three soldiers, three crows and longer strings of candles, and tell strength from exhaustion.",
    blocks: [
      p(`Three <b>white soldiers</b> are three consecutive bullish candles, each closing higher than the last and near its high. Three <b>black crows</b> are the mirror in bearish candles. They are a string of same-colour candles, and strings are read like any trend: by their size, their closes and their overlap.`),
      gallery([
        ["soldiers", "Three soldiers", "Three bullish candles, each closing higher, near its high."],
        ["crows", "Three crows", "Three bearish candles, each closing lower, near its low."],
      ]),
      table(["The string looks like","Reading"],[
        ["Bodies of similar size, closes near highs, little overlap","Steady strength. The move is orderly."],
        ["Bodies growing larger each time","Acceleration. Strong, but watch for exhaustion at the end."],
        ["Bodies shrinking, upper wicks growing","The push is tiring. Buyers are meeting resistance."],
        ["Closes drifting away from the highs","Sellers are leaning on the move."],
      ]),
      p(`Three soldiers after a long fall at support are a strong reversal sign: buyers returned in force and kept going for three candles. Three soldiers after a long rise into resistance are less impressive, because late buyers are rushing in and the pool above is thin. Location decides.`),
      h("Using strings"),
      p(`A string is not a trigger by itself. It is context. After the first pullback candle that holds the midpoint of the last strong candle, you have a pullback entry. After a string with growing bodies and a long wick, you have an exhaustion warning. The momentum module (Module 6) covers both in detail.`),
      rule(`Strings are context. Read size, closes and overlap, and let location decide whether the string is strength or exhaustion.`),
      hw(20, `Find five strings of three or more same-coloured candles on the 4-hour chart. Classify each by the table. Were the ones with shrinking bodies and growing wicks followed by a reversal more often than the steady ones?`),
    ],
    qs: [
      { k: "mc", mini: "soldiers", q: "What is this pattern?", o: ["Three soldiers", "Three crows", "Morning star", "Harami"], ans: 0, ok: "Three bullish candles, each closing higher.", bad: "All three are bullish and step up." },
      { k: "mc", mini: "crows", q: "What is this pattern?", o: ["Three soldiers", "Three crows", "Evening star", "Tweezer"], ans: 1, ok: "Three bearish candles stepping down.", bad: "All three are bearish." },
      { k: "mc", q: "A string of bullish candles has shrinking bodies and growing upper wicks. What does it suggest?", o: ["Acceleration", "The push is tiring", "A gap", "Nothing"], ans: 1, ok: "Smaller bodies and bigger wicks show buyers meeting resistance.", bad: "Read the sizes and wicks." },
      { k: "mc", q: "Where are three soldiers most meaningful as a reversal?", o: ["After a long rise into resistance", "After a long fall at support", "In the middle of a quiet range", "At the weekly open only"], ans: 1, ok: "Buyers returning in force at a place buyers have defended.", bad: "Location decides." },
    ],
  },

  "7-8": {
    exam: true,
    goal: "Filter the pattern list with location and timing, and complete the module test.",
    blocks: [
      p(`You now know nine pair patterns and three-candle patterns. Treat the list as vocabulary, not a signal list. Most patterns on any chart are meaningless. The filter that makes them useful is the one you already have: place, trend and time.`),
      table(["Filter","Question","If the answer is no"],[
        ["<b>Place</b>","Does it sit at a zone, a swing, or the end of a pullback?","Skip it."],
        ["<b>Trend</b>","Does it agree with the 4-hour structure?","Half size or skip."],
        ["<b>Time</b>","Did it form in a live window (09:00 to 11:00 or 14:30 to 17:30 CET)?","Lower the grade."],
        ["<b>Room</b>","Is there at least 2R to the next zone?","Skip it."],
      ]),
      p(`Take 30 patterns from your charts and run them through the filter. Count how many survive. Most beginners are surprised that fewer than one in five do. That ratio is what a disciplined trader looks like: patient, selective and rarely idle in thought but often idle in action.`),
      hw(30, `Build a spreadsheet of 30 pair or triple patterns from the last month on the 1-hour chart. Columns: pattern, place (yes or no), trend (yes or no), time window (yes or no), room (yes or no), and result in R. Compute average R for the patterns that pass all four filters and for those that do not.`),
    ],
    qs: [
      { k: "click", chart: "engulfTrade", ans: 7, ref: "7-2", q: "Click the bullish engulfing candle.", ok: "Candle 8 covers the small bearish body before it.", bad: "The bullish candle after the shallow pullback." },
      { k: "click", chart: "insideTrade", ans: 6, ref: "7-3", q: "Click the inside bar.", ok: "Candle 7 sits inside the mother bar's range.", bad: "The small candle inside the big candle." },
      { k: "click", chart: "evening", ans: 7, ref: "7-6", q: "Click the candle that completes the evening star.", ok: "The strong bearish third candle.", bad: "After the small star." },
      { k: "mc", ref: "7-1", q: "B closes beyond A's low with almost no overlap. What is the reading?", o: ["Hesitation", "A decisive move down with one side dominant", "A doji", "Nothing"], ans: 1, ok: "Close beyond the extreme and little overlap means dominance.", bad: "Beyond the low means decisive." },
      { k: "mc", ref: "7-2", q: "Entry 1.0864, stop 1.0852. Where is 2R?", o: ["1.0876", "1.0888", "1.0900", "1.0864"], ans: 1, ok: "Risk 12 times 2 is 24 pips: 1.0888.", bad: "Add twice the risk to the entry." },
      { k: "mc", ref: "7-3", q: "In an uptrend, which inside bar break do you trade?", o: ["Either", "Above the mother high", "Below the mother low", "Neither"], ans: 1, ok: "With the larger trend.", bad: "Bias comes from the structure." },
      { k: "mc", ref: "7-4", q: "Why does a piercing line usually need confirmation?", o: ["It is rare", "It is a partial reversal: more than half recovered but not all", "It occurs only on weekends", "It has no stop"], ans: 1, ok: "Partial means unproven.", bad: "Look at how much was recovered." },
      { k: "mc", ref: "7-5", q: "The second candle pokes a pip above the first's high and closes back below. What is it?", o: ["Tweezer top", "A sweep of the high", "A breakout", "A harami"], ans: 1, ok: "A poke and a close back is a sweep.", bad: "The poke beyond matters." },
      { k: "mc", ref: "7-6", q: "When is an evening star complete?", o: ["After the star", "After the third candle closes", "After the first candle", "Never"], ans: 1, ok: "Only after the third close.", bad: "Wait for the close." },
      { k: "mc", ref: "7-8", q: "Roughly what share of patterns survive place, trend, time and room filters?", o: ["Almost all", "Often fewer than one in five", "Exactly half", "None"], ans: 1, ok: "Most patterns on any chart are not tradable.", bad: "The filters are strict." },
    ],
  },
};
