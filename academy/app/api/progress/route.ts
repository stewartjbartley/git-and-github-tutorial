import { NextResponse } from "next/server";
import { getSession, hasAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { findLesson } from "@/content/curriculum";

export async function POST(req: Request) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Sign in to save progress." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const slug = typeof body.slug === "string" ? body.slug : "";
  const found = findLesson(slug);
  if (!found?.lesson) return NextResponse.json({ error: "Unknown lesson." }, { status: 404 });
  if (!found.lesson.free && !(await hasAccess(s.email))) {
    return NextResponse.json({ error: "No access." }, { status: 403 });
  }
  if (body.done === false) {
    await db.lessonProgress.deleteMany({ where: { userId: s.userId, lessonSlug: slug } });
  } else {
    await db.lessonProgress.upsert({
      where: { userId_lessonSlug: { userId: s.userId, lessonSlug: slug } },
      update: {},
      create: { userId: s.userId, lessonSlug: slug },
    });
  }
  return NextResponse.json({ ok: true });
}
