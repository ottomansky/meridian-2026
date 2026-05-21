import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";

const CAPS = [
  {
    title: "Cohort calculus",
    body: "A typed DSL above SQL. Versioned cohorts. Definitions outlive analysts.",
    glyph: "∑",
  },
  {
    title: "Signal kernel",
    body: "Streaming detection on derived fields. Pushes deltas, not snapshots.",
    glyph: "◦",
  },
  {
    title: "Calibration log",
    body: "Every metric remembers why. Why is grepable; why is the API.",
    glyph: "⟁",
  },
  {
    title: "Workspace cache",
    body: "DuckDB sits between the dashboard and Snowflake. The bill drops.",
    glyph: "▢",
  },
  {
    title: "Replay window",
    body: "Backfill a cohort definition to any prior date. Rewind the answer.",
    glyph: "↺",
  },
  {
    title: "Operator console",
    body: "A CLI that's as fast as the API. No clicks where typing is faster.",
    glyph: "›_",
  },
];

export function CapabilityGrid() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32">
      <header className="grid grid-cols-12 gap-6 mb-12 items-end">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
          <span className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">04</span>
          <Eyebrow>capability</Eyebrow>
        </div>
        <h2
          className="col-span-12 md:col-span-7 text-balance leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(1.875rem, 5vw, 4rem)" }}
        >
          Six instruments — one mount.
        </h2>
        <p className="col-span-12 md:col-span-3 text-sm text-[color:var(--fg-soft)] text-pretty">
          Each capability is a discrete primitive. Compose. Stack. Tear off the
          ones you don't use.
        </p>
        <div className="col-span-12">
          <Hairline />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {CAPS.map((c, i) => (
          <Reveal key={c.title} index={i} step={50}>
            <Surface
              grain
              className="group/cap relative flex flex-col gap-4 min-h-[14rem] overflow-hidden"
              data-cursor="zoom"
              data-cursor-label="open"
            >
              <span className="flex items-center justify-between">
                <Eyebrow>0{i + 1} ›</Eyebrow>
                <span
                  className="font-display text-3xl text-[color:var(--fg-mute)] group-hover/cap:text-[color:var(--accent)] transition-colors duration-500 ease-[var(--ease-out-quint)]"
                  style={{ fontVariationSettings: '"opsz" 144, "wght" 380' }}
                  aria-hidden
                >
                  {c.glyph}
                </span>
              </span>
              <h3
                className="text-2xl tracking-tight leading-[1.05]"
                style={{ fontVariationSettings: '"opsz" 60, "wght" 460' }}
              >
                {c.title}
              </h3>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed text-pretty mt-auto">
                {c.body}
              </p>
              {/* Accent hairline grows on hover */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-[color:var(--accent)] group-hover/cap:w-full transition-[width] duration-700 ease-[var(--ease-out-quint)]"
              />
            </Surface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
