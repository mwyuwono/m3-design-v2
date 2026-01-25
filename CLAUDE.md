# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

M3 Design System v2 - A production-ready Web Component library built on Material Design 3 with Lit 3.x. The aesthetic is "Soft Modernism": organic M3 shapes (capsule buttons, rounded cards) paired with sharp editorial typography (Playfair Display) and a warm heritage color palette.

## Commands

```bash
npm run dev      # Start Vite dev server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

**IMPORTANT: When committing changes, you MUST follow the [Commit & Deploy Workflow](#commit--deploy-workflow) to purge the jsDelivr CDN cache. Dependent projects will not receive updates without this step.**

## Commit & Deploy Workflow

This design system is consumed by dependent projects via jsDelivr CDN. **After every commit, you must purge the CDN cache.**

### Standard Commit Process

```bash
# 1. Stage and commit
git add .
git commit -m "Description of changes

Co-Authored-By: Claude <noreply@anthropic.com>"

# 2. Push to main
git push origin main

# 3. Purge jsDelivr cache (REQUIRED for immediate propagation)
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```

### Quick One-Liner

```bash
git commit -m "Your message" && git push origin main && \
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done
```

### Purging Multiple Files

```bash
# Full purge (run after any change)
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```

Or individually:
```bash
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css"
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css"
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js"
```

Verify purge succeeded: response should contain `"status":"finished"`.

### Dependent Projects

Changes affect these projects (hard refresh with Cmd+Shift+R after purging):
- **prompts-library** - https://p.weaver-yuwono.com
- **plots** - `/Users/mwy/Library/Mobile Documents/com~apple~CloudDocs/Projects/plots-library`

These import tokens via:
```css
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css');
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css');
```

Web components via:
```javascript
import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';
```

jsDelivr caches for up to 24 hours - without purging, changes won't propagate immediately.

### CDN Staleness Fallback (Consumers)

If `@main` is still stale after a purge, consumers may temporarily pin to a commit hash to unblock production:
```javascript
// TODO: revert to @main once CDN serves the updated bundle
import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@<commit>/dist/web-components.js';
```

Revert the pin once `@main` serves the expected snippet.

## Architecture

### Component Structure
All 25 custom components follow the `wy-*` naming convention and use LitElement:

```javascript
import { LitElement, html, css } from 'lit';

export class WyComponentName extends LitElement {
  static properties = { /* reactive properties */ };
  static styles = css`/* Shadow DOM scoped styles */`;
  render() { return html`/* template */`; }
}
customElements.define('wy-component-name', WyComponentName);
```

Components are in `src/components/` and registered in `src/main.js`.

### Key Files
- `src/styles/tokens.css` - Design tokens (colors, fonts, spacing, shapes)
- `src/styles/main.css` - Global styles and utility classes
- `design-system.html` - Living style guide with interactive demos
- `m3-requirements.md` - Full design philosophy and rules

### Data Flow
JSON files in `src/data/` drive page content. `main.js` reads JSON and dynamically creates components based on URL query parameters.

## Design System Rules

### Typography
- **Headings**: Playfair Display (high-contrast Didone serif)
- **Body/UI**: DM Sans (geometric sans-serif)
- **Labels**: ALL CAPS with wide letter-spacing (0.05em-0.1em)

### Colors (Always use tokens, never hardcode)
```css
--md-sys-color-primary: #2C4C3B;        /* Hunter Green */
--md-sys-color-background: #FDFBF7;     /* Alabaster */
--md-sys-color-surface: #F5F2EA;        /* Warm Clay */
--md-sys-color-on-surface: #121714;     /* Never pure black */
```

### Spacing & Shape
- Layout margins: 120px desktop, 24px mobile
- Section gaps: 64px (generous, not dense M3 defaults)
- Card radius: 16px medium, 32px large
- Buttons: Full capsule (9999px)
- Prefer subtle borders over heavy shadows

## Shadow DOM Font Loading

**CRITICAL: Fonts loaded in the light DOM do NOT propagate into Shadow DOM.** Components must explicitly import any fonts they use.

### Required Font Imports

**Playfair Display** (for headings/display text):
```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

  .element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

**Material Symbols** (for icons):
```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
  }
`;
```

### Components with Font Imports

The following components already include necessary font imports:
- `wy-modal` - Playfair Display
- `wy-prompt-modal` - Playfair Display + DM Sans
- `wy-export-modal` - Playfair Display
- `wy-controls-bar` - Material Symbols

**When creating new components:** If the component uses icons (`<span class="material-symbols-outlined">`) or display fonts, add the appropriate `@import` to the component's `static styles`.

## CSS Custom Property Inheritance in Shadow DOM

**CRITICAL: CSS variables have limited inheritance through nested shadow DOM boundaries.**

### How it works
- CSS custom properties set on `:root` cascade into a component's shadow DOM
- They also cascade to child elements inside that shadow DOM
- **BUT** they do NOT automatically cascade into nested custom elements (component B inside component A's shadow DOM)

### Example: `wy-controls-bar` contains `wy-filter-chip`
```
Light DOM
└── wy-controls-bar (shadow DOM)
    └── wy-filter-chip (its own shadow DOM) ← variables from :root don't reach here directly
```

### Solution for consuming projects
Set variables on the parent component's host element - they cascade to immediate shadow children:
```css
/* This works - set on the outer component's host */
.controls-bar {
    --wy-filter-chip-active-bg: #E8F5E9;
}
```

### When using `prefers-color-scheme` tokens
If the consuming app is light-theme-only but the design system has dark mode overrides, use explicit hex values instead of `var()` references to avoid dark mode interference:
```css
/* Bad - may resolve to dark mode value if user prefers dark */
--wy-filter-chip-active-bg: var(--md-sys-color-primary-container);

/* Good - explicit value for light-theme-only apps */
--wy-filter-chip-active-bg: #E8F5E9;
```

### Exposing parts for direct styling
Components should expose key internal elements via `part` attribute for consumers who need direct style control:
```javascript
// In component template
html`<div class="container" part="container">...</div>`
```
```css
/* Consumer can then style directly */
my-component::part(container) {
    padding: 24px;
}
```

## CSS Editing

When editing CSS, reference the relevant file:
- Design tokens: [tokens.css](src/styles/tokens.css)
- Global styles: [main.css](src/styles/main.css)
- Component styles: Located within each `src/components/wy-*.js` file in `static styles`

## Component Categories

**Forms**: `wy-form-field`, `wy-tag-chip`, `wy-filter-chip`, `wy-tag-input`, `wy-category-select`, `wy-selection-card`

**Layout**: `wy-app-bar`, `wy-library-header`, `wy-controls-bar`, `wy-tabs`, `wy-modal`, `wy-prompt-modal`, `wy-export-modal`

**Cards**: `wy-profile-card`, `wy-bio-card`, `wy-work-card`, `wy-plot-card`, `wy-prompt-card`, `wy-metric-card`, `wy-allocation-card`, `wy-insight-card`

**Specialized**: `wy-works-grid`, `wy-project-list`, `wy-backup-status`, `wy-toast`

See [COMPONENTS.md](COMPONENTS.md) for full API documentation.
