import { Eyebrow, Hairline } from "@/components/ui/surface";

/** Generic page hero for non-landing routes. Lighter than the landing's hero. */
export function PageHero({
  eyebrow,
  index,
  title,
  intro,
  accent,
}: {
  eyebrow: string;
  index: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  accent?: string;
}) {
  return (
    <section className="px-6 md:px-10 pt-40 md:pt-48 pb-12">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
        <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
          <span className="font-mono text-xs text-[color:var(--fg-mute)] tracking-widest nums">
            {index}
          </span>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="col-span-12 md:col-span-10 text-balance leading-[0.92] tracking-[-0.04em] font-display"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 8rem)",
            fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 80',
          }}
        >
          {title}
        </h1>
        {intro && (
          <p className="col-span-12 md:col-span-8 md:col-start-3 text-lg text-[color:var(--fg-soft)] text-pretty leading-relaxed">
            {intro}
          </p>
        )}
        {accent && (
          <p className="col-span-12 md:col-span-4 md:text-right text-sm text-[color:var(--fg-mute)] tracking-wider">
            {accent}
          </p>
        )}
        <div className="col-span-12 mt-6">
          <Hairline />
        </div>
      </div>
    </section>
  );
}
