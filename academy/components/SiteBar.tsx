import { getSession } from "@/lib/auth";
import { NavBar } from "./NavBar";

export async function SiteBar() {
  let signedIn = false;
  try { signedIn = !!(await getSession()); } catch {}
  return <NavBar signedIn={signedIn} />;
}
