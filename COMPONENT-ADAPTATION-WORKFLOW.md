# Component Adaptation Workflow
**Purpose:** Adapt external component examples to the m3-design-v2 design system while maintaining modularity, reusability, and visual fidelity.

---

## Usage Instructions

When you have a component example to adapt, provide:
1. **Screenshot** of the target component
2. **Code example** (HTML/CSS/JS) showing the implementation
3. **Context** about where it will be used (optional)

Then paste the **Adaptation Prompt** below with your examples.

---

## Adaptation Prompt

```
# Component Adaptation Request

I need to adapt the following component to my m3-design-v2 design system.

## Reference Materials

**Screenshot:** [Attached/pasted]

**Original Code:**
```[language]
[paste code here]
```

**Context:** [Where this will be used, any specific requirements]

---

## Adaptation Workflow

Follow this systematic process to ensure design system alignment:

### Phase 1: Analysis & Planning

#### 1.1 Visual Analysis (Screenshot Review)
Analyze the screenshot and document:

**Layout & Structure:**
- Container type (card, modal, panel, etc.)
- Spacing patterns (margins, padding, gaps)
- Grid/flexbox layout structure
- Responsive behavior (if visible)

**Typography:**
- Heading styles and hierarchy
- Body text sizing and weight
- Letter spacing and text transforms
- Font families used

**Colors:**
- Background colors
- Text colors  
- Border/outline colors
- State colors (hover, active, disabled)

**Interactive Elements:**
- Buttons (variants, sizes, states)
- Form inputs
- Icons and their styling
- Hover/focus/active states

**Visual Details:**
- Border radius values
- Shadows/elevation
- Borders and dividers
- Animations/transitions

#### 1.2 Code Analysis
Review the provided code and identify:

**Hardcoded Values to Replace:**
- [ ] Color hex codes → Design system tokens
- [ ] Pixel spacing → Spacing scale tokens
- [ ] Font sizes/families → Typography tokens
- [ ] Border radius → Shape tokens
- [ ] Transition durations → Motion tokens
- [ ] Magic numbers → Named constants

**Patterns to Adapt:**
- [ ] Class naming conventions
- [ ] State management approach
- [ ] Event handlers
- [ ] Component props/attributes
- [ ] Slots and composition patterns

**Missing Design System Assets:**
- [ ] Colors not in palette
- [ ] Typography scales not defined
- [ ] Spacing values not available
- [ ] Shape/radius values missing
- [ ] Motion patterns undefined
- [ ] Component patterns not established

#### 1.3 Design System Token Mapping

Create a mapping table:

| Original | Design System Token | Fallback/New Token Needed |
|----------|---------------------|---------------------------|
| `#2C4C3B` | `var(--md-sys-color-primary)` | ✅ Exists |
| `16px` | `var(--spacing-md)` | ✅ Exists |
| `0.3s ease` | `var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard)` | ✅ Exists |
| `#E8E8E8` | ❌ Not in system | ⚠️ **Create new token** |

### Phase 2: Design System Updates (If Needed)

If analysis reveals missing tokens/patterns:

#### 2.1 Add Missing Color Tokens
Edit `src/styles/tokens.css`:
```css
:root {
  /* Add semantic color tokens */
  --wy-component-specific-color: #HEX;
  --wy-component-specific-on-color: #HEX;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Add dark mode variants */
    --wy-component-specific-color: #HEX;
  }
}
```

#### 2.2 Add Missing Spacing/Shape/Motion Tokens
If new spacing values needed, add to tokens.css following 8px baseline grid.

#### 2.3 Document New Patterns
Add to `src/data/components.json` if creating a new component pattern.

### Phase 3: Component Implementation

#### 3.1 Create Component File
Create `src/components/wy-[component-name].js`:

