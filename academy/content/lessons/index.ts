import type { Lesson } from "../types";
import { M1 } from "./m1";
import { M1B } from "./m1b";
import { M1C } from "./m1c";
import { M2 } from "./m2";
import { M3 } from "./m3";
import { M4 } from "./m4";
import { M5 } from "./m5";
import { M6 } from "./m6";
import { M7 } from "./m7";
import { M8 } from "./m8";
import { M9 } from "./m9";
import { M10 } from "./m10";
import { M11 } from "./m11";
import { M12 } from "./m12";
import { M12B } from "./m12b";
import { M12C } from "./m12c";
import { M13 } from "./m13";
import { M14 } from "./m14";
import { M15 } from "./m15";

/** Written lessons by slug. Lessons that are not in this map show as "coming soon". */
export const LESSONS: Record<string, Lesson> = { ...M1, ...M1B, ...M1C, ...M2, ...M3, ...M4, ...M5, ...M6, ...M7, ...M8, ...M9, ...M10, ...M11, ...M12, ...M12B, ...M12C, ...M13, ...M14, ...M15 };
