import { upcomingEvents } from "@/data/content";

export function EventList() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {upcomingEvents.map((event) => (
        <article
          key={event.id}
          className="card flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6"
        >
          <header>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
              {event.location}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300/80">{event.date}</p>
          </header>
          <p className="mt-4 text-sm text-slate-200/90">{event.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200/80">
            <span className="rounded-full border border-white/15 px-3 py-1">
              RSVP soon
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              In person
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
