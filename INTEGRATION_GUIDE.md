Here is a prompt you can use to integrate the design system into your `weaver-yuwono.com` project:

**Prompt:**

"You are an expert web developer tasked with integrating a new design system into an existing project. Follow these steps to connect the `weaver-yuwono.com` site to the design system and demonstrate a simple implementation."

### 1. **Copy Design System Files**

First, you'll need to copy the design system's `src/components` and `src/styles` directories into your project. Place them in a `/design-system` subdirectory to keep them organized.

Your project structure should look like this:

```
weaver-yuwono.com/
├── design-system/
│   ├── components/
│   │   ├── wy-modal.js
│   │   └── ...
│   └── styles/
│       ├── tokens.css
│       └── main.css
└── ... (your existing files)
```

### 2. **Update Your `index.html`**

Next, update your `index.html` to include the necessary fonts, styles, and an entry point for the design system. The code below includes an `importmap`, which is crucial for telling the browser how to load third-party dependencies like `lit` and `@material/web` directly from a CDN.

Here's the required HTML boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weaver-Yuwono.com</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" rel="stylesheet">

  <!-- Design System Entry Point -->
  <script type="importmap">
    {
      "imports": {
        "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",
        "@material/web/all.js": "https://cdn.jsdelivr.net/npm/@material/web@2.4.1/all.js"
      }
    }
  </script>
  <script type="module" src="/design-system/main.js"></script>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

### 3. **Create the `main.js` File**

Now, create a `main.js` file in your `/design-system` directory. This file will import the design tokens, global styles, and all the components you need.

Here's a template for your `main.js`:

```javascript
// Import design tokens and global styles
import './styles/tokens.css';
import './styles/main.css';

// Import all Material Web Components
import '@material/web/all.js';

// Import all custom components from the design system
import './components/wy-modal.js';
import './components/wy-form-field.js';
// ... import all other components
```

### 4. **Add a Simple Usage Example**

Finally, add a simple example to your `index.html` to verify that the integration was successful. A modal is a great way to test this, as it combines a custom component with Material Web buttons.

Add this snippet to the `<body>` of your `index.html`:

```html
<wy-modal open heading="Integration Successful">
  <p>The Weaver-Yuwono design system has been successfully integrated.</p>

  <div slot="actions">
    <md-filled-button>Get Started</md-filled-button>
  </div>
</wy-modal>
```

Once you've completed these steps, your `weaver-yuwono.com` site will be connected to the design system, and you'll be able to use any of its components in your project.
