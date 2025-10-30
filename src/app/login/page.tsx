import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LoginForm } from "@/components/auth/login-form";
import { LoginHeroActions } from "@/components/auth/login-hero-actions";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Login • Alumni Hub",
  description:
    "Access the Alumni Hub directory, mentorship programs, and event tools with your campus-managed credentials.",
};

const highlights = [
  {
    title: "Role-aware security",
    description: "Alumni, students, and admins only see the tools and data relevant to their permissions.",
  },
  {
    title: "Short-lived access",
    description: "Magic links expire after 10 minutes and device trust lasts just 30 days by default.",
  },
  {
    title: "Audit-ready logs",
    description: "Every login attempt is recorded with device fingerprinting for compliance reviews.",
  },
];

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/profile");
  }

  return (
    <MarketingShell
      hero={
        <PageHero
          eyebrow="Login"
          title="Sign in to manage your alumni community"
          description="Use your campus-managed email for a secure magic link or continue with Google OAuth."
          actions={<LoginHeroActions />}
        />
      }
      className="gap-12"
    >
      <div className="mb-4">
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800"
        >
          ← Back to Home
        </Link>
      </div>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white">Email a secure login link</h2>
          <p className="text-sm text-slate-200/80">
            Alumni Hub issues passwordless magic links so you can sign in quickly while keeping profiles safe.
            Enter your address below and we&apos;ll take care of the rest.
          </p>
          <LoginForm />
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-slate-200/90">
          <h3 className="text-lg font-semibold text-white">Having trouble signing in?</h3>
          <ul className="space-y-4">
            <li>
              Make sure you&apos;re using the email your alumni program has on file. Forwarding aliases usually work.
            </li>
            <li>Check your spam folder for 
              <span className="ml-1 font-medium text-indigo-200">access@alumni-hub.example</span>
              .
            </li>
            <li>
              Still no luck? Email
              <Link href="mailto:support@alumni-hub.example" className="ml-1 text-indigo-200 underline">
                support@alumni-hub.example
              </Link>
              so we can grant access manually.
            </li>
          </ul>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-slate-200/90">
              Sessions stay active for 30 days on trusted devices. Need to sign out everywhere? Email
              <Link href="mailto:support@alumni-hub.example" className="ml-1 text-indigo-200 underline">
                support@alumni-hub.example
              </Link>
              so we can reset trusted sessions for you.
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200/90"
          >
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-slate-200/80">{item.description}</p>
          </div>
        ))}
      </section>
    </MarketingShell>
  );
}
