import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-white/10 bg-black/30", className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-300/80 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Alumni Hub. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="link text-slate-300/80">
            Privacy
          </Link>
          <Link href="/terms" className="link text-slate-300/80">
            Terms
          </Link>
          <Link href="/contact" className="link text-slate-300/80">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
