---
name: component-adaptation
description: Systematic workflow for adapting external component examples to the m3-design-v2 design system with automated Playwright verification. Ensures design system compliance, token usage, and visual fidelity.
---

# Component Adaptation Skill

Systematically adapt external component examples to the m3-design-v2 design system while maintaining modularity, visual fidelity, and complete token usage.

## When to Use This Skill

Use this skill when:
- User provides a screenshot + code of a component to adapt
- User asks to "recreate this component" or "add this to the design system"
- User shares an example from another project/library
- User wants to ensure design system compliance during adaptation

## Prerequisites

- Playwright installed: `pip3 install playwright && python3 -m playwright install chromium`
- Dev server running: `npm run dev`
- Design system files accessible in `src/`

## Core Workflow

### Step 1: Analysis

When user provides screenshot + code:

1. **Visual Analysis**
   - Identify layout patterns (grid, flex, positioning)
   - Document spacing values
   - Note typography hierarchy
   - Identify color palette
   - Observe interactive states
   - Check for animations/transitions

2. **Code Analysis**
   - Extract all hardcoded values (colors, spacing, fonts, durations)
   - Identify component structure
   - Note event handlers and interactions
   - Document props/attributes/slots

3. **Token Mapping**
   Create mapping table:
   ```
   Original Value → Design System Token → Status
   #2C4C3B → var(--md-sys-color-primary) → ✅ Exists
   24px → var(--spacing-lg) → ✅ Exists
   #E8E8E8 → ❌ Missing → Create --wy-custom-surface
   ```

### Step 2: Design System Updates (If Needed)

If missing tokens identified:

**Add to `src/styles/tokens.css`:**
```css
:root {
  /* New tokens following naming convention */
  --wy-[component]-[property]: value;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode variants required */
    --wy-[component]-[property]: dark-value;
  }
}
```

**Principles:**
- Follow existing naming patterns (`--wy-*` for component-specific)
- Use semantic names (not `--wy-gray-3`, use `--wy-surface-subtle`)
- Always provide dark mode variants
- Document rationale in comment

### Step 3: Implementation

**Create Web Component:**

```javascript
// src/components/wy-[name].js
import { LitElement, html, css } from 'lit';

export class Wy[Name] extends LitElement {
  static properties = {
    // Properties from original code
  };
  
  static styles = css`
    /* CRITICAL: Import fonts for Shadow DOM */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
    
    /* Component styles - 100% design system tokens */
    :host {
      display: block;
    }
    
    /* Use tokens exclusively */
    .container {
      background: var(--md-sys-color-surface);
      padding: var(--spacing-lg);
      border-radius: var(--md-sys-shape-corner-medium);
      /* NO hardcoded values */
    }
    
    /* MD3 state layers for interactive elements */
    .button {
      position: relative;
      overflow: hidden;
      transition: all var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
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
    
    /* Focus states */
    .button:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }
  `;
  
  render() {
    return html`
      <!-- Recreate structure from original -->
    `;
  }
}

customElements.define('wy-[name]', Wy[Name]);
```

**Required Standards:**
- ✅ All colors use tokens
- ✅ All spacing uses tokens
- ✅ All typography uses tokens
- ✅ All motion uses tokens
- ✅ State layers for interactive elements
- ✅ Focus states defined
- ✅ NO `!important`
- ✅ Shadow DOM fonts imported

### Step 4: Automated Testing

**CRITICAL: Always run Playwright tests before showing results**

#### 4.1 Quick Test Script
```bash
cd m3-design-v2

# Create simple test page if needed
cat > test-[component].html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/src/styles/tokens.css">
  <script type="module" src="/src/main.js"></script>
</head>
<body style="padding: 40px; background: var(--md-sys-color-background);">
  <wy-[component-name] 
    prop1="value1" 
    prop2="value2">
  </wy-[component-name]>
</body>
</html>
EOF

# Run automated test
python3 skills/component-adaptation/test-component.py \
  --url http://localhost:5173/test-[component].html \
  --selector wy-[component-name] \
  --output /tmp/component-test
```

#### 4.2 Manual Playwright Checks
If custom testing needed:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/test-page.html')
    page.wait_for_timeout(2000)
    
    # Your custom checks here
    
    browser.close()
```

#### 4.3 Visual Comparison
Compare screenshots with original:
- Original screenshot (provided by user)
- `/tmp/component-test/component-light.png` (adapted version)

### Step 5: Deliverables

Provide user with:

#### 5.1 Token Mapping Report
```markdown
## Token Mapping

| Original | Token Used | Notes |
|----------|------------|-------|
| `#2C4C3B` | `var(--md-sys-color-primary)` | Exact match |
| `24px padding` | `var(--spacing-lg)` | 24px = 1.5rem |
| `0.3s ease` | `var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard)` | Standard transition |

**New Tokens Created:**
- `--wy-component-custom-bg: #F8F8F8` (added to tokens.css)
- Dark mode variant: `--wy-component-custom-bg: #2A2A2A`
```

#### 5.2 Playwright Test Results
```markdown
## Automated Test Results

