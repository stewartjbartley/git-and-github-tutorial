"use client";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(new URLSearchParams(window.location.search).has("error")); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/auth/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) setState("sent");
    else { setErr(j.error ?? "Something went wrong."); setState("error"); }
  }

  return (
    <main className="wrap">
      <div className="section">
        <h2>Sign in</h2>
        <p>Enter the email you bought with. We send a one-time link that signs you in. There is no password to remember.</p>
        {failed && state === "idle" && <p className="msg err">That link has expired or was already used. Request a new one below.</p>}
        {state === "sent" ? (
          <p className="msg ok">If that email has a purchase, a sign-in link is on its way. It works once and expires in 15 minutes.</p>
        ) : (
          <form className="form" onSubmit={submit}>
            <label className="f">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
            <button className="btn primary big" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Email me a sign-in link"}</button>
            {state === "error" && <p className="msg err">{err}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
