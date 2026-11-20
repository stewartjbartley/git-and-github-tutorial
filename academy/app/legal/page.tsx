export const metadata = { title: "Legal" };

export default function Legal() {
  return (
    <main className="wrap">
      <div className="section prose">
        <div className="paywall" style={{ borderColor: "var(--cdown)" }}>
          <p><b>Draft to be reviewed before launch.</b> This page is a starting template, not legal advice. Replace every bracketed item with your details and have the final text checked by a lawyer who knows distance-selling, consumer and financial-promotion rules in the countries you sell to. Delete this box when done.</p>
        </div>
        <h2 id="terms">Terms of sale</h2>
        <p>[Your name or company], [address], [tax ID], sells access to the Naked Chart School online course (the course). By buying you agree to these terms. Access is personal and may not be shared, resold or copied. We may update the course content. We provide the course as education only.</p>
        <h2 id="refunds">Refunds and cancellation</h2>
        <p>If you buy as a consumer in the European Union you normally have 14 days to cancel a purchase. For digital content supplied immediately, that right ends once access begins if you have asked for immediate access and acknowledged that you will lose the right. The checkout asks for both. [State any voluntary refund guarantee you decide to offer here, with its time limit and how to claim it.]</p>
        <h2 id="privacy">Privacy</h2>
        <p>We collect your email address to create your account and send sign-in links, and your progress and quiz results to show your progress. Payments are handled by Stripe and we do not see your card details. Emails are sent through Resend. [Add your legal basis, retention period, your rights under GDPR and how to contact you.]</p>
        <h2 id="risk">Risk warning</h2>
        <p>The course is education. It is not investment advice, a personal recommendation or an offer to buy or sell any financial instrument. Trading leveraged products such as CFDs carries a high risk of rapid loss, and most retail accounts lose money. Past results, examples and teaching charts do not predict future results. You are responsible for your own decisions. Do not trade money you cannot afford to lose.</p>
      </div>
    </main>
  );
}
