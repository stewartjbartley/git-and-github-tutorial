import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, hasAccess } from "@/lib/auth";
import { DOWNLOADS } from "@/content/downloads";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  const s = await getSession();
  if (!s) redirect("/login");
  const access = await hasAccess(s.email);
  return (
    <main className="wrap">
      <div className="dash-h">
        <div className="meta"><h1>Downloads</h1>
        <p>Printable PDFs to check your work against. Each one is also offered in the lesson it belongs to.</p></div>
      </div>
      {!access && <div className="paywall"><p><b>Downloads are part of the full course.</b></p><Link className="btn primary" href="/checkout">Get the course</Link></div>}
      <div className="dl-list">
        {DOWNLOADS.map((d) => (
          <div className="dl" key={d.id}>
            <div><h3>{d.title}</h3><p>{d.desc}</p><p className="legal">From lesson{d.lessons.length > 1 ? "s" : ""} {d.lessons.map((l) => l.replace("-", ".")).join(", ")}</p></div>
            {access ? <a className="btn primary" href={`/api/downloads/${d.id}`}><Icon name="download" size={16} /> PDF</a> : <span className="legal">Locked</span>}
          </div>
        ))}
      </div>
    </main>
  );
}
