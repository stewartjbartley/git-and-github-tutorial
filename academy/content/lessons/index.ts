import type { Lesson } from "../types";
import { M1 } from "./m1";
import { M2 } from "./m2";
import { M3 } from "./m3";
import { M4 } from "./m4";
import { M5 } from "./m5";

/** Written lessons by slug. Lessons that are not in this map show as "coming soon". */
export const LESSONS: Record<string, Lesson> = { ...M1, ...M2, ...M3, ...M4, ...M5 };
