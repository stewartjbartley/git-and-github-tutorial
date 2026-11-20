export type Bias = "bullish" | "bearish" | "neutral" | "continuation";
export type Group = "single" | "pair" | "triple" | "context";

export type CandleEntry = {
  id: string;
  group: Group;
  name: string;
  aka?: string;
  /** Key in MINI (content/charts.ts) */
  mini: string;
  bias: Bias;
  /** Plain-words story: what the candle records. */
  story: string;
  /** How to recognise it, using the course measures. */
  shows: string;
  /** Where it carries weight. */
  where: string;
  /** What to expect. A tendency, never a forecast. */
  expect: string;
  /** What confirms it. */
  confirm: string;
  /** Lesson slug in this course. */
  lesson: string;
};

export const GROUP_LABEL: Record<Group, string> = { single: "Single candles", pair: "Two candles", triple: "Three candles or more", context: "In context" };
export const BIAS_LABEL: Record<Bias, string> = { bullish: "Bullish", bearish: "Bearish", neutral: "Neutral", continuation: "Continuation" };

export const CANDLES: CandleEntry[] = [
  // ----- single
  { id: "bull-marubozu", group: "single", name: "Bullish marubozu", mini: "bullMaru", bias: "bullish",
    story: "Buyers owned the whole period. Price opened at the low and closed at the high.",
    shows: "Body 90% or more of the range, bullish, almost no wicks.", where: "Breakouts, the first candle out of compression, and with the trend.",
    expect: "Strength. Follow-through is likely if the next candle holds above half of its body. After a long accelerating rally it can mark a climax instead.",
    confirm: "The next candle holds above the midpoint of its body.", lesson: "6-2" },
  { id: "bear-marubozu", group: "single", name: "Bearish marubozu", mini: "bearMaru", bias: "bearish",
    story: "Sellers owned the whole period. Price opened at the high and closed at the low.",
    shows: "Body 90% or more of the range, bearish, almost no wicks.", where: "Breakdowns, the first candle out of compression, and with the trend.",
    expect: "Weakness. Follow-through is likely if the next candle holds below half of its body. After a long fall it can mark a climax instead.",
    confirm: "The next candle holds below the midpoint of its body.", lesson: "6-2" },
  { id: "spinning-top", group: "single", name: "Spinning top", mini: "spin", bias: "neutral",
    story: "Both sides pushed and neither won. A lot of back and forth.",
    shows: "Body 30% of the range or less, both wicks 25% or more.", where: "After a strong run, where it shows the run losing energy. Inside a range it is noise.",
    expect: "A pause. The direction comes from the next candle, not from this one.", confirm: "A close beyond its high or low.", lesson: "3-2" },
  { id: "long-legged-doji", group: "single", name: "Long-legged doji", mini: "doji", bias: "neutral",
    story: "A violent two-sided fight that finished level.",
    shows: "Body under 10% of the range, both wicks long.", where: "Major turning points and before news.",
    expect: "High-information indecision. Mark its high and low and trade the break.", confirm: "A close beyond either extreme.", lesson: "3-2" },
  { id: "dragonfly-doji", group: "single", name: "Dragonfly doji", mini: "dragon", bias: "bullish",
    story: "Sellers drove price down and buyers took all of it back to the open.",
    shows: "Body under 10%, lower wick 60% or more, almost no upper wick.", where: "At support, after a fall or a run into a level.",
    expect: "Lower prices were rejected. A bullish reversal candidate that needs a trigger.", confirm: "A break above its high.", lesson: "3-4" },
  { id: "gravestone-doji", group: "single", name: "Gravestone doji", mini: "grave", bias: "bearish",
    story: "Buyers drove price up and sellers took all of it back to the open.",
    shows: "Body under 10%, upper wick 60% or more, almost no lower wick.", where: "At resistance, after a rise or a run into a level.",
    expect: "Higher prices were rejected. A bearish reversal candidate that needs a trigger.", confirm: "A break below its low.", lesson: "3-4" },
  { id: "hammer", group: "single", name: "Hammer", aka: "Hammer-type pin bar", mini: "hammer", bias: "bullish",
    story: "Sellers pushed price down and buyers pushed it all the way back.",
    shows: "Small body in the upper third, lower wick 60% or more of the range and at least twice the body.", where: "At support or a swing low, after a fall. Must pass the four tests.",
    expect: "Lower prices were rejected. The end of a fall or a pullback, if it sits at a place.", confirm: "A break above its high.", lesson: "4-3" },
  { id: "hanging-man", group: "single", name: "Hanging man", aka: "Hammer shape at a top", mini: "hammer", bias: "bearish",
    story: "The same shape as a hammer, but it appears after a rise.",
    shows: "Hammer shape after an extended rise.", where: "At resistance after a long advance.",
    expect: "A weak warning only. Many fail, so trade it only on a break of its low.", confirm: "A bearish candle closing below its body.", lesson: "2-6" },
  { id: "shooting-star", group: "single", name: "Shooting star", aka: "Shooting-star-type pin bar", mini: "star", bias: "bearish",
    story: "Buyers pushed price up and sellers pushed it all the way back.",
    shows: "Small body in the lower third, upper wick 60% or more of the range and at least twice the body.", where: "At resistance or a swing high, after a rise. Must pass the four tests.",
    expect: "Higher prices were rejected. The end of a rise or a pullback, if it sits at a place.", confirm: "A break below its low.", lesson: "4-4" },
  { id: "inverted-hammer", group: "single", name: "Inverted hammer", aka: "Shooting-star shape at a bottom", mini: "star", bias: "bullish",
    story: "The same shape as a shooting star, but it appears after a fall.",
    shows: "Shooting-star shape after an extended fall.", where: "At support after a long decline.",
    expect: "Buyers tried and were refused, so it is weaker than a hammer. It needs a strong follow-up.", confirm: "A close above its high.", lesson: "2-6" },
  // ----- pairs
  { id: "bullish-engulfing", group: "pair", name: "Bullish engulfing", mini: "bullEng", bias: "bullish",
    story: "Buyers took back a whole candle. Sellers who sold the last candle are trapped.",
    shows: "A bullish body that covers the previous bearish body, ideally also taking out its low.", where: "At the end of a pullback, or at support.",
    expect: "Continuation of the up move, or a reversal at support. Large ones may not leave 2R of room.", confirm: "A stop order above its high.", lesson: "7-2" },
  { id: "bearish-engulfing", group: "pair", name: "Bearish engulfing", mini: "bearEng", bias: "bearish",
    story: "Sellers took back a whole candle. Buyers who bought the last candle are trapped.",
    shows: "A bearish body that covers the previous bullish body, ideally also taking out its high.", where: "At the end of a pullback up, or at resistance.",
    expect: "Continuation of the down move, or a reversal at resistance. Large ones may not leave 2R of room.", confirm: "A stop order below its low.", lesson: "7-2" },
  { id: "bullish-harami", group: "pair", name: "Bullish harami", mini: "harami", bias: "bullish",
    story: "Selling momentum stalled. A small candle sits inside the body of a large bearish one.",
    shows: "Body of B inside the body of a large bearish A.", where: "At support after a fall.",
    expect: "A partial signal. Momentum has stopped, but buyers have not proved control.", confirm: "A close above B's high.", lesson: "7-4" },
  { id: "bearish-harami", group: "pair", name: "Bearish harami", mini: "bearHarami", bias: "bearish",
    story: "Buying momentum stalled. A small candle sits inside the body of a large bullish one.",
    shows: "Body of B inside the body of a large bullish A.", where: "At resistance after a rise.",
    expect: "A partial signal. Momentum has stopped, but sellers have not proved control.", confirm: "A close below B's low.", lesson: "7-4" },
  { id: "piercing-line", group: "pair", name: "Piercing line", mini: "pierce", bias: "bullish",
    story: "Buyers recovered more than half of a big bearish candle.",
    shows: "B bullish, opens at or below A's close and closes above A's midpoint but below A's open.", where: "At support after a fall.",
    expect: "A partial reversal. It usually needs a confirming candle.", confirm: "A close above B's high.", lesson: "7-4" },
  { id: "dark-cloud-cover", group: "pair", name: "Dark cloud cover", mini: "dark", bias: "bearish",
    story: "Sellers recovered more than half of a big bullish candle.",
    shows: "B bearish, opens at or above A's close and closes below A's midpoint but above A's open.", where: "At resistance after a rise.",
    expect: "A partial reversal. It usually needs a confirming candle.", confirm: "A close below B's low.", lesson: "7-4" },
  { id: "tweezer-top", group: "pair", name: "Tweezer top", mini: "tweezTop", bias: "bearish",
    story: "The market tried the same ceiling twice and failed twice.",
    shows: "Two candles with almost the same high, bullish then bearish.", where: "At resistance.",
    expect: "The level is working. Trade only the break of the pair's low.", confirm: "A close below the pair's low.", lesson: "7-5" },
  { id: "tweezer-bottom", group: "pair", name: "Tweezer bottom", mini: "tweezBot", bias: "bullish",
    story: "The market tried the same floor twice and failed twice.",
    shows: "Two candles with almost the same low, bearish then bullish.", where: "At support.",
    expect: "The level is working. Trade only the break of the pair's high.", confirm: "A close above the pair's high.", lesson: "7-5" },
  { id: "inside-bar", group: "pair", name: "Inside bar", mini: "insideB", bias: "neutral",
    story: "Price compressed inside the previous candle's range. Energy is being stored.",
    shows: "High and low both inside the mother bar's range.", where: "In a trend, near a zone, or at the end of a pullback.",
    expect: "A break in the direction of the larger trend is more likely to work. Skip huge mother bars.", confirm: "A close beyond the mother bar's high or low.", lesson: "7-3" },
  { id: "outside-bar", group: "pair", name: "Outside bar", mini: "outside", bias: "neutral",
    story: "Price exceeded both ends of the previous candle. Expansion.",
    shows: "High above and low below the previous candle's range.", where: "Anywhere. The close decides what it means.",
    expect: "If it takes out a low and closes near its high it is a sweep and an engulfing candle in one. If it closes mid-range it is only volatile.", confirm: "Read the close and the next candle.", lesson: "7-3" },
  // ----- triples
  { id: "morning-star", group: "triple", name: "Morning star", mini: "morning", bias: "bullish",
    story: "A fall, a pause, then buyers take over. Trend, hesitation, reversal.",
    shows: "A strong bearish candle, a small star, then a strong bullish candle closing past the midpoint of the first body.", where: "At support after a fall.",
    expect: "A reversal. The stop is usually large because it spans three candles, so check there is room for 2R.", confirm: "Only after the third candle closes.", lesson: "7-6" },
  { id: "evening-star", group: "triple", name: "Evening star", mini: "evening3", bias: "bearish",
    story: "A rise, a pause, then sellers take over. Trend, hesitation, reversal.",
    shows: "A strong bullish candle, a small star, then a strong bearish candle closing past the midpoint of the first body.", where: "At resistance after a rise.",
    expect: "A reversal. The stop is usually large because it spans three candles, so check there is room for 2R.", confirm: "Only after the third candle closes.", lesson: "7-6" },
  { id: "three-white-soldiers", group: "triple", name: "Three white soldiers", mini: "soldiers", bias: "bullish",
    story: "Buyers returned in force and kept going for three candles.",
    shows: "Three bullish candles, each closing higher and near its high.", where: "After a fall at support it is a strong reversal sign. After a long rise into resistance it is less meaningful.",
    expect: "Strength. Check whether the bodies are steady, growing or shrinking, and wait for the first pullback.", confirm: "A pullback candle that holds the midpoint of the last soldier.", lesson: "7-7" },
  { id: "three-black-crows", group: "triple", name: "Three black crows", mini: "crows", bias: "bearish",
    story: "Sellers returned in force and kept going for three candles.",
    shows: "Three bearish candles, each closing lower and near its low.", where: "After a rise at resistance it is a strong reversal sign. After a long fall into support it is less meaningful.",
    expect: "Weakness. Check whether the bodies are steady, growing or shrinking, and wait for the first pullback.", confirm: "A pullback candle that holds the midpoint of the last crow.", lesson: "7-7" },
  { id: "rising-three-methods", group: "triple", name: "Rising three methods", mini: "rise3", bias: "continuation",
    story: "A pause inside an up trend. The pullback stays inside the first candle's range.",
    shows: "A long bullish candle, three small candles inside its range, then a long bullish candle closing above its high.", where: "In an established up trend.",
    expect: "Continuation. It is the pullback entry from Module 6 drawn as a pattern.", confirm: "The final candle's close above the first candle's high.", lesson: "6-6" },
  { id: "falling-three-methods", group: "triple", name: "Falling three methods", mini: "fall3", bias: "continuation",
    story: "A pause inside a down trend. The pullback stays inside the first candle's range.",
    shows: "A long bearish candle, three small candles inside its range, then a long bearish candle closing below its low.", where: "In an established down trend.",
    expect: "Continuation. It is the pullback entry from Module 6 drawn as a pattern.", confirm: "The final candle's close below the first candle's low.", lesson: "6-6" },
  // ----- context
  { id: "sweep-candle", group: "context", name: "Sweep candle", aka: "Stop run, liquidity grab, false break", mini: "sweepM", bias: "neutral",
    story: "Price trades through an obvious level, takes the stops beyond it, then closes back inside.",
    shows: "A wick beyond a named level and a close back on the original side. This one sweeps a low.", where: "Equal highs or lows, the previous day's high or low, the Asian range, round numbers.",
    expect: "A move back toward the opposite pool. The next candle closing beyond the sweep's extreme means it was a breakout: exit.", confirm: "The close back inside, and a next candle that moves away.", lesson: "5-2" },
  { id: "wide-range-candle", group: "context", name: "Wide-range candle", mini: "wideRange", bias: "continuation",
    story: "Unusual activity: a candle far larger than its neighbours.",
    shows: "Range 1.5 times or more the average of the last ten candles.", where: "Out of compression, at breakouts, at news.",
    expect: "Follow-through if the next candles hold above (or below) half of its body. A failure if the next candle closes back through the midpoint.", confirm: "The midpoint test.", lesson: "6-1" },
  { id: "climax-wick", group: "context", name: "Exhaustion wick", aka: "Climax candle", mini: "climaxM", bias: "bearish",
    story: "Growing candle bodies, then a huge wick at the extreme. The last buyers were sold into.",
    shows: "Each body larger than the last, then a very long wick on the biggest move.", where: "At the end of an accelerating run. This one is at a high.",
    expect: "Exhaustion. A move back toward the base of the run is likely, with sellers answering on the next candles.", confirm: "A strong candle the other way.", lesson: "6-4" },
  { id: "absorption", group: "context", name: "Absorption", aka: "Wick cluster", mini: "absorbM", bias: "bullish",
    story: "Sellers throw everything at one price and buyers soak it all up, again and again.",
    shows: "Three or more long wicks into the same zone, with tips lined up within a couple of pips.", where: "At support or resistance that has been tested repeatedly. This one is at support.",
    expect: "When the wicks stop and a strong candle leaves the zone, there are few sellers left to stop it.", confirm: "A breakout candle away from the zone.", lesson: "4-5" },
];
