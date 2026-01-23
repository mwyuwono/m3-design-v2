# Weaver-Yuwono M3 Design System

A modular, high-end editorial design system based on Material 3. Custom-built for the **Weaver-Yuwono Family Office** to manage portfolio assets and plotter configurations.

## Aesthetic: "Soft Modernism"
The system balances modernist precision with organic warmth:
- **Typography:** `Playfair Display` (Serif) for headings; `Manrope` (Sans) for UI/Body.
- **Palette:** 
  - `Hunter Green` (#2D4E3C): Primary brand and interactive color.
  - `Alabaster` (#F4F1EA): Surface and background foundations.
  - `Warm Clay` (#8C7E70): Accents and metadata.
- **Form:** Capsule shapes (`9999px` radius) and subtle bordered surfaces.

## Component Library (`wy-*`)
We have implemented a comprehensive library of custom LitElement components:
- **Form Foundations:** `wy-form-field`, `wy-tag-chip`, `wy-filter-chip`.
- **Complex Selection:** `wy-tag-input`, `wy-category-select`, `wy-selection-card`.
- **Navigation & Layout:** `wy-library-header`, `wy-modal`.
- **Library Features:** `wy-work-card`, `wy-works-grid`, `wy-plot-card`.
- **Advanced Ops:** `wy-export-modal`, `wy-backup-status`.

See [COMPONENTS.md](COMPONENTS.md) for a full catalog and API reference.

## Layouts
- **Portfolio Dashboard:** High-end financial analytics using refined metrics cards.
- **Plotter Library:** Specialized workspace for managing generative artwork and SVG exports.
- **Profile & Project:** Magazine-style layouts for personal bios and asset thesis.

## Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Documentation
- **Living Style Guide:** Access [design-system.html](design-system.html) in the dev server for interactive previews and property documentation.

