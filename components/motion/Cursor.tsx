"use client";

/**
 * Cursor — single global custom cursor. Context-aware:
 *   - default: 6px ring
 *   - on `[data-cursor="zoom"]`: enlarged label
 *   - on `[data-cursor="link"]`: small filled dot
 *   - on `<a>` / `<button>` / `[role="button"]`: link mode
 *
 * Hidden on touch devices and under prefers-reduced-motion (the spring
 * lag of the cursor reads as motion, not state).
 *
 * Adds .meridian-no-native-cursor to <html> so the native cursor hides
 * everywhere this is mounted. Native cursor returns when this unmounts.
 */

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useHasPointer } from "@/hooks/useHasPointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Mode = "default" | "link" | "zoom";

const SPRING = { stiffness: 460, damping: 32, mass: 0.5 };

function readMode(el: Element | null): { mode: Mode; label?: string } {
  if (!el) return { mode: "default" };
  const target = el.closest<HTMLElement>(
    "[data-cursor],a[href],button,[role='button'],input,textarea,select,label",
  );
  if (!target) return { mode: "default" };
  const explicit = target.getAttribute("data-cursor") as Mode | null;
  if (explicit) {
    return { mode: explicit, label: target.getAttribute("data-cursor-label") ?? undefined };
  }
  return { mode: "link" };
}

export function Cursor() {
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const [mode, setMode] = useState<{ mode: Mode; label?: string }>({ mode: "default" });
  const [visible, setVisible] = useState(false);

  const enabled = hasPointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("meridian-no-native-cursor");
    return () => document.documentElement.classList.remove("meridian-no-native-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setMode(readMode(e.target as Element));
      setVisible(true);
    }
    function onLeave() {
      setVisible(false);
    }
    function onEnter() {
      setVisible(true);
    }
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode.mode === "zoom" ? 96 : mode.mode === "link" ? 36 : 14;

  return (
    <motion.div
      aria-hidden
      style={{
        translateX: sx,
        translateY: sy,
        x: "-50%",
        y: "-50%",
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ width: { duration: 0.22 }, height: { duration: 0.22 } }}
      className="pointer-events-none fixed left-0 top-0 z-[110] rounded-full mix-blend-difference border border-[color:var(--color-paper)] flex items-center justify-center font-mono text-[0.65rem] tracking-widest uppercase text-[color:var(--color-paper)]"
    >
      {mode.mode === "zoom" && mode.label}
      {mode.mode === "link" && (
        <span className="block w-1.5 h-1.5 rounded-full bg-[color:var(--color-paper)]" />
      )}
    </motion.div>
  );
}
