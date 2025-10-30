import Link from "next/link";
import type { Metadata } from "next";

import { GroupChatPanel } from "@/components/group-chat/group-chat-panel";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Signal Commons • Alumni Hub",
  description:
    "Coordinate alumni relations work in real time inside Signal Commons with persistent chat channels, message history, and smart digests.",
};

const playbookItems = [
  {
    title: "Channel templates",
    blurb: "Stand up ready-to-go chat spaces for mentorship, events, and fundraising teams in seconds.",
  },
  {
    title: "Pinned resources",
    blurb: "Keep key documents and quick links easily accessible at the top of every channel.",
  },
  {
    title: "Digest automation",
    blurb: "Summaries land in stakeholder inboxes daily so no update slips through the cracks.",
  },
  {
    title: "Smart mentions",
    blurb: "@mention teammates, volunteers, or campus partners to trigger notifications instantly.",
  },
];

export default function GroupChatPage() {
  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Signal Commons"
          title="Run alumni programs with real-time coordination"
          description="Host dedicated channels for events, giving, and mentorship teams, complete with digests and mobile-ready design."
          actions={
            <Link
              href="#chat"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Open Signal Commons
            </Link>
          }
        />
      }
      className="gap-14"
    >
      <div className="mb-4" id="chat">
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800"
        >
          ← Back to Home
        </Link>
      </div>

      <GroupChatPanel />

      <section className="grid gap-6 md:grid-cols-2">
        {playbookItems.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200/90"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-300/90">{item.blurb}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-slate-200/90">
        <h2 className="text-2xl font-semibold text-white">Rollout checklist</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm">
          <li>Create a channel per initiative and seed the first post with context.</li>
          <li>Invite campus partners and alumni volunteers with role-based permissions.</li>
          <li>Enable daily digests so stakeholders stay aligned across time zones.</li>
          <li>Archive channels automatically when campaigns wrap to keep things tidy.</li>
        </ol>
      </section>
    </MarketingShell>
  );
}
