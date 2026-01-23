# Weaver-Yuwono M3 Design System

A production-ready, modular design system built on Material Design 3, featuring custom Web Components and a distinctive "Soft Modernism" aesthetic. Designed for high-end editorial interfaces with organic shapes and disciplined typography.

## 🎨 Design Philosophy: Soft Modernism

The system balances modernist precision with organic warmth, creating interfaces that feel like premium architectural publications rather than typical web applications.

### Visual Identity

- **Typography**: 
  - `Playfair Display` (Serif) - Editorial headings with high contrast
  - `Manrope` (Sans) - UI elements and body text
  - Wide letter-spacing on labels for architectural feel

- **Color Palette**:
  - **Hunter Green** (`#2d4e3c`) - Primary brand color
  - **Alabaster** (`#FDFBF7`) - Background foundation
  - **Warm Clay** (`#F5F2EA`) - Surface tones
  - **Muted Bronze** (`#8C7E70`) - Secondary accents

- **Form Language**:
  - Capsule buttons (`border-radius: 9999px`)
  - Rounded cards (`16px` - `32px` radius)
  - Generous spacing (48px - 64px between sections)
  - Subtle borders over heavy shadows

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone or copy the design system
git clone https://github.com/mwyuwono/m3-design-v2.git
cd m3-design-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

The design system will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
m3-design-v2/
├── src/
│   ├── components/          # Custom Web Components (wy-*)
│   │   ├── wy-modal.js
│   │   ├── wy-prompt-modal.js
│   │   ├── wy-form-field.js
│   │   └── ...
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colors, fonts, spacing)
│   │   └── main.css         # Global styles and utilities
│   ├── data/                # Sample JSON data
│   └── main.js              # Component registration
├── design-system.html       # Living style guide
├── index.html               # Landing page example
└── docs/                    # Additional documentation
```

## 🧩 Component Library

### Complete Component Catalog

All components are prefixed with `wy-` and built using Lit 3.x with Material Web Components.

#### Form & Input Components
- **`wy-form-field`** - Form input wrapper with labels and validation
- **`wy-tag-chip`** - Visual pill for tags (removable, generative states)
- **`wy-filter-chip`** - Toggleable filter with count badge
- **`wy-tag-input`** - Autocomplete tag management
- **`wy-category-select`** - Searchable dropdown selector
- **`wy-selection-card`** - Visual radio button cards

#### Layout & Navigation
- **`wy-app-bar`** - Application header with navigation
- **`wy-library-header`** - Sticky header with search and breadcrumbs
- **`wy-controls-bar`** - Action toolbar for list views
- **`wy-modal`** - Base modal component with slide-up animation
- **`wy-prompt-modal`** - Advanced modal for prompt templates
- **`wy-export-modal`** - Multi-pane export configuration
- **`wy-tabs`** - Text-only tab navigation

#### Content Cards
- **`wy-profile-card`** - User profile display
- **`wy-bio-card`** - Extended biography layout
- **`wy-work-card`** - Artwork/asset card with media preview
- **`wy-plot-card`** - Configuration display card
- **`wy-prompt-card`** - Prompt template card
- **`wy-metric-card`** - Financial/analytics metric display
- **`wy-allocation-card`** - Portfolio allocation visualization
- **`wy-insight-card`** - Key insight highlight

#### Specialized Components
- **`wy-works-grid`** - Responsive grid for work cards
- **`wy-project-list`** - Filterable project listing
- **`wy-backup-status`** - Git sync status indicator
- **`wy-toast`** - Toast notification system

### Component Usage Example

```html
<!-- Import in your HTML -->
<script type="module" src="/src/main.js"></script>

<!-- Use components -->
<wy-modal open heading="Export Configuration">
  <wy-form-field label="File Name">
    <input type="text" placeholder="my-export.svg">
  </wy-form-field>
  
  <div slot="actions">
    <md-text-button>Cancel</md-text-button>
    <md-filled-button>Export</md-filled-button>
  </div>
