# Weaver-Yuwono M3 Design System

**Single Source of Truth** | Version 1.0 | Last Updated: January 2026

A production-ready, modular design system built on Material Design 3, featuring custom Web Components and a distinctive "Soft Modernism" aesthetic. Designed for high-end editorial interfaces with organic shapes and disciplined typography.

---

## 🚨 CRITICAL GOTCHAS (Read First)

### 1. CSS Custom Property Inheritance in Nested Shadow DOM

**Problem:** CSS variables from `:root` do NOT automatically cascade through nested shadow DOM boundaries. If Component A contains Component B inside its shadow DOM, variables set on `:root` won't reach Component B.

**Example:**
```
Light DOM
└── wy-library-header (shadow DOM)
    └── wy-icon-button (its own shadow DOM) ← variables from :root don't reach here directly
```

**Solution:** Always provide fallback values in component styles:

```css
/* ALWAYS use this pattern for nested shadow DOM components */
.button.variant-filled {
  background-color: var(--wy-icon-button-filled-bg, var(--md-sys-color-primary, #2C4C3B));
  color: var(--wy-icon-button-filled-fg, var(--md-sys-color-on-primary, #FFFFFF));
}
```

**Pattern:** `var(--component-specific-token, var(--design-system-token, #hex-fallback))`

**When to use:**
- Components that are nested inside other components' shadow DOM
- Components that may be used in isolation without design system tokens loaded
- Any component where CSS variables are critical for rendering

**For consuming projects:** Set variables on the parent component's host element - they cascade to immediate shadow children:
```css
/* This works - set on the outer component's host */
.controls-bar {
  --wy-filter-chip-active-bg: #E8F5E9;
}
```

**When using `prefers-color-scheme` tokens:** If the consuming app is light-theme-only but the design system has dark mode overrides, use explicit hex values instead of `var()` references to avoid dark mode interference:
```css
/* Bad - may resolve to dark mode value if user prefers dark */
--wy-filter-chip-active-bg: var(--md-sys-color-primary-container);

/* Good - explicit value for light-theme-only apps */
--wy-filter-chip-active-bg: #E8F5E9;
```

**Exposing parts for direct styling:** Components should expose key internal elements via `part` attribute for consumers who need direct style control:
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

**Reference:** See `src/components/wy-icon-button.js` lines 100-108 for implementation example.

---

### 2. Shadow DOM Font Loading

**Problem:** Fonts loaded in the light DOM (via `<link>` tags) do NOT propagate into Shadow DOM. Components must explicitly import fonts they use.

**Solution:** Import fonts directly in component's `static styles`:

```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  .element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

**Components that already include fonts:**
- `wy-modal` - Playfair Display
- `wy-prompt-modal` - Playfair Display + DM Sans
- `wy-export-modal` - Playfair Display
- `wy-controls-bar` - Material Symbols

**When creating new components:** If the component uses icons (`<span class="material-symbols-outlined">`) or display fonts, add the appropriate `@import` to the component's `static styles`.

---

### 3. React Components vs Web Components Architecture

**CRITICAL:** This design system provides Web Components (`.js` files) that are consumed by React projects via wrappers.

**When making changes to shared components:**
- ✅ **Edit Web Components here** (`src/components/wy-*.js`) - Changes propagate to all consuming projects
- ❌ **Do NOT edit React wrappers** in consuming projects - They are thin wrappers that pass props/events

**How consuming projects use Web Components:**
1. Projects import Web Components via `npm link` or CDN
2. Projects create React wrappers (e.g., `LibraryHeaderWrapper`) that use `<wy-component-name>` syntax
3. Wrappers handle React-specific concerns (state, event listeners, refs)
4. Actual UI logic lives in Web Components (this repository)

**Example - Library Header:**
- Web Component: `m3-design-v2/src/components/wy-library-header.js` (this repo)
- React Wrapper: `plots/components/library-header-wrapper.tsx` (consuming project)
- When editing header UI: Edit the Web Component here, not the wrapper

**Verification Checklist:**
Before making component changes:
- [ ] Confirm this is a shared component (used by multiple projects)
- [ ] Verify changes should propagate to all consumers
- [ ] Check if consuming projects have React wrappers (they handle React integration)
- [ ] Test changes in consuming projects after updating

---

### 4. CDN Cache Purging (Required After Every Commit)

**Problem:** jsDelivr aggressively caches content. Without purging, changes won't propagate to consuming projects for up to 24 hours.

**Solution:** After EVERY commit, run the purge commands:

```bash
# Full purge (run after any change)
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```

**Quick One-Liner:**
```bash
git commit -m "Your message" && git push origin main && \
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done
```

**Verify purge succeeded:** Response should contain `"status":"finished"`.

**Dependent Projects (hard refresh with Cmd+Shift+R after purging):**
- **prompts-library** - https://p.weaver-yuwono.com (uses CDN imports)
- **plots** - Uses `npm link` for local development
- **Weaver-Yuwono-Home-Page** - https://weaver-yuwono.com (uses CDN imports)

---

## Quick Start

### Installation

```bash
# Clone or copy the design system
git clone https://github.com/mwyuwono/m3-design-v2.git
cd m3-design-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

