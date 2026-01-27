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

Follow the **Component Adaptation Workflow** in [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md):

### Required Steps:

1. **Analyze** screenshot and code
2. **Map** original values to design system tokens
3. **Update** design system if tokens missing
4. **Implement** as Web Component with 100% token usage
5. **Test** with Playwright automation:
   ```bash
   python3 skills/component-adaptation/test-component.py \
     --url http://localhost:5173/test-[name].html \
     --selector wy-[name] \
     --output /tmp/component-test
   ```
6. **Verify** screenshots match original look
7. **Deliver** with test results and integration instructions

### Requirements:

- ✅ 100% design system tokens (no hardcoded values)
- ✅ Dark mode support
- ✅ MD3 state layers for interactive elements
- ✅ NO `!important` declarations
- ✅ Shadow DOM fonts imported
- ✅ All Playwright tests passing

### Deliverables:

1. Token mapping report (original → design system)
2. Playwright test results with screenshots
3. Complete component implementation
4. Integration instructions
5. Design system updates (if any)

---

**Execute the full workflow with automated Playwright verification.**
```

---

## What Happens Next

When you paste this prompt with your example, I will:

### ✅ Automated Steps:

1. **Analyze** your screenshot and code
2. **Create** a token mapping table
3. **Identify** missing design system assets
4. **Update** `tokens.css` if needed (with dark mode)
5. **Implement** the component as `wy-[name].js`
6. **Build** the design system
7. **Create** test page
8. **Run** Playwright automated tests:
   - Visual capture (light + dark)
   - Layout measurements
   - Hardcoded value detection
   - Interactive state testing
   - Dark mode verification
9. **Generate** comparison screenshots
10. **Provide** complete implementation + test results

### 📊 You'll Receive:

- ✅ Complete Web Component code
- ✅ Token mapping report
- ✅ Playwright test results
- ✅ Before/after screenshots
- ✅ Integration instructions
- ✅ Design system updates (if any)

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

🤖 **Automated Testing** - Playwright catches issues instantly  
🎯 **Visual Fidelity** - Screenshots prove it matches  
🏗️ **Design System Compliance** - 100% token usage enforced  
🌓 **Dark Mode** - Automatically tested  
📚 **Documented** - Token mapping + integration guide  
⚡ **Fast** - No back-and-forth describing issues  
✅ **Quality** - All gates verified before delivery  

---

## Ready to Adapt?

Copy the prompt above, paste with your screenshot + code, and I'll handle the rest! 🚀
