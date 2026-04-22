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

### Documentation Hygiene

**Clean up temporary documentation at the end of exercises.**

- Delete plans, tests, and other temporary `.md` files when work is complete
- When marking a plan "done" or completing a test, remove the documentation created along the way
- Don't create detailed summaries upon completion unless they provide information not already in the code or elsewhere
- Resist the urge to document what the code already shows clearly

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

M3 Design System v2 - A production-ready Web Component library built on Lit 3.x. The aesthetic is **"The Nineteenth"**: editorial minimalism with a warm cream/ink palette, flat shapes (zero border-radius on containers), Playfair Display serif headings, Inter sans-serif body, and simplified motion. Dark mode is not supported — light only.

The design system was migrated from Material Design 3 ("Soft Modernism") to "The Nineteenth" in April 2026. All `--md-sys-*` token names are kept as legacy aliases pointing to the new `--paper`/`--ink` token system for backward compatibility.


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

## CRITICAL: Audit Component Tokens Before Making Changes

**ALWAYS check `src/styles/tokens.css` for component-specific tokens before editing components.**

Token precedence chain (highest to lowest):
1. Consuming project `tokens.css` (prompt-library, plots, etc.)
2. **Design system `src/styles/tokens.css`** (THIS FILE - sets defaults for all consumers)
3. Component defaults in `src/components/*.js`

**Before editing a component, audit tokens.css:**

```bash
# Check if component has global tokens that might override your changes
grep -n "wy-{component-name}" src/styles/tokens.css

# Example: Before editing wy-filter-chip.js
grep -n "wy-filter-chip" src/styles/tokens.css
```

**If component tokens exist in tokens.css:**
- ✅ Update tokens.css FIRST (sets correct defaults for all consumers)
- ✅ Then update component.js if needed (for structure/behavior)
- ❌ Never make component changes that conflict with tokens.css defaults

**Common mistake pattern:**
1. Edit component to use `var(--md-sys-color-surface)` (white)
2. But tokens.css sets `--wy-component-bg: var(--md-sys-color-surface-container-high)` (beige)
3. Result: Component shows beige, not white (tokens.css wins)

**Solution:**
1. Update tokens.css to set `--wy-component-bg: var(--md-sys-color-surface)`
2. Deploy - now ALL consuming projects get white by default
3. Consuming projects can still override if needed

**Why this matters:** tokens.css sets defaults for ALL consuming projects. Getting these right prevents cascading override issues.

## Commit & Deploy Workflow

This design system is consumed by dependent projects. **Always use the automated deployment script.**

### Bundle entry check

When changing `src/web-components.js` or how consumers load the design system: verify every `wy-*` custom element used by any consumer that loads only `dist/web-components.js` is imported in `src/web-components.js`. Missing import → unregistered element → broken or missing UI. Quick check: grep each consumer for `<wy-` tag names and cross-check the bundle entry imports.

### Automated Deployment (REQUIRED)

```bash
./scripts/deploy.sh "Description of changes"
./scripts/verify-deployment.sh
# Then hard refresh browser (Cmd+Shift+R)
```

The script automatically:
1. Builds `dist/web-components.js`
2. Commits both `src/` and `dist/` changes
3. Pushes to GitHub
4. Captures commit hash for CDN pinning
5. Copies bundle to `prompt-library`
6. Updates `prompt-library/admin.html` (cache-bust) and `components/index.js` (commit hash)
7. Commits `prompt-library` changes

**Why commit hash pinning:** jsDelivr's `@main` serves inconsistent stale content across edge servers. Commit hashes are immutable and immediately available. See [prompt-library/docs/css-changes-not-appearing-postmortem.md](../prompt-library/docs/css-changes-not-appearing-postmortem.md) for the full investigation.

### CRITICAL: Consuming Projects Need Cache-Busting Updates

**After deployment, ALWAYS check if consuming projects need cache-busting parameter updates.**

The `deploy.sh` script auto-updates:
- ✅ Web component commit hash (`@abc1234`) in `components/index.js`
- ✅ Admin HTML cache-busting (`?v=timestamp`) in `admin.html`

**But it does NOT auto-update:**
- ❌ CSS token cache-busting parameters in `tokens.css`

**Manual check required after token/style changes:**

