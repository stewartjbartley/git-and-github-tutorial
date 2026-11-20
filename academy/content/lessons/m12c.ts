import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, table } from "./h";

export const M12C: Record<string, Lesson> = {
  "12-5": {
    goal: "Calculate the gain needed to recover from any drawdown, see why losses are harder to recover than they look, and set limits that keep drawdowns small.",
    blocks: [
      p(`A <b>drawdown</b> is the fall in your account from a peak to a later low, usually shown as a percentage. The <b>maximum drawdown</b> is the largest such fall over a period. Every trader has drawdowns, including the good ones. What decides whether a drawdown is survivable is its size, and the reason is a piece of arithmetic that surprises most people.`),
      h("Why losses are harder to recover than they look"),
      p(`If your account falls by 50%, you do not need a 50% gain to get back. You need 100%. A 10,000 account that loses half is worth 5,000, and doubling 5,000 is the only way back to 10,000. The formula is <b>recovery needed = drawdown divided by (1 minus drawdown)</b>.`),
      table(["Drawdown","Gain needed to recover"],[
        ["10%","11.1%"],["20%","25%"],["30%","42.9%"],["40%","66.7%"],["50%","100%"],["60%","150%"],["70%","233%"],["80%","400%"],["90%","900%"],
      ]),
      p(`The curve is gentle at the start and steep at the end. Down to about 20% the recovery is manageable. Past 30% it is a long, hard climb. Past 50% most accounts do not recover, partly because of the arithmetic and partly because the trader's behaviour changes under that pressure.`),
      { t: "dd" },
      h("How long does recovery take?"),
      p(`A rough estimate uses your expectancy. If your average trade earns E in R and you risk r% of the account per trade, the expected gain per trade is about E times r percent. The number of trades needed to recover is the recovery needed divided by that. A 20% drawdown needs a 25% gain. With an expectancy of 0.2R and 1% risk, each trade is worth about 0.2% on average, so recovery takes roughly 125 trades. At 0.5% risk it takes about 250. The calculator above does the sum for your numbers. It is an estimate: real recoveries are lumpy and compounding changes the figures slightly.`),
      h("How fast drawdowns build"),
      p(`The size of your risk per trade decides how fast a losing streak digs the hole. This table shows the drawdown after a run of consecutive losses.`),
      table(["Risk per trade","5 losses","10 losses","20 losses"],[
        ["1%","4.9%","9.6%","18.2%"],
        ["2%","9.6%","18.3%","33.2%"],
        ["5%","22.6%","40.1%","64.2%"],
      ]),
      p(`With 1% risk, even twenty losses in a row leave you in a recoverable position. With 5% risk, ten losses is a 40% drawdown that needs a two-thirds gain to repair. Losing streaks of five to ten are normal for a strategy with a win rate near 40%, so the table is a picture of what normal looks like at each risk level.`),
      h("Controls"),
      ol(
        `<b>Fixed small risk per trade.</b> 0.5% to 1% while you are learning. The table is the reason.`,
        `<b>Daily and weekly loss limits.</b> For example 2% a day and 5% a week. Hit one and you stop.`,
        `<b>A step-down rule.</b> Write in advance what you do at each drawdown level. For example: at 5% below the peak, halve your risk per trade. At 10%, stop for a week, review every trade, and restart at half size.`,
        `<b>No catch-up trades.</b> Do not raise risk to recover faster. A 20% drawdown at 1% risk is about 125 trades of work. Raising risk to 4% to shorten that means four losses in a row cost a further 15%.`,
        `<b>Measure the worst drawdown in your data</b> from the journal or backtest and plan for roughly twice it. The worst drawdown has not happened yet.`,
      ),
      warn(`Risk of ruin is the chance of losing enough that you can no longer trade. It rises quickly as risk per trade rises, and it is the one risk that no edge can offset, because a ruined account has nothing left to apply the edge to.`),
      p(`Funded-account firms put hard limits on drawdown, as you will see in Module 15. A breach of the maximum drawdown ends the account, however good the strategy. The sizing discipline you build here is what keeps you inside those limits.`),
      rule(`Small losses are cheap to recover. A 50% loss needs a 100% gain. Keep risk per trade small, write your drawdown limits in advance, and never raise risk to catch up.`),
      hw(30, `Using your journal or backtest, find the largest drawdown in R and convert it to a percentage at your planned risk per trade. Work out the gain needed to recover and the number of trades that would take at your expectancy. Write your step-down rule in three lines.`),
    ],
    qs: [
      { k: "mc", q: "An account falls by 50%. What gain is needed to get back to the starting balance?", o: ["25%", "50%", "100%", "150%"], ans: 2, ok: "10,000 falls to 5,000, and doubling 5,000 is a 100% gain.", bad: "Recovery needed is drawdown divided by (1 minus drawdown)." },
      { k: "mc", q: "A 20% drawdown needs what gain to recover?", o: ["20%", "25%", "30%", "40%"], ans: 1, ok: "0.2 divided by 0.8 is 25%.", bad: "Use drawdown divided by (1 minus drawdown)." },
      { k: "mc", q: "Expectancy 0.2R, risk 0.5% per trade, a 20% drawdown. Roughly how many trades to recover?", o: ["25", "125", "250", "500"], ans: 2, ok: "Recovery 25% divided by (0.2 x 0.5%) = 0.1% per trade gives 250 trades.", bad: "Recovery needed divided by gain per trade." },
      { k: "mc", q: "What is the drawdown after 10 losses in a row at 2% risk per trade?", o: ["About 10%", "About 18%", "About 20%", "About 40%"], ans: 1, ok: "1 minus 0.98 to the power 10 is about 18.3%.", bad: "Compounding: the account shrinks by 2% each loss." },
      { k: "mc", q: "You are in a 20% drawdown. What is the correct response to the temptation to recover quickly?", o: ["Raise risk per trade", "Keep or reduce risk and follow your step-down rule", "Trade more often", "Remove your stops"], ans: 1, ok: "Raising risk raises the chance of a deeper hole.", bad: "Never raise risk to catch up." },
    ],
  },

  "12-8": {
    goal: "Explain what a trading plan is, how it works before, during and after a trade, and the benefits it gives you.",
    blocks: [
      p(`A <b>trading plan</b> is a written set of rules and numbers that tells you what you trade, when you trade, how big you trade, when you exit and when you stop. It is a procedure, not a prediction. It does not say where price will go. It says what you will do, whatever price does.`),
      p(`Compare it with a checklist. Pilots and surgeons use checklists because the stakes are high and people under pressure forget steps and make emotional decisions. A trading plan does the same job for a trader. It is written when you are calm, and it is read when you are not.`),
      h("How it works"),
      table(["Stage","What the plan answers"],[
        ["<b>Before</b>","Which instruments and hours? What is today's bias, which levels are marked, which news is due? Which setups am I allowed to take?"],
        ["<b>During</b>","What is the trigger, stop and target? How big is the position? What is the exit rule if the idea fails? When do I move a stop? What stops me from taking a third trade today?"],
        ["<b>After</b>","What do I record? When do I review? What counts as a good trade (one that followed the plan)? What do I change, and when?"],
      ]),
      p(`The plan works through <b>if-then</b> rules. If price sweeps the Asian low and the candle closes back inside, then I buy at the close with a stop beyond the sweep, risking 0.5%. If I lose two trades in a day, then I stop. If it is 14:25 CET on a data day, then I do not enter. Each rule removes a decision that you would otherwise make in the middle of a trade.`),
      h("Why you need one"),
      ol(
        `<b>Decisions are made calmly, in advance.</b> The worst decisions are made with money at stake and adrenaline in the blood.`,
        `<b>Results become measurable.</b> You cannot test a strategy you did not define. A plan turns your trading into a repeatable procedure whose results mean something.`,
        `<b>It prevents the classic damage.</b> Overtrading, revenge trading, moving stops, oversizing after a win and chasing missed trades are all rule breaches, and a plan names them.`,
        `<b>It makes risk limits real.</b> A daily loss limit that exists only in your head disappears when you need it.`,
        `<b>It speeds up learning.</b> When you change one rule and track the result, you learn what works. When you improvise, every trade is a different experiment.`,
        `<b>It tells you when to stop.</b> Limits on losses, hours and number of trades are in the plan.`,
        `<b>It fits the rules of funded accounts and brokers.</b> Consistent behaviour is easier to keep inside a daily loss limit.`,
      ),
      table(["Situation","Without a plan","With a plan"],[
        ["A trade hits the stop","Move it, hope, or add to the position","Accept the 1R loss, journal it"],
        ["Two losses in a row","Look for a trade to win it back","The daily limit says stop"],
        ["A big winning day","Increase size because you feel good","Size is fixed by rule"],
        ["A quiet hour","Take a low-grade signal out of boredom","Score under 5 means no trade"],
        ["News due in five minutes","Hold and hope","The stand-aside window applies"],
      ]),
      h("What a plan is not"),
      p(`It is not a forecast of the market. It is not a guarantee of profit. It is not fixed for ever. And it is not long: one page is enough, because a plan you will not read is a plan you will not follow.`),
      h("When to change it"),
      p(`Change a plan only after reviewing enough trades to see a pattern, such as 50 trades or a month. Change one rule at a time, write the date and the reason, and track the result. Never change a rule in the middle of a trade or a losing streak, because that is exactly when your judgement is worst. Keep old versions, so that you can compare the results of each.`),
      rule(`A trading plan is a written procedure of if-then rules, made when calm and used when not. It does not predict the market. It controls what you do.`),
      hw(25, `Write ten if-then rules for your own trading, covering a setup trigger, a stop, a target, a news rule, a loss limit, a size rule, a missed trade, a bad hour, a winning streak and a losing streak. Do not copy rules. Write the ones you will actually follow. The next lesson turns them into your one-page plan.`),
    ],
    qs: [
      { k: "mc", q: "Which best describes a trading plan?", o: ["A prediction of where price will go", "A written set of if-then rules for what you do, whatever price does", "A list of favourite indicators", "A set of profit targets"], ans: 1, ok: "It controls your behaviour, not the market.", bad: "A plan is a procedure." },
      { k: "mc", q: "Why must a plan be written when you are calm?", o: ["It looks better", "The worst decisions are made with money at stake, so the rules must exist before you are under pressure", "It is required by brokers", "It is shorter"], ans: 1, ok: "Rules made calmly beat decisions made in the moment.", bad: "Think about when decisions are made." },
      { k: "mc", q: "You have lost two trades today and your plan says stop after two losses. What do you do?", o: ["Keep looking for a winner", "Stop for the day and journal", "Double the next trade", "Remove the rule"], ans: 1, ok: "The plan exists for exactly this moment.", bad: "Follow the limit." },
      { k: "mc", q: "When should you change a plan?", o: ["In the middle of a losing streak", "After reviewing enough trades, one rule at a time, with the date and reason recorded", "After every trade", "Never"], ans: 1, ok: "Evidence first, one change at a time.", bad: "Changing under pressure is the problem." },
      { k: "mc", q: "How is a good trade defined under a plan?", o: ["One that made money", "One that followed the plan, whatever the result", "One that was exciting", "One that was large"], ans: 1, ok: "Process, not outcome.", bad: "A good trade followed the rules." },
    ],
  },
};
