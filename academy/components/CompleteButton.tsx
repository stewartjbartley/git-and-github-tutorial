"use client";
import { useState } from "react";

export function CompleteButton({ slug, initial, signedIn }: { slug: string; initial: boolean; signedIn: boolean }) {
  const [done, setDone] = useState(initial);
  const [msg, setMsg] = useState("");
  async function toggle() {
    if (!signedIn) {
      setMsg("Sign in to save your progress.");
      return;
    }
    const next = !done;
    setDone(next);
    const res = await fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, done: next }) });
    if (!res.ok) {
      setDone(!next);
      setMsg("Could not save. Try again.");
    } else setMsg("");
  }
  return (
    <span>
      <button className="btn" aria-pressed={done} onClick={toggle}>{done ? "✓ Lesson complete" : "Mark lesson complete"}</button>
      {msg && <span className="legal" style={{ marginLeft: 8 }}>{msg}</span>}
    </span>
  );
}
