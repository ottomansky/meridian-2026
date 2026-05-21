"use client";

/**
 * Magnetic — pulls children toward the cursor within `radius`.
 * Spring physics via motion's useSpring. Disabled on touch + reduced-motion.
 *
 * Usage:
 *   <Magnetic strength={0.4} radius={140}><Button>...</Button></Magnetic>
 */

import { motion, useMotionValue, useSpring } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { useHasPointer } from "@/hooks/useHasPointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  /** Pixel radius inside which the cursor influences the element. */
  radius?: number;
  /** 0..1 — fraction of cursor delta the element follows. */
  strength?: number;
  className?: string;
};

const SPRING = { stiffness: 320, damping: 24, mass: 0.6 };

export function Magnetic({ children, radius = 140, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const enabled = hasPointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    function onMove(event: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const falloff = 1 - dist / radius;
        x.set(dx * strength * falloff);
        y.set(dy * strength * falloff);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, radius, strength, x, y]);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
