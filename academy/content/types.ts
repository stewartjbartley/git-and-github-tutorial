import type { Ann } from "@/lib/chart";

export type Block =
  | { t: "p"; html: string }
  | { t: "h"; text: string }
  | { t: "rule"; html: string }
  | { t: "warn"; html: string }
  | { t: "ol"; items: string[] }
  | { t: "hw"; minutes: number; html: string }
  | { t: "fig"; id: string; cap: string; bare?: boolean }
  | { t: "tf"; cap: string }
  | { t: "real"; file: string; from: number; count: number; dec: number; cap: string; ann?: Ann[] }
  | { t: "gallery"; items: [string, string, string][] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "builder"; n: 1 | 2 }
  | { t: "calc" }
  | { t: "clock" }
  | { t: "score" }
  | { t: "sim" }
  | { t: "dd" };

export type Question =
  | { k: "click"; chart: string; ans: number; q: string; ok: string; bad: string; ref?: string }
  | { k: "mc"; q: string; o: string[]; ans: number; ok: string; bad: string; mini?: string; ref?: string };

export type Lesson = {
  goal: string;
  free?: boolean;
  blocks: Block[];
  qs: Question[];
  /** Counts as a graded test: shows a verdict at the end. */
  exam?: boolean;
};

export type LessonMeta = { slug: string; title: string; minutes: number; summary: string };
export type Module = { no: number; title: string; summary: string; lessons: LessonMeta[] };
