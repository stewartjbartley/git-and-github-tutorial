import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, hasAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { MODULES, COURSE_HOURS, fmtHours, moduleMinutes } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";
import { Icon, ModuleIcon, ProgressRing } from "@/components/Icon";

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
    <main className="wrap" style={{ maxWidth: 900 }}>
      <div className="dash-h">
        <ProgressRing pct={pct} size={84} />
        <div className="meta">
          <h1>My course</h1>
          <p>{doneN} of {written.length} lessons complete. About {COURSE_HOURS} hours of study in total.</p>
          <p className="legal">{s.email}</p>
        </div>
        <Link className="btn" href="/course/downloads"><Icon name="download" size={16} /> Downloads</Link>
      </div>
      {!access && (
        <div className="paywall"><p><b>You do not have access yet.</b> The free lessons are open. Buy the course to unlock the rest.</p><Link className="btn primary" href="/checkout">Get the course</Link></div>
      )}
      {MODULES.map((m) => (
        <section className="dash-sec" key={m.no}>
          <h2><ModuleIcon no={m.no} size={34} />Module {m.no}: {m.title}<span className="hrs">{fmtHours(moduleMinutes(m))} h</span></h2>
          <div className="group">
            {m.lessons.map((l) => {
              const lesson = LESSONS[l.slug];
              const ready = !!lesson;
              const locked = ready && !access && !lesson.free;
              const isDone = done.has(l.slug);
              return (
                <Link key={l.slug} href={`/course/${l.slug}`} className={`row-item ${isDone ? "done" : ""} ${ready ? "" : "soon"}`}>
                  <span className="st">{isDone ? <Icon name="check" size={18} strokeWidth={2.4} /> : locked ? <Icon name="lock" size={15} /> : <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--muted)" }} />}</span>
                  <span>{l.slug.replace("-", ".")}  {l.title}{!ready && <> <span className="badge">Coming</span></>}</span>
                  <span className="m">{l.minutes} min</span>
                  <span className="go"><Icon name="chevron-right" size={16} /></span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
