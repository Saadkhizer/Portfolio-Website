# Portfolio — Saad Khizer

Personal portfolio site for a full-stack web developer based in Islamabad.

**Live:** https://saadkhizer.vercel.app

Built with Next.js 16 (App Router) and Tailwind CSS v4. Every page is statically
generated — there is no database, no API and no environment variables to
configure.

## What's in it

- Hero, Services, Work, Stack, Process, About and a contact panel
- A case study page per project, generated from `src/data/projects.js`
- Theme control with three states — system, light, dark — persisted in
  `localStorage` and applied before first paint so the page never flashes the
  wrong theme
- Mobile navigation panel with Escape-to-close and scroll lock
- Canvas constellation background: three-colour blend, per-particle shimmer,
  pauses off-screen and renders a single static frame under
  `prefers-reduced-motion`

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To view it on a phone on the same network, add that machine's LAN address to
`allowedDevOrigins` in `next.config.mjs` — Next.js 16 blocks dev-server requests
from other hosts by default.

```bash
npm run build    # production build
npm start        # serve the production build
```

## Editing content

Content is separate from layout. In most cases you do not need to touch any JSX.

| File | Holds |
| --- | --- |
| `src/data/site.js` | Name, role, headline, contact details, services, stack, process, about copy |
| `src/data/projects.js` | One object per project: summary, tech, links, screenshot, case-study content |
| `src/app/globals.css` | Design tokens — colours, fonts, background motion |
| `public/projects/` | Project screenshots (1200px wide JPEGs) |

Adding a project means adding one object to `PROJECTS`. Its card appears in the
Work grid and its case study is pre-rendered at `/work/<slug>` automatically.
The grid switches from one column to two once there is a second project.

Contact channels render only when filled in — leave `whatsapp` or `linkedin`
empty in `site.js` and no button appears, rather than a link that goes nowhere.

## Structure

```
src/
├── app/
│   ├── layout.js            root layout, metadata, no-flash theme script
│   ├── page.js              all homepage sections
│   ├── globals.css          design tokens (light + dark)
│   └── work/[slug]/page.js  case study pages
├── components/
│   ├── SiteHeader.jsx       nav, mobile panel, theme toggle
│   ├── SiteFooter.jsx
│   ├── SectionHeading.jsx
│   ├── ThemeToggle.jsx
│   ├── AmbientBackground.jsx
│   └── motion/              Reveal, Stagger, MagneticButton, ParticleField
└── data/
    ├── site.js
    └── projects.js
```

## Notes

Fonts are the system stack rather than `next/font/google` — that loader fetches
from Google during compilation and can stall the dev server on a slow or
restricted network.

Deployment is automatic: pushing to `main` triggers a Vercel build.
