# Quick Start: Component Adaptation

**Use this when you have a component example to adapt to the design system.**

---

## Copy This Prompt ⬇️

```markdown
# Adapt Component to Design System

I need to adapt this component to my m3-design-v2 design system.

## Reference

**Screenshot:**
[Paste or attach screenshot here]

**Original Code:**
[Paste code here]

**Context:**
[Describe where/how this will be used]

---

## Instructions

Follow the **Enhanced Component Adaptation Workflow** in [REFINED-COMPONENT-ADAPTATION-WORKFLOW.md](REFINED-COMPONENT-ADAPTATION-WORKFLOW.md):

### Required Steps:

1. **Extract Colors** - Use automated script to extract ALL reference colors (Phase 1.4)
   - Compare against design system tokens
   - Create component-specific tokens if needed (never approximate)
   - Document why semantic tokens don't work (if applicable)

2. **Map Values** - Map all spacing, typography, and colors to tokens
   - No hardcoded values allowed
   - Create new tokens for exact matches when needed

3. **Implement** - Build as Web Component with 100% token usage
   - Use component-specific tokens for exact color matches
   - Implement all interactive states (hover, focus, active)
   - Support dark mode

4. **Color Accuracy Test** (MANDATORY):
   ```bash
   python3 test-color-accuracy.py
   ```
   - Success: All colors ΔE < 2.0 (imperceptible difference)
   - Verify title, headers, text, borders match reference exactly

5. **State Testing** (MANDATORY):
   ```bash
   python3 test-interactive-states.py
   ```
   - Verify hover, focus, active states match reference
   - Test all transitions and animations
   - Ensure WCAG compliance for focus indicators

6. **Pixel-Perfect Comparison** (MANDATORY):
   ```bash
   python3 test-pixel-perfect.py
   ```
   - Success: ≥99.9% pixel match
   - Review diff heatmap for any red pixels
   - Verify side-by-side visual match

7. **Deliver** with complete test evidence

### Requirements:

- ✅ **Perfect visual fidelity** - No "close enough" approximations
- ✅ **Color accuracy** - ΔE < 2.0 for all colors
- ✅ **Pixel match** - ≥99.9% match threshold
- ✅ **All states tested** - Hover, focus, active, disabled
- ✅ **100% design system tokens** - Component-specific when needed
- ✅ **Dark mode support** - Tested automatically
- ✅ **MD3 state layers** - For all interactive elements
- ✅ **NO `!important` declarations**
- ✅ **Shadow DOM fonts** - Imported correctly
- ✅ **All tests passing** - Color, state, pixel-perfect

### Deliverables:

1. **Color extraction report** - Reference colors vs design system tokens
2. **Token mapping report** - Complete original → token mapping
3. **Color accuracy test results** - All ΔE values < 2.0
4. **State testing results** - All states verified
5. **Pixel-perfect comparison** - Heatmap + side-by-side + match %
6. **Complete component implementation** - 100% token usage
7. **Integration instructions** - How to use in projects
8. **Design system updates** - New tokens added (if any)

---

**Execute the full workflow with automated Playwright verification.**
```

---

## What Happens Next

When you paste this prompt with your example, I will:

### ✅ Automated Steps:

1. **Extract reference colors** - Automated script extracts ALL colors from mockup
2. **Compare colors** - Check reference vs design system tokens (create table)
3. **Create tokens** - Add component-specific tokens if semantic tokens don't match
4. **Map values** - Complete token mapping table (spacing, typography, colors)
5. **Update** `tokens.css` if needed (with dark mode variants)
6. **Implement** the component as `wy-[name].js`
7. **Build** the design system
8. **Create** test page
9. **Run color accuracy test**:
   - Extract computed colors from implementation
   - Calculate ΔE for each color vs reference
   - Pass threshold: ΔE < 2.0 (imperceptible)
10. **Run state testing**:
    - Test hover, focus, active, disabled states
    - Verify all state colors match reference
    - Screenshot each state for verification
11. **Run pixel-perfect comparison**:
    - Capture reference and implementation screenshots
    - Calculate pixel diff with tolerance
    - Generate heatmap (green=match, red=different)
    - Pass threshold: ≥99.9% match
12. **Provide** complete implementation + comprehensive test results

### 📊 You'll Receive:

- ✅ Complete Web Component code (100% token usage)
- ✅ Color extraction report (reference colors → design system)
- ✅ Token mapping report (all values mapped)
- ✅ Color accuracy test results (ΔE values for all colors)
- ✅ Interactive state test results (hover, focus, active verified)
- ✅ Pixel-perfect comparison (heatmap + side-by-side + match %)
- ✅ Before/after screenshots (light + dark mode)
- ✅ Integration instructions
- ✅ Design system updates (new tokens with rationale)

---

## Example Usage

**You provide:**
```
Screenshot: [Shows a blue button with rounded corners]

Code:
<button style="background: #007bff; color: white; padding: 12px 24px; border-radius: 20px;">
  Click Me
</button>

Context: Primary action button for forms
```

**I deliver:**
```javascript
// wy-primary-button.js
export class WyPrimaryButton extends LitElement {
  static styles = css`
    .button {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--md-sys-shape-corner-full);
      // ... complete implementation
    }
  `;
}
```

**Plus:**
- Playwright test results (all passing ✅)
- Screenshots showing visual match
- Integration ready code

---

## Benefits of This Workflow

🤖 **Automated Color Extraction** - Extracts ALL colors from reference automatically  
🎨 **Perfect Color Accuracy** - ΔE < 2.0 threshold (imperceptible difference)  
🎯 **Pixel-Perfect Match** - ≥99.9% visual match verified  
🖱️ **All States Tested** - Hover, focus, active verified automatically  
🏗️ **Design System Compliance** - 100% token usage enforced  
🌓 **Dark Mode** - Automatically tested  
📊 **Comprehensive Evidence** - Heatmaps, comparisons, delta calculations  
⚡ **No Approximations** - "Close enough" prevented by automation  
✅ **Quality Guaranteed** - Multiple verification layers before delivery  

---

## Ready to Adapt?

Copy the prompt above, paste with your screenshot + code, and I'll handle the rest! 🚀
