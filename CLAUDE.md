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
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/m3-tokens.css"
```

### Quick One-Liner

```bash
git commit -m "Your message" && git push origin main && curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/m3-tokens.css"
```

### Purging Multiple Files

```bash
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/m3-tokens.css"
curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/web-components.js"
```

Verify purge succeeded: response should contain `"status":"ok"`.

### Dependent Projects

Changes affect these projects (hard refresh with Cmd+Shift+R after purging):
- **prompts-library** - https://p.weaver-yuwono.com
- **plots** - `/Users/mwy/Library/Mobile Documents/com~apple~CloudDocs/Projects/plots-library`

These import tokens via:
```css
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/m3-tokens.css');
```

jsDelivr caches for up to 24 hours - without purging, changes won't propagate immediately.

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

Components with Shadow DOM require explicit font imports in their styles:

```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

  .element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

This is already implemented in modal components but must be added to any new Shadow DOM component using Playfair Display.

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
