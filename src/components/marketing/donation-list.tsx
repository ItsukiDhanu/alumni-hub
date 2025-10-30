import { donationInitiatives } from "@/data/content";

export function DonationList() {
  return (
    <div className="space-y-5">
      {donationInitiatives.map((initiative) => (
        <article
          key={initiative.title}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
        >
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {initiative.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300/90">{initiative.impact}</p>
            </div>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {initiative.amountRaised}
            </span>
          </header>
        </article>
      ))}
    </div>
  );
}
