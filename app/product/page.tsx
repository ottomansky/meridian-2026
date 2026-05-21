import type { Metadata } from "next";
import { Cursor } from "@/components/motion/Cursor";
import { CapabilityGrid } from "@/components/site/CapabilityGrid";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { LenisProvider } from "@/components/site/LenisProvider";
import { PageHero } from "@/components/site/PageHero";
import { StickyWalkthrough } from "@/components/site/StickyWalkthrough";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage() {
  return (
    <>
      <LenisProvider />
      <Cursor />
      <SiteHeader />
      <main>
        <PageHero
          index="01"
          eyebrow="product"
          title={
            <>
              An <span className="italic text-[color:var(--accent)]">instrument</span> for
              what your customers are about to do.
            </>
          }
          intro="Meridian replaces six dashboards with a calibration log and a signal kernel. Your reports don't live in a different system anymore — they live inside the cohort definition that produced them."
          accent="↳ v0.1 · pre-release"
        />
        <StickyWalkthrough />
        <CapabilityGrid />
      </main>
      <SiteFooter />
    </>
  );
}
