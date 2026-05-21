import { Magnetic } from "@/components/motion/MagneticButton";
import { ShaderBackgroundClient } from "@/components/r3f/ShaderBackground.client";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/surface";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <ShaderBackgroundClient className="absolute inset-0" intensity={0.9} />

      {/* Gradient mask to push content over the shader */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--color-ink) 35%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklch, var(--color-ink) 60%, transparent) 100%)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col px-6 md:px-10 pt-32 md:pt-40">
        {/* Top instrument-panel strip */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[color:var(--accent)] animate-pulse" />
            <Eyebrow>signal active · 2026.q2 cohort</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <Eyebrow>v0.1 — pre-release · waitlist 421</Eyebrow>
          </div>
        </div>

        {/* The headline — the entire reason this page exists */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mt-auto mb-12">
          <h1
            className="col-span-12 text-balance font-display leading-[0.86] tracking-[-0.045em] text-[color:var(--fg)]"
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 80, "WONK" 0',
            }}
          >
            Signals,
            <br />
            <span className="italic text-[color:var(--accent)]" style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 100, "WONK" 1' }}>
              not
            </span>{" "}
            dashboards.
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6 pb-16 md:pb-24 items-end">
          <p className="col-span-12 md:col-span-6 text-lg md:text-xl text-[color:var(--fg-soft)] text-pretty leading-relaxed max-w-xl">
            MERIDIAN reads your customer lifecycle the way an instrument reads pressure —
            continuous, calibrated, indifferent to the shape of the report you wanted.
          </p>

          <div className="col-span-12 md:col-span-6 flex items-end justify-start md:justify-end gap-3 flex-wrap">
            <Magnetic radius={140} strength={0.35}>
              <Button variant="primary" size="lg" data-cursor="link">
                Request access
              </Button>
            </Magnetic>
            <Magnetic radius={140} strength={0.3}>
              <Button variant="ghost" size="lg" data-cursor="link">
                See it live →
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
