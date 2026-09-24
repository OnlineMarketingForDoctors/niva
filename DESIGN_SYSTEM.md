# Niva Medical Clinic — design system

Extracted from the live homepage (nivamedicalclinic.co.uk, Elementor kit #36,
header template #615, footer template #623) on 23 Sep 2026. Every value was
read from the site's own CSS or from computed styles at 1440 / 1024 / 390px.

- Tokens: [`public/design-system/tokens.css`](public/design-system/tokens.css)
- Rendered style guide: `/design-system/` on the deployed site
- Reference screenshots of the live page are in the session scratchpad, not the repo

---

## 1. Colour

| Token | Hex | Where the live site uses it |
|---|---|---|
| `--color-primary` | `#252C3F` navy | Dark sections (stats panel, footer), icon circles, header CTA buttons, button hover state |
| `--color-secondary` | `#175CD3` blue | Default button background, active nav link, hero checklist icons, hover accent |
| `--color-accent` | `#75BDE9` sky | Eyebrow headings, stat numbers, icons on navy, accent buttons, social icon backgrounds |
| `--color-text` | `#111111` | All text on light backgrounds (headings and body share one colour) |
| `--color-white` | `#FFFFFF` | Cards, header bar, text on navy |
| `--color-surface` | `#EAF5FC` | Light-blue section background (hero, "Comprehensive services") |
| `--color-surface-2` | `#F7F7F7` | Only appears at 22 % alpha as the footer divider |
| `--color-border` | `#D8D8D8` | 1px card outlines |
| `--color-muted` | `#69727D` | Elementor's default grey — 3 unstyled meta elements. Not a deliberate brand colour |

Usage on the page: 97 references to primary, 172 to white, 46 to text,
24 to accent, 19 to secondary, 2 each to surface and surface-2.

### Contrast (WCAG)

| Pair | Ratio | |
|---|---|---|
| white on navy `#252C3F` | 13.9 : 1 | AAA |
| `#111` on `#EAF5FC` | 17.1 : 1 | AAA |
| white on blue `#175CD3` | 6.0 : 1 | AA |
| sky `#75BDE9` on navy | 6.8 : 1 | AA |
| **white on sky `#75BDE9`** | **2.1 : 1** | **fails** — accent buttons and social icons |
| **sky on white / on `#EAF5FC`** | **2.1 / 1.9 : 1** | **fails** — eyebrow headings, stat labels on light backgrounds |

The sky accent is fine on navy and as an icon tint, but the live site also
uses it for text and button fills on light backgrounds, where it fails AA.
The rebuild should keep the accent for icons and on-navy text and use
`--color-secondary` where sky text or fills sit on white.

## 2. Typography

One family: **Poppins**, self-hosted at
`/wp-content/uploads/elementor/google-fonts/css/poppins.css` (all 9 weights,
upright and italic). The live site also loads Open Sans and Lato from Google
Fonts; they are theme defaults and only reach 6 unstyled elements. Drop them.

Weights actually used: **300** (all body copy), **700** (every heading, nav
link, button, eyebrow), 600 (`<b>` inside body), 500 (one side-tab button).

| Role | Token | Desktop | Tablet ≤1024 | Mobile ≤767 | Weight | Used for |
|---|---|---|---|---|---|---|
| Display | `--text-display-*` | 60 / 1.3 | 52 | 35 / 45px | 700 | Hero heading (one use) |
| Heading | `--text-heading-*` | 42 / 1.3 | 38 | 30 / 40px | 700 | Section headings, stat numbers |
| Subhead | `--text-subhead-*` | 20 / 1.5 | 20 | 19 | 700 | Card titles, footer headings, on-navy eyebrows |
| Body | `--text-body-*` | 16 / 1.9 | 16 | 15 | 300 | Dominant body size (209 CSS refs) |
| Body large | `--text-body-lg-*` | 17 / 1.9 | 16 | 15 | 300 | Intro paragraphs (55 refs) |
| Label | `--text-label-*` | 15 / 1.5 | 15 | 14 | 700 | Nav links, eyebrows, "About Us" links |
| Button | `--text-button-size` | 15 | 15 | 14 | 700 | Pill buttons (split pairs use 14) |
| Fine | `--text-fine-*` | 15 / 1.9 | 15 | 14 | 300 | Footer legal line |

Observations:
- Body copy is very light (300) with a loose 1.9 line-height. That is the
  page's most recognisable texture; keep it.
- The page has **no `<h1>`**. The hero heading and every section heading are
  `<h2>`. The rebuild should use a proper heading outline.
- 17px and 16px body are both used with no discernible rule; 16px dominates.

## 3. Layout

| Token | Value |
|---|---|
| `--container-max` | 1140px (1024 tablet, 767 mobile) |
| `--section-gutter` | 5 % horizontal padding on every full-width section |
| `--column-gutter` | 4 % (a few columns use 5 % or 6 %) |
| `--widget-gap` | 20px between stacked widgets |
| Breakpoints | 1024px (tablet), 767px (mobile) — Elementor defaults |

Section vertical padding is set in percent on the live site (5 / 7 / 8 / 10 %
of viewport width), so it drifts with screen size. Tokens freeze the 1440px
values: `--space-section-sm` 72px, `-md` 100px, `-lg` 144px, with tablet and
mobile overrides.

Section backgrounds alternate: surface blue → white → navy → white → navy
(footer). Full-bleed backgrounds, boxed 1140px content.

## 4. Shape

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 5px | Footer badge chip |
| `--radius-card` | 15px | Service cards (24 refs — the dominant radius) |
| `--radius-block` | 20px | Image blocks, footer top corners on tablet; also `20 0 0 20` on a side tab |
| `--radius-hero` | 33px | Hero section bottom corners, large photo blocks |
| `--radius-split` | 50px | Joined split-pair buttons (`50 0 0 50` + `0 50 50 0`) |
| `--radius-pill` | 75px | All standalone buttons, the header bar |
| `--radius-round` | 50% | 61px icon circles |

Six distinct radii is more than a system needs. Suggested for the rebuild:
card 15, block 20, hero 33, pill — drop 5 and fold 50 into pill.

## 5. Elevation and motion

| Token | Value | Used on |
|---|---|---|
| `--shadow-card-hover` | `0 0 31px rgba(0,0,0,.05)` | Service cards on hover (12 refs) |
| `--shadow-header` | `0 2px 10px rgba(0,0,0,.16)` | Floating white header bar |
| `--shadow-dropdown` | `0 10px 10px -6px rgba(0,0,0,.24)` | Nav dropdown |
| `--shadow-float` | `0 6px 14px -10px rgba(0,0,0,.3)` | Review widget |

Resting cards have **no** shadow, only the 1px border; the shadow appears on
hover. Every transition is 0.3s (`background`, `border`, `border-radius`,
`box-shadow`, `color`, `fill`). Entrance animations are Elementor `fadeIn` /
`fadeInUp` with staggered delays (450ms, 750ms).

## 6. Components

### Button
Base: Poppins 15/700, padding `15px 30px`, radius pill, 2px border, 0.3s.

| Variant | Fill | Border | Text | Hover |
|---|---|---|---|---|
| Primary (kit default) | `#175CD3` | same | white | fill + border → navy |
| Dark (header "020 8865 1938", "Book Online") | `#252C3F` | none | white | → blue |
| Accent | `#75BDE9` | same | white | → blue (fails AA, see §1) |
| Split pair | left accent / right navy, or reversed | 2px | white, 14px | swap to blue |
| Outline (hero secondary) | transparent | 2px navy | navy | fill navy, text white |
| Large (`.btn--lg`, hero) | — | — | 16px, padding `18px 30px` | dark variant adds a soft navy drop shadow |
| Side tab | accent, radius `20 0 0 20`, 16/500, padding `20px 15px` | 1px | white | — |

Split pair geometry: left button `radius 50 0 0 50`, padding `18px 40px 18px
30px`; right button `radius 0 50 50 0`, padding `18px 30px 18px 40px`.

### Header bar
White pill (radius 75) with `--shadow-header`, padding `1% 1% 1% 5%`, floats
over the hero with `margin-bottom: -120px`. Logo (176px wide) left; nav links
15/700 `#111`, 28px apart, active link blue; two dark pill CTAs right.
Dropdown: white, `--shadow-dropdown`, highlighted item blue with white text.
On tablet/mobile the nav collapses to a hamburger + "CALL" icon + Book Online.

### Hero (full-bleed photo)
Photo fills the section (`object-position: 75% center`), with a left-to-right
`--color-surface` wash fading out by 66 % so the copy sits on light blue. Copy
column max 600px: display heading → intro → five selling points (20px blue
`fa-check-circle`, bold lead-in + light remainder) → dark + outline large
buttons → "Or call" line. Two white review badges (radius 15, header shadow)
sit bottom-right over the photo. Below 1024px the wash strengthens and the
badges drop under the copy; below 767px the photo becomes a rounded 3:2 block
between the copy and the badges.

### Section
Full-width background (surface / white / navy), `--section-gutter` sides,
`--space-section-*` top/bottom, boxed 1140px container. The hero section has
`radius 0 0 33px 33px` so the blue background curves into the white below.

### Section header
Optional eyebrow (accent, 15 or 20 / 700) → heading (42/700, centred or left)
→ intro paragraph (17/300, max ~70ch). 20px between each.

### Card (service)
White, `1px solid #D8D8D8`, radius 15, padding `24px 24px 0`. Icon circle top-
left, 20/700 title, 16/300 body. Hover: `--shadow-card-hover` and a 15 % white
overlay; border stays. Four across at 1140px (276px each, 4 % gutters).

### Icon circle
61px, navy fill, white 25px Font Awesome glyph, radius 50%. Hover keeps navy
(stacked view). On navy sections the fill flips to accent.

### Icon list (checklist)
`fas fa-check-circle` 15px in blue (`#175CD3`) on light, accent on navy;
text 16/300; two columns in the hero. Hover tints the icon blue.

### Stats panel
Navy section. Number 42/700 in accent, label 16/300 white, hairline dividers
`rgba(255,255,255,.13)`, "About Us" link 15/700 accent. Award badges as images.

### Footer
Navy, top corners 20px on tablet. Column headings 20/700 white, links 16/300
white, icons accent, social icons accent-filled circles, divider
`rgba(247,247,247,.22)`, legal line 15/300.

### Icons
Font Awesome 5 (solid, regular, brands), self-hosted at
`/wp-content/plugins/elementor/assets/lib/font-awesome/`. Glyphs used:
check-circle (22), minus (7), clock (6), phone-alt, map-marker-alt,
map-marked-alt, male, hospital, home, hands-wash, envelope, angle-up,
linkedin, instagram, facebook-f. Custom SVGs for the header call icon and
"Get in touch" tab.

## 7. Inconsistencies to fix in the rebuild

1. Sky accent used as text and button fill on light backgrounds — fails AA.
2. No `<h1>`; all headings are `<h2>`.
3. Two body sizes (17 / 16) with no rule; three button sizes (15 / 14 / 16-500).
4. Six radii; three column gutters (4 / 5 / 6 %); four section paddings in %.
5. Open Sans and Lato loaded but unused.
6. Three elements fall through to Elementor's default grey `#69727D` at 400.
7. Entrance-animation delays leave content invisible for up to 750ms on load.
