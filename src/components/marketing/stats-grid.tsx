import { communityStats } from "@/data/content";
import { cn } from "@/lib/utils";

type StatsGridProps = {
  className?: string;
};

export function StatsGrid({ className }: StatsGridProps) {
  return (
  <section className={cn("grid gap-6 md:grid-cols-3", className)}>
      {communityStats.map((stat) => (
        <div
          key={stat.label}
          className="card rounded-2xl border border-white/5 bg-white/5 p-6"
        >
          <dt className="text-sm uppercase tracking-[0.3em] text-slate-300">
            {stat.label}
          </dt>
          <dd className="mt-3 text-3xl font-semibold text-white">{stat.value}</dd>
          <p className="mt-2 text-sm text-slate-300/90">{stat.helper}</p>
        </div>
      ))}
    </section>
  );
}
