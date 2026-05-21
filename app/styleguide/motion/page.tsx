import type { Metadata } from "next";
import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { ParallaxPlane, ParallaxScene } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ShaderBackgroundClient } from "@/components/r3f/ShaderBackground.client";
import { Button } from "@/components/ui/button";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";

export const metadata: Metadata = {
  title: "Motion · Styleguide",
  description: "Motion primitives — magnetic, marquee, reveal, counter, parallax, shader.",
};

const TICKER = [
  "MERIDIAN",
  "·",
  "instruments not reports",
  "·",
  "cohort drift 0.02",
  "·",
  "ltv +218",
  "·",
  "model v3",
  "·",
  "signal/noise 0.94",
  "·",
];

export default function MotionStyleguidePage() {
  return (
    <main className="px-6 md:px-10 pb-32">
      {/* Hero — shader background */}
      <section className="relative -mx-6 md:-mx-10 mt-0 h-[60vh] min-h-[420px] overflow-hidden border-b border-[color:var(--edge)]">
        <ShaderBackgroundClient className="absolute inset-0" />
        <div className="relative z-10 h-full px-6 md:px-10 flex flex-col justify-end pb-12">
          <Eyebrow>motion / styleguide</Eyebrow>
          <h1
            className="font-display text-balance leading-[0.9] tracking-[-0.04em] mt-3"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 7rem)",
              fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 80',
            }}
          >
            Earn every motion.
          </h1>
          <p className="mt-4 max-w-lg text-[color:var(--fg-soft)] text-pretty">
            Eight primitives. Every page composes from these — never below. The hero
            you're looking at is one of them.
          </p>
        </div>
      </section>

      {/* Magnetic */}
      <PrimitiveSection
        index="01"
        name="Magnetic"
        intent="Cursor pulls children within a radius. Spring physics. Off on touch + reduced-motion."
      >
        <div className="flex flex-wrap items-center gap-8">
          <Magnetic radius={160} strength={0.4}>
            <Button variant="primary" data-cursor="link">
              Magnetic primary
            </Button>
          </Magnetic>
          <Magnetic radius={120} strength={0.3}>
            <Button variant="ghost">Magnetic ghost</Button>
          </Magnetic>
          <Magnetic radius={220} strength={0.5}>
            <Button variant="pill">Stronger pull</Button>
          </Magnetic>
        </div>
        <Spec>
          <code>radius=160 · strength=0.4 · spring(stiffness=320, damping=24)</code>
        </Spec>
      </PrimitiveSection>

      {/* Marquee */}
      <PrimitiveSection
        index="02"
        name="Marquee"
        intent="GPU-only infinite scroll. Pauses on hover. Pure CSS animation; reduced-motion freezes."
      >
        <Surface className="-mx-6 md:-mx-10 px-0 py-6 surface-grain border-x-0">
          <Marquee speed={48}>
            {TICKER.map((t, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: static ticker
                key={i}
                className="font-display text-3xl md:text-5xl tracking-tight text-[color:var(--fg)]"
                style={{ fontVariationSettings: '"opsz" 144, "wght" 360' }}
              >
                {t}
              </span>
            ))}
          </Marquee>
          <Hairline className="my-6" />
          <Marquee speed={80} reverse>
            {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].map((n) => (
              <span
                key={n}
                className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums uppercase"
              >
                ↳ signal-{n}
              </span>
            ))}
          </Marquee>
        </Surface>
        <Spec>
          <code>speed=48s · reverse · pause-on-hover</code>
        </Spec>
      </PrimitiveSection>

      {/* Reveal */}
      <PrimitiveSection
        index="03"
        name="Reveal"
        intent="Scroll-driven reveal via native CSS animation-timeline: view(). Stagger by index. Pure compositor."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["surface", "hairline", "grain", "glass", "flux-hover", "magnetic"].map((label, i) => (
            <Reveal key={label} index={i}>
              <Surface className="flex items-center justify-between">
                <Eyebrow>{label}</Eyebrow>
                <span className="font-mono text-xs text-[color:var(--fg-mute)] nums">
                  0{i + 1}
                </span>
              </Surface>
            </Reveal>
          ))}
        </div>
        <Spec>
          <code>stagger=80ms · animation-timeline: view() · range entry 5% → cover 35%</code>
        </Spec>
      </PrimitiveSection>

      {/* Counter */}
      <PrimitiveSection
        index="04"
        name="Counter"
        intent="ease-out-expo animated count, formatted with Intl.NumberFormat. Triggers on intersection."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CounterTile label="active accounts" value={4219} />
          <CounterTile
            label="churn risk"
            value={2.1}
            options={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
            unit="%"
          />
          <CounterTile
            label="lifetime value"
            value={8914}
            options={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          />
          <CounterTile
            label="cohort drift"
            value={0.02}
            options={{ minimumFractionDigits: 2 }}
          />
        </div>
      </PrimitiveSection>

      {/* Parallax */}
      <PrimitiveSection
        index="05"
        name="Parallax"
        intent="Three depth planes via perspective + translateZ. Layout is the same plane; depth adds atmosphere."
      >
        <ParallaxScene className="relative h-[280px] overflow-hidden surface surface-grain p-0" perspective={1200}>
          <ParallaxPlane depth={-300}>
            <div className="absolute right-12 top-8 font-display text-[10rem] leading-none text-[color:var(--accent)] opacity-30 select-none">
              ∞
            </div>
          </ParallaxPlane>
          <ParallaxPlane depth={-100}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-40 bg-[color:var(--edge)]" />
            </div>
          </ParallaxPlane>
          <ParallaxPlane depth={0}>
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="font-display text-4xl text-[color:var(--fg)] mix-blend-difference text-center"
                style={{ fontVariationSettings: '"opsz" 144, "wght" 460' }}
              >
                Depth as silence.
              </p>
            </div>
          </ParallaxPlane>
        </ParallaxScene>
        <Spec>
          <code>perspective=1200 · planes [−300, −100, 0] · transform-style: preserve-3d</code>
        </Spec>
      </PrimitiveSection>

      {/* Shader (already in hero, but worth showcasing the API) */}
      <PrimitiveSection
        index="06"
        name="Shader Background"
        intent="Fragment shader FBM, brand-palette mix, mouse-reactive offset. Reduces to radial gradient under prefers-reduced-motion."
      >
        <div className="relative h-[200px] overflow-hidden surface p-0">
          <ShaderBackgroundClient className="absolute inset-0" intensity={1.4} />
        </div>
        <Spec>
          <code>R3F · powerPreference=low-power · DPR cap=1.5 · 5-octave FBM</code>
        </Spec>
      </PrimitiveSection>

      {/* Cursor */}
      <PrimitiveSection
        index="07"
        name="Cursor"
        intent="Single global custom cursor. data-cursor='zoom' / 'link' / 'default'. Hidden on touch + reduced-motion."
      >
        <p className="text-sm text-[color:var(--fg-soft)] max-w-prose">
          The custom cursor is mounted at the root of any page that uses it (Phase 2). On
          this styleguide route it is not mounted by default — see{" "}
          <code className="text-[color:var(--accent)] font-mono">app/landing</code> for
          live usage. The element below previews the link-mode dot:
        </p>
        <div className="flex items-center gap-6">
          <span
            data-cursor="link"
            className="inline-flex items-center gap-3 px-5 py-3 border border-[color:var(--edge)]"
          >
            <span className="block w-2 h-2 rounded-full bg-[color:var(--accent)]" />
            hover target · link mode
          </span>
          <span
            data-cursor="zoom"
            data-cursor-label="explore"
            className="inline-flex items-center gap-3 px-5 py-3 border border-[color:var(--edge)] bg-[color:var(--bg-rise)]"
          >
            hover target · zoom mode
          </span>
        </div>
      </PrimitiveSection>

      <section className="mt-32 flex items-center justify-between border-t border-[color:var(--edge)] pt-8">
        <Link href="/styleguide" className="eyebrow flux-hover">
          ← back to styleguide
        </Link>
        <Link href="/" className="eyebrow flux-hover">
          to the landing →
        </Link>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function PrimitiveSection({
  index,
  name,
  intent,
  children,
}: {
  index: string;
  name: string;
  intent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-24">
      <header className="grid grid-cols-12 gap-6 items-baseline mb-8">
        <span className="col-span-2 md:col-span-1 font-mono text-xs text-[color:var(--fg-mute)] nums tracking-widest">
          {index}
        </span>
        <h2 className="col-span-10 md:col-span-4 text-balance text-3xl md:text-4xl tracking-tight leading-[0.95]">
          {name}
        </h2>
        <p className="col-span-12 md:col-span-7 text-[color:var(--fg-soft)] text-pretty">
          {intent}
        </p>
        <div className="col-span-12">
          <Hairline />
        </div>
      </header>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">{children}</div>
      </div>
    </section>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 eyebrow text-[color:var(--fg-mute)] flex items-center gap-3">
      <span aria-hidden>↳ spec</span>
      <span className="font-mono text-[0.7rem] normal-case tracking-wider text-[color:var(--fg-soft)]">
        {children}
      </span>
    </p>
  );
}

function CounterTile({
  label,
  value,
  options,
  unit,
}: {
  label: string;
  value: number;
  options?: Intl.NumberFormatOptions;
  unit?: string;
}) {
  return (
    <Surface className="flex flex-col gap-4 min-w-[12rem]">
      <Eyebrow>{label}</Eyebrow>
      <div className="flex items-baseline gap-2">
        <Counter
          value={value}
          options={options}
          className="font-display text-5xl leading-none text-[color:var(--fg)]"
        />
        {unit && (
          <span className="font-mono text-sm text-[color:var(--fg-mute)] uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>
    </Surface>
  );
}
