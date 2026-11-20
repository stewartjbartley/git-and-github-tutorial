import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, table } from "./h";

export const M1C: Record<string, Lesson> = {
  "1-6": {
    goal: "Compare scalping, day trading, swing trading and position trading, know the risks and advantages of each, and choose the style that fits your life.",
    blocks: [
      p(`A trading style is the answer to two questions: how long do you hold a trade, and how often do you trade? It is not a personality label. Each style is a set of trade-offs in time, cost, stress, risk and opportunity. Choosing one that does not fit your schedule or your temperament is a common reason people with good skills still fail.`),
      table(["Style","Typical holding time","Chart timeframes","Trades","Typical stop on EUR/USD (indicative)"],[
        ["<b>Scalping</b>","Seconds to minutes","1-minute to 5-minute","Many per day, sometimes dozens","3 to 10 pips"],
        ["<b>Day trading</b>","Minutes to hours, flat by the end of the day","5-minute to 1-hour, with the 4-hour for context","One to five per day","10 to 30 pips"],
        ["<b>Swing trading</b>","Days to a few weeks","4-hour to Daily","A few per week","40 to 150 pips"],
        ["<b>Position trading</b>","Weeks to months","Daily to Weekly","A few per month or year","150 pips or more"],
      ]),
      p(`The stop sizes are a guide for a major currency pair, not a rule. They show the pattern: the longer you hold, the wider the stop and the smaller the position you can take for the same risk.`),
      h("Advantages and risks"),
      table(["Style","Advantages","Risks"],[
        ["<b>Scalping</b>","Many trades, so you collect data and feedback quickly. Small stops. No overnight positions. Can fit short windows.","Costs dominate, because spread and commission are large against a tiny stop. Slippage hurts more. It demands constant attention and fast decisions, which favours overtrading and stress. Some brokers and prop firms restrict it."],
        ["<b>Day trading</b>","No overnight gap or financing risk. The day has a clear structure: Asia, London, New York. It is the style this course fits best. A moderate number of trades.","You must be at the screen in the live windows. News and the opens are hazards. Overtrading is easy because there is always another candle."],
        ["<b>Swing trading</b>","Fits around a job: you can check charts a few times a day. Spread and commission are negligible against wide stops. Larger R per trade. Less noise.","Overnight and weekend gap risk. Financing charges. Wide stops mean small positions. Fewer trades, so it takes longer to learn and drawdowns last longer."],
        ["<b>Position trading</b>","Least time at the screen. Aims at large trends. Low costs.","Long stretches of drawdown. Macro and gap risk. Capital is tied up. Very few trades to test your edge on."],
      ]),
      h("The cost difference in numbers"),
      p(`Costs eat a tight stop. The table shows the real reward-to-risk of a planned 2R trade when the spread is 1 pip, using the formula from the costs lesson.`),
      table(["Stop size","Style it suggests","Real reward-to-risk after a 1-pip spread"],[
        ["5 pips","Scalping","1.50R"],
        ["10 pips","Fast day trading","1.73R"],
        ["20 pips","Day trading","1.86R"],
        ["100 pips","Swing trading","1.97R"],
      ]),
      p(`A scalper with a 1.5R real ratio needs a much higher win rate than a swing trader with 1.97R to earn the same expectancy. That is one reason many learners find scalping harder than it looks, and why this course does not teach it.`),
      h("Which style does this course teach?"),
      p(`The lessons use the 4-hour and 1-hour charts for context and setup and the 15-minute chart for timing. That is an <b>intraday approach</b> with a natural extension to <b>short swing</b> trades when a 4-hour setup is held for a day or two. Scalping on tick or 1-minute charts and long position trading are outside the course. Most of the setups work in both the intraday and short-swing versions, and the stop size and position size change accordingly.`),
      h("How to choose"),
      ol(
        `<b>Time.</b> Which CET windows can you actually sit in front of a chart? If you work 09:00 to 18:00, intraday London trading is hard, and 4-hour swing setups checked in the evening are realistic.`,
        `<b>Account size.</b> A wide swing stop needs a small position for the same risk. Risking 1% of a 5,000 account is 50, and a 100-pip stop on EUR/USD at 10 per pip per lot gives a size of 0.05 lots. Check that your broker allows that size.`,
        `<b>Temperament.</b> If you hate waiting, swing trading will test you. If you hate fast decisions, scalping will.`,
        `<b>Costs and broker.</b> Tight stops need tight spreads and good execution. Check your broker's rules on scalping.`,
        `<b>Sleep and life.</b> Holding positions overnight and over a weekend carries risk you cannot manage while asleep. Decide whether you accept that.`,
      ),
      warn(`Do not choose a style because of a screenshot of someone else's profits. Choose the one you can follow every day, with the costs and the time you actually have.`),
      rule(`Pick the style that fits your schedule, your account and your temperament first. Then pick your instruments, then your setups.`),
      hw(25, `Write a one-paragraph style statement: the CET windows you can trade, the timeframes you will use for context, setup and trigger, your maximum trades per day, your typical stop in pips and your typical holding time. Then work out the real reward-to-risk of a planned 2R trade for your typical stop and spread.`),
    ],
    qs: [
      { k: "mc", q: "A planned 2R scalp has a 5-pip stop and a 1-pip spread. What is the real reward-to-risk?", o: ["2.0R", "1.5R", "1.0R", "2.5R"], ans: 1, ok: "Risk 6 and reward 9, which is 1.5R.", bad: "The spread adds to risk and takes from reward." },
      { k: "mc", q: "Which style carries the most overnight and weekend gap risk?", o: ["Scalping", "Day trading", "Swing and position trading", "None"], ans: 2, ok: "They hold positions past the daily close.", bad: "Day traders are flat by the end of the day." },
      { k: "mc", q: "Why does this course not teach tick or 1-minute scalping?", o: ["It is illegal", "Costs dominate tiny stops, and the decisions are too fast to learn reliably from price action alone", "It never works", "Brokers forbid it"], ans: 1, ok: "The cost and speed make it a harder starting point.", bad: "Think about costs against a 5-pip stop." },
      { k: "mc", q: "You work 09:00 to 18:00 CET and can check charts in the evening. Which style is the most realistic?", o: ["Scalping the London open", "Swing setups on the 4-hour chart", "Trading the US open from your desk", "Position trading on the weekly chart only"], ans: 1, ok: "It fits the time you have.", bad: "Match the style to your available windows." },
      { k: "mc", q: "A 100-pip stop, 1% risk on a 5,000 account, and 10 per pip per lot. What size?", o: ["0.05 lots", "0.5 lots", "1 lot", "0.005 lots"], ans: 0, ok: "50 divided by (100 times 10) is 0.05 lots.", bad: "Money at risk divided by stop times pip value." },
    ],
  },
};
