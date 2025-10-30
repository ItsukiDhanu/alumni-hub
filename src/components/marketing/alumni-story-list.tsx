import { alumniStories } from "@/data/content";

export function AlumniStoryList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {alumniStories.map((story) => (
        <article
          key={story.name}
          className="card rounded-2xl border border-white/10 bg-black/40 p-6"
        >
          <header className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.28em] text-indigo-200">
              {story.year}
            </p>
            <h3 className="text-xl font-semibold text-white">{story.name}</h3>
            <p className="text-sm font-medium text-slate-300/80">
              {story.headline}
            </p>
          </header>
          <p className="mt-4 text-sm text-slate-200/90">{story.description}</p>
        </article>
      ))}
    </div>
  );
}
