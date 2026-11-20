# Launch guide

This is what stands between the code in this repo and a paying customer. Read it top to bottom before you charge anyone.

## What exists today

| Piece | State |
|---|---|
| Sales page, free lessons, paywall | Built and tested |
| Passwordless sign-in (one-time email link) | Built and tested |
| Stripe Checkout with the EU withdrawal waiver | Built, tested against a signed test webhook, not tested against live Stripe |
| Progress and quiz results saved per student | Built and tested |
| 50-hour curriculum map (14 modules, 94 lessons) | Done, totals exactly 3,000 minutes |
| Written lessons | Modules 1 to 5, 7, 10, 11 and 12 (34 h): 64 lessons. See `docs/CURRICULUM.md` for the live status |
| Real-chart import from CSV | Built (`content/real/`), no real data supplied yet |

**Only 34 of the 50 hours are written.** Do not market 50 hours as available today. Either finish more modules first, or sell it as a pre-launch with a clear release schedule. The sales page already says how many lessons are ready and marks modules as Ready.

## Set-up checklist

1. **Database.** Create a Postgres database (Neon, Supabase or Vercel Postgres). Put the connection string in `DATABASE_URL`. Run `npm run db:push` once.
2. **Stripe.** Create one Product with a one-time Price in EUR. Put its id in `STRIPE_PRICE_ID`. The sales page reads the price from Stripe, so the page and checkout can never disagree. Switch on Stripe Tax if you need EU VAT collected, then set `STRIPE_TAX=1`.
3. **Webhook.** In Stripe add an endpoint `https://YOUR-DOMAIN/api/webhooks/stripe` for the events `checkout.session.completed` and `charge.refunded`. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.
4. **Email.** Verify your domain in Resend. Set `RESEND_API_KEY` and `EMAIL_FROM`.
5. **Secrets.** `SESSION_SECRET` is 32+ random characters (`openssl rand -base64 48`). `NEXT_PUBLIC_BASE_URL` is your live URL with no trailing slash.
6. **Deploy.** Push to GitHub, import the `academy` folder in Vercel, add the environment variables, deploy. Never set `DEV_UNLOCK_ALL` in production (it is ignored there anyway).
7. **Test with a real card** in Stripe test mode first, then one real purchase of your own followed by a refund. Refunds mark the purchase as refunded and remove access.

## Price

I suggest EUR 197 to 297 for a 50-hour structured course, with a lower founding price while fewer than all modules are written. Courses with real-chart libraries and strong outcomes sit higher. This is a market judgement, not data. Compare three similar courses and set it yourself. Change the price in Stripe only.

## Legal and regulatory: get this reviewed

I am not a lawyer and `/legal` is a template with a warning box on it. Before launch have a lawyer in Spain, or in each country you sell to, review it.

- **EU 14-day withdrawal right.** For digital content supplied immediately the buyer loses it only if they ask for immediate access and acknowledge the loss. Checkout has both boxes, and the server refuses to create a session without them. Stripe stores the acceptance time in the session metadata and the app stores it on the purchase.
- **VAT.** EU digital sales to consumers are taxed where the customer lives, which means One-Stop-Shop registration for you. Stripe Tax calculates it, you still register and file. Talk to your gestor.
- **Financial promotion and advice rules.** Teaching how to read charts is education. Telling people what to buy or sell, or implying results, can become regulated advice or promotion. In Spain the regulator is the CNMV. If you sell to UK buyers the FCA's financial promotion rules apply. The course is written as education and the footer says so on every page. Keep it that way.
- **Claims.** No income claims, no screenshots of profits as marketing, no "guaranteed", no testimonials that mention money made. Claims about your own track record need proof.
- **About the author.** The sales page has no author section on purpose. Add one with your real background, written by you. Do not claim trading experience you do not have.
- **Data and screenshots.** Check the data licence of any platform you export real charts from before you publish them.
- **Privacy.** The app stores email, progress and quiz scores, and uses one essential session cookie. Complete the privacy text with your details and the retention period.

## Claims on the sales page you must be able to keep

- "Lifetime access to updates to existing lessons" is a promise. Remove it if you do not want it.
- "50 hours" is guided study including homework, and the page says so.
- The charts are teaching charts. The page says so. Replace them with real charts over time using the CSV import.

## Swapping in real charts

1. Export OHLC data from TradingView or MT5 and save the CSV in `content/real/`.
2. In a lesson add a block: `{ t: "real", file: "eurusd-h1.csv", from: 120, count: 40, dec: 5, cap: "...", ann: [] }`.
3. `ann` takes the same annotations as the drawn charts (`zone`, `hline`, `tag`, `box`, `trade`, `strip`), positioned by candle index and real price.

## Writing the remaining modules

Lessons live in `content/lessons/mN.ts`. Add a file, export a record keyed by slug (for example `"3-1"`), register it in `content/lessons/index.ts`. Each lesson is a list of blocks plus 3 to 8 quiz questions. The curriculum map, sales page, dashboard and "Ready" badges update on their own. A lesson with no content shows "being written".

Still to write: Modules 6, 8, 9, 13 and 14 (momentum, structure, zones, market playbooks, practice lab and capstone). Each module is about 3 to 4.5 hours of material.

## Not built

Video hosting, certificates, a student community, an admin dashboard (use Stripe and Prisma Studio), affiliate tracking, team licences, and receipts beyond Stripe's own. Add them when customers ask.
