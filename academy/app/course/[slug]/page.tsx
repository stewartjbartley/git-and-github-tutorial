import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, hasAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { findLesson, neighbours } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";
import { downloadsForLesson } from "@/content/downloads";
import { BlockView } from "@/components/Blocks";
import { Quiz } from "@/components/Quiz";
import { CompleteButton } from "@/components/CompleteButton";
import { Icon, ModuleIcon } from "@/components/Icon";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const f = findLesson((await params).slug);
  return { title: f ? `${f.meta.slug.replace("-", ".")} ${f.meta.title}` : "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findLesson(slug);
  if (!found) notFound();
  const { module: mod, meta, lesson } = found;
  const { prev, next } = neighbours(slug);
  const num = slug.replace("-", ".");
  const session = await getSession();
  const doneRows = session
    ? await db.lessonProgress.findMany({ where: { userId: session.userId, lessonSlug: { in: mod.lessons.map((l) => l.slug) } } })
    : [];
  const done = new Set(doneRows.map((r) => r.lessonSlug));

  const sidebar = (
    <aside className="side" aria-label="In this module">
      <h4>Module {mod.no}</h4>
      {mod.lessons.map((l) => (
        <Link key={l.slug} href={`/course/${l.slug}`} aria-current={l.slug === slug ? "page" : undefined}>
          {done.has(l.slug) ? <span className="ck"><Icon name="check" size={15} strokeWidth={2.4} /></span> : <span className="num">{l.slug.replace("-", ".")}</span>}
          <span>{l.title}</span>
        </Link>
      ))}
    </aside>
  );
  const header = (
    <>
      <div className="crumbs"><Link href="/course"><Icon name="chevron-left" size={16} strokeWidth={2.2} />Course</Link></div>
      <header className="lh">
        <div className="kicker"><ModuleIcon no={mod.no} size={28} /> Module {mod.no}: {mod.title}</div>
        <h1>{meta.title}</h1>
        {lesson && <p className="goal">{lesson.goal}</p>}
        <p className="legal" style={{ marginTop: 10 }}>Lesson {num} · about {meta.minutes} minutes including homework</p>
      </header>
    </>
  );
  const navRow = (withComplete: boolean) => (
    <div className="foot">
      <span>{prev && <Link className="btn" href={`/course/${prev}`}><Icon name="chevron-left" size={16} strokeWidth={2.2} />{prev.replace("-", ".")}</Link>}</span>
      {withComplete && <CompleteButton slug={slug} initial={done.has(slug)} signedIn={!!session} />}
      <span>{next && <Link className="btn primary" href={`/course/${next}`}>{next.replace("-", ".")}<Icon name="chevron-right" size={16} strokeWidth={2.2} /></Link>}</span>
    </div>
  );
  const shell = (children: React.ReactNode) => (
    <div className="lesson-wrap">{sidebar}<main>{children}</main></div>
  );

  if (!lesson) {
    return shell(
      <>
        {header}
        <div className="soon-box">
          <p><b>This lesson is being written.</b> It is part of the course and will be released in order, at no extra cost.</p>
          <p>{meta.summary}</p>
        </div>
        {navRow(false)}
      </>,
    );
  }

  const allowed = lesson.free || (await hasAccess(session?.email));
  if (!allowed) {
    return shell(
      <>
        {header}
        <div className="paywall">
          <p><b>This lesson is part of the full course.</b></p>
          <p style={{ color: "var(--muted)" }}>{meta.summary}</p>
          <Link className="btn primary big" href="/checkout" style={{ justifySelf: "start" }}>Get the course</Link>
          {!session && <p className="legal">Already bought? <Link href="/login">Sign in</Link>.</p>}
        </div>
        {navRow(false)}
      </>,
    );
  }

  const dls = downloadsForLesson(slug);
  return shell(
    <>
      {header}
      <div className="lesson-body">
        {lesson.blocks.map((b, i) => <BlockView key={i} b={b} />)}
      </div>
      {dls.length > 0 && (
        <section className="dl-box">
          <h3>Download</h3>
          {dls.map((d) => (
            <div className="dl" key={d.id}>
              <div><b>{d.title}</b><p>{d.desc}</p></div>
              <a className="btn" href={`/api/downloads/${d.id}`}><Icon name="download" size={16} /> PDF</a>
            </div>
          ))}
        </section>
      )}
      <Quiz slug={slug} qs={lesson.qs} exam={lesson.exam} />
      {navRow(true)}
      {!session && <p className="legal" style={{ marginTop: 14 }}>You are not signed in, so progress is not saved. <Link href="/login">Sign in</Link> to track it.</p>}
    </>,
  );
}
