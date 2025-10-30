'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-6">
        <p className="text-sm text-slate-200/80">Loading your profile…</p>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const { user } = session;

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col gap-6 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-200/70">Account</p>
        <h1 className="text-3xl font-semibold text-white">Welcome back, {user?.name ?? user?.email}</h1>
        <p className="text-base text-slate-200/80">This starter profile will grow with more alumni data once the backend is wired up.</p>
      </header>
      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-100">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300/70">Name</h2>
          <p className="mt-1 text-lg font-medium">{user?.name ?? "Not provided"}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300/70">Email</h2>
          <p className="mt-1 text-lg font-medium">{user?.email ?? "Not provided"}</p>
        </div>
      </section>
    </main>
  );
}
