import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, hasAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { findLesson, neighbours } from "@/content/curriculum";
import { BlockView } from "@/components/Blocks";
import { Quiz } from "@/components/Quiz";
import { CompleteButton } from "@/components/CompleteButton";

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

  const header = (
    <header className="lh">
      <div className="crumbs"><Link href="/course">Course</Link> / Module {mod.no}: {mod.title}</div>
      <h1>{num} {meta.title}</h1>
      {lesson && <p className="goal">{lesson.goal}</p>}
    </header>
  );
  const nav = (
    <div className="foot">
      <span>{prev && <Link className="btn" href={`/course/${prev}`}>← {prev.replace("-", ".")}</Link>}</span>
      <span>{next && <Link className="btn primary" href={`/course/${next}`}>{next.replace("-", ".")} →</Link>}</span>
    </div>
  );

  if (!lesson) {
    return (
      <main className="wrap">
        {header}
        <div className="soon-box">
          <p><b>This lesson is being written.</b> It is part of the course and will be released in order, at no extra cost.</p>
          <p>{meta.summary}</p>
          <p className="legal">About {meta.minutes} minutes, including homework.</p>
        </div>
        {nav}
      </main>
    );
  }

  const session = await getSession();
  const allowed = lesson.free || (await hasAccess(session?.email));
  if (!allowed) {
    return (
      <main className="wrap">
        {header}
        <div className="paywall">
          <p><b>This lesson is part of the full course.</b></p>
          <p>{meta.summary} About {meta.minutes} minutes, including homework.</p>
          <Link className="btn primary big" href="/checkout">Get the course</Link>
          {!session && <p className="legal" style={{ marginTop: 10 }}>Already bought? <Link href="/login">Sign in</Link>.</p>}
        </div>
        {nav}
      </main>
    );
  }

  const done = session ? !!(await db.lessonProgress.findUnique({ where: { userId_lessonSlug: { userId: session.userId, lessonSlug: slug } } })) : false;
  return (
    <main className="wrap">
      {header}
      <div className="lesson-body">
        {lesson.blocks.map((b, i) => <BlockView key={i} b={b} />)}
      </div>
      <Quiz slug={slug} qs={lesson.qs} exam={lesson.exam} />
      <div className="foot">
        <span>{prev && <Link className="btn" href={`/course/${prev}`}>← {prev.replace("-", ".")}</Link>}</span>
        <CompleteButton slug={slug} initial={done} signedIn={!!session} />
        <span>{next && <Link className="btn primary" href={`/course/${next}`}>{next.replace("-", ".")} →</Link>}</span>
      </div>
      {!session && <p className="legal">You are not signed in, so progress is not saved. <Link href="/login">Sign in</Link> to track it.</p>}
    </main>
  );
}
