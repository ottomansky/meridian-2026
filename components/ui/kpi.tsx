import { cn } from "@/lib/cn";

export function KpiTile({
  label,
  value,
  unit,
  delta,
  caption,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: { direction: "up" | "down" | "flat"; magnitude: string };
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface surface-grain p-6 flex flex-col gap-4 min-w-[14rem]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        {delta && (
          <span
            className={cn(
              "font-mono text-xs nums tracking-wider",
              delta.direction === "up" && "text-[color:var(--accent)]",
              delta.direction === "down" && "text-[color:var(--color-iris-1)]",
              delta.direction === "flat" && "text-[color:var(--fg-mute)]",
            )}
          >
            {delta.direction === "up" ? "↑" : delta.direction === "down" ? "↓" : "→"}{" "}
            {delta.magnitude}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2 nums">
        <span
          className="font-display text-5xl text-[color:var(--fg)] leading-none"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 460, "SOFT" 60' }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-sm text-[color:var(--fg-mute)] tracking-wider uppercase">
            {unit}
          </span>
        )}
      </div>
      {caption && (
        <p className="text-xs text-[color:var(--fg-mute)] leading-relaxed text-pretty">{caption}</p>
      )}
    </div>
  );
}
