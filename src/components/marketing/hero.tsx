import { callToActions } from "@/data/content";
import { cn } from "@/lib/utils";
import { HomeHeroPrimaryAction } from "@/components/marketing/home-hero-primary-action";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#19c3e6]/30 bg-gradient-to-br from-[#0a1014] via-[#10222b] to-[#19c3e6]/10 p-12 shadow-2xl backdrop-blur-lg",
        className,
      )}
    >
      <div className="relative z-10 max-w-3xl">
  <p className="text-sm uppercase tracking-[0.2em] text-[#19c3e6] font-semibold mb-2">
          {callToActions.headline}
        </p>
  <h2 className="mt-3 text-5xl font-extrabold text-white drop-shadow-lg">
          Alumni relationships that compound.
        </h2>
  <p className="mt-4 text-lg text-[#eafcff] font-medium">
          {callToActions.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <HomeHeroPrimaryAction />
        </div>
      </div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(25,195,230,0.12),_transparent_52%)]" />
    </section>
  );
}
