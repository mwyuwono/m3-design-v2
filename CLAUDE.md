# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📚 Comprehensive Documentation

**For complete design system documentation, see [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).**

This file (`CLAUDE.md`) contains workflow-specific guidance for AI agents. For comprehensive documentation including installation, architecture, critical gotchas, component development, integration patterns, and troubleshooting, refer to [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md), which serves as the single source of truth for all design system information.

## Communication Preferences

**Be concise.** Prefer brief, direct communication over verbose documentation.

- **Do NOT create markdown documentation files** unless explicitly requested
- **Do NOT write long summaries** after completing tasks
- **Do communicate directly** with short status updates
- **Do create documentation** only when user specifically asks for it
- **Do focus on action** over commentary

Example of preferred communication:
```
✅ "Component integrated. Tests passed. Deployed."
✅ "Build successful. CDN purged. Ready to use."
```

**Exception:** When user explicitly requests documentation ("write a summary", "document this"), provide comprehensive documentation as requested.

## Zero-Trust Verification Protocol

**Never announce success without verification.**

When implementing features or making changes:

1. **Verify Actual Rendered Values**
   - Use getComputedStyle() for actual values, not just CSS presence
   - Check dimensions > 0 (offsetWidth, offsetHeight)
   - Verify visibility (display not none, opacity > 0)
   - Measure alignment within 1px tolerance

2. **Test Interactive States by Triggering Them**
   - Don't assume hover works - trigger mouseenter and measure style changes
   - Focus elements and verify outline appears
   - Dispatch events and confirm handlers fire with correct detail
   - Before/after measurements required

3. **Console Hygiene**
   - Zero tolerance for errors (except favicon 404)
   - Any console error = FAIL immediately
   - Check Network tab for failed requests
   - Cache-bust verification URLs (?v=timestamp)

4. **Component Registration (Web Components)**
   - Verify customElements.get('wy-name') returns constructor (not undefined)
   - If undefined, registration failed (check for @import errors)
   - Test in consuming page, not just in isolation

5. **Failure Criteria (ANY = FAIL)**
   - Console errors or warnings
   - Padding/alignment off by > 1px
   - Element present but width/height = 0
   - Design tokens resolve to wrong values
   - Layout overflow (scrollWidth > clientWidth)
   - Missing interactive state styling
   - Events defined but don't fire

6. **Report Honestly**
   - Document failures immediately
   - Provide specific manual verification steps for non-programmable checks
   - Never claim PASS when tests actually FAIL
   - If unsure, measure and verify before announcing

Examples of premature announcements to avoid:
- "Component integrated successfully" (did you test it loads?)
- "All working" (did you verify events fire with correct detail?)
- "Deployed and ready" (did you check for console errors?)

Preferred verification-based communication:
- "Component loads, tested events fire, zero console errors"
- "Layout verified: alignment within 1px, no overflow"
- "Tests passed: color ΔE=0.00, states trigger correctly"

## Project Overview

M3 Design System v2 - A production-ready Web Component library built on Material Design 3 with Lit 3.x. The aesthetic is "Soft Modernism": organic M3 shapes (capsule buttons, rounded cards) paired with sharp editorial typography (Playfair Display) and a warm heritage color palette.


## Default Change Locus (Important)

**Unless the user explicitly asks otherwise, all component and styling changes must be made in this design system repository** so updates propagate to every consuming project.

- Do **not** implement per-page or per-app overrides in consuming projects unless explicitly requested.
- If a local override is unavoidable, call it out and confirm before proceeding.
- If the request mentions a consuming app, first verify whether the component is sourced from this design system and update it here.

## React Components vs Web Components Architecture

**CRITICAL:** This design system provides Web Components (`.js` files) that are consumed by React projects via wrappers.

**When making changes to shared components:**
- **Edit Web Components here** (`src/components/wy-*.js`) - Changes propagate to all consuming projects
- **Do NOT edit React wrappers** in consuming projects - They are thin wrappers that pass props/events

**How consuming projects use Web Components:**
1. Projects import Web Components via `npm link` or CDN
2. Projects create React wrappers (e.g., `LibraryHeaderWrapper`) that use `<wy-component-name>` syntax
3. Wrappers handle React-specific concerns (state, event listeners, refs)
4. Actual UI logic lives in Web Components (this repository)

**Example - Library Header:**
- Web Component: `m3-design-v2/src/components/wy-library-header.js` (this repo)
- React Wrapper: `plots/components/library-header-wrapper.tsx` (consuming project)
- When editing header UI: Edit the Web Component here, not the wrapper

