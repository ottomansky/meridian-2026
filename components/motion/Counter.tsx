"use client";

/**
 * Counter — animates from `start` to `value` once visible.
 * easeOutExpo, Intl.NumberFormat. Falls through to instant rendering when
 * the user prefers reduced motion.
 */

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  value: number;
  start?: number;
  durationMs?: number;
  locale?: string;
  options?: Intl.NumberFormatOptions;
  className?: string;
};

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function Counter({
  value,
  start = 0,
  durationMs = 1400,
  locale = "en-US",
  options,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(start);
  const reduced = usePrefersReducedMotion();
  const formatter = new Intl.NumberFormat(locale, options);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let startTs = 0;
    let started = false;

    function step(now: number) {
      if (!started) {
        startTs = now;
        started = true;
      }
      const t = Math.min(1, (now - startTs) / durationMs);
      const eased = easeOutExpo(t);
      setDisplay(start + (value - start) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, start, durationMs, reduced]);

  return (
    <span ref={ref} className={className} data-nums="true">
      {formatter.format(display)}
    </span>
  );
}
