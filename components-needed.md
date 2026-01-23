# Components Summary for Google Stitch

This document outlines the core components in Plotter Library with their functional requirements and structural details. The goal is to retain existing structure and behavior while redesigning visual appearance in Google Stitch.

---

## Core UI Components (`components/ui/`)

### Button (`button.tsx`)

**Purpose**: Multi-variant action button with MD3 states

**Props**:
- `variant`: 'primary' | 'secondary' | 'ghost' | 'backup' | 'danger'
- `size`: 'tiny' (24px) | 'small' (32px) | 'medium' (40px) | 'large' (48px)
- `icon`: Optional Material Symbol icon name
- `children`: Button text (omit for icon-only)
- Standard HTMLButtonElement attributes (onClick, disabled, type, etc.)

**Structural Requirements**:
- Icon-only buttons get compact padding, require `aria-label`
- Loading state shows "…" suffix (e.g., "Saving…")
- Disabled state applies 0.5 opacity
- Requires `position: relative` and `overflow: hidden` for state layers

**Interactive Behaviors**:
- Hover/focus/pressed states via pseudo-element overlays
- Focus-visible outline (3px solid, 2px offset)
- Ripple effect on click (optional enhancement)

---

### Modal (`modal.tsx`)

**Purpose**: Portal-based overlay dialog system

**Props**:
- `open`: boolean
- `onClose`: callback (Escape key or backdrop click)
- `title`: string (omit for lightbox style)
- `children`: modal content
- `disableClose`: boolean (prevent backdrop dismiss)
- `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
- `showCloseButton`: boolean (default true when title present)

**Structural Requirements**:
- Portal to `#modal-root` or `document.body`
- Backdrop overlay (semi-transparent)
- Content container with max-height, vertical scroll
- Optional header with title + close button
- Footer slot for actions (primary right-aligned)

**Interactive Behaviors**:
- Prevents body scroll when open
- Escape key closes modal (unless disableClose)
- Backdrop click closes modal (unless disableClose)
- Animated entrance/exit
- Focus trap (first focusable element gets focus on open)

---

### FormField (`form-field.tsx`)

**Purpose**: Wrapper for form controls with label, description, and error handling

**Props**:
- `id`: string (required)
- `label`: string
- `children`: single input element
- `description`: optional helper text
- `error`: optional error message
- `required`: boolean (shows asterisk)

**Structural Requirements**:
- Label rendered as `<label htmlFor={id}>`
- Description below label (if present)
- Error message below input (if present)
- Automatically injects `id` and `aria-describedby` into child input

**Accessibility**:
- Associates label with input via htmlFor/id
- Links description/error with input via aria-describedby
- Error state adds `aria-invalid="true"` to input

---

### FilterChip (`filter-chip.tsx`)

**Purpose**: Toggleable filter button for library filtering

**Props**:
- `label`: string
- `active`: boolean
- `onClick`: callback

**Structural Requirements**:
- Single button element
- Active/inactive visual states
- Optional count badge (e.g., "figure study (5)")

**Interactive Behaviors**:
- Click toggles filter on/off
- Active state persists across page loads (via URL params)
- Hover state shows state layer

---

### EditableFilterChip (`editable-filter-chip.tsx`)

**Purpose**: Filter chip with inline rename/delete actions

**Props**:
- `label`: string
- `count`: number (usage count)
- `active`: boolean
- `onClick`: callback (toggle filter)
- `onRename`: async callback (newName)
- `onDelete`: async callback
- `type`: 'tag' | 'category'
- `size`: 'small' | 'medium'

**Structural Requirements**:
- Toggle mode: view (button) vs edit (input field)
- Hover menu with rename/delete actions (view mode only)
- Confirmation dialog for delete
- Count badge (shows "(5)")
- Loading spinner during async operations

**Interactive Behaviors**:
- Click toggles filter (view mode)
- Rename button enters edit mode (focus input, select all text)
- Enter key saves rename, Escape cancels
- Delete shows confirmation dialog ("Delete [type] '[label]'?")
- Disabled state during loading prevents double-submit

---

### TagInput (`tag-input.tsx`)

**Purpose**: Autocomplete tag input with suggestions

**Props**:
- `tags`: Array<{ value: string, source: 'ai-generated' | 'user-entered' }>
- `onChange`: callback (updatedTags)
- `disabled`: boolean
- `placeholder`: string

**Structural Requirements**:
- Text input field
- Tag chips displayed inline before cursor
- Dropdown suggestions below input (up to 8 matches)
- Each suggestion shows tag name + usage count "(12)"

**Interactive Behaviors**:
- Type to filter suggestions (case-insensitive)
- Arrow keys navigate suggestions
- Enter/click selects suggestion and adds tag
- Comma or Enter (no suggestion) adds custom tag
- Backspace on empty input removes last tag
- Delete button on tag chips removes individual tags
- Escape closes suggestions dropdown
- Prevents duplicate tags
- Fetches available tags from `/api/tags` on mount

