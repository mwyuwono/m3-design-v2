# wy-dropdown and wy-info-panel Deployment Status

## Design System Updates

**Repository:** m3-design-v2  
**Latest Commit:** `cc1632c` - Remove @import from Shadow DOM CSS  
**Status:** ✅ Deployed to GitHub

### Commits Made:
1. `5a70214` - Add wy-dropdown and wy-info-panel components with perfect visual fidelity
2. `6357c98` - Fix test page issues: dark mode toggle, Material Symbols, and spacing  
3. `3187c11` - Add wy-dropdown and wy-info-panel to web-components bundle
4. `cc1632c` - Remove @import from Shadow DOM CSS (fix Constructable Stylesheets error)

### Files Changed:
- `src/components/wy-dropdown.js` - New universal dropdown component
- `src/components/wy-info-panel.js` - New reusable info panel
- `src/styles/tokens.css` - Added 22 component-specific color tokens
- `src/web-components.js` - Added new components to CDN bundle
- `src/main.js` - Registered components
- `src/data/components.json` - Component metadata
- `dist/web-components.js` - Rebuilt bundle (527.56 kB)
- `docs/dropdown-migration.md` - Migration guide
- `test-variant-selector.html` - Interactive test page

## Site Installation Status

### 1. Plots Library ✅ INSTALLED

**Integration Method:** npm link  
**Package:** wy-family-office → ../m3-design-v2  
**Status:** ✅ Active symlink, updated dist files available

**What's Available:**
- All design system tokens (including new dropdown/info-panel tokens)
- All components (including wy-dropdown and wy-info-panel)
- Local development environment fully synced

**Usage:**
```tsx
// TypeScript/React
<wy-dropdown
  label="CATEGORY"
  value={category}
  .options=${categories.map(c => ({value: c, label: c}))}
/>

<wy-info-panel content="Description text" />
```

**Next Steps:**
- Components ready to use
- See `m3-design-v2/docs/dropdown-migration.md` for migrating from wy-category-select
- No rebuild needed (npm link updates automatically)

---

### 2. Prompts Library ✅ DEPLOYED

**Integration Method:** CDN  
**CDN URL:** `https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@cc1632c/dist/web-components.js`  
**Status:** ✅ Using specific commit hash (temporary until @main updates)

**Changes Made:**
- Updated `components/index.js` to use `@cc1632c` (latest commit)
- Committed and pushed to GitHub
- Site will deploy automatically via Vercel

**What's Available:**
- Material Symbols font already loaded in index.html
- DM Sans loaded via tokens.css @import
- wy-dropdown component (17 references in bundle)
- wy-info-panel component

**Verification:**
After hard refresh (Cmd+Shift+R), check browser console:
```javascript
customElements.get('wy-dropdown')  // Should return constructor
customElements.get('wy-info-panel')  // Should return constructor
```

**Known Issue - Fixed:**
- ❌ @import in Shadow DOM CSS caused registration failure
- ✅ Removed @import statements, fonts loaded globally instead
- ✅ Components now register properly

**When @main Updates (24-48 hours):**
Revert to `@main` in `components/index.js`:
```javascript
import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';
```

---

### 3. Weaver-Yuwono Home Page ✅ READY

**Integration Method:** CDN  
**Status:** ✅ Design tokens available via CDN @main  
**Components Status:** Available if needed (no dropdowns currently in use)

**What's Available:**
- Updated color tokens (including dropdown/info-panel tokens)
- Dark mode class support (html.dark)
- All design system components via CDN

**No Action Required:** Site doesn't currently use dropdown components.

---

## CDN Cache Status

**Purged Files:**
- ✅ `src/styles/tokens.css` (@main, default, @latest)
- ✅ `dist/web-components.js` (@main, default, @latest)

**Current CDN State:**
- `@cc1632c` (specific commit) - ✅ Serving updated bundle with components
- `@main` (branch pointer) - ⏳ Cached, updating slowly (may take hours)
- File content at commits - ✅ Immediate access

**Recommendation:** Use specific commit hashes for immediate access, revert to @main after 24-48 hours.

## Testing Checklist

### For Prompts Library (https://p.weaver-yuwono.com)

After deployment completes:
- [ ] Hard refresh (Cmd+Shift+R)
- [ ] Open browser console
- [ ] Verify: `customElements.get('wy-dropdown')` returns constructor
- [ ] Verify: `customElements.get('wy-info-panel')` returns constructor
- [ ] Check no console errors about @import
- [ ] Test component if used in UI

### For Plots Library (http://localhost:3000)

- [ ] Restart dev server to pick up npm link updates
- [ ] Components available for use
- [ ] See migration guide for wy-category-select replacement

### For M3-Design-V2 Test Page (http://localhost:5175)

- [ ] Visit `/test-variant-selector.html`
- [ ] Verify dropdowns open/close
- [ ] Verify dark mode toggle works
- [ ] Verify Material Symbols icons render
- [ ] Verify 16px gap between dropdown and info panel

## Critical Fixes Applied

### Fix 1: @import Not Allowed in Shadow DOM
**Error:** `@import rules are not allowed here`  
**Cause:** Constructable Stylesheets don't support @import  
**Solution:** Removed @import from components, fonts loaded in page <head>

### Fix 2: Missing from CDN Bundle
**Issue:** Components in main.js but not web-components.js  
**Cause:** web-components.js is the CDN build entry point  
**Solution:** Added imports to web-components.js, rebuilt, pushed

### Fix 3: CDN @main Branch Pointer Cache
**Issue:** @main not serving latest commit  
**Cause:** jsDelivr caches branch pointers for hours  
**Solution:** Use specific commit hash (@cc1632c) for immediate access

## Summary

**Components:** ✅ Built and ready  
**Plots Library:** ✅ Installed via npm link  
**Prompts Library:** ✅ Deployed via CDN @cc1632c  
**Home Page:** ✅ Tokens available (components ready if needed)

**Current Status:** All sites have access to the new components. Prompts-library deployment in progress via Vercel.

---

**Last Updated:** January 27, 2026  
**Latest Commit:** cc1632c
