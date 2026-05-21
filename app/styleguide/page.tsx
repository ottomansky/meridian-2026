import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";
import { KpiTile } from "@/components/ui/kpi";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design-system baseline — tokens, type, motion, components.",
};

const SURFACE_TOKENS: { name: string; varName: string; oklch: string }[] = [
  { name: "ink", varName: "--color-ink", oklch: "0.135 0.014 250" },
  { name: "ink-rise", varName: "--color-ink-rise", oklch: "0.165 0.014 250" },
  { name: "ink-high", varName: "--color-ink-high", oklch: "0.21 0.014 250" },
  { name: "ink-edge", varName: "--color-ink-edge", oklch: "0.28 0.014 250" },
  { name: "paper", varName: "--color-paper", oklch: "0.97 0.006 82" },
  { name: "paper-soft", varName: "--color-paper-soft", oklch: "0.82 0.008 82" },
  { name: "paper-mute", varName: "--color-paper-mute", oklch: "0.62 0.012 250" },
];

const ACCENT_TOKENS: { name: string; varName: string; oklch: string }[] = [
  { name: "flux", varName: "--color-flux", oklch: "0.82 0.15 198" },
  { name: "flux-deep", varName: "--color-flux-deep", oklch: "0.68 0.18 200" },
  { name: "flux-glow", varName: "--color-flux-glow", oklch: "0.9 0.12 196" },
];

const IRIS_TOKENS: { name: string; varName: string; oklch: string }[] = [
  { name: "iris-1 / coral", varName: "--color-iris-1", oklch: "0.7 0.22 14" },
  { name: "iris-2 / cyan", varName: "--color-iris-2", oklch: "0.78 0.18 198" },
  { name: "iris-3 / violet", varName: "--color-iris-3", oklch: "0.72 0.2 290" },
  { name: "iris-4 / acid", varName: "--color-iris-4", oklch: "0.86 0.16 105" },
];

const TYPE_SCALE = [
  { name: "display", rem: "14rem", px: "224px", cls: "display" },
  { name: "7xl", rem: "10rem", px: "160px", cls: "text-7xl" },
  { name: "6xl", rem: "7rem", px: "112px", cls: "text-6xl" },
  { name: "5xl", rem: "5rem", px: "80px", cls: "text-5xl" },
  { name: "4xl", rem: "3.5rem", px: "56px", cls: "text-4xl" },
  { name: "3xl", rem: "2.5rem", px: "40px", cls: "text-3xl" },
  { name: "2xl", rem: "1.875rem", px: "30px", cls: "text-2xl" },
  { name: "xl", rem: "1.375rem", px: "22px", cls: "text-xl" },
  { name: "lg", rem: "1.125rem", px: "18px", cls: "text-lg" },
  { name: "base", rem: "1rem", px: "16px", cls: "text-base" },
  { name: "sm", rem: "0.875rem", px: "14px", cls: "text-sm" },
  { name: "xs", rem: "0.75rem", px: "12px", cls: "text-xs" },
];

const EASINGS = [
  { name: "out-quint", curve: "0.22, 1, 0.36, 1", note: "default in-motion" },
  { name: "out-expo", curve: "0.16, 1, 0.3, 1", note: "counters, big swings" },
  { name: "in-out-quad", curve: "0.45, 0, 0.55, 1", note: "bidirectional" },
  { name: "back", curve: "0.34, 1.56, 0.64, 1", note: "spring-feel" },
  { name: "instr", curve: "0.65, 0, 0.35, 1", note: "instrument — deliberate" },
];

