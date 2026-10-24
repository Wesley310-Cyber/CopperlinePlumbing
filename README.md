# Copperline Plumbing site

Astro site, plain CSS, deployed to Netlify. This is a test project: every business fact is fictional demo data. Read `CLAUDE.md` and `docs/PLAN.md` first.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Check data, build to `dist/`, check the built pages. Problems print as warnings. |
| `SITE_ENV=production npm run build` | Same, but fails if `demoMode` is true or any `[BRACKET]` text remains |
| `npm run preview` | Serve `dist/` |

## Where things live

- `src/data/business.json`: every business fact. Pages read from it and never type facts directly.
- `src/data/emergencies.json`: copy for the three emergency cards. Prices come from `business.json`.
- `src/styles/tokens.css`: the only place colors and fonts are defined.
- `design-export/`: the original Claude Design export. Read only.

## Environment variables

| Name | Where | Purpose |
|---|---|---|
| `SITE_ENV` | Netlify build env | Set to `production` at launch to turn the launch guard on |
| `NODE_VERSION` | `netlify.toml` | Node 22 |

No secrets are used yet. Never commit secrets.
