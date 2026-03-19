# DESIGN.md — M3 Design System v2

Agent-friendly design system reference. Use this file as context when generating or refining UI for this project.

---

## Aesthetic Identity

**Name:** Soft Modernism
**Base:** Material Design 3
**Character:** Organic M3 shapes (capsule buttons, rounded cards) paired with sharp editorial typography and a warm heritage color palette. Never sterile or cold — always warm, considered, editorial.

---

## Color System

All values must be referenced via CSS custom properties, never hardcoded. The canonical source is `src/styles/tokens.css`.

### Light Mode

| Role | Token | Value | Notes |
|------|-------|-------|-------|
| Primary | `--md-sys-color-primary` | `#2C4C3B` | Hunter Green — brand anchor |
| On Primary | `--md-sys-color-on-primary` | `#FFFFFF` | |
| Primary Container | `--md-sys-color-primary-container` | `#E8F5E9` | Pale wash |
| Background | `--md-sys-color-background` | `#FDFBF7` | Alabaster |
| Surface | `--md-sys-color-surface` | `#F5F2EA` | Warm Clay |
| Surface Variant | `--md-sys-color-surface-variant` | `#EBE5DE` | |
| Surface Container (lowest→highest) | | `#FFFFFF` → `#D7D3C8` | 5-step depth scale |
| On Surface | `--md-sys-color-on-surface` | `#121714` | Deep Green-Black (never pure black) |
| On Surface Variant | `--md-sys-color-on-surface-variant` | `#49454E` | |
| Secondary | `--md-sys-color-secondary` | `#8C7E70` | Muted Gold/Bronze |
| Outline | `--md-sys-color-outline` | `#2d4e3c` | |
| Outline Variant | `--md-sys-color-outline-variant` | `#D7D3C8` | |
| Text Main | `--md-sys-color-text-main` | `#121714` | |
| Text Muted | `--md-sys-color-text-muted` | `#667f71` | |
| Text Heading | `--md-sys-color-text-heading` | `#2C4C3B` | Primary Green for headings |
| Inverse Surface | `--md-sys-color-inverse-surface` | `#121714` | For toasts/snackbars |

### Dark Mode

Dark mode is triggered by `@media (prefers-color-scheme: dark)` **and** `html.dark` class (manual toggle). Both must be kept in sync.

| Role | Token | Dark Value |
|------|-------|------------|
| Background | `--md-sys-color-background` | `#161C19` |
| Surface | `--md-sys-color-surface` | `#1E2622` |
| Surface Container (lowest→highest) | | `#121714` → `#3E4944` |
| On Surface | `--md-sys-color-on-surface` | `#F5F2EA` |
| Text Heading | `--md-sys-color-text-heading` | `--md-sys-color-on-background` |
| Primary | `--md-sys-color-primary` | `#2D4E3C` |

---

## Typography

### Typefaces

| Role | Family | Token |
|------|--------|-------|
| Display / Editorial Headings | Playfair Display (serif) | `--font-display`, `--font-serif` |
| Body / UI | DM Sans (geometric sans) | `--font-sans`, `--font-body` |

**Rule:** Headings always use Playfair Display. UI labels, body copy, and interactive elements always use DM Sans.

**Shadow DOM note:** Fonts loaded in the light DOM do NOT propagate into Shadow DOM. Web Components that use display fonts or icons must include the relevant `@import` in their `static styles`.

### Scale

| Tier | Token prefix | Size |
|------|-------------|------|
| Display Large | `--md-sys-typescale-display-large-*` | 72px / weight 600 |
| Display Medium | `--md-sys-typescale-display-medium-*` | 56px |
| Display Small | `--md-sys-typescale-display-small-*` | 40px |
| Headline Large | `--md-sys-typescale-headline-large-*` | 32px |
| Headline Medium | | 28px |
| Headline Small | | 24px |
| Title Large | `--md-sys-typescale-title-large-*` | 20px / Playfair |
| Title Medium | | 18px / DM Sans |
| Body Large | `--md-sys-typescale-body-large-*` | 18px / line-height 1.6 |
| Body Medium | | 16px |
| Label Large | `--md-sys-typescale-label-large-*` | 14px / ALL CAPS / tracking 0.15em |
| Label Medium | | 12px |

**Labels rule:** ALL CAPS with wide letter-spacing (0.05em–0.15em). Never title-case labels.

---

## Shape (Border Radius)

| Token | Value | Usage |
|-------|-------|-------|
| `--md-sys-shape-corner-full` | 9999px | Capsule buttons, chips |
| `--md-sys-shape-corner-large` | 32px | Large cards |
| `--md-sys-shape-corner-medium` | 16px | Cards, modals |
| `--md-sys-shape-corner-small` | 8px | Small elements |
| `--md-sys-shape-corner-xs` | 4px | Badges, tags |

**Rule:** Buttons are always capsule (`corner-full`). Cards are always `corner-medium` or larger. Never use `border-radius: 0` unless for a deliberate editorial edge.

---

## Spacing

### Layout (page-level)
| Token | Value |
|-------|-------|
| `--spacing-layout` | 120px (desktop page margins) |
| `--spacing-gap` | 64px (section gaps) |

### Component Scale (8px baseline grid)
| Token | Value |
|-------|-------|
| `--spacing-xxs` | 2px |
| `--spacing-xs` | 4px |
| `--spacing-sm` | 8px |
| `--spacing-md` | 16px |
| `--spacing-lg` | 24px |
| `--spacing-xl` | 32px |
| `--spacing-2xl` | 48px |
| `--spacing-3xl` | 64px |

