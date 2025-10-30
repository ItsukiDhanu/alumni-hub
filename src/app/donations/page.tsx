import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { DonationList } from "@/components/marketing/donation-list";

export const metadata: Metadata = {
  title: "Donations • Alumni Hub",
  description:
    "Visualize impact, steward donors, and coordinate giving campaigns across chapters.",
};

export default function DonationsPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Giving"
          title="Track every gift from pledge to impact"
          description="Sync data with your CRM, surface matching opportunities, and share transparent impact dashboards."
          actions={
            <Link
              href="/login"
              className="btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 hover:text-indigo-900"
            >
              Open giving workspace
            </Link>
          }
        />
      }
      className="gap-12"
    >
      <div className="mb-4">
        <Link href="/" className="btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800">
          ← Back to Home
        </Link>
      </div>
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold text-white">Active initiatives</h2>
          <p className="mt-2 text-sm text-slate-300/90">
            Highlight funds with transparent milestones and celebrate donor communities.
          </p>
        </header>
        <DonationList />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-semibold text-white">Giving suite</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {["Automated tax receipts", "Peer-to-peer fundraising pages", "Employer matching prompts", "Recurring pledge management"].map(
            (item) => (
              <div
                key={item}
                className="card rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-slate-200/90"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
