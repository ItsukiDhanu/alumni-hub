'use client';

import { FormEvent, useState } from "react";
import Link from "next/link";

const roleOptions = [
  { value: "alumni", label: "Alumni" },
  { value: "student", label: "Current student" },
  { value: "admin", label: "Program administrator" },
];

type Status =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(roleOptions[0].value);
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (status) {
      setStatus(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, role, rememberMe }),
      });

      const payload: { message?: string; error?: string; simulated?: boolean } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({ type: "error", message: payload.error ?? "We couldn't sign you in. Try again soon." });
        return;
      }

      const successMessage =
        payload.message ??
        (payload.simulated
          ? "Database is not configured yet, so we simulated a login. We'll email you a magic link in production."
          : "Check your inbox for a secure link to finish signing in.");

      setStatus({ type: "success", message: successMessage });
    } catch (error) {
      console.error("Login request failed", error);
      setStatus({ type: "error", message: "Network error. Please try again in a moment." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Campus email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
          placeholder="you@alumni-hub.edu"
        />
        <p className="text-xs text-slate-300/70">
          Use the email managed by your alumni program. We’ll send a secure login link to this address.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-white">
            Choose your role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200/80">
          <h3 className="text-sm font-semibold text-white">What happens next?</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>We verify your email against our alumni directory.</li>
            <li>Approved addresses get a short-lived magic link.</li>
            <li>Still waiting? Contact your program admin to request access.</li>
          </ul>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-200/80">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-white/30 bg-black/40 text-indigo-500 focus:ring-indigo-400"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember me on this device for 30 days
      </label>

      {status ? (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/40 bg-rose-400/10 text-rose-100"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-150 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending secure link…" : "Email me a login link"}
      </button>

      <p className="text-xs text-slate-400">
        By continuing, you agree to our
        <Link className="ml-1 text-indigo-200 underline" href="/privacy">
          privacy policy
        </Link>
        and
        <Link className="ml-1 text-indigo-200 underline" href="/terms">
          terms of use
        </Link>
        .
      </p>
    </form>
  );
}
