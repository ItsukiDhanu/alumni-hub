import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Contact • Alumni Hub",
  description: "Get in touch with the Alumni Hub team for support, demos, and partnership opportunities.",
};

const contacts = [
  {
    label: "Product & roadmap",
    email: "product@alumni-hub.example",
    blurb: "Share feedback, request features, or join the early-access council.",
  },
  {
    label: "Implementation",
    email: "launch@alumni-hub.example",
    blurb: "Need help importing data or configuring single sign-on? We can help.",
  },
  {
    label: "Support",
    email: "support@alumni-hub.example",
    blurb: "Resolve issues with authentication, data corrections, or permissions.",
  },
];

export default function ContactPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Contact"
          title="We're here to help your alumni community thrive"
          description="Reach the team for demos, onboarding, technical support, or partnership conversations."
        />
      }
      className="gap-12"
    >
      <div className="mb-4">
        <Link href="/" className="btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800">
          ← Back to Home
        </Link>
      </div>
      <section className="grid gap-6 md:grid-cols-3">
        {contacts.map((item) => (
          <div
            key={item.label}
            className="card rounded-2xl border border-white/10 bg-black/40 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{item.label}</h2>
            <p className="mt-3 text-sm text-slate-200/90">{item.blurb}</p>
            <Link
              className="link mt-4 inline-flex text-sm text-indigo-200"
              href={`mailto:${item.email}`}
            >
              {item.email}
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-slate-200/90">
        <h2 className="text-xl font-semibold text-white">Office hours</h2>
        <p className="mt-3">
          Weekly drop-in sessions are hosted every Thursday at 10:00 AM PT. Register through the events hub to
          receive calendar invites and reminders.
        </p>
      </section>
    </MarketingShell>
  );
}
