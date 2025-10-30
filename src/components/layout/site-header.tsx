"use client";

import Link from "next/link";
import { navLinks, type NavLink } from "@/data/content";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const baseLinkClasses =
  "link px-2 py-1 text-sm font-medium text-white hover:text-white transition-colors duration-150";

export function SiteHeader({
  links = navLinks,
  className,
}: {
  links?: NavLink[];
  className?: string;
}) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const displayName = session?.user?.name ?? session?.user?.email ?? "Your account";
  const avatarUrl = session?.user?.image ?? null;
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("") || "You";

  return (
    <header className={cn("border-b border-white/10 bg-black/30 backdrop-blur", className)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white hover:text-violet-200 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-200 mr-4">Alumni Hub</span>
              <span>Connect. Mentor. Grow.</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3 w-full justify-end">
          <nav className="flex flex-wrap gap-3 text-sm">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className={baseLinkClasses}>
                {item.label}
              </Link>
            ))}
          </nav>
          {status === "loading" ? (
            <span className="ml-6 text-sm text-violet-200/70">Checking session…</span>
          ) : isAuthenticated ? (
            <div className="ml-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={`${displayName}'s profile photo`}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    <span className="text-base font-semibold text-white">{initials}</span>
                  )}
                </span>
                <Link
                  href="/profile"
                  className="text-sm font-semibold text-violet-100 transition hover:text-white"
                >
                  {displayName}
                </Link>
              </div>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-semibold text-violet-100 underline-offset-4 transition hover:text-white hover:underline"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-8 text-sm font-semibold text-violet-200 hover:text-violet-400 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