The design system will be available at `http://localhost:5173`

### Basic Usage

**Import in HTML:**
```html
<script type="module" src="/src/main.js"></script>
```

**Use components:**
```html
<wy-modal open heading="Export Configuration">
  <wy-form-field label="File Name">
    <input type="text" placeholder="my-export.svg">
  </wy-form-field>
  
  <div slot="actions">
    <md-text-button>Cancel</md-text-button>
    <md-filled-button>Export</md-filled-button>
  </div>
</wy-modal>
```

**Visual Reference:** Open `design-system.html` in your dev server for interactive component previews.

---

## Architecture Overview

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

### Project Structure

```
m3-design-v2/
├── src/
│   ├── components/          # Custom Web Components (wy-*)
│   │   ├── wy-modal.js
│   │   ├── wy-prompt-modal.js
│   │   ├── wy-form-field.js
│   │   └── ...
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colors, fonts, spacing)
│   │   └── main.css         # Global styles and utilities
│   ├── data/                # Sample JSON data
│   └── main.js              # Component registration
├── design-system.html       # Living style guide
├── index.html               # Landing page example
└── docs/                    # Additional documentation
```

### Data Flow

JSON files in `src/data/` drive page content. `main.js` reads JSON and dynamically creates components based on URL query parameters.

---

## Design Philosophy: Soft Modernism

The system balances modernist precision with organic warmth, creating interfaces that feel like premium architectural publications rather than typical web applications.

### Visual Identity

- **Typography**: 
  - `Playfair Display` (Serif) - Editorial headings with high contrast
  - `DM Sans` (Sans) - UI elements and body text
  - Wide letter-spacing on labels for architectural feel

- **Color Palette**:
  - **Hunter Green** (`#2C4C3B`) - Primary brand color
  - **Alabaster** (`#FDFBF7`) - Background foundation
  - **Warm Clay** (`#F5F2EA`) - Surface tones
  - **Muted Bronze** (`#8C7E70`) - Secondary accents

- **Form Language**:
  - Capsule buttons (`border-radius: 9999px`)
  - Rounded cards (`16px` - `32px` radius)
  - Generous spacing (48px - 64px between sections)
  - Subtle borders over heavy shadows

---

## Design System Rules

### Typography

- **Headings**: Playfair Display (high-contrast Didone serif)
- **Body/UI**: DM Sans (geometric sans-serif)
- **Labels**: ALL CAPS with wide letter-spacing (0.05em-0.1em)

**Type Scale:**

| Role | Font Family | Weight | Size (rem) | Letter Spacing | Case |
| --- | --- | --- | --- | --- | --- |
| Display Large | Playfair Display | Regular (400) | 4.5 | -0.02em | Sentence |
| Headline Medium | Playfair Display | Medium (500) | 2.5 | 0em | Sentence |
| Title Medium | Playfair Display | Regular (400) | 1.5 | 0em | Sentence |
| Body Large | DM Sans | Regular (400) | 1.125 | 0.01em | Sentence |
| Label/Overline | DM Sans | Medium (500) | 0.875 | **0.1em** | **ALL CAPS** |
| Button Text | DM Sans | Medium (500) | 1.0 | 0.05em | Sentence |

### Colors (Always use tokens, never hardcode)

```css
/* Primary Colors */
--md-sys-color-primary: #2C4C3B;           /* Hunter Green */
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #E8F5E9;

/* Surface Colors */
--md-sys-color-background: #FDFBF7;        /* Alabaster */
--md-sys-color-surface: #F5F2EA;           /* Warm Clay */
--md-sys-color-on-surface: #121714;         /* Never pure black */

/* Container Tokens */
--md-sys-color-surface-container-low: #FDFBF7;
--md-sys-color-surface-container: #F5F2EA;
--md-sys-color-surface-container-high: #EBE5DE;
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

---

## Component Development

### Creating New Components

**Pattern:**
```javascript
import { LitElement, html, css } from 'lit';

