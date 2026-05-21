import { Cursor } from "@/components/motion/Cursor";
import { CapabilityGrid } from "@/components/site/CapabilityGrid";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LenisProvider } from "@/components/site/LenisProvider";
import { ManifestoCall } from "@/components/site/ManifestoCall";
import { ManifestoStrip } from "@/components/site/ManifestoStrip";
import { SignalGrid } from "@/components/site/SignalGrid";
import { StickyWalkthrough } from "@/components/site/StickyWalkthrough";

export default function LandingPage() {
  return (
    <>
      <LenisProvider />
      <Cursor />
      <SiteHeader />
      <main>
        <Hero />
        <ManifestoStrip />
        <SignalGrid />
        <StickyWalkthrough />
        <CapabilityGrid />
        <ManifestoCall />
      </main>
      <SiteFooter />
    </>
  );
}