**Accessibility**:
- `role="combobox"` on input
- `role="listbox"` on suggestions dropdown
- `aria-activedescendant` tracks highlighted option
- `aria-label` on tag delete buttons

---

### CategorySelect (`category-select.tsx`)

**Purpose**: Dropdown with search/filter for category selection

**Props**:
- `value`: string
- `onChange`: callback (newValue)
- `disabled`: boolean
- `placeholder`: string
- `categories`: string[] (fetched from API)

**Structural Requirements**:
- Text input showing current value
- Dropdown list of categories
- Filters list as user types
- Allows custom values not in list

**Interactive Behaviors**:
- Focus shows all categories
- Type to filter (case-insensitive substring match)
- Arrow keys navigate options
- Enter selects highlighted option
- Click selects option
- Blur/Escape closes dropdown
- Syncs external value changes (controlled component)

---

### NumericField (`numeric-field.tsx`)

**Purpose**: Number input with unit suffix and validation

**Props**:
- `id`: string
- `label`: string
- `value`: number
- `onChange`: callback (newValue: number)
- `unit`: string (e.g., "in", "mm", "%")
- `min`: number
- `max`: number
- `step`: number (default 0.125)
- `disabled`: boolean

**Structural Requirements**:
- FormField wrapper (label, error, description)
- Input type="number" with unit suffix displayed inline
- Validation for min/max range

**Interactive Behaviors**:
- Parses string input to float
- Rounds to step precision
- Shows unit suffix adjacent to input (e.g., "5.5 in")
- Calls onChange with number value (not string)

---

### TagChip (`tag-chip.tsx`)

**Purpose**: Individual tag display with optional delete

**Props**:
- `tag`: { value: string, source: 'ai-generated' | 'user-entered' }
- `variant`: 'ai-generated' | 'user-entered'
- `onRemove`: optional callback
- `readOnly`: boolean (hides delete button)

**Structural Requirements**:
- Chip container with tag text
- Optional delete button (X icon)
- Visual distinction for AI vs user tags

**Interactive Behaviors**:
- Delete button removes tag (calls onRemove)
- Read-only mode hides delete button
- Different styling for AI-generated tags (e.g., dashed border)

---

### IconButton (`icon-button.tsx`)

**Purpose**: Icon-only button with size/color variants

**Props**:
- `size`: 'small' | 'medium' | 'large'
- `color`: 'default' | 'primary' | 'error'
- `icon`: Material Symbol name
- `label`: string (used for title attribute)
- Standard HTMLButtonElement attributes

**Structural Requirements**:
- Requires `aria-label` for accessibility
- Icon rendered as Material Symbol
- Compact padding (no text)

**Interactive Behaviors**:
- Hover/focus states
- Click triggers onClick callback
- Title tooltip on hover (uses `label` prop)

---

### SelectionCard (`selection-card.tsx`)

**Purpose**: Radio button styled as visual card with icon/description

**Props**:
- `id`: string
- `name`: string (radio group name)
- `value`: string
- `checked`: boolean
- `onChange`: callback
- `label`: string
- `description`: string
- `icon`: ReactNode (SVG or Material Symbol)

**Structural Requirements**:
- Hidden radio input
- Visual card container with icon, label, description
- Selected state styling
- Keyboard navigation support

**Interactive Behaviors**:
- Click card selects radio option
- Keyboard: Space/Enter selects
- Focus-visible outline
- One option selected at a time (radio group behavior)

**SelectionCardGroup Wrapper**:
- Groups multiple SelectionCards
- Ensures single selection
- Provides shared name prop

---

### FileUploadZone (`file-upload-zone.tsx`)

**Purpose**: Drag-and-drop file upload with click-to-browse fallback

**Props**:
- `label`: string
- `accept`: string (MIME types or extensions, e.g., "image/*,.svg")
- `multiple`: boolean
- `onFileSelect`: callback (files: File[])
- `currentFiles`: File[] (for preview)
- `preview`: ReactNode (custom preview component)
- `disabled`: boolean

**Structural Requirements**:
- Drop zone container with dashed border
- Hidden file input element
- Preview area (custom or default placeholder)
- Drag state visual feedback

**Interactive Behaviors**:
- Drag-and-drop files over zone
- Click zone opens file browser
- Validates file types against `accept` string
- Filters selected files by MIME type/extension
- Calls `onFileSelect` with File array
- Visual feedback during drag (highlight border)

---

## Feature Components

### WorksGrid (`works-grid.tsx`)

**Purpose**: Main library view with filtering, search, selection, and bulk operations

**Props**:
- `initialWorks`: Work[]
- `showFilters`: boolean
- `onFilterCountChange`: callback (count: number)
- `density`: 'compact' | 'comfortable' | 'spacious'
- `useInfiniteScroll`: boolean