✅ **Visual Capture:** Screenshots saved
✅ **Layout Measurements:** Dimensions verified
✅ **Token Usage:** No hardcoded values detected
✅ **Interactive States:** Hover/focus working
✅ **Dark Mode:** Both color schemes tested
✅ **Material Icons:** Font loading correctly (if applicable)

**Issues Found:** 0
**Status:** Ready for integration
```

#### 5.3 Component Code
Provide complete implementation with documentation.

#### 5.4 Integration Instructions
```markdown
## Integration

1. Component created: `src/components/wy-[name].js`
2. Registered in: `src/main.js`
3. Added to: `src/data/components.json`
4. Test page: `test-[name].html`

## Usage
```html
<wy-[name] prop="value">
  <slot>Content</slot>
</wy-[name]>
```

## Next Steps
- [ ] Add to components-library.html
- [ ] Build: `npm run build`
- [ ] Commit and push
- [ ] Purge CDN cache
```

---

## Quality Gates

Component must pass ALL gates:

### Gate 1: Token Usage ✅
```python
# Automated check
issues = check_hardcoded_values(page, selector)
assert len(issues) == 0, "Hardcoded values found"
```

### Gate 2: Visual Fidelity ✅
```
# Manual comparison
Original screenshot ≈ Adapted screenshot
(same visual appearance, different implementation)
```

### Gate 3: Dark Mode ✅
```python
# Automated check
colors_differ = check_dark_mode(page, selector)
assert colors_differ, "Dark mode not themed"
```

### Gate 4: No !important ✅
```python
# Automated check
has_important = check_for_important(page, selector)
assert not has_important, "!important found"
```

### Gate 5: Accessibility ✅
```
# Manual check
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
```

---

## Example Execution

**User provides:**
```
Screenshot: [Shows a fancy card with gradient background]

Code:
```html
<div class="fancy-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 16px;">
  <h3 style="color: white; font-size: 24px;">Title</h3>
  <p style="color: rgba(255,255,255,0.8);">Description</p>
</div>
```
```

**Adaptation process:**

1. **Analysis:**
   - Gradient background (not in design system)
   - White text on dark background
   - 32px padding = 2rem
   - 16px border radius = medium

2. **Design System Update:**
   ```css
   /* tokens.css - Add gradient token */
   --wy-gradient-primary: linear-gradient(135deg, 
     var(--md-sys-color-primary) 0%, 
     color-mix(in srgb, var(--md-sys-color-primary) 70%, var(--md-sys-color-secondary) 30%) 100%);
   ```

3. **Implementation:**
   ```javascript
   static styles = css`
     .card {
       background: var(--wy-gradient-primary);
       padding: var(--spacing-xl);
       border-radius: var(--md-sys-shape-corner-medium);
     }
     
     .title {
       color: var(--md-sys-color-on-primary);
       font-family: var(--font-serif);
       font-size: 1.5rem;
       margin: 0 0 var(--spacing-md) 0;
     }
     
     .description {
       color: color-mix(in srgb, var(--md-sys-color-on-primary) 80%, transparent);
       font-family: var(--font-body);
       font-size: 1rem;
       margin: 0;
     }
   `;
   ```

4. **Playwright Test:**
   ```bash
   python3 skills/component-adaptation/test-component.py \
     --url http://localhost:5173/test-fancy-card.html \
     --selector wy-fancy-card \
     --output /tmp/fancy-card-test
   ```

5. **Results:**
   - ✅ Screenshots match original look
   - ✅ No hardcoded values
   - ✅ Dark mode working
   - ✅ Ready for integration

---

## Tips for Success

1. **Always analyze before implementing** - Don't rush to code
2. **Token mapping first** - Know what you need before you start
3. **Update design system properly** - New tokens need dark mode variants
4. **Test with Playwright** - Automate verification, don't rely on visual inspection alone
5. **Document decisions** - Why did you create a new token? What's it for?
6. **Visual fidelity matters** - The adapted component should look virtually identical
7. **Modularity matters more** - Prioritize reusability over pixel-perfect recreation

## Common Pitfalls

❌ **Skipping Playwright testing** - Always verify programmatically  
❌ **Hardcoding "just one value"** - Breaks design system integrity  
❌ **Forgetting dark mode** - All tokens need dark variants  
❌ **Using !important** - Never acceptable  
❌ **Not importing fonts in Shadow DOM** - Icons/typography will break  
❌ **Copying original code exactly** - Must translate to design system patterns  

---

## Success Metrics

A successful adaptation achieves:

- 🎨 **Visual Fidelity:** 95%+ match to original screenshot
- 🏗️ **Token Usage:** 100% design system tokens
- 🌓 **Dark Mode:** Full support with proper theming
- 🧪 **Playwright Tests:** All passing
- 📚 **Documentation:** Complete props/examples
- ♿ **Accessibility:** Semantic HTML, ARIA labels, focus states
- 🚀 **Deployed:** Built, committed, CDN purged

---

## Quick Reference

**Adaptation Prompt:** [COMPONENT-ADAPTATION-PROMPT.md](COMPONENT-ADAPTATION-PROMPT.md)  
**Full Workflow:** [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md)  
**Test Script:** `skills/component-adaptation/test-component.py`

**Usage:**
```bash
# User provides screenshot + code
# You follow the workflow
# Run automated tests
# Deliver adapted component with test results
```