```javascript
import { LitElement, html, css } from 'lit';

export class Wy[ComponentName] extends LitElement {
  static properties = {
    // Define reactive properties from example
  };
  
  static styles = css`
    /* CRITICAL: Import fonts if needed in Shadow DOM */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
    
    /* Component styles using design system tokens */
    :host {
      display: block;
    }
    
    .container {
      background: var(--md-sys-color-surface);
      padding: var(--spacing-lg);
      border-radius: var(--md-sys-shape-corner-medium);
      /* NO hardcoded values */
    }
    
    /* State layers for interactive elements */
    .interactive {
      position: relative;
      overflow: hidden;
    }
    
    .interactive::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }
    
    .interactive:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }
    
    /* NEVER use !important */
    /* ALWAYS use CSS custom properties */
  `;
  
  render() {
    return html`
      <!-- Recreate structure from example -->
    `;
  }
}

customElements.define('wy-[component-name]', Wy[ComponentName]);
```

#### 3.2 Design System Compliance Checklist

Verify each implementation:

**Colors:**
- [ ] All colors use `var(--md-sys-color-*)` or `var(--wy-*)` tokens
- [ ] Dark mode variants defined in `@media (prefers-color-scheme: dark)`
- [ ] No hardcoded hex values
- [ ] `color-mix()` used for transparency instead of rgba()

**Typography:**
- [ ] All fonts use `var(--font-serif)` or `var(--font-sans)` or `var(--font-display)`
- [ ] Font sizes use `clamp()` for fluid scaling when appropriate
- [ ] Letter spacing uses design system values (0.05em, 0.1em, 0.15em)
- [ ] Text transforms consistent with design language

**Spacing:**
- [ ] All spacing uses `var(--spacing-*)` tokens (xxs through 3xl)
- [ ] Layout spacing uses `var(--spacing-layout)` or `var(--spacing-gap)`
- [ ] Follows 8px baseline grid
- [ ] Responsive spacing uses `clamp()`

**Shape:**
- [ ] Border radius uses `var(--md-sys-shape-corner-*)` tokens
- [ ] Capsule buttons use `var(--md-sys-shape-corner-full)`

**Motion:**
- [ ] Transitions use `var(--md-sys-motion-duration-*)` tokens
- [ ] Easing curves use `var(--md-sys-motion-easing-*)` tokens
- [ ] No magic number durations (0.3s, 200ms, etc.)

**Interactive States:**
- [ ] Hover states use `::before` pseudo-element overlay
- [ ] Opacity controlled by `var(--md-sys-state-hover-opacity)` etc.
- [ ] Focus states use 3px outline with 2px offset
- [ ] Never change background-color directly on hover

**Code Quality:**
- [ ] NO `!important` declarations
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Shadow DOM fonts imported if using icons or display fonts

### Phase 4: Automated Testing with Playwright

#### 4.1 Build & Start Dev Server
```bash
cd m3-design-v2
npm run build
npm run dev
```

#### 4.2 Visual Verification
Capture screenshots to compare with original:
```bash
python3 skills/visual-qa/scripts/capture.py \
  --url http://localhost:5173/[page-with-component].html \
  --output /tmp/visual-qa
```

Review screenshots:
- `/tmp/visual-qa/light.png` - Light mode
- `/tmp/visual-qa/dark.png` - Dark mode

#### 4.3 Automated Measurements
Create a Playwright script to verify layout matches target:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Measure component dimensions
    measurements = page.evaluate('''() => {
        const component = document.querySelector('wy-[component-name]');
        const rect = component.getBoundingClientRect();
        const style = window.getComputedStyle(component);
        
        return {
            width: rect.width,
            height: rect.height,
            padding: style.padding,
            borderRadius: style.borderRadius,
            backgroundColor: style.backgroundColor,
            // Add specific measurements from original screenshot
        };
    }''')
    
    # Compare with expected values from original
    print(f"Width: {measurements['width']}px (expected: [target])")
    print(f"Padding: {measurements['padding']} (expected: [target])")
    # etc.
    
    browser.close()
```

#### 4.4 Token Usage Verification
Scan for hardcoded values:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Check computed styles use tokens
    token_check = page.evaluate('''() => {
        const component = document.querySelector('wy-[component-name]');
        
        // Get all computed styles
        const style = window.getComputedStyle(component);
        
        // Check if using variables (will show resolved values)
        const checks = {
            backgroundColor: style.backgroundColor,
            color: style.color,
            padding: style.padding,
            borderRadius: style.borderRadius,
            transitionDuration: style.transitionDuration,
            transitionTimingFunction: style.transitionTimingFunction
        };
        
        return checks;
    }''')
    
    # Document what tokens resolved to
    for prop, value in token_check.items():
        print(f"{prop}: {value}")
    
    browser.close()
```

