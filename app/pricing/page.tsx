import type { Metadata } from "next";
import { Cursor } from "@/components/motion/Cursor";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { LenisProvider } from "@/components/site/LenisProvider";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Eyebrow, Hairline, Surface } from "@/components/ui/surface";

export const metadata: Metadata = { title: "Pricing" };

const TIERS = [
  {
    name: "Cell",
    sub: "One team, one warehouse.",
    price: "$0",
    note: "free during private beta",
    features: [
      "Up to 5M events / mo",
      "One workspace",
      "Up to 3 cohort definitions",
      "Email signals",
      "Community Slack",
    ],
    cta: "Join the beta",
    variant: "ghost",
  },
  {
    name: "Instrument",
    sub: "The default tier for revenue ops.",
    price: "$1,400",
    period: "/ month",
    note: "5 seats included · billed quarterly",
    features: [
      "Unlimited events",
      "Unlimited cohorts",
      "Signal kernel with custom alerts",
      "Workspace cache + replay window",
      "Slack & PagerDuty integration",
      "Direct line to a data engineer",
    ],
    cta: "Request access",
    variant: "primary",
    featured: true,
  },
  {
    name: "Constellation",
    sub: "Multi-warehouse, multi-region.",
    price: "Talk",
    note: "annual contract · custom SLA",
    features: [
      "Everything in Instrument",
      "Dedicated workspace cluster",
      "SOC2 audit pack",
      "SSO / SCIM",
      "Quarterly calibration review",
      "Named on-call engineer",
    ],
    cta: "Contact us",
    variant: "ghost",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <LenisProvider />
      <Cursor />
      <SiteHeader />
      <main>
        <PageHero
          index="03"
          eyebrow="pricing"
          title={
            <>
              Three tiers.
              <br />
              No <span className="italic text-[color:var(--accent)]">surprise</span> meter.
            </>
          }
          intro="Pricing is per workspace, not per event. We don't penalize you for instrumenting more of your customer surface — that's the point."
          accent="↳ all prices USD · cancel anytime"
        />

        <section className="px-6 md:px-10 pb-32">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {TIERS.map((t, i) => (
              <Reveal
                key={t.name}
                index={i}
                step={120}
                className={`col-span-12 md:col-span-4 ${"featured" in t && t.featured ? "md:row-span-1" : ""}`}
              >
                <Surface
                  grain
                  className={`flex flex-col gap-6 h-full ${
                    "featured" in t && t.featured
                      ? "border-[color:var(--accent)] shadow-[0_24px_60px_-32px_var(--accent)]"
                      : ""
                  }`}
                >
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h2
                        className="text-3xl tracking-tight"
                        style={{ fontVariationSettings: '"opsz" 60, "wght" 460' }}
                      >
                        {t.name}
                      </h2>
                      <p className="text-sm text-[color:var(--fg-soft)]">{t.sub}</p>
                    </div>
                    {"featured" in t && t.featured && (
                      <span className="eyebrow text-[color:var(--accent)] border border-[color:var(--accent)] px-2 py-1">
                        recommended
                      </span>
                    )}
                  </header>

                  <Hairline />

                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display leading-none text-[color:var(--fg)]"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontVariationSettings: '"opsz" 144, "wght" 480',
                      }}
                    >
                      {t.price}
                    </span>
                    {"period" in t && t.period && (
                      <span className="font-mono text-sm text-[color:var(--fg-mute)] tracking-wider uppercase">
                        {t.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[color:var(--fg-mute)] tracking-wider">{t.note}</p>

                  <ul className="flex flex-col gap-2 mt-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-[color:var(--fg-soft)]"
                      >
                        <span
                          className="mt-1.5 block w-1.5 h-1.5 bg-[color:var(--accent)] shrink-0"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Magnetic radius={120} strength={0.3}>
                      <Button
                        variant={t.variant as "primary" | "ghost"}
                        className="w-full"
                        data-cursor="link"
                      >
                        {t.cta}
                      </Button>
                    </Magnetic>
                  </div>
                </Surface>
              </Reveal>
            ))}
          </div>

          <p className="text-center mt-16 text-sm text-[color:var(--fg-mute)] text-pretty max-w-xl mx-auto">
            We don't list per-event overage rates because we don't have any.
            If your workload outgrows a tier we will tell you, in writing, before we
            charge you anything beyond it.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
