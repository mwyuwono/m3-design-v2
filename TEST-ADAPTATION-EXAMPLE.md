# Test the Component Adaptation Workflow

Use this to verify the automation works:

## Test Example

I need to adapt this component to my m3-design-v2 design system.

### Reference

**Component:** Simple Info Card

**Original Code:**
```html
<div class="info-card" style="background: #f0f0f0; padding: 24px; border-radius: 12px; border: 1px solid #ddd;">
  <div class="icon" style="color: #007bff; font-size: 32px; margin-bottom: 16px;">ℹ️</div>
  <h3 style="color: #333; font-size: 20px; margin: 0 0 8px 0;">Information</h3>
  <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">
    This is an informational message with some helpful context.
  </p>
</div>
```

**Context:** Display informational alerts and notifications

---

## Expected Adaptations

Should become:

```javascript
// wy-info-card.js
background: var(--md-sys-color-surface-container-high)
padding: var(--spacing-lg)
border-radius: var(--md-sys-shape-corner-medium)
border: 1px solid var(--md-sys-color-outline-variant)
heading color: var(--md-sys-color-primary)
text color: var(--md-sys-color-on-surface-variant)
```

**Playwright should verify:**
- ✅ No hardcoded #f0f0f0, #ddd, #333, #666
- ✅ Spacing uses tokens
- ✅ Typography uses design system fonts
- ✅ Dark mode works
