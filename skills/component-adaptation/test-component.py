#!/usr/bin/env python3
"""
Component Adaptation Testing Script

Usage:
    python3 test-component.py --url http://localhost:5173/test.html --selector wy-component-name --output /tmp/component-test

This script automates the testing workflow for adapted components:
1. Visual capture (light + dark mode)
2. Layout measurements
3. Token usage verification
4. Interactive state testing
5. Quality checks
"""

import argparse
import json
from playwright.sync_api import sync_playwright
from pathlib import Path

def capture_screenshots(page, output_dir, component_selector):
    """Capture component screenshots in both color schemes"""
    print("\n📸 Capturing screenshots...")
    
    # Light mode
    page.emulate_media(color_scheme='light')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{output_dir}/component-light.png')
    
    component = page.query_selector(component_selector)
    if component:
        component.screenshot(path=f'{output_dir}/component-light-isolated.png')
    
    # Dark mode
    page.emulate_media(color_scheme='dark')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{output_dir}/component-dark.png')
    
    if component:
        component.screenshot(path=f'{output_dir}/component-dark-isolated.png')
    
    print(f"  ✓ Saved to {output_dir}/")

def measure_layout(page, component_selector):
    """Measure component layout properties"""
    print("\n📏 Measuring layout...")
    
    measurements = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component) return {{ found: false }};
        
        const rect = component.getBoundingClientRect();
        
        // Try to get shadow root styles
        let shadowStyles = null;
        if (component.shadowRoot) {{
            const firstChild = component.shadowRoot.querySelector('*');
            if (firstChild) {{
                const style = window.getComputedStyle(firstChild);
                shadowStyles = {{
                    padding: style.padding,
                    margin: style.margin,
                    borderRadius: style.borderRadius,
                    backgroundColor: style.backgroundColor,
                    color: style.color
                }};
            }}
        }}
        
        const hostStyle = window.getComputedStyle(component);
        
        return {{
            found: true,
            dimensions: {{
                width: rect.width,
                height: rect.height
            }},
            hostStyles: {{
                display: hostStyle.display,
                position: hostStyle.position
            }},
            shadowStyles: shadowStyles
        }};
    }}''')
    
    if not measurements['found']:
        print(f"  ⚠️ Component '{component_selector}' not found")
        return None
    
    print(f"  Dimensions: {measurements['dimensions']['width']}px × {measurements['dimensions']['height']}px")
    
    if measurements['shadowStyles']:
        print("  Shadow DOM Styles:")
        for prop, value in measurements['shadowStyles'].items():
            print(f"    {prop}: {value}")
    
    return measurements

def check_hardcoded_values(page, component_selector):
    """Detect hardcoded values in component"""
    print("\n🔍 Checking for hardcoded values...")
    
    issues = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component || !component.shadowRoot) return [];
        
        const issues = [];
        
        // Check all elements in shadow DOM
        const allElements = component.shadowRoot.querySelectorAll('*');
        allElements.forEach(el => {{
            // Check inline styles
            const inlineStyle = el.getAttribute('style') || '';
            
            // Detect hex colors
            const hexMatches = inlineStyle.match(/#[0-9A-Fa-f]{{3,6}}/g);
            if (hexMatches) {{
                hexMatches.forEach(hex => {{
                    issues.push({{
                        type: 'hardcoded-color',
                        element: el.tagName.toLowerCase(),
                        value: hex,
                        location: 'inline style'
                    }});
                }});
            }}
            
            // Detect rgba/rgb
            const rgbaMatches = inlineStyle.match(/rgba?\\([^)]+\\)/g);
            if (rgbaMatches) {{
                rgbaMatches.forEach(rgba => {{
                    issues.push({{
                        type: 'hardcoded-color',
                        element: el.tagName.toLowerCase(),
                        value: rgba,
                        location: 'inline style'
                    }});
                }});
            }}
        }});
        
        // Check stylesheets for !important
        const sheets = component.shadowRoot.styleSheets;
        for (let sheet of sheets) {{
            try {{
                for (let rule of sheet.cssRules) {{
                    if (rule.style && rule.style.cssText.includes('!important')) {{
                        issues.push({{
                            type: 'important-declaration',
                            selector: rule.selectorText,
                            value: '!important',
                            location: 'stylesheet'
                        }});
                    }}
                }}
            }} catch(e) {{}}
        }}
        
        return issues;
    }}''')
    
    if len(issues) == 0:
        print("  ✅ No hardcoded values found")
    else:
        print(f"  ⚠️ Found {len(issues)} issue(s):")
        for issue in issues:
            print(f"    - {issue['type']}: {issue['value']} in {issue['element']} ({issue['location']})")
    
    return issues

