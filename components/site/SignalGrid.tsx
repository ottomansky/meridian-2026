import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";

const SIGNALS = [
  {
    label: "active accounts",
    value: 4219,
    delta: { dir: "up", magnitude: "+12.4%", caption: "cohort 2026-Q2" },
  },
  {
    label: "churn risk",
    value: 2.1,
    unit: "%",
    options: { minimumFractionDigits: 1, maximumFractionDigits: 1 },
    delta: { dir: "down", magnitude: "−0.4 pp", caption: "rolling 30 day" },
  },
  {
    label: "lifetime value",
    value: 8914,
    options: { style: "currency", currency: "USD", maximumFractionDigits: 0 } as const,
    delta: { dir: "up", magnitude: "+218", caption: "median, top decile" },
  },
  {
    label: "drift index",
    value: 0.02,
    options: { minimumFractionDigits: 2 } as const,
    delta: { dir: "flat", magnitude: "stable", caption: "vs. baseline · 7d" },
  },
];

export function SignalGrid() {
  return (
    <section id="signal-grid" className="px-6 md:px-10 py-24 md:py-32">
      <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-12 items-end">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
          <span className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">02</span>
          <Eyebrow>live signals</Eyebrow>
        </div>
        <h2
          className="col-span-12 md:col-span-7 text-balance leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(1.875rem, 5vw, 4rem)" }}
        >
          Four numbers your CEO already asked for{" "}
          <span className="text-[color:var(--accent)]">twice</span>.
        </h2>
        <p className="col-span-12 md:col-span-3 text-sm text-[color:var(--fg-soft)] text-pretty">
          Sampled from the live cohort. Updated every fifteen minutes, served
          from a workspace cache so the next query is free.
        </p>
        <div className="col-span-12">
          <Hairline />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {SIGNALS.map((s, i) => (
          <Reveal
            key={s.label}
            index={i}
            className={
              // Asymmetric grid — first card spans 5, second 3, third 4, fourth full row on mobile.
              i === 0
                ? "col-span-12 md:col-span-5 md:row-span-2"
                : i === 1
                  ? "col-span-12 md:col-span-7"
                  : i === 2
                    ? "col-span-12 md:col-span-3"
                    : "col-span-12 md:col-span-4"
            }
          >
            <Surface
              grain
              className={`flex flex-col gap-4 h-full ${i === 0 ? "min-h-[16rem]" : ""}`}
              data-cursor="zoom"
              data-cursor-label="open"
            >
              <div className="flex items-center justify-between">
                <Eyebrow>{s.label}</Eyebrow>
                <DeltaPill direction={s.delta.dir as "up" | "down" | "flat"} magnitude={s.delta.magnitude} />
              </div>

              <div className="flex items-baseline gap-2">
                <Counter
                  value={s.value}
                  options={s.options as Intl.NumberFormatOptions | undefined}
                  className={`font-display leading-none text-[color:var(--fg)] ${i === 0 ? "text-7xl md:text-8xl" : "text-5xl"}`}
                />
                {s.unit && (
                  <span className="font-mono text-sm text-[color:var(--fg-mute)] tracking-wider uppercase">
                    {s.unit}
                  </span>
                )}
              </div>

              <p className="text-xs text-[color:var(--fg-mute)] mt-auto">{s.delta.caption}</p>

              {/* The big card gets a tiny instrument-panel reading */}
              {i === 0 && (
                <div className="mt-4 pt-4 border-t border-[color:var(--edge)]">
                  <Eyebrow className="mb-3 block">recent signal</Eyebrow>
                  <pre className="font-mono text-[0.7rem] leading-relaxed text-[color:var(--fg-soft)] whitespace-pre-wrap">
{`> cohort 2026-Q2 · refresh @ 14:32
< +218 active accounts (24h)
< 12 risk segments updated
< model v3 · drift 0.02
✓ healthy`}
                  </pre>
                </div>
              )}
            </Surface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DeltaPill({ direction, magnitude }: { direction: "up" | "down" | "flat"; magnitude: string }) {
  const color =
    direction === "up"
      ? "text-[color:var(--accent)] border-[color:var(--accent)]"
      : direction === "down"
        ? "text-[color:var(--color-iris-1)] border-[color:var(--color-iris-1)]"
        : "text-[color:var(--fg-mute)] border-[color:var(--edge)]";
  const glyph = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[0.65rem] tracking-widest uppercase border ${color}`}
    >
      <span aria-hidden>{glyph}</span>
      <span className="nums">{magnitude}</span>
    </span>
  );
}