---

## Motion

### Easing
| Token | Curve |
|-------|-------|
| `--md-sys-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--md-sys-motion-easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--md-sys-motion-easing-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| `--md-sys-motion-easing-emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` |

### Duration
Short: 50ms–200ms (`short1`–`short4`)
Medium: 250ms–400ms (`medium1`–`medium4`)
Long: 450ms–600ms (`long1`–`long4`)

---

## Interactive States

**Rule:** Never change background colors directly on hover. Always use a pseudo-element overlay at the correct opacity. This preserves the token cascade across themes.

| State | Token | Value |
|-------|-------|-------|
| Hover | `--md-sys-state-hover-opacity` | 0.08 |
| Focus | `--md-sys-state-focus-opacity` | 0.12 |
| Pressed | `--md-sys-state-pressed-opacity` | 0.12 |
| Dragged | `--md-sys-state-dragged-opacity` | 0.16 |
| Disabled | `--md-sys-state-disabled-opacity` | 0.38 |

---

## Component Architecture

This design system uses **Web Components** (LitElement / Lit 3.x), not React, not Tailwind.

- All components follow the `wy-*` naming convention
- Styles live in Shadow DOM via `static styles = css\`...\``
- CSS custom properties cascade into Shadow DOM from `:root`
- Tailwind classes and inline styles are **not used** — they bypass the token cascade
- `!important` is **forbidden**
- `::part()` is for exceptional theming only, never for structural layout

### Token Precedence (highest → lowest)
1. Consuming project `tokens.css`
2. **Design system `src/styles/tokens.css`** (canonical defaults)
3. Component fallback values in `src/components/wy-*.js`

**Before editing any component:** always check `tokens.css` first. If a component token exists there, update `tokens.css` — not the component — so the fix propagates to all consumers.

---

## Button System

| Variant | Background | Foreground | Shape |
|---------|-----------|-----------|-------|
| Primary (filled) | `--wy-button-primary-bg` = Hunter Green | White | Capsule |
| Secondary (tonal) | `--wy-button-secondary-bg` = Warm Clay | Hunter Green | Capsule |
| Outlined | Transparent | Hunter Green | Capsule |
| Text | Transparent | Hunter Green | Capsule |
| Icon (filled) | Hunter Green | White | Circle |

All buttons use `font-weight: 500`, letter-spacing `0.1em`, DM Sans.

---

## Reskinning the Design System

> **This section is guidance for AI agents handling a "reskin" or "rebrand" request.**

A reskin means changing the visual identity (colors, fonts, or both) while preserving all component behavior and architecture.

### The Single Rule

**All visual identity changes go to `src/styles/tokens.css` only.** Never edit individual component files for reskin purposes. The token cascade propagates changes to all 40+ components automatically.

### What to Change for a Color Reskin

1. **Replace the primary color family** — update `--md-sys-color-primary` and derive the container, tint, and text colors from the new hue
2. **Replace surface/background values** — the warm clay/alabaster palette comes from `--md-sys-color-background`, `--md-sys-color-surface`, and the container scale
3. **Update semantic text tokens** — `--md-sys-color-text-heading` should match or derive from the new primary
4. **Update all component tokens** that reference the old primary in `color-mix()` expressions — search for `--wy-button-primary-bg`, `--wy-controls-bar-bg`, `--wy-filter-chip-active-bg`, etc.
5. **Mirror changes in dark mode** — both `@media (prefers-color-scheme: dark)` and `html.dark :root` blocks must be updated

### What to Change for a Typography Reskin

1. Update `--font-display` and `--font-serif` to the new display/heading font
2. Update `--font-sans` and `--font-body` to the new body font
3. Update the `@import` at the top of `tokens.css` to load the new Google Fonts URLs
4. Update `@import` statements inside any **Web Component** that loads fonts explicitly in its `static styles` (search for `fonts.googleapis.com` in `src/components/`)

### What NOT to Do During a Reskin

- Do **not** hardcode hex values in component files
- Do **not** add `!important` to force new colors
- Do **not** create per-component or per-page overrides in consuming projects
- Do **not** use `::part()` to override colors
- Do **not** change `--md-sys-*` token names — they are the semantic API consumers depend on

### Verification After a Reskin

```bash
# Build and verify
npm run build

# Run visual QA against a consuming project
python3 skills/visual-qa/scripts/capture.py --url http://localhost:8000 --output /tmp/visual-qa

# Review both modes
open /tmp/visual-qa/light.png /tmp/visual-qa/dark.png
```

Check: WCAG contrast ratio ≥ 4.5:1 for all text. Check: dark mode surfaces remain dark (not inverted). Check: zero console errors.

### Deploy After a Reskin

```bash
./scripts/deploy.sh "Reskin: [description of new palette/fonts]"
./scripts/verify-deployment.sh
```

Then update cache-busting timestamps in any consuming project's `tokens.css` `@import` URLs.

---

## Using This File with Stitch

When using [Google Stitch](https://stitch.withgoogle.com) to ideate component refinements:

1. Upload this file (or a screenshot of the current component) as context
2. Iterate on the visual design using natural language
3. **Export screenshots only** — Stitch's HTML/CSS/Tailwind output is a reference, not production code
4. Translate the visual reference through the Component Adaptation Workflow (`workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md`)
5. The adaptation workflow enforces 100% token usage and runs automated Playwright verification

Stitch output will typically use hardcoded hex values and Tailwind classes. These must always be mapped back to design tokens before implementation.
