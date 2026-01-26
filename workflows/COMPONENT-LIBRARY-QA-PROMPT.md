# Component Library Layout Refactor - QA Checklist

## Context
The Component Library page (`components-library.html`) has been refactored from a dual-sidebar layout to a standard documentation layout. Please verify that all requirements have been satisfied.

## Original Requirements

### 1. Sticky Global Header
**Requirement:** Create a sticky global header that spans 100% width with:
- "← Back to Design System" link moved from sidebar
- "Weaver-Yuwono" branding moved from sidebar
- "Components Library" title moved from sidebar
- Sticky positioning (`position: sticky`, `top: 0`, high `z-index`)
- Backdrop blur effect (`backdrop-filter: blur(10px)`)
- Subtle bottom border for separation
- Elegant text link styling for "Back" button (not a heavy button)
- Subtle hover interaction on "Back" link

**Files to check:**
- `components-library.html` - Look for `<header class="global-header">` element
- CSS for `.global-header` class
- CSS for `.global-header-back` class

**Verification:**
- [ ] Header exists and contains branding + Back link
- [ ] Header sticks to top when scrolling page
- [ ] Backdrop blur effect is visible/applied
- [ ] Bottom border is present
- [ ] "Back" link has text link styling (not button appearance)
- [ ] "Back" link has hover effect (color change + state layer)
- [ ] Header spans full width (100%)

### 2. Consolidated Sidebar
**Requirement:** Remove the outer sidebar entirely and keep ONLY the component navigation sidebar:
- Remove the far-left outer sidebar (`.ds-sidebar` with Typography, Palette links)
- Keep only the "Components" navigation sidebar (`#component-library-nav`)
- Sidebar should be sticky on left side (width: 280px-320px)
- Sidebar should be independently scrollable (`overflow-y: auto`)
- Search bar moved to top of sidebar (or could be in header, but plan specified sidebar)

**Files to check:**
- `components-library.html` - Verify `<aside class="ds-sidebar">` is removed
- `components-library.html` - Verify `#component-library-nav` exists in main
- `src/components-library.js` - Check `renderNavigation()` includes search input
- CSS for `#component-library-nav` - Check sticky positioning and overflow

**Verification:**
- [ ] Outer `.ds-sidebar` element is completely removed from HTML
- [ ] `.ds-sidebar` CSS rules are removed
- [ ] Only one sidebar exists (`#component-library-nav`)
- [ ] Sidebar is sticky positioned on left side
- [ ] Sidebar width is approximately 280-320px (check CSS `grid-template-columns`)
- [ ] Sidebar has `overflow-y: auto` for independent scrolling
- [ ] Search input is at top of sidebar (before "Components" heading)
- [ ] Component count displays below search in sidebar
- [ ] Sidebar scrolls independently from main content

### 3. Expanded Main Content Area
**Requirement:** Main content should take up remaining width with generous padding:
- Use CSS Grid: `grid-template-columns: 300px 1fr` (or 320px 1fr)
- Add generous padding: `clamp(2rem, 4vw, 4rem)` to main content
- Remove max-width constraints that compress content
- Typography should feel "architectural" and spacious

**Files to check:**
- `components-library.html` - Check `main` element CSS
- `components-library.html` - Check `.main-content` wrapper CSS
- Verify grid layout structure

**Verification:**
- [ ] Main content uses CSS Grid layout
- [ ] Grid columns: sidebar (320px) + main content (1fr)
- [ ] Main content has generous padding: `clamp(2rem, 4vw, 4rem)`
- [ ] No max-width constraints compressing content
- [ ] Typography spacing feels spacious/architectural
- [ ] Content area takes full remaining width

### 4. Styling Refinements
**Requirement:** Maintain heritage/modern aesthetic:
- Serif headings (Playfair Display)
- Earth tones (design system colors)
- Use design system tokens (no hardcoded colors)
- No `!important` declarations
- Proper CSS specificity
- Motion tokens for transitions

**Files to check:**
- `components-library.html` - Check all CSS
- `src/components-library.js` - Check inline styles use tokens

**Verification:**
- [ ] Playfair Display used for headings
- [ ] All colors use CSS custom properties (e.g., `var(--md-sys-color-primary)`)
- [ ] No hardcoded hex colors (except in design tokens)
- [ ] No `!important` declarations found
- [ ] Transitions use motion tokens (e.g., `var(--md-sys-motion-duration-short2)`)
- [ ] Design maintains heritage/modern aesthetic

