/**
 * Zero-Trust Verification Script for Header Changes
 * 
 * Run this in the browser console on http://localhost:3000
 * to verify all header changes are working correctly.
 */

console.clear();
console.log('=== ZERO-TRUST VERIFICATION: Header Changes ===\n');

const errors = [];
const warnings = [];
const checks = [];

// 1. Check Console Errors
console.log('1. Checking console errors...');
const initialErrorCount = window.console.error.toString().includes('native') ? 0 : 0;
// Note: Cannot programmatically count console errors, manual check required
checks.push({ name: 'Console errors', status: 'MANUAL_CHECK', note: 'Check browser console for errors (should be zero except favicon)' });

// 2. Verify Component Registration
console.log('2. Verifying component registration...');
const WyLibraryHeader = customElements.get('wy-library-header');
const WyIconButton = customElements.get('wy-icon-button');

if (!WyLibraryHeader) {
  errors.push('wy-library-header component not registered');
} else {
  checks.push({ name: 'wy-library-header registered', status: 'PASS', value: typeof WyLibraryHeader });
}

if (!WyIconButton) {
  errors.push('wy-icon-button component not registered');
} else {
  checks.push({ name: 'wy-icon-button registered', status: 'PASS', value: typeof WyIconButton });
}

// 3. Find Header Component
console.log('3. Finding header component...');
const header = document.querySelector('wy-library-header');
if (!header) {
  errors.push('wy-library-header element not found in DOM');
} else {
  checks.push({ name: 'Header element exists', status: 'PASS' });
  
  // 4. Verify Icon Buttons Exist
  console.log('4. Verifying icon buttons...');
  const shadowRoot = header.shadowRoot;
  if (!shadowRoot) {
    errors.push('Header has no shadow root');
  } else {
    const iconButtons = shadowRoot.querySelectorAll('wy-icon-button');
    if (iconButtons.length < 3) {
      errors.push(`Expected 3 icon buttons, found ${iconButtons.length}`);
    } else {
      checks.push({ name: 'Icon buttons count', status: 'PASS', value: iconButtons.length });
      
      // Verify each button has size="small"
      iconButtons.forEach((btn, idx) => {
        const size = btn.getAttribute('size');
        if (size !== 'small') {
          errors.push(`Icon button ${idx + 1} missing size="small" attribute (found: ${size || 'none'})`);
        } else {
          checks.push({ name: `Icon button ${idx + 1} size`, status: 'PASS', value: size });
        }
        
        // Verify dimensions (should be 44px for small)
        const style = window.getComputedStyle(btn);
        const width = parseInt(style.width);
        const height = parseInt(style.height);
        if (width !== 44 || height !== 44) {
          warnings.push(`Icon button ${idx + 1} dimensions: ${width}x${height}px (expected 44x44px)`);
        } else {
          checks.push({ name: `Icon button ${idx + 1} dimensions`, status: 'PASS', value: `${width}x${height}px` });
        }
      });
    }
    
    // 5. Verify Search Container Visibility
    console.log('5. Verifying search container visibility...');
    const searchContainer = shadowRoot.querySelector('.searchContainer');
    if (!searchContainer) {
      errors.push('Search container not found');
    } else {
      const hasHiddenClass = searchContainer.classList.contains('searchContainerHidden');
      const display = window.getComputedStyle(searchContainer).display;
      
      // Default should be hidden (showSearch = false)
      if (!header.showSearch && display === 'none') {
        checks.push({ name: 'Search container hidden by default', status: 'PASS' });
      } else if (!header.showSearch && display !== 'none') {
        errors.push(`Search container should be hidden by default (display: ${display})`);
      }
    }
    
    // 6. Verify Background Blur on Scroll
    console.log('6. Verifying background blur...');
    const headerElement = shadowRoot.querySelector('.header');
    const headerScrolled = shadowRoot.querySelector('.headerScrolled');
    
    if (header.isScrolled) {
      const backdropFilter = window.getComputedStyle(headerElement).backdropFilter;
      const webkitBackdropFilter = window.getComputedStyle(headerElement).webkitBackdropFilter;
      
      if (!backdropFilter || backdropFilter === 'none') {
        errors.push('Backdrop filter not applied when scrolled');
      } else {
        checks.push({ name: 'Backdrop filter applied', status: 'PASS', value: backdropFilter });
      }
    } else {
      checks.push({ name: 'Background blur (not scrolled)', status: 'SKIP', note: 'Scroll page to test' });
    }
  }
}

// 7. Verify Typography Tokens
console.log('7. Verifying typography tokens...');
const root = document.documentElement;
const typographyTokens = [
  '--md-sys-typescale-display-large-size',
  '--md-sys-typescale-display-medium-size',
  '--md-sys-typescale-headline-large-size',
  '--md-sys-typescale-title-medium-size',
  '--md-sys-typescale-body-large-size',
  '--md-sys-typescale-label-large-size'
];

typographyTokens.forEach(token => {
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  if (!value) {
    warnings.push(`Typography token ${token} not defined`);
  } else {
    checks.push({ name: `Token ${token}`, status: 'PASS', value: value });
  }
});

// 8. Verify Filter Fonts
console.log('8. Verifying filter fonts...');
const filtersContainer = document.querySelector('.filtersContainer');
if (filtersContainer) {
  const fontFamily = window.getComputedStyle(filtersContainer).fontFamily;
  if (!fontFamily.includes('DM Sans') && !fontFamily.includes('Manrope')) {
    warnings.push(`Filter container font: ${fontFamily} (expected DM Sans)`);
  } else {
    checks.push({ name: 'Filter container font', status: 'PASS', value: fontFamily });
  }
}

// Report Results
console.log('\n=== VERIFICATION RESULTS ===\n');

if (errors.length > 0) {
  console.error(`❌ FAILED: ${errors.length} error(s)`);
  errors.forEach(e => console.error('  -', e));
} else {
  console.log('✅ No critical errors found');
}

if (warnings.length > 0) {
  console.warn(`⚠️  ${warnings.length} warning(s)`);
  warnings.forEach(w => console.warn('  -', w));
} else {
  console.log('✅ No warnings');
}

console.log(`\n📊 Checks: ${checks.length} total`);
const passed = checks.filter(c => c.status === 'PASS').length;
const skipped = checks.filter(c => c.status === 'SKIP').length;
const manual = checks.filter(c => c.status === 'MANUAL_CHECK').length;

console.log(`  ✅ Passed: ${passed}`);
console.log(`  ⏭️  Skipped: ${skipped}`);
console.log(`  🔍 Manual: ${manual}`);

console.log('\n=== DETAILED CHECKS ===');
checks.forEach(check => {
  const icon = check.status === 'PASS' ? '✅' : check.status === 'SKIP' ? '⏭️' : '🔍';
  console.log(`${icon} ${check.name}${check.value ? `: ${check.value}` : ''}${check.note ? ` (${check.note})` : ''}`);
});

console.log('\n=== MANUAL VERIFICATION STEPS ===');
console.log('1. Scroll page to verify backdrop-filter blur effect');
console.log('2. Click search toggle button to verify search bar shows/hides');
console.log('3. Click filter button to verify filter toggle works');
console.log('4. Click add work button to verify event fires');
console.log('5. Check browser console for any errors (should be zero)');
console.log('6. Verify icon buttons are 44px x 44px (small size)');
console.log('7. Verify filter chips use DM Sans font');

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ VERIFICATION COMPLETE: All automated checks passed!');
} else {
  console.log('\n⚠️  VERIFICATION INCOMPLETE: Review errors/warnings above');
}
