import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { MentorshipTrackList } from "@/components/marketing/mentorship-track-list";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const metadata: Metadata = {
  title: "Mentorship • Alumni Hub",
  description:
    "Match mentors and mentees, run cohort-based journeys, and measure impact in one hub.",
};

export default function MentorshipPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Mentorship"
          title="Build mentorship programs that scale with your community"
          description="Pair mentors with mentees, track goals, and collect outcomes with structured programming."
          actions={
            <>
              <Link
                href="/login"
                className="btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 hover:text-indigo-900"
              >
                Launch mentorship portal
              </Link>
              <Link
                href="mailto:mentorship@alumni-hub.example"
                className="btn inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white/90 hover:border-white"
              >
                Book a program audit
              </Link>
            </>
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
          <h2 className="text-2xl font-semibold text-white">Featured tracks</h2>
          <p className="mt-2 text-sm text-slate-300/90">
            Cohort templates you can copy, customize, and run with guided prompts.
          </p>
        </header>
        <MentorshipTrackList />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {["Goal tracking dashboards", "Office hour sign-ups", "Automated feedback loops", "Mentor CRM integrations", "Skill taxonomies", "Impact reporting"].map(
          (item) => (
            <div
              key={item}
              className="card rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-slate-200/90"
            >
              {item}
            </div>
          ),
        )}
      </section>

      <TestimonialsSection />
    </MarketingShell>
  );
}
