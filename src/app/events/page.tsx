import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { EventList } from "@/components/marketing/event-list";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const metadata: Metadata = {
  title: "Events • Alumni Hub",
  description:
    "Explore upcoming alumni gatherings, chapter meetups, and flagship events.",
};

export default function EventsPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Events"
          title="Coordinate events that keep alumni connected"
          description="RSVP to campus and global gatherings, host chapter meetups, and sync attendance with your CRM."
          actions={
            <Link
              href="/login"
              className="btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 hover:text-indigo-900"
            >
              Sign in to manage events
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
            <h2 className="text-2xl font-semibold text-white">Upcoming gatherings</h2>
            <p className="text-sm text-slate-300/90">
              Add events to synced calendars, manage RSVPs, and track registrations in real time.
            </p>
          </div>
          <Link
            href="mailto:events@alumni-hub.example"
            className="link text-sm text-indigo-200"
          >
            Request event support →
          </Link>
        </header>
        <EventList />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-semibold text-white">Event playbook</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {["Automated reminders", "Session feedback forms", "Check-in QR codes", "Chapter analytics"].map((item) => (
            <li
              key={item}
              className="card rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-slate-200/90"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <TestimonialsSection />
    </MarketingShell>
  );
}
