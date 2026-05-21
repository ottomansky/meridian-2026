"use client";

/**
 * ShaderBackground — full-bleed WebGL fragment shader.
 * Slow dichroic FBM, mouse-reactive offset, brand-palette mix.
 *
 * Fallback:
 *   - prefers-reduced-motion → static radial gradient using the iris palette.
 *
 * Performance:
 *   - DPR capped at 1.5, powerPreference: low-power
 *   - No antialias (the shader is full-bleed colour, no geometry edges)
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uInk;
  uniform vec3 uFlux;
  uniform vec3 uIris1;
  uniform vec3 uIris3;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                       + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      s += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 m = uMouse * 0.5;
    float t = uTime * 0.04;

    float n1 = fbm(p * 1.6 + vec2(t, -t * 0.7) + m * 0.3);
    float n2 = fbm(p * 2.8 - vec2(t * 0.6, t) + n1 * 0.4 + m * 0.2);

    float v = smoothstep(1.15, 0.30, length(p));

    vec3 col = uInk;
    col = mix(col, uIris3, smoothstep(-0.6, 0.4, n1) * 0.40);
    col = mix(col, uIris1, smoothstep(-0.2, 0.7, n2) * 0.22);
    col = mix(col, uFlux, smoothstep(0.0, 0.9, n1 * n2) * 0.55);

    float band = sin(uv.y * 220.0 + uTime * 0.4) * 0.005;
    col += band;

    col *= v;

    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// oklch values from globals.css — kept in sync with --color-* tokens.
const PALETTE_HEX = {
  ink: "#191c25",
  flux: "#7bd6e6",
  iris1: "#ed7967",
  iris3: "#a382ef",
};

type Uniforms = {
  uTime: { value: number };
  uMouse: { value: THREE.Vector2 };
  uResolution: { value: THREE.Vector2 };
  uInk: { value: THREE.Color };
  uFlux: { value: THREE.Color };
  uIris1: { value: THREE.Color };
  uIris3: { value: THREE.Color };
};

function ShaderPlane({ intensity }: { intensity: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, gl } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo<Uniforms>(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uInk: { value: new THREE.Color(PALETTE_HEX.ink) },
      uFlux: { value: new THREE.Color(PALETTE_HEX.flux) },
      uIris1: { value: new THREE.Color(PALETTE_HEX.iris1) },
      uIris3: { value: new THREE.Color(PALETTE_HEX.iris3) },
    }),
    // biome-ignore lint/correctness/useExhaustiveDependencies: uniforms initialise once
    [],
  );

  useEffect(() => {
    function onMove(e: MouseEvent) {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    uniforms.uTime.value += dt * intensity;
    mouse.current.lerp(target.current, 0.06);
    uniforms.uMouse.value.copy(mouse.current);
    uniforms.uResolution.value.set(gl.domElement.width, gl.domElement.height);
  });

  return (
    <mesh ref={mesh} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms as unknown as { [k: string]: THREE.IUniform }}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

type Props = {
  className?: string;
  /** time multiplier — 0.5 calmer, 1.5 livelier. */
  intensity?: number;
};

export function ShaderBackground({ className, intensity = 1 }: Props) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            "radial-gradient(70% 60% at 70% 30%, color-mix(in oklch, var(--color-flux) 18%, var(--color-ink)) 0%, var(--color-ink) 70%), " +
            "radial-gradient(40% 40% at 20% 80%, color-mix(in oklch, var(--color-iris-3) 20%, var(--color-ink)) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ShaderPlane intensity={intensity} />
      </Canvas>
    </div>
  );
}
