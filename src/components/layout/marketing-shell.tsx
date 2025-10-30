import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

export function MarketingShell({
  hero,
  children,
  className,
}: {
  hero: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className={cn("mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12", className)}>
        {hero}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
