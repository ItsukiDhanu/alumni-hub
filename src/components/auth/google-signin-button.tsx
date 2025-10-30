'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type GoogleSignInButtonProps = {
  className?: string;
  label?: string;
};

export function GoogleSignInButton({ className, label = "Continue with Google" }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign-in failed", error);
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-80",
        className,
      )}
    >
      {isLoading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.22-1.39 3.59-5.27 3.59-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.81 0 3.02.77 3.71 1.43l2.53-2.46C17.09 3.88 15.36 3 13.18 3 7.98 3 4 7.03 4 12s3.98 9 9.18 9c5.29 0 8.79-3.72 8.79-8.97 0-.6-.07-1.19-.18-1.93z" />
        </svg>
      )}
      {isLoading ? "Redirecting…" : label}
    </button>
  );
}
