import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { DirectoryTable } from "@/components/marketing/directory-table";

export const metadata: Metadata = {
  title: "Directory • Alumni Hub",
  description:
    "Discover mentors, collaborators, and peers across industries with powerful filters and privacy controls.",
};

export default function DirectoryPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Directory"
          title="Searchable relationships with smart privacy controls"
          description="Filter by graduation year, expertise, location, and availability to make meaningful connections."
          actions={
            <Link
              href="/login"
              className="btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 hover:text-indigo-900"
            >
              Unlock directory access
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
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Featured profiles</h2>
            <p className="text-sm text-slate-300/90">
              Sample entries that show how alumni control their visibility and availability.
            </p>
          </div>
          <Link
            href="mailto:directory@alumni-hub.example"
            className="link text-sm text-indigo-200"
          >
            Request directory export →
          </Link>
        </header>
        <DirectoryTable />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-semibold text-white">Privacy toolkit</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {["Granular field-level controls", "Opt-in mentorship availability", "Directory-wide announcements", "Network health analytics"].map(
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