**Structural Requirements**:
- Three filter sections: Status, Category, Tags
- Search input (debounced 300ms)
- Masonry grid of WorkCards
- Selection toolbar (appears when items selected)
- Load more button or infinite scroll
- Empty state when no works match filters

**State Management**:
- `activeFilters`: Set<string> (status filters)
- `activeTags`: Set<string>
- `activeCategories`: Set<string>
- `searchQuery`: string
- `selectedWorks`: Set<string> (work IDs)
- `currentPage`: number
- Persists filters in URL params (?tag=X&category=Y&search=Z&page=N)

**Interactive Behaviors**:

**Filtering (OR Logic)**:
- Show works matching ANY active filter (Status ∪ Category ∪ Tags)
- Click filter chip toggles it on/off
- Filters reset pagination to page 1
- Filter changes update URL params
- Active filter count displayed in LibraryHeader badge

**Search**:
- Searches title, description, tags (case-insensitive)
- Debounced 300ms
- Clear button resets search
- Updates URL param ?search=

**Selection**:
- Click checkbox: toggle single work
- Shift+Click: select range from last clicked to current
- Cmd/Ctrl+A: select all visible works
- Selection state stored in SelectionStore (pub/sub pattern)

**Bulk Operations Toolbar** (appears when selection > 0):
- Favorite / Unfavorite
- Archive / Unarchive
- Add Tags (autocomplete input)
- Remove Tag (dropdown of common tags in selection)
- Clear All Tags
- Cancel Selection

**Pagination**:
- Load more button shows 20 more works per click
- Infinite scroll option (loads on viewport intersection)
- Page number in URL (?page=2)
- Scroll position preserved on navigation

**Tag/Category Management**:
- Rename tag/category (updates all works using it)
- Delete tag/category (removes from all works)
- Confirmation dialogs for destructive actions
- Loading states during async operations

---

### WorkCard (`work-card.tsx`)

**Purpose**: Individual work preview in grid

**Props**:
- `data`: Work object
- `index`: number (for lazy loading)
- `selectionStore`: SelectionStore instance
- `onToggleSelection`: callback (workId, event)
- `onToggleFavorite`: callback (workId)
- `currentPage`: number (for navigation state)
- `eagerLoad`: boolean (skip lazy loading)

**Structural Requirements**:
- Thumbnail image with focal point positioning
- Checkbox for selection (top-left)
- Favorite heart button (top-right, hollow/filled)
- Title (truncated to 25 chars)
- Variant count badge (e.g., "3 variants")
- Modified date (relative or absolute)
- Status badges: "Ready", "Backlog" (not shown for needs-review/archived)
- Placeholder for missing images

**Interactive Behaviors**:
- Click card navigates to detail page (preserves ?page= param)
- Click checkbox toggles selection
- Shift+Click checkbox selects range
- Click heart toggles favorite
- Lazy loading via IntersectionObserver (600px threshold)
- Memo-wrapped for performance (only re-renders on prop changes)

---

### MetadataPanel (`metadata-panel.tsx`)

**Purpose**: AI-powered metadata suggestion assistant

**Props**:
- `work`: Work object (includes reference images, existing metadata)
- `onClose`: callback

**Structural Requirements**:
- Mode toggle: "Automatic" vs "Manual Assist"
- Current metadata display (title, description, tags)
- Suggestion display (when available)
- Apply/discard controls
- Tag removal controls (both current and suggested)
- Error messages
- Loading state

**State Management**:
- `mode`: 'automatic' | 'manual' (persisted in localStorage)
- `isLoading`: boolean
- `suggestion`: { title, description, tags } | null
- `prompt`: string (for manual mode)
- `manualInput`: string (JSON paste area)
- `errors`: string[]
- `copyStatus`: 'idle' | 'copied'

**Interactive Behaviors**:

**Automatic Mode**:
1. Click "Generate with AI" button
2. Sends primary reference image + existing metadata to `/api/metadata/generate`
3. Receives suggestion: { title, description, tags }
4. Shows suggestion in preview card
5. User can remove individual tags from suggestion
6. Click "Apply Suggestions" updates work metadata
7. Router.refresh() to show changes

**Manual Assist Mode**:
1. Click "Generate Prompt" button
2. Formats prompt with work context
3. Copies prompt to clipboard (shows "Copied!" feedback)
4. User pastes prompt into Gemini/ChatGPT manually
5. User copies JSON response back
6. Pastes into textarea
7. Click "Apply from JSON" validates and updates metadata

**Tag Management**:
- Delete button on current tags removes from work
- Remove button on suggested tags excludes from application
- Tag chips color-coded by source (ai-generated vs user-entered)

**Error Handling**:
- API errors shown inline
- JSON parse errors shown for manual paste
- Auto-dismiss success messages after 3 seconds

---

### PlotsSection (`plots-section.tsx`)

**Purpose**: Variant and plot configuration management hub

