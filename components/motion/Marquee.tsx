"use client";

/**
 * Marquee — GPU-only infinite scroll via the .marquee-track utility in
 * globals.css. Pauses on hover, opt-out via prefers-reduced-motion.
 *
 * Children render twice (to allow translate-50% loop without a seam).
 */

import { type ReactNode, useMemo } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: Props) {
  const style = useMemo(
    () =>
      ({
        animationDuration: `${speed}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }) as React.CSSProperties,
    [speed, reverse],
  );

  return (
    <div className={cn("group/marquee overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={style}
        aria-hidden="false"
      >
        <span className="inline-flex shrink-0 items-center gap-16">{children}</span>
        <span className="inline-flex shrink-0 items-center gap-16" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}