1. Check `prompt-library/tokens.css` lines 14, 17:
   ```css
   @import url('...tokens.css?v=YYYYMMDD-HHMM');
   @import url('...main.css?v=YYYYMMDD-HHMM');
   ```

2. If timestamp is old, update to current time

3. Commit the change to prompt-library

**Why:** CSS tokens use `@main` which is CDN-cached. Without cache-busting updates, consuming projects will load stale tokens even after successful deployment and CDN purge.

### Dependent Projects

| Project | Integration | Notes |
|---------|-------------|-------|
| prompt-library | CDN (commit hash) + local bundle | Auto-updated by deploy.sh |
| plots | npm link | Live updates, no action needed |
| Weaver-Yuwono-Home-Page | CDN | Update commit hash manually if needed |

### Troubleshooting

If changes don't appear after deployment:
1. Run `./scripts/verify-deployment.sh` - check all tests pass
2. Hard refresh browser (`Cmd+Shift+R`)
3. Check browser DevTools → Network → verify correct bundle is loading
4. See [prompt-library/docs/css-changes-not-appearing-postmortem.md](../prompt-library/docs/css-changes-not-appearing-postmortem.md) for detailed troubleshooting

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
- **Headings/Display**: Playfair Display (serif) — token: `--ff-serif`
- **Body/UI**: Inter (sans-serif) — token: `--ff-sans`
- **Monospace**: SF Mono / Menlo — token: `--ff-mono`
- **Labels**: ALL CAPS with `letter-spacing: var(--tr-eyebrow)` (0.18em)
- Legacy aliases `--font-serif`, `--font-sans`, `--font-body` resolve to the above

### Colors (Always use tokens, never hardcode)

**Canonical new tokens (prefer these):**
```css
--paper:      #FFFAF5;   /* primary background */
--paper-deep: #F4EFEB;   /* card surfaces, section bands */
--paper-edge: #E8E2DA;   /* hairline rules, borders */
--ink:        #282828;   /* body text, headings, primary actions */
--ink-mute:   #868685;   /* secondary copy, metadata */
--ink-soft:   #B8B3AC;   /* captions, disabled */
--white:      #FFFFFF;   /* form inputs only */
--ok:         #28C101;   /* success — use sparingly */
--err:        #FF0101;   /* error — use sparingly */
```

**Semantic aliases (also valid):**
```css
--bg:       var(--paper)
--bg-alt:   var(--paper-deep)
--fg:       var(--ink)
--fg-muted: var(--ink-mute)
--rule:     var(--ink)        /* authoritative 1px line */
--rule-soft:var(--paper-edge) /* secondary dividers */
```

**Legacy `--md-sys-*` names are aliased** and still resolve correctly, but prefer the new names for any new code.

### Spacing & Shape

**Spacing — 4px base grid:**
- `--s-1`: 4px | `--s-2`: 8px | `--s-3`: 12px | `--s-4`: 16px
- `--s-5`: 24px | `--s-6`: 32px | `--s-7`: 48px | `--s-8`: 64px
- `--s-9`: 96px | `--s-10`: 128px
- Legacy `--spacing-sm/md/lg/xl` aliases also resolve correctly

**Shape (Border Radius) — flat by default:**
- `--radius-0`: 0 (default — nothing is rounded)
- `--radius-1`: 2px (rare — small badges only)
- `--radius-pill`: 999px (chips and catalogue tags only)
- Legacy `--md-sys-shape-corner-*` aliases resolve: full→pill, large/medium→radius-1, small/xs→radius-0

**No hover lift transforms.** Cards and buttons do not `translateY` on hover.
**No elevation shadows** on cards. Only `--shadow-modal` (0 12px 40px rgba(40,40,40,0.08)) on modals.

### Motion Tokens
- `--ease`: cubic-bezier(0.2, 0.6, 0.2, 1)
- `--ease-in-out`: cubic-bezier(0.6, 0, 0.4, 1)
- `--dur-1`: 150ms (hover) | `--dur-2`: 350ms (reveal) | `--dur-3`: 500ms | `--dur-4`: 800ms
- Legacy `--md-sys-motion-*` aliases resolve to the above

