# Components Library Refactor Prompt

Use this prompt in a new chat to refactor the components library page.

---

## Context

I have a components library page (`components-library.html`) that displays 25 web components organized into 5 categories. The page currently uses `ComponentLibraryRenderer` from `src/components-library.js` to dynamically render components from `src/data/components.json`.

**Current State:**
- Components are displayed in a paginated grid/list format
- There's a sidebar navigation that should be sticky but isn't working properly
- Components are filtered by category and search
- Each component shows examples, props, slots, events, and methods

**Design System:**
- Uses Material Design 3 tokens from `src/styles/tokens.css`
- Typography: Playfair Display (serif) for headings, DM Sans for body
- Colors: Hunter Green primary (#2D4E3C), Warm Clay surface (#F5F2EA), Alabaster background (#FDFBF7)
- **CRITICAL: No `!important` declarations allowed** - use proper CSS specificity instead (see `CLAUDE.md` CSS Quality Standards section)

## Goal

Refactor `components-library.html` to have a better navigation experience. Choose ONE of these approaches:

### Option A: Sticky Sidebar with Scrollable List (Recommended)
- **Left sidebar**: Sticky navigation showing all component categories (e.g., "Form & Input", "Layout & Navigation", "Cards & Content", "Modals & Overlays", "Specialized Components") with component counts
- **Main content**: Scrollable list showing ALL components (no pagination), organized by category with section headers
- When clicking a category in the sidebar, scroll to that section in the main content
- When scrolling, highlight the active category in the sidebar based on scroll position
- Search functionality filters both sidebar and main content

### Option B: Sidebar Page Switcher
- **Left sidebar**: Navigation showing all component categories
- **Main content**: Shows ONE category at a time (like tabs)
- Clicking a category in the sidebar switches the main content to show only that category's components
- Search works within the active category
- Smooth transitions between category views

## Requirements

1. **Sticky Sidebar**: Must work properly without `!important` - ensure parent containers don't have `overflow: hidden` or `position: relative` that would prevent sticky positioning
2. **Responsive**: On mobile (< 768px), sidebar should stack above content (not sticky)
3. **Visual Design**: Match the existing design system aesthetic - use Playfair Display for category headers, maintain spacing and colors
4. **Performance**: Components are rendered from JSON data, ensure efficient rendering
5. **Accessibility**: Proper heading hierarchy, keyboard navigation support
6. **Code Quality**: 
   - No `!important` declarations
   - Clean, maintainable CSS
   - Well-commented code
   - Follow existing patterns in `src/components-library.js`

## Files to Review

- `components-library.html` - Main page to refactor
- `src/components-library.js` - Component renderer class (may need updates)
- `src/data/components.json` - Component data structure
- `src/styles/tokens.css` - Design tokens
- `CLAUDE.md` - Project guidelines (especially CSS Quality Standards)

## Questions to Consider

1. Which approach (A or B) provides better UX for browsing 25 components?
2. Should search results show all matching components regardless of category, or filter by active category?
3. How should individual component detail views work (currently uses hash routing)?
4. Should pagination be removed entirely, or kept for very long lists?

## Expected Outcome

A refactored `components-library.html` with:
- Working sticky sidebar navigation
- Improved component browsing experience
- Clean, maintainable code following project standards
- Responsive design that works on mobile
- No `!important` declarations

---

**Note**: The current implementation has sticky positioning issues. Ensure the sidebar actually sticks when scrolling by checking parent container overflow properties and using proper CSS specificity.
