# Paul Kevin Omgba — Connected Intelligence (V0.1)

A first interactive prototype for a personal portfolio, based on the creative direction **Light + Dark**, with a 3D Connected Intelligence universe, GSAP scroll transition and editable portrait slot. **100% frontend / static site.**

## Launch locally (VS Code)

Requirements: Node.js 20.19+ or 22.12+, npm.

```bash
npm install
npm run dev
```

Open the Vite localhost URL displayed in your terminal (usually http://localhost:5173).

Build for deployment:

```bash
npm run build
npm run preview
```

The `dist/` folder can be deployed to Vercel, Netlify or other static hosts.

## Design included in V0.1

- Intro: ivory background, Space Grotesk + Instrument Serif, animated entrance.
- Interactive 3D: laptop (Web Systems), node network (AI Automation), phone (Mobile Apps), torus-knot (Creative Tech), plus custom **real `.glb`** core in `/public/models/connected-core.glb`.
- Scroll: GSAP ScrollTrigger transition to dark cinematic panel and personal portrait placeholder.
- Lower content is intentionally a **visual preview**, not final case studies: Work / Expertise / About / Contact sections exist to give module navigation targets.
- Responsive layouts and reduced-motion mode.

## Change the content and links

Edit `src/data/portfolio.js`. This holds profile data, project previews and the portrait path. The imported image assets in `public` are static files (no backend).

## Add your real portrait

1. Save an edited photographic portrait as `public/images/kevin-portrait.webp` (landscape or portrait works; vertical 3:4 is preferable).
2. Set `portrait: '/images/kevin-portrait.webp'` inside `src/data/portfolio.js`.
3. Refresh: the placeholder is replaced automatically.

Avoid embedding very large videos into the initial Hero. They may be added as optimized WebM/MP4 assets in a later iteration.

## Update only selected files later

To change the wording / projects: `src/data/portfolio.js`.
To change the hero text & scroll animation: `src/components/Hero.jsx`.
To change 3D objects: `src/components/Universe.jsx` and `public/models/connected-core.glb`.
To change typography / colors / sizing: `src/styles.css`.

Next incremental ZIPs will preserve these relative paths so they can be pasted into the project without replacing everything.

## Important

This is **V0.1**, an interactive design prototype, not a claim that all projects/case studies are finished. The projects use intentionally abstract graphic placeholders, not screenshots. The portrait placeholder is intentionally not a likeness. The user can later supply real photos or generate art-directed photographs, and can add short AI-generated motion clips where meaningful.
