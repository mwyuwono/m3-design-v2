# Component Catalog: `wy-*` Library

This document provides a detailed overview of the custom web components implemented for the Weaver-Yuwono M3 Design System.

## Component Index

### 1. Form Foundations
- **`wy-form-field`**: Wrapper for standard inputs with labels, helper text, and error states.
- **`wy-tag-chip`**: Visual pill for individual tags. Supports `removable` and `generative` (AI) states.
- **`wy-filter-chip`**: Toggleable capsule for filtering grids or lists. Supports `count` badge.

### 2. Complex Interaction
- **`wy-tag-input`**: Autocomplete-enabled input for managing multiple tags.
- **`wy-category-select`**: Searchable dropdown for categorization.
- **`wy-selection-card`**: Visual radio selection units for modality or scale (Responsive: hides icons on mobile).

### 3. Layout & Navigation
- **`wy-library-header`**: Sticky dashboard header with integrated search and breadcrumbs.
- **`wy-modal`**: Advanced overlay with slide-up transitions and "Soft Modernist" styling.

### 4. Plotter Library Features
- **`wy-work-card`**: The primary visual unit for artwork. Supports media previews, status badges, and favorites.
- **`wy-works-grid`**: Responsive container for work cards with `spacious` and `compact` density modes.
- **`wy-plot-card`**: Informational display for system-level configurations (paper size, orientation).

### 5. Advanced Operations
- **`wy-export-modal`**: Specialized multi-pane interface for SVG processing.
- **`wy-backup-status`**: Status widget for monitoring synchronization with Git/GitHub.

---

## Technical Details
All components are built using:
- **Lit 3.x**: For reactive properties and efficient templating.
- **Material Web (MWC)**: For standard behaviors and accessibility primitives.
- **CSS Custom Properties**: Fully themeable using the global design tokens.

For interactive demos and API property details, launch the development server and visit `design-system.html`.
