import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, table } from "./h";

// Market behaviour notes are tendencies, not rules. Contract values and hours change, so check the specification.
export const M13: Record<string, Lesson> = {
  "13-1": {
    goal: "Apply the method to EUR/USD and GBP/USD: their sessions, character, key levels, news and how to avoid doubling your risk.",
    blocks: [
      p(`EUR/USD and GBP/USD are the two most common pairs for a European price-action trader. Both are quoted to four decimals, with a pip of 0.0001, and both are most active when London and New York are open. They share a lot, and they differ in ways that matter to a candle reader.`),
      table(["","EUR/USD","GBP/USD"],[
        ["<b>Character</b>","The deepest market. Usually the smoothest candles and tightest spreads.","Faster, with larger candles and longer wicks. Sweeps are more violent."],
        ["<b>Best hours (CET)</b>","09:00 to 18:00, strongest 14:30 to 17:30","09:00 to 18:00, with London dominating"],
        ["<b>Main news</b>","ECB (14:15), Eurozone PMIs and German Ifo (about 10:00), US data (14:30), Fed (20:00)","Bank of England (13:00), UK data, US data, Fed"],
        ["<b>Levels</b>","Daily and weekly highs and lows, 00 and 50 numbers","Same, with larger swings between them"],
        ["<b>Stops</b>","Tighter relative to price","Wider: the same setup needs a wider stop and a smaller size"],
      ]),
      h("Correlation"),
      p(`The two pairs tend to move in the same direction because both have the US dollar as the quote currency. A long in each is closer to one trade with double the risk than to two separate trades. Count correlated positions as one position when you apply your risk limits, or take only the better of the two.`),
      h("Using the playbook"),
      ol(
        `Mark the Asian range and yesterday's high and low on both pairs before 09:00 CET.`,
        `Take the cleaner of the two sweeps at the London open. Do not take both.`,
        `Respect the 14:30 stand-aside window for US data.`,
        `Measure your own average range per hour on each pair, as you did in Module 10. Use it as your ruler.`,
      ),
      rule(`Treat EUR/USD and GBP/USD as one risk when they are pointing the same way. GBP needs wider stops and smaller size.`),
      hw(30, `Compare the average 1-hour range of both pairs across the London morning for the last 20 days. How much wider is GBP/USD? Write the stop and position size you would use for the same 1% risk on each.`),
    ],
    qs: [
      { k: "mc", q: "Which pair typically has the larger candles and longer wicks?", o: ["EUR/USD", "GBP/USD", "They are identical", "Neither"], ans: 1, ok: "Cable is faster.", bad: "Think about the typical range." },
      { k: "mc", q: "You are long EUR/USD and see a long signal on GBP/USD. How do you treat the risk?", o: ["As two separate risks", "As largely one risk: they are correlated, so count it together or take only the better one", "Ignore it", "Double the size"], ans: 1, ok: "Correlated positions double the risk.", bad: "Both are USD-quoted." },
      { k: "mc", q: "At what time is the Bank of England decision in CET?", o: ["10:00", "13:00", "15:30", "20:00"], ans: 1, ok: "13:00 CET.", bad: "12:00 UK." },
      { k: "mc", q: "The same setup on GBP/USD needs...", o: ["A tighter stop", "A wider stop and a smaller size for the same risk", "No stop", "A larger size"], ans: 1, ok: "Wider ranges.", bad: "Size from the stop." },
    ],
  },

  "13-2": {
    goal: "Apply the method to USD/JPY: its pip size, its sessions, interventions and typical behaviour.",
    blocks: [
      p(`USD/JPY has a pip of 0.01 (two decimal places, with brokers often quoting a third), so a 20-pip move is 0.20. It trades in clean legs, and it is active in Asia as well as in London and New York. Candles are read the same way, but the clock and the news are different.`),
      table(["Feature","What to know"],[
        ["<b>Pip</b>","0.01. A pip on one lot is about 1,000 yen, so the account-currency value depends on the dollar-yen rate. Use the pip calculator."],
        ["<b>Sessions</b>","Active in Tokyo (about 01:00 to 09:00 CET) as well as London and New York. The Asian range is less quiet than in EUR/USD."],
        ["<b>Drivers</b>","US interest rate expectations and Treasury yields, Bank of Japan policy and its meetings, and risk sentiment."],
        ["<b>Round numbers</b>","The 00 levels such as 150.00 and 155.00 are widely watched."],
        ["<b>Interventions</b>","Japan's authorities have sometimes sold dollars to support the yen. This can cause very sharp moves with little warning. Keep stops in place and size small near the levels people discuss."],
      ]),
      warn(`Intervention risk and gaps in the Asian session can produce slippage well beyond your stop. Never size USD/JPY on the assumption that your stop price is the worst case.`),
      h("How the method applies"),
      p(`Trends in USD/JPY are often cleaner than in other pairs, so pullback entries (Setups 3 and 5) work naturally. Sweeps of the Asian range at the London open still occur, but the Asian range is a more meaningful session level here, because it is made by the pair's own active session. Mark it, and also mark the Tokyo open.`),
      rule(`Respect the pip size, the Asian session and intervention risk. The candles are the same, and the clock and the news are not.`),
      hw(25, `Mark the Tokyo session high and low (about 01:00 to 09:00 CET) on 10 trading days of USD/JPY. How many days did London sweep one side? Compare with EUR/USD.`),
    ],
    qs: [
      { k: "mc", q: "What is a pip in USD/JPY?", o: ["0.0001", "0.01", "0.1", "1.00"], ans: 1, ok: "0.01.", bad: "Two decimals." },
      { k: "mc", q: "Why is the Asian range more meaningful in USD/JPY than in EUR/USD?", o: ["It is not", "The yen pair is active in Tokyo, so the range is a real session range", "It is bigger", "Brokers say so"], ans: 1, ok: "Tokyo is its own session.", bad: "Think about whose session it is." },
      { k: "mc", q: "What is a USD/JPY-specific risk?", o: ["None", "Official intervention that can move price sharply with little warning", "Weekends only", "Lack of volume"], ans: 1, ok: "Intervention.", bad: "Official action." },
      { k: "mc", q: "How should you treat your stop in USD/JPY near intervention levels?", o: ["As a guaranteed price", "As a trigger that may fill worse than planned, so size small", "Remove it", "Widen it"], ans: 1, ok: "Slippage.", bad: "Assume it may slip." },
    ],
  },

  "13-3": {
    goal: "Apply the method to gold: its ranges, sessions, drivers, contract values and risk.",
    blocks: [
      p(`Gold (XAU/USD) is quoted in US dollars per troy ounce. It has large ranges, moves quickly on news, and is most active when New York is open. Many traders trade it as a CFD at around 100 dollars of profit or loss per 1.00 move per lot, which depends on the broker. Futures contracts have fixed values: 100 ounces for the standard contract and 10 ounces for the micro.`),
      table(["Feature","What to know"],[
        ["<b>Quote and moves</b>","Moves in dollars and cents. A 5.00 move is a small day."],
        ["<b>Sessions</b>","Active from London, strongest 14:30 to 17:30 CET with New York."],
        ["<b>Drivers</b>","The US dollar, US interest rates and yields, inflation data, and safe-haven demand in stress."],
        ["<b>News</b>","US jobs, CPI and the Fed (14:30 and 20:00 CET). Spikes of several dollars in seconds are normal."],
        ["<b>Sizing</b>","Money at risk divided by (stop in dollars x value per 1.00 per lot). 100 risk, 5.00 stop, 100 per 1.00 gives 0.2 lots."],
        ["<b>Spreads</b>","Wider than major pairs and wider still around news."],
      ]),
      p(`Gold's candles are read exactly as before, but the range is large relative to its price, so stops are wide in dollars and positions small. Sweeps of previous highs and lows are common, and so are fast reversals at round numbers such as 2,000 and 2,500.`),
      warn(`Gold can move more in seconds around data than many instruments move in an hour. Stand aside from releases, and size so that a stop that slips by a couple of dollars still leaves you inside your risk limit.`),
      rule(`Size from the stop in dollars and the value per 1.00. Expect wide ranges, wide spreads and violent news candles.`),
      hw(25, `Check your broker's gold specification for the value per 1.00 move per lot. Calculate the position size for 1% risk on a 10,000 account with a 6.00 stop and a 12.00 stop.`),
    ],
    qs: [
      { k: "mc", q: "Risk 100, stop 5.00, value 100 per 1.00 move per lot. What size?", o: ["0.1 lots", "0.2 lots", "0.5 lots", "1 lot"], ans: 1, ok: "100 / (5 x 100) = 0.2 lots.", bad: "Risk divided by stop times value." },
      { k: "mc", q: "When is gold typically most active (CET)?", o: ["00:00 to 02:00", "14:30 to 17:30 with New York", "22:00 to 23:00", "Never"], ans: 1, ok: "New York and London overlap.", bad: "Think about the US session." },
      { k: "mc", q: "How many ounces does the standard gold future (GC) contain?", o: ["1", "10", "100", "1,000"], ans: 2, ok: "100 troy ounces.", bad: "The micro is 10." },
      { k: "mc", q: "What is a sensible attitude to gold news candles?", o: ["Trade the direction at once", "Stand aside: spikes of several dollars in seconds are normal", "Double size", "Ignore stops"], ans: 1, ok: "Stand aside.", bad: "News candles are noise." },
    ],
  },

  "13-4": {
    goal: "Apply the method to the DAX and IBEX: the 09:00 cash open, gaps, drivers and sizing.",
    blocks: [
      p(`The DAX 40 and the IBEX 35 are European index markets whose cash sessions run from 09:00 to 17:30 CET. Both can gap at the open if the US or Asia moved overnight, and the first half hour is often a burst. Your CFD may trade through the night on futures prices, so the cash-open behaviour appears as a change of speed and sometimes a small gap.`),
      table(["","DAX 40","IBEX 35"],[
        ["<b>Composition</b>","Large German companies, including industrials, autos, chemicals and software","Heavily weighted to banks, utilities and large Spanish companies"],
        ["<b>Drivers</b>","German data (Ifo, PMIs), ECB, global trade, US markets","Spanish and European banks, ECB, the euro, Spanish politics"],
        ["<b>Hours (CET)</b>","Cash 09:00 to 17:30. Futures nearly all day.","Cash 09:00 to 17:30."],
        ["<b>Spreads</b>","Tighter","Wider, so small stops cost more"],
        ["<b>Typical value per point</b>","CFD: often 1 EUR per point. Future FDAX 25 EUR, mini FDXM 5 EUR.","CFD: often 1 EUR per point"],
        ["<b>Ranges</b>","Large in points","Smaller in points, but not in percent"],
      ]),
      h("The plan"),
      ol(
        `Mark yesterday's close, high and low, and the pre-market range before 09:00.`,
        `<b>09:00 to 09:30.</b> Do not trade the first candle. Watch whether the gap holds or fills.`,
        `<b>After 09:30.</b> Look for sweeps of the pre-market range, flips of yesterday's levels, and pullback entries in the direction of the first move.`,
        `<b>14:30 and 15:30.</b> US data and the US open often change direction in the afternoon. Mark the morning high and low and use the sweep rules.`,
      ),
      rule(`Mark yesterday's close and the pre-market range before the open. Skip the first candle. Watch the gap before you act.`),
      hw(25, `For 10 days, record the DAX open gap and whether it held or filled within an hour. Do the same for IBEX 35. Compare the two.`),
    ],
    qs: [
      { k: "mc", q: "At what time does the IBEX 35 cash session open in CET?", o: ["08:00", "09:00", "15:30", "17:30"], ans: 1, ok: "09:00 CET.", bad: "Same as the DAX." },
      { k: "mc", q: "Which index is heavily weighted to banks?", o: ["DAX 40", "IBEX 35", "US100", "None"], ans: 1, ok: "IBEX 35.", bad: "Spanish banks." },
      { k: "mc", q: "Do you trade the first candle at the cash open?", o: ["Yes", "No: wait for it to close and see whether the gap holds or fills", "Only with double size", "Always"], ans: 1, ok: "Wait.", bad: "The open is noisy." },
      { k: "mc", q: "FDAX value per point?", o: ["1 EUR", "5 EUR", "25 EUR", "100 EUR"], ans: 2, ok: "25 EUR.", bad: "The standard contract." },
    ],
  },

  "13-5": {
    exam: true,
    goal: "Apply the method to the US500 and US100, and complete the module test.",
    blocks: [
      p(`The US500 (S&P 500) and the US100 (Nasdaq 100) follow the US cash session, which opens at 15:30 CET and closes at 22:00 CET. The US100 is concentrated in large technology companies and is faster than the US500, with bigger ranges and wider stops for the same setup.`),
      table(["Feature","What to know"],[
        ["<b>Hours (CET)</b>","Cash 15:30 to 22:00. Futures trade nearly around the clock."],
        ["<b>Key times</b>","14:30 US data, 15:30 cash open, 20:00 Fed days, 22:00 close."],
        ["<b>Drivers</b>","US data and Fed policy, earnings of the largest companies, global risk sentiment."],
        ["<b>First 30 minutes</b>","Often a burst that sweeps the pre-market or London range."],
        ["<b>Quarterly expiries</b>","The third Friday of March, June, September and December often brings extra volatility and volume."],
        ["<b>Sizing</b>","ES 50 USD per point, MES 5 USD per point. CFDs often 1 USD per point. Check your broker."],
      ]),
      p(`Mark the London session high and low and the pre-market range before 15:30. A sweep of one of them in the first 30 minutes followed by a close back inside is the same Setup 2 you know from Module 5. After the first hour, pullback entries in the direction of the day's trend are common.`),
      hw(25, `On the US500 for 10 days, mark the London high and low and the pre-market range. Record what the first hour of the US session did to each, and whether the following move was a sweep or a break.`),
    ],
    qs: [
      { k: "mc", ref: "13-1", q: "You hold a long on EUR/USD and see a long on GBP/USD. How do you treat the risk?", o: ["Two independent trades", "Largely one risk: correlated", "No risk", "Double"], ans: 1, ok: "Count correlated risk together.", bad: "Both are USD-quoted." },
      { k: "mc", ref: "13-2", q: "What is a pip in USD/JPY?", o: ["0.0001", "0.01", "1.00", "0.1"], ans: 1, ok: "0.01.", bad: "Two decimals." },
      { k: "mc", ref: "13-3", q: "Risk 100, gold stop 5.00, 100 per 1.00 per lot. Size?", o: ["0.1", "0.2", "0.5", "1"], ans: 1, ok: "0.2 lots.", bad: "100 / (5 x 100)." },
      { k: "mc", ref: "13-4", q: "When does the DAX cash session open in CET?", o: ["08:00", "09:00", "15:30", "17:30"], ans: 1, ok: "09:00.", bad: "09:00 CET." },
      { k: "mc", ref: "13-5", q: "When does the US cash session open in CET?", o: ["14:30", "15:30", "16:30", "17:30"], ans: 1, ok: "15:30.", bad: "09:30 New York." },
      { k: "mc", ref: "13-5", q: "Which US index is faster, with larger ranges?", o: ["US500", "US100", "They are identical", "Neither"], ans: 1, ok: "The Nasdaq 100 is concentrated in large tech stocks.", bad: "Tech concentration." },
      { k: "mc", ref: "13-5", q: "MES value per point?", o: ["1 USD", "5 USD", "50 USD", "100 USD"], ans: 1, ok: "5 USD.", bad: "A tenth of ES." },
      { k: "mc", ref: "13-4", q: "Do you trade the very first candle at the cash open?", o: ["Yes", "No: wait for it to close", "Only with size", "Always"], ans: 1, ok: "Wait.", bad: "The open is noisy." },
    ],
  },
};
