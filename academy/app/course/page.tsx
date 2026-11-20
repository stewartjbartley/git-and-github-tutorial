import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, hasAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { MODULES, COURSE_MINUTES, fmtHours, moduleMinutes } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";

export const metadata = { title: "My course" };

export default async function Dashboard() {
  const s = await getSession();
  if (!s) redirect("/login");
  const access = await hasAccess(s.email);
  const done = new Set((await db.lessonProgress.findMany({ where: { userId: s.userId } })).map((p) => p.lessonSlug));
  const written = Object.keys(LESSONS);
  const doneN = written.filter((k) => done.has(k)).length;
  const pct = written.length ? Math.round((doneN / written.length) * 100) : 0;

  return (
    <main className="wrap">
      <div className="dash-h">
        <h1>My course</h1>
        <p className="legal">{s.email}</p>
        {!access && <div className="paywall"><p><b>You do not have access yet.</b> The free lessons are open. Buy the course to unlock the rest.</p><Link className="btn primary" href="/checkout">Get the course</Link></div>}
        <p><Link href="/course/downloads">Printable downloads</Link></p>
        <p>{doneN} of {written.length} available lessons complete. The full course is {fmtHours(COURSE_MINUTES)} hours.</p>
        <div className="bar-track" aria-label={`${pct}% complete`}><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
      </div>
      {MODULES.map((m) => (
        <section className="section" key={m.no}>
          <h2 style={{ fontSize: "1.2rem" }}>Module {m.no}: {m.title} <span className="legal">{fmtHours(moduleMinutes(m))} h</span></h2>
          {m.lessons.map((l) => {
            const ready = !!LESSONS[l.slug];
            const locked = ready && !access && !LESSONS[l.slug].free;
            return (
              <Link key={l.slug} href={`/course/${l.slug}`} className={`lrow ${done.has(l.slug) ? "done" : ""} ${ready ? "" : "soon"}`}>
                <span className="st">{done.has(l.slug) ? "✓" : ready ? (locked ? "🔒" : "○") : "·"}</span>
                <span>{l.slug.replace("-", ".")} {l.title}{!ready && <span className="badge">Coming</span>}</span>
                <span className="m">{l.minutes} min</span>
              </Link>
            );
          })}
        </section>
      ))}
    </main>
  );
}
