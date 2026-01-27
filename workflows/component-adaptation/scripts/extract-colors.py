#!/usr/bin/env python3
"""
Color extraction script for variant selector component adaptation.
Extracts all colors from reference HTML and computes delta E values against design system tokens.
"""

import json
import math
from pathlib import Path
from playwright.sync_api import sync_playwright

def rgb_to_hex(rgb_str):
    """Convert 'rgb(r, g, b)' or 'rgba(r, g, b, a)' to hex."""
    if not rgb_str or rgb_str == 'rgba(0, 0, 0, 0)' or rgb_str == 'transparent':
        return None
    
    # Extract numbers from rgb() or rgba()
    parts = rgb_str.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',')
    r, g, b = [int(float(p.strip())) for p in parts[:3]]
    return f'#{r:02x}{g:02x}{b:02x}'.upper()

def hex_to_rgb(hex_color):
    """Convert hex to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def calculate_delta_e(rgb1, rgb2):
    """Calculate perceptual color difference (simplified delta E)."""
    if not rgb1 or not rgb2:
        return float('inf')
    
    # Simple Euclidean distance in RGB space (good enough for our purposes)
    delta_r = rgb1[0] - rgb2[0]
    delta_g = rgb1[1] - rgb2[1]
    delta_b = rgb1[2] - rgb2[2]
    
    return math.sqrt(delta_r**2 + delta_g**2 + delta_b**2)

def extract_reference_colors(html_path):
    """Extract colors from reference HTML using Playwright."""
    colors = {}
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # Load reference HTML (file:// URL)
        page.goto(f'file://{html_path}')
        
        # Wait for content to load
        page.wait_for_timeout(500)
        
        # Extract label color
        label = page.query_selector('label')
        if label:
            color = page.evaluate('(el) => getComputedStyle(el).color', label)
            colors['label'] = {
                'element': 'Label "STYLE"',
                'rgb_string': color,
                'hex': rgb_to_hex(color),
                'rgb': hex_to_rgb(rgb_to_hex(color)) if rgb_to_hex(color) else None
            }
        
        # Extract button text color
        button_text = page.query_selector('button span:first-child')
        if button_text:
            color = page.evaluate('(el) => getComputedStyle(el).color', button_text)
            colors['button_text'] = {
                'element': 'Button text "Formal & Professional"',
                'rgb_string': color,
                'hex': rgb_to_hex(color),
                'rgb': hex_to_rgb(rgb_to_hex(color)) if rgb_to_hex(color) else None
            }
        
        # Extract button background
        button = page.query_selector('button')
        if button:
            bg_color = page.evaluate('(el) => getComputedStyle(el).backgroundColor', button)
            border_color = page.evaluate('(el) => getComputedStyle(el).borderColor', button)
            colors['button_bg'] = {
                'element': 'Button background',
                'rgb_string': bg_color,
                'hex': rgb_to_hex(bg_color),
                'rgb': hex_to_rgb(rgb_to_hex(bg_color)) if rgb_to_hex(bg_color) else None
            }
            colors['button_border'] = {
                'element': 'Button border (default)',
                'rgb_string': border_color,
                'hex': rgb_to_hex(border_color),
                'rgb': hex_to_rgb(rgb_to_hex(border_color)) if rgb_to_hex(border_color) else None
            }
        
        # Extract chevron icon color
        chevron = page.query_selector('.material-symbols-outlined')
        if chevron:
            color = page.evaluate('(el) => getComputedStyle(el).color', chevron)
            colors['chevron'] = {
                'element': 'Chevron icon',
                'rgb_string': color,
                'hex': rgb_to_hex(color),
                'rgb': hex_to_rgb(rgb_to_hex(color)) if rgb_to_hex(color) else None
            }
        
        # Extract panel background
        panel = page.query_selector('div.bg-alabaster')
        if panel:
            bg_color = page.evaluate('(el) => getComputedStyle(el).backgroundColor', panel)
            border_color = page.evaluate('(el) => getComputedStyle(el).borderColor', panel)
            colors['panel_bg'] = {
                'element': 'Description panel background',
                'rgb_string': bg_color,
                'hex': rgb_to_hex(bg_color),
                'rgb': hex_to_rgb(rgb_to_hex(bg_color)) if rgb_to_hex(bg_color) else None
            }
            colors['panel_border'] = {
                'element': 'Description panel border',
                'rgb_string': border_color,
                'hex': rgb_to_hex(border_color),
                'rgb': hex_to_rgb(rgb_to_hex(border_color)) if rgb_to_hex(border_color) else None
            }
        
        # Extract panel text color
        panel_text = page.query_selector('div.bg-alabaster p')
        if panel_text:
            color = page.evaluate('(el) => getComputedStyle(el).color', panel_text)
            colors['panel_text'] = {
                'element': 'Description panel text',
                'rgb_string': color,
                'hex': rgb_to_hex(color),
                'rgb': hex_to_rgb(rgb_to_hex(color)) if rgb_to_hex(color) else None
            }
        
        browser.close()
    
    return colors

def main():
    # Design system color tokens (from tokens.css)
    DESIGN_TOKENS = {
        '--md-sys-color-background': '#FDFBF7',  # Alabaster
        '--md-sys-color-on-background': '#121714',  # Deep Green-Black
        '--md-sys-color-surface': '#F5F2EA',  # Warm Clay
        '--md-sys-color-on-surface': '#121714',
        '--md-sys-color-on-surface-variant': '#49454E',
        '--md-sys-color-surface-container-highest': '#D7D3C8',
        '--md-sys-color-outline-variant': '#D7D3C8',
        '--md-sys-color-text-muted': '#667f71',
        '--wy-links-modal-title-color': '#1C1917',  # stone-900
        '--wy-links-modal-close-color': '#A8A29E',  # stone-400
    }
    
    # Reference HTML path
    # __file__ is in m3-design-v2/workflows/component-adaptation/scripts/
    # Need to navigate to m3-design-v2/design-system-examples/variants-selector/code.html
    script_dir = Path(__file__).resolve().parent
    m3_root = script_dir.parent.parent.parent  # Up from scripts/ -> component-adaptation/ -> workflows/ -> m3-design-v2/
    ref_html = m3_root / 'design-system-examples/variants-selector/code.html'
    
    if not ref_html.exists():
        print(f"❌ Reference HTML not found at: {ref_html}")
        print(f"Script dir: {script_dir}")
        print(f"M3 root: {m3_root}")
        return
    
    print("🎨 Extracting colors from reference HTML...")
    colors = extract_reference_colors(ref_html)
    
    print("\n" + "="*100)
    print("COLOR EXTRACTION RESULTS")
    print("="*100 + "\n")
    
    # Create mapping table
    mapping = []
    
    for key, data in colors.items():
        if not data['rgb']:
            continue
        
        element = data['element']
        ref_rgb = data['rgb']
        ref_hex = data['hex']
        
        # Find closest design token
        best_match = None
        best_delta = float('inf')
        
        for token_name, token_hex in DESIGN_TOKENS.items():
            token_rgb = hex_to_rgb(token_hex)
            delta = calculate_delta_e(ref_rgb, token_rgb)
            
            if delta < best_delta:
                best_delta = delta
                best_match = (token_name, token_hex, token_rgb)
        
        exact_match = best_delta < 2.0
        
        mapping.append({
            'element': element,
            'reference_rgb': ref_rgb,
            'reference_hex': ref_hex,
            'token_name': best_match[0] if best_match else 'N/A',
            'token_hex': best_match[1] if best_match else 'N/A',
            'token_rgb': best_match[2] if best_match else None,
            'delta_e': best_delta,
            'exact_match': exact_match,
            'action': 'Use token' if exact_match else 'Create component-specific token'
        })
    
    # Print table
    print(f"{'Element':<35} {'Ref RGB':<18} {'Ref Hex':<10} {'Best Token':<40} {'Delta E':<10} {'Action':<30}")
    print("-" * 160)
    
    for m in mapping:
        status = '✓' if m['exact_match'] else '✗'
        print(f"{m['element']:<35} {str(m['reference_rgb']):<18} {m['reference_hex']:<10} "
              f"{m['token_name']:<40} {m['delta_e']:<10.2f} {status} {m['action']:<28}")
    
    print("\n" + "="*100)
    print("SUMMARY")
    print("="*100 + "\n")
    
    exact_matches = sum(1 for m in mapping if m['exact_match'])
    component_tokens_needed = sum(1 for m in mapping if not m['exact_match'])
    
    print(f"Total colors analyzed: {len(mapping)}")
    print(f"Exact matches (Δ < 2.0): {exact_matches}")
    print(f"Component-specific tokens needed: {component_tokens_needed}")
    
    # Determine which component tokens to create
    print("\n" + "="*100)
    print("RECOMMENDED COMPONENT-SPECIFIC TOKENS")
    print("="*100 + "\n")
    
    component_tokens = {}
    for m in mapping:
        if not m['exact_match']:
            # Determine token name based on element
            if 'label' in m['element'].lower():
                token_name = '--wy-dropdown-label-color'
            elif 'button text' in m['element'].lower():
                token_name = '--wy-dropdown-text-color'
            elif 'chevron' in m['element'].lower():
                token_name = '--wy-dropdown-icon-color'
            elif 'panel text' in m['element'].lower():
                token_name = '--wy-info-panel-text-color'
            elif 'panel background' in m['element'].lower():
                token_name = '--wy-info-panel-bg'
            elif 'panel border' in m['element'].lower():
                token_name = '--wy-info-panel-border'
            elif 'button background' in m['element'].lower():
                token_name = '--wy-dropdown-bg'
            elif 'button border' in m['element'].lower():
                token_name = '--wy-dropdown-border'
            else:
                token_name = f'--wy-unknown-{key}'
            
            if token_name not in component_tokens:
                component_tokens[token_name] = {
                    'value': m['reference_hex'],
                    'reason': f"Reference uses {m['reference_hex']}, delta E = {m['delta_e']:.2f} from {m['token_name']}"
                }
    
    for token_name, data in component_tokens.items():
        print(f"{token_name}: {data['value']};")
        print(f"  /* {data['reason']} */\n")
    
    # Save detailed report
    report_path = Path(__file__).parent.parent / 'color-mapping-report.md'
    with open(report_path, 'w') as f:
        f.write("# Color Mapping Report\n\n")
        f.write("## Extraction Results\n\n")
        f.write("| Element | Reference RGB | Hex | Design Token | Token Hex | Delta E | Exact Match | Action |\n")
        f.write("|---------|---------------|-----|--------------|-----------|---------|-------------|--------|\n")
        
        for m in mapping:
            match_str = '✓' if m['exact_match'] else '✗'
            f.write(f"| {m['element']} | {m['reference_rgb']} | {m['reference_hex']} | "
                   f"{m['token_name']} | {m['token_hex']} | {m['delta_e']:.2f} | {match_str} | {m['action']} |\n")
        
        f.write(f"\n## Summary\n\n")
        f.write(f"- Total colors analyzed: {len(mapping)}\n")
        f.write(f"- Exact matches (Δ < 2.0): {exact_matches}\n")
        f.write(f"- Component-specific tokens needed: {component_tokens_needed}\n")
        
        f.write(f"\n## Recommended Component Tokens\n\n")
        f.write("```css\n")
        for token_name, data in component_tokens.items():
            f.write(f"{token_name}: {data['value']};\n")
            f.write(f"  /* {data['reason']} */\n\n")
        f.write("```\n")
    
    print(f"\n✅ Detailed report saved to: {report_path}")
    
    # Save JSON data
    json_path = Path(__file__).parent.parent / 'extracted-colors.json'
    with open(json_path, 'w') as f:
        json.dump({'colors': colors, 'mapping': mapping, 'component_tokens': component_tokens}, f, indent=2)
    
    print(f"✅ JSON data saved to: {json_path}")

if __name__ == '__main__':
    main()
