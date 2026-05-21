import Link from "next/link";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/button";
import { Hairline } from "@/components/ui/surface";

const NAV = [
  { href: "/product", label: "Product" },
  { href: "/signals", label: "Live Signals" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="px-6 md:px-10 py-3 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg tracking-tight"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 480, "SOFT" 60' }}
        >
          <Mark />
          <span>Meridian</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow px-3 py-1.5 text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] transition-colors duration-300 ease-[var(--ease-out-quint)]"
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-[color:var(--edge)]" aria-hidden />
          <Link
            href="/styleguide"
            className="eyebrow px-3 py-1.5 text-[color:var(--fg-mute)] hover:text-[color:var(--fg)] transition-colors"
          >
            ↳ styleguide
          </Link>
        </nav>
        <Magnetic radius={120} strength={0.3}>
          <Button variant="primary" size="sm" data-cursor="link">
            Request access
          </Button>
        </Magnetic>
      </div>
      <Hairline />
    </header>
  );
}

function Mark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Meridian mark</title>
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <circle cx="11" cy="6" r="1.2" fill="var(--accent)" />
    </svg>
  );
}
