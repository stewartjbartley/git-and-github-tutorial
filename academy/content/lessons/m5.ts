import type { Lesson } from "../types";
import { p, h, rule, ol, hw, fig, table } from "./h";

export const M5: Record<string, Lesson> = {
  "5-1": {
    goal: "Explain why stop orders cluster at obvious highs and lows, and why price is drawn to them.",
    blocks: [
      p(`Every trader who buys places a stop loss below somewhere sensible. Every trader who sells places one above. The most sensible places are obvious: just beyond the last swing low, just beyond the last swing high, just beyond a round number. Because the same logic is shared by thousands of traders, their stops pile up in the same places.`),
      p(`A stop loss is a stop order. When price reaches it, it becomes a market order. A stop below a swing low is a market <i>sell</i> order waiting to be triggered. A stop above a swing high is a market <i>buy</i> order waiting to be triggered. A cluster of stops beyond a level is a pool of market orders waiting for price to arrive.`),
      h("Two kinds of order in the same place"),
      table(["Beyond a swing high","Beyond a swing low"],[
        ["Stop losses of traders who are short (these are buy orders)","Stop losses of traders who are long (these are sell orders)"],
        ["Entry orders of breakout traders who want to buy a new high","Entry orders of breakout traders who want to sell a new low"],
        ["Both are buyers. A pool of buy orders sits above the high.","Both are sellers. A pool of sell orders sits below the low."],
      ]),
      p(`Why does that attract price? One common explanation is that large participants need someone to trade against. A big seller cannot sell a large amount at one price without moving it. A pool of buy orders gives them a place where many buyers arrive at once. Whether or not that is exactly what happens, the observable behaviour is the same and well documented: price often trades just beyond obvious highs and lows and then reverses.`),
      h("Which levels collect stops"),
      table(["Level","Why stops sit there"],[
        ["Equal highs or equal lows","Two or three touches create an obvious line. Everyone sees it."],
        ["Swing highs and lows","The standard place for a protective stop."],
        ["Previous day's high and low","Day traders anchor to them."],
        ["Asian range high and low","A clearly marked box that many watch."],
        ["Round numbers","Orders cluster at 1.0900, 1.1000 and similar."],
      ]),
      rule(`Every obvious high and low has orders resting just beyond it. The more obvious the level, the bigger the pool.`),
      hw(20, `Open the 4-hour EUR/USD. Mark the five most obvious swing highs and lows of the last two weeks. For each, put a small line 3 to 5 pips beyond it, which is where the stops sit. Count how many were later traded through, and what price did next.`),
    ],
    qs: [
      { k: "mc", q: "A stop loss placed above a swing high by a short seller is what kind of order when it is triggered?", o: ["A limit sell", "A market buy", "A market sell", "A cancelled order"], ans: 1, ok: "A short is closed by buying, so the stop becomes a market buy order.", bad: "A short seller exits by buying." },
      { k: "mc", q: "Why do stop orders pile up in the same places?", o: ["Brokers place them", "Many traders use the same obvious levels, so their stops end up at the same prices", "They are random", "Because of leverage rules"], ans: 1, ok: "Shared logic creates shared stops.", bad: "Think about where a sensible trader puts a stop." },
      { k: "mc", q: "Which of these is NOT a typical place for stops to collect?", o: ["Equal highs", "The previous day's low", "The middle of a quiet range with no features", "A round number"], ans: 2, ok: "A featureless middle has no obvious level and no cluster.", bad: "Stops sit at obvious levels." },
      { k: "mc", q: "Breakout traders place buy orders...", o: ["Below swing lows", "Just above resistance or a swing high", "In the middle of a range", "At the open only"], ans: 1, ok: "Those buy orders add to the pool above the high.", bad: "A breakout buyer enters on a new high." },
    ],
  },

  "5-2": {
    goal: "Describe the four parts of a sweep candle and the plan for trading it.",
    blocks: [
      p(`A <b>sweep candle</b> trades through an obvious level, fills the orders resting beyond it, and then closes back on the original side. The orders are used up and price has nowhere to go but back. It is also called a stop run, liquidity grab or false break.`),
      h("The four parts"),
      ol(
        `<b>An obvious level.</b> Equal highs or lows, a previous day high or low, the edge of an Asian range, a round number.`,
        `<b>A wick through it.</b> Usually modest, a few pips beyond the level, though it can be longer.`,
        `<b>A close back inside.</b> The candle finishes back on the original side of the level. This is the signal, not the wick.`,
        `<b>A shape.</b> Often a pin bar, but it can also be a full-body candle (an engulfing candle that closes back inside the range).`,
      ),
      fig("sweepLow", "Two lows at about 1.0838 and 1.0839 mean stops sit just beneath them. The sweep candle drops to 1.0834, closes back at 1.0843, and price rallies. Entry at the close, stop under the sweep at 1.0833, target 1.0863. Risk 10, reward 20, so 2R."),
      h("What the candle records"),
      p(`Read the sweep like any other candle. The lower wick says sellers pushed price below the lows and were absorbed. The close, back above the level, says the move was refused. Everyone who sold the breakdown, and everyone who went long with a stop beneath, has now been forced out. Their selling is finished, and price tends to fall away from the level in the other direction.`),
      h("How a sweep differs from a hammer"),
      p(`A sweep at a low often looks like a hammer, and the two overlap. The difference is in the question you ask. For a hammer you ask whether the wick is long and whether it sits at support. For a sweep you ask what the wick took out. A sweep requires the wick to go <b>beyond a specific level</b>. A hammer needs only a place. That extra precision is why sweeps are a distinct setup.`),
      rule(`Level first, sweep second. A wick through nothing is just a wick. If you cannot name what the sweep took out, there is no signal.`),
      hw(25, `Find ten candles on the 1-hour EUR/USD that went beyond a previous swing high or low and closed back inside. For each, name the level it swept and measure how far beyond it the wick went in pips. Do they cluster around a typical distance?`),
    ],
    qs: [
      { k: "click", chart: "sweepLow", ans: 11, q: "Click the sweep candle.", ok: "It dropped below the two equal lows and closed back above them.", bad: "The candle with the long lower wick that goes below the dashed line but closes above it." },
      { k: "mc", q: "Which part of a sweep is the signal?", o: ["The wick through the level", "The close back inside", "The colour", "The previous candle"], ans: 1, ok: "The wick is just a probe. The close back inside is the signal.", bad: "The wick alone is not enough." },
      { k: "mc", q: "What is the extra question you ask of a sweep that you do not ask of a hammer?", o: ["What colour is it?", "What did the wick take out?", "How big is the body?", "What is the time?"], ans: 1, ok: "A sweep needs a specific level to have been swept.", bad: "A sweep is defined by the level it took." },
      { k: "mc", q: "Entry 1.0843, stop 1.0833, target 1.0863. What is the reward-to-risk?", o: ["1 : 1", "2 : 1", "3 : 1", "4 : 1"], ans: 1, ok: "Risk is 10 pips and reward is 20 pips.", bad: "Reward divided by risk." },
    ],
  },

  "5-3": {
    goal: "Spot equal highs and lows, measure how equal they must be, and see why they make the cleanest pools.",
    blocks: [
      p(`Equal highs or equal lows are the cleanest liquidity pools. When price makes two or three highs at almost the same level, everyone sees a line, and a lot of stops pile up just beyond it. A market that has failed twice at the same ceiling looks weak to many traders, so they short it with stops above. Others see a ceiling that must break and place buy orders above it. Both groups put orders in the same place.`),
      h("How equal is equal?"),
      p(`There is no exact rule, but a usable one: two highs are <b>equal</b> when they are within about 10% of the typical candle range on that timeframe of each other. If the usual hourly range is 10 pips, highs within 1 pip count as equal. Looking at it by eye, the human test works well: if you would draw a horizontal line through both, they are equal.`),
      fig("fakeout", "Five touches at 1.0840 build a large pool of orders above it. One candle spikes to 1.0844 and closes back at 1.0838. Entry 1.0837 below its low, stop above the spike, target 1.0821. Risk 8, reward 16, so 2R."),
      h("How many touches?"),
      table(["Touches","What it means"],[
        ["Two","A line, but not yet obvious. The pool is small."],
        ["Three to four","A clear level. A large pool of stops and breakout orders."],
        ["Five or more","Very obvious, and each test has also used up some of the resting orders, so the level may break for real."],
      ]),
      p(`This is the same lesson as in Module 9 on zones: the more a level is tested, the more obvious it is and the weaker it is. Both a sweep and a genuine breakout become more likely as touches pile up. The close of the candle that goes through decides which one it is, which is the subject of lesson 5.5.`),
      h("Double tops and bottoms"),
      p(`A classic double top is two equal highs with a dip between them. A sweep of the second high looks like a triple-top attempt that fails. The sweep candle is the third test. If it closes back below the highs, it is often followed by a drop, and the retail traders who bought the double-top breakout are trapped.`),
      rule(`Equal highs and equal lows are the biggest, cleanest pools. If you would draw a line through them, others will too.`),
      hw(25, `Scan the Daily and 4-hour charts of three instruments for equal highs or lows with at least three touches. Mark them. Note what happened the next time price traded beyond each level: sweep or breakout.`),
    ],
    qs: [
      { k: "click", chart: "fakeout", ans: 11, q: "Click the candle that sweeps the equal highs.", ok: "It spiked to 1.0844, above all five touches at 1.0840, and closed back at 1.0838.", bad: "The candle that goes above the dashed line but closes back under it." },
      { k: "mc", q: "If the usual hourly range is 10 pips, highs within roughly how many pips count as equal?", o: ["About 1 pip", "About 5 pips", "About 10 pips", "About 20 pips"], ans: 0, ok: "Within about 10% of the typical range.", bad: "10% of the range." },
      { k: "mc", q: "Why might a level with five or more touches be more likely to break?", o: ["Because it is closer to a round number", "Because each test uses up some of the resting orders", "Because brokers move it", "Because of weekends"], ans: 1, ok: "Every test consumes orders.", bad: "A level does not get stronger by being hit." },
      { k: "mc", q: "Who is trapped when a double top is swept and closes back below?", o: ["Sellers", "The traders who bought the breakout of the double top", "Nobody", "Market makers"], ans: 1, ok: "Those who bought the spike are now underwater.", bad: "The spike is where late buyers entered." },
    ],
  },

  "5-4": {
    goal: "Mark the previous day's and week's highs and lows in CET and read sweeps of them.",
    blocks: [
      p(`Day traders and algorithms alike anchor to the previous day's high (PDH) and low (PDL). They are the most widely watched levels on the chart, so the pools beyond them are among the largest. The same is true of the previous week's high and low, and the previous month's.`),
      h("Defining the day in CET"),
      p(`For forex, the trading day on most platforms runs from 23:00 CET to 23:00 CET, matching the 17:00 New York roll. Yesterday's high and low are therefore the extremes between 23:00 two evenings ago and 23:00 last night. On the Daily chart these are the previous candle's high and low. On an intraday chart, mark them with a horizontal ray and move them forward each day.`),
      p(`For index cash markets the day is different: the DAX runs 09:00 to 17:30 CET and US cash markets 15:30 to 22:00 CET. Decide whether you mark the cash-session high and low or the full futures day, and be consistent. Most traders watching the DAX use the cash high and low. Write down your choice.`),
      fig("pdh", "An hourly chart in CET. Asia builds a range under the previous day's high at 1.0860. At 10:00 London pushes through, to 1.0864, closes back at 1.0859 and falls. Entry 1.0859 at the sweep close, stop 1.0865, target 1.0847. Risk 6, reward 12, so 2R."),
      h("Weekly levels"),
      p(`The previous week's high and low matter most on Mondays and Tuesdays, before the new week has built its own range. A sweep of the weekly high on a Monday morning during the London open is a well-known pattern. As with every pattern in this course, it is a tendency you must test yourself, not a rule.`),
      table(["Level","Mark it","Best used on"],[
        ["Previous day high and low","Daily candle high and low","1-hour and 15-minute"],
        ["Previous week high and low","Weekly candle high and low","4-hour and 1-hour"],
        ["Asian range","00:00 to 08:00 CET high and low","15-minute and 1-hour"],
        ["Round numbers","The 00 and 50 levels","All timeframes"],
      ]),
      rule(`Mark the same levels every day before the London open. A sweep of a level you marked in advance is a trade. A sweep you notice after the fact is a story.`),
      hw(25, `For five trading days, mark yesterday's high and low on the 15-minute EUR/USD before 09:00 CET. Each day, note whether price swept either level, when it did (CET), and what happened after.`),
    ],
    qs: [
      { k: "click", chart: "pdh", ans: 10, q: "Click the candle that sweeps the previous day's high.", ok: "Candle 11 pushed to 1.0864 and closed at 1.0859, back below the PDH at 1.0860.", bad: "The candle whose wick is above the dashed line but whose close is below it." },
      { k: "mc", q: "When does the standard FX trading day roll in CET?", o: ["00:00", "22:00", "23:00", "09:00"], ans: 2, ok: "The roll is 17:00 New York, which is 23:00 CET.", bad: "17:00 New York." },
      { k: "mc", q: "Why mark levels in advance, before the London open?", o: ["The platform requires it", "A sweep of a level you marked in advance is a plan. One you spot afterwards is hindsight", "It changes the price", "Brokers prefer it"], ans: 1, ok: "Planning prevents hindsight bias.", bad: "Marking in advance is a discipline." },
      { k: "mc", q: "Entry 1.0859, stop 1.0865, target 1.0847. What is the reward-to-risk?", o: ["1 : 1", "2 : 1", "3 : 1", "1 : 2"], ans: 1, ok: "Risk 6, reward 12: 2 to 1.", bad: "Divide the reward by the risk." },
    ],
  },

  "5-5": {
    goal: "Use a decision process to tell a sweep from a real breakout in real time.",
    blocks: [
      p(`This is the most important lesson in the module, because the two outcomes look identical until the candle closes. In both cases price trades through an obvious level. The difference is where the candle finishes and what the next candle does.`),
      table(["","Sweep","Genuine breakout"],[
        ["<b>The close</b>","Back inside the level","Beyond the level, with a wide body"],
        ["<b>The wick</b>","Long, pointing through the level","Small. The body does the work."],
        ["<b>Next candle</b>","Moves away from the level, back the way it came","Holds beyond the level. Does not close back through half of the breakout body."],
        ["<b>Speed back</b>","Fast: within one or two candles","No return, or a slow retest that holds"],
        ["<b>Candle size</b>","Often a wide-range candle with a long wick","A wide-range candle with a long body"],
      ]),
      fig("fakeout", "A sweep: five touches at 1.0840, a spike to 1.0844, a close at 1.0838."),
      fig("trueBreak", "A genuine breakout: a wide candle closes at 1.0847, well beyond 1.0840, and the next two candles hold above half of its body. There is no rejection."),
      h("The decision process"),
      ol(
        `Is there an obvious level that price has just traded through? If not, stop. No level, no sweep.`,
        `<b>Wait for the candle to close.</b> Nothing happens before the close.`,
        `Where did it close, inside or beyond the level? Inside, with a long wick: a sweep candidate. Beyond, with a wide body: a breakout candidate.`,
        `Check the next candle. For a sweep, it should move away from the level. For a breakout, it should hold beyond it, above half of the breakout body.`,
        `If neither is clear, stay out. A trade you cannot classify is not a trade.`,
      ),
      p(`This will sometimes feel like you are late. You will miss the first part of both moves. That is the price of knowing which one you are looking at. The alternative is to guess, and guessing wrongly in either direction at an obvious level is expensive.`),
      rule(`Never decide before the close. After the close, the candle tells you what it was. Wait for the next one to confirm.`),
      hw(30, `Collect ten times price traded through an obvious level on the 1-hour chart. Classify each as sweep or breakout using only the information up to the close of the following candle. Then look at what happened. How many did you get right at the time you made the call?`),
    ],
    qs: [
      { k: "click", chart: "trueBreak", ans: 11, q: "Click the genuine breakout candle.", ok: "A wide candle closing at 1.0847, well beyond 1.0840, with a long body and a small wick.", bad: "The wide candle that closes beyond the dashed resistance line." },
      { k: "click", chart: "fakeout", ans: 11, q: "Now click the sweep on this chart.", ok: "It went above 1.0840 and closed back at 1.0838. The wick is long and the close is inside.", bad: "The candle whose close is back below the dashed line." },
      { k: "mc", q: "A candle trades through a level and closes beyond it with a wide body. The next candle holds above half of the body. What is it?", o: ["A sweep", "A genuine breakout", "A doji", "A pin bar"], ans: 1, ok: "Close beyond plus follow-through is a breakout.", bad: "A sweep closes back inside." },
      { k: "mc", q: "When should you decide whether it was a sweep or a breakout?", o: ["As the wick forms", "After the candle closes, and check the next candle", "Before the level is reached", "Never"], ans: 1, ok: "Nothing happens before the close.", bad: "A forming candle is not a signal." },
    ],
  },

  "5-6": {
    goal: "Choose between three entries for a sweep, with the stop beyond the sweep and a target at the next pool.",
    blocks: [
      p(`Once you have classified a candle as a sweep, you need a plan. There are three standard entries, each with its own cost. The stop is always beyond the sweep's extreme, because that is where the story is proved wrong.`),
      table(["Entry","Where","Entry price (chart)","Pros","Cons"],[
        ["<b>A. At the close</b>","Market order as the sweep candle closes","1.0843","Earliest. Best price. Smallest stop.","Most false signals. The next candle may close beyond."],
        ["<b>B. Break of the sweep's other extreme</b>","Buy stop above the sweep candle's high (for a sweep of lows)","1.0846","Proof that the move is real.","Worse price. Larger stop."],
        ["<b>C. Retest of the level</b>","Limit order at the swept level","1.0838","Best location. Tight stop.","Often never fills, and misses the best trades."],
      ]),
      p(`The stop on every method is below the sweep low, at 1.0833 on the chart. Risk is therefore 10 pips for A (1.0843 to 1.0833), 13 pips for B (1.0846 to 1.0833) and 5 pips for C (1.0838 to 1.0833).`),
      h("Targets"),
      p(`A sweep sends price toward the <b>opposite pool</b>. After a sweep of the lows in a range, the natural first target is the highs of the range, where the next stops sit. On the chart the range high is about 1.0854, which is only 1.1R from entry A. A 2R target is at 1.0863, above the range, and price reaches 1.0863 five candles later. So decide in advance: take partial profit at the opposite pool and let the rest run, or hold for a fixed 2R. Record which you do.`),
      h("The exit rule"),
      p(`The most important rule for a sweep: <b>if the next candle closes beyond the sweep's extreme, exit</b>. At that point the sweep has turned into a breakout, and your trade is on the wrong side. Do not wait for the stop. The next lesson shows exactly this.`),
      rule(`Stop beyond the sweep's extreme, target at the opposite pool or 2R, and exit at once if a candle closes beyond the sweep extreme.`),
      hw(30, `For 10 sweeps in your library, calculate the result for all three entries (close, break and retest). Mark fills for method C. Compare the totals in R. Which method suits your market and timeframe?`),
    ],
    qs: [
      { k: "mc", q: "Stop at 1.0833. Entry A at 1.0843, entry B at 1.0846, entry C at 1.0838. Which has the smallest risk?", o: ["A", "B", "C", "They are equal"], ans: 2, ok: "C risks 5 pips, A 10, B 13.", bad: "Risk is entry minus stop." },
      { k: "mc", q: "After a sweep of the lows inside a range, where is the natural first target?", o: ["The sweep low", "The opposite pool, at the range high", "The entry", "The previous month's low"], ans: 1, ok: "A sweep sends price toward the other pool.", bad: "Think about where the next stops sit." },
      { k: "mc", q: "You are long after a sweep, and the next candle closes below the sweep low. What do you do?", o: ["Hold, the stop will decide", "Exit: the sweep has turned into a breakout", "Add to the position", "Move the stop lower"], ans: 1, ok: "Closing beyond the sweep extreme invalidates the idea.", bad: "The exit rule is about the next close." },
      { k: "mc", q: "Why is entry C (retest of the level) often the best price but a poor method on its own?", o: ["It always loses", "It often never fills, so you miss the best trades", "It has no stop", "Brokers refuse it"], ans: 1, ok: "The missed winners are the hidden cost.", bad: "Think about fills." },
    ],
  },

  "5-7": {
    goal: "Recognise a failed sweep, exit it quickly, and know the signs that a sweep is turning into a breakout.",
    blocks: [
      p(`Sweeps fail. Sometimes a candle that looks exactly like a sweep is the first step of a real breakout. The next candle decides, and your job is to recognise it without hope getting in the way.`),
      fig("failedSweep", "A candle spikes to 1.0844 and closes back at 1.0838, a perfect sweep. But the next candle closes at 1.0846, beyond the sweep high, and price keeps rising. Anyone short from the sweep should have exited on that close."),
      h("The signs of a failing sweep"),
      table(["Sign","What it means"],[
        ["The next candle closes beyond the sweep's extreme","The sweep has failed. It is now a breakout. Exit."],
        ["The pullback after the sweep is shallow and quick","Buyers (in a sweep of highs) are still strong."],
        ["The sweep candle's close is not far back inside the level","It barely closed back. It was never a decisive rejection."],
        ["The sweep happens in the direction of a strong higher-timeframe trend","The trend is more powerful than a local rejection."],
      ]),
      h("The cost of being wrong"),
      p(`In the chart, a short entered at 1.0837 with the stop at 1.0845 is stopped out by the next candle, because its high of 1.0848 exceeds the stop. Loss: 1R. That is a perfectly fine outcome. The danger is not the stop but the hope that overrides it: moving the stop higher, adding to a loser, or deciding that it must come back. A failed sweep that is exited immediately costs 1R or less. Held in hope it can cost much more.`),
      p(`It is helpful to count the exit rule as part of the trade plan, not a reaction. Before entry, write down: if the next candle closes beyond the sweep extreme, I am out. Then you cannot argue with yourself afterwards.`),
      rule(`A close beyond the sweep's extreme turns a sweep into a breakout. Exit on that close, whatever the stop says.`),
      hw(25, `From your sweep library, find all the sweeps that failed (the next candle closed beyond the extreme). What did they have in common? Check each against the four signs above. Do not look only at winners.`),
    ],
    qs: [
      { k: "click", chart: "failedSweep", ans: 12, q: "Click the candle whose close tells you the sweep has failed.", ok: "It closed at 1.0846, beyond the sweep high at 1.0844. The sweep has turned into a breakout.", bad: "The candle right after the spike, closing above the upper dashed line." },
      { k: "mc", q: "What is the correct reaction to a close beyond the sweep's extreme?", o: ["Wait and hope", "Exit the trade", "Add to the position", "Widen the stop"], ans: 1, ok: "Exit on that close. The idea is invalid.", bad: "The idea is wrong." },
      { k: "mc", q: "Why write the exit rule down before entry?", o: ["To show others", "So you cannot argue with yourself once you are in the trade", "It reduces spreads", "It is required by the platform"], ans: 1, ok: "Plans made before entry resist hope.", bad: "Think about psychology." },
      { k: "mc", q: "A sweep goes against a very strong Daily trend. What does that do to the odds?", o: ["Nothing", "It lowers them: the larger trend is more powerful than a local rejection", "It raises them", "It makes the stop unnecessary"], ans: 1, ok: "Trades against the larger trend carry more risk.", bad: "Bigger timeframes carry more weight." },
    ],
  },

  "5-8": {
    exam: true,
    goal: "Use the Asian range and the London open as a sweep setup in CET, and complete the module test.",
    blocks: [
      p(`Sweeps are not equally likely at every hour. The London open is one of the most commonly watched sweep windows. The Asian session tends to be quiet and rangebound in many pairs. Its high and low become pools of stops. At the London open, with new participants and bigger volume, price often trades through one side of that range, and then does something else.`),
      fig("londonSweep", "A 15-minute chart in CET. Asia builds a range from 1.0848 to 1.0854. London opens at 09:00, the 09:15 candle sweeps to 1.0841 and closes at 1.08485, back inside the range, and price runs through it. Entry 1.08485, stop 1.0840, target 1.08655. Risk 8.5, reward 17, so 2R."),
      h("The routine"),
      ol(
        `Before 09:00 CET, mark the high and low of the Asian range (00:00 to 08:00 CET) on the 15-minute chart.`,
        `Watch the first hour of London, 09:00 to 10:00 CET. Is price breaking one side?`,
        `If a candle trades beyond a side, wait for it to close. Inside the range with a long wick: a sweep. Beyond with a wide body: a possible breakout.`,
        `For a sweep, trade back toward the opposite side of the range, with the stop beyond the sweep's extreme.`,
        `For a close beyond with follow-through, step aside or trade the continuation after a retest.`,
      ),
      p(`This is a tendency, not a law. Sometimes London breaks the Asian range cleanly and does not look back. Sometimes it does nothing for hours. Your screenshots will tell you how often each happens on your pairs. The point is to have a plan for the most common event rather than to react to whatever happens.`),
      h("Other session sweeps"),
      p(`The same logic repeats at other times. The US open at 15:30 CET often sweeps the London high or low, and the London close at 17:30 CET can sweep the day's extremes. You will meet these in Module 10.`),
      rule(`Mark the Asian range before the London open. A sweep of it in the first hour is a planned trade. After the first hour, the setup is stale.`),
      hw(30, `Over ten trading days, record on the 15-minute EUR/USD: the Asian range, whether London swept the high, the low, both or neither, and what the first close beyond the range did. Count the outcomes.`),
    ],
    qs: [
      { k: "click", chart: "sweepLow", ans: 11, ref: "5-2", q: "Click the sweep candle.", ok: "It went below the equal lows and closed back above.", bad: "The long lower wick that closes above the dashed line." },
      { k: "click", chart: "pdh", ans: 10, ref: "5-4", q: "Click the candle that sweeps the previous day's high.", ok: "It spiked to 1.0864 and closed at 1.0859, below the PDH at 1.0860.", bad: "The wick above the PDH with a close below." },
      { k: "click", chart: "trueBreak", ans: 11, ref: "5-5", q: "Click the genuine breakout.", ok: "A wide candle closing well beyond 1.0840 with follow-through.", bad: "The wide candle that closes beyond the line." },
      { k: "click", chart: "failedSweep", ans: 12, ref: "5-7", q: "Click the candle that shows the sweep has failed.", ok: "It closed beyond the sweep's high.", bad: "The candle right after the spike that closes above it." },
      { k: "mc", ref: "5-1", q: "Why do stop orders pile up at the same prices?", o: ["Randomly", "Many traders put protective stops at the same obvious levels", "Brokers put them there", "They don't"], ans: 1, ok: "Shared logic creates shared stops.", bad: "Think about sensible stop placement." },
      { k: "mc", ref: "5-3", q: "A level has been touched five times. What is true?", o: ["It is the strongest it can be", "It is very obvious, large pools sit beyond it, and each test has used up orders, so it may break for real", "It cannot break", "It is not a level"], ans: 1, ok: "Obvious and weakening at once.", bad: "Think about both effects." },
      { k: "mc", ref: "5-6", q: "After a sweep of the lows in a range, where do you aim first?", o: ["The sweep low", "The opposite pool at the range high", "The entry", "The weekly low"], ans: 1, ok: "A sweep drives price toward the other pool.", bad: "The other side of the range." },
      { k: "mc", ref: "5-8", q: "By when should the Asian range be marked?", o: ["After the London open", "Before 09:00 CET", "At 15:30 CET", "At 22:00 CET"], ans: 1, ok: "Before the London open, so the setup is a plan.", bad: "Mark it in advance." },
      { k: "mc", ref: "5-7", q: "You are short after a sweep of the highs and the next candle closes above the sweep high. What do you do?", o: ["Hold, the stop is further away", "Exit: the sweep has turned into a breakout", "Add to the short", "Ignore it"], ans: 1, ok: "Exit on the close.", bad: "A close beyond the sweep extreme invalidates the idea." },
      { k: "mc", ref: "5-5", q: "A candle trades through resistance. When can you classify it as a sweep or breakout?", o: ["As the wick forms", "After it closes, with the next candle to confirm", "Before it reaches the level", "Never"], ans: 1, ok: "Close first, then confirm.", bad: "Wait for the close." },
    ],
  },
};
