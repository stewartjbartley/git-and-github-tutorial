import type { Lesson } from "../types";
import { p, h, rule, warn, ol, hw, table } from "./h";

export const M12B: Record<string, Lesson> = {
  "12-2": {
    goal: "Put a price on every trade (spread, commission, slippage and financing) in pips and in R, and plan around the part you cannot avoid.",
    blocks: [
      p(`A chart shows one price. You trade two: you buy at the ask and sell at the bid, and the difference is a cost. On top of that come commission, slippage and financing. Each one takes a little from every trade, and a thin edge can be wiped out by costs alone. The way to see them clearly is to count them in <b>R</b>, the same unit as your results.`),
      h("Spread"),
      p(`The spread is the gap between bid and ask. A long trade enters at the ask but your stop and exit sit on the bid, so the spread is paid immediately. It also changes your reward-to-risk. Suppose you plan a long with a stop of 10 pips and a target of 20 pips (2R) measured on the chart, and the spread is 1 pip. The real risk is 11 pips and the real reward is 19, which is 1.73R.`),
      table(["Spread","10-pip stop","20-pip stop","40-pip stop"],[
        ["<b>0.5 pip</b>","1.86R","1.93R","1.96R"],
        ["<b>1 pip</b>","1.73R","1.86R","1.93R"],
        ["<b>2 pips</b>","1.50R","1.73R","1.86R"],
      ]),
      p(`The table shows the real reward-to-risk of a planned 2R trade. The effect is largest on tight stops and wide spreads, which is the combination in the thin hours at the daily roll and around news. This is one reason the 2R rule has a margin of safety built in.`),
      h("Commission"),
      p(`Some accounts have a very small spread and charge a commission instead, usually per lot per side. As an example, 7 US dollars per lot round trip is roughly 0.7 pip on a US-dollar pair, where one pip on one lot is about 10 dollars. Add it to the spread to get the full cost of a trade. Futures charge exchange and broker commission per contract.`),
      h("Slippage"),
      p(`<b>Slippage</b> is the difference between the price you expected and the price you got. It happens when a market order or a stop order is triggered and the market has moved on before it fills. It is largest at news releases, the cash opens, the daily roll and in gaps. It can also be positive, with a fill better than expected, but traders feel the negative kind far more.`),
      p(`A stop order becomes a market order when triggered. If your planned stop is 11 pips away and it fills 2 pips worse, you lose 13 pips, which is 1.18R. A limit order cannot fill at a worse price, but it may not fill at all.`),
      table(["Order","Slippage","The trade-off"],[
        ["Market order","Possible, either way","You always get in"],
        ["Stop order (entry or stop loss)","Possible, either way, often worse in fast markets","You get in or out when the trigger is hit"],
        ["Limit order","None against you: fills at your price or better","It may never fill"],
      ]),
      ol(
        `Trade in live windows, where liquidity is deepest.`,
        `Stay out of the minutes around high-impact news, as in Module 10.`,
        `Use limit entries (for example a retest) when the setup allows.`,
        `Leave a small buffer beyond the stop for the spread, and size from the stop with that buffer included.`,
        `Record the spread and the slippage on every trade in your journal and look at the average each month.`,
      ),
      h("Financing and other fees"),
      p(`Positions held past the daily roll (23:00 CET on most platforms) pay or earn <b>financing</b>, called swap or rollover, based on interest rate differences for currencies and a daily charge for index CFDs. Many platforms charge three days' swap on Wednesday night to cover the weekend. Day trades closed before the roll avoid it. Other costs to check are currency conversion on your deposits and withdrawals, inactivity fees and market data fees.`),
      h("Costs against your edge"),
      p(`If your edge is 0.2R per trade and the total cost per trade is 0.1R, costs take half of it. That is a good reason to measure them. Add the spread, commission and slippage in pips, convert to money using the pip value, and divide by the money at risk to get the cost in R.`),
      warn(`A backtest that ignores spread, commission and slippage shows results you cannot achieve. Include costs in every backtest from Module 14.`),
      rule(`Count costs in R. The tighter your stop and the thinner your edge, the more costs matter.`),
      hw(30, `For your main instrument, write down the typical spread at 10:00, 16:00 and 23:30 CET. Work out the commission per lot in pips. For your next 20 demo or live trades, record the spread at entry and the slippage on the stop if any. Compute the average cost in R.`),
    ],
    qs: [
      { k: "mc", q: "You plan a long with a 10-pip stop and a 20-pip target on the chart. The spread is 1 pip. What is the real reward-to-risk?", o: ["2.0R", "1.73R", "1.5R", "1.0R"], ans: 1, ok: "Risk is 11 and reward is 19, which is 1.73R.", bad: "The spread adds to risk and takes from reward." },
      { k: "mc", q: "Your planned stop is 11 pips away. It fills 2 pips worse. What is the loss in R?", o: ["1.0R", "1.18R", "2.0R", "0.82R"], ans: 1, ok: "13 divided by 11 is about 1.18R.", bad: "The loss is 13 pips against a plan of 11." },
      { k: "mc", q: "Which order cannot fill at a worse price than you set?", o: ["Market order", "Stop order", "Limit order", "All of them"], ans: 2, ok: "A limit order fills at your price or better, though it may not fill at all.", bad: "Think about which order specifies a price." },
      { k: "mc", q: "Your edge is 0.2R per trade and costs average 0.1R. What fraction of the edge do costs take?", o: ["10%", "25%", "50%", "100%"], ans: 2, ok: "Half of it.", bad: "0.1 divided by 0.2." },
      { k: "mc", q: "When is slippage most likely?", o: ["Quiet mid-session", "At news releases, the cash open and the daily roll", "Only on Mondays", "Never"], ans: 1, ok: "Fast, thin moments.", bad: "Think about when the market moves on before orders fill." },
    ],
  },
};
