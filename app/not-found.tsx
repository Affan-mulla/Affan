import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center gap-6 px-4 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
        Error 404
      </p>
      <h1 className="font-display text-[clamp(3rem,12vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
        Page Not Found
      </h1>
      <p className="max-w-xl text-sm leading-7 text-(--color-text-muted)">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-(--color-border-hover) hover:bg-(--color-surface-2)"
      >
        {"\u2190"} Back to home
      </Link>
    </main>
  );
}
