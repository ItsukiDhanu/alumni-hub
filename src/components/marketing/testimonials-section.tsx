import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  className?: string;
};

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
  <section className={cn("rounded-3xl border border-white/10 bg-white/[0.02] p-8", className)}>
  <h3 className="text-2xl font-semibold text-white">Community voices</h3>
  <div className="mt-6 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="card h-full rounded-2xl border border-white/5 bg-black/40 p-6"
          >
            <blockquote className="text-sm text-slate-200/90">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-white">
              {testimonial.name}
              <span className="mt-1 block text-xs font-normal text-slate-300/80">
                {testimonial.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