**Legacy React Components:**
Some consuming projects may have legacy React components (e.g., `library-header.tsx`) that are not imported. These are unused and should not be edited. Always verify which component is actually used before making changes.

### Verification Checklist

Before making component changes:
- [ ] Confirm this is a shared component (used by multiple projects)
- [ ] Verify changes should propagate to all consumers
- [ ] Check if consuming projects have React wrappers (they handle React integration)
- [ ] Test changes in consuming projects after updating

## Component Adaptation Workflow (NEW - Jan 2026)

When adapting external components to the design system, use the **automated Component Adaptation Workflow** with Playwright verification.

**Quick Start:** [workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md](workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md) - Copy/paste prompt

**How it works:**
1. You provide: Screenshot + original code
2. Agent analyzes and maps to design tokens
3. **Playwright automatically verifies** quality (no hardcoded values, dark mode, layout, etc.)
4. You receive: Working component + test results + screenshots

**Key Benefits:**
- ✅ 100% design system token usage enforced
- ✅ Automated Playwright testing (no manual QA)
- ✅ Visual fidelity proven with screenshots
- ✅ Dark mode automatically tested
- ✅ Issues caught before delivery

**Testing Script:**
```bash
python3 skills/component-adaptation/test-component.py \
  --url http://localhost:5173/test.html \
  --selector wy-component-name \
  --output /tmp/component-test
```

**Complete Documentation:**
- [COMPONENT-ADAPTATION-SUMMARY.md](COMPONENT-ADAPTATION-SUMMARY.md) - Setup summary and how to use
- [COMPONENT-ADAPTATION-INDEX.md](COMPONENT-ADAPTATION-INDEX.md) - Documentation index
- [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md) - Full methodology
- [skills/component-adaptation/](skills/component-adaptation/) - Testing tools

## Commands

```bash
npm run dev      # Start Vite dev server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

**IMPORTANT: When committing changes, you MUST follow the [Commit & Deploy Workflow](#commit--deploy-workflow) to purge the jsDelivr CDN cache. Dependent projects will not receive updates without this step.**

## Visual QA Skill

This project includes a **visual-qa** skill for detecting visual issues (contrast problems, invisible elements, spacing issues) after CSS/component changes.

### Prerequisites

```bash
pip install playwright && playwright install chromium
```

### Usage

After making component or styling changes, test against a consuming project:

```bash
# Build the design system first
npm run build

# Start the consuming project's dev server (e.g., prompts-library)
cd /path/to/prompts-library && python3 -m http.server 8000 &

# Capture screenshots in light and dark mode
python3 skills/visual-qa/scripts/capture.py --url http://localhost:8000 --output /tmp/visual-qa

# Review the screenshots
open /tmp/visual-qa/light.png /tmp/visual-qa/dark.png
```

### Automatic Reminder

A Claude Code hook is configured globally to remind you to run `/visual-qa` after editing CSS or JS files.

### Investigating Issues

```bash
# Inspect an element's computed styles in dark mode
python3 skills/visual-qa/scripts/inspect_element.py --url http://localhost:8000 --selector "wy-controls-bar" --shadow-selector ".search-input" --color-scheme dark