#### 4.5 Interactive State Testing
Test hover/focus/active states:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Test hover state
    element = page.query_selector('wy-[component-name] .interactive-element')
    element.hover()
    page.wait_for_timeout(300)
    page.screenshot(path='/tmp/visual-qa/hover-state.png')
    
    # Test focus state
    element.focus()
    page.wait_for_timeout(300)
    page.screenshot(path='/tmp/visual-qa/focus-state.png')
    
    # Test active state
    element.click()
    page.wait_for_timeout(100)
    page.screenshot(path='/tmp/visual-qa/active-state.png')
    
    browser.close()
```

#### 4.6 Dark Mode Verification
Ensure component works in both color schemes:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(color_scheme='light')
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    page.screenshot(path='/tmp/visual-qa/component-light.png')
    
    page.emulate_media(color_scheme='dark')
    page.wait_for_timeout(500)
    page.screenshot(path='/tmp/visual-qa/component-dark.png')
    
    browser.close()
```

### Phase 5: Quality Assurance

#### 5.1 Automated Linting
Run Playwright inspection to detect issues:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Check for common issues
    issues = page.evaluate('''() => {
        const component = document.querySelector('wy-[component-name]');
        const issues = [];
        
        // 1. Check for inline styles (should be minimal)
        if (component.getAttribute('style')) {
            issues.push('Component has inline styles');
        }
        
        // 2. Check for hardcoded colors in children
        const allElements = component.shadowRoot.querySelectorAll('*');
        allElements.forEach(el => {
            const inlineStyle = el.getAttribute('style') || '';
            if (inlineStyle.match(/#[0-9A-Fa-f]{3,6}|rgba?\(/)) {
                issues.push(`Hardcoded color in ${el.tagName}`);
            }
        });
        
        // 3. Check for !important
        const sheets = component.shadowRoot.styleSheets;
        for (let sheet of sheets) {
            try {
                for (let rule of sheet.cssRules) {
                    if (rule.style && rule.style.cssText.includes('!important')) {
                        issues.push('!important found in CSS');
                    }
                }
            } catch(e) {}
        }
        
        // 4. Check Material Icons font loading (if used)
        const icons = component.shadowRoot.querySelectorAll('.material-symbols-outlined');
        if (icons.length > 0) {
            const iconStyle = window.getComputedStyle(icons[0]);
            if (!iconStyle.fontFamily.includes('Material Symbols Outlined')) {
                issues.push('Material Icons font not loading in Shadow DOM');
            }
        }
        
        return issues;
    }''')
    
    if len(issues) > 0:
        print("⚠️ Issues found:")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print("✅ No issues found")
    
    browser.close()
```

#### 5.2 Comparison Testing
Compare adapted component with original screenshot:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Measure component
    component = page.query_selector('wy-[component-name]')
    
    # Get visual metrics
    metrics = page.evaluate('''(element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // Measure all visual properties
        return {
            dimensions: {
                width: rect.width,
                height: rect.height
            },
            spacing: {
                padding: style.padding,
                margin: style.margin
            },
            colors: {
                background: style.backgroundColor,
                color: style.color,
                borderColor: style.borderColor
            },
            typography: {
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
                fontFamily: style.fontFamily
            },
            shape: {
                borderRadius: style.borderRadius
            }
        };
    }''', component)
    
    # Print comparison report
    print("=== COMPONENT METRICS ===")
    for category, values in metrics.items():
        print(f"\n{category.upper()}:")
        for prop, val in values.items():
            print(f"  {prop}: {val}")
    
    # Screenshot for manual comparison
    component.screenshot(path='/tmp/visual-qa/adapted-component.png')
    
    browser.close()
```

### Phase 6: Integration & Documentation

#### 6.1 Register Component
Add to `src/main.js`:
```javascript
import './components/wy-[component-name].js';
```

#### 6.2 Update Components Data
Add to `src/data/components.json`:
```json
{
  "name": "wy-component-name",
  "title": "Component Name",
  "category": "appropriate-category",
  "description": "What this component does",
  "status": "stable",
  "props": [...],
  "examples": [...]
}
```

