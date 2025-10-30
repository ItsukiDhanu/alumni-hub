import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedRoles = new Set(["alumni", "student", "admin"]);

type LoginPayload = {
  email?: unknown;
  role?: unknown;
  rememberMe?: unknown;
};

export async function POST(request: Request) {
  let body: LoginPayload;

  try {
    body = (await request.json()) as LoginPayload;
  } catch (error) {
    console.error("Invalid login request payload", error);
    return NextResponse.json(
      { error: "We couldn't read your request. Try again." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = typeof body.role === "string" ? body.role : undefined;
  const rememberMe = typeof body.rememberMe === "boolean" ? body.rememberMe : false;

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (role && !allowedRoles.has(role)) {
    return NextResponse.json(
      { error: "Unknown role selection." },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      message: "Login simulated. Configure DATABASE_URL to validate emails against your directory.",
      simulated: true,
      rememberMe,
      role,
      user: { email },
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "We couldn't find that email. Request access from your program administrator." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Login verified. Check your inbox for a secure link to finish signing in.",
      rememberMe,
      role,
      user,
    });
  } catch (error) {
    console.error("Login lookup failed", error);
    return NextResponse.json(
      { error: "We ran into a problem signing you in. Try again shortly." },
      { status: 500 },
    );
  }
}
