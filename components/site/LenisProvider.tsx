"use client";

/**
 * LenisProvider — smooth scroll, gated on prefers-reduced-motion.
 * Mounted at the root of pages that want smooth scroll (the landing).
 * Sets `lenis-smooth` class on <html> so Tailwind / CSS can react if needed.
 */

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LenisProvider() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
      }) as unknown as { raf: (t: number) => void; destroy: () => void };
      document.documentElement.classList.add("lenis-smooth");
      function loop(t: number) {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, [reduced]);

  return null;
}
