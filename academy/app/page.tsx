import Link from "next/link";
import { chart } from "@/lib/chart";
import { CH } from "@/content/charts";
import { MODULES, COURSE_HOURS, fmtHours, moduleMinutes } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";
import { getPriceLabel } from "@/lib/stripe";

export default async function Home() {
  const price = await getPriceLabel();
  const lessonCount = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const readyCount = Object.keys(LESSONS).length;
  const readyMods = MODULES.filter((m) => m.lessons.every((l) => LESSONS[l.slug])).map((m) => m.no);

  return (
    <main className="wide">
      <section className="hero">
        <h1>Read candles without indicators</h1>
        <p>A {COURSE_HOURS}-hour course on price action for forex, gold and stock indices, including how spot, CFD and futures products differ, how prop-firm rules work, and a full printable trading journal. You learn what each candle says, how candles talk to each other, when they matter in the day (in CET), and how to turn every signal into a plan with an entry, a stop and a target.</p>
        <div className="cta-row">
          <Link className="btn primary big" href="/checkout">Get the course{price ? ` for ${price}` : ""}</Link>
          <Link className="btn big" href="/course/1-1">Try a free lesson</Link>
        </div>
        <div className="strip" aria-hidden="true" dangerouslySetInnerHTML={{ __html: chart(CH.sweepLow, { mini: true, w: 520, h: 120 }) }} />
        <div className="stats">
          <span><b>About {COURSE_HOURS}</b> hours of guided study</span>
          <span><b>{MODULES.length}</b> modules</span>
          <span><b>{lessonCount}</b> lessons</span>
          <span>Interactive charts, quizzes and homework on your own platform</span>
        </div>
      </section>

      <section className="section">
        <h2>What you will be able to do</h2>
        <div className="cols">
          <div className="panel"><h3>Read any candle</h3><p>Measure close location, body, wicks and size, then name the candle from its measures instead of a picture.</p></div>
          <div className="panel"><h3>Recognise the signals</h3><p>Dojis, pin bars, long wicks, sweep candles, momentum candles and the patterns candles make with their neighbours.</p></div>
          <div className="panel"><h3>Know when they matter</h3><p>Sessions, opens, candle close times and news in CET, so you give a signal the weight its hour deserves.</p></div>
          <div className="panel"><h3>Plan every trade</h3><p>Five setups with a trigger, a stop and a target, a scorecard to grade each signal, position sizing, trading costs and slippage, a journal, and how funded-account rules fit.</p></div>
        </div>
      </section>

      <section className="section prose">
        <h2>How the {COURSE_HOURS} hours are counted</h2>
        <p>The {COURSE_HOURS} hours are guided study time: reading, interactive exercises, homework on your own charts and practice. They are not {COURSE_HOURS} hours of video. Each lesson shows its estimated minutes, and the homework time is included. The homework is where most of the learning happens, and it is the part that turns the lessons into a skill you can use.</p>
        <p>The charts in the lessons are teaching charts, built to show each idea cleanly. They are not recordings of past markets. Every lesson sends you to a real chart on your own platform, so the real price history you study is your own.</p>
      </section>

      <section className="section" id="curriculum">
        <h2>The curriculum</h2>
        <p>{readyCount === lessonCount ? `All ${lessonCount} lessons are written and available now.` : `${readyCount} of ${lessonCount} lessons are ready now, in ${readyMods.length} of ${MODULES.length} modules (marked Ready below). The rest are released in order, and every module is included in the price.`}</p>
        <div style={{ marginTop: 16 }}>
          {MODULES.map((m) => {
            const ready = m.lessons.every((l) => LESSONS[l.slug]);
            return (
              <details className="mod" key={m.no}>
                <summary>
                  <span className="no">{m.no}</span>
                  <span><h3>{m.title}{ready && <span className="badge ready">Ready</span>}</h3><p className="sub">{m.summary}</p></span>
                  <span className="hrs">{fmtHours(moduleMinutes(m))} h</span>
                </summary>
                <ul>
                  {m.lessons.map((l) => (
                    <li key={l.slug}>
                      <span>{l.slug.replace("-", ".")} {l.title}{LESSONS[l.slug]?.free && <span className="badge free">Free</span>}</span>
                      <span className="m">{l.minutes} min</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>Who it is for</h2>
        <div className="cols">
          <div className="panel"><h3>It suits you if</h3><p>You trade or want to trade forex, gold or indices, you are tired of indicators that lag, and you will do the homework. No trading experience is required.</p></div>
          <div className="panel"><h3>It does not suit you if</h3><p>You want signals to copy, a promise of profit, or a way to get rich quickly. There are no signals here, and nothing in the course promises results.</p></div>
        </div>
      </section>

      <section className="section" id="pricing">
        <h2>Get the course</h2>
        <div className="price-card">
          <div className="price">{price ?? "Price set at checkout"}</div>
          <p>One payment. Instant access to every module as it is released, and to updates to existing lessons.</p>
          <p>Includes all {lessonCount} lessons, the interactive candle builders, the session clock, the scorecard, the position-size, drawdown and prop-firm simulators, twelve printable PDFs including a full trading journal and a candlestick reference chart, free-standing calculators, and progress tracking.</p>
          <Link className="btn primary big" href="/checkout">Buy now</Link>
          <p className="fine" style={{ marginTop: 12 }}>You will be asked to confirm that you want immediate access and understand you lose the 14-day right to cancel once access begins. See the <Link href="/legal#refunds">refund and cancellation terms</Link>.</p>
        </div>
      </section>

      <section className="section faq">
        <h2>Questions</h2>
        <details><summary>Do I need trading experience?</summary><p>No. Module 1 starts from what a price is. A basic comfort with numbers helps, and the homework asks you to measure candles in pips.</p></details>
        <details><summary>Which platform do I need?</summary><p>Any charting platform. The set-up lesson uses TradingView terms, and the same ideas work in MetaTrader 5 or cTrader. A free account is enough to do the homework.</p></details>
        <details><summary>Does it include trade signals or a mentoring group?</summary><p>No. It teaches you to read price and measure your own results. There are no signals and no calls.</p></details>
        <details><summary>Is this financial advice?</summary><p>No. It is education. Nothing in the course is a recommendation to buy or sell any instrument, and trading leveraged products can lose you more than you expect.</p></details>
        <details><summary>Why are times given in CET?</summary><p>The course is written for traders in Spain and across Central Europe, so every session, open and news time is in CET and the lessons tell you how to check your platform&apos;s clock.</p></details>
        <details><summary>How do I sign in?</summary><p>With your email and a one-time link. There is no password.</p></details>
      </section>
    </main>
  );
}
