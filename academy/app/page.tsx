import Link from "next/link";
import { chart } from "@/lib/chart";
import { CH } from "@/content/charts";
import { MODULES, COURSE_HOURS, fmtHours, moduleMinutes } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";
import { getPriceLabel } from "@/lib/stripe";
import { DOWNLOADS } from "@/content/downloads";
import { Icon, ModuleIcon, type IconName } from "@/components/Icon";

const TILES: { icon: IconName; title: string; text: string; href?: string; more?: string; from: string; to: string }[] = [
  { icon: "candle", title: "Read any candle", text: "Measure close location, body, wicks and size, then name the candle from its measures instead of a picture.", from: "#30D158", to: "#1FA044" },
  { icon: "pulse", title: "Recognise the signals", text: "Dojis, pin bars, long wicks, sweeps, momentum, and the patterns candles make with their neighbours.", from: "#BF5AF2", to: "#8E3FCC" },
  { icon: "clock", title: "Know when it matters", text: "Sessions, opens, candle close times and news in CET, so every signal gets the weight its hour deserves.", from: "#FF453A", to: "#D1281E" },
  { icon: "target", title: "Plan every trade", text: "Five setups with a trigger, stop and target, a scorecard, sizing, costs, drawdown limits and a journal.", from: "#FF375F", to: "#D01A40" },
  { icon: "calculator", title: "Free calculators", text: "Pip, point, position size and drawdown recovery. They run in your browser and need no account.", href: "/tools", more: "Open the tools", from: "#0A84FF", to: "#0060DF" },
  { icon: "grid", title: "Candle reference chart", text: "Thirty candles and patterns with their names, stories, expectations and confirmation. Free to browse.", href: "/candles", more: "Browse the chart", from: "#FF9F0A", to: "#E07B00" },
];

export default async function Home() {
  const price = await getPriceLabel();
  const lessonCount = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const readyCount = Object.keys(LESSONS).length;

  return (
    <main className="wide">
      <section className="hero">
        <span className="eyebrow"><Icon name="candle" size={14} strokeWidth={2} /> {lessonCount} lessons, about {COURSE_HOURS} hours</span>
        <h1>Read candles without indicators.</h1>
        <p>A complete course on price action for forex, gold and indices: candles, sweeps, sessions in CET, risk and funded accounts.</p>
        <div className="cta-row">
          <Link className="btn primary big" href="/checkout">Get the course{price ? ` for ${price}` : ""}</Link>
          <Link className="link-more" href="/course/1-1">Try a free lesson <Icon name="chevron-right" size={16} strokeWidth={2.2} /></Link>
        </div>
        <div className="stage" aria-hidden="true" dangerouslySetInnerHTML={{ __html: chart(CH.sweepLow, { mini: true, w: 640, h: 190 }) }} />
        <div className="stats">
          <div className="stat"><b>{COURSE_HOURS}</b><span>hours of guided study</span></div>
          <div className="stat"><b>{MODULES.length}</b><span>modules</span></div>
          <div className="stat"><b>{DOWNLOADS.length}</b><span>printable PDFs</span></div>
        </div>
      </section>

      <section className="section">
        <h2>Everything a price-action trader needs.</h2>
        <p>Interactive charts you can click, calculators, quizzes and homework on your own platform. Nothing to install.</p>
        <div className="bento">
          {TILES.map((t) => {
            const inner = (
              <>
                <span className="appicon" style={{ width: 44, height: 44, background: `linear-gradient(160deg, ${t.from}, ${t.to})` }}><Icon name={t.icon} size={24} strokeWidth={1.8} /></span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {t.more && <span className="more">{t.more} <Icon name="chevron-right" size={14} strokeWidth={2.2} /></span>}
              </>
            );
            return t.href ? <Link key={t.title} href={t.href} className="tile">{inner}</Link> : <div key={t.title} className="tile">{inner}</div>;
          })}
        </div>
      </section>

      <section className="section" id="curriculum">
        <h2>The curriculum.</h2>
        <p>{readyCount === lessonCount ? `All ${lessonCount} lessons are written and available now.` : `${readyCount} of ${lessonCount} lessons are ready now. The rest are released in order, and every module is included in the price.`}</p>
        <div className="group" style={{ marginTop: 20 }}>
          {MODULES.map((m) => {
            const ready = m.lessons.every((l) => LESSONS[l.slug]);
            return (
              <details className="mod" key={m.no}>
                <summary>
                  <ModuleIcon no={m.no} size={44} />
                  <span><h3>{m.title}{ready && <span className="badge ready">Ready</span>}</h3><p className="sub">{m.summary}</p></span>
                  <span className="hrs">{fmtHours(moduleMinutes(m))} h</span>
                  <span className="chev"><Icon name="chevron-right" size={18} /></span>
                </summary>
                <ul>
                  {m.lessons.map((l) => (
                    <li key={l.slug}>
                      <span>{l.slug.replace("-", ".")}  {l.title}{LESSONS[l.slug]?.free && <> <span className="badge free">Free</span></>}</span>
                      <span className="m">{l.minutes} min</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      <section className="section prose">
        <h2>How the {COURSE_HOURS} hours are counted.</h2>
        <p>The {COURSE_HOURS} hours are guided study time: reading, interactive exercises, homework on your own charts and practice. They are not {COURSE_HOURS} hours of video. Each lesson shows its estimated minutes, and the homework time is included. The homework is where most of the learning happens.</p>
        <p>The charts in the lessons are teaching charts, built to show each idea cleanly. They are not recordings of past markets. Every lesson sends you to a real chart on your own platform, so the price history you study is your own.</p>
      </section>

      <section className="section">
        <h2>Who it is for.</h2>
        <div className="bento" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          <div className="tile"><h3>It suits you if</h3><p>You trade or want to trade forex, gold or indices, you are tired of indicators that lag, and you will do the homework. No trading experience is required.</p></div>
          <div className="tile"><h3>It does not suit you if</h3><p>You want signals to copy, a promise of profit, or a way to get rich quickly. There are no signals here, and nothing in the course promises results.</p></div>
        </div>
      </section>

      <section className="section" id="pricing">
        <h2 style={{ textAlign: "center" }}>Get the course.</h2>
        <div className="price-card" style={{ marginTop: 20 }}>
          <div className="price">{price ?? "Price at checkout"}</div>
          <p>One payment. Instant access to every module, and to updates to existing lessons.</p>
          <p>All {lessonCount} lessons, the interactive candle builders, session clock, scorecard, calculators and simulators, {DOWNLOADS.length} printable PDFs including a full trading journal, and progress tracking.</p>
          <Link className="btn primary big" href="/checkout" style={{ marginTop: 8 }}>Buy now</Link>
          <p className="fine">You will be asked to confirm that you want immediate access and understand you lose the 14-day right to cancel once access begins. See the <Link href="/legal#refunds">refund and cancellation terms</Link>.</p>
        </div>
      </section>

      <section className="section faq">
        <h2>Questions.</h2>
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