#### 6.3 Test in Components Library
Add example to `design-system.html` or `components-library.html` for visual verification.

#### 6.4 Build & Deploy
```bash
# Build updated design system
npm run build

# Commit changes
git add .
git commit -m "Add wy-[component-name] component

Adapted from provided example with design system tokens.

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push and purge CDN
git push origin main

# Purge jsDelivr cache
for f in src/styles/tokens.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```

---

## Workflow Execution Checklist

Use this checklist for each adaptation:

### Analysis
- [ ] Screenshot analyzed for visual patterns
- [ ] Code reviewed for hardcoded values
- [ ] Token mapping table created
- [ ] Missing design system assets identified

### Design System Updates
- [ ] New color tokens added (if needed)
- [ ] New spacing tokens added (if needed)
- [ ] Typography patterns documented (if needed)
- [ ] tokens.css updated and committed

### Implementation
- [ ] Component file created in `src/components/`
- [ ] All values use design system tokens
- [ ] No `!important` declarations
- [ ] Shadow DOM fonts imported
- [ ] State layers use `::before` pseudo-elements
- [ ] Interactive states follow MD3 patterns

### Testing
- [ ] Playwright visual capture (light + dark mode)
- [ ] Layout measurements match target
- [ ] Token usage verified (no hardcoded values)
- [ ] Interactive states tested
- [ ] Dark mode verified
- [ ] Console errors checked

### Documentation
- [ ] Component added to `src/main.js`
- [ ] Component added to `components.json`
- [ ] Example added to components library
- [ ] Props/slots/events documented

### Deployment
- [ ] Build successful (`npm run build`)
- [ ] Committed with proper message
- [ ] Pushed to GitHub
- [ ] CDN cache purged
- [ ] Verified in consuming projects

---

## Common Patterns Reference

### Material Design 3 State Layers
```css
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

.button:hover::before {
  opacity: var(--md-sys-state-hover-opacity);
}

.button:focus-visible::before {
  opacity: var(--md-sys-state-focus-opacity);
}

.button:active::before {
  opacity: var(--md-sys-state-pressed-opacity);
}
```

### Focus States
```css
.interactive:focus-visible {
  outline: 3px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}
```

### Transitions
```css
.element {
  transition: 
    transform var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
}
```

### Modal Animations
```css
.modal-content {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
  transition: 
    transform 0.4s var(--md-sys-motion-easing-spring),
    opacity 0.3s var(--md-sys-motion-easing-standard);
}

.modal.show .modal-content {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

### Responsive Spacing
```css
.container {
  padding: clamp(2rem, 4vw, 4rem);
  gap: clamp(1rem, 3vw, 2rem);
}
```

---

## Example Adaptation

### Original Code Provided:
```html
<div class="card" style="background: #f5f5f5; padding: 24px; border-radius: 12px;">
  <h3 style="color: #333; font-size: 24px; margin-bottom: 16px;">Title</h3>
  <p style="color: #666; font-size: 16px; line-height: 1.5;">Description</p>
  <button style="background: #007bff; color: white; padding: 10px 20px; border-radius: 4px; border: none; cursor: pointer; transition: 0.2s;">
    Click Me
  </button>
</div>
```

### Adapted to Design System:
```javascript
// src/components/wy-info-card.js
import { LitElement, html, css } from 'lit';

