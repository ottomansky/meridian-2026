import { Marquee } from "@/components/motion/Marquee";
import { Hairline } from "@/components/ui/surface";

const PHRASES = [
  "instruments not reports",
  "continuous not weekly",
  "signal not noise",
  "calibration not calibration of expectations",
  "what changed not what happened",
  "you'll know before they do",
];

export function ManifestoStrip() {
  return (
    <section className="border-y border-[color:var(--edge)] py-8 surface-grain">
      <Marquee speed={62}>
        {PHRASES.map((phrase, i) => (
          <span key={phrase} className="inline-flex items-center gap-16">
            <span
              className="font-display tracking-tight text-[color:var(--fg)]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontVariationSettings: '"opsz" 144, "wght" 360, "SOFT" 100',
              }}
            >
              {phrase}
            </span>
            <span
              className="font-display text-[color:var(--accent)] opacity-70 select-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              aria-hidden
            >
              {i % 2 === 0 ? "✻" : "◉"}
            </span>
          </span>
        ))}
      </Marquee>
      <Hairline className="mt-8" />
    </section>
  );
}
