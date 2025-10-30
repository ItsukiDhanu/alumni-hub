'use client';

import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";

export function LoginHeroActions() {
  const { status } = useSession();

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return <GoogleSignInButton />;
}
