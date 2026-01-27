#!/usr/bin/env python3
"""
Color Extraction Script for Plot Header Component Adaptation

Extracts all colors from reference mockup HTML and compares against design system tokens.
"""

from playwright.sync_api import sync_playwright
import math

def rgb_from_string(color_str):
    """Parse rgb(r, g, b) or rgba(r, g, b, a) to RGB tuple"""
    if 'rgb' in color_str:
        values = color_str.split('(')[1].split(')')[0].split(',')
        return tuple(int(v.strip()) for v in values[:3])
    return None

def hex_from_rgb(rgb):
    """Convert RGB tuple to hex string"""
    return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"

print("\n" + "="*70)
print("COLOR EXTRACTION FROM REFERENCE MOCKUP")
print("="*70)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    
    # Load reference mockup
    ref_path = 'file:///Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/m3-design-v2/design-system-examples/plot-header/code.html'
    page.goto(ref_path)
    page.wait_for_timeout(2000)
    
    # Extract colors from key elements
    colors = page.evaluate('''() => {
        const header = document.querySelector('header');
        const title = header.querySelector('h1');
        
        // Filter button - contains "tune" icon
        const filterBtn = Array.from(header.querySelectorAll('button')).find(btn => 
            btn.querySelector('span.material-icons-outlined')?.textContent.includes('tune')
        );
        
        const searchInput = header.querySelector('input[type="text"]');
        
        // Add work button - contains "Add work" text
        const addWorkBtn = Array.from(header.querySelectorAll('button')).find(btn => 
            btn.textContent.includes('Add work')
        );
        
        // Status green - "IN SYNC" text
        const statusText = Array.from(header.querySelectorAll('span')).find(el => 
            el.textContent.trim() === 'IN SYNC'
        );
        
        function getStyle(el, prop) {
            if (!el) return 'N/A';
            return window.getComputedStyle(el)[prop];
        }
        
        return {
            page_bg: getStyle(document.body, 'backgroundColor'),
            title_color: getStyle(title, 'color'),
            title_font_family: getStyle(title, 'fontFamily'),
            title_font_size: getStyle(title, 'fontSize'),
            filter_btn_bg: getStyle(filterBtn, 'backgroundColor'),
            filter_btn_color: getStyle(filterBtn, 'color'),
            search_bg: getStyle(searchInput, 'backgroundColor'),
            search_border: getStyle(searchInput, 'borderTopColor'),
            search_color: getStyle(searchInput, 'color'),
            search_placeholder_color: getStyle(searchInput, 'color'),
            add_work_bg: getStyle(addWorkBtn, 'backgroundColor'),
            add_work_color: getStyle(addWorkBtn, 'color'),
            status_green: getStyle(statusText, 'color')
        };
    }''')
    
    browser.close()

# Print extracted colors
print("\nExtracted Colors from Reference:")
print("-"*70)
print(f"{'Element':<25} {'Color String':<35} {'RGB':<20} {'Hex'}")
print("-"*70)

color_mapping = {}
for key, value in colors.items():
    if value != 'N/A':
        rgb = rgb_from_string(value)
        if rgb:
            hex_val = hex_from_rgb(rgb)
            color_mapping[key] = {'rgb': rgb, 'hex': hex_val, 'original': value}
            print(f"{key:<25} {value:<35} {str(rgb):<20} {hex_val}")
        else:
            print(f"{key:<25} {value:<35} {'N/A':<20} N/A")
    else:
        print(f"{key:<25} Not found")

# Design system token comparison
print("\n" + "="*70)
print("DESIGN SYSTEM TOKEN COMPARISON")
print("="*70)

# Known design system tokens (from tokens.css)
DESIGN_TOKENS = {
    'md-sys-color-primary': (44, 76, 59),  # #2C4C3B
    'md-sys-color-on-surface': (18, 23, 20),  # #121714
    'md-sys-color-surface': (245, 242, 234),  # #F5F2EA
    'md-sys-color-background': (253, 251, 247),  # #FDFBF7
    'color-border': (215, 211, 200),  # #D7D3C8 (outline-variant)
    'md-sys-color-on-primary': (255, 255, 255),  # #FFFFFF
}

def delta_e(color1, color2):
    """Calculate Euclidean distance in RGB space"""
    return math.sqrt(sum((c1 - c2) ** 2 for c1, c2 in zip(color1, color2)))

print(f"\n{'Element':<25} {'Ref RGB':<20} {'Token':<30} {'Token RGB':<20} {'ΔE':<10}")
print("-"*70)

recommendations = []

for elem_key, elem_data in color_mapping.items():
    elem_rgb = elem_data['rgb']
    best_match = None
    best_delta = float('inf')
    best_token = None
    
    for token_name, token_rgb in DESIGN_TOKENS.items():
        delta = delta_e(elem_rgb, token_rgb)
        if delta < best_delta:
            best_delta = delta
            best_match = token_rgb
            best_token = token_name
    
    status = "✅" if best_delta < 2.0 else "⚠️"
    print(f"{elem_key:<25} {str(elem_rgb):<20} {best_token:<30} {str(best_match):<20} {best_delta:<10.2f} {status}")
    
    if best_delta >= 2.0:
        recommendations.append({
            'element': elem_key,
            'rgb': elem_rgb,
            'hex': elem_data['hex'],
            'delta': best_delta,
            'closest_token': best_token
        })

# Print recommendations
if recommendations:
    print("\n" + "="*70)
    print("COMPONENT-SPECIFIC TOKENS NEEDED")
    print("="*70)
    print("\nThe following colors don't match existing tokens (ΔE >= 2.0):")
    print("These require component-specific tokens:\n")
    
    for rec in recommendations:
        print(f"Element: {rec['element']}")
        print(f"  RGB: {rec['rgb']}")
        print(f"  Hex: {rec['hex']}")
        print(f"  ΔE from closest token ({rec['closest_token']}): {rec['delta']:.2f}")
        print(f"  Recommended token: --wy-library-header-{rec['element'].replace('_', '-')}")
        print()
else:
    print("\n✅ All colors match existing design system tokens (ΔE < 2.0)")

print("="*70)
print("EXTRACTION COMPLETE")
print("="*70)
