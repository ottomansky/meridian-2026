"use client";

/**
 * Dynamic boundary for ShaderBackground — keeps three.js + R3F out of the
 * server bundle and out of the initial JS for routes that don't render it.
 */

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const Loaded = dynamic(() => import("./ShaderBackground").then((m) => m.ShaderBackground), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(70% 60% at 70% 30%, color-mix(in oklch, var(--color-flux) 18%, var(--color-ink)) 0%, var(--color-ink) 70%), " +
          "radial-gradient(40% 40% at 20% 80%, color-mix(in oklch, var(--color-iris-3) 20%, var(--color-ink)) 0%, transparent 70%)",
      }}
    />
  ),
});

export function ShaderBackgroundClient(props: ComponentProps<typeof Loaded>) {
  return <Loaded {...props} />;
}
