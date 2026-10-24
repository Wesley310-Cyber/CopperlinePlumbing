# Copperline Plumbing site

Purpose: turn people in a plumbing emergency (nights, weekends, holidays) into phone calls within 10 seconds. Secondary: capture non-urgent work, maintenance memberships, and landlord accounts.

## Current state
- This is a TEST project. All business facts are fictional demo values (see "Demo mode").
- The starting point is the static Claude Design export in `/design-export` (design-export/index.html, design-export/styles.css, design-export/img/). Treat it as the visual and copy source of truth. Do not redesign it.
- The target is an Astro site deployed to Netlify from this GitHub repo.
- The full plan is in `docs/PLAN.md`. Work one phase at a time and stop after each phase for review.

## Rules
- Never use the word "bonded". Say "Licensed & Insured".
- Every page shows the legal business name, CA license number (C-36 Plumbing) and "Open 24/7". Values come only from `src/data/business.json`. Never type a business fact directly into a page.
- Never invent a license number, review, rating, price, photo or team member for production. In demo mode only, use the fictional values already in `business.json`.
- One primary call action per screen. The phone number must never wrap: put the label and number on separate lines or use `white-space: nowrap`.
- Tap targets at least 48px. No popups, carousels or autoplay video.
- Tone: warm, calm, plain-spoken, short sentences. No corporate buzzwords ("solutions", "industry-leading"). No fear-mongering.
- Do not write that prices never rise during storms or emergencies. Say rates are published and the same every night.
- Gas smell: SoCalGas 1-800-427-2200 or 911 first, then our repair service. Gas is a safety page, not a sales page.
- Do not state an IRS mileage rate anywhere. Explain travel fees as fuel, truck wear and technician time.
- If call tracking records calls, show a recording notice (California requires all-party consent). Ask the owner to confirm wording with counsel.
- Design tokens come from the Copperline design system: base teal `#0E3B3D`, cream `#FBF6EC`, copper `#A5481A`, alert `#B83A06`, fonts Fraunces (headlines) and Figtree (text). Do not add new colors.

## Demo mode
- `business.json` has `"demoMode": true`. While true: show the "DEMO SITE" banner at the top, add `<meta name="robots" content="noindex,nofollow">`, tag sample reviews "(sample review)", and show the license as a sample number.
- Photos in `/design-export/img` are AI-generated test images. Never remove the demo banner while they are in use.
- Switching to production means: set `demoMode` to false, replace every value in `business.json`, replace all photos with real ones, and pass the legal review below. The production build (`SITE_ENV=production npm run build`) must fail if `demoMode` is true or any `[BRACKET]` text remains. A plain `npm run build` only warns, so the demo site can deploy.

## Stack
- Astro, plain CSS from tokens, no UI framework.
- Netlify Forms and Netlify Functions for the callback form and the on-call alert.
- Fonts self-hosted. Images in WebP/AVIF at two widths, with width and height set.
- No tracking scripts until Phase 4. Document every environment variable in `README.md`. Never commit secrets.

## Repo layout
```
/design-export        original Claude Design static export (read only)
/docs/PLAN.md         the phased build plan
/src/data/business.json   every changing fact lives here
/src/components       Header, CallBar, EmergencyCard, PriceTable, Reviews, ServiceMap, Footer
/src/layouts          BaseLayout
/src/lib/business.ts  helpers that read business.json
/src/styles           tokens.css (design tokens), global.css
/src/assets/img       photos, optimised by Astro to AVIF/WebP at two widths
/src/pages            index, emergency pages, intent landing pages, city pages
/scripts/check-build.mjs   launch guard (demo mode, [BRACKET] text)
/public               fonts, favicon, robots.txt
netlify.toml
CLAUDE.md
```

## Phases (stop and show me after each)
0. Foundation: Astro project, tokens, `business.json`, bracket and demo-mode build checks.
1. Port and fix the homepage: components, call buttons, price anchors, data-driven status strip.
2. Money pages: three emergency pages, gas safety, pricing and service area, about, membership, landlord accounts.
3. Intent landing pages: /burst-pipe, /sewer-backup, /water-heater-leaking, time-aware hero.
4. Capture and tracking: call tracking hooks, GA4 events, form-to-SMS-and-email function, missed-call text-back.
5. Local search: city page template and 12 city pages, Plumber/LocalBusiness JSON-LD, sitemap.
6. Quality gates.
7. Launch checklist.

## Done means
- Lighthouse mobile 95+ in all four categories.
- axe shows zero serious issues.
- Tested at 375px on throttled 4G. Every `tel:` link works with JavaScript off.
- Phone number does not wrap at 320px.

## Before any real launch (owner and counsel)
- Real legal name exactly as on the CSLB license, and the license number.
- Rates match what was charged before October 15, 2026, if the LA County price-gouging window (Penal Code 396, through April 13, 2027) still applies. Confirm dates on the Cal OES page. Have a California attorney review pricing and advertising claims.
- Real photos, real Google reviews with permission, real insurance and guarantee terms.
- "A real person answers 24/7" is true in practice, or the wording changes.

## How to work with me
- Read this file and `docs/PLAN.md` at the start of every session.
- Show changes at 375px and 1280px before moving on.
- Ask before adding dependencies or changing the design.