**Props**:
- `workId`: string
- `variantId`: string (currently selected)
- `plots`: MasterConfig[] (for current variant)
- `availableVariants`: VariantInfo[]
- `onVariantChange`: callback (newVariantId)

**Structural Requirements**:
- Variant selector tabs (v1, v2, v3...) + "New Variant" button
- Upload button when no plots exist
- Grid of PlotCards (when plots exist)
- ExportModal (triggered by upload or edit)
- PlotConfigurationDialog (for editing plot settings)
- Delete variant button (v2+ only, shown in empty state)

**State Management**:
- `exportState`: { isOpen, mode: 'upload' | 'replace', plotId? }
- `dialogState`: { isOpen, mode: 'edit' | 'duplicate', plot? }
- `isCreatingVariant`: boolean
- `isDeletingVariant`: boolean
- `variantError`: string | null

**Interactive Behaviors**:

**Variant Management**:
- Click variant tab switches active variant
- Click "New Variant" creates v2, v3, etc. sequentially
- Delete empty variant (v2+) removes directory
- v1 is permanent (cannot be deleted)
- Variant creation/deletion shows loading state

**Plot Upload/Replace**:
- "Upload SVG" button (empty state) opens ExportModal in upload mode
- ExportModal processes SVG, saves to variant directory
- Creates `variant.json` with plot configuration
- Refreshes page to show new plot

**Plot Configuration**:
- Edit button on PlotCard opens PlotConfigurationDialog
- Dialog shows all export settings (paper, margins, placement, scale, buckets)
- Save updates `variant.json.masters` array
- Router.refresh() to show changes

**Plot Actions**:
- Duplicate creates copy with "-copy" suffix
- Delete removes from `variant.json.masters` array
- Rename edits the `name` field
- All actions show loading states
- Errors displayed inline

---

### PlotCard (`plot-card.tsx`)

**Purpose**: Single plot configuration display with preview and controls

**Props**:
- `workId`: string
- `plot`: MasterConfig object
- `isMaster`: boolean (true for master.svg, false for copies)
- Callbacks: onDuplicateConfig, onReplaceFile, onDuplicate, onDelete, onSaveNotes, onRename, onEdit

**Structural Requirements**:
- Preview thumbnail with rotation/flip applied
- Badge: "Primary" (master.svg) or "Alternate" (copy)
- Metrics section:
  - Paper dimensions (width × height)
  - Artwork dimensions (width × height)
  - Natural size (original SVG viewBox)
- 3-dot menu button (top-right)
- Inline notes editor (textarea with Save/Cancel)
- Warning badges for oversized artwork or clipped masks
- Full-screen preview modal (triggered by clicking thumbnail)

**State Management** (via usePlotCardState hook):
- `cardState`: 'idle' | 'duplicating' | 'deleting' | 'saving-notes' | 'renaming' | 'replacing'
- `isRenaming`: boolean
- `nameInput`: string
- `isEditingNotes`: boolean
- `notes`: string
- `menuOpen`: boolean
- `errors`: string[]

**Interactive Behaviors**:

**Menu Actions**:
- Rename: Inline input with Enter/Escape shortcuts
- Edit Configuration: Opens PlotConfigurationDialog
- Duplicate: Creates copy with "-copy" suffix, refreshes page
- Replace File: Opens ExportModal in replace mode
- Delete: Confirmation dialog, removes from variant.json

**Notes Editing**:
- Click "Edit Notes" enters edit mode (focus textarea)
- Cmd/Ctrl+Enter saves notes
- Save button updates `variant.json.masters[].notes`
- Cancel discards changes

**Preview**:
- Click thumbnail opens PlotPreviewModal
- Modal shows full SVG with zoom controls
- Escape/backdrop click closes modal

**Validation Warnings**:
- Oversized artwork: artwork dimensions exceed paper dimensions
- Clipped mask: paths extend beyond viewBox bounds
- Warnings shown as yellow badges below metrics

---

### ExportModal (`export-modal.tsx`)

**Purpose**: Comprehensive SVG export configuration and preview

**Props**:
- `workId`: string
- `variantId`: string
- `masterFile`: string (filename of SVG to process)
- `onClose`: callback

**Layout**:
- 2-column responsive layout (45% controls / 55% preview)
- Sticky preview panel (scrolls independently)

**Structural Requirements**:

**Left Column (Controls)**:
1. **PaperSettings**: Presets + custom width/height
2. **MarginSettings**: Top/Right/Bottom/Left numeric inputs
3. **PlacementSettings**: SelectionCards for placement options
4. **ScaleSettings**: SelectionCards for scale modes + custom %
5. **BucketSelector**: Layer filtering, naming, reordering

**Right Column (Preview)**:
1. **ExportPreview**: Live SVG rendering
2. Zoom controls (50%, 75%, 100%, 150%, 200%, 300%, Reset)
3. Metrics overlay (paper dimensions, artwork dimensions, warnings)

