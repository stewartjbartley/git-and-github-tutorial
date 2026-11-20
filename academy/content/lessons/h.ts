import type { Block } from "../types";

export const p = (html: string): Block => ({ t: "p", html });
export const h = (text: string): Block => ({ t: "h", text });
export const rule = (html: string): Block => ({ t: "rule", html });
export const warn = (html: string): Block => ({ t: "warn", html });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
export const hw = (minutes: number, html: string): Block => ({ t: "hw", minutes, html });
export const fig = (id: string, cap: string, bare = false): Block => ({ t: "fig", id, cap, bare });
export const table = (head: string[], rows: string[][]): Block => ({ t: "table", head, rows });
export const gallery = (items: [string, string, string][]): Block => ({ t: "gallery", items });

export const builder = (n: 1 | 2): Block => ({ t: "builder", n });
export const score = (): Block => ({ t: "score" });