export class WyComponentName extends LitElement {
  static properties = {
    // Define reactive properties
    label: { type: String },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = css`
    /* Import fonts if needed */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
    
    :host {
      display: block;
    }
    
    /* Use design tokens, never hardcode */
    .element {
      color: var(--md-sys-color-on-surface);
      padding: var(--spacing-md);
      border-radius: var(--md-sys-shape-corner-medium);
    }
    
    /* State layers for interactive elements */
    .button {
      position: relative;
      overflow: hidden;
    }
    
    .button::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }
    
    .button:hover:not(:disabled)::before {
      opacity: var(--md-sys-state-hover-opacity);
    }
  `;

  render() {
    return html`
      <div class="element">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('wy-component-name', WyComponentName);
```

### CSS Quality Standards

#### CRITICAL: NO !important Declarations

- **NEVER use `!important`** in CSS except for true utility classes that must override everything
- If specificity conflicts arise, resolve them by:
  - Increasing selector specificity (e.g., adding a class or parent selector)
  - Reordering rules in the source file
  - Using attribute selectors `[hidden]` for utilities
- `!important` breaks the cascade and makes maintenance extremely difficult

#### Material Design 3 Interactive States

- All interactive elements use Material Design 3 state layers for hover/focus/pressed states
- State layer opacity controlled by `--md-sys-state-hover-opacity`, `--md-sys-state-focus-opacity`, `--md-sys-state-pressed-opacity`
- **NEVER change background colors directly on hover**; always use pseudo-element overlays (`:before` or `:after`) instead

#### CSS Variables

- Prefer CSS variables instead of hardcoded color values
- Use `color-mix()` with variables: `color-mix(in srgb, var(--category-color) 16%, var(--color-card-surface))`
- Define a clear color palette with descriptive names
- Motion/typography/state tokens should use `--md-sys-*` variable naming convention

#### Transitions & Animations

- **Always use motion token variables** for durations and easing curves
- Common patterns:
  - Short interactions: `var(--md-sys-motion-duration-short4)` (200ms) with `var(--md-sys-motion-easing-standard)`
  - Medium interactions: `var(--md-sys-motion-duration-medium2)` (300ms) with `var(--md-sys-motion-easing-legacy)`
  - Long interactions: `var(--md-sys-motion-duration-long1)` (450ms) with `var(--md-sys-motion-easing-emphasized)`
- **NEVER use magic numbers** like `0.2s` or `0.3s` - always reference the motion tokens

#### Accessibility

- All interactive elements must have `:focus-visible` states with clear outlines
- Standard pattern: `outline: 3px solid var(--color-action-primary); outline-offset: 2px;`
- Ensure adequate color contrast (WCAG AA minimum)
- Toggle controls should use `:focus-within` for the label container

### Component Adaptation Workflow

When adapting external components to the design system, use the **automated Component Adaptation Workflow** with Playwright verification.

**Quick Start:** [workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md](workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md) - Copy/paste prompt

**How it works:**
1. You provide: Screenshot + original code
2. Agent analyzes and maps to design tokens
3. **Playwright automatically verifies** quality (no hardcoded values, dark mode, layout, etc.)
4. You receive: Working component + test results + screenshots

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

### Testing Requirements

**Zero-Trust Verification Protocol:**

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

---

## Integration Patterns

### npm link Setup (for Local Development)

**In design system repository:**
```bash
npm link
```

**In consuming project:**
```bash
npm link wy-family-office
```

**Import tokens:**
```css
@import "./styles/tokens-no-fonts.css"; /* Generated from node_modules/wy-family-office/src/styles/tokens.css */
```

### CDN Imports (for Production)

**CSS tokens:**
```css
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css');
@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css');
```

**Web Components:**
```javascript
import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';
```

### Consuming Projects

- **prompts-library** - https://p.weaver-yuwono.com (uses CDN imports)
- **plots** - Uses `npm link` for local development
- **Weaver-Yuwono-Home-Page** - https://weaver-yuwono.com (uses CDN imports)

### Token Synchronization

After updating design system tokens, consuming projects need to:
1. **npm link projects:** Run `npm link wy-family-office` again to update
2. **CDN projects:** Purge CDN cache (see CDN Cache Purging section)

---

## Deployment & Maintenance

### Commit & Deploy Workflow

**IMPORTANT: When committing changes, you MUST follow this workflow to purge the jsDelivr CDN cache. Dependent projects will not receive updates without this step.**

**Standard Commit Process:**

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

**Quick One-Liner:**
```bash
git commit -m "Your message" && git push origin main && \
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done
```

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

---

## Component Library

### Component Categories

**Forms:** `wy-form-field`, `wy-tag-chip`, `wy-filter-chip`, `wy-tag-input`, `wy-category-select`, `wy-selection-card`

**Layout:** `wy-app-bar`, `wy-library-header`, `wy-controls-bar`, `wy-tabs`, `wy-modal`, `wy-prompt-modal`, `wy-export-modal`

**Cards:** `wy-profile-card`, `wy-bio-card`, `wy-work-card`, `wy-plot-card`, `wy-prompt-card`, `wy-metric-card`, `wy-allocation-card`, `wy-insight-card`

**Specialized:** `wy-works-grid`, `wy-project-list`, `wy-backup-status`, `wy-toast`, `wy-icon-button`

### Component API Reference

See [COMPONENTS.md](COMPONENTS.md) for complete API documentation for all components.

### Usage Examples

**Modal:**
```html
<wy-modal open heading="Export Configuration">
  <wy-form-field label="File Name">
    <input type="text" placeholder="my-export.svg">
  </wy-form-field>
  
  <div slot="actions">
    <md-text-button>Cancel</md-text-button>
    <md-filled-button>Export</md-filled-button>
  </div>
</wy-modal>
```

**Icon Button:**
```html
<wy-icon-button variant="filled" size="small" icon="add"></wy-icon-button>
<wy-icon-button variant="outlined" icon="share" label="Share"></wy-icon-button>
```

**Filter Chip:**
```html
<wy-filter-chip label="Productivity" count="12" active></wy-filter-chip>
```

---

## Troubleshooting

### CSS Variables Not Resolving

**Symptoms:** Components render with wrong colors or default browser styles.

**Solutions:**
1. Check if CSS variables are defined in `src/styles/tokens.css`
2. Verify variables cascade into shadow DOM (see CSS Custom Property Inheritance section)
3. For nested components, use fallback pattern: `var(--component-token, var(--system-token, #hex))`
4. Check if consuming project has imported tokens correctly

### Components Not Rendering

**Symptoms:** Components appear as empty elements or don't register.

**Solutions:**
1. Verify component is registered: `customElements.get('wy-component-name')`
2. Check for JavaScript errors in console
3. Ensure `src/main.js` imports the component
4. Verify component file is in `src/components/` directory

### Fonts Not Loading

**Symptoms:** Text renders in fallback fonts, icons show as text.

**Solutions:**
1. Check if component imports fonts in `static styles` (see Shadow DOM Font Loading section)
2. Verify font URLs are accessible
3. For Material Symbols, ensure `@import` includes full font URL with parameters
4. Check browser console for font loading errors

### CDN Cache Staleness

**Symptoms:** Changes made to design system don't appear in consuming projects.

**Solutions:**
1. Run full CDN purge commands (see CDN Cache Purging section)
2. Hard refresh browser (Cmd+Shift+R)
3. Verify purge succeeded (response contains `"status":"finished"`)
4. Wait 2-3 seconds for propagation
5. If still stale, temporarily pin to commit hash (see CDN Staleness Fallback)

---

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

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

### Investigating Issues

```bash
# Inspect an element's computed styles in dark mode
python3 skills/visual-qa/scripts/inspect_element.py --url http://localhost:8000 --selector "wy-controls-bar" --shadow-selector ".search-input" --color-scheme dark

# Check contrast ratio
python3 skills/visual-qa/scripts/inspect_element.py --url http://localhost:8000 --selector ".search-input" --contrast
```

See [skills/visual-qa/SKILL.md](skills/visual-qa/SKILL.md) for the complete workflow.

---

## Dark Mode Support

The system includes comprehensive dark mode support with proper contrast ratios:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #8DE0B0;
    --md-sys-color-background: #161c19;
    --md-sys-color-surface: #1E2623;
    /* ... additional dark mode tokens */
  }
}
```

---

## Use Cases

This design system is ideal for:
- **Portfolio Management Dashboards** - Financial analytics with premium aesthetics
- **Content Management Systems** - Editorial interfaces with rich typography
- **Creative Tool Interfaces** - Art/design applications requiring refined UI
- **Family Office Platforms** - Wealth management and asset tracking
- **Generative Art Tools** - Plotter configuration and SVG export workflows

---

## Key Features

✅ **Production-Ready** - Fully tested components with proper accessibility  
✅ **Dark Mode** - Complete dark theme with high contrast ratios  
✅ **Responsive** - Mobile-first design with adaptive layouts  
✅ **Modular** - Import only the components you need  
✅ **Themeable** - CSS custom properties for easy customization  
✅ **Type-Safe** - Built with Lit 3.x reactive properties  
✅ **Accessible** - Based on Material Design 3 accessibility standards

---

## Additional Resources

- **Living Style Guide:** Open `design-system.html` in your dev server for interactive component previews
- **Design Philosophy:** See `m3-requirements.md` for detailed design principles
- **Component APIs:** See [COMPONENTS.md](COMPONENTS.md) for complete API documentation
- **Component Adaptation:** See [workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md](workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md) for workflow

---

## License

Private - Weaver-Yuwono Family Office

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready
