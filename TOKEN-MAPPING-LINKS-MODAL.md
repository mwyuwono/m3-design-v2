# Token Mapping Report: wy-links-modal Component

## Phase 1: Analysis & Planning

### Visual Analysis Summary

**Layout Structure:**
- Modal container: Centered, max-width 4xl (~896px), rounded corners
- Header: Title "AI Tools" with close button (top-right)
- Content: Vertical sections with category headings and horizontal chip groups
- Spacing: Generous padding (32px), large gaps between sections (40px)

**Typography Hierarchy:**
- Title: Playfair Display, 36px (text-4xl), medium weight
- Section Headers: Playfair Display, 20px (text-xl), medium weight
- Chip Labels: DM Sans, 14px (text-sm), medium weight

**Color Palette:**
- Modal Background: Warm Clay (#F5F2EA) / Dark (#1A1A17)
- Title Text: Dark stone (#121714) / Light (#F5F2EA)
- Section Headers: Dark stone (#121714) / Light (#F5F2EA)
- Active Chips: Primary green (#2C4C3B) with white text
- Inactive Chips: Light background with border, dark text
- Close Icon: Muted stone (#6B685F) / Light

**Interactive Elements:**
- Chips: Capsule shape (rounded-full), two states (active/inactive)
- Close Button: Icon-only, hover state changes color
- Hover states: Border color change, background color change

**Spacing Patterns:**
- Modal padding: 32px (p-8)
- Title margin-bottom: 48px (mb-12)
- Section spacing: 40px (space-y-10)
- Section header margin-bottom: 20px (mb-5)
- Chip gap: 12px (gap-3)
- Chip padding: 24px horizontal, 10px vertical (px-6 py-2.5)
- Close button position: 32px from top/right (top-8 right-8)

**Visual Details:**
- Border radius: Modal 16px (rounded-2xl), Chips 9999px (rounded-full)
- Shadow: Large shadow (shadow-2xl)
- Border: Subtle border (border-black/5 dark:border-white/10)
- Transitions: 200ms (duration-200)

---

## Token Mapping Table

| Original Value | Design System Token | Status | Notes |
|----------------|-------------------|--------|-------|
| **Colors** |
| `#2C4C3B` (primary) | `var(--md-sys-color-primary)` | ✅ Exists | Hunter Green |
| `#F5F2EA` (background-light) | `var(--md-sys-color-surface)` | ✅ Exists | Warm Clay |
| `#1A1A17` (background-dark) | `var(--md-sys-color-background)` | ✅ Exists | Dark mode background |
| `#D9D4C7` (accent-taupe) | `var(--md-sys-color-outline-variant)` | ✅ Exists | Border color |
| `#6B685F` (text-muted) | `var(--md-sys-color-text-muted)` | ✅ Exists | Muted text |
| `text-white` | `var(--md-sys-color-on-primary)` | ✅ Exists | White on primary |
| `text-stone-900` | `var(--md-sys-color-on-surface)` | ✅ Exists | Main text |
| `text-stone-800` | `var(--md-sys-color-on-surface)` | ✅ Exists | Section headers |
| `text-stone-700` | `var(--md-sys-color-on-surface-variant)` | ✅ Exists | Chip text |
| `text-stone-400` | `var(--md-sys-color-text-muted)` | ✅ Exists | Close icon |
| `text-stone-300` (dark) | `var(--md-sys-color-on-surface-variant)` | ✅ Exists | Dark mode chip text |
| `text-stone-100` (dark) | `var(--md-sys-color-on-surface)` | ✅ Exists | Dark mode title |
| `border-stone-700` (dark) | `var(--md-sys-color-outline-variant)` | ✅ Exists | Dark mode border |
| `border-stone-400` (dark hover) | `var(--md-sys-color-outline)` | ✅ Exists | Dark mode hover border |
| **Spacing** |
| `p-8` (32px) | `var(--spacing-xl)` | ✅ Exists | Modal padding |
| `mb-12` (48px) | `var(--spacing-2xl)` | ✅ Exists | Title margin-bottom |
| `space-y-10` (40px) | `var(--spacing-2xl)` | ⚠️ Approximate | Closest match (48px) |
| `mb-5` (20px) | `var(--spacing-lg)` | ⚠️ Approximate | Closest match (24px) |
| `gap-3` (12px) | `var(--spacing-md)` | ⚠️ Approximate | Closest match (16px) |
| `px-6` (24px) | `var(--spacing-lg)` | ✅ Exists | Chip horizontal padding |
| `py-2.5` (10px) | `var(--spacing-sm)` | ⚠️ Approximate | Closest match (8px) |
| `top-8 right-8` (32px) | `var(--spacing-xl)` | ✅ Exists | Close button position |
| **Typography** |
| `text-4xl` (36px) | `var(--md-sys-typescale-headline-large-size)` | ✅ Exists | Title size |
| `text-xl` (20px) | `var(--md-sys-typescale-title-medium-size)` | ✅ Exists | Section headers |
| `text-sm` (14px) | `var(--md-sys-typescale-label-medium-size)` | ✅ Exists | Chip labels |
| `font-medium` | `var(--md-sys-typescale-headline-large-weight)` | ✅ Exists | Title weight |
| `font-medium` (chips) | `500` | ✅ Exists | Chip weight |
| `playfair` | `var(--font-serif)` | ✅ Exists | Playfair Display |
| `sans` | `var(--font-sans)` | ✅ Exists | DM Sans |
| **Shape** |
| `rounded-2xl` (16px) | `var(--md-sys-shape-corner-medium)` | ✅ Exists | Modal border radius |
| `rounded-full` (9999px) | `var(--md-sys-shape-corner-full)` | ✅ Exists | Chip border radius |
| **Motion** |
| `duration-200` (200ms) | `var(--md-sys-motion-duration-short4)` | ✅ Exists | Transition duration |
| `transition-colors` | `transition: color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)` | ✅ Exists | Color transitions |
| `transition-transform` | `transition: transform var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)` | ✅ Exists | Transform transitions |
| `active:scale-95` | `transform: scale(0.95)` | ✅ Exists | Active state transform |
| **Shadows** |
| `shadow-2xl` | Custom shadow token needed | ⚠️ **Create** | Large modal shadow |
| **Borders** |
| `border-black/5` | `color-mix(in srgb, var(--md-sys-color-on-surface) 5%, transparent)` | ✅ Exists | Light mode border |
| `border-white/10` (dark) | `color-mix(in srgb, var(--md-sys-color-on-surface) 10%, transparent)` | ✅ Exists | Dark mode border |

---

## Missing Design System Assets

### New Tokens Needed

1. **Shadow Token for Modal Elevation**
   - **Name**: `--wy-modal-shadow-large` or use existing shadow pattern
   - **Value**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` (matching existing modal shadow)
   - **Rationale**: Large elevation shadow for modal dialogs
   - **Dark Mode**: May need adjustment for dark mode visibility

### Spacing Approximations

Some spacing values don't exactly match the 8px baseline grid:
- `space-y-10` (40px) → Using `--spacing-2xl` (48px) - slightly larger but acceptable
- `mb-5` (20px) → Using `--spacing-lg` (24px) - slightly larger but acceptable
- `gap-3` (12px) → Using `--spacing-md` (16px) - slightly larger but acceptable
- `py-2.5` (10px) → Using `--spacing-sm` (8px) - slightly smaller but acceptable

These approximations follow the design system's 8px baseline grid and maintain visual consistency.

---

## Component Structure

**Component Name**: `wy-links-modal`

**Props:**
- `open` (Boolean): Modal visibility state
- `title` (String): Modal title (default: "AI Tools")
- `links` (Array): Array of category objects with links

**Events:**
- `close`: Fired when modal closes
- `link-click`: Fired when a link chip is clicked

**Slots:**
- None (all content via props)

---

## Implementation Notes

1. **Modal Structure**: Use existing `wy-modal` pattern or create standalone modal
2. **Chip States**: Active chips use primary color, inactive chips use outlined style
3. **State Layers**: Use `::before` pseudo-elements for hover states (MD3 pattern)
4. **Font Imports**: Import Playfair Display and Material Symbols in Shadow DOM
5. **Dark Mode**: All colors must have dark mode variants
6. **Accessibility**: Focus states, keyboard navigation, ARIA labels

---

## Next Steps

1. ✅ Token mapping complete
2. ⏭️ Check if shadow token exists or create new one
3. ⏭️ Implement Web Component
4. ⏭️ Run Playwright tests
5. ⏭️ Verify dark mode
6. ⏭️ Generate deliverables
