import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteBar } from "@/components/SiteBar";
import { COURSE_HOURS } from "@/content/curriculum";

export const metadata: Metadata = {
  title: { default: "Naked Chart School", template: "%s | Naked Chart School" },
  description: `A ${COURSE_HOURS}-hour course on reading candlestick charts without indicators: candles, sweeps, sessions in CET, trade plans, risk and funded accounts for forex, gold and indices.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" />
      </head>
      <body>
        <SiteBar />
        {children}
        <footer className="site">
          <div className="in">
            <p className="fine">Education only. This is not financial advice or a recommendation to trade any instrument. Trading leveraged products carries a high risk of losing money, and most retail traders lose. Do not trade money you cannot afford to lose.</p>
            <p><Link href="/legal#terms">Terms</Link><Link href="/legal#refunds">Refunds and cancellation</Link><Link href="/legal#privacy">Privacy</Link><Link href="/legal#risk">Risk warning</Link></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
