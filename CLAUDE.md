# Roxen Dynamics — Project Guide

## What this project is
The consulting website for **Roxen Dynamics Inc.** (founded by Arsalan Karim), Toronto. Positioned as a team-based consulting firm. It is a single-page marketing and lead-generation site. It is **not** a web app — no framework, no build step, plain HTML/CSS/JS.

**Voice:** Use "we/our/us" throughout — not "I/my". The site represents the full expert network, not a solo consultant.

## File structure
```
RDBC/
├── website/
│   ├── index.html              # Single page — all content lives here
│   ├── style.css               # All styles — no preprocessor
│   ├── script.js               # Vanilla JS: nav scroll, mobile menu, tabs, team switcher, lead form
│   ├── sitemap.xml             # SEO sitemap (update lastmod when content changes)
│   ├── robots.txt              # Allows all crawlers, points to sitemap
│   ├── arsalan_profile2.png    # Arsalan's card photo (team section)
│   ├── sample_consultant1.png  # Placeholder team card photos (1–3)
│   ├── sample_consultant2.png
│   ├── sample_consultant3.png
│   ├── profilepic3.png         # Intro banner photo (section disabled)
│   └── EA_picture3.png         # About section photo (section disabled)
└── Background/                 # Internal reference docs — NOT committed to git
```

## Design system
| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#111111` |
| Surface-2 | `#181818` |
| Accent (blue) | `#2B8AFF` |
| Accent hover | `#60AEFF` |
| Text | `#FFFFFF` |
| Text muted | `#999999` |
| Border | `rgba(255,255,255,0.07)` |
| Display font | Plus Jakarta Sans (700, 800) |
| Body font | Inter (300, 400, 500, 600) |
| Border radius | `12px` |
| Section padding | `120px` (88px tablet, 64px mobile) |

**Never use `#0066FF`** — the accent was deliberately brightened to `#2B8AFF`. All rgba glow values use `rgba(43,138,255,...)`.

## Page sections (top → bottom)
1. **Nav** — sticky, blurs on scroll, "Roxen." logo (26px, glowing dot), hamburger on mobile
2. **Hero** — `#hero`, H1, geometric grid bg, blue glow, arch milestone component
3. ~~**Intro Banner**~~ — `#intro` **DISABLED** (commented out) — 3-col photo layout; re-enable when needed
4. **Value Prop Banner** — `#value-prop`, centered full-width, bold headline + subtext + "Meet Our Experts" CTA
5. **Team** — `#team`, 4 expert cards (photos, name, role, LinkedIn/email icons), metadata grid, background bio. Expert data in `script.js` `var experts = [...]`
6. **Digital Health Expertise** — `#expertise`, 6-card grid
7. **Problem** — `#problem`, 3 large stats + narrative
8. **Approach** — `#approach`, SCAR framework, 4 cards (letters S/C/A/R removed from cards)
9. **Services** — `#services`, tabbed layout (4 tabs), active tab = blue, panel has blue border
10. **Toolkit** — `#toolkit`, 6-card grid: Strategy · Capabilities · Analytics · Architecture · Risk & Governance · AI & Automation
11. ~~**About**~~ — `#about` **DISABLED** (commented out) — EA_picture3.png + bio; re-enable when needed
12. **Social Proof** — `#proof`, 3 stats only (20+, 17+, SCAR), padding `56px 0`
13. **CTA / Lead Form** — `#cta`, 2-col layout, form has blue border, submit turns green on success
14. **Footer** — logo, nav, address with email + location

## Key decisions & constraints
- **No X/Twitter** — Arsalan does not use it. Do not add it back.
- **Email:** `roxendynamics@gmail.com` — use this everywhere, not `arsalan@roxendbc.com`
- **LinkedIn:** `https://www.linkedin.com/in/arsalan-karim/`
- **Logo dot** — `.roxen-logo span` is `1.25em` with blue `text-shadow` glow. Appears in nav, footer, intro banner (`intro-logo`), CTA (`cta-logo`)
- **Testimonials removed** — section gutted, only stats remain. Do not add placeholder quotes back.
- **People & Change toolkit card removed** — replaced with AI & Automation
- **SCAR card letters removed** — the large S/C/A/R letters are gone; don't add them back

## SEO
- Schema.org JSON-LD in `<head>`: Organization, Person, ProfessionalService
- All `https://www.roxendynamics.com` references are placeholders — update when domain is live
- `sitemap.xml` lastmod dates should be updated when content changes

## Mobile responsive breakpoints
| Breakpoint | Notes |
|---|---|
| `max-width: 1024px` | Tablet — grids collapse to 1 col, CTA stacks |
| `max-width: 900px` | Intro Banner stacks; photo becomes fixed 360px height |
| `max-width: 768px` | Mobile — hamburger shows, all layouts single column |
| `max-width: 390px` | Small phones — tighter tab buttons, smaller hero font |

`overflow-x: hidden` is set on both `html` and `body` to prevent glow divs causing horizontal scroll on iOS Safari.

## Outstanding items (as of 2026-05-25)
- [ ] Replace placeholder team photos (sample_consultant1–3.png) with real photos
- [ ] Replace placeholder team member names/bios with real network details
- [ ] Connect lead form to real backend (Formspree or Netlify Forms recommended)
- [ ] Register domain and replace `https://www.roxendynamics.com` throughout + sitemap
- [ ] Swap "Book a Call" email links for Calendly URL when available
- [ ] Add real testimonials when available
- [ ] Re-enable `#intro` or `#about` sections if needed, or replace with new About page