**State Management** (via useExportState hook):
- Paper: width, height, preset
- Margins: top, right, bottom, left
- Placement: 'top-left' | 'center-h' | 'center-v' | 'center-both'
- Scale: mode ('fit-width' | 'fit-margins' | 'custom' | 'use-default'), customPercentage
- Buckets: array of { id, color, width, paths, name, enabled, order }
- Preview: zoom level, SVG data URL, loading state
- Validation: errors array

**Interactive Behaviors**:

**Paper Settings**:
- Preset buttons set common sizes (Letter, A4, etc.)
- Custom width/height inputs (inches)
- Switching preset overwrites custom values

**Placement**:
- Visual SelectionCards with icons
- Single selection (radio group)
- Options: top-left (with margins), center-h, center-v, center-both

**Scale**:
- Fit to Width: scales artwork to paper width minus margins
- Fit to Margins: scales to fit within margins (preserves aspect ratio)
- Custom: manual percentage input
- Use Default: uses original SVG dimensions

**Bucket Selector**:
- Fetches stroke buckets from `/api/buckets?file={masterFile}`
- Each bucket shows: color preview, stroke width, path count
- Toggle checkbox enables/disables bucket in export
- Name input for layer naming (optional)
- Up/Down buttons reorder buckets (affects layer stacking)
- Select All / Clear All controls

**Live Preview**:
- Real-time SVG rendering in white canvas
- Zoom controls (6 presets + reset)
- Metrics: paper size, artwork size, natural size
- Warnings: oversized, clipped, transform issues
- Updates on any setting change

**Export**:
- Click "Export SVG" triggers `/api/export` with all settings
- Receives processed SVG file
- Downloads with filename: `{workId}_{variantId}_plot-{width}x{height}in_{date}.svg`
- Updates `variant.json.masters` array with new configuration
- Closes modal on success

**Validation**:
- Paper dimensions > 0
- Margins fit within paper (paper - margins > 0)
- Custom scale percentage 1-500%
- At least one bucket enabled
- Shows errors inline (no export until valid)

---

### LibraryHeader (`library-header.tsx`)

**Purpose**: Top navigation bar with filters, search, and backup status

**Props**:
- `showFilters`: boolean
- `onToggleFilters`: callback
- `activeFilterCount`: number
- `searchQuery`: string
- `onSearchChange`: callback (query)
- `isScrolled`: boolean (adds shadow when page scrolled)
- `scrollingUp`: boolean (shows/hides right section)
- `viewControls`: ReactNode (density, view mode controls)

**Structural Requirements**:
- Left section: Title "Artworks"
- Center section: Filter toggle button, search input
- Right section: Add Work button, Backup status widget
- Sticky positioning (top of viewport)
- Shadow when scrolled

**Interactive Behaviors**:

**Filter Toggle**:
- Button shows filter icon
- Badge displays active filter count (if > 0)
- Click toggles filter panel visibility

**Search**:
- Input debounced 300ms
- Clear button (X) resets search
- Updates URL param ?search=
- Focus outline on active

**Add Work Button**:
- Opens AddWorkModal
- Large plus icon + "Add Work" text

**Scroll Behavior**:
- Right section (Add Work + Backup) hides on scroll down
- Right section returns on scroll up
- Smooth transition (300ms)

---

### BackupStatus (`backup-status.tsx`)

**Purpose**: Git/GitHub backup status and controls widget

**Props**: None (fetches from `/api/backup/status`)

**Structural Requirements**:

**Collapsed State** (always visible):
- Pill button with status dot + text
- Status variants: success (green), warning (yellow), error (red)
- Click expands to show full controls

**Expanded State**:
- Backup Now button (primary action)
- Pull button (if behind remote)
- GitHub remote URL input/display
- Status section with warnings
- Help button (opens token rotation guide modal)

**State Management**:
- `status`: BackupStatus object
- `isBackingUp`: boolean
- `isPulling`: boolean
- `message`: string | null
- `remoteUrlInput`: string
- `isExpanded`: boolean
- `showHelp`: boolean
- Polls `/api/backup/status` every 30 seconds

**Interactive Behaviors**:

**Backup Now**:
- Disabled if: already syncing, no remote, needs pull, auth failed
- Click triggers `/api/backup/run`
- Shows loading spinner during backup
- Success/error message displayed inline
- Auto-collapses after successful backup

**Pull**:
- Only shown if `status.behindBy > 0`
- Click triggers `/api/backup/pull`
- Shows loading spinner
- Refreshes status after completion

**Remote Management**:
- Input field for GitHub HTTPS URL
- Save button commits remote to git config
- Remove button deletes remote (with confirmation)
- Validates URL format (must be github.com HTTPS)

**Status Variants**:
- **Success** (green): Clean working tree, up-to-date with remote
- **Warning** (yellow): Uncommitted changes pending, or ahead of remote
- **Error** (red): Auth failed (needs token), behind remote (needs pull), no remote configured

