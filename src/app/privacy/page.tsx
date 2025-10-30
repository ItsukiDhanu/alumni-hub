import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Privacy • Alumni Hub",
  description: "Learn how Alumni Hub protects personal data and respects alumni privacy preferences.",
};

const sections = [
  {
    title: "Data stewardship",
    content:
      "We collect only the data required to power alumni engagement experiences. Access is role-based and regularly reviewed.",
  },
  {
    title: "Your controls",
    content:
      "Alumni can update visibility settings at any time, opt out of communications, and request exports or deletions directly from their profile.",
  },
  {
    title: "Security",
    content:
      "All data is encrypted in transit and at rest. Sessions use HTTP-only cookies and short-lived tokens, with automated monitoring for anomalies.",
  },
];

export default function PrivacyPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Privacy"
          title="Transparency and trust for your alumni data"
          description="We uphold rigorous privacy and security practices so alumni feel confident staying connected."
        />
      }
      className="gap-12"
    >
      <section className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <article
            key={section.title}
            className="card rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200/90"
          >
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <p className="mt-3">{section.content}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-slate-200/90">
        <h2 className="text-xl font-semibold text-white">Request data changes</h2>
        <p className="mt-3">
          Email <a className="link text-indigo-200" href="mailto:privacy@alumni-hub.example">privacy@alumni-hub.example</a> to
          submit a data request. We respond within five business days and resolve requests within 30 days.
        </p>
      </section>
    </MarketingShell>
  );
}
