'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { callToActions } from "@/data/content";

export function HomeHeroPrimaryAction() {
  const { status } = useSession();

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <Link
      href={callToActions.primary.href}
      className="link inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-[#19c3e6] bg-black/40 hover:bg-[#19c3e6]/10 shadow hover:scale-105 transition-all duration-150"
    >
      {callToActions.primary.label}
    </Link>
  );
}
