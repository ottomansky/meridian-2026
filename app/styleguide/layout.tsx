import Link from "next/link";
import { Hairline } from "@/components/ui/surface";

const NAV = [
  { href: "/styleguide", label: "Index" },
  { href: "/styleguide#color", label: "Color" },
  { href: "/styleguide#type", label: "Type" },
  { href: "/styleguide#spacing", label: "Spacing" },
  { href: "/styleguide#motion", label: "Motion" },
  { href: "/styleguide#components", label: "Components" },
];

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 glass">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between gap-8">
          <Link href="/" className="eyebrow flux-hover">
            MERIDIAN <span className="text-[color:var(--fg-mute)]">/ styleguide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="eyebrow px-3 py-1 text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] transition-colors duration-300 ease-[var(--ease-out-quint)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="eyebrow text-[color:var(--fg-mute)] hidden sm:block">v0.1 · 2026</span>
        </div>
        <Hairline />
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-[color:var(--edge)] mt-32 px-6 md:px-10 py-10 flex items-center justify-between text-xs text-[color:var(--fg-mute)]">
        <span className="eyebrow">— meridian / 2026 / a stub for the real thing</span>
        <span className="eyebrow">styleguide · v0</span>
      </footer>
    </div>
  );
}
