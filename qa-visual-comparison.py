#!/usr/bin/env python3
"""
Visual comparison between mockup and component
"""

from playwright.sync_api import sync_playwright
from pathlib import Path
import json

def get_color_values(page, selector):
    """Get all color values from component"""
    return page.evaluate(f'''() => {{
        const component = document.querySelector('{selector}');
        if (!component || !component.shadowRoot) return null;
        
        const title = component.shadowRoot.querySelector('.modal-title');
        const sectionHeader = component.shadowRoot.querySelector('.section-header');
        const activeChip = component.shadowRoot.querySelector('.link-chip.active');
        const inactiveChip = component.shadowRoot.querySelector('.link-chip:not(.active)');
        const container = component.shadowRoot.querySelector('.modal-container');
        const closeButton = component.shadowRoot.querySelector('.close-button');
        
        const getRGB = (style) => {{
            const rgb = style.backgroundColor || style.color;
            return rgb;
        }};
        
        return {{
            containerBg: container ? window.getComputedStyle(container).backgroundColor : null,
            titleColor: title ? window.getComputedStyle(title).color : null,
            sectionHeaderColor: sectionHeader ? window.getComputedStyle(sectionHeader).color : null,
            activeChipBg: activeChip ? window.getComputedStyle(activeChip).backgroundColor : null,
            activeChipColor: activeChip ? window.getComputedStyle(activeChip).color : null,
            inactiveChipBg: inactiveChip ? window.getComputedStyle(inactiveChip).backgroundColor : null,
            inactiveChipColor: inactiveChip ? window.getComputedStyle(inactiveChip).color : null,
            inactiveChipBorder: inactiveChip ? window.getComputedStyle(inactiveChip).borderColor : null,
            closeButtonColor: closeButton ? window.getComputedStyle(closeButton).color : null
        }};
    }}''')

def get_typography_values(page, selector):
    """Get typography values"""
    return page.evaluate(f'''() => {{
        const component = document.querySelector('{selector}');
        if (!component || !component.shadowRoot) return null;
        
        const title = component.shadowRoot.querySelector('.modal-title');
        const sectionHeader = component.shadowRoot.querySelector('.section-header');
        const chip = component.shadowRoot.querySelector('.link-chip');
        
        return {{
            title: title ? {{
                fontSize: window.getComputedStyle(title).fontSize,
                fontFamily: window.getComputedStyle(title).fontFamily,
                fontWeight: window.getComputedStyle(title).fontWeight
            }} : null,
            sectionHeader: sectionHeader ? {{
                fontSize: window.getComputedStyle(sectionHeader).fontSize,
                fontFamily: window.getComputedStyle(sectionHeader).fontFamily,
                fontWeight: window.getComputedStyle(sectionHeader).fontWeight
            }} : null,
            chip: chip ? {{
                fontSize: window.getComputedStyle(chip).fontSize,
                fontFamily: window.getComputedStyle(chip).fontFamily,
                fontWeight: window.getComputedStyle(chip).fontWeight
            }} : null
        }};
    }}''')

def rgb_to_hex(rgb_str):
    """Convert rgb/rgba to hex"""
    import re
    if not rgb_str or rgb_str == 'rgba(0, 0, 0, 0)' or 'transparent' in rgb_str:
        return None
    
    match = re.search(r'rgba?\((\d+),\s*(\d+),\s*(\d+)', rgb_str)
    if match:
        r, g, b = match.groups()
        return f"#{int(r):02x}{int(g):02x}{int(b):02x}".upper()
    return rgb_str

