# MERIDIAN — Design Decisions

Living record of strategic decisions made while building the flagship site.
Each entry: **decision**, then **why** (the constraint or trade-off that led there).

## Product

**MERIDIAN — an operating system for customer-lifecycle intelligence.**

- _Audience_: forward-looking data + revenue-ops teams evaluating modern customer-intelligence platforms.
- _Core surfaces_: `/` Landing · `/product` Product · `/signals` Live Signals (real preview against Keboola project 2000's CLA_Customer_Lifecycle data) · `/manifesto` Manifesto · `/pricing` Pricing.
- _Brand mood_: "Linear meets Igloo Inc — clinical precision meets dichroic alien materials. Instrument panels for things that haven't been built yet."

The Live Signals surface is the differentiator — the site is also a working data viewer. Everything else is marketing scaffolding around that core.

## Stack — locked per brief, with version pins

| Layer        | Choice                                             | Notes                                                       |
| ------------ | -------------------------------------------------- | ----------------------------------------------------------- |
| Framework    | Next.js 15.5.18 (App Router, Turbopack)            | Pinned to 15.x per brief, even though 16.x is current.      |
| Runtime      | React 19.2 / Node ≥ 20                             |                                                             |
| Output       | `standalone`                                       | Required for Keboola data-app deployment.                   |
| Styling      | Tailwind v4 CSS-first (`@theme` block)             | No `tailwind.config.ts`. Tokens in `app/globals.css`.       |
| Color        | oklch end-to-end                                   | One hue ramp per surface family; dark default.              |
| Lint/format  | Biome 2.x                                          | Replaces ESLint+Prettier.                                   |
| Motion       | Motion (formerly Framer Motion) + GSAP/ScrollTrigger + Lenis | Each used where it's strongest.                     |
| 3D           | R3F + drei + postprocessing                        | Hero shader + interactive material moments.                 |
| Theming      | next-themes                                        | dark default, light is a polished override.                 |

## Typography

- **Display** — **Fraunces** (Google Fonts / OFL). Variable: `opsz`, `wght`, `SOFT`, `WONK`. Used for all headlines and the per-page oversized moment. `opsz 144 / wght 500 / SOFT 100` is the headline default; reduces to `opsz 14 / wght 400 / SOFT 0` for inline serif.
- **Body** — **Bricolage Grotesque** (Google Fonts / OFL). Variable: `wght`, `opsz`, `wdth`. Used for paragraph text and UI. Width axis is animated on hover for navigation labels.
- **Mono** — **JetBrains Mono Variable** (Google Fonts / OFL). Used for eyebrow labels, numerals, code, and the "instrument-panel" copy that wants a technical feel.

**Why this trio:**

- The brief banned Inter as display, Roboto, system-ui as body, and "Space Grotesk everywhere". Fraunces is editorial and expressive enough to feel like a print object on screen; Bricolage is a modern grotesque that is _not_ generic; JetBrains Mono Variable carries the instrument-panel signage.
- All three are OFL-licensed → safe for commercial deployment, no fontshare contract needed, no .woff2 download required (Google Fonts host them).
- All three are real variable fonts so we can animate `font-variation-settings` on hover and at scale, per the brief.

If we ever swap to a paid pairing (PP Editorial New + PP Neue Montreal, the brief's first suggestion), the swap is one `next/font/local` block — the rest of the system already references `--font-display` / `--font-sans` / `--font-mono`.

## Color

Monochromatic deep-blue-grey base, **one** electric accent.

```
--color-ink         oklch(0.135 0.014 250)   bg dark
--color-paper       oklch(0.97 0.006 82)     fg on dark
--color-bone        oklch(0.975 0.005 82)    bg light (warm off-white, NOT #fff)
--color-flux        oklch(0.82 0.15 198)     the one electric note (ice-cyan)
```

- Background hue 250 (cool steel) → reads instrument-panel, not "blue".
- Background light is warm off-white (hue 82) → contrasts with the cool surface and gives the light theme a deliberate paper-y character. Pure white is banned by the brief.
- Accent hue 198 is between cyan and azure — CRT cyan, but unsaturated enough to never read neon. _One_ accent only. No purple→blue, teal→pink, or "AI lavender" gradients.
- Iridescent / material tints (`--color-iris-1..4`) exist only for shader work and dichroic surfaces. They are not application colors.

## Material atmosphere

- **Grain** — every surface. `public/assets/grain.svg` generated via `feTurbulence`, applied at `mix-blend-mode: overlay` with `opacity: 0.06–0.08`. Fixed-position on the body so it never tiles into a moiré pattern.
- **Glass** — backdrop-blur 18px + saturate 140% + 10% foreground border. Reserved for floating nav and command-palette layers. Not for "frosted card" backgrounds — those use `.surface` instead.
- **Chromatic aberration** — `.flux-hover` utility splits text-shadow on hover with red/cyan offsets. Used sparingly on the largest interactive titles.
- **Iridescent / dichroic** — only via R3F shader (Phase 1 `ShaderBackground`). No CSS-only iridescence — it always reads cheap.

## Motion

Reusable primitives live in `components/motion/` and each gets a demo route at `/styleguide/motion/[name]`.

Easing palette in tokens:

```
--ease-out-quint    cubic-bezier(0.22, 1, 0.36, 1)    -- default for in-motion
--ease-out-expo     cubic-bezier(0.16, 1, 0.3, 1)     -- counters, big swings
--ease-in-out-quad  cubic-bezier(0.45, 0, 0.55, 1)    -- bidirectional
--ease-back         cubic-bezier(0.34, 1.56, 0.64, 1) -- spring-feel without physics
--ease-instr        cubic-bezier(0.65, 0, 0.35, 1)    -- "instrument" feel, deliberate
```

Hard rule per brief: `prefers-reduced-motion: reduce` kills decorative motion (`.marquee-track`, `.reveal`, anything with `data-motion-decorative`), but keeps state-change transitions.

Native CSS `animation-timeline: view()` powers the default reveal. GSAP ScrollTrigger fallback only when we need scrub/pin behavior the spec doesn't expose yet.

## Keboola deployment

- Repo will be pushed to a new GitHub repository.
- `keboola-config/` (nginx 8888 → Next.js 3000, supervisord with `npm start`, setup.sh `npm ci --omit=dev` against pre-committed `.next/standalone`) lands in Phase 3.
- `output: "standalone"` in `next.config.ts` so the deploy artifact is a single Node bundle with no `next build` step required at container start (Keboola contract: don't build during `setup.sh`, commit the build instead).
- Live Signals page reads from project 2000's CLA_Customer_Lifecycle via Keboola Query Service from the running container; in local dev it reads from `.env.local`. Server-only `KBC_TOKEN` — never exposed to the client bundle.

## Decisions explicitly punted

- Whether the dark/light toggle is exposed in the header chrome or only via system preference — defer until the page composition phase tells us whether the toggle needs to be a brand moment.
- Whether the command palette ships in v1 — `cmdk` is in deps but no UI commits to it yet.
- Page transition specifics (shared element morphs) — wired generically via View Transitions API in `globals.css`; per-route choreography added in Phase 2.
