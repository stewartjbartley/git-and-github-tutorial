"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";

const LINKS: [string, string, IconName][] = [
  ["/course", "My course", "book"],
  ["/candles", "Candle chart", "candle"],
  ["/tools", "Free tools", "calculator"],
  ["/course/downloads", "Downloads", "download"],
];

export function NavBar({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [cb, setCb] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    try {
      const v = localStorage.getItem("nca-cb") === "1";
      setCb(v);
      document.body.classList.toggle("cb", v);
    } catch {}
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function toggleCb() {
    const v = !cb;
    setCb(v);
    document.body.classList.toggle("cb", v);
    try { localStorage.setItem("nca-cb", v ? "1" : "0"); } catch {}
  }

  return (
    <>
    <header className="nav">
      <div className="nav-in">
        <Link className="brand" href="/" aria-label="Naked Chart School home">
          <span className="brand-mark"><Icon name="candle" size={16} strokeWidth={2} /></span>
          <span className="brand-name">Naked Chart School</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="nav-right">
          <button className="icon-btn" aria-pressed={cb} aria-label="Colour-blind palette" title="Colour-blind palette: swaps green and red for blue and orange" onClick={toggleCb}>
            <Icon name="eye" size={18} />
          </button>
          {signedIn ? (
            <form action="/api/auth/logout" method="post"><button className="nav-pill">Sign out</button></form>
          ) : (
            <Link className="nav-pill primary" href="/login">Sign in</Link>
          )}
          <button className="icon-btn menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name={open ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>
    </header>
      {open && (
        <div className="sheet" role="dialog" aria-label="Menu">
          <Link href="/" className="sheet-row"><Icon name="globe" size={20} /><span>Home</span><Icon name="chevron-right" size={16} /></Link>
          <Link href="/#curriculum" className="sheet-row"><Icon name="list" size={20} /><span>Curriculum</span><Icon name="chevron-right" size={16} /></Link>
          {LINKS.map(([href, label, icon]) => (
            <Link key={href} href={href} className="sheet-row"><Icon name={icon} size={20} /><span>{label}</span><Icon name="chevron-right" size={16} /></Link>
          ))}
          <Link href={signedIn ? "/course" : "/login"} className="sheet-row"><Icon name="user" size={20} /><span>{signedIn ? "Account" : "Sign in"}</span><Icon name="chevron-right" size={16} /></Link>
        </div>
      )}
    </>
  );
}
