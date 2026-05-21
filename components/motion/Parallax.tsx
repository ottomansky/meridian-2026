"use client";

/**
 * Parallax — z-axis depth using `perspective` + `translateZ` so the GPU
 * actually parallaxes (cheaper + crisper than translateY-on-scroll).
 *
 * Two complementary helpers:
 *   <ParallaxScene>  — wraps a section with a perspective context.
 *   <ParallaxPlane depth={-300}>  — translates a child on Z; the scene
 *                                   wraps it in a perspective-correct stack.
 *
 * Depth notes: negative depths move the plane AWAY from the viewer (smaller,
 * slower); positive depths move TOWARD (larger, faster). The scene applies
 * a compensating scale so layout doesn't shift.
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SceneProps = {
  children: ReactNode;
  className?: string;
  /** perspective in px. Lower = more dramatic. */
  perspective?: number;
};

export function ParallaxScene({ children, className, perspective = 1000 }: SceneProps) {
  return (
    <div
      className={cn(
        "relative [transform-style:preserve-3d]",
        "[perspective-origin:50%_30%]",
        className,
      )}
      style={{ perspective: `${perspective}px` }}
      data-motion-decorative
    >
      {children}
    </div>
  );
}

type PlaneProps = {
  children: ReactNode;
  depth?: number;
  className?: string;
  style?: CSSProperties;
};

export function ParallaxPlane({ children, depth = 0, className, style }: PlaneProps) {
  const scale = 1 - depth / 1000;
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        transform: `translateZ(${depth}px) scale(${scale})`,
        transformOrigin: "center center",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
