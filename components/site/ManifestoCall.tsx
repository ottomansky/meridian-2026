import Link from "next/link";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/button";
import { Eyebrow, Hairline } from "@/components/ui/surface";

/**
 * Manifesto call — intentional z-axis overlap: the oversized display word
 * sits BEHIND the manifesto card, with mix-blend-difference cutting through.
 */
export function ManifestoCall() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48 overflow-hidden">
      {/* The oversized moment — sits at the back */}
      <p
        aria-hidden
        className="display absolute -bottom-12 -right-8 select-none pointer-events-none text-[color:var(--fg)] mix-blend-difference"
        style={{
          fontSize: "clamp(12rem, 36vw, 32rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.08em",
          fontVariationSettings: '"opsz" 144, "wght" 280, "SOFT" 100, "WONK" 1',
        }}
      >
        why.
      </p>

      {/* The card — sits in front with intentional asymmetry */}
      <article className="relative max-w-3xl ml-auto mr-0 md:mr-12 surface surface-grain p-10 md:p-14 z-10">
        <Eyebrow className="mb-6 block">05 — manifesto</Eyebrow>
        <p
          className="text-balance leading-[1.05] tracking-tight"
          style={{
            fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
            fontVariationSettings: '"opsz" 60, "wght" 420',
          }}
        >
          A report is a photograph of last week. An instrument is a sentence
          the data writes to you in <span className="text-[color:var(--accent)] italic">present tense</span>.
        </p>
        <p
          className="text-balance leading-[1.05] tracking-tight mt-6 text-[color:var(--fg-soft)]"
          style={{
            fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
            fontVariationSettings: '"opsz" 60, "wght" 380',
          }}
        >
          Meridian is for teams who don't want any more photographs.
        </p>

        <Hairline className="my-10" />

        <div className="flex items-center justify-between gap-6 flex-wrap">
          <Link
            href="/manifesto"
            className="eyebrow text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] transition-colors flux-hover"
          >
            ↳ read the full manifesto
          </Link>
          <Magnetic radius={120} strength={0.3}>
            <Button variant="primary" size="md" data-cursor="link">
              Join waitlist
            </Button>
          </Magnetic>
        </div>
      </article>
    </section>
  );
}