</wy-modal>
```

## 🎨 Design Tokens

All design tokens are defined in `src/styles/tokens.css` using CSS custom properties.

### Color Tokens

```css
/* Primary Colors */
--md-sys-color-primary: #2d4e3c;           /* Hunter Green */
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #E8F5E9;

/* Surface Colors */
--md-sys-color-background: #FDFBF7;        /* Alabaster */
--md-sys-color-surface: #F5F2EA;           /* Warm Clay */
--md-sys-color-on-surface: #121714;

/* Container Tokens (for cards, modals) */
--md-sys-color-surface-container-low: #FDFBF7;
--md-sys-color-surface-container: #F5F2EA;
--md-sys-color-surface-container-high: #EBE5DE;
```

### Typography Tokens

```css
/* Font Families */
--font-serif: 'Playfair Display', serif;   /* Headings */
--font-body: 'Manrope', sans-serif;        /* Body text */
--font-display: 'Manrope', sans-serif;     /* UI elements */

/* Typography Scale */
--md-sys-typescale-display-large-font: var(--font-serif);
--md-sys-typescale-headline-medium-font: var(--font-serif);
--md-sys-typescale-body-large-font: var(--font-body);
```

### Spacing & Shape

```css
/* Layout Spacing */
--spacing-layout: 120px;  /* Page margins */
--spacing-gap: 64px;      /* Section spacing */

/* Border Radius */
--md-sys-shape-corner-full: 9999px;   /* Capsule buttons */
--md-sys-shape-corner-large: 32px;    /* Large cards */
--md-sys-shape-corner-medium: 16px;   /* Standard cards */
```

## 🌓 Dark Mode Support

The system includes comprehensive dark mode support with proper contrast ratios:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #8DE0B0;
    --md-sys-color-background: #161c19;
    --md-sys-color-surface: #1E2623;
    /* ... additional dark mode tokens */
  }
}
```

## 🔧 Customization

### Using in Your Project

1. **Copy the design system files**:
   ```bash
   cp -r src/components your-project/src/
   cp -r src/styles your-project/src/
   ```

2. **Import in your main.js**:
   ```javascript
   import './styles/tokens.css';
   import './styles/main.css';
   import './components/wy-modal.js';
   // ... import other components as needed
   ```

3. **Customize tokens** in `tokens.css`:
   ```css
   :root {
     --md-sys-color-primary: #your-brand-color;
     --font-serif: 'Your Serif Font', serif;
   }
   ```

### Shadow DOM Font Loading

**Important**: Components using Shadow DOM require explicit font imports. If you see fonts not loading:

```javascript
// In your component's static styles
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  .your-element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

## 📚 Documentation

- **Living Style Guide**: Open `design-system.html` in your dev server for interactive component previews
- **Design Philosophy**: See `m3-requirements.md` for detailed design principles
- **Component APIs**: Each component includes JSDoc comments with property documentation

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Use Cases

This design system is ideal for:
- **Portfolio Management Dashboards** - Financial analytics with premium aesthetics
- **Content Management Systems** - Editorial interfaces with rich typography
- **Creative Tool Interfaces** - Art/design applications requiring refined UI
- **Family Office Platforms** - Wealth management and asset tracking
- **Generative Art Tools** - Plotter configuration and SVG export workflows

## 🔍 Key Features

✅ **Production-Ready** - Fully tested components with proper accessibility  
✅ **Dark Mode** - Complete dark theme with high contrast ratios  
✅ **Responsive** - Mobile-first design with adaptive layouts  
✅ **Modular** - Import only the components you need  
✅ **Themeable** - CSS custom properties for easy customization  
✅ **Type-Safe** - Built with Lit 3.x reactive properties  
✅ **Accessible** - Based on Material Design 3 accessibility standards

## 📝 License

Private - Weaver-Yuwono Family Office

## 🤝 Contributing

This is a private design system. For questions or issues, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready
