# Weaver-Yuwono M3 Design System

**Single Source of Truth** | Version 1.0 | Last Updated: January 2026

> **📝 Document Maintenance:** When making changes to this document, update the version number and "Last Updated" timestamp above and at the end of the document. Timestamp format: `Month Day, YYYY at HH:MM AM/PM EST` (e.g., "January 27, 2026 at 3:45 PM EST").

A production-ready, modular design system built on Material Design 3, featuring custom Web Components and a distinctive "Soft Modernism" aesthetic. Designed for high-end editorial interfaces with organic shapes and disciplined typography.

---

## 🚨 CRITICAL GOTCHAS (Read First)

### 1. CSS Custom Property Inheritance in Nested Shadow DOM

**Problem:** CSS variables from `:root` don't cascade through nested shadow DOM boundaries. If Component A contains Component B inside its shadow DOM, `:root` variables won't reach Component B.

**Solution:** Use fallback pattern: `var(--component-token, var(--system-token, #hex-fallback))`
```css
.button.variant-filled {
  background-color: var(--wy-icon-button-filled-bg, var(--md-sys-color-primary, #2C4C3B));
}
```

**For consuming projects:** Set variables on parent component's host (cascades to immediate shadow children):
```css
.controls-bar {
  --wy-filter-chip-active-bg: #E8F5E9; /* Explicit hex for light-theme-only apps */
}
```

**Light-theme-only apps:** Use explicit hex values instead of `var()` to avoid dark mode interference.

**Expose parts:** Use `part` attribute for direct styling: `html`<div part="container">` → `my-component::part(container)`

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

**Components with fonts:** `wy-modal`, `wy-prompt-modal`, `wy-export-modal` (Playfair Display), `wy-controls-bar` (Material Symbols).

**New components:** Import fonts in `static styles` if using icons or display fonts.

---

### 3. LitElement Exit Animations (Collapse/Fade-Out)

**Problem:** LitElement reactive properties trigger synchronous re-renders. CSS transitions are skipped because the browser doesn't paint the "before" state.

**Solution:** Defer property changes with double `requestAnimationFrame`:
```javascript
if (this.showSearch) {
  // Exit animation: defer to allow paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      this.showSearch = false;
    });
  });
} else {
  // Enter animation: immediate is fine
  this.showSearch = true;
}
```

**Alternative:** Use CSS `@keyframes` animations instead of transitions.

---

### 4. CSS :focus in Shadow DOM

**Problem:** `:focus` styles may not apply due to specificity conflicts in Shadow DOM.

**Solution:** Use `!important` on focus styles:
```css
.input:focus {
  outline: 3px solid #2C4C3B !important;
  border-color: #2C4C3B !important;
}
```

**Backup:** Add `.focused` class via JS handlers alongside CSS `:focus`.

---

### 5. React Components vs Web Components Architecture

**CRITICAL:** Edit Web Components (`src/components/wy-*.js`) here, not React wrappers in consuming projects.

**Pattern:** Projects import via `npm link`/CDN → create React wrappers → wrappers pass props/events to `<wy-component-name>`.

**Example:** `wy-library-header.js` (design system) vs `library-header-wrapper.tsx` (consuming project wrapper).

**Before editing:** Confirm component is shared → verify changes should propagate → test in consuming projects.

---

### 6. CDN Cache Purging (Required After Every Commit)

**Problem:** jsDelivr caches for up to 24 hours. Changes won't propagate without purging.

**Solution:** After every commit:
```bash
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```

**Verify:** Response contains `"status":"finished"`. Hard refresh consuming projects (Cmd+Shift+R).

**Consuming projects:** prompts-library, Weaver-Yuwono-Home-Page (CDN), plots (`npm link`).

---

## Quick Start

```bash
git clone https://github.com/mwyuwono/m3-design-v2.git
cd m3-design-v2 && npm install && npm run dev
```

**Usage:** Import `<script type="module" src="/src/main.js"></script>`, then use `<wy-modal>`, `<wy-form-field>`, etc.

**Visual Reference:** Open `design-system.html` for interactive previews.

---

## Architecture

**Components:** 25 custom `wy-*` Web Components using LitElement. Located in `src/components/`, registered in `src/main.js`.

**Structure:** `src/components/` (Web Components), `src/styles/` (tokens.css, main.css), `src/data/` (JSON), `design-system.html` (style guide).

**Data Flow:** JSON files drive content. `main.js` creates components based on URL query parameters.

---

## Design Philosophy: Soft Modernism

Balances modernist precision with organic warmth - premium architectural publication aesthetic.

**Typography:** Playfair Display (headings), DM Sans (UI/body), wide letter-spacing on labels.

**Colors:** Hunter Green (`#2C4C3B`), Alabaster (`#FDFBF7`), Warm Clay (`#F5F2EA`), Muted Bronze (`#8C7E70`).

**Form:** Capsule buttons, rounded cards (16-32px), generous spacing (48-64px), subtle borders.

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

**NEVER use `!important`** except for utility classes. Resolve conflicts via specificity, reordering, or attribute selectors.

#### Material Design 3 Interactive States

Use state layers (pseudo-element overlays) with opacity tokens. **NEVER change background colors directly on hover.**

#### CSS Variables

Prefer variables over hardcoded values. Use `color-mix()` with variables. Motion/typography/state tokens use `--md-sys-*` naming.

#### Transitions & Animations

**Always use motion token variables** - never magic numbers. Common: `short4` (200ms), `medium2` (300ms), `long1` (450ms).

#### Accessibility

All interactive elements need `:focus-visible` outlines (`outline: 3px solid; outline-offset: 2px`). WCAG AA minimum contrast. Toggle controls use `:focus-within`.

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

### npm link (Local Development)

```bash
# Design system
npm link

# Consuming project
npm link wy-family-office
```

**Import:** `@import "./styles/tokens-no-fonts.css";`

### CDN (Production)

**CSS:** `@import url('https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css');`

**JS:** `import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';`

**Consuming projects:** prompts-library, Weaver-Yuwono-Home-Page (CDN), plots (`npm link`).

**After token updates:** npm link projects re-link; CDN projects purge cache.

---

## Deployment & Maintenance

### Commit & Deploy Workflow

**REQUIRED:** After every commit, purge CDN cache (see section 6 above).

**Process:** `git commit && git push origin main` → purge CDN → verify projects.

**Verify:** `./skills/design-system-sync/verify-projects.sh` checks integration status, token usage, overrides.

**CDN Staleness Fallback:** Temporarily pin to commit hash if `@main` still stale after purge. Revert once updated.

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

### For Coding Assistants

**Quick Diagnostic Checklist:**
1. CDN cache purged? (90% of issues)
2. Hard refresh? (Cmd+Shift+R)
3. Editing correct file? (`src/components/wy-*.js` not React wrapper)
4. Component registered? (`customElements.get('wy-component-name')`)
5. CSS variables cascading? (Check shadow DOM)
6. Fonts imported? (Shadow DOM requires explicit imports)

---

### Issue 1: Changes Not Appearing (CDN Cache)

**Symptoms:** Old styles/behavior persist. **Cause:** jsDelivr cache (90% of cases).

**Diagnostic:** `curl -s "https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js" | grep "expected-code"`

**Solution:** Purge CDN (see section 6). Verify: response `"status":"finished"`, hard refresh, wait 2-3s. If still stale, pin to commit hash temporarily.

---

### Issue 2: CSS Variables Not Resolving

**Symptoms:** Wrong colors, default styles, transparent backgrounds.

**Causes:** Variables not cascading (nested shadow DOM), not imported, dark mode interference.

**Diagnostic:** `getComputedStyle(element).getPropertyValue('--md-sys-color-primary')`

**Solutions:**
1. **Nested components:** Use fallback pattern: `var(--component-token, var(--system-token, #hex))`
2. **Consuming projects:** Set on parent host: `.parent { --wy-component-bg: #hex; }`
3. **Light-theme-only:** Use explicit hex, not `var()` (avoids dark mode)

---

### Issue 3: Editing Wrong File

**Symptoms:** Changes don't propagate or get overwritten.

**Cause:** Editing React wrapper instead of Web Component.

**Solution:** Edit `m3-design-v2/src/components/wy-*.js` for shared components. Check usage: `grep -r "wy-component-name"` - if multiple projects use it, edit design system.

---

### Issue 4: Components Not Rendering

**Symptoms:** Empty elements, not registered, shows as `<wy-component-name></wy-component-name>`.

**Causes:** Not registered, JS errors, not imported in `src/main.js`, wrong import path.

**Diagnostic:** `customElements.get('wy-component-name')` should return constructor, not undefined. Check console for errors.

**Solutions:**
1. Verify import in `src/main.js`: `import './components/wy-component-name.js';`
2. **CDN:** Verify path: `import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';`
3. **npm link:** `npm list wy-family-office` → re-link if needed

---

### Issue 5: Fonts Not Loading in Shadow DOM

**Symptoms:** Fallback fonts, Material Symbols show as text ("add", "search").

**Cause:** Fonts in light DOM don't propagate. Components must import fonts.

**Solution:** Add `@import` in component's `static styles`. See section 2 above.

---

### Issue 6: Import Path Issues

**Symptoms:** 404 errors, wrong version, components/styles don't load.

**Causes:** Wrong CDN path, npm link not set up, stale commit pin.

**Diagnostic:** `grep -r "cdn.jsdelivr.net"`, `npm list wy-family-office`, verify CDN content.

**Solutions:** Use correct CDN paths (see Integration Patterns), verify npm link setup, remove stale commit pins.

---

### Quick Reference

**CDN Purge:** `for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done`

**Component Registration:** `customElements.get('wy-component-name')` (should return constructor)

**CSS Variable:** `getComputedStyle(element).getPropertyValue('--md-sys-color-primary')`

**File Location:** `m3-design-v2/src/components/wy-*.js` (correct) vs `consuming-project/components/*-wrapper.tsx` (wrong for shared)

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

**Prerequisites:** `pip install playwright && playwright install chromium`

**Usage:** After component/styling changes:

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

Comprehensive dark mode with proper contrast ratios via `@media (prefers-color-scheme: dark)` token overrides.

---

## Use Cases

Ideal for: Portfolio dashboards, CMS editorial interfaces, creative tools, family office platforms, generative art tools.

## Key Features

✅ Production-ready • Dark mode • Responsive • Modular • Themeable • Type-safe (Lit 3.x) • Accessible (MD3)

---

## Additional Resources

- **Style Guide:** `design-system.html` (interactive previews)
- **Design Philosophy:** `m3-requirements.md`
- **Component APIs:** [COMPONENTS.md](COMPONENTS.md)
- **Component Adaptation:** [workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md](workflows/component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md)

---

## License

Private - Weaver-Yuwono Family Office

---

**Version**: 1.0.0  
**Last Updated**: January 27, 2026 at 11:15 PM EST  
**Status**: Production Ready
