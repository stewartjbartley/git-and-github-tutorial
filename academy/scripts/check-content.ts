// Validates every written lesson: quiz indexes, chart ids, minutes. Run: npx tsx scripts/check-content.ts
import { MODULES, COURSE_HOURS } from "../content/curriculum";
import { LESSONS } from "../content/lessons";
import { CH, MINI } from "../content/charts";
import { toBars } from "../lib/chart";

let bad = 0;
const fail = (m: string) => { bad++; console.log("FAIL", m); };
let written = 0, writtenMin = 0;
for (const m of MODULES) for (const meta of m.lessons) {
  const l = LESSONS[meta.slug];
  if (!l) continue;
  written++; writtenMin += meta.minutes;
  const hw = l.blocks.filter((b) => b.t === "hw").reduce((a, b) => a + (b as { minutes: number }).minutes, 0);
  if (!l.blocks.some((b) => b.t === "hw")) fail(`${meta.slug} has no homework`);
  if (hw > meta.minutes) fail(`${meta.slug} homework ${hw} min exceeds lesson ${meta.minutes} min`);
  if (l.qs.length < 3) fail(`${meta.slug} has fewer than 3 questions`);
  for (const b of l.blocks) {
    if (b.t === "fig" && !CH[b.id]) fail(`${meta.slug} unknown chart ${b.id}`);
    if (b.t === "gallery") for (const [id] of b.items) if (!MINI[id]) fail(`${meta.slug} unknown mini ${id}`);
  }
  l.qs.forEach((q, i) => {
    const tag = `${meta.slug} Q${i + 1}`;
    if (q.k === "click") {
      if (!CH[q.chart]) return fail(`${tag} unknown chart ${q.chart}`);
      const n = toBars(CH[q.chart]).length;
      if (q.ans < 0 || q.ans >= n) fail(`${tag} answer ${q.ans} outside ${n} candles`);
    } else {
      if (q.ans < 0 || q.ans >= q.o.length) fail(`${tag} answer index out of range`);
      if (q.mini && !MINI[q.mini]) fail(`${tag} unknown mini ${q.mini}`);
      if (new Set(q.o).size !== q.o.length) fail(`${tag} duplicate options`);
    }
  });
}
if (COURSE_HOURS !== 55) fail(`course is now ${COURSE_HOURS} hours. Update the "55 hours" copy in lesson 1.9 (and the study-pace table) and this check.`);
console.log(`${written} lessons written, ${(writtenMin / 60).toFixed(1)} hours, ${bad} problems`);
process.exit(bad ? 1 : 0);
