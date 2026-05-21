/**
 * Reveal — wraps children in the `.reveal` utility (native CSS
 * animation-timeline: view()), with optional stagger via inline delay.
 *
 * No JS state — pure CSS, runs on the compositor.
 *
 * Server-renderable.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** 0-based index to stagger reveals. Multiplied by step ms. */
  index?: number;
  /** ms per stagger step. */
  step?: number;
  className?: string;
};

export function Reveal({ children, index = 0, step = 80, className }: Props) {
  return (
    <div
      className={cn("reveal", className)}
      data-motion-decorative
      style={{ animationDelay: `${index * step}ms` }}
    >
      {children}
    </div>
  );
}
