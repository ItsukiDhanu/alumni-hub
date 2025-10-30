import { MarketingShell } from "@/components/layout/marketing-shell";
import { DonationsSpotlight } from "@/components/marketing/donations-spotlight";
import { EventsSpotlight } from "@/components/marketing/events-spotlight";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { MentorshipSpotlight } from "@/components/marketing/mentorship-spotlight";
import { StatsGrid } from "@/components/marketing/stats-grid";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export default function Home() {
  return (
    <MarketingShell
      hero={<Hero />}
      className="gap-16"
    >
      <StatsGrid />
      <FeatureGrid />
      <EventsSpotlight />
      <section className="grid gap-6 lg:grid-cols-2">
        <MentorshipSpotlight className="h-full" />
        <DonationsSpotlight className="h-full" />
      </section>
      <TestimonialsSection />
    </MarketingShell>
  );
}
