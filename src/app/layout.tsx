import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alumni Hub",
    template: "%s • Alumni Hub",
  },
  description:
    "Centralized alumni engagement platform for profiles, mentorship, events, and giving.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Alumni Hub",
    description:
      "Centralized alumni engagement platform for profiles, mentorship, events, and giving.",
    url: siteUrl,
    siteName: "Alumni Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alumni Hub",
    description:
      "Centralized alumni engagement platform for profiles, mentorship, events, and giving.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ background: "linear-gradient(135deg, #0a1014 0%, #19c3e6 100%)", color: "#eafcff" }}
      >
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
