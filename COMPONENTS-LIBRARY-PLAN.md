# Components Library Build-Out Plan

## Current State Analysis

### Components Inventory
**Total Components:** 25 custom `wy-*` components

**Currently Documented in `design-system.html`:** 21 components
- ✅ Form & Input: `wy-form-field`, `wy-filter-chip`, `wy-tag-chip`, `wy-tag-input`, `wy-category-select`, `wy-selection-card`
- ✅ Layout & Navigation: `wy-library-header`, `wy-app-bar`, `wy-controls-bar`, `wy-modal`, `wy-tabs` (mentioned but not shown)
- ✅ Cards: `wy-work-card`, `wy-plot-card`, `wy-prompt-card`, `wy-metric-card`, `wy-allocation-card`, `wy-insight-card`
- ✅ Specialized: `wy-works-grid`, `wy-export-modal`, `wy-backup-status`, `wy-prompt-modal`, `wy-toast`

**Missing from Library:** 4 components
- ❌ `wy-bio-card` - Extended biography layout card
- ❌ `wy-profile-card` - User profile display card
- ❌ `wy-project-list` - Filterable project listing component
- ❌ `wy-tabs` - Tab navigation (mentioned but no example shown)

### Current Structure Issues

1. **Hardcoded Examples**: All component examples are hardcoded in HTML, making maintenance difficult
2. **Inconsistent Organization**: Components grouped by use case rather than component type
3. **Missing Components**: 4 components not represented
4. **No Systematic Categories**: No clear taxonomy for component organization
5. **Difficult to Scale**: Adding new components requires manual HTML editing

## Proposed Architecture

### Component Categorization System

Based on Material Design 3 and component functionality, organize into 5 main categories:

1. **Form & Input** (6 components)
   - `wy-form-field` - Form input wrapper
   - `wy-filter-chip` - Toggleable filter chip
   - `wy-tag-chip` - Tag pill component
   - `wy-tag-input` - Autocomplete tag input
   - `wy-category-select` - Searchable category dropdown
   - `wy-selection-card` - Visual radio button card

2. **Layout & Navigation** (4 components)
   - `wy-app-bar` - Application header
   - `wy-library-header` - Sticky header with breadcrumbs
   - `wy-controls-bar` - Action toolbar
   - `wy-tabs` - Tab navigation

3. **Cards & Content** (8 components)
   - `wy-profile-card` - User profile card
   - `wy-bio-card` - Extended biography card
   - `wy-work-card` - Artwork/asset card
   - `wy-plot-card` - Plot configuration card
   - `wy-prompt-card` - Prompt template card
   - `wy-metric-card` - Financial/analytics metric
   - `wy-allocation-card` - Portfolio allocation visualization
   - `wy-insight-card` - Key insight highlight card

4. **Modals & Overlays** (3 components)
   - `wy-modal` - Base modal component
   - `wy-prompt-modal` - Advanced prompt template modal
   - `wy-export-modal` - Multi-pane export configuration modal

5. **Specialized Components** (4 components)
   - `wy-works-grid` - Responsive grid container
   - `wy-project-list` - Filterable project listing
   - `wy-backup-status` - Git sync status indicator
   - `wy-toast` - Toast notification system

### Data-Driven Component Examples

Create a JSON structure that defines component examples:

```json
{
  "components": [
    {
      "name": "wy-form-field",
      "category": "form-input",
      "title": "Form Field",
      "description": "Form input wrapper with labels, helper text, and error states",
      "examples": [
        {
          "name": "Basic",
          "code": "<wy-form-field label=\"Full Name\">\n  <input type=\"text\" placeholder=\"Enter name\">\n</wy-form-field>",
          "props": { "label": "Full Name" }
        },
        {
          "name": "With Helper Text",
          "code": "<wy-form-field label=\"Email\" description=\"We'll never share your email\">\n  <input type=\"email\">\n</wy-form-field>",
          "props": { "label": "Email", "description": "We'll never share your email" }
        },
        {
          "name": "Error State",
          "code": "<wy-form-field label=\"Password\" error=\"Password must be at least 8 characters\">\n  <input type=\"password\">\n</wy-form-field>",
          "props": { "label": "Password", "error": "Password must be at least 8 characters" }
        }
      ],
      "props": [
        { "name": "label", "type": "String", "required": true, "description": "Field label text" },
        { "name": "description", "type": "String", "required": false, "description": "Helper text below input" },
        { "name": "error", "type": "String", "required": false, "description": "Error message (shows in red)" }
      ],
      "slots": [
        { "name": "default", "description": "Input element" }
      ]
    }
  ]
}
```

### File Structure

```
m3-design-v2/
├── src/
│   ├── components/          # Component source files (existing)
│   ├── data/
│   │   ├── components.json  # Component examples data (NEW)
│   │   └── ...
│   └── ...
├── design-system.html        # Main library page (REFACTOR)
└── components-library.html  # Dedicated components library (NEW - optional)
```

