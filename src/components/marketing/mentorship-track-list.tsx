import { mentorshipTracks } from "@/data/content";

export function MentorshipTrackList() {
  return (
    <div className="space-y-5">
      {mentorshipTracks.map((track) => (
        <article
          key={track.title}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
        >
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{track.title}</h3>
              <p className="text-sm text-slate-300/90">{track.description}</p>
            </div>
            <div className="text-xs font-medium text-indigo-200">
              {track.mentor}
              <span className="mt-1 block text-[11px] font-normal text-slate-300/80">
                {track.mentorTitle}
              </span>
            </div>
          </header>
        </article>
      ))}
    </div>
  );
}
