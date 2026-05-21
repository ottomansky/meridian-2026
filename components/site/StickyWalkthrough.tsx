"use client";

/**
 * StickyWalkthrough — a 300vh scroll experience: the LEFT column pins for
 * the whole duration; its content (eyebrow + headline) swaps based on scroll
 * progress. The RIGHT column has three stacked panels that scroll past.
 *
 * Uses motion's useScroll over the section, no GSAP for this one — we
 * don't need the full ScrollTrigger pin/scrub API, motion's React hooks
 * are enough.
 */

import { motion, type MotionValue, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Eyebrow, Hairline } from "@/components/ui/surface";

const STEPS = [
  {
    eyebrow: "stage 01 · ingest",
    headline: "Stream every customer event into the workspace.",
    sub: "Stripe, Hubspot, the warehouse you already pay for — Meridian consumes them with no transform layer in front. Schema drift is logged, not feared.",
    metric: "1.2M events / hr",
    glyph: "◉",
  },
  {
    eyebrow: "stage 02 · calibrate",
    headline: "Build cohorts the way an engineer builds tests.",
    sub: "SQL where it's faster, a typed cohort DSL where SQL gets in the way. Every cohort versions itself, every metric remembers the definition that produced it.",
    metric: "12 cohort versions / day",
    glyph: "✻",
  },
  {
    eyebrow: "stage 03 · signal",
    headline: "Subscribe to changes — not dashboards.",
    sub: "A churn-risk signal fires when the model says so. The CEO's KPI panel updates without anyone watching. The on-call rep gets the row before the customer churns.",
    metric: "p50 detection: 4m",
    glyph: "⌖",
  },
];

export function StickyWalkthrough() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drives index 0 → 1 → 2 across the section.
  const progressIndex = useTransform(scrollYProgress, [0, 1], [0, STEPS.length - 1]);
  // Used to highlight the active panel.
  const activeRef = useRef(0);
  useMemo(
    () =>
      progressIndex.on("change", (v) => {
        activeRef.current = Math.round(Math.max(0, Math.min(STEPS.length - 1, v)));
        const root = containerRef.current;
        if (!root) return;
        root.setAttribute("data-step", String(activeRef.current));
      }),
    [progressIndex],
  );

  // Background pull color tracks scroll
  const tint = useTransform(scrollYProgress, [0, 0.5, 1], [
    "color-mix(in oklch, var(--color-flux) 0%, transparent)",
    "color-mix(in oklch, var(--color-flux) 6%, transparent)",
    "color-mix(in oklch, var(--color-iris-3) 8%, transparent)",
  ]);

  return (
    <section
      ref={containerRef}
      data-step="0"
      className="relative px-6 md:px-10 py-24 [--step-h:100svh]"
      style={{ minHeight: reduced ? "auto" : `calc(var(--step-h) * ${STEPS.length})` }}
    >
      {/* Scrolling tint */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: tint }}
      />

      <header className="relative grid grid-cols-12 gap-x-6 gap-y-4 items-end mb-12">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
          <span className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">03</span>
          <Eyebrow>walkthrough</Eyebrow>
        </div>
        <h2
          className="col-span-12 md:col-span-7 text-balance leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(1.875rem, 5vw, 4rem)" }}
        >
          Three stages. Each one earns the next.
        </h2>
        <p className="col-span-12 md:col-span-3 text-sm text-[color:var(--fg-soft)] text-pretty">
          Scroll the section. The left column stays put; the right scrubs through.
        </p>
        <div className="col-span-12">
          <Hairline />
        </div>
      </header>

      <div className="relative grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-24">
        {/* Sticky LEFT */}
        <div className="col-span-12 md:col-span-5 md:sticky md:top-32 self-start">
          <StickyContent progressIndex={progressIndex} />
        </div>

        {/* Scrolling RIGHT */}
        <ol className="col-span-12 md:col-span-7 flex flex-col gap-32 md:gap-[60vh] list-none">
          {STEPS.map((s, i) => (
            <li key={s.eyebrow} className="surface surface-grain p-8 md:p-10 flex flex-col gap-6">
              <header className="flex items-center justify-between">
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <span
                  className="font-display text-3xl text-[color:var(--accent)]"
                  aria-hidden
                  style={{ fontVariationSettings: '"opsz" 144, "wght" 360' }}
                >
                  {s.glyph}
                </span>
              </header>
              <h3
                className="text-balance text-2xl md:text-3xl leading-[1.05] tracking-tight"
                style={{ fontVariationSettings: '"opsz" 60, "wght" 460' }}
              >
                {s.headline}
              </h3>
              <p className="text-[color:var(--fg-soft)] text-pretty leading-relaxed max-w-prose">
                {s.sub}
              </p>
              <div className="mt-4 pt-4 border-t border-[color:var(--edge)] flex items-baseline justify-between">
                <Eyebrow>throughput</Eyebrow>
                <span className="font-mono text-sm nums text-[color:var(--fg)]">{s.metric}</span>
              </div>
              <span className="absolute top-4 right-6 font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">
                0{i + 1} / 0{STEPS.length}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StickyContent({ progressIndex }: { progressIndex: MotionValue<number> }) {
  const indexOpacity1 = useTransform(progressIndex, [0, 0.5, 1, 1.5, 2], [1, 0.6, 0.2, 0.2, 0.2]);
  const indexOpacity2 = useTransform(progressIndex, [0, 0.5, 1, 1.5, 2], [0.2, 0.6, 1, 0.6, 0.2]);
  const indexOpacity3 = useTransform(progressIndex, [0, 0.5, 1, 1.5, 2], [0.2, 0.2, 0.2, 0.6, 1]);

  return (
    <div className="flex flex-col gap-8">
      <Eyebrow>↳ instrument cluster</Eyebrow>
      <div
        className="font-display leading-[0.82] tracking-[-0.04em]"
        style={{
          fontSize: "clamp(3rem, 9vw, 7rem)",
          fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 100',
        }}
      >
        How
        <br />
        Meridian
        <br />
        <span className="italic text-[color:var(--accent)]">works.</span>
      </div>

      <ol className="flex flex-col gap-4 mt-8">
        {[indexOpacity1, indexOpacity2, indexOpacity3].map((opacity, i) => (
          <motion.li
            // biome-ignore lint/suspicious/noArrayIndexKey: static stages
            key={i}
            style={{ opacity }}
            className="flex items-center gap-4 transition-colors"
          >
            <span className="font-mono text-xs text-[color:var(--fg-mute)] nums tracking-widest">
              0{i + 1}
            </span>
            <span className="flex-1 h-px bg-[color:var(--edge)]" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--fg)]">
              {STEPS[i]?.eyebrow.split(" · ")[1]}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
