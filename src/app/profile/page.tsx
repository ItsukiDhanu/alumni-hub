'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Availability = "open" | "limited" | "closed";

type ProfileDraft = {
  displayName: string;
  headline: string;
  bio: string;
  location: string;
  areasOfFocus: string;
  linkedinUrl: string;
  availability: Availability;
  mentoring: boolean;
  updatedAt?: string;
};

const COMPLETENESS_FIELDS: Array<keyof ProfileDraft> = [
  "displayName",
  "headline",
  "bio",
  "location",
  "areasOfFocus",
  "linkedinUrl",
];

function createDefaultDraft(name: string = ""): ProfileDraft {
  return {
    displayName: name,
    headline: "",
    bio: "",
    location: "",
    areasOfFocus: "",
    linkedinUrl: "",
    availability: "open",
    mentoring: true,
    updatedAt: undefined,
  };
}

function getStorageKey(email?: string | null) {
  return email ? `alumni-hub.profile.${email}` : "alumni-hub.profile";
}

function formatLastUpdated(value?: string) {
  if (!value) {
    return "Not saved yet";
  }
  try {
    return new Date(value).toLocaleString();
  } catch (error) {
    console.error("Failed to format date", error);
    return value;
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [draft, setDraft] = useState<ProfileDraft>(createDefaultDraft());
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) {
      return;
    }

    const key = getStorageKey(session.user.email);
    setStorageKey(key);

    let nextDraft = createDefaultDraft(session.user.name ?? session.user.email ?? "");

    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as ProfileDraft;
          nextDraft = {
            ...nextDraft,
            ...parsed,
            displayName: parsed.displayName || nextDraft.displayName,
          };
        } catch (error) {
          console.warn("Failed to parse stored profile draft", error);
        }
      }
    }

    setDraft(nextDraft);
    setHydrated(true);
  }, [session?.user, status]);

  const completeness = useMemo(() => {
    const filled = COMPLETENESS_FIELDS.reduce((acc, key) => {
      const value = draft[key];
      if (typeof value === "boolean") {
        return acc + (value ? 1 : 0);
      }
      return acc + (value?.toString().trim().length ? 1 : 0);
    }, 0);
    const total = COMPLETENESS_FIELDS.length;
    return Math.min(100, Math.round((filled / total) * 100));
  }, [draft]);

  if (status === "loading" || !hydrated) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-6">
        <p className="text-sm text-slate-200/80">Loading your profile…</p>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  function handleFieldChange<Key extends keyof ProfileDraft>(key: Key, value: ProfileDraft[Key]) {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }));
    setSavingState("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!storageKey) {
      return;
    }
    setSavingState("saving");

    const nextDraft: ProfileDraft = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(nextDraft));
      }
      // mimic persistence latency for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDraft(nextDraft);
      setSavingState("saved");
      setTimeout(() => setSavingState("idle"), 2500);
    } catch (error) {
      console.error("Failed to save profile", error);
      setSavingState("error");
    }
  }

  function handleReset() {
    if (!storageKey) {
      return;
    }
    const resetDraft = createDefaultDraft(user.name ?? user.email ?? "");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
    setDraft(resetDraft);
    setSavingState("idle");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-6 text-white md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${draft.displayName || user.email}'s avatar`}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <span className="text-lg font-semibold">
                {(draft.displayName || user.email || "").slice(0, 2).toUpperCase()}
              </span>
            )}
          </span>
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-200/70">Account</p>
            <h1 className="text-3xl font-semibold">{draft.displayName || user.name || user.email}</h1>
            <p className="text-sm text-slate-200/80">Last synced: {formatLastUpdated(draft.updatedAt)}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-200/80">
          <p>Profile completeness</p>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{ width: `${completeness}%` }} />
          </div>
          <p className="text-xs text-slate-300/70">{completeness}% of key details filled out</p>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8 text-white" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Profile details</h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="displayName">
              Display name
            </label>
            <input
              id="displayName"
              value={draft.displayName}
              onChange={(event) => handleFieldChange("displayName", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              placeholder="How your name should appear"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="headline">
              Headline
            </label>
            <input
              id="headline"
              value={draft.headline}
              onChange={(event) => handleFieldChange("headline", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              placeholder="e.g. Product Lead at Aurora • Class of 2015"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={draft.bio}
              onChange={(event) => handleFieldChange("bio", event.target.value)}
              className="h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              placeholder="Share current projects, interests, or how you give back to the community."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                value={draft.location}
                onChange={(event) => handleFieldChange("location", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                placeholder="City, Country"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200" htmlFor="availability">
                Mentorship availability
              </label>
              <select
                id="availability"
                value={draft.availability}
                onChange={(event) => handleFieldChange("availability", event.target.value as Availability)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                <option value="open" className="text-black">
                  Open to new mentees
                </option>
                <option value="limited" className="text-black">
                  Limited availability
                </option>
                <option value="closed" className="text-black">
                  Currently unavailable
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="areasOfFocus">
              Areas of focus
            </label>
            <input
              id="areasOfFocus"
              value={draft.areasOfFocus}
              onChange={(event) => handleFieldChange("areasOfFocus", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              placeholder="e.g. Product strategy, early-stage fundraising, sustainable supply chains"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="linkedinUrl">
              LinkedIn or portfolio URL
            </label>
            <input
              id="linkedinUrl"
              value={draft.linkedinUrl}
              onChange={(event) => handleFieldChange("linkedinUrl", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              placeholder="https://www.linkedin.com/in/your-profile"
              required
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={draft.mentoring}
              onChange={(event) => handleFieldChange("mentoring", event.target.checked)}
              className="h-4 w-4 rounded border-white/30 bg-black/40 text-indigo-500 focus:ring-indigo-400"
            />
            I’m open to being contacted for mentorship or alumni panels.
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={savingState === "saving"}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition enabled:hover:from-indigo-700 enabled:hover:via-purple-700 enabled:hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingState === "saving" ? "Saving…" : savingState === "saved" ? "Profile saved" : "Save profile"}
            </button>
            {savingState === "error" ? (
              <span className="text-sm text-rose-300">We couldn’t save your details. Please try again.</span>
            ) : null}
          </div>
        </form>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-slate-200/90">
          <div>
            <h3 className="text-lg font-semibold text-white">Profile preview</h3>
            <p className="mt-2 text-slate-200/80">
              This is how your profile appears to alumni you connect with. Keeping these details fresh helps mentees and collaborators find you faster.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5">
            <h4 className="text-base font-semibold text-white">{draft.displayName || user.name || user.email}</h4>
            <p className="text-sm text-indigo-200">{draft.headline || "Add a headline to stand out."}</p>
            <p className="text-sm leading-relaxed text-slate-200/80">{draft.bio || "Share a short intro so other alumni know how to reach out."}</p>

            <div className="grid gap-2 text-sm">
              <p className="font-medium text-white">Contact</p>
              <p className="text-slate-200/80">
                <span className="block">{user.email}</span>
                {draft.location ? <span className="block">📍 {draft.location}</span> : null}
              </p>
            </div>

            <div className="grid gap-2 text-sm">
              <p className="font-medium text-white">Focus areas</p>
              <p className="text-slate-200/80">{draft.areasOfFocus || "Highlight the topics you champion."}</p>
            </div>

            <div className="grid gap-2 text-sm">
              <p className="font-medium text-white">Availability</p>
              <p className="text-slate-200/80">
                {draft.availability === "open"
                  ? "Actively accepting new connections"
                  : draft.availability === "limited"
                    ? "Limited bandwidth — best for short chats"
                    : "Unavailable right now"}
              </p>
              <p className="text-slate-200/70">{draft.mentoring ? "✅ happy to mentor" : "🚫 no mentorship requests"}</p>
            </div>

            {draft.linkedinUrl ? (
              <Link
                href={draft.linkedinUrl.startsWith("http") ? draft.linkedinUrl : `https://${draft.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-200 underline-offset-4 transition hover:text-indigo-100 hover:underline"
              >
                View external profile ↗
              </Link>
            ) : null}
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-slate-200/80">
            <h4 className="text-base font-semibold text-white">Connected accounts</h4>
            <p>Google sign-in keeps your profile protected and lets us sync your email automatically.</p>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="font-medium text-white">Google</p>
                <p className="text-xs text-slate-300/70">{user.email}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-300">Connected</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
