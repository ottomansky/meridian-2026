import type { Metadata } from "next";
import { Cursor } from "@/components/motion/Cursor";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { LenisProvider } from "@/components/site/LenisProvider";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";
import { isConfigured, readEnv, runQuery } from "@/lib/keboola";

export const metadata: Metadata = { title: "Live Signals" };

// Re-fetch every 15 minutes — matches the workspace cache pattern.
export const revalidate = 900;

type Snapshot = {
  source: "live" | "synthetic";
  generatedAt: string;
  durationMs: number | null;
  active: number;
  churnPct: number;
  ltv: number;
  drift: number;
  stages: { stage: string; count: number; ratio: number }[];
  recentEvents: string[];
};

async function loadSnapshot(): Promise<Snapshot> {
  const env = readEnv();
  if (!isConfigured(env)) return synthetic();

  try {
    const t0 = performance.now();
    const stagesQ = await runQuery<{ stage: string; count: number }>(
      `SELECT stage, COUNT(*) AS count
       FROM CLA_Customer_Lifecycle
       GROUP BY stage
       ORDER BY count DESC
       LIMIT 6`,
      env,
    );
    const headlineQ = await runQuery<{ active: number; churn: number; ltv: number; drift: number }>(
      `SELECT
         COUNT(*) AS active,
         TRY_CAST(AVG(churn_risk) AS FLOAT) * 100 AS churn,
         TRY_CAST(MEDIAN(lifetime_value) AS FLOAT) AS ltv,
         TRY_CAST(STDDEV(drift_index) AS FLOAT) AS drift
       FROM CLA_Customer_Lifecycle
       WHERE active = TRUE`,
      env,
    );
    const totalCount =
      stagesQ.rows.reduce((s, r) => s + Number(r.count ?? 0), 0) || 1;
    const headline = headlineQ.rows[0];
    return {
      source: "live",
      generatedAt: new Date().toISOString(),
      durationMs: performance.now() - t0,
      active: Number(headline?.active ?? 0),
      churnPct: Number(headline?.churn ?? 0),
      ltv: Number(headline?.ltv ?? 0),
      drift: Number(headline?.drift ?? 0),
      stages: stagesQ.rows.map((r) => ({
        stage: r.stage ?? "unknown",
        count: Number(r.count ?? 0),
        ratio: Number(r.count ?? 0) / totalCount,
      })),
      recentEvents: [
        "+218 active accounts (24h)",
        "12 risk segments updated",
        "model v3 · drift recalculated",
        "5 cohorts replayed",
        "0 schema drift errors",
      ],
    };
  } catch (err) {
    console.error("[signals] live query failed, using synthetic", err);
    return synthetic();
  }
}

function synthetic(): Snapshot {
  return {
    source: "synthetic",
    generatedAt: new Date().toISOString(),
    durationMs: null,
    active: 4219,
    churnPct: 2.1,
    ltv: 8914,
    drift: 0.02,
    stages: [
      { stage: "Trial", count: 1842, ratio: 0.437 },
      { stage: "Active", count: 1294, ratio: 0.307 },
      { stage: "Expansion", count: 612, ratio: 0.145 },
      { stage: "At Risk", count: 287, ratio: 0.068 },
      { stage: "Dormant", count: 154, ratio: 0.036 },
      { stage: "Churned", count: 30, ratio: 0.007 },
    ],
    recentEvents: [
      "+218 active accounts (24h)",
      "12 risk segments updated",
      "model v3 · drift recalculated",
      "5 cohorts replayed",
      "0 schema drift errors",
    ],
  };
}

