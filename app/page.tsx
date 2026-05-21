import Link from "next/link";

export default function Index() {
  return (
    <main className="min-h-dvh px-8 py-16 flex flex-col gap-12">
      <header className="flex items-center justify-between">
        <span className="eyebrow">MERIDIAN / 2026</span>
        <span className="eyebrow">design-system baseline · v0</span>
      </header>

      <section className="flex flex-col gap-6">
        <h1 className="display">Meridian.</h1>
        <p className="max-w-xl text-[color:var(--fg-soft)] text-pretty">
          An operating system for customer-lifecycle intelligence. Signals, not dashboards.
          Instruments, not reports. This page is a stub — the design system lives at{" "}
          <Link href="/styleguide" className="text-[color:var(--accent)] underline-offset-4 hover:underline">
            /styleguide
          </Link>
          .
        </p>
      </section>

      <footer className="mt-auto flex items-center justify-between text-xs text-[color:var(--fg-mute)] eyebrow">
        <span>—</span>
        <span>Powered by Keboola</span>
      </footer>
    </main>
  );
}
