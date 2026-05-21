import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/motion/Cursor";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { LenisProvider } from "@/components/site/LenisProvider";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Eyebrow, Hairline } from "@/components/ui/surface";

export const metadata: Metadata = { title: "Manifesto" };

const THESES = [
  {
    n: "01",
    title: "A report is a photograph.",
    body:
      "By the time the meeting agrees on the chart, the customer has already moved. The dashboard is a beautiful, framed photograph of a state of the world that no longer exists.",
  },
  {
    n: "02",
    title: "An instrument is a sentence.",
    body:
      "We want the data to write sentences to you. In present tense. About things you can do something about. With confidence numbers attached.",
  },
  {
    n: "03",
    title: "Definitions outlive analysts.",
    body:
      "The single most painful pattern in customer data is the implicit cohort: a SQL fragment in someone's Notion document that nobody else can reproduce. Meridian makes cohorts versioned objects — replayable, diffable, owned by the team, not the desk that drafted them.",
  },
  {
    n: "04",
    title: "Calibration over confidence.",
    body:
      "Every metric Meridian emits remembers the assumptions that produced it. When the model drifts, the metric tells you — in the same panel where you read it the last time it was right.",
  },
  {
    n: "05",
    title: "The CLI is the API is the UI.",
    body:
      "Three surfaces, one grammar. Anything you can do in one surface is one HTTP request away in another. We don't ship features that are only available in one of the three.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <LenisProvider />
      <Cursor />
      <SiteHeader />
      <main>
        <PageHero
          index="02"
          eyebrow="manifesto"
          title={
            <>
              Five theses,
              <br />
              one <span className="italic text-[color:var(--accent)]">premise</span>.
            </>
          }
          intro="The first version of this document was written on a single subway ride between Brooklyn and the meeting where we decided to stop building dashboards."
          accent="↳ written march 2026"
        />

        <section className="px-6 md:px-10 py-24">
          <ol className="grid grid-cols-12 gap-x-6 gap-y-16">
            {THESES.map((t, i) => (
              <Reveal
                key={t.n}
                index={i}
                className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-4 items-start"
              >
                <span
                  className="col-span-12 md:col-span-2 font-display text-6xl md:text-7xl tracking-tight leading-[0.85] text-[color:var(--accent)]"
                  style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 80' }}
                >
                  {t.n}
                </span>
                <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
                  <h2
                    className="text-balance leading-[1.02] tracking-tight"
                    style={{
                      fontSize: "clamp(1.875rem, 4vw, 3.5rem)",
                      fontVariationSettings: '"opsz" 60, "wght" 460',
                    }}
                  >
                    {t.title}
                  </h2>
                  <p className="text-[color:var(--fg-soft)] text-pretty leading-relaxed text-lg max-w-3xl">
                    {t.body}
                  </p>
                </div>
                <Hairline className="col-span-12 mt-8" />
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="px-6 md:px-10 py-32">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
            <p
              className="col-span-12 md:col-span-9 text-balance leading-[0.92] tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                fontVariationSettings: '"opsz" 144, "wght" 420, "SOFT" 100',
              }}
            >
              We're hiring the people who'll
              <br />
              <span className="italic text-[color:var(--accent)]">decommission the dashboards</span>.
            </p>
            <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
              <Eyebrow>↳ join</Eyebrow>
              <Magnetic radius={140} strength={0.3}>
                <Button variant="primary" data-cursor="link">
                  See open roles
                </Button>
              </Magnetic>
              <Link
                href="/product"
                className="eyebrow text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] transition-colors w-fit"
              >
                or read the product spec ›
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
