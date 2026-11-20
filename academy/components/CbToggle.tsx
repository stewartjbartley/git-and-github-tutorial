"use client";
import { useEffect, useState } from "react";

export function CbToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem("nca-cb") === "1";
      setOn(v);
      document.body.classList.toggle("cb", v);
    } catch {}
  }, []);
  return (
    <button
      className="btn"
      aria-pressed={on}
      title="Swap green and red for blue and orange"
      onClick={() => {
        const v = !on;
        setOn(v);
        document.body.classList.toggle("cb", v);
        try { localStorage.setItem("nca-cb", v ? "1" : "0"); } catch {}
      }}
    >
      Colour-blind palette
    </button>
  );
}
