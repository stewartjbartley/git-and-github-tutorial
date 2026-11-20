import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, table } from "./h";

// Macro relationships are tendencies that change over time. Release times are typical, so check an economic calendar.
export const M17: Record<string, Lesson> = {
  "17-1": {
    goal: "Explain what macro context adds to a price-action trader, and what it cannot do.",
    blocks: [
      p(`Everything in this course so far reads price. <b>Macro</b> is the study of the economy and policy that move the big flows behind price: interest rates, inflation, jobs, growth and risk appetite. You do not need to forecast any of it to trade candles well. You do need to know when it arrives and what mood it sets, because it is the largest source of sudden, unscheduled-looking candles.`),
      h("Three jobs macro does for a candle reader"),
      table(["Job","How it helps","Example"],[
        ["<b>A risk map</b>","Tells you when the big candles are coming, so you can stand aside.","The US jobs report at 14:30 CET."],
        ["<b>A background bias</b>","Tells you which way the larger flow leans, so you can favour setups in that direction.","Central banks expected to cut rates, which tends to weigh on that currency."],
        ["<b>A regime label</b>","Tells you whether the market is in a risk-on or risk-off mood, which changes how correlated markets behave.","A sharp equity sell-off, with the yen and gold bid."],
      ]),
      h("What macro cannot do"),
      p(`Macro does not tell you when to enter. It does not tell you where to put a stop. And it often fails to predict the direction of the reaction, because markets trade <b>surprise against expectation</b>, not the news itself. A good number can sink a currency if the market expected a great one. This is why price remains the final judge: the candle shows how the market actually reacted.`),
      warn(`Do not build a trade on a macro story alone. A clear narrative is a reason to look, never a reason to enter without a place, a candle and a plan.`),
      rule(`Use macro as a map and a mood. Use price for the entry.`),
      hw(25, `Pick the last three major releases for your main instrument. For each, note the time (in CET), the forecast and the actual figure, and what the first two 15-minute candles did. Did the direction match the headline?`),
    ],
    qs: [
      { k: "mc", q: "Which is a job of macro for a candle reader?", o: ["Telling you exactly where to enter", "Giving a risk map of when large candles are likely", "Replacing the stop", "Predicting every move"], ans: 1, ok: "A risk map.", bad: "It tells you when, not where." },
      { k: "mc", q: "Why can a good economic number move a currency down?", o: ["Randomly", "Markets trade surprise against expectation, and the number may be below what was priced in", "Brokers manipulate it", "It cannot"], ans: 1, ok: "Expectations matter.", bad: "Surprise versus expectation." },
      { k: "mc", q: "What is the final judge of how the market reacted?", o: ["The headline", "Price: the candles that actually formed", "A forecast", "An analyst"], ans: 1, ok: "Price.", bad: "What printed." },
      { k: "mc", q: "Can you build a trade on a macro story alone?", o: ["Yes", "No: you still need a place, a candle story and a plan", "Only on Fridays", "Always"], ans: 1, ok: "Macro is context.", bad: "A plan is still needed." },
    ],
  },

  "17-2": {
    goal: "Explain how interest rates and central banks move currencies, and how to read a central bank day through the candles.",
    blocks: [
      p(`A currency's value is influenced by the return you can earn holding it. When a central bank raises its policy rate, or is expected to, the currency often strengthens, because holding it pays more. When a central bank cuts, or is expected to, the currency often weakens. The <b>difference</b> between two countries' rates, and the expected path of that difference, is a main driver of pairs.`),
      table(["Bank","Currency","Meetings a year (typical)","Time of decision (CET, typical)"],[
        ["Federal Reserve (Fed)","US dollar","8","20:00, press conference 20:30"],
        ["European Central Bank (ECB)","Euro","8 policy meetings","14:15, press conference 14:45"],
        ["Bank of England (BoE)","Pound","8","13:00"],
        ["Bank of Japan (BoJ)","Yen","8","Varies, often during the Asian session"],
      ]),
      p(`Check a calendar for exact dates and times. They are published well in advance, which is what makes them a risk map.`),
      h("Hawkish and dovish"),
      p(`<b>Hawkish</b> means leaning toward higher rates or tighter policy. <b>Dovish</b> means leaning toward lower rates or easier policy. The statement, the new projections and the press conference all carry tone. The market reacts less to the decision, which is usually expected, than to the tone and any change from what was priced.`),
      h("What a central bank day looks like in candles"),
      table(["Phase","What you see","What to do"],[
        ["<b>Before</b>","Quiet, compressed candles","Mark the range. Stand aside."],
        ["<b>The release</b>","A huge spike with long wicks both ways","Do not trade it."],
        ["<b>The press conference</b>","A second burst, sometimes reversing the first","Stand aside again."],
        ["<b>After</b>","Either a trend day or a return to the old range","Use the release candle's high and low as levels, and wait for a sweep or a retest."],
      ]),
      rule(`Central banks set the tone. Stand aside from the decision and the press conference, then trade the first clean sweep or retest of the release candle's range.`),
      hw(30, `For the next central bank decision on your main currency, write the date and time in CET, the stand-aside windows (the release and the press conference) and the levels you will mark afterwards. After it, screenshot the 15-minute chart and note what happened.`),
    ],
    qs: [
      { k: "mc", q: "When a central bank is expected to raise rates, what often happens to its currency?", o: ["It weakens", "It tends to strengthen, as holding it pays more", "Nothing", "It disappears"], ans: 1, ok: "A tendency.", bad: "Higher return." },
      { k: "mc", q: "What does 'dovish' mean?", o: ["Leaning toward tighter policy", "Leaning toward lower rates or easier policy", "Neutral", "Unscheduled"], ans: 1, ok: "Easier policy.", bad: "Opposite of hawkish." },
      { k: "mc", q: "At what time is a typical Fed decision in CET?", o: ["14:15", "13:00", "20:00", "22:00"], ans: 2, ok: "20:00 CET.", bad: "14:00 New York." },
      { k: "mc", q: "What do you do on a central bank release candle?", o: ["Trade it", "Stand aside and use its high and low as levels afterwards", "Double size", "Remove stops"], ans: 1, ok: "Noise first.", bad: "Wait." },
    ],
  },

  "17-3": {
    goal: "Read an economic calendar, understand surprise against forecast, and plan around the releases that move your markets.",
    blocks: [
      p(`A calendar lists scheduled releases with their time, an impact rating, and three numbers: the <b>previous</b> value, the <b>forecast</b> (the consensus of analysts) and the <b>actual</b> value when it arrives. The market's reaction depends on the actual against the forecast, not against the previous.`),
      table(["Release","What it measures","Typical time (CET)","Moves"],[
        ["US jobs report (non-farm payrolls)","Jobs added, unemployment, wages","14:30, first Friday of the month","USD, gold, US indices"],
        ["US inflation (CPI)","Consumer price changes","14:30, monthly","USD, gold, US indices"],
        ["US retail sales","Consumer spending","14:30, monthly","USD"],
        ["US ISM and flash PMIs","Business activity surveys","15:45 and 16:00","USD, indices"],
        ["Eurozone flash PMIs, German Ifo","Business activity and sentiment","About 10:00","EUR, DAX"],
        ["UK CPI and jobs","Inflation and employment","About 08:00","GBP"],
        ["GDP","Total economic output","Varies","The currency"],
      ]),
      h("Surprise against forecast"),
      p(`If the actual figure is close to the forecast, the move is usually small and the information was already priced in. If it differs a lot, the move can be large. A strong figure for an economy generally supports its currency and a weak figure weighs on it, but the interpretation depends on the rate expectations of the moment. For example, a strong jobs figure can lift the dollar if it supports higher rates, and hit equities if it does the same.`),
      h("The second move"),
      p(`A release often produces a first spike, a retracement, and then a second, more lasting move as participants digest the details. The first candle is the least reliable. The candles from the second quarter-hour onward are the ones to trade, using the release candle's range as your levels.`),
      h("Plan around impact"),
      ol(
        `On Sunday, list the high-impact releases for the week for your instruments, with times in CET.`,
        `Mark the stand-aside window (15 minutes before and after) on your chart or calendar.`,
        `Do not hold a fresh trade through a high-impact release unless your plan allows it.`,
        `After it, wait for a normal-range candle, then apply your setups.`,
        `Journal the release: forecast, actual and the first four 15-minute candles.`,
      ),
      rule(`Read forecast against actual, expect the second move to matter more than the first spike, and plan the stand-aside windows on Sunday.`),
      hw(30, `Build your calendar for next week: list every high-impact release for your two instruments with the time in CET, forecast and previous. Check each afterwards and record the actual and what the candles did.`),
    ],
    qs: [
      { k: "mc", q: "What matters most for a reaction: actual against previous, or actual against forecast?", o: ["Previous", "Forecast", "Neither", "The date"], ans: 1, ok: "Actual against forecast.", bad: "The market prices the forecast." },
      { k: "mc", q: "At what time does the US jobs report arrive in CET?", o: ["10:00", "14:30", "20:00", "08:00"], ans: 1, ok: "14:30 CET.", bad: "08:30 New York." },
      { k: "mc", q: "Which move after a release is usually the least reliable?", o: ["The first spike", "The second quarter-hour onward", "The next day", "None"], ans: 0, ok: "The spike.", bad: "The first candle." },
      { k: "mc", q: "When do you list the week's releases?", o: ["After they happen", "On Sunday, in advance", "Never", "During the release"], ans: 1, ok: "Plan ahead.", bad: "Before." },
    ],
  },

  "17-4": {
    goal: "Read risk sentiment and the dollar's influence, and group correlated positions so you do not double your risk.",
    blocks: [
      p(`Markets often move together because of a shared mood. In a <b>risk-on</b> mood investors buy shares and higher-yielding currencies. In a <b>risk-off</b> mood they sell them and move to safe havens. Knowing the mood helps you understand why several charts do the same thing at once. These are tendencies that change over time, so verify them on your own data.`),
      table(["Mood","Tends to rise","Tends to fall"],[
        ["<b>Risk-on</b>","Stock indices, AUD, NZD, higher-yielding currencies","The yen and Swiss franc, gold (often), government bonds"],
        ["<b>Risk-off</b>","The yen, the Swiss franc, gold, government bonds and often the US dollar","Stock indices, AUD, NZD"],
      ]),
      h("The dollar factor"),
      p(`The US dollar is on one side of most major trades. When it strengthens broadly, EUR/USD, GBP/USD, AUD/USD and gold tend to fall together, and USD/JPY and USD/CHF tend to rise. A long EUR/USD and a long GBP/USD are therefore largely one bet on a weaker dollar. A long EUR/USD and a short USD/JPY are also largely the same bet.`),
      table(["Pairs","Tend to move","Treat as"],[
        ["EUR/USD and GBP/USD","Together","One risk"],
        ["EUR/USD and USD/CHF","In opposite directions","Long both is close to hedged"],
        ["EUR/USD and gold","Often together","Close to one risk"],
        ["AUD/JPY and stock indices","Together in a risk mood","One risk"],
      ]),
      p(`Correlations change. A relationship that held for a year can weaken in weeks. Check by looking at the charts together rather than relying on a table, and do it before you open a second trade.`),
      h("Using another chart for context"),
      p(`The US dollar index (often DXY) is a separate chart of the dollar against a basket of currencies. It is not an indicator on your chart. It is a chart of another market, and reading its structure with the same swing and zone tools can tell you whether the dollar is trending, at a zone or breaking. Use it as a second opinion.`),
      rule(`Group correlated positions as one risk. Check the dollar's chart for context before a USD trade, and never assume a correlation without looking.`),
      hw(25, `For the last month, compare the daily structure of EUR/USD, GBP/USD, USD/JPY and gold. How many days did they move in the direction the dollar tends to imply? Where did they diverge?`),
    ],
    qs: [
      { k: "mc", q: "In a risk-off mood, which tends to rise?", o: ["AUD and NZD", "The yen, the Swiss franc and gold", "Stock indices", "Nothing"], ans: 1, ok: "Safe havens.", bad: "Safe havens." },
      { k: "mc", q: "You are long EUR/USD and consider a long GBP/USD. How should you treat the risk?", o: ["Two independent trades", "Largely one risk on a weaker dollar", "No risk", "A hedge"], ans: 1, ok: "Correlated.", bad: "Both are against the dollar." },
      { k: "mc", q: "Do correlations stay fixed?", o: ["Yes", "No: they change, so check before opening a second trade", "Only for gold", "Only weekly"], ans: 1, ok: "They drift.", bad: "Verify." },
      { k: "mc", q: "Is the dollar index an indicator on your chart?", o: ["Yes", "No: it is a separate chart of another market that you read with the same tools", "Only intraday", "Always"], ans: 1, ok: "Another market.", bad: "Not an indicator." },
    ],
  },

  "17-5": {
    exam: true,
    goal: "Build a one-page weekly macro routine, and complete the module test.",
    blocks: [
      p(`A macro routine should take twenty minutes on Sunday and five minutes each morning. It must not become a research hobby. Its only job is to tell you what to stand aside from and what mood the markets are in.`),
      h("Sunday: the weekly sheet"),
      ol(
        `List the high-impact releases for your instruments, with times in CET, forecasts and previous values.`,
        `Mark the central bank events and press conferences.`,
        `Write one line on the mood: risk-on, risk-off or mixed, from the equity indices and the dollar chart.`,
        `Write one line on the rate story: which central bank is expected to tighten or ease.`,
        `Write one line: <b>What would change my mind?</b> For example, a break of the dollar's last swing low.`,
        `Mark the stand-aside windows on your chart or calendar.`,
      ),
      h("Each morning: five minutes"),
      ol(
        `Check today's releases and times.`,
        `Check overnight moves in the indices and the dollar.`,
        `Update the mood line if it changed.`,
        `Note anything that should lower your size or cancel a setup today.`,
      ),
      h("After each release"),
      p(`Record the forecast, the actual and the first four 15-minute candles in your journal. After a few months you will see how your instruments actually react, which is worth more than any rule of thumb.`),
      hw(25, `Complete the weekly macro sheet for next week with the PDF planner. At the end of the week compare your mood line and your 'what would change my mind' line with what actually happened.`),
    ],
    qs: [
      { k: "mc", ref: "17-1", q: "What is the main job of macro for a candle reader?", o: ["Entries", "A risk map and a mood", "Stops", "Targets"], ans: 1, ok: "Map and mood.", bad: "Context." },
      { k: "mc", ref: "17-2", q: "At what time is the ECB decision in CET?", o: ["13:00", "14:15", "20:00", "22:00"], ans: 1, ok: "14:15 CET.", bad: "Check the table." },
      { k: "mc", ref: "17-2", q: "What do you do on a central bank release candle?", o: ["Trade it", "Stand aside and use its range afterwards", "Double size", "Ignore stops"], ans: 1, ok: "Stand aside.", bad: "Noise first." },
      { k: "mc", ref: "17-3", q: "What matters most for a reaction?", o: ["Actual against previous", "Actual against forecast", "The weather", "The date"], ans: 1, ok: "Forecast.", bad: "Consensus." },
      { k: "mc", ref: "17-3", q: "When do you list the week's releases?", o: ["After", "On Sunday in advance", "During", "Never"], ans: 1, ok: "In advance.", bad: "Plan." },
      { k: "mc", ref: "17-4", q: "Long EUR/USD and long GBP/USD are largely...", o: ["Independent", "One risk on a weaker dollar", "A hedge", "Zero risk"], ans: 1, ok: "Correlated.", bad: "Both against the dollar." },
      { k: "mc", ref: "17-4", q: "In risk-off, which tend to rise?", o: ["Stock indices", "The yen, franc and gold", "AUD", "Nothing"], ans: 1, ok: "Safe havens.", bad: "Safe havens." },
      { k: "mc", ref: "17-5", q: "What is the purpose of the 'what would change my mind' line?", o: ["To predict", "To define in advance what evidence would end your bias", "To decorate", "To skip trades"], ans: 1, ok: "Pre-commitment.", bad: "Decide in advance." },
    ],
  },
};
