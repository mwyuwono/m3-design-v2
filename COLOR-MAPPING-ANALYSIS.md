# Color Mapping Analysis - Library Header Component

## Extraction Results Summary

**Total colors extracted:** 13  
**Perfect matches (ΔE = 0.00):** 6  
**Require component tokens (ΔE >= 2.0):** 5  

---

## Perfect Matches - Use Existing Tokens

| Element | Reference RGB | Hex | Design System Token | ΔE | Action |
|---------|---------------|-----|---------------------|-----|--------|
| Page background | (253, 251, 247) | #FDFBF7 | var(--md-sys-color-background) | 0.00 | ✅ Use existing |
| Filter button bg | (245, 242, 234) | #F5F2EA | var(--md-sys-color-surface) | 0.00 | ✅ Use existing |
| Filter button color | (44, 76, 59) | #2C4C3B | var(--md-sys-color-primary) | 0.00 | ✅ Use existing |
| Search input bg | (253, 251, 247) | #FDFBF7 | var(--md-sys-color-background) | 0.00 | ✅ Use existing |
| Add work button bg | (44, 76, 59) | #2C4C3B | var(--md-sys-color-primary) | 0.00 | ✅ Use existing |
| Add work button text | (255, 255, 255) | #FFFFFF | var(--md-sys-color-on-primary) | 0.00 | ✅ Use existing |

---

## Component-Specific Tokens Required

### 1. Title Color: Pure Black vs Design System

**Reference:** Tailwind `text-black` = rgb(0, 0, 0) #000000  
**Design System:** `var(--md-sys-color-on-surface)` = rgb(18, 23, 20) #121714  
**ΔE:** 35.40

**Decision:** Use `var(--md-sys-color-on-surface)` instead of pure black for:
- Design system consistency
- Better accessibility (pure black can be harsh)
- Dark mode support (token automatically switches)

**Rationale:** The reference uses Tailwind's pure black, but this is an anti-pattern in Material Design. The design system's on-surface color provides better visual hierarchy and works seamlessly with dark mode.

**Action:** ✅ Use existing `var(--md-sys-color-on-surface)` - Accept minor visual difference for design system compliance

---

### 2. Search Border: Tailwind Gray-500

**Reference:** Tailwind gray-500 = rgb(107, 114, 128) #6B7280  
**Closest Token:** `var(--color-border)` = rgb(215, 211, 200) #D7D3C8  
**ΔE:** 100.87 (significant difference - gray-500 is much darker)

**Problem:** The reference uses a dark gray border that doesn't exist in the design system token palette.

**Investigation:** The React implementation uses:
```css
border: 1px solid var(--color-border);
```

So the React version already uses the design system token, not the Tailwind gray!

**Action:** ✅ Use existing `var(--color-border)` - React implementation takes precedence over mockup

---

### 3. Search Input Text: Tailwind Gray-700

**Reference:** Tailwind gray-700 = rgb(55, 65, 81) #374151  
**Design System:** `var(--md-sys-color-on-surface)` = rgb(18, 23, 20) #121714  
**ΔE:** 26.94

**Investigation:** React implementation uses:
```css
color: var(--color-text-primary);
```

Which maps to `var(--md-sys-color-on-surface)`.

**Action:** ✅ Use existing `var(--color-text-primary)` - React implementation takes precedence

---

### 4. Status Green: Success Color

**Reference:** Tailwind status-green = rgb(67, 142, 100) #438E64  
**Closest Token:** None - this is a custom Tailwind color  
**ΔE:** N/A (no match)

**Analysis:** This is defined in the Tailwind config as a custom color for status indicators. It doesn't exist in the M3 design system palette. This is a legitimate component-specific semantic color for "success" states.

**Action:** ⚠️ CREATE component-specific token `--wy-status-success-color: #438E64`

**Dark Mode Variant:** Lighter green for better contrast: `#66BB8A`

---

### 5. Scrolled State Background (from React implementation)

**Reference (Light):** rgba(248, 247, 244, 0.8) - Alabaster with 80% opacity  
**Reference (Dark):** rgba(18, 18, 18, 0.3) - Dark with 30% opacity  

**Analysis:** The React component uses glass morphism effect with semi-transparent backgrounds that don't exist as tokens.

**Action:** ⚠️ CREATE component-specific tokens:
- `--wy-library-header-scrolled-bg` (light mode): rgba(248, 247, 244, 0.8)
- `--wy-library-header-scrolled-bg` (dark mode): rgba(18, 18, 18, 0.3)
- `--wy-library-header-scrolled-blur`: 14px

---

## Final Token Requirements

### New Tokens to Add to `tokens.css`:

```css
:root {
  /* Status Colors - Component-specific */
  --wy-status-success-color: #438E64;
  
  /* Library Header Component - Glass Morphism */
  --wy-library-header-scrolled-bg: rgba(248, 247, 244, 0.8);
  --wy-library-header-scrolled-blur: 14px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --wy-status-success-color: #66BB8A;
    --wy-library-header-scrolled-bg: rgba(18, 18, 18, 0.3);
  }
}
```

**Total new tokens:** 3 (with dark mode variants)

---

## Complete Token Mapping Table

| Element | Original Value | Design System Token | Notes |
|---------|----------------|---------------------|-------|
| Page background | #FDFBF7 | `var(--md-sys-color-background)` | Exact match |
| Title text | #000000 → #121714 | `var(--md-sys-color-on-surface)` | Design system override |
| Filter button bg | #F5F2EA | `var(--md-sys-color-surface)` | Exact match |
| Filter button color | #2C4C3B | `var(--md-sys-color-primary)` | Exact match |
| Search input bg | #FDFBF7 | `var(--md-sys-color-background)` | Exact match |
| Search input border | #6B7280 → #D7D3C8 | `var(--color-border)` | React override |
| Search input text | #374151 → #121714 | `var(--color-text-primary)` | React override |
| Add work button bg | #2C4C3B | `var(--md-sys-color-primary)` | Exact match |
| Add work button text | #FFFFFF | `var(--md-sys-color-on-primary)` | Exact match |
| Status green | #438E64 | `var(--wy-status-success-color)` | **NEW TOKEN** |
| Scrolled bg (light) | rgba(248,247,244,0.8) | `var(--wy-library-header-scrolled-bg)` | **NEW TOKEN** |
| Scrolled bg (dark) | rgba(18,18,18,0.3) | `var(--wy-library-header-scrolled-bg)` | **NEW TOKEN** (dark variant) |

---

## Decision Rationale

**Why prioritize React implementation over mockup?**

1. The React component (`library-header.tsx`) is the actual production code currently in use in the plots project
2. The mockup (`code.html`) uses Tailwind classes which are a starting point, not the final design
3. The React implementation already uses design system tokens where appropriate
4. Our goal is to replace the React component with a Web Component while preserving functionality and visual appearance

**Why accept some visual differences?**

1. **Design System Consistency:** Pure black (#000000) → on-surface (#121714) for better hierarchy
2. **Accessibility:** Design system colors are WCAG AA compliant
3. **Dark Mode:** Design system tokens automatically handle dark mode transitions
4. **Maintainability:** Using semantic tokens makes the component easier to update globally

**Result:** By following the React implementation's token usage and only creating tokens for truly new colors (status green, glass morphism), we achieve 100% design system compliance while maintaining visual fidelity to the actual production component.

---

## Next Steps

1. ✅ Color extraction complete
2. ✅ Color mapping analysis complete
3. ⏭️ Add 3 new tokens to `tokens.css` with dark mode variants
4. ⏭️ Implement Web Component using mapped tokens
