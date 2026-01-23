# Component API Reference

Complete documentation for all `wy-*` custom components in the Weaver-Yuwono M3 Design System.

## Table of Contents

- [Form & Input Components](#form--input-components)
- [Layout & Navigation](#layout--navigation)
- [Content Cards](#content-cards)
- [Specialized Components](#specialized-components)
- [Modal Components](#modal-components)

---

## Form & Input Components

### `wy-form-field`

Form input wrapper with labels, helper text, and error states.

**Properties:**
- `label` (String) - Field label text
- `helper` (String) - Helper text below input
- `error` (String) - Error message (shows in red)

**Slots:**
- Default slot - Input element

**Example:**
```html
<wy-form-field label="Email Address" helper="We'll never share your email">
  <input type="email" placeholder="you@example.com">
</wy-form-field>
```

---

### `wy-tag-chip`

Visual pill for individual tags with remove functionality.

**Properties:**
- `label` (String) - Tag text
- `removable` (Boolean) - Shows remove button
- `generative` (Boolean) - AI-generated badge styling

**Events:**
- `remove` - Fired when remove button clicked

**Example:**
```html
<wy-tag-chip label="Architecture" removable></wy-tag-chip>
<wy-tag-chip label="AI Generated" generative></wy-tag-chip>
```

---

### `wy-filter-chip`

Toggleable filter chip with optional count badge.

**Properties:**
- `label` (String) - Chip label
- `count` (Number) - Badge count (optional)
- `active` (Boolean) - Active/selected state

**Events:**
- `toggle` - Fired when chip clicked

**Example:**
```html
<wy-filter-chip label="Productivity" count="12" active></wy-filter-chip>
```

---

### `wy-tag-input`

Autocomplete-enabled input for managing multiple tags.

**Properties:**
- `tags` (Array) - Current tag list
- `suggestions` (Array) - Autocomplete suggestions
- `placeholder` (String) - Input placeholder

**Events:**
- `tag-add` - Fired when tag added
- `tag-remove` - Fired when tag removed

---

### `wy-category-select`

Searchable dropdown for category selection.

**Properties:**
- `categories` (Array) - Available categories
- `selected` (String) - Currently selected category
- `placeholder` (String) - Placeholder text

**Events:**
- `change` - Fired when selection changes

---

### `wy-selection-card`

Visual radio button card for options.

**Properties:**
- `name` (String) - Radio group name
- `label` (String) - Card label
- `value` (String) - Card value
- `icon` (String) - Material icon name
- `checked` (Boolean) - Selected state

**Events:**
- `change` - Fired when selection changes

**Example:**
```html
<wy-selection-card 
  name="paper" 
  label="A3" 
  value="a3" 
  icon="description" 
  checked>
</wy-selection-card>
```

---

## Layout & Navigation

### `wy-app-bar`

Application header with navigation and branding.

**Properties:**
- `title` (String) - Application title
- `subtitle` (String) - Optional subtitle

**Slots:**
- `actions` - Right-side action buttons

---

### `wy-library-header`

Sticky header with search and breadcrumbs.

**Properties:**
- `title` (String) - Page title
- `breadcrumbs` (Array) - Breadcrumb trail
- `searchPlaceholder` (String) - Search input placeholder

**Events:**
- `search` - Fired on search input

---

### `wy-controls-bar`

Action toolbar for list/grid views.

**Properties:**
- `viewMode` (String) - 'grid' or 'list'
- `sortBy` (String) - Current sort field

**Events:**
- `view-change` - Fired when view mode changes
- `sort-change` - Fired when sort changes

**Slots:**
- `actions` - Custom action buttons

---

### `wy-tabs`

Text-only tab navigation with bottom border indicator.

**Properties:**
- `activeTab` (String) - Currently active tab ID

**Events:**
- `tab-change` - Fired when tab changes (detail: { tab })

**Slots:**
- Default - Tab button elements with `role="tab"` and `data-tab` attributes

**Example:**
```html
<wy-tabs active-tab="variables">
  <button role="tab" data-tab="variables">Variables</button>
  <button role="tab" data-tab="preview">Preview</button>
</wy-tabs>
```

---

## Content Cards

### `wy-profile-card`

User profile display card.

**Properties:**
- `name` (String) - Person name
- `role` (String) - Role/title
- `photo` (String) - Photo URL
- `profileId` (String) - Profile identifier

---

### `wy-bio-card`

Extended biography layout card.

**Properties:**
- `name` (String) - Person name
- `role` (String) - Role/title
- `photo` (String) - Photo URL
- `bio` (String) - Biography text

---

### `wy-work-card`

Artwork/asset card with media preview.

**Properties:**
- `title` (String) - Work title
- `category` (String) - Category label
- `status` (String) - Status badge
- `favorite` (Boolean) - Favorite state
- `thumbnail` (String) - Preview image URL

**Events:**
- `favorite-toggle` - Fired when favorite clicked

---

### `wy-plot-card`

Configuration display card for plotter settings.

**Properties:**
- `title` (String) - Configuration name
- `paperSize` (String) - Paper size (e.g., "A3")
- `orientation` (String) - "Portrait" or "Landscape"

---

### `wy-prompt-card`

Prompt template card with category and actions.

**Properties:**
- `title` (String) - Prompt title
- `description` (String) - Brief description
- `category` (String) - Category label
- `tags` (Array) - Associated tags
- `favorite` (Boolean) - Favorite state

**Events:**
- `open` - Fired when card clicked
- `favorite-toggle` - Fired when favorite clicked

**Example:**
```html
<wy-prompt-card
  title="Meeting Minutes Architect"
  description="Professional summarization with action items"
  category="Productivity"
  favorite>
</wy-prompt-card>
```

---

### `wy-metric-card`

Financial/analytics metric display.

**Properties:**
- `label` (String) - Metric label
- `value` (String) - Metric value
- `change` (String) - Change percentage
- `trend` (String) - 'up' or 'down'

---

### `wy-allocation-card`

Portfolio allocation visualization.

**Properties:**
- `title` (String) - Allocation title
- `allocations` (Array) - Allocation data
  - `category` (String)
  - `percentage` (Number)
  - `color` (String)

---

### `wy-insight-card`

Key insight highlight card.

**Properties:**
- `title` (String) - Insight title
- `description` (String) - Insight text
- `icon` (String) - Material icon name

---

## Specialized Components

### `wy-works-grid`

Responsive grid container for work cards.

**Properties:**
- `density` (String) - 'spacious' or 'compact'

**Slots:**
- Default - Work card elements

---

### `wy-project-list`

Filterable project listing component.

**Properties:**
- `filter` (String) - Filter criteria
- `title` (String) - List title

---

### `wy-backup-status`

Git sync status indicator with animation.

**Properties:**
- `status` (String) - 'synced', 'syncing', 'error'
- `lastSync` (String) - Last sync timestamp

---

### `wy-toast`

Toast notification system.

**Properties:**
- `message` (String) - Toast message
- `show` (Boolean) - Visibility state
- `duration` (Number) - Display duration (ms, default: 3000)

**Events:**
- `dismiss` - Fired when toast auto-dismisses

**Example:**
```html
<wy-toast message="Copied to clipboard!" show></wy-toast>
```

---

## Modal Components

### `wy-modal`

Base modal component with slide-up animation.

**Properties:**
- `open` (Boolean) - Modal visibility
- `heading` (String) - Modal title
- `maxWidth` (String) - Max width (default: '560px')

**Events:**
- `close` - Fired when modal closes

**Slots:**
- Default - Modal content
- `actions` - Footer action buttons

**Example:**
```html
<wy-modal open heading="Confirm Action" max-width="600px">
  <p>Are you sure you want to proceed?</p>
  
  <div slot="actions">
    <md-text-button>Cancel</md-text-button>
    <md-filled-button>Confirm</md-filled-button>
  </div>
</wy-modal>
```

---

### `wy-prompt-modal`

Advanced modal for prompt template configuration.

**Properties:**
- `open` (Boolean) - Modal visibility
- `title` (String) - Prompt title
- `category` (String) - Category label
- `description` (String) - Prompt description
- `template` (String) - Prompt template text
- `variables` (Array) - Template variables
  - `name` (String) - Variable name
  - `label` (String) - Display label
  - `type` (String) - 'text' or 'textarea'
  - `placeholder` (String) - Placeholder text
- `variations` (Array) - Template variations
  - `name` (String) - Variation name
  - `template` (String) - Variation template
- `mode` (String) - 'locked' or 'edit'
- `activeTab` (String) - 'variables' or 'preview'

**Events:**
- `close` - Fired when modal closes
- `save` - Fired when template saved (detail: { template })
- `toast` - Fired for toast notifications

**Example:**
```html
<wy-prompt-modal
  open
  title="Meeting Minutes Architect"
  category="Productivity"
  description="Professional summarization with action items"
  template="Summarize: {{transcript}}"
  .variables="${[
    { name: 'transcript', label: 'Meeting Transcript', type: 'textarea' }
  ]}">
</wy-prompt-modal>
```

---

### `wy-export-modal`

Multi-pane export configuration modal.

**Properties:**
- `open` (Boolean) - Modal visibility
- `workTitle` (String) - Work title
- `previewImage` (String) - Preview image URL

**Events:**
- `close` - Fired when modal closes
- `export` - Fired when export triggered

**Example:**
```html
<wy-export-modal
  open
  work-title="Ethereal Geometry I"
  preview-image="/path/to/preview.jpg">
</wy-export-modal>
```

---

## Technical Notes

### Shadow DOM Font Loading

Components using Shadow DOM require explicit font imports. All modal components include:

```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  .element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

### Styling Components

All components respect design tokens from `tokens.css`. To customize:

```css
:root {
  --md-sys-color-primary: #your-color;
  --font-serif: 'Your Font', serif;
}
```

### Accessibility

All components follow Material Design 3 accessibility guidelines:
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility

---

**For interactive demos and live examples, see `design-system.html` in your development server.**
