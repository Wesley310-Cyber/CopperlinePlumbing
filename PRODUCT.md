# Product

<!-- impeccable:product-schema 1 -->

Source note: the interview round returned "no preference" on every question, so every fact below comes from `CLAUDE.md` and `docs/PLAN.md` and has not been separately confirmed. Revisit with `/impeccable init` if any of it is wrong.

## Platform

web

## Stack
Astro, plain CSS from tokens, no UI framework. Netlify Forms and Functions. Deployed to Netlify from GitHub. Already decided in CLAUDE.md.

## Users
Primary: a homeowner or landlord with a plumbing emergency at night, on a weekend or on a holiday, on a phone, who should be able to place a call within 10 seconds.
Secondary: people with non-urgent work, people considering a maintenance membership, and landlords wanting an account for several properties.

## Product Purpose
Copperline Plumbing is a fictional demo business used to test a lead-generation site. The site turns emergency visitors into phone calls. It also captures non-urgent jobs, memberships and landlord accounts. Success is calls placed, then callback-form submissions.

## Positioning
Unconfirmed, inferred from CLAUDE.md: a real person answers 24/7 (only if true in practice), and rates are published and the same every night. Licensed & Insured.

## Operating Context
Visitors are often stressed and on a mobile phone, possibly on slow 4G. Calls may be tracked and recorded, which needs a recording notice (California all-party consent). Gas smells send people to SoCalGas 1-800-427-2200 or 911 first.

## Capabilities and Constraints
- Every changing business fact lives in `src/data/business.json`. Pages never hold typed-in facts.
- Every page shows the legal business name, CA license number (C-36 Plumbing) and "Open 24/7".
- One primary call action per screen. The phone number must never wrap, even at 320px.
- Tap targets at least 48px. No popups, carousels or autoplay video.
- `tel:` links must work with JavaScript off.
- Never say "bonded". Never claim prices don't rise in storms. Never state an IRS mileage rate.
- The gas page is a safety page, not a sales page.
- Demo mode is on: DEMO SITE banner, noindex, "(sample review)" tags, sample license. Photos in `design-export/img` are AI-generated test images.
- Work proceeds by phase (see `docs/PLAN.md`), stopping for review after each.

## Brand Commitments
Binding visual constraint from CLAUDE.md: use the Copperline design system. Base teal `#0E3B3D`, cream `#FBF6EC`, copper `#A5481A`, alert `#B83A06`. Fraunces for headlines, Figtree for text. No new colors, except the approved night theme defined in `src/styles/tokens.css`. The static export in `design-export` is the visual and copy source of truth. Do not redesign it.
Voice: warm, calm, plain-spoken, short sentences. No corporate buzzwords. No fear-mongering.

## Evidence on Hand
No real reviews, ratings, prices, photos, team members or license number exist. Demo values in `business.json` are fictional. Do not fabricate production evidence.

## Product Principles
1. Speed to a phone call comes first. Every screen has one obvious call action.
2. Be calm and honest. No fear, no hidden pricing, no invented proof.
3. Facts come from one source, `business.json`, never from page copy.
4. Work on a small phone first, in the dark, on a slow connection.
5. Keep the demo clearly marked until a real launch passes legal review.

## Accessibility & Inclusion
Target Lighthouse mobile 95+ in all four categories and zero serious axe issues. Test at 375px on throttled 4G. Phone number must not wrap at 320px. Tap targets at least 48px.
