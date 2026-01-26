#!/usr/bin/env python3
"""
Automated QA for wy-links-modal component
Compares rendered component with mockup to ensure exact match
"""

import argparse
from playwright.sync_api import sync_playwright
from pathlib import Path
import json

def measure_component(page, selector):
    """Measure all visual properties of the component"""
    return page.evaluate(f'''() => {{
        const component = document.querySelector('{selector}');
        if (!component || !component.shadowRoot) return null;
        
        // Get modal container
        const container = component.shadowRoot.querySelector('.modal-container');
        const content = component.shadowRoot.querySelector('.modal-content');
        const title = component.shadowRoot.querySelector('.modal-title');
        const firstSection = component.shadowRoot.querySelector('.section');
        const firstSectionHeader = component.shadowRoot.querySelector('.section-header');
        const firstChip = component.shadowRoot.querySelector('.link-chip');
        const activeChip = component.shadowRoot.querySelector('.link-chip.active');
        const inactiveChip = component.shadowRoot.querySelector('.link-chip:not(.active)');
        
        if (!container || !content || !title || !firstChip) return null;
        
        const containerStyle = window.getComputedStyle(container);
        const contentStyle = window.getComputedStyle(content);
        const titleStyle = window.getComputedStyle(title);
        const headerStyle = window.getComputedStyle(firstSectionHeader);
        const chipStyle = window.getComputedStyle(firstChip);
        const activeChipStyle = activeChip ? window.getComputedStyle(activeChip) : null;
        const inactiveChipStyle = inactiveChip ? window.getComputedStyle(inactiveChip) : null;
        
        // Get spacing measurements
        const sectionsContainer = component.shadowRoot.querySelector('.sections-container');
        const sectionGap = sectionsContainer ? window.getComputedStyle(sectionsContainer).gap : null;
        const sectionGapValue = sectionGap ? parseFloat(sectionGap) : null;
        
        const section = component.shadowRoot.querySelector('.section');
        const sectionGapValue2 = section ? parseFloat(window.getComputedStyle(section).gap) : null;
        
        const chipsContainer = component.shadowRoot.querySelector('.chips-container');
        const chipGap = chipsContainer ? window.getComputedStyle(chipsContainer).gap : null;
        const chipGapValue = chipGap ? parseFloat(chipGap) : null;
        
        return {{
            // Container
            container: {{
                backgroundColor: containerStyle.backgroundColor,
                borderRadius: containerStyle.borderRadius,
                borderColor: containerStyle.borderColor,
                borderWidth: containerStyle.borderWidth,
                padding: contentStyle.padding,
                paddingTop: contentStyle.paddingTop,
                paddingRight: contentStyle.paddingRight,
                paddingBottom: contentStyle.paddingBottom,
                paddingLeft: contentStyle.paddingLeft,
                maxWidth: containerStyle.maxWidth,
                width: containerStyle.width
            }},
            
            // Title
            title: {{
                fontFamily: titleStyle.fontFamily,
                fontSize: titleStyle.fontSize,
                fontWeight: titleStyle.fontWeight,
                color: titleStyle.color,
                marginBottom: titleStyle.marginBottom
            }},
            
            // Section header
            sectionHeader: {{
                fontFamily: headerStyle.fontFamily,
                fontSize: headerStyle.fontSize,
                fontWeight: headerStyle.fontWeight,
                color: headerStyle.color,
                marginBottom: headerStyle.marginBottom
            }},
            
            // Spacing
            spacing: {{
                sectionsGap: sectionGapValue,
                sectionHeaderGap: sectionGapValue2,
                chipsGap: chipGapValue
            }},
            
            // Chip (inactive)
            chip: {{
                padding: chipStyle.padding,
                paddingTop: chipStyle.paddingTop,
                paddingRight: chipStyle.paddingRight,
                paddingBottom: chipStyle.paddingBottom,
                paddingLeft: chipStyle.paddingLeft,
                borderRadius: chipStyle.borderRadius,
                borderColor: chipStyle.borderColor,
                borderWidth: chipStyle.borderWidth,
                backgroundColor: chipStyle.backgroundColor,
                color: chipStyle.color,
                fontSize: chipStyle.fontSize,
                fontFamily: chipStyle.fontFamily,
                fontWeight: chipStyle.fontWeight
            }},
            
            // Active chip
            activeChip: activeChipStyle ? {{
                backgroundColor: activeChipStyle.backgroundColor,
                color: activeChipStyle.color,
                borderColor: activeChipStyle.borderColor
            }} : null,
            
            // Inactive chip
            inactiveChip: inactiveChipStyle ? {{
                backgroundColor: inactiveChipStyle.backgroundColor,
                color: inactiveChipStyle.color,
                borderColor: inactiveChipStyle.borderColor
            }} : null
        }};
    }}''')

