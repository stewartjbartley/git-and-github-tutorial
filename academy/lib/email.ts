import { Resend } from "resend";

const from = () => process.env.EMAIL_FROM ?? "Naked Chart School <onboarding@resend.dev>";

export async function sendLoginEmail(to: string, link: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[dev] sign-in link for ${to}: ${link}`);
    return;
  }
  const resend = new Resend(key);
  await resend.emails.send({
    from: from(),
    to,
    subject: "Your Naked Chart School sign-in link",
    html: `<p>Click to sign in. The link works once and expires in 15 minutes.</p><p><a href="${link}">Sign in to Naked Chart School</a></p><p>If you did not ask for this, ignore this email.</p>`,
    text: `Sign in to Naked Chart School (works once, expires in 15 minutes): ${link}`,
  });
}