### State Tokens (unchanged)
- `--md-sys-state-hover-opacity`: 0.08
- `--md-sys-state-focus-opacity`: 0.12
- `--md-sys-state-pressed-opacity`: 0.12
- `--md-sys-state-disabled-opacity`: 0.38

**Usage:** Use pseudo-element overlays with state opacity for hover/focus. Never change background directly on hover.

### Dark Mode
**Dark mode is removed.** Do not add `@media (prefers-color-scheme: dark)` or `html.dark` blocks. The system is light-only.

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
- `wy-prompt-modal` - Playfair Display + Inter
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

### Dark mode and token resolution
The design system is light-only — no dark mode tokens exist. CSS variable references will always resolve to the light palette. Do not add dark mode media queries.

### CRITICAL: Avoid ::part() for Structural Layout (Anti-Pattern)

**::part() is for EXCEPTIONAL theming needs ONLY, never for structural layout.**

**FORBIDDEN - Using ::part() for layout:**
```css
/* ❌ WRONG - Never override structural layout with ::part() */
.my-component::part(container) {
    padding: 24px;           /* ❌ Use CSS custom property */
    max-width: 1200px;       /* ❌ Use CSS custom property */
    gap: 16px;               /* ❌ Use CSS custom property */
}

.my-component[scrolled]::part(container) {
    padding: 8px;            /* ❌ Should be component default */
}

@media (max-width: 768px) {
    .my-component::part(container) {
        padding: 12px;       /* ❌ Should be component responsive CSS */
    }
}
```

**CORRECT - Make component configurable:**
```javascript
// In component: Add CSS custom properties
:host {
    --my-component-padding-desktop: var(--spacing-xl, 32px);
    --my-component-padding-tablet: var(--spacing-lg, 24px);
    --my-component-padding-mobile: var(--spacing-md, 16px);
}

.container {
    padding: 0 var(--my-component-padding-desktop);
}

@media (min-width: 768px) and (max-width: 1023px) {
    .container {
        padding: 0 var(--my-component-padding-tablet);
    }
}
```

```css
/* Consumer configures via custom properties */
.my-component {
    --my-component-padding-desktop: 48px;  /* ✅ Configuration, not override */
    --my-component-padding-tablet: 32px;
}
```

**When ::part() IS appropriate (rare):**
- Exceptional theming that can't be achieved with CSS custom properties
- One-off visual tweaks for specific contexts (border-radius on a single page)
- Accessibility overrides when custom properties aren't flexible enough

**Design principle:** If multiple consuming projects need the same `::part()` override, the component MUST be refactored to support that use case via CSS custom properties instead.

### Exposing parts for exceptional needs only
Expose `part` attributes sparingly, only when truly needed for exceptional styling:
```javascript
// Only expose if consumers genuinely need direct access
html`<div class="container" part="container">...</div>`
```

## CSS Editing

When editing CSS, reference the relevant file:
- Design tokens: [tokens.css](src/styles/tokens.css)
- Global styles: [main.css](src/styles/main.css)
- Component styles: Located within each `src/components/wy-*.js` file in `static styles`

### Token Precedence & Override Prevention

**Understanding the cascade (highest to lowest priority):**
1. Consuming project `tokens.css` (prompt-library, plots, etc.)
2. **Design system `src/styles/tokens.css`** (this file)
3. Component defaults in `src/components/*.js`

**Before editing component defaults, check if tokens.css already defines them:**

```bash
# Example: Before editing wy-filter-chip.js defaults
grep -A3 "wy-filter-chip" src/styles/tokens.css

# If component tokens exist, update tokens.css FIRST
# This ensures all consuming projects get correct defaults
```

**Common mistake:**
```javascript
// ❌ Component sets: background-color: var(--wy-chip-bg, #FFFFFF)
// But tokens.css has: --wy-chip-bg: #EBE5DE
// Result: All projects get beige, not white
```

**Correct approach:**
```css
/* ✅ Fix tokens.css first */
--wy-chip-bg: var(--md-sys-color-surface-container-lowest); /* White */

/* Then component fallback works correctly */
background-color: var(--wy-chip-bg, var(--md-sys-color-surface));
```

**Why this matters:** Consuming projects import tokens.css globally. If tokens define wrong defaults, ALL projects inherit the bug, and component-level fixes won't help.

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