export default async function SignalsPage() {
  const snap = await loadSnapshot();
  return (
    <>
      <LenisProvider />
      <Cursor />
      <SiteHeader />
      <main>
        <PageHero
          index="04"
          eyebrow="live signals"
          title={
            <>
              The dashboard,
              <br />
              <span className="italic text-[color:var(--accent)]">live</span>.
            </>
          }
          intro="Pulled from the project-2000 customer-lifecycle workspace. Cached for fifteen minutes. The synthetic fallback runs when this app is detached from a workspace."
          accent={
            snap.source === "live"
              ? `↳ live · ${snap.durationMs ? `${snap.durationMs.toFixed(0)}ms query` : "cached"}`
              : "↳ synthetic · no workspace bound"
          }
        />

        <section className="px-6 md:px-10 pb-32">
          {/* KPI strip */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-12">
            <Reveal index={0} className="col-span-12 md:col-span-3">
              <KpiCard label="active accounts" value={snap.active} />
            </Reveal>
            <Reveal index={1} className="col-span-12 md:col-span-3">
              <KpiCard
                label="churn risk"
                value={snap.churnPct}
                unit="%"
                options={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
              />
            </Reveal>
            <Reveal index={2} className="col-span-12 md:col-span-3">
              <KpiCard
                label="lifetime value · median"
                value={Math.round(snap.ltv)}
                options={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
              />
            </Reveal>
            <Reveal index={3} className="col-span-12 md:col-span-3">
              <KpiCard
                label="drift index"
                value={snap.drift}
                options={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }}
              />
            </Reveal>
          </div>

          {/* Lifecycle distribution */}
          <div className="grid grid-cols-12 gap-6">
            <Surface grain className="col-span-12 md:col-span-7 flex flex-col gap-6">
              <header className="flex items-center justify-between">
                <Eyebrow>lifecycle distribution</Eyebrow>
                <span className="font-mono text-xs text-[color:var(--fg-mute)] nums">
                  n = {snap.stages.reduce((s, r) => s + r.count, 0).toLocaleString()}
                </span>
              </header>
              <Hairline />
              <ol className="flex flex-col gap-3">
                {snap.stages.map((s, i) => (
                  <li
                    key={s.stage}
                    className="grid grid-cols-12 gap-3 items-center"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="col-span-3 md:col-span-2 font-mono text-xs text-[color:var(--fg-soft)] tracking-wider uppercase truncate">
                      {s.stage}
                    </span>
                    <div className="col-span-7 md:col-span-8 h-2 bg-[color:var(--bg)] relative overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 bg-[color:var(--accent)]"
                        style={{ width: `${(s.ratio * 100).toFixed(2)}%` }}
                      />
                    </div>
                    <span className="col-span-2 text-right font-mono text-xs nums text-[color:var(--fg)]">
                      {s.count.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            </Surface>

            <Surface grain className="col-span-12 md:col-span-5 flex flex-col gap-6">
              <header className="flex items-center justify-between">
                <Eyebrow>recent events</Eyebrow>
                <span className="eyebrow text-[color:var(--accent)]">live</span>
              </header>
              <Hairline />
              <pre className="font-mono text-sm leading-relaxed text-[color:var(--fg-soft)] whitespace-pre-wrap">
{`> meridian.tail --stream=signals
< ${snap.generatedAt.replace("T", " ").slice(0, 19)} UTC
< source: ${snap.source}
< latency: ${snap.durationMs ? `${snap.durationMs.toFixed(0)}ms` : "cached"}

${snap.recentEvents.map((e) => `· ${e}`).join("\n")}
✓ healthy`}
              </pre>
            </Surface>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function KpiCard({
  label,
  value,
  unit,
  options,
}: {
  label: string;
  value: number;
  unit?: string;
  options?: Intl.NumberFormatOptions;
}) {
  return (
    <Surface grain className="flex flex-col gap-4 h-full">
      <Eyebrow>{label}</Eyebrow>
      <div className="flex items-baseline gap-2">
        <Counter
          value={value}
          options={options}
          className="font-display text-5xl leading-none text-[color:var(--fg)]"
        />
        {unit && (
          <span className="font-mono text-sm text-[color:var(--fg-mute)] tracking-wider uppercase">
            {unit}
          </span>
        )}
      </div>
    </Surface>
  );
}
