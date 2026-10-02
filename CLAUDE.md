# Project rules

## Layout

Static site served by Vercel from `public/` (no build step).

- `public/index.html` — the homepage, hand-written HTML on the design system
- `public/private-gp-consultations/index.html` — Private GP Consultations service page (sections from the `niva-lp` landing page + homepage); its [data-book] buttons open the Semble booking calendar in a modal
- `public/contact/index.html` — Contact page (contact cards, opening hours, the live site's enquiry form, Find us). Menu Contact links point here
- `public/pricing/index.html` — Pricing page; all fees from nivamedicalclinic.co.uk/services/#fees. The menu's Fees link points here
- `public/css/site.css` — all component styles; uses only tokens from `public/design-system/tokens.css`
- `public/js/site.js` — mobile nav, booking modal, services accordion, review carousels, gallery, reveal-on-scroll (page works without it)
- `public/design-system/` — `tokens.css` plus a rendered style guide at `/design-system/`
- `DESIGN_SYSTEM.md` — the spec: tokens, components, contrast audit, known inconsistencies
- `public/legacy/index.html` — byte-for-byte mirror of the original Elementor homepage, kept for visual comparison only; do not edit
- `public/wp-content/`, `public/wp-includes/` — assets mirrored from the live site (images, Poppins, Font Awesome). Reference them, don't restructure them
- `public/assets/icons/` — the 8 custom service icons as SVG + `sprite.svg`
- `public/assets/logos/` — association logos + Doctify SVG, copied from the `niva-lp` landing page repo

Add new pages as `public/<slug>/index.html` linking the same tokens + `site.css`. Every page needs the robots meta tag below.

## Page hero: same layout on every page

Every new page opens with the hero used on the Private GP, Pricing and Contact pages. Copy it from `public/contact/index.html` and change only the content:

- Full-width background photo (`.hero` + `.hero-media`), subject on the right, clear space on the left for text. Desktop and mobile crops as `assets/img/<page>-hero.webp` and `<page>-hero-mobile.webp`; new photos are generated to match (navy slat walls, white marble, light oak, natural light)
- `h1.display` headline, one `p.intro` line, five `.hero-points` selling points (bold lead-in + light remainder)
- Primary dark button (Book an appointment, `data-book`) + an outline secondary button, then a small `.hero-call` line
- The Google + Doctify `.review-badges` bottom-right
- The navy accreditation logo strip (`section.trust`) directly under the hero

## This site must NOT be indexed by search engines

Until explicitly told otherwise, every page built in this repo must stay out of search results:

- Every HTML page must include in `<head>`:
  `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`
  (If using a framework, set this in the root layout/metadata so it applies to all pages.)
- Keep the `X-Robots-Tag` header in `vercel.json` (applies to every response, including PDFs and images).
- Do NOT add `Disallow: /` to `robots.txt` — it stops crawlers from seeing the noindex directives. If a `robots.txt` exists, it should allow crawling.
- Do NOT add a sitemap or submit the site to Google Search Console for indexing.
