import type { Lesson } from "../types";
import { p, h, rule, warn, hw, table } from "./h";

export const M1B: Record<string, Lesson> = {
  "1-3": {
    goal: "Tell spot, CFD and futures prices apart, know what each does to a chart, and read a contract specification before you size a trade.",
    blocks: [
      p(`Two traders can look at the same market and see slightly different charts, with different costs, different hours and different rules. The reason is that you do not trade "the DAX" or "gold" or "EUR/USD" directly. You trade a <b>product</b> that tracks it, and the product decides how the chart behaves. There are three you will meet.`),
      table(["","Spot (forex, spot gold)","CFD (contract for difference)","Futures"],[
        ["<b>What it is</b>","An over-the-counter price quoted by banks and brokers. There is no central exchange.","A contract with your broker that pays the difference in price. You never own the asset.","A standardised contract traded on an exchange, for a set quantity and a set expiry date."],
        ["<b>Volume</b>","No true volume. Platforms show tick volume only.","None. It is the broker's price.","Real volume and a central order book."],
        ["<b>Expiry</b>","None. Held overnight with a financing charge or credit.","None for spot-based CFDs. CFDs built on futures roll to the next contract.","Fixed. The contract expires and you roll to the next one."],
        ["<b>Hours</b>","About 24 hours, Monday to Friday.","Follows the underlying, often near 24 hours.","Near 24 hours with a short daily break."],
        ["<b>Costs</b>","Spread, sometimes commission, overnight financing.","Spread, sometimes commission, overnight financing.","Exchange and broker commission, plus the bid and ask on the order book."],
        ["<b>Rules for EU retail clients</b>","Regulated by the broker's regulator.","ESMA leverage caps, margin close-out and negative balance protection.","Exchange rules and broker margin. The ESMA CFD limits do not apply."],
      ]),
      h("Indices: cash, CFD and futures are three different prices"),
      p(`A stock index such as the DAX is a calculation made from its member companies' share prices, published while the stock exchange is open. That is the <b>cash index</b>. It trades from 09:00 to 17:30 CET and it is closed overnight. A <b>futures</b> contract on the same index trades almost around the clock and carries a small premium or discount to the cash price. A <b>CFD</b> on the index usually follows the futures price outside cash hours and the cash price during them, depending on the broker.`),
      p(`This is why one trader sees a big gap at 09:00 and another sees a smooth line. They are looking at different products. In the gap lesson in Module 10, always check which product your chart is built on.`),
      h("Commodities"),
      p(`Gold can be traded as spot (XAU/USD, over the counter) or as a futures contract on an exchange. Oil, silver, natural gas and agricultural products are mostly traded through futures, and a CFD on them follows a futures contract that rolls on a schedule. Commodities also have their own clocks. Oil inventory reports, for example, arrive on a fixed weekday, and gold is most active when New York is open.`),
      h("Futures contracts and what a point is worth"),
      p(`Futures have a fixed contract size and a fixed <b>tick</b>, the smallest allowed price move, with a fixed money value. Here are some widely used contracts. Specifications change, so always check the exchange's current page before you trade.`),
      table(["Contract","Value of 1 point","Tick","Notes"],[
        ["E-mini S&amp;P 500 (ES)","50 US dollars","0.25 = 12.50 dollars","The standard US index contract."],
        ["Micro E-mini S&amp;P 500 (MES)","5 US dollars","0.25 = 1.25 dollars","One tenth of the E-mini."],
        ["DAX future (FDAX)","25 euros","0.5 = 12.50 euros","The standard DAX contract."],
        ["Mini-DAX future (FDXM)","5 euros","1 = 5 euros","One fifth of the FDAX."],
        ["Gold future (GC)","100 US dollars per 1 dollar move","0.10 = 10 dollars","100 troy ounces."],
        ["Micro gold future (MGC)","10 US dollars per 1 dollar move","0.10 = 1 dollar","10 troy ounces."],
      ]),
      p(`The sizing method from Module 12 does not change. Money at risk divided by (stop in points times value per point) gives the number of contracts. With the E-mini, a 4-point stop is 200 dollars of risk on a single contract. With the micro, the same stop is 20 dollars. Many retail traders start with micros for exactly this reason.`),
      h("Rolls and gaps on futures charts"),
      p(`A futures contract expires, so the exchange lists the next one, and traders move ("roll") their positions across. On a continuous chart, which stitches contracts together, the join can show a gap that is only the price difference between two contracts. Nobody traded that move. Do not read a roll gap as a signal. Check the roll dates and mark them on your chart.`),
      warn(`EU CFD accounts come with a leverage cap, margin close-out rules and negative balance protection under ESMA rules. Futures accounts work under different rules. Margin is set by the exchange and broker, and in some cases you can lose more than you deposit. Check your broker's terms before you choose a product.`),
      p(`This course teaches price action that applies to all three products. The lessons use CFD and spot prices, because that is what most retail traders in Europe use. If you trade futures, read the same candles, use the contract specification for sizing, and watch for rolls.`),
      rule(`Know which product your chart is built on. The product decides your hours, costs, gaps, volume and the rules that protect you.`),
      hw(30, `Pick the product you will trade for each of your two instruments (spot, CFD or futures). Record its contract specification: size, tick, value per point, margin, hours in CET and expiry or roll dates. If it is a futures contract, mark the next two roll dates on your chart.`),
    ],
    qs: [
      { k: "mc", q: "An E-mini S&P 500 contract is worth 50 dollars per point. The index falls 4 points against your long position. What is the loss on one contract?", o: ["4 dollars", "50 dollars", "200 dollars", "2,000 dollars"], ans: 2, ok: "4 points times 50 dollars is 200 dollars.", bad: "Points times the value per point." },
      { k: "mc", q: "A DAX future is worth 25 euros per point. A 20-point stop on one contract risks how much?", o: ["20 euros", "250 euros", "500 euros", "5,000 euros"], ans: 2, ok: "20 times 25 is 500 euros.", bad: "Multiply the points by the value per point." },
      { k: "mc", q: "On a continuous futures chart you see a gap at the contract roll. What is it?", o: ["A strong breakout signal", "Often just the price difference between two contracts, not a move anyone traded", "A news candle", "A sweep"], ans: 1, ok: "Do not read a roll gap as a signal.", bad: "The chart stitches two contracts together." },
      { k: "mc", q: "Which product has real traded volume on a central order book?", o: ["Spot forex", "A CFD", "A futures contract", "None of them"], ans: 2, ok: "Futures trade on an exchange.", bad: "Think about where the order book lives." },
      { k: "mc", q: "Why might one trader see a large 09:00 gap on the DAX and another see none?", o: ["One chart is wrong", "They are looking at different products, such as cash and a CFD that tracks futures overnight", "Gaps are random", "Brokers add gaps"], ans: 1, ok: "The product decides the gap.", bad: "Cash, futures and CFD prices differ." },
    ],
  },
};
