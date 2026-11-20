# Naked Chart School

An online course of about 55 hours on reading candlestick charts without indicators. Next.js 15, Prisma, PostgreSQL, Stripe, Resend, Tailwind, TypeScript.

```bash
cp .env.example .env        # fill in the values
npm install
npm run db:push             # creates the tables
npm run dev                 # http://localhost:3000
```

Local testing without paying: set `DEV_UNLOCK_ALL=1` in `.env`. Without `RESEND_API_KEY` the sign-in link is printed in the server console.

- `content/curriculum.ts` is the 14-module map. `docs/CURRICULUM.md` is the readable version.
- `content/lessons/` holds the written lessons. `content/charts.ts` holds the teaching charts. `content/real/` is for real CSV data.
- `docs/LAUNCH.md` is the launch checklist, including legal points to get reviewed.

Before committing content, run `npx tsx scripts/check-content.ts`. It checks every quiz answer index, chart id and that homework fits inside each lesson's minutes.

PDF downloads are built with `scripts/build-pdfs.ts` (see `docs/LAUNCH.md`).
