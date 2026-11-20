import Link from "next/link";
import { getSession } from "@/lib/auth";
import { CbToggle } from "./CbToggle";

export async function SiteBar() {
  let signedIn = false;
  try { signedIn = !!(await getSession()); } catch {}
  return (
    <header className="site-bar">
      <div className="in">
        <Link className="brand" href="/">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><g strokeWidth="1.6" stroke="currentColor" fill="currentColor"><line x1="5" y1="2" x2="5" y2="19"/><rect x="2.5" y="6" width="5" height="8" rx="0.5"/><line x1="12" y1="4" x2="12" y2="20"/><rect x="9.5" y="9" width="5" height="7" rx="0.5" fill="none"/><line x1="19" y1="1" x2="19" y2="15"/><rect x="16.5" y="3" width="5" height="9" rx="0.5"/></g></svg>
          Naked Chart School
        </Link>
        <nav>
          <Link href="/#curriculum">Curriculum</Link>
          <Link href="/course">My course</Link>
          {signedIn ? (
            <form action="/api/auth/logout" method="post"><button className="btn">Sign out</button></form>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
          <CbToggle />
        </nav>
      </div>
    </header>
  );
}
