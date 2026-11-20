import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { findLesson } from "@/content/curriculum";

export async function POST(req: Request) {
  const s = await getSession();
  if (!s) return NextResponse.json({ ok: true, saved: false });
  const body = await req.json().catch(() => ({}));
  const meta = typeof body.slug === "string" ? findLesson(body.slug)?.lesson : null;
  const score = Number(body.score);
  const total = Number(body.total);
  if (!meta || !Number.isInteger(score) || !Number.isInteger(total) || total < 1 || score < 0 || score > total) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  await db.quizResult.create({ data: { userId: s.userId, lessonSlug: body.slug, score, total } });
  return NextResponse.json({ ok: true, saved: true });
}