export class WyInfoCard extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String }
  };
  
  static styles = css`
    :host {
      display: block;
    }
    
    .card {
      background: var(--md-sys-color-surface-container-high);
      padding: var(--spacing-lg);
      border-radius: var(--md-sys-shape-corner-medium);
      border: 1px solid var(--md-sys-color-outline-variant);
    }
    
    .title {
      font-family: var(--font-serif);
      color: var(--md-sys-color-primary);
      font-size: 1.5rem;
      margin: 0 0 var(--spacing-md) 0;
      font-weight: 600;
    }
    
    .description {
      font-family: var(--font-body);
      color: var(--md-sys-color-on-surface-variant);
      font-size: 1rem;
      line-height: 1.5;
      margin: 0 0 var(--spacing-xl) 0;
    }
    
    .button {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--md-sys-shape-corner-full);
      border: none;
      cursor: pointer;
      font-family: var(--font-body);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: relative;
      overflow: hidden;
      transition: all var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
    }
    
    .button::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-on-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }
    
    .button:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }
    
    .button:focus-visible {
      outline: 3px solid var(--md-sys-color-secondary);
      outline-offset: 2px;
    }
  `;
  
  render() {
    return html`
      <div class="card">
        <h3 class="title">${this.title}</h3>
        <p class="description">${this.description}</p>
        <button class="button" @click="${this._handleClick}">
          <slot name="action-label">Click Me</slot>
        </button>
      </div>
    `;
  }
  
  _handleClick() {
    this.dispatchEvent(new CustomEvent('action-click', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('wy-info-card', WyInfoCard);
```

**Changes Made:**
- ✅ Hardcoded `#f5f5f5` → `var(--md-sys-color-surface-container-high)`
- ✅ Hardcoded `#333` → `var(--md-sys-color-primary)`
- ✅ Hardcoded `24px` → `var(--spacing-lg)`
- ✅ Hardcoded `12px` → `var(--md-sys-shape-corner-medium)`
- ✅ Hardcoded `#007bff` → `var(--md-sys-color-primary)`
- ✅ Hardcoded `0.2s` → `var(--md-sys-motion-duration-short4)`
- ✅ Added state layer hover effect
- ✅ Added focus-visible outline
- ✅ Capsule button shape (corner-full)
- ✅ Editorial typography (Playfair + DM Sans)

---

## Anti-Patterns to Avoid

❌ **DON'T:**
- Use hardcoded color values (`#HEXCODE`, `rgb()`, `rgba()`)
- Use magic number spacing (`margin: 24px`)
- Use arbitrary durations (`transition: 0.3s`)
- Use `!important` declarations
- Change background-color directly on hover
- Hardcode border-radius values
- Use inline styles for theming
- Skip dark mode testing
- Forget to import fonts in Shadow DOM

✅ **DO:**
- Use design system color tokens
- Use spacing scale tokens
- Use motion tokens for timing
- Resolve specificity issues properly
- Use `::before` pseudo-elements for hover
- Use shape tokens for border-radius
- Use CSS custom properties
- Test both color schemes
- Import all needed fonts

---

## Success Criteria

A component is successfully adapted when:

✅ **Visual Fidelity:** Matches original screenshot's look and feel  
✅ **Token Usage:** 100% design system tokens (no hardcoded values)  
✅ **Dark Mode:** Works correctly in both color schemes  
✅ **Interactive States:** Hover/focus/active follow MD3 patterns  
✅ **No Layout Issues:** Playwright verification shows correct dimensions  
✅ **Code Quality:** No `!important`, clean structure, semantic HTML  
✅ **Documentation:** Added to components.json with examples  
✅ **Modularity:** Reusable across projects via CDN  

---

## Troubleshooting Guide

### Issue: Component looks different from screenshot
**Solution:** Use Playwright to measure and compare:
```python
# Get exact measurements from adapted component
measurements = page.evaluate('/* measurement script */')
# Compare with target dimensions from screenshot
```

### Issue: Colors don't match in dark mode
**Solution:** Check `@media (prefers-color-scheme: dark)` overrides in tokens.css

### Issue: Fonts not loading in Shadow DOM
**Solution:** Add `@import` in component's `static styles`

### Issue: Interactive states not working
**Solution:** Verify `::before` pseudo-element and state opacity tokens

### Issue: Spacing feels off
**Solution:** Use Playwright to inspect computed padding/margin values, adjust tokens

---

## Ready to Adapt?

Paste this workflow with your:
1. Screenshot of target component
2. Original code example  
3. Any specific requirements

The workflow will guide systematic adaptation with automated verification! 🚀
```

---

## Quick Start Example

To use this workflow, format your request like this:

```
I need to adapt this component to the m3-design-v2 design system.

Screenshot: [attach or describe]

Original Code:
```html
<div class="example">...</div>
```

Context: This will be used for [purpose]

Please follow the Component Adaptation Workflow in COMPONENT-ADAPTATION-WORKFLOW.md
```
