# Quick Start Guide

Get up and running with the Weaver-Yuwono M3 Design System in minutes.

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
npm install lit @material/web
```

### 2. Copy Design System Files

Copy these essential files to your project:

```
your-project/
├── src/
│   ├── styles/
│   │   ├── tokens.css      # Design tokens
│   │   └── main.css        # Global styles
│   └── components/
│       └── (copy components you need)
```

### 3. Import in Your HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" rel="stylesheet">
  
  <!-- Your app -->
  <script type="module" src="/src/main.js"></script>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

### 4. Import Components in main.js

```javascript
// Import design tokens and styles
import './styles/tokens.css';
import './styles/main.css';

// Import Material Web Components
import '@material/web/all.js';

// Import custom components you need
import './components/wy-modal.js';
import './components/wy-form-field.js';
import './components/wy-tag-chip.js';
// ... etc
```

### 5. Use Components

```html
<body>
  <wy-modal open heading="Welcome">
    <p>Start building with the design system!</p>
    
    <div slot="actions">
      <md-filled-button>Get Started</md-filled-button>
    </div>
  </wy-modal>
</body>
```

## 📦 Common Component Patterns

### Modal with Form

```html
<wy-modal open heading="Create New Item">
  <wy-form-field label="Title">
    <input type="text" placeholder="Enter title">
  </wy-form-field>
  
  <wy-form-field label="Description">
    <textarea placeholder="Enter description"></textarea>
  </wy-form-field>
  
  <div slot="actions">
    <md-text-button>Cancel</md-text-button>
    <md-filled-button>Create</md-filled-button>
  </div>
</wy-modal>
```

### Card Grid

```html
<wy-works-grid density="spacious">
  <wy-work-card
    title="Project Alpha"
    category="Architecture"
    status="Active"
    thumbnail="/images/project1.jpg">
  </wy-work-card>
  
  <wy-work-card
    title="Project Beta"
    category="Design"
    status="Draft"
    thumbnail="/images/project2.jpg">
  </wy-work-card>
</wy-works-grid>
```

### Filter Chips

```html
<div style="display: flex; gap: 8px;">
  <wy-filter-chip label="All" count="24" active></wy-filter-chip>
  <wy-filter-chip label="Productivity" count="12"></wy-filter-chip>
  <wy-filter-chip label="Expertise" count="8"></wy-filter-chip>
</div>
```

### Toast Notifications

```html
<!-- Add to your page -->
<wy-toast id="toast"></wy-toast>

<script>
  // Show toast
  const toast = document.getElementById('toast');
  toast.message = 'Action completed!';
  toast.show = true;
</script>
```

## 🎨 Customizing Colors

Edit `src/styles/tokens.css`:

```css
:root {
  /* Change primary color */
  --md-sys-color-primary: #your-brand-color;
  
  /* Change background */
  --md-sys-color-background: #your-background;
  
  /* Change fonts */
  --font-serif: 'Your Serif Font', serif;
  --font-body: 'Your Sans Font', sans-serif;
}
```

## 🌓 Dark Mode

Dark mode is automatic based on system preference. To force dark mode:

```html
<html class="dark">
  <!-- Your content -->
</html>
```

Or customize dark mode colors in `tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #your-dark-primary;
    --md-sys-color-background: #your-dark-bg;
  }
}
```

## 📱 Responsive Design

All components are mobile-responsive by default. Key breakpoints:

- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: > 900px

## 🔧 Troubleshooting

### Fonts Not Loading

If Playfair Display isn't showing:

1. Check the Google Fonts link is in your `<head>`
2. For Shadow DOM components, add font import to component styles:

```javascript
static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  .my-element {
    font-family: var(--font-serif, 'Playfair Display', serif);
  }
`;
```

### Components Not Registering

Make sure you're importing components in your `main.js`:

```javascript
import './components/wy-modal.js';
```

### Styles Not Applying

Ensure tokens.css is imported before other styles:

```javascript
import './styles/tokens.css';  // First!
import './styles/main.css';
```

## 📚 Next Steps

- **Full Documentation**: See [README.md](README.md)
- **Component API**: See [COMPONENTS.md](COMPONENTS.md)
- **Design Philosophy**: See [m3-requirements.md](m3-requirements.md)
- **Live Examples**: Open `design-system.html` in dev server

## 💡 Tips

1. **Start Small**: Import only the components you need
2. **Use Tokens**: Always use CSS custom properties, never hardcode colors
3. **Check Examples**: The `design-system.html` file has live examples of all components
4. **Maintain Spacing**: Use the design system's spacing tokens (`--spacing-gap`, etc.)
5. **Test Dark Mode**: Always test your UI in both light and dark modes

---

**Need Help?** Check the full documentation or review the example implementations in this repository.
