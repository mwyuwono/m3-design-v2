# Weaver-Yuwono-Home-Page Migration Guide

## Current Status

**Weaver-Yuwono-Home-Page** is **not currently integrated** with m3-design-v2 design system.

### Current Setup
- Uses local `design-system/` directory with Material Design 3 tokens
- Local tokens defined in `design-system/tokens/material3.web.css`
- Local spacing tokens in `styles.css` and `projects/projects.css`
- No connection to m3-design-v2

### Target Setup
- Import m3-design-v2 tokens via CDN (like prompt-library)
- Use design system spacing, motion, and state tokens
- Remove local token definitions
- Use design system web components where applicable

## Migration Steps

### 1. Update HTML Files to Import Design System

**For `index.html`:**
```html
<!-- Replace local design system imports with m3-design-v2 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css">
```

**For `projects/index.html`:**
```html
<!-- Replace local design system imports with m3-design-v2 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/src/styles/main.css">
```

### 2. Remove Local Token Definitions

**In `styles.css`:**
- Remove `--md-sys-spacing-*` definitions (lines 45-50)
- Map to design system tokens: `--md-sys-spacing-xs: var(--spacing-xs);` etc.

**In `projects/projects.css`:**
- Remove local spacing token definitions
- Use design system tokens instead

### 3. Update Token References

Replace local token names with design system equivalents:
- `--md-sys-spacing-xs` → `--spacing-xs` (from design system)
- `--md-sys-spacing-sm` → `--spacing-sm`
- `--md-sys-spacing-md` → `--spacing-md`
- `--md-sys-spacing-lg` → `--spacing-lg`
- `--md-sys-spacing-xl` → `--spacing-xl`
- `--md-sys-spacing-xxl` → `--spacing-2xl` (closest match)

### 4. Add Motion and State Tokens

Design system now provides:
- Motion tokens: `--md-sys-motion-easing-*`, `--md-sys-motion-duration-*`
- State tokens: `--md-sys-state-hover-opacity`, `--md-sys-state-focus-opacity`, etc.

These are automatically available once design system is imported.

### 5. Test and Verify

1. Open site in browser
2. Check browser console for CSS import errors
3. Verify spacing/motion/state tokens are available
4. Test responsive behavior
5. Verify design matches expectations

## After Migration

1. Update `CLAUDE.md` to document m3-design-v2 integration
2. Remove or archive local `design-system/` directory (if no longer needed)
3. Add to verification script's "integrated" list
4. Document CDN cache purging workflow (same as prompt-library)

## CDN Cache Management

After design system changes, purge cache:
```bash
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
  for v in @main "" @latest; do
    curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"
  done
done
```