def compare_with_mockup(measurements, output_dir):
    """Compare measurements with expected values from mockup"""
    # Expected values from mockup code.html
    expected = {
        'container': {
            'borderRadius': '16px',  # rounded-2xl
            'padding': '32px',  # p-8
        },
        'title': {
            'fontSize': '36px',  # text-4xl
            'marginBottom': '48px',  # mb-12
        },
        'sectionHeader': {
            'fontSize': '20px',  # text-xl
            'marginBottom': '20px',  # mb-5
        },
        'spacing': {
            'sectionsGap': 40,  # space-y-10
            'sectionHeaderGap': 20,  # mb-5
            'chipsGap': 12,  # gap-3
        },
        'chip': {
            'paddingTop': '10px',  # py-2.5
            'paddingBottom': '10px',  # py-2.5
            'paddingLeft': '24px',  # px-6
            'paddingRight': '24px',  # px-6
            'borderRadius': '9999px',  # rounded-full
        }
    }
    
    issues = []
    
    # Compare values
    if measurements:
        # Container padding
        padding_top = parse_px(measurements['container']['paddingTop'])
        if padding_top != 32:
            issues.append(f"Container padding-top: expected 32px, got {padding_top}px")
        
        # Title margin-bottom
        title_mb = parse_px(measurements['title']['marginBottom'])
        if abs(title_mb - 48) > 1:  # Allow 1px tolerance
            issues.append(f"Title margin-bottom: expected 48px, got {title_mb}px")
        
        # Section spacing
        sections_gap = measurements['spacing']['sectionsGap']
        if sections_gap and abs(sections_gap - 40) > 1:
            issues.append(f"Sections gap: expected 40px, got {sections_gap}px")
        
        # Section header gap
        section_header_gap = measurements['spacing']['sectionHeaderGap']
        if section_header_gap and abs(section_header_gap - 20) > 1:
            issues.append(f"Section header gap: expected 20px, got {section_header_gap}px")
        
        # Chip gap
        chip_gap = measurements['spacing']['chipsGap']
        if chip_gap and abs(chip_gap - 12) > 1:
            issues.append(f"Chip gap: expected 12px, got {chip_gap}px")
        
        # Chip padding
        chip_padding_top = parse_px(measurements['chip']['paddingTop'])
        if abs(chip_padding_top - 10) > 1:
            issues.append(f"Chip padding-top: expected 10px, got {chip_padding_top}px")
        
        chip_padding_left = parse_px(measurements['chip']['paddingLeft'])
        if abs(chip_padding_left - 24) > 1:
            issues.append(f"Chip padding-left: expected 24px, got {chip_padding_left}px")
        
        # Chip border radius
        chip_border_radius = measurements['chip']['borderRadius']
        if '9999px' not in chip_border_radius and '999px' not in chip_border_radius:
            issues.append(f"Chip border-radius: expected 9999px, got {chip_border_radius}")
        
        # Inactive chip background
        inactive_bg = measurements['inactiveChip']['backgroundColor'] if measurements['inactiveChip'] else None
        if inactive_bg:
            # Should have a background color (not transparent)
            if 'rgba(0, 0, 0, 0)' in inactive_bg or 'transparent' in inactive_bg:
                issues.append(f"Inactive chip background: expected solid color, got {inactive_bg}")
    
    return issues

def parse_px(value):
    """Parse px value to number"""
    if not value:
        return 0
    if 'px' in str(value):
        return float(str(value).replace('px', ''))
    if 'rem' in str(value):
        # Convert rem to px (assuming 16px base)
        return float(str(value).replace('rem', '')) * 16
    return 0

def rgb_to_hex(rgb_str):
    """Convert rgb/rgba string to hex"""
    import re
    match = re.search(r'rgba?\((\d+),\s*(\d+),\s*(\d+)', rgb_str)
    if match:
        r, g, b = match.groups()
        return f"#{int(r):02x}{int(g):02x}{int(b):02x}".upper()
    return rgb_str

def main():
    parser = argparse.ArgumentParser(description='QA test for wy-links-modal')
    parser.add_argument('--url', default='http://localhost:5173/test-links-modal.html', help='Test page URL')
    parser.add_argument('--selector', default='wy-links-modal', help='Component selector')
    parser.add_argument('--output', default='/tmp/links-modal-qa', help='Output directory')
    
    args = parser.parse_args()
    
    Path(args.output).mkdir(parents=True, exist_ok=True)
    
    print("🔍 Automated QA: wy-links-modal Component")
    print(f"🌐 URL: {args.url}")
    print(f"📁 Output: {args.output}\n")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        try:
            page.goto(args.url)
            page.wait_for_timeout(3000)  # Wait for component to render
            
            # Ensure modal is open
            page.evaluate(f'''() => {{
                const modal = document.querySelector('{args.selector}');
                if (modal) modal.open = true;
            }}''')
            page.wait_for_timeout(500)
            
            # Capture screenshot
            print("📸 Capturing screenshot...")
            page.screenshot(path=f'{args.output}/component-rendered.png', full_page=True)
            
            # Measure component
            print("📏 Measuring component properties...")
            measurements = measure_component(page, args.selector)
            
            if measurements:
                # Save measurements
                with open(f'{args.output}/measurements.json', 'w') as f:
                    json.dump(measurements, f, indent=2)
                
                print("\n📊 Measurements:")
                print(f"  Container padding: {measurements['container']['padding']}")
                print(f"  Title margin-bottom: {measurements['title']['marginBottom']}")
                print(f"  Sections gap: {measurements['spacing']['sectionsGap']}px")
                print(f"  Section header gap: {measurements['spacing']['sectionHeaderGap']}px")
                print(f"  Chips gap: {measurements['spacing']['chipsGap']}px")
                print(f"  Chip padding: {measurements['chip']['padding']}")
                print(f"  Chip border-radius: {measurements['chip']['borderRadius']}")
                if measurements['inactiveChip']:
                    print(f"  Inactive chip background: {measurements['inactiveChip']['backgroundColor']}")
                
                # Compare with mockup
                print("\n🔍 Comparing with mockup...")
                issues = compare_with_mockup(measurements, args.output)
                
                if issues:
                    print("\n❌ Issues found:")
                    for issue in issues:
                        print(f"  - {issue}")
                    print(f"\n⚠️  Found {len(issues)} issue(s) that need fixing")
                else:
                    print("\n✅ All measurements match mockup!")
            else:
                print("❌ Could not measure component - element not found or not visible")
            
            browser.close()
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            import traceback
            traceback.print_exc()
            browser.close()

if __name__ == '__main__':
    main()
