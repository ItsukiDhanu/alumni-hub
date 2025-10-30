import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Terms • Alumni Hub",
  description: "Review the terms of service that govern usage of Alumni Hub for institutions and alumni alike.",
};

const clauses = [
  {
    title: "Acceptable use",
    description:
      "Alumni Hub may be used to facilitate engagement, mentorship, events, and giving programs. Use of the platform must respect community guidelines and applicable laws.",
  },
  {
    title: "Institution responsibilities",
    description:
      "Institutions manage invited users, maintain directory accuracy, and provide timely updates for authentication and integrations.",
  },
  {
    title: "Alumni responsibilities",
    description:
      "Alumni agree to keep profile information current, honor mentorship commitments, and adhere to community standards.",
  },
];

export default function TermsPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Terms"
          title="Clear guidelines for an engaged, respectful community"
          description="These terms outline acceptable use, institutional responsibilities, and alumni commitments."
        />
      }
      className="gap-12"
    >
      <section className="space-y-6">
        {clauses.map((clause) => (
          <article
            key={clause.title}
            className="card rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200/90"
          >
            <h2 className="text-lg font-semibold text-white">{clause.title}</h2>
            <p className="mt-3">{clause.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-slate-200/90">
        <h2 className="text-xl font-semibold text-white">Need a signed agreement?</h2>
        <p className="mt-3">
          Email <a className="link text-indigo-200" href="mailto:legal@alumni-hub.example">legal@alumni-hub.example</a> to request a copy of the master services agreement or data processing addendum.
        </p>
      </section>
    </MarketingShell>
  );
}
