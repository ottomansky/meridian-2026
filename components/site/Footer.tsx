import Link from "next/link";
import { Eyebrow, Hairline } from "@/components/ui/surface";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--edge)] surface-grain">
      <div className="px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-6">
            <p
              className="font-display text-balance leading-[0.9] tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontVariationSettings: '"opsz" 144, "wght" 420, "SOFT" 100',
              }}
            >
              Make the next
              <br />
              <span className="italic text-[color:var(--accent)]">customer hour</span> count.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <Eyebrow>product</Eyebrow>
            <FooterLink href="/product">Overview</FooterLink>
            <FooterLink href="/signals">Live signals</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/styleguide">Styleguide</FooterLink>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <Eyebrow>company</Eyebrow>
            <FooterLink href="/manifesto">Manifesto</FooterLink>
            <FooterLink href="https://github.com/" external>
              GitHub ↗
            </FooterLink>
            <FooterLink href="mailto:hello@meridian.example">hello@meridian.example</FooterLink>
          </div>
        </div>

        <Hairline className="mt-20 mb-6" />

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <span className="eyebrow text-[color:var(--fg-mute)]">
            © 2026 · meridian · all rights reserved
          </span>
          <span className="eyebrow text-[color:var(--fg-mute)] flex items-center gap-2">
            powered by
            <Link href="https://keboola.com" className="text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] transition-colors">
              keboola
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:translate-x-1 transition-[color,transform] duration-300 ease-[var(--ease-out-quint)] w-fit"
    >
      {children}
    </Link>
  );
}
