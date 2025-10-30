import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <p className="mb-6 text-gray-500">Sign in functionality coming soon.</p>
      <Link href="/" className="text-violet-600 hover:underline">Back to Home</Link>
    </main>
  );
}
