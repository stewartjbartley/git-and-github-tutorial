"use client";
import { useState } from "react";
import { Icon } from "./Icon";

export function CompleteButton({ slug, initial, signedIn }: { slug: string; initial: boolean; signedIn: boolean }) {
  const [done, setDone] = useState(initial);
  const [msg, setMsg] = useState("");
  async function toggle() {
    if (!signedIn) { setMsg("Sign in to save your progress."); return; }
    const next = !done;
    setDone(next);
    const res = await fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, done: next }) });
    if (!res.ok) { setDone(!next); setMsg("Could not save. Try again."); } else setMsg("");
  }
  return (
    <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
      <button className="btn" aria-pressed={done} onClick={toggle}>{done && <Icon name="check" size={16} strokeWidth={2.2} />}{done ? "Completed" : "Mark as complete"}</button>
      {msg && <span className="legal">{msg}</span>}
    </span>
  );
}
