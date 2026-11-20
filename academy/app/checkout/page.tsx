"use client";
import { useState } from "react";

export default function Checkout() {
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [waive, setWaive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, acceptTerms: terms, waiveWithdrawal: waive }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok && j.url) window.location.href = j.url;
    else { setErr(j.error ?? "Could not start checkout."); setBusy(false); }
  }

  return (
    <main className="wrap">
      <div className="section">
        <h2>Get the course</h2>
        <p>Use the email you want your account on. After payment we email you a sign-in link.</p>
        <form className="form" onSubmit={submit}>
          <label className="f">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <label className="check"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /><span>I have read and accept the <a href="/legal#terms" target="_blank">terms</a>, the <a href="/legal#privacy" target="_blank">privacy notice</a> and the <a href="/legal#risk" target="_blank">risk warning</a>. I understand this course is education and not financial advice.</span></label>
          <label className="check"><input type="checkbox" checked={waive} onChange={(e) => setWaive(e.target.checked)} /><span>I ask for immediate access to the digital content. I understand that once access begins I lose my right to cancel within 14 days.</span></label>
          <button className="btn primary big" disabled={busy || !email || !terms || !waive}>{busy ? "Opening secure checkout..." : "Continue to payment"}</button>
          {err && <p className="msg err">{err}</p>}
        </form>
      </div>
    </main>
  );
}
