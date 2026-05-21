# MERIDIAN

Flagship 2026 web application — a marketing site for a speculative customer-lifecycle intelligence platform, deployed on Keboola data apps.

See [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md) for the design and stack rationale.

## Stack

Next.js 15 · React 19 · Tailwind v4 (CSS-first) · oklch tokens · Motion + GSAP + Lenis · R3F · TypeScript strict.

## Local dev

```sh
npm install
npm run dev          # http://localhost:3000
```

`/styleguide` is the live design-system index. Build pages on top of those primitives, never below.

## Scripts

| Script           | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Next.js dev server (Turbopack) on `:3000`.    |
| `npm run build`  | Production build (`standalone` output).       |
| `npm run start`  | Start the standalone build on `:3000`.        |
| `npm run lint`   | Biome.                                        |
| `npm run typecheck` | `tsc --noEmit`.                            |

## Layout

```
app/                routes
components/
  motion/           magnetic button, marquee, reveal, parallax, cursor, counter, shader bg
  r3f/              webgl scenes
  ui/               primitive shadcn-style components, restyled
  marks/            logos and one-off SVG marks
lib/                helpers (cn, formatters, keboola client)
public/assets/      grain, fonts (if local), static media
```

## Deployment

Deployed as a Keboola data app on project **2000** via `kbagent data-app`.
See `keboola-config/` (added in Phase 3) for the platform contract.