## Implementation Plan

### Phase 1: Data Structure & Missing Components (Priority: High)

**Step 1.1:** Create `src/data/components.json`
- Define JSON schema for component examples
- Include all 25 components with:
  - Basic metadata (name, category, title, description)
  - Multiple example variations (basic, with props, states)
  - Props documentation
  - Slots documentation
  - Code snippets

**Step 1.2:** Add missing component examples
- `wy-bio-card` - Show with photo, name, role, bio text
- `wy-profile-card` - Show with avatar, name, role, action button
- `wy-project-list` - Show with filter and project cards
- `wy-tabs` - Show with multiple tabs and active state

**Deliverable:** Complete JSON data file with all 25 components

### Phase 2: Refactor Library Page (Priority: High)

**Step 2.1:** Create component renderer function
- JavaScript function that reads `components.json`
- Dynamically generates component sections
- Handles code examples, live previews, and prop tables

**Step 2.2:** Refactor `design-system.html`
- Replace hardcoded component sections with data-driven rendering
- Maintain existing design system sections (Philosophy, Typography, Palette)
- Add new "Components Library" section that uses the renderer
- Keep existing component examples as fallback during migration

**Step 2.3:** Add component filtering/search
- Filter by category (Form & Input, Layout, Cards, etc.)
- Search by component name
- Quick navigation sidebar

**Deliverable:** Refactored `design-system.html` with data-driven components section

### Phase 3: Enhanced Features (Priority: Medium)

**Step 3.1:** Interactive component playground
- Live prop editing
- Code copy buttons
- Responsive preview toggle (mobile/tablet/desktop)

**Step 3.2:** Component status indicators
- Status badges (Stable, Beta, Deprecated)
- Version information
- Last updated date

**Step 3.3:** Component relationships
- "Used by" / "Uses" relationships
- Related components suggestions

**Deliverable:** Enhanced library with interactive features

### Phase 4: Developer Experience (Priority: Medium)

**Step 4.1:** Component template generator
- Script to scaffold new component examples
- Ensures consistent structure
- Auto-generates basic examples

**Step 4.2:** Documentation sync
- Sync `components.json` with `COMPONENTS.md`
- Ensure API docs match examples
- Automated validation

**Step 4.3:** Component testing integration
- Link to component tests (if applicable)
- Visual regression test links

**Deliverable:** Developer tools for maintaining component library

## Scalability Considerations

### Adding New Components

**Workflow:**
1. Create component file in `src/components/wy-*.js`
2. Add component import to `src/main.js`
3. Add component entry to `src/data/components.json` with examples
4. Component automatically appears in library (no HTML editing needed)

**Example JSON Entry:**
```json
{
  "name": "wy-new-component",
  "category": "form-input",
  "title": "New Component",
  "description": "Brief description",
  "examples": [
    {
      "name": "Basic",
      "code": "<wy-new-component></wy-new-component>",
      "props": {}
    }
  ],
  "props": [
    { "name": "prop1", "type": "String", "required": true, "description": "..." }
  ]
}
```

### Component Categories

Categories are defined in JSON, making it easy to:
- Add new categories
- Reorganize components
- Filter by category
- Group related components

### Example Variations

Each component can have multiple examples:
- Basic usage
- With props
- Different states (active, disabled, error)
- Real-world use cases

This makes the library comprehensive without cluttering the main view.

## Technical Implementation Details

### Component Renderer Function

```javascript
async function renderComponentLibrary() {
  const response = await fetch('/src/data/components.json');
  const data = await response.json();
  
  // Group by category
  const byCategory = data.components.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {});
  
  // Render each category section
  Object.entries(byCategory).forEach(([category, components]) => {
    renderCategorySection(category, components);
  });
}

function renderCategorySection(category, components) {
  // Create section header
  // Render each component with examples
  // Add code snippets, live previews, prop tables
}
```

### Code Example Rendering

- Use `<pre><code>` with syntax highlighting
- Add "Copy" button for each example
- Show live preview alongside code

### Prop Table Generation

- Auto-generate prop tables from JSON
- Include type, required, description
- Link to component source code

## Success Metrics

1. **Completeness**: All 25 components documented with examples
2. **Maintainability**: Adding new component takes < 5 minutes
3. **Usability**: Easy to find and understand any component
4. **Consistency**: All examples follow same structure
5. **Scalability**: System handles 50+ components without refactoring

## Next Steps

1. **Immediate**: Create `src/data/components.json` with all 25 components
2. **Week 1**: Refactor `design-system.html` to use data-driven rendering
3. **Week 2**: Add missing component examples and enhance features
4. **Ongoing**: Maintain JSON file as components are added/modified

## Questions to Consider

1. Should we keep `design-system.html` as single page or split into separate pages?
2. Do we need a dedicated `/components` route or keep everything in one page?
3. Should component examples be editable in the browser (playground mode)?
4. Do we want to auto-generate `COMPONENTS.md` from `components.json`?