### 5. Mobile Responsive
**Requirement:** On mobile (< 768px):
- Header content stacks vertically
- Main grid becomes single column (`grid-template-columns: 1fr`)
- Sidebar becomes non-sticky, full-width above content
- Adjusted padding for mobile

**Files to check:**
- `components-library.html` - Check `@media (max-width: 768px)` rules

**Verification:**
- [ ] Mobile breakpoint exists at 768px
- [ ] Header stacks vertically on mobile
- [ ] Main grid becomes single column on mobile
- [ ] Sidebar is non-sticky on mobile (position: relative)
- [ ] Sidebar appears full-width above content on mobile
- [ ] Padding adjusted appropriately for mobile

### 6. Functional Requirements
**Requirement:** All functionality should work correctly:
- Search input filters components (in sidebar)
- Category navigation scrolls to sections
- Scroll spy highlights active category
- Component counts update with search
- Filter chips work correctly
- No broken event listeners

**Files to check:**
- `src/components-library.js` - Check `renderNavigation()`, `renderFilters()`, `attachSearchListener()`
- Verify search input has event listener attached
- Verify scroll spy offset updated for new header

**Verification:**
- [ ] Search input in sidebar filters components correctly
- [ ] Component counts update when searching
- [ ] Category links scroll to correct sections
- [ ] Scroll spy highlights active category in sidebar
- [ ] Filter chips (category buttons) work correctly
- [ ] Search value persists when navigation re-renders
- [ ] Scroll spy offset accounts for new header height (104px)

## Code Quality Checks

### CSS Architecture
- [ ] No nested grids (removed `.component-library-wrapper` grid)
- [ ] CSS Grid used for main layout
- [ ] Proper specificity (no `!important`)
- [ ] Responsive with `clamp()` for fluid sizing
- [ ] CSS custom properties used throughout

### JavaScript Architecture
- [ ] Search moved from `renderFilters()` to `renderNavigation()`
- [ ] Search listener properly attached after navigation renders
- [ ] Scroll spy offset updated for new header
- [ ] No broken references or missing elements

### HTML Structure
- [ ] Clean semantic HTML structure
- [ ] No duplicate sidebars
- [ ] Proper heading hierarchy maintained
- [ ] Accessible markup (links, buttons properly labeled)

## Visual/UX Checks

### Layout
- [ ] Page no longer feels compressed
- [ ] Generous spacing throughout
- [ ] Clear visual hierarchy
- [ ] Sidebar doesn't compete with main content for space

### Typography
- [ ] Headings use Playfair Display (serif)
- [ ] Body text uses DM Sans
- [ ] Spacing feels "architectural" and spacious
- [ ] Text is readable and well-sized

### Colors & Aesthetics
- [ ] Heritage/modern aesthetic maintained
- [ ] Earth tones (Hunter Green, Warm Clay, Alabaster)
- [ ] Consistent with design system
- [ ] No jarring color changes

## Testing Instructions

1. **Open the page:** Navigate to `components-library.html` in browser
2. **Check header:** Scroll page - header should stick to top
3. **Check sidebar:** Scroll page - sidebar should stick on left, scroll independently
4. **Test search:** Type in search box - components should filter, counts update
5. **Test navigation:** Click category links - should scroll to sections
6. **Test scroll spy:** Scroll page - active category should highlight in sidebar
7. **Test mobile:** Resize browser to < 768px - layout should stack vertically
8. **Test filters:** Click category filter chips - should filter components

## Expected File Structure

```
components-library.html
├── <header class="global-header">
│   ├── Branding (Weaver-Yuwono + Components Library)
│   └── Back link
└── <div class="ds-layout">
    └── <main>
        ├── <aside id="component-library-nav"> (sidebar with search + nav)
        └── <div class="main-content">
            ├── Section header
            ├── Filter chips
            └── Component listings
```

## Success Criteria

All requirements are satisfied if:
- ✅ Single sidebar layout (no dual sidebars)
- ✅ Sticky header with branding and Back link
- ✅ Search in sidebar (not in main content filters)
- ✅ Generous main content padding
- ✅ Mobile responsive
- ✅ All functionality works
- ✅ Design system tokens used
- ✅ No `!important` declarations
- ✅ Code is clean and maintainable

## Notes for QA

- The original layout had TWO sidebars competing for space - this should now be ONE sidebar
- Search was originally in the main content filters area - it should now be in the sidebar
- The outer sidebar with "Typography", "Palette" links should be completely removed
- Header should be a new element, not part of the sidebar
- Main content should feel much more spacious than before
