import Link from "next/link";
import { donationInitiatives } from "@/data/content";
import { cn } from "@/lib/utils";

type DonationsSpotlightProps = {
  className?: string;
};

export function DonationsSpotlight({ className }: DonationsSpotlightProps) {
  return (
  <section className={cn("card rounded-3xl border border-white/10 bg-white/[0.03] p-7", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">Donation initiatives</h3>
  <Link href="/donations" className="link text-sm text-indigo-200">
          Giving dashboard →
        </Link>
      </div>
      <div className="space-y-5">
        {donationInitiatives.map((initiative) => (
          <article
            key={initiative.title}
            className="rounded-2xl border border-white/5 bg-slate-900/70 p-5"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">
                {initiative.title}
              </h4>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                {initiative.amountRaised}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300/90">{initiative.impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
