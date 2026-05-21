"use client";

import { useEffect, useState } from "react";

/**
 * True when the primary input device is a fine pointer (mouse / trackpad).
 * Used to gate cursor-driven effects (magnetic, custom cursor) on touch devices.
 */
export function useHasPointer(): boolean {
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasPointer(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return hasPointer;
}
