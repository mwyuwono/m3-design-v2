# Dropdown Migration Guide

**DEPRECATION NOTICE (January 27, 2026):**  
`wy-category-select` has been removed from the design system and replaced with `wy-dropdown`.  
The old component is no longer available in the CDN bundle or npm package.

## Overview

The new `wy-dropdown` component replaces the existing `wy-category-select` component with a refreshed visual design matching the variants-selector reference. This guide covers migration steps for all consuming projects.

## What Changed

### Visual Design
- **Before**: Text input with border, rounded corners (12px)
- **After**: Capsule button with state layers, full border-radius (9999px)
- **Design System Tokens**: Component-specific tokens from zinc palette (`--wy-dropdown-*`)

### Component API

| Before (`wy-category-select`) | After (`wy-dropdown`) |
|-------------------------------|----------------------|
| `categories` (Array of strings) | `options` (Array of `{value, label}` objects) |
| `placeholder` (String) | `placeholder` (String) - unchanged |
| `value` (String) | `value` (String) - unchanged |
| `disabled` (Boolean) | `disabled` (Boolean) - unchanged |
| Text input with typing/filtering | Button with dropdown menu |

### Event API
- **Unchanged**: Both components fire `change` event with `event.detail.value`

## Migration Steps

### 1. Update Component Import

The component is already registered in `src/main.js`. No action needed if using the design system bundle.

### 2. Update HTML Markup

**Before:**
```html
<wy-category-select 
  label="Category"
  value="midjourney"
  .categories=${categories}
></wy-category-select>
```

**After:**
```html
<wy-dropdown
  label="CATEGORY"
  value="midjourney"
  .options=${categories.map(c => ({value: c, label: c}))}
></wy-dropdown>
```

### 3. Transform Data Structure

**Option 1: Simple strings → {value, label} objects**
```javascript
// Before
const categories = ['midjourney', 'museum', 'photo', 'other'];

// After
const categories = [
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'museum', label: 'Museum' },
  { value: 'photo', label: 'Photo' },
  { value: 'other', label: 'Other' }
];
```

**Option 2: Transform on the fly**
```javascript
// Before
const categories = ['midjourney', 'museum', 'photo'];
<wy-category-select .categories=${categories} />

// After
<wy-dropdown .options=${categories.map(c => ({value: c, label: c}))} />
```

**Option 3: Capitalize labels**
```javascript
<wy-dropdown .options=${categories.map(c => ({
  value: c,
  label: c.charAt(0).toUpperCase() + c.slice(1)
}))} />
```

### 4. Update Event Handlers

Event handling remains unchanged:

```javascript
// Both components use the same event API
dropdown.addEventListener('change', (e) => {
  console.log('Selected value:', e.detail.value);
});
```

### 5. Styling Considerations

#### Label Casing
The new component displays labels in **uppercase** by default (design system standard). Adjust your label text accordingly:

```html
<!-- Before -->
<wy-category-select label="Category" />

<!-- After (uppercase convention) -->
<wy-dropdown label="CATEGORY" />

<!-- Or without uppercase in HTML (component will style it) -->
<wy-dropdown label="Category" />
```

#### Layout
The capsule button design requires slightly more vertical space. Ensure adequate spacing around the component (minimum 8px margin recommended).

## Project-Specific Migration

### Plots Library (npm link)

**Files to update:**
- `components/metadata-editor.tsx` - Category select in metadata form
- `components/works-grid.tsx` - Category filter chips (if using dropdown)

**Steps:**
1. Update npm link: `npm link wy-family-office`
2. Replace `wy-category-select` instances
3. Transform category arrays to `{value, label}` format
4. Test category filtering in works grid
5. Rebuild: `npm run build`

**Example:**
```tsx
// Before
<wy-category-select
  label="Category"
  value={category}
  .categories={availableCategories}
  @change=${handleCategoryChange}
/>

// After
<wy-dropdown
  label="CATEGORY"
  value={category}
  .options=${availableCategories.map(cat => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1)
  }))}
  @change=${handleCategoryChange}
/>
```

### Prompts Library (CDN)

**Files to check:**
- `index.html` - Main prompt display (if using dropdowns)
- `test-*.html` - Test pages

**Steps:**
1. Hard refresh after CDN purge (Cmd+Shift+R)
2. Update any `wy-category-select` references
3. No rebuild needed (uses CDN directly)

### Weaver-Yuwono Home Page (CDN)

**Status:** No dropdowns currently in use. No migration needed.

## Testing Checklist

After migration, verify:

- [ ] Dropdown opens on click
- [ ] Dropdown closes on selection
- [ ] Keyboard navigation works (Arrow Up/Down, Enter, Escape)
- [ ] Selected value displays correctly
- [ ] `change` event fires with correct `event.detail.value`
- [ ] Focus states visible (3px outline)
- [ ] Disabled state works
- [ ] Dark mode styling correct
- [ ] Layout spacing adequate (no overlap/clipping)

## Rollback Plan

If issues arise, you can temporarily revert to `wy-category-select`:

1. **Plots library**: Revert component references, rebuild
2. **Prompts library**: Pin CDN to previous commit hash (see CLAUDE.md for CDN staleness fallback)
3. **File issue**: Document specific problem with screenshots/repro steps

## Support

- **Component docs**: See `src/data/components.json` for full API
- **Live examples**: Visit `/design-system.html` in the dev server
- **Color tokens**: See `src/styles/tokens.css` for all `--wy-dropdown-*` tokens

## Timeline

- **Design system update**: January 27, 2026
- **CDN propagation**: Immediate after purge
- **Plots migration**: Coordinate with next deployment
- **Prompts library**: Auto-updates on hard refresh

---

**Questions?** Check the component examples at `http://localhost:5173/design-system.html` or inspect `src/components/wy-dropdown.js` for implementation details.