**Help Modal**:
- Step-by-step GitHub token rotation guide
- Code snippets for git commands
- Environment variable instructions
- Close button

---

## Interactive Behavior Patterns

### Multi-Filter OR Logic (WorksGrid)

Show works matching ANY active filter across all filter types:
```
displayed = works matching (activeFilters ∪ activeTags ∪ activeCategories)
```

**Example**:
- Active filters: `favorite`, `ready`, `tag:portrait`, `category:museum`
- Work must match at least ONE of these to be displayed
- Work with `status=backlog, tags=[portrait]` → SHOWN (matches tag filter)
- Work with `status=ready, tags=[landscape]` → SHOWN (matches status filter)
- Work with `status=backlog, tags=[landscape]` → HIDDEN (matches none)

**Special Cases**:
- Archived works only shown when "Archived" filter is active
- Search query applies as additional AND filter (all filters AND search)

---

### Selection with Shift-Click Range

**Click**: Toggle single item
**Shift+Click**: Select all items between last clicked and current
**Cmd/Ctrl+A**: Select all visible items

**Implementation** (SelectionStore pattern):
```typescript
interface SelectionStore {
  selectedIds: Set<string>
  lastClickedId: string | null

  toggle(id: string, shiftKey: boolean, allVisibleIds: string[]): void
  selectAll(allVisibleIds: string[]): void
  clear(): void
}
```

**Range Selection Logic**:
1. Find index of `lastClickedId` in visible works array
2. Find index of clicked `id`
3. Select all works between indices (inclusive)
4. Update `lastClickedId` to current `id`

---

### Keyboard Navigation in Dropdowns

**CategorySelect** and **TagInput** share this pattern:

**Arrow Keys**:
- Down: highlight next option (wrap to first)
- Up: highlight previous option (wrap to last)
- No option highlighted by default (first Down highlights first option)

**Enter**:
- Select highlighted option
- If no highlight, treat as custom value (CategorySelect) or add tag (TagInput)
- Close dropdown after selection

**Escape**:
- Close dropdown without selection
- Clear input filter (return to showing all options)

**Click**:
- Select clicked option
- Close dropdown

**Blur**:
- Close dropdown
- Preserve current value (CategorySelect)
- Do not add partial input as tag (TagInput)

---

### Async Operation States

All async operations (save, delete, rename, backup, etc.) follow this pattern:

**States**:
1. **Idle**: Default, no operation in progress
2. **Loading**: Operation triggered, waiting for response
3. **Success**: Operation completed successfully
4. **Error**: Operation failed with error message

**UI Patterns**:
- **Loading**: Disable button, show spinner or "…" suffix, prevent double-submit
- **Success**: Show success message, auto-dismiss after 3 seconds, router.refresh()
- **Error**: Show error message inline, keep form open for retry, log details to console

**Example** (PlotCard delete):
```typescript
const handleDelete = async () => {
  setCardState('deleting') // Loading
  try {
    await fetch(`/api/works/${workId}/plots/${plot.name}`, { method: 'DELETE' })
    router.refresh() // Success
    setCardState('idle')
  } catch (error) {
    setErrors([error.message]) // Error
    setCardState('idle')
  }
}
```

---

### URL State Persistence

**WorksGrid** persists filter/search/pagination state in URL params:

**Params**:
- `?tag=figure-study&tag=portrait` (multiple allowed)
- `?category=museum&category=midjourney` (multiple allowed)
- `?status=ready&status=favorite` (multiple allowed)
- `?search=torso` (single value)
- `?page=2` (single value)

**Behavior**:
- Filter changes push new URL (replaces history)
- Navigation preserves filters (e.g., click work card keeps ?page=2)
- Direct link with params loads filters on page load
- Clear filters resets URL to base path

**Implementation**:
```typescript
const updateURL = () => {
  const params = new URLSearchParams()
  activeTags.forEach(tag => params.append('tag', tag))
  activeCategories.forEach(cat => params.append('category', cat))
  activeFilters.forEach(filter => params.append('status', filter))
  if (searchQuery) params.set('search', searchQuery)
  if (currentPage > 1) params.set('page', String(currentPage))

  router.push(`?${params.toString()}`, { scroll: false })
}
```

---

### Debouncing (Search Input)

**Pattern**: Delay API calls until user stops typing

**Implementation**:
```typescript
const [searchQuery, setSearchQuery] = useState('')
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    // Update URL, trigger filter
    updateURL()
  }, 300),
  []
)

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value)
  debouncedSearch(e.target.value)
}
```

**Why**: Prevents excessive re-renders and URL updates while typing

---

### Lazy Loading (WorkCard Images)

**Pattern**: Only load images when they enter viewport

**Implementation**:
```typescript
const [shouldLoad, setShouldLoad] = useState(eagerLoad || index < 20)

useEffect(() => {
  if (shouldLoad) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.disconnect()
      }
    },
    { rootMargin: '600px' } // Start loading 600px before visible
  )

  observer.observe(cardRef.current)
  return () => observer.disconnect()
}, [shouldLoad])
```

