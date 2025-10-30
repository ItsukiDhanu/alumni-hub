import Link from "next/link";
import { featureHighlights } from "@/data/content";
import { cn } from "@/lib/utils";

type FeatureGridProps = {
  className?: string;
};

export function FeatureGrid({ className }: FeatureGridProps) {
  return (
  <section className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 rounded-3xl border border-[#19c3e6]/30 bg-gradient-to-br from-[#0a1014] via-[#10222b] to-[#19c3e6]/10 shadow-2xl backdrop-blur-lg", className)}>
      {featureHighlights.map((feature) => (
        <div
          key={feature.title}
          className={cn(
                  "card flex flex-col items-start gap-4 rounded-2xl border border-[#19c3e6]/30 bg-gradient-to-br from-[#0a1014] via-[#10222b] to-[#19c3e6]/10 p-6 shadow-lg",
            feature.accentColor,
          )}
        >
          <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm/relaxed text-[#eafcff]">
              {feature.description}
            </p>
          </div>
          <Link
            href={feature.href}
            className="btn mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white hover:border-white"
          >
            Explore →
          </Link>
        </div>
      ))}
    </section>
  );
}
