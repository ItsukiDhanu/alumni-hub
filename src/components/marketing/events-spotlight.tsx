import Link from "next/link";
import { upcomingEvents } from "@/data/content";
import { cn } from "@/lib/utils";

type EventsSpotlightProps = {
  className?: string;
};

export function EventsSpotlight({ className }: EventsSpotlightProps) {
  return (
  <section className={cn("rounded-3xl border border-white/10 bg-white/[0.03] p-8", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white">Upcoming events</h3>
          <p className="text-sm text-slate-300/90">
            RSVP directly from the events workspace.
          </p>
        </div>
        <Link
          href="/events"
          className="btn inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:border-white"
        >
          View full calendar
        </Link>
      </div>
  <div className="mt-6 grid gap-5 md:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article
            key={event.id}
            className="card flex h-full flex-col rounded-2xl border border-white/5 bg-black/40 p-5"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
              {event.location}
            </p>
            <h4 className="mt-3 text-lg font-semibold text-white">{event.title}</h4>
            <p className="mt-2 text-sm text-slate-300/80">{event.date}</p>
            <p className="mt-3 text-sm text-slate-200/90">{event.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