**Why**: Improves initial page load time, reduces memory usage for large libraries

---

### Focus Management (Modal)

**Pattern**: Trap focus within modal when open

**Implementation**:
```typescript
useEffect(() => {
  if (!open) return

  // Focus first focusable element
  const firstFocusable = modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  firstFocusable?.focus()

  // Prevent body scroll
  document.body.style.overflow = 'hidden'

  return () => {
    document.body.style.overflow = ''
  }
}, [open])
```

**Keyboard Handling**:
- Escape closes modal (unless disableClose)
- Tab cycles through focusable elements (needs focus trap library)
- Enter on close button closes modal

---

## Accessibility Requirements

### Minimum Standards
- **WCAG AA Compliance**: All interactive elements meet contrast ratio requirements (4.5:1 text, 3:1 UI components)
- **Keyboard Navigation**: All actions accessible via keyboard (Tab, Enter, Space, Escape, Arrow keys)
- **Focus Indicators**: Visible focus outlines (3px solid, 2px offset) on all interactive elements
- **Screen Reader Support**: ARIA labels, roles, and descriptions for all non-text elements

### Specific Patterns

**Buttons**:
- Icon-only buttons require `aria-label`
- Disabled buttons need `aria-disabled="true"`
- Loading buttons need `aria-busy="true"`

**Form Fields**:
- Labels associated via `htmlFor`/`id`
- Errors linked via `aria-describedby`
- Invalid inputs have `aria-invalid="true"`
- Required fields marked with `aria-required="true"`

**Modals**:
- `role="dialog"` on container
- `aria-modal="true"` to restrict screen reader
- `aria-labelledby` points to title
- Focus trap when open
- Escape key closes

**Dropdowns**:
- `role="combobox"` on input
- `role="listbox"` on options container
- `aria-expanded` reflects open state
- `aria-activedescendant` tracks highlighted option
- `aria-autocomplete="list"` for autocomplete inputs

**Selection**:
- Checkboxes have `aria-label` (e.g., "Select {work.title}")
- Indeterminate state for partial selection (future enhancement)
- Status announcements for bulk operations (e.g., "5 works selected")

---

## Performance Optimizations

### Memo Wrapping
- **WorkCard**: Prevents re-renders when sibling cards change
- **FilterChip**: Prevents re-renders when other filters toggle
- **PlotCard**: Prevents re-renders when sibling plot cards update

### Lazy Loading
- **WorkCard Images**: IntersectionObserver with 600px root margin
- **Infinite Scroll**: Load 20 more works per page, preserves scroll position
- **Code Splitting**: Dynamic imports for modals, dialogs (future enhancement)

### Debouncing
- **Search Input**: 300ms delay before triggering filter update
- **Window Resize**: Debounce masonry grid recalculation (future enhancement)

### Virtualization
- **WorksGrid**: Uses Masonic library for virtualized masonry layout
- **Tag Suggestions**: Limits dropdown to 8 items max (no virtual scrolling needed)

---

## Data Flow Patterns

### Server → Client (Initial Load)
```
Page Component (SSR)
  ↓ fetches works from filesystem
  ↓ passes initialWorks prop
WorksGrid (Client)
  ↓ filters/searches locally
  ↓ renders WorkCard components
```

### Client → Server (Mutations)
```
User Action (e.g., toggle favorite)
  ↓ onClick handler
  ↓ fetch('/api/works/{id}', { method: 'PATCH', body: { favorite: true } })
API Route
  ↓ validates request (Zod schema)
  ↓ updates meta.json on filesystem
  ↓ returns success/error
Client
  ↓ router.refresh() to revalidate page data
  ↓ shows success message
  ↓ updates UI optimistically (optional)
```

### URL State Synchronization
```
User clicks filter chip
  ↓ toggles activeFilters state
  ↓ updateURL() pushes new search params
  ↓ triggers re-filter of works
  ↓ resets pagination to page 1
  ↓ updates activeFilterCount prop in LibraryHeader
```

---

## Design System Integration Notes

When implementing in Google Stitch:

1. **Color Variables**: Replace all `var(--color-*)` and `var(--md-sys-*)` with Stitch design tokens
2. **Motion Tokens**: Map `var(--md-sys-motion-duration-*)` and `var(--md-sys-motion-easing-*)` to Stitch animation values
3. **State Layers**: Implement hover/focus/pressed states using Stitch's overlay system (not pseudo-elements)
4. **Spacing**: Use Stitch's spacing scale instead of 8px grid (ensure alignment)
5. **Typography**: Map existing font sizes to Stitch's type scale
6. **Icons**: Replace Material Symbols with Stitch's icon library (maintain same semantic meanings)

**Critical**: Preserve all interactive behaviors, state management, and accessibility patterns. Only visual appearance should change.

---

## Testing Checklist for Redesign