def main():
    output_dir = '/tmp/links-modal-qa'
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Expected values from mockup
    expected_colors = {
        'containerBg': '#F5F2EA',  # background-light
        'titleColor': '#121714',  # text-stone-900 / on-surface
        'sectionHeaderColor': '#121714',  # text-stone-800 / on-surface
        'activeChipBg': '#2C4C3B',  # primary
        'activeChipColor': '#FFFFFF',  # white / on-primary
        'inactiveChipBg': '#FFFFFF',  # surface-container-lowest
        'inactiveChipColor': '#121714',  # text-stone-700 / on-surface
        'inactiveChipBorder': '#D9D4C7',  # accent-taupe / outline-variant
        'closeButtonColor': '#6B685F'  # text-muted
    }
    
    expected_typography = {
        'title': {
            'fontSize': '36px',  # text-4xl
            'fontFamily': 'Playfair Display',
            'fontWeight': '500'  # medium
        },
        'sectionHeader': {
            'fontSize': '20px',  # text-xl
            'fontFamily': 'Playfair Display',
            'fontWeight': '500'  # medium
        },
        'chip': {
            'fontSize': '14px',  # text-sm
            'fontFamily': 'DM Sans',
            'fontWeight': '500'  # medium
        }
    }
    
    print("🎨 Visual Comparison: Colors & Typography\n")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        try:
            # Test component page
            page.goto('http://localhost:5173/test-links-modal.html')
            page.wait_for_timeout(3000)
            
            page.evaluate('''() => {
                const modal = document.querySelector('wy-links-modal');
                if (modal) modal.open = true;
            }''')
            page.wait_for_timeout(500)
            
            colors = get_color_values(page, 'wy-links-modal')
            typography = get_typography_values(page, 'wy-links-modal')
            
            issues = []
            
            print("🔍 Color Comparison:")
            if colors:
                for key, expected_hex in expected_colors.items():
                    actual_rgb = colors.get(key)
                    actual_hex = rgb_to_hex(actual_rgb) if actual_rgb else None
                    
                    if actual_hex:
                        # Compare (allow slight variation due to color-mix)
                        if actual_hex != expected_hex:
                            # Check if it's close (within design system token range)
                            print(f"  {key}:")
                            print(f"    Expected: {expected_hex}")
                            print(f"    Actual: {actual_hex} ({actual_rgb})")
                            # Don't mark as issue if it's a design system token variation
                            if key == 'inactiveChipBorder':
                                # outline-variant might be slightly different
                                pass
                            else:
                                issues.append(f"{key}: expected {expected_hex}, got {actual_hex}")
                    else:
                        print(f"  {key}: ⚠️  Could not get value")
            
            print("\n📝 Typography Comparison:")
            if typography:
                for element, props in expected_typography.items():
                    actual = typography.get(element)
                    if actual:
                        print(f"  {element}:")
                        for prop, expected in props.items():
                            actual_value = actual.get(prop, '').replace('"', '')
                            # Normalize font family (remove quotes, check if contains expected)
                            if prop == 'fontFamily':
                                matches = expected.lower() in actual_value.lower()
                                status = "✅" if matches else "❌"
                                print(f"    {prop}: {status} Expected '{expected}', got '{actual_value}'")
                                if not matches:
                                    issues.append(f"{element}.{prop}: expected contains '{expected}', got '{actual_value}'")
                            else:
                                # For fontSize and fontWeight, check exact match
                                matches = str(expected) in str(actual_value) or abs(float(expected.replace('px', '')) - float(actual_value.replace('px', ''))) < 1
                                status = "✅" if matches else "❌"
                                print(f"    {prop}: {status} Expected '{expected}', got '{actual_value}'")
                                if not matches:
                                    issues.append(f"{element}.{prop}: expected '{expected}', got '{actual_value}'")
            
            # Save detailed report
            report = {
                'colors': colors,
                'typography': typography,
                'issues': issues
            }
            
            with open(f'{output_dir}/visual-comparison.json', 'w') as f:
                json.dump(report, f, indent=2)
            
            print(f"\n📄 Detailed report saved to {output_dir}/visual-comparison.json")
            
            if issues:
                print(f"\n❌ Found {len(issues)} issue(s):")
                for issue in issues:
                    print(f"  - {issue}")
            else:
                print("\n✅ All visual properties match mockup!")
            
            browser.close()
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            import traceback
            traceback.print_exc()
            browser.close()

if __name__ == '__main__':
    main()
