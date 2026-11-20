import Link from "next/link";

export const metadata = { title: "Thank you" };

export default function Welcome() {
  return (
    <main className="wrap">
      <div className="section">
        <h2>Payment received</h2>
        <p>We are emailing you a one-time sign-in link now. It can take a minute to arrive, so check spam as well. The link works once and expires after 15 minutes.</p>
        <p>If it does not arrive, go to the <Link href="/login">sign-in page</Link> and request a new one with the same email you paid with.</p>
      </div>
    </main>
  );
}