### Functional Tests
- [ ] All filters work (Status, Category, Tags)
- [ ] Multi-filter OR logic correct
- [ ] Search debouncing works (300ms)
- [ ] Selection: click, shift-click, Cmd/Ctrl+A
- [ ] Bulk operations apply to all selected works
- [ ] Lazy loading triggers at 600px before viewport
- [ ] Infinite scroll loads next page
- [ ] Tag autocomplete shows suggestions
- [ ] Category dropdown filters on type
- [ ] Modal opens/closes with Escape/backdrop
- [ ] Export preview updates in real-time
- [ ] Bucket reordering affects layer stacking
- [ ] Variant tabs switch correctly
- [ ] Plot card actions (edit, duplicate, delete) work
- [ ] Backup status polls every 30 seconds

### Accessibility Tests
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all elements
- [ ] ARIA labels present on icon-only buttons
- [ ] Form errors linked via aria-describedby
- [ ] Modals trap focus when open
- [ ] Screen reader announces state changes
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Touch targets minimum 40px × 40px

### Performance Tests
- [ ] WorkCard memoization prevents unnecessary re-renders
- [ ] Search input debouncing reduces re-renders
- [ ] Lazy loading reduces initial load time
- [ ] Masonry grid handles 100+ works smoothly
- [ ] URL param changes don't cause full page reload

### Visual Regression Tests
- [ ] All component states render correctly (idle, hover, focus, active, disabled, loading, error)
- [ ] Modals center on screen at all viewport sizes
- [ ] Filter chips wrap properly on narrow screens
- [ ] Export preview maintains aspect ratio at all zoom levels
- [ ] Tag chips don't overflow container
- [ ] Long titles truncate with ellipsis

---

## Component Dependencies Graph

```
WorksGrid
├── LibraryHeader
│   ├── Button (Add Work)
│   └── BackupStatus
│       ├── Button (Backup Now, Pull)
│       └── Modal (Help)
├── FilterChip (Status filters)
├── EditableFilterChip (Category/Tag filters)
├── WorkCard (grid items)
│   ├── IconButton (checkbox, favorite)
│   └── PlotPreviewModal
└── BulkOperationsToolbar
    ├── Button (actions)
    └── TagInput (add tags)

WorkDetailPage
├── MetadataEditor
│   ├── FormField
│   ├── CategorySelect
│   ├── TagInput
│   └── Button (Edit/Save/Cancel)
├── MetadataPanel (assistant)
│   ├── Button (Generate, Apply)
│   ├── TagChip (removable)
│   └── Modal (wrapper)
├── ReferenceGallery
│   ├── FileUploadZone
│   └── IconButton (promote, delete)
└── PlotsSection
    ├── VariantSelector (tabs)
    ├── Button (Upload SVG, New Variant)
    ├── PlotCard (multiple)
    │   ├── IconButton (menu)
    │   ├── PlotPreview
    │   └── PlotPreviewModal
    ├── ExportModal
    │   ├── PaperSettings
    │   │   └── NumericField
    │   ├── MarginSettings
    │   │   └── NumericField
    │   ├── PlacementSettings
    │   │   └── SelectionCardGroup
    │   │       └── SelectionCard
    │   ├── ScaleSettings
    │   │   └── SelectionCardGroup + NumericField
    │   ├── BucketSelector
    │   │   └── IconButton (reorder)
    │   └── ExportPreview
    │       └── Button (zoom controls)
    └── PlotConfigurationDialog
        └── (reuses all export modal components)

Shared UI Components (used everywhere)
├── Button
├── Modal
├── FormField
├── IconButton
├── FilterChip
├── EditableFilterChip
├── TagInput
├── TagChip
├── CategorySelect
├── NumericField
├── SelectionCard + SelectionCardGroup
└── FileUploadZone
```

---

## Notes for Google Stitch Implementation

### What to Preserve (Structure)
- Component hierarchy and composition
- Props interface contracts
- State management patterns (useState, custom hooks)
- Event handler logic (onClick, onChange callbacks)
- Async operation flows
- Validation rules
- Keyboard shortcuts
- Accessibility attributes (ARIA roles, labels, descriptions)

### What to Replace (Styling)
- CSS modules → Stitch styling system
- CSS custom properties → Stitch design tokens
- Color palette → Stitch color system
- Typography scale → Stitch type scale
- Spacing values → Stitch spacing scale
- Motion tokens → Stitch animation system
- Material Symbols → Stitch icon library
- Pseudo-element state layers → Stitch overlay system

### Migration Strategy
1. **Start with Core UI Components** (Button, Modal, FormField) as foundation
2. **Build Up** to feature components (WorkCard, MetadataEditor)
3. **Test Incrementally** after each component migration
4. **Validate Accessibility** at every step (don't regress)
5. **Preserve URLs** and routing structure (Next.js App Router)
6. **Keep API Routes** unchanged (filesystem-based backend)

