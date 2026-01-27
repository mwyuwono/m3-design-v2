#!/usr/bin/env python3
"""
Color Accuracy Test for Library Header Component

Tests that all colors in the implementation match design system tokens
with Delta E < 2.0 (imperceptible difference threshold).
"""

from playwright.sync_api import sync_playwright
import math

# Reference colors based on design system tokens
REFERENCE_COLORS = {
    'title': (18, 23, 20),              # var(--md-sys-color-on-surface) = #121714
    'filter_button_bg': (245, 242, 234),  # var(--md-sys-color-surface) = #F5F2EA
    'filter_button_color': (18, 23, 20),  # var(--md-sys-color-on-surface) = #121714
    'search_bg': (253, 251, 247),        # var(--md-sys-color-background) = #FDFBF7
    'search_border': (215, 211, 200),    # var(--md-sys-color-outline-variant) = #D7D3C8
    'search_text': (18, 23, 20),         # var(--md-sys-color-on-surface) = #121714
    'add_work_bg': (44, 76, 59),         # var(--md-sys-color-primary) = #2C4C3B
    'add_work_text': (255, 255, 255),    # var(--md-sys-color-on-primary) = #FFFFFF
}

def rgb_from_string(color_str):
    """Parse rgb(r, g, b) or rgba(r, g, b, a) to RGB tuple"""
    if 'rgb' in color_str:
        values = color_str.split('(')[1].split(')')[0].split(',')
        return tuple(int(v.strip()) for v in values[:3])
    return None

def delta_e(color1, color2):
    """Calculate Euclidean distance in RGB space (Delta E)"""
    if color1 is None or color2 is None:
        return float('inf')
    return math.sqrt(sum((c1 - c2) ** 2 for c1, c2 in zip(color1, color2)))

print("\n" + "="*70)
print("COLOR ACCURACY TEST RESULTS")
print("="*70)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/test-library-header.html')
    page.wait_for_timeout(3000)  # Wait for fonts and styles to load
    
    # Extract implementation colors from Shadow DOM
    impl_colors = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        if (!header || !header.shadowRoot) {
            return { error: 'Component not found or no shadow root' };
        }
        
        const shadow = header.shadowRoot;
        
        // Get elements from shadow DOM
        const title = shadow.querySelector('h1');
        const filterBtn = shadow.querySelector('.filtersButton');
        const searchInput = shadow.querySelector('.searchInput');
        const addBtn = shadow.querySelector('.addWorkButton');
        
        function getColor(el, prop) {
            if (!el) return 'N/A';
            return window.getComputedStyle(el)[prop];
        }
        
        return {
            title: getColor(title, 'color'),
            filter_button_bg: getColor(filterBtn, 'backgroundColor'),
            filter_button_color: getColor(filterBtn, 'color'),
            search_bg: getColor(searchInput, 'backgroundColor'),
            search_border: getColor(searchInput, 'borderTopColor'),
            search_text: getColor(searchInput, 'color'),
            add_work_bg: getColor(addBtn, 'backgroundColor'),
            add_work_text: getColor(addBtn, 'color')
        };
    }''')
    
    browser.close()
    
    if 'error' in impl_colors:
        print(f"\n❌ ERROR: {impl_colors['error']}")
        print("Make sure the component is loaded and has a shadow root.")
        exit(1)
    
    # Calculate deltas
    print(f"\n{'Element':<25} {'Expected RGB':<20} {'Actual RGB':<20} {'ΔE':<10}")
    print("-"*70)
    
    max_delta = 0
    failures = []
    
    for key, ref_rgb in REFERENCE_COLORS.items():
        impl_color_str = impl_colors.get(key, 'N/A')
        impl_rgb = rgb_from_string(impl_color_str)
        delta = delta_e(ref_rgb, impl_rgb)
        max_delta = max(max_delta, delta)
        
        status = "✅" if delta < 2.0 else "❌"
        print(f"{key:<25} {str(ref_rgb):<20} {str(impl_rgb):<20} {delta:<10.2f} {status}")
        
        if delta >= 2.0:
            failures.append({
                'element': key,
                'expected': ref_rgb,
                'actual': impl_rgb,
                'delta': delta
            })
    
    print("-"*70)
    print(f"Maximum Delta E: {max_delta:.2f}")
    print(f"Threshold: 2.0 (imperceptible difference)")
    
    if failures:
        print(f"\n❌ FAILED: {len(failures)} color(s) exceed threshold")
        print("\nFailures:")
        for failure in failures:
            print(f"  - {failure['element']}: ΔE = {failure['delta']:.2f}")
            print(f"    Expected: {failure['expected']}")
            print(f"    Actual: {failure['actual']}")
        print("\nPossible causes:")
        print("  - Component not using design system tokens")
        print("  - Tokens not cascading into Shadow DOM")
        print("  - Wrong token selected for element")
        print("  - CSS custom properties not resolved")
        exit(1)
    else:
        print("\n✅ PASSED: All colors within threshold (ΔE < 2.0)")
        print("Perfect color accuracy achieved!")
        exit(0)
