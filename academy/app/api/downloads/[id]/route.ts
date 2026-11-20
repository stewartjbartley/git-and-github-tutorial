import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getSession, hasAccess } from "@/lib/auth";
import { baseUrl } from "@/lib/stripe";
import { findDownload } from "@/content/downloads";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const d = findDownload((await params).id.replace(/\.pdf$/, ""));
  if (!d) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const s = await getSession();
  if (!s) return NextResponse.redirect(new URL("/login", baseUrl()));
  if (!(await hasAccess(s.email))) return NextResponse.redirect(new URL("/checkout", baseUrl()));
  try {
    const buf = await readFile(path.join(process.cwd(), "private", "pdfs", path.basename(d.file)));
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${d.file}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not available yet" }, { status: 404 });
  }
}