export default function StyleguidePage() {
  return (
    <main className="px-6 md:px-10 pb-32">
      {/* ─────────────────────────────────────────────────────────────
          HERO — the design-system declaration. Asymmetric, magazine.
          ───────────────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
          <Eyebrow>01 — design-system baseline · v0</Eyebrow>
          <h1
            className="font-display text-balance leading-[0.88] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(3rem, 12vw, 9rem)",
              fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 80, "WONK" 0',
            }}
          >
            Instruments,
            <br />
            <span className="text-[color:var(--accent)] italic">not</span> reports.
          </h1>
          <p className="max-w-xl text-[color:var(--fg-soft)] text-lg text-pretty">
            This page is the source of truth for every token, every primitive, every motion
            curve. Pages compose from here — never below. If a colour, font, or easing isn't
            on this page, it doesn't exist.
          </p>
        </div>
        <aside className="col-span-12 md:col-span-5 md:col-start-9 self-end">
          <div className="grid grid-cols-2 gap-px bg-[color:var(--edge)] border border-[color:var(--edge)]">
            <Datum label="surface tokens" value="14" />
            <Datum label="type stops" value="12" />
            <Datum label="easings" value="05" />
            <Datum label="primitives" value="04" />
          </div>
          <p className="mt-4 eyebrow text-[color:var(--fg-mute)]">
            ↓ scroll · all tokens listed below
          </p>
        </aside>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          COLOR
          ───────────────────────────────────────────────────────────── */}
      <SectionHeader index="02" eyebrow="color" id="color">
        oklch end-to-end. <span className="text-[color:var(--accent)]">One</span> accent.
      </SectionHeader>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <Eyebrow className="mb-3 block">surfaces</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SURFACE_TOKENS.map((t) => (
              <Swatch key={t.varName} {...t} />
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
          <div>
            <Eyebrow className="mb-3 block">accent · flux</Eyebrow>
            <div className="grid gap-3">
              {ACCENT_TOKENS.map((t) => (
                <Swatch key={t.varName} {...t} accent />
              ))}
            </div>
          </div>
          <div>
            <Eyebrow className="mb-3 block">iridescent — shaders only</Eyebrow>
            <div className="grid grid-cols-2 gap-3">
              {IRIS_TOKENS.map((t) => (
                <Swatch key={t.varName} {...t} compact />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TYPE — asymmetric, with the oversized moment
          ───────────────────────────────────────────────────────────── */}
      <SectionHeader index="03" eyebrow="type" id="type">
        Fraunces · Bricolage · JetBrains Mono.
      </SectionHeader>

      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-9 relative">
          <span
            className="display block text-[color:var(--accent)] select-none"
            aria-hidden
            style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 100, "WONK" 1' }}
          >
            Aa
          </span>
          <Eyebrow className="absolute top-4 right-0 text-[color:var(--fg-mute)]">
            fraunces · opsz 144 · wonk
          </Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-3 flex flex-col gap-2 self-end">
          <Eyebrow>display ratio</Eyebrow>
          <p className="font-mono text-sm text-[color:var(--fg-soft)] nums">~1.333 · perfect fourth</p>
          <Hairline className="my-2" />
          <Eyebrow>body line-height</Eyebrow>
          <p className="font-mono text-sm text-[color:var(--fg-soft)] nums">1.6</p>
          <Hairline className="my-2" />
          <Eyebrow>tracking</Eyebrow>
          <p className="font-mono text-sm text-[color:var(--fg-soft)] nums">
            display −0.04em · body −0.01em
          </p>
        </div>

        <div className="col-span-12">
          <Hairline />
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-6">
          {TYPE_SCALE.map((row) => (
            <TypeRow key={row.name} {...row} />
          ))}
        </div>

        <div className="col-span-12">
          <Hairline />
        </div>

        <div className="col-span-12 md:col-span-6">
          <Eyebrow className="mb-3 block">body · bricolage grotesque</Eyebrow>
          <p className="text-lg text-[color:var(--fg)] text-pretty max-w-prose leading-[1.6]">
            The brief calls this aesthetic <em>alien</em> — clinical instrument panels for things
            that haven't been built yet. Body copy lives at 18px / 1.6, optical-sized for screen.
            Headlines drop into Fraunces with negative tracking and the SOFT axis pushed past 80
            so terminals on serifs round and read almost dichroic.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Eyebrow className="mb-3 block">mono · jetbrains variable</Eyebrow>
          <pre className="font-mono text-sm leading-[1.6] text-[color:var(--fg-soft)] tracking-wide whitespace-pre-wrap">
{`> meridian.read("signal:CLA.churn_risk")
< 0xff42a6  → cohort_id = "2026-Q2"
< 1.873s elapsed · 4,219 rows scanned
< confidence = 0.94 · drift_index = 0.02
✓ instrumented`}
          </pre>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SPACING + EASINGS
          ───────────────────────────────────────────────────────────── */}
      <SectionHeader index="04" eyebrow="space + motion" id="spacing">
        Rulers, easings, no surprises.
      </SectionHeader>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <Eyebrow className="mb-4 block">spacing — base × n (base = 0.25rem)</Eyebrow>
          <div className="flex items-end gap-2 flex-wrap">
            {[1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48].map((n) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div
                  className="bg-[color:var(--accent)] w-3"
                  style={{ height: `calc(var(--spacing) * ${n})` }}
                  aria-hidden
                />
                <span className="font-mono text-[0.65rem] text-[color:var(--fg-mute)] nums">{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-5" id="motion">
          <Eyebrow className="mb-4 block">easings</Eyebrow>
          <div className="grid gap-3">
            {EASINGS.map((e) => (
              <div
                key={e.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2 border-b border-[color:var(--edge)]"
              >
                <span className="font-mono text-xs text-[color:var(--fg)] tracking-wider uppercase">
                  {e.name}
                </span>
                <code className="font-mono text-[0.7rem] text-[color:var(--fg-mute)] nums truncate">
                  cubic-bezier({e.curve})
                </code>
                <span className="eyebrow text-[color:var(--fg-mute)] hidden md:inline">{e.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          COMPONENTS
          ───────────────────────────────────────────────────────────── */}
      <SectionHeader index="05" eyebrow="components" id="components">
        Primitives. Restyled aggressively. No defaults.
      </SectionHeader>

      <div className="grid grid-cols-12 gap-6">
        <Surface className="col-span-12 md:col-span-7 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Eyebrow>buttons</Eyebrow>
            <Eyebrow className="text-[color:var(--fg-mute)]">cva variants</Eyebrow>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Get instrumented</Button>
            <Button variant="ghost">Read manifesto</Button>
            <Button variant="pill">Live signals →</Button>
            <Button variant="bare">cancel</Button>
          </div>
          <Hairline />
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg">
              Primary lg
            </Button>
            <Button variant="primary" size="sm">
              Primary sm
            </Button>
            <Button variant="ghost" size="sm">
              Ghost sm
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Surface>

        <Surface className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Eyebrow>card · surface</Eyebrow>
            <Eyebrow className="text-[color:var(--fg-mute)]">grain · hairline</Eyebrow>
          </div>
          <h3 className="text-2xl text-[color:var(--fg)] tracking-tight">
            A surface is a hairline-bordered rise off the ink.
          </h3>
          <p className="text-sm text-[color:var(--fg-soft)] text-pretty leading-relaxed">
            Surfaces inherit grain through <code className="font-mono text-xs text-[color:var(--accent)]">.surface-grain</code>.
            The default radius is <code className="font-mono text-xs">lg</code> · 14px.
          </p>
        </Surface>

        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiTile
            label="active accounts"
            value="4,219"
            delta={{ direction: "up", magnitude: "+12.4%" }}
            caption="cohort 2026-Q2"
          />
          <KpiTile
            label="churn risk"
            value="2.1"
            unit="%"
            delta={{ direction: "down", magnitude: "−0.4 pp" }}
            caption="rolling 30 day · model v3"
          />
          <KpiTile
            label="lifetime value"
            value="$8,914"
            delta={{ direction: "up", magnitude: "+218" }}
            caption="median, top decile"
          />
          <KpiTile
            label="signal drift"
            value="0.02"
            delta={{ direction: "flat", magnitude: "stable" }}
            caption="vs. baseline · last 7d"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          The oversized moment — every page gets one.
          ───────────────────────────────────────────────────────────── */}
      <section className="mt-32 relative">
        <Eyebrow className="absolute top-0 right-0">06 — page mark</Eyebrow>
        <p
          className="display select-none leading-[0.78] tracking-[-0.07em] text-[color:var(--fg)] mix-blend-difference"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 320, "SOFT" 100, "WONK" 1' }}
        >
          v0.
        </p>
        <p className="absolute bottom-2 left-0 max-w-md text-sm text-[color:var(--fg-soft)] text-pretty">
          One oversized word, number, or glyph per page — breaks the grid on purpose.
          The brief calls this out. Without it, the page reads like a competent template.
        </p>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Local composition helpers — not exported. Live close to the styleguide
   so they don't tempt premature reuse.
   ────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  index,
  eyebrow,
  id,
  children,
}: {
  index: string;
  eyebrow: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-32 mb-10 grid grid-cols-12 gap-6 items-end" id={id}>
      <div className="col-span-12 md:col-span-2 flex flex-col gap-1">
        <span className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">
          {index}
        </span>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="col-span-12 md:col-span-10 text-balance text-3xl md:text-5xl tracking-tight leading-[0.95] text-[color:var(--fg)]">
        {children}
      </h2>
      <div className="col-span-12">
        <Hairline />
      </div>
    </section>
  );
}

function Datum({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[color:var(--bg)] p-4 flex flex-col gap-1">
      <span className="eyebrow text-[color:var(--fg-mute)]">{label}</span>
      <span
        className="font-display text-3xl nums leading-none"
        style={{ fontVariationSettings: '"opsz" 144, "wght" 460' }}
      >
        {value}
      </span>
    </div>
  );
}

function Swatch({
  name,
  varName,
  oklch,
  accent = false,
  compact = false,
}: {
  name: string;
  varName: string;
  oklch: string;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex ${compact ? "flex-col gap-2" : "flex-col gap-3"} group/sw`}
    >
      <div
        className={`relative h-${compact ? "16" : "24"} w-full overflow-hidden border border-[color:var(--edge)]`}
        style={{ backgroundColor: `var(${varName})` }}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: "var(--grain-url)", backgroundSize: 180 }}
        />
        {accent && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(${varName}), transparent 70%)`,
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-[color:var(--fg)] tracking-wider">{name}</span>
        <span className="font-mono text-[0.65rem] text-[color:var(--fg-mute)] nums tabular-nums truncate">
          oklch({oklch})
        </span>
      </div>
    </div>
  );
}

function TypeRow({ name, rem, px, cls }: { name: string; rem: string; px: string; cls: string }) {
  const isDisplay = name === "display";
  return (
    <div className="col-span-12 grid grid-cols-12 gap-4 items-baseline border-b border-[color:var(--edge)] pb-6">
      <span className="col-span-2 md:col-span-1 font-mono text-xs text-[color:var(--fg-mute)] nums">
        {name}
      </span>
      <span className="col-span-10 md:col-span-2 font-mono text-xs text-[color:var(--fg-mute)] nums">
        {rem} · {px}
      </span>
      <span
        className={`col-span-12 md:col-span-9 font-display leading-[0.95] tracking-tight ${cls} text-[color:var(--fg)] truncate`}
        style={
          isDisplay
            ? { fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 80', fontSize: "clamp(4rem, 12vw, 14rem)" }
            : undefined
        }
      >
        Meridian — {name}
      </span>
    </div>
  );
}
