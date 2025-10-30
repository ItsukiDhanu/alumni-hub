import Link from "next/link";
import { mentorshipTracks } from "@/data/content";
import { cn } from "@/lib/utils";

type MentorshipSpotlightProps = {
  className?: string;
};

export function MentorshipSpotlight({ className }: MentorshipSpotlightProps) {
  return (
  <section className={cn("card rounded-3xl border border-white/10 bg-white/[0.03] p-7", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">Mentorship tracks</h3>
  <Link href="/mentorship" className="link text-sm text-indigo-200">
          View mentorship hub →
        </Link>
      </div>
      <div className="space-y-5">
        {mentorshipTracks.map((track) => (
          <article
            key={track.title}
            className="rounded-2xl border border-white/5 bg-slate-900/70 p-5"
          >
            <h4 className="text-lg font-semibold text-white">{track.title}</h4>
            <p className="mt-2 text-sm text-slate-300/90">{track.description}</p>
            <p className="mt-4 text-sm text-slate-200/80">
              {track.mentor} • {track.mentorTitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