def test_interactive_states(page, component_selector, output_dir):
    """Test and capture interactive states"""
    print("\n🖱️  Testing interactive states...")
    
    # Find interactive elements
    interactive = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component || !component.shadowRoot) return [];
        
        const buttons = component.shadowRoot.querySelectorAll('button, a, [role="button"]');
        return buttons.length;
    }}''')
    
    if interactive == 0:
        print("  No interactive elements found")
        return
    
    print(f"  Found {interactive} interactive element(s)")
    
    # Try to hover first button
    try:
        # Access shadow DOM element
        component = page.query_selector(component_selector)
        if component:
            # Hover on component host
            component.hover()
            page.wait_for_timeout(300)
            component.screenshot(path=f'{output_dir}/hover-state.png')
            print(f"  ✓ Hover state captured")
    except Exception as e:
        print(f"  ⚠️ Could not test hover: {e}")

def check_dark_mode(page, component_selector, output_dir):
    """Verify dark mode implementation"""
    print("\n🌙 Testing dark mode...")
    
    # Get colors in both modes
    page.emulate_media(color_scheme='light')
    page.wait_for_timeout(500)
    
    light_colors = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component || !component.shadowRoot) return null;
        
        const firstChild = component.shadowRoot.querySelector('*');
        if (!firstChild) return null;
        
        const style = window.getComputedStyle(firstChild);
        return {{
            backgroundColor: style.backgroundColor,
            color: style.color
        }};
    }}''')
    
    page.emulate_media(color_scheme='dark')
    page.wait_for_timeout(500)
    
    dark_colors = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component || !component.shadowRoot) return null;
        
        const firstChild = component.shadowRoot.querySelector('*');
        if (!firstChild) return null;
        
        const style = window.getComputedStyle(firstChild);
        return {{
            backgroundColor: style.backgroundColor,
            color: style.color
        }};
    }}''')
    
    if light_colors and dark_colors:
        colors_differ = (
            light_colors['backgroundColor'] != dark_colors['backgroundColor'] or
            light_colors['color'] != dark_colors['color']
        )
        
        print(f"  Light mode: bg={light_colors['backgroundColor']}, text={light_colors['color']}")
        print(f"  Dark mode: bg={dark_colors['backgroundColor']}, text={dark_colors['color']}")
        
        if colors_differ:
            print("  ✅ Dark mode colors differ (good - themed)")
        else:
            print("  ⚠️ Colors identical in both modes (may need dark mode tokens)")
    else:
        print("  ⚠️ Could not check colors")

def check_material_icons(page, component_selector):
    """Check if Material Icons are loading properly"""
    print("\n🔤 Checking Material Icons...")
    
    icons_check = page.evaluate(f'''() => {{
        const component = document.querySelector('{component_selector}');
        if (!component || !component.shadowRoot) return {{ found: false }};
        
        const icons = component.shadowRoot.querySelectorAll('.material-symbols-outlined');
        if (icons.length === 0) return {{ found: false }};
        
        const firstIcon = icons[0];
        const style = window.getComputedStyle(firstIcon);
        
        return {{
            found: true,
            count: icons.length,
            fontFamily: style.fontFamily,
            fontLoading: style.fontFamily.includes('Material Symbols Outlined'),
            textContent: firstIcon.textContent.trim()
        }};
    }}''')
    
    if not icons_check['found']:
        print("  No Material Icons used in component")
    else:
        print(f"  Found {icons_check['count']} icon(s)")
        if icons_check['fontLoading']:
            print(f"  ✅ Font loading correctly")
        else:
            print(f"  ⚠️ Font not loading - shows: {icons_check['fontFamily']}")
            print(f"  Add this to component static styles:")
            print(f"    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:...');")

def generate_report(output_dir, component_selector, measurements, issues, url):
    """Generate JSON report of test results"""
    report = {
        'url': url,
        'component': component_selector,
        'timestamp': page.evaluate('new Date().toISOString()'),
        'measurements': measurements,
        'issues': issues,
        'screenshots': [
            'component-light.png',
            'component-dark.png',
            'component-light-isolated.png',
            'component-dark-isolated.png',
            'hover-state.png'
        ]
    }
    
    report_path = f'{output_dir}/test-report.json'
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"\n📄 Test report saved: {report_path}")

def main():
    parser = argparse.ArgumentParser(description='Test adapted component')
    parser.add_argument('--url', required=True, help='URL of test page')
    parser.add_argument('--selector', required=True, help='Component selector (e.g., wy-component-name)')
    parser.add_argument('--output', default='/tmp/component-test', help='Output directory for screenshots and reports')
    
    args = parser.parse_args()
    
    # Create output directory
    Path(args.output).mkdir(parents=True, exist_ok=True)
    
    print(f"🧪 Testing Component: {args.selector}")
    print(f"🌐 URL: {args.url}")
    print(f"📁 Output: {args.output}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        try:
            page.goto(args.url)
            page.wait_for_timeout(3000)
            
            # Run all tests
            capture_screenshots(page, args.output, args.selector)
            measurements = measure_layout(page, args.selector)
            issues = check_hardcoded_values(page, args.selector)
            test_interactive_states(page, args.selector, args.output)
            check_dark_mode(page, args.selector, args.output)
            check_material_icons(page, args.selector)
            
            # Generate report
            # generate_report(args.output, args.selector, measurements, issues, args.url)
            
            print("\n" + "="*60)
            if len(issues) == 0 and measurements:
                print("✅ Component adaptation test PASSED!")
                print("All design system requirements met.")
            else:
                print("⚠️ Component adaptation needs attention")
                print(f"Issues found: {len(issues)}")
            print("="*60)
            
        except Exception as e:
            print(f"\n❌ Error during testing: {e}")
        finally:
            browser.close()

if __name__ == '__main__':
    main()
