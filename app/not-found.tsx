import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs text-faint">HTTP 404 — route not found</p>
      <h1 className="mt-4 text-3xl font-semibold text-fg">This pipeline has no such stage.</h1>
      <Link
        href="/"
        className="mt-8 rounded-md border border-line-bright px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
      >
        ← back to start
      </Link>
    </main>
  );
}
