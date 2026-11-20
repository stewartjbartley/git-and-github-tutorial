import Link from "next/link";
import { PipCalc, PointCalc } from "@/components/Tools";
import { Calc, DrawdownCalc } from "@/components/Widgets";

export const metadata = {
  title: "Free trading calculators",
  description: "Pip calculator, point calculator, position size and drawdown recovery calculators for forex, indices, futures and gold.",
};

export default function ToolsPage() {
  return (
    <main className="wide">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <h1>Free trading calculators</h1>
        <p>Four calculators from the Naked Chart School course. They run in your browser and store nothing.</p>
      </section>
      <section className="section"><h2>Pip calculator (forex)</h2><p>Pips moved, pip value in your account currency, profit or loss, and the position size for a given risk and stop.</p><PipCalc /></section>
      <section className="section"><h2>Point calculator (indices, futures, gold)</h2><p>Points moved, profit or loss and contracts for a given risk and stop, with the standard values for common contracts.</p><PointCalc /></section>
      <section className="section"><h2>Position size from risk</h2><p>The simple version for any market where you know the value of one pip or point.</p><Calc /></section>
      <section className="section"><h2>Drawdown and recovery</h2><p>The gain needed to recover from a loss, and a rough number of trades to do it.</p><DrawdownCalc /></section>
      <p className="legal" style={{ margin: "32px 0" }}>Calculators are aids, not advice. Check results against your broker&apos;s contract specification and use live conversion rates. <Link href="/">Back to the course</Link>.</p>
    </main>
  );
}