# Check contrast ratio
python3 skills/visual-qa/scripts/inspect_element.py --url http://localhost:8000 --selector ".search-input" --contrast
```

See [skills/visual-qa/SKILL.md](skills/visual-qa/SKILL.md) for the complete workflow.

## Commit & Deploy Workflow

This design system is consumed by dependent projects via jsDelivr CDN. **After every commit, you must purge the CDN cache.**

**CRITICAL CDN Cache Management:** After pushing changes to m3-design-v2, always wait 2-3 minutes before purging jsDelivr CDN (purges are throttled to max 10/hour per file), and if throttled, temporarily pin consuming projects to the commit hash (e.g., `@abc1234`) with a TODO to revert to `@main` within 24 hours, rather than repeatedly purging which will fail.

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

# 4. Verify all consuming projects (optional but recommended)
./skills/design-system-sync/verify-projects.sh
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
- **prompts-library** - https://p.weaver-yuwono.com (uses CDN imports)
- **plots** - `/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/plots` (uses `npm link` for local development, installed January 2026)
- **Weaver-Yuwono-Home-Page** - https://weaver-yuwono.com (uses CDN imports, migrated January 2026)

**prompts-library** imports tokens via CDN:
```css
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css');
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css');
```

**plots** imports tokens via npm link:
```css
@import "./styles/tokens-no-fonts.css"; /* Generated from node_modules/wy-family-office/src/styles/tokens.css */
```

Web components via CDN (for prompts-library):
```javascript
import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';
```

jsDelivr caches for up to 24 hours - without purging, changes won't propagate immediately.

### Verify All Projects After Changes

After committing and purging CDN cache, verify all consuming projects are properly integrated:

```bash
./skills/design-system-sync/verify-projects.sh
```

This script checks:
- Integration status (CDN, npm link, or not integrated)
- Local token definitions that should use design system
- Local component overrides
- Overall health status

For complete workflow details, see [skills/design-system-sync/SKILL.md](skills/design-system-sync/SKILL.md).

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

**Layout Spacing:**
- `--spacing-layout`: 120px (desktop page margins)
- `--spacing-gap`: 64px (section gaps)

**Component Spacing Scale (8px baseline grid):**
- `--spacing-xxs`: 2px (0.125rem)
- `--spacing-xs`: 4px (0.25rem)
- `--spacing-sm`: 8px (0.5rem)
- `--spacing-md`: 16px (1rem)
- `--spacing-lg`: 24px (1.5rem)
- `--spacing-xl`: 32px (2rem)
- `--spacing-2xl`: 48px (3rem)
- `--spacing-3xl`: 64px (4rem)

**Shape (Border Radius):**
- `--md-sys-shape-corner-xs`: 4px
- `--md-sys-shape-corner-small`: 8px
- `--md-sys-shape-corner-medium`: 16px (cards)
- `--md-sys-shape-corner-large`: 32px (large cards)
- `--md-sys-shape-corner-full`: 9999px (capsule buttons)

### Motion Tokens

**Easing Curves:**
- `--md-sys-motion-easing-standard`: cubic-bezier(0.2, 0, 0, 1)
- `--md-sys-motion-easing-emphasized`: cubic-bezier(0.2, 0, 0, 1)
- `--md-sys-motion-easing-emphasized-decelerate`: cubic-bezier(0.05, 0.7, 0.1, 1)
- `--md-sys-motion-easing-emphasized-accelerate`: cubic-bezier(0.3, 0, 0.8, 0.15)
- `--md-sys-motion-easing-legacy`: cubic-bezier(0.4, 0, 0.2, 1)
- `--md-sys-motion-easing-spring`: cubic-bezier(0.34, 1.56, 0.64, 1)

**Duration Scale:**
- Short: `--md-sys-motion-duration-short1` (50ms) through `short4` (200ms)
- Medium: `--md-sys-motion-duration-medium1` (250ms) through `medium4` (400ms)
- Long: `--md-sys-motion-duration-long1` (450ms) through `long4` (600ms)

### State Tokens

**Opacity values for Material Design 3 state layers:**
- `--md-sys-state-hover-opacity`: 0.08
- `--md-sys-state-focus-opacity`: 0.12
- `--md-sys-state-pressed-opacity`: 0.12
- `--md-sys-state-dragged-opacity`: 0.16
- `--md-sys-state-disabled-opacity`: 0.38
- `--md-sys-state-disabled-container-opacity`: 0.12

**Usage:** Always use state tokens with pseudo-element overlays for interactive states. Never change background colors directly on hover.

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

### CSS Quality Standards

#### CRITICAL: NO !important Declarations
- **NEVER use `!important`** in CSS except for true utility classes that must override everything
- If specificity conflicts arise, resolve them by:
  - Increasing selector specificity (e.g., adding a class or parent selector)
  - Reordering rules in the source file
  - Using attribute selectors `[hidden]` for utilities
- `!important` breaks the cascade and makes maintenance extremely difficult

## Component Categories

**Forms**: `wy-form-field`, `wy-tag-chip`, `wy-filter-chip`, `wy-tag-input`, `wy-category-select`, `wy-selection-card`

**Layout**: `wy-app-bar`, `wy-library-header`, `wy-controls-bar`, `wy-tabs`, `wy-modal`, `wy-prompt-modal`, `wy-export-modal`

**Cards**: `wy-profile-card`, `wy-bio-card`, `wy-work-card`, `wy-plot-card`, `wy-prompt-card`, `wy-metric-card`, `wy-allocation-card`, `wy-insight-card`

**Specialized**: `wy-works-grid`, `wy-project-list`, `wy-backup-status`, `wy-toast`

See [COMPONENTS.md](COMPONENTS.md) for full API documentation.
