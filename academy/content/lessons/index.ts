import type { Lesson } from "../types";
import { M1 } from "./m1";
import { M2 } from "./m2";

/** Written lessons by slug. Lessons that are not in this map show as "coming soon". */
export const LESSONS: Record<string, Lesson> = { ...M1, ...M2 };
