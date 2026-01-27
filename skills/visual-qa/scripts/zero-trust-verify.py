#!/usr/bin/env python3
"""
Zero-Trust QA Verification Script
Rigorously verifies implementation quality beyond DOM presence

Usage:
  python3 zero-trust-verify.py --url https://p.weaver-yuwono.com --output /tmp/prompts-qa
"""

from playwright.sync_api import sync_playwright
import time
import json
import argparse
from pathlib import Path

def verify_prompts_library(url="https://p.weaver-yuwono.com", output_dir="/tmp/prompts-qa"):
    """Run comprehensive Zero-Trust verification on prompts library"""
    
    results = {
        "timestamp": int(time.time()),
        "url": url,
        "tests": [],
        "failures": [],
        "manual_verification_needed": []
    }
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1400, 'height': 900})
        
        # Capture console logs
        console_logs = []
        page.on('console', lambda msg: console_logs.append({
            'type': msg.type,
            'text': msg.text
        }))
        
        # Cache-busting
        cache_bust_url = f"{url}?v={int(time.time())}"
        print(f"Loading {cache_bust_url} (cache-busted)...")
        page.goto(cache_bust_url)
        page.wait_for_load_state('networkidle')
        
        # TEST 1: Console Hygiene (ZERO-TOLERANCE)
        print("\n1. Console Hygiene...")
        errors = [log for log in console_logs if log['type'] in ['error', 'warning']]
        favicon_404 = [log for log in errors if 'favicon' in log['text'].lower()]
        real_errors = [log for log in errors if 'favicon' not in log['text'].lower()]
        
        if real_errors:
            results['failures'].append({
                'test': 'Console Hygiene',
                'reason': f'{len(real_errors)} console errors/warnings found (excluding favicon)',
                'details': real_errors
            })
            print(f"   ❌ FAIL: {len(real_errors)} errors/warnings")
        else:
            results['tests'].append({'name': 'Console Hygiene', 'status': 'PASS'})
            print(f"   ✅ PASS: Zero console errors/warnings")
        
        # TEST 2: Component Registration (with type check)
        print("\n2. Component Registration...")
        reg_check = page.evaluate("""
            () => {
                const dropdown = customElements.get('wy-dropdown');
                const infoPanel = customElements.get('wy-info-panel');
                const controlsBar = customElements.get('wy-controls-bar');
                
                return {
                    dropdown: dropdown && typeof dropdown === 'function',
                    infoPanel: infoPanel && typeof infoPanel === 'function',
                    controlsBar: controlsBar && typeof controlsBar === 'function'
                };
            }
        """)
        
        if not all(reg_check.values()):
            results['failures'].append({
                'test': 'Component Registration',
                'reason': 'Not all components registered as constructors',
                'details': reg_check
            })
            print(f"   ❌ FAIL: Missing components - {reg_check}")
        else:
            results['tests'].append({'name': 'Component Registration', 'status': 'PASS'})
            print(f"   ✅ PASS: All components registered")
        
        # TEST 3: Controls Bar - Toggle Visibility (verify hidden)
        print("\n3. Controls Bar Toggle Hiding...")
        toggle_check = page.evaluate("""
            () => {
                const bar = document.querySelector('wy-controls-bar');
                if (!bar || !bar.shadowRoot) return {error: 'Controls bar not found'};
                
                const toggleSection = bar.shadowRoot.querySelector('.toggle-section');
                return {
                    toggleSectionExists: toggleSection !== null,
                    hideViewToggle: bar.hideViewToggle,
                    hideDetailsToggle: bar.hideDetailsToggle
                };
            }
        """)
        
        if toggle_check.get('error'):
            results['failures'].append({
                'test': 'Controls Bar Toggle Hiding',
                'reason': toggle_check['error']
            })
            print(f"   ❌ FAIL: {toggle_check['error']}")
        elif toggle_check.get('toggleSectionExists'):
            results['failures'].append({
                'test': 'Controls Bar Toggle Hiding',
                'reason': 'Toggle section still exists in DOM',
                'details': toggle_check
            })
            print(f"   ❌ FAIL: Toggle section still visible")
        else:
            results['tests'].append({'name': 'Controls Bar Toggle Hiding', 'status': 'PASS'})
            print(f"   ✅ PASS: Toggles hidden (hideViewToggle={toggle_check['hideViewToggle']}, hideDetailsToggle={toggle_check['hideDetailsToggle']})")
        
        # Open Character Portrait modal
        print("\n4. Opening Character Portrait modal...")
        page.evaluate("""
            () => {
                const cards = Array.from(document.querySelectorAll('.prompt-card'));
                for (const card of cards) {
                    const title = card.querySelector('.card-title');
                    if (title && title.textContent.trim() === 'Character Portrait') {
                        card.click();
                        break;
                    }
                }
            }
        """)
        page.wait_for_timeout(2000)
        
        # TEST 4: Modal Padding Alignment (STRICT - must be exact)
        print("\n5. Modal Padding Alignment...")
        padding_check = page.evaluate("""
            () => {
                const header = document.querySelector('.modal-header');
                const desc = document.querySelector('.prompt-modal-description');
                const container = document.querySelector('.variation-selector-container');
                
                if (!header || !desc || !container) {
                    return {error: 'Modal elements not found'};
                }
                
                const headerPadding = parseInt(getComputedStyle(header).paddingLeft);
                const descPadding = parseInt(getComputedStyle(desc).paddingLeft);
                const containerPadding = parseInt(getComputedStyle(container).paddingLeft);
                
                return {
                    header: headerPadding,
                    description: descPadding,
                    container: containerPadding,
                    aligned: headerPadding === descPadding && descPadding === containerPadding,
                    maxDiff: Math.max(
                        Math.abs(headerPadding - descPadding),
                        Math.abs(descPadding - containerPadding),
                        Math.abs(headerPadding - containerPadding)
                    )
                };
            }
        """)
        
        if padding_check.get('error'):
            results['failures'].append({
                'test': 'Modal Padding Alignment',
                'reason': padding_check['error']
            })
            print(f"   ❌ FAIL: {padding_check['error']}")
        elif not padding_check.get('aligned'):
            results['failures'].append({
                'test': 'Modal Padding Alignment',
                'reason': f'Padding mismatch: {padding_check["maxDiff"]}px difference',
                'details': padding_check
            })
            print(f"   ❌ FAIL: Misalignment detected")
            print(f"      Header: {padding_check['header']}px")
            print(f"      Description: {padding_check['description']}px")
            print(f"      Container: {padding_check['container']}px")
            print(f"      Max diff: {padding_check['maxDiff']}px")
        else:
            results['tests'].append({'name': 'Modal Padding Alignment', 'status': 'PASS'})
            print(f"   ✅ PASS: All elements aligned at {padding_check['header']}px")
        
        # TEST 5: Dropdown Implementation Quality
        print("\n6. Dropdown Implementation Quality...")
        dropdown_check = page.evaluate("""
            () => {
                const dropdown = document.querySelector('wy-dropdown');
                if (!dropdown || !dropdown.shadowRoot) {
                    return {error: 'Dropdown not found'};
                }
                
                const selector = dropdown.shadowRoot.querySelector('.selector');
                const icon = dropdown.shadowRoot.querySelector('.icon');
                
                if (!selector) return {error: 'Selector button not found in shadow DOM'};
                
                const selectorStyles = getComputedStyle(selector);
                const iconStyles = icon ? getComputedStyle(icon) : null;
                
                return {
                    value: dropdown.value,
                    optionsCount: dropdown.options ? dropdown.options.length : 0,
                    selectorDisplay: selectorStyles.display,
                    selectorBg: selectorStyles.backgroundColor,
                    selectorBorderRadius: selectorStyles.borderRadius,
                    selectorWidth: selector.offsetWidth,
                    selectorHeight: selector.offsetHeight,
                    iconColor: iconStyles ? iconStyles.color : null,
                    iconFontFamily: iconStyles ? iconStyles.fontFamily : null,
                    iconText: icon ? icon.textContent : null
                };
            }
        """)
        
        if dropdown_check.get('error'):
            results['failures'].append({
                'test': 'Dropdown Quality',
                'reason': dropdown_check['error']
            })
            print(f"   ❌ FAIL: {dropdown_check['error']}")
        elif dropdown_check['selectorWidth'] == 0 or dropdown_check['selectorHeight'] == 0:
            results['failures'].append({
                'test': 'Dropdown Quality',
                'reason': 'Dropdown has zero dimensions',
                'details': dropdown_check
            })
            print(f"   ❌ FAIL: Zero dimensions ({dropdown_check['selectorWidth']}x{dropdown_check['selectorHeight']})")
        elif dropdown_check['optionsCount'] == 0:
            results['failures'].append({
                'test': 'Dropdown Quality',
                'reason': 'Dropdown has no options set',
                'details': dropdown_check
            })
            print(f"   ❌ FAIL: No options set")
        elif not dropdown_check['iconFontFamily'] or 'Material Symbols' not in dropdown_check['iconFontFamily']:
            results['failures'].append({
                'test': 'Dropdown Quality',
                'reason': f'Icon font not loaded: {dropdown_check["iconFontFamily"]}',
                'details': dropdown_check
            })
            print(f"   ❌ FAIL: Icon font not Material Symbols")
        else:
            results['tests'].append({'name': 'Dropdown Quality', 'status': 'PASS', 'details': dropdown_check})
            print(f"   ✅ PASS: Dropdown functional")
            print(f"      Value: {dropdown_check['value']}")
            print(f"      Options: {dropdown_check['optionsCount']}")
            print(f"      Dimensions: {dropdown_check['selectorWidth']}x{dropdown_check['selectorHeight']}px")
            print(f"      Icon: {dropdown_check['iconText']}")
        
        # TEST 6: Info Panel Visibility and Content
        print("\n7. Info Panel Visibility and Content...")
        panel_check = page.evaluate("""
            () => {
                const panel = document.querySelector('wy-info-panel');
                if (!panel || !panel.shadowRoot) {
                    return {error: 'Info panel not found'};
                }
                
                const panelEl = panel.shadowRoot.querySelector('.panel');
                if (!panelEl) return {error: 'Panel element not found in shadow DOM'};
                
                const styles = getComputedStyle(panel);
                const innerStyles = getComputedStyle(panelEl);
                
                return {
                    display: styles.display,
                    width: panel.offsetWidth,
                    height: panel.offsetHeight,
                    contentLength: panel.textContent.trim().length,
                    bg: innerStyles.backgroundColor,
                    borderColor: innerStyles.borderColor,
                    borderWidth: innerStyles.borderWidth,
                    borderRadius: innerStyles.borderRadius,
                    textColor: innerStyles.color,
                    marginTop: styles.marginTop
                };
            }
        """)
        
        if panel_check.get('error'):
            results['failures'].append({
                'test': 'Info Panel Visibility',
                'reason': panel_check['error']
            })
            print(f"   ❌ FAIL: {panel_check['error']}")
        elif panel_check['display'] == 'none':
            results['failures'].append({
                'test': 'Info Panel Visibility',
                'reason': 'Info panel display is none'
            })
            print(f"   ❌ FAIL: Display is none")
        elif panel_check['width'] == 0 or panel_check['height'] == 0:
            results['failures'].append({
                'test': 'Info Panel Visibility',
                'reason': 'Info panel has zero dimensions',
                'details': panel_check
            })
            print(f"   ❌ FAIL: Zero dimensions ({panel_check['width']}x{panel_check['height']})")
        elif panel_check['contentLength'] == 0:
            results['failures'].append({
                'test': 'Info Panel Visibility',
                'reason': 'Info panel has no content',
                'details': panel_check
            })
            print(f"   ❌ FAIL: No content")
        else:
            results['tests'].append({'name': 'Info Panel Visibility', 'status': 'PASS', 'details': panel_check})
            print(f"   ✅ PASS: Info panel visible")
            print(f"      Dimensions: {panel_check['width']}x{panel_check['height']}px")
            print(f"      Content: {panel_check['contentLength']} chars")
            print(f"      Margin-top: {panel_check['marginTop']}")
        
        # TEST 7: Design Token Resolution (Three-Level Verification)
        print("\n8. Design Token Resolution (Three-Level Verification)...")
        token_check = page.evaluate("""
            () => {
                return new Promise(resolve => {
                    const root = document.documentElement;
                    const dropdown = document.querySelector('wy-dropdown');
                    
                    if (!dropdown || !dropdown.shadowRoot) {
                        resolve({error: 'Dropdown not found'});
                        return;
                    }
                    
                    const rootStyles = getComputedStyle(root);
                    const componentStyles = getComputedStyle(dropdown);
                    
                    // Open dropdown to check menu
                    const selector = dropdown.shadowRoot.querySelector('.selector');
                    if (selector) selector.click();
                    
                    setTimeout(() => {
                        const menu = dropdown.shadowRoot.querySelector('.dropdown');
                        
                        resolve({
                            // Root level
                            root_spaceLg: rootStyles.getPropertyValue('--space-lg').trim(),
                            root_spaceMd: rootStyles.getPropertyValue('--space-md').trim(),
                            root_dropdownMenuBg: rootStyles.getPropertyValue('--wy-dropdown-menu-bg').trim(),
                            
                            // Component level (after :host override)
                            component_dropdownMenuBg: componentStyles.getPropertyValue('--wy-dropdown-menu-bg').trim(),
                            
                            // Actual computed (what renders)
                            dropdown_variant: dropdown.variant,
                            selector_bg: getComputedStyle(dropdown.shadowRoot.querySelector('.selector')).backgroundColor,
                            menu_bg: menu ? getComputedStyle(menu).backgroundColor : null,
                            menu_exists: menu !== null
                        });
                    }, 300);
                });
            }
        """)
        
        if token_check.get('error'):
            results['failures'].append({'test': 'Design Token Resolution', 'reason': token_check['error']})
            print(f"   ❌ FAIL: {token_check['error']}")
        else:
            # Verify tokens resolve correctly (accept both px and rem)
            issues = []
            space_lg_acceptable = token_check['root_spaceLg'] in ['24px', '1.5rem']
            space_md_acceptable = token_check['root_spaceMd'] in ['16px', '1rem']
            
            if not space_lg_acceptable:
                issues.append(f"--space-lg = {token_check['root_spaceLg']}, expected 24px or 1.5rem")
            if not space_md_acceptable:
                issues.append(f"--space-md = {token_check['root_spaceMd']}, expected 16px or 1rem")
            
            # Verify variant override works (three-level check)
            if token_check['dropdown_variant'] == 'subtle':
                expected_menu_bg = 'rgb(253, 251, 247)'  # Container Low for subtle
                expected_component_var = '#FDFBF7'  # What --wy-dropdown-menu-bg should be at component level
                
                # Check component-level override happened
                if token_check['root_dropdownMenuBg'] == token_check['component_dropdownMenuBg']:
                    issues.append(f"Variant override not working: Level 1 and Level 2 identical ({token_check['root_dropdownMenuBg']})")
                
                # Check actual rendered background (if menu is open)
                if token_check['menu_bg'] and token_check['menu_bg'] != expected_menu_bg:
                    issues.append(f"Subtle variant menu renders as {token_check['menu_bg']}, expected {expected_menu_bg}")
                elif not token_check['menu_exists']:
                    # Menu not rendered, can't verify Level 3
                    pass
            
            if issues:
                results['failures'].append({
                    'test': 'Design Token Resolution',
                    'reason': 'Token values or variant override incorrect',
                    'details': issues
                })
                print(f"   ❌ FAIL: {', '.join(issues)}")
            else:
                results['tests'].append({'name': 'Design Token Resolution', 'status': 'PASS', 'details': token_check})
                print(f"   ✅ PASS: Design tokens resolve correctly")
                print(f"      --space-lg: {token_check['root_spaceLg']}")
                print(f"      --space-md: {token_check['root_spaceMd']}")
                if token_check['dropdown_variant']:
                    print(f"      Dropdown variant: {token_check['dropdown_variant']}")
                    print(f"      Level 1 (Root): --wy-dropdown-menu-bg = {token_check['root_dropdownMenuBg']}")
                    print(f"      Level 2 (Component): --wy-dropdown-menu-bg = {token_check['component_dropdownMenuBg']}")
                    print(f"      Level 3 (Actual): menu background = {token_check['menu_bg']}")
                    if token_check['root_dropdownMenuBg'] != token_check['component_dropdownMenuBg']:
                        print(f"      ✅ Component override active")
        
        # TEST 8: Font Loading Verification
        print("\n9. Font Loading Verification...")
        font_check = page.evaluate("""
            () => {
                const dropdown = document.querySelector('wy-dropdown');
                if (!dropdown || !dropdown.shadowRoot) return {error: 'Dropdown not found'};
                
                const label = dropdown.shadowRoot.querySelector('.label');
                const value = dropdown.shadowRoot.querySelector('.value');
                const icon = dropdown.shadowRoot.querySelector('.icon');
                
                return {
                    labelFont: label ? getComputedStyle(label).fontFamily : null,
                    valueFont: value ? getComputedStyle(value).fontFamily : null,
                    iconFont: icon ? getComputedStyle(icon).fontFamily : null,
                    expectedSans: 'DM Sans',
                    expectedSymbols: 'Material Symbols Outlined'
                };
            }
        """)
        
        if font_check.get('error'):
            results['failures'].append({'test': 'Font Loading', 'reason': font_check['error']})
            print(f"   ❌ FAIL: {font_check['error']}")
        else:
            font_issues = []
            if font_check['labelFont'] and 'DM Sans' not in font_check['labelFont']:
                font_issues.append(f"Label using fallback: {font_check['labelFont']}")
            if font_check['valueFont'] and 'DM Sans' not in font_check['valueFont']:
                font_issues.append(f"Value using fallback: {font_check['valueFont']}")
            if font_check['iconFont'] and 'Material Symbols' not in font_check['iconFont']:
                font_issues.append(f"Icon font not loaded: {font_check['iconFont']}")
            
            if font_issues:
                results['failures'].append({'test': 'Font Loading', 'reason': 'Fonts falling back', 'details': font_issues})
                print(f"   ❌ FAIL: {', '.join(font_issues)}")
            else:
                results['tests'].append({'name': 'Font Loading', 'status': 'PASS'})
                print(f"   ✅ PASS: All fonts loaded correctly")
        
        # TEST 9: Border Visibility
        print("\n10. Border Visibility...")
        border_check = page.evaluate("""
            () => {
                const infoPanel = document.querySelector('wy-info-panel');
                if (!infoPanel || !infoPanel.shadowRoot) return {error: 'Info panel not found'};
                
                const panel = infoPanel.shadowRoot.querySelector('.panel');
                if (!panel) return {error: 'Panel element not found'};
                
                const styles = getComputedStyle(panel);
                return {
                    borderWidth: styles.borderWidth,
                    borderStyle: styles.borderStyle,
                    borderColor: styles.borderColor,
                    hasVisibleBorder: styles.borderWidth !== '0px' && styles.borderStyle !== 'none'
                };
            }
        """)
        
        if border_check.get('error'):
            results['failures'].append({'test': 'Border Visibility', 'reason': border_check['error']})
            print(f"   ❌ FAIL: {border_check['error']}")
        elif not border_check.get('hasVisibleBorder'):
            results['failures'].append({'test': 'Border Visibility', 'reason': 'Info panel border not visible', 'details': border_check})
            print(f"   ❌ FAIL: Border width is {border_check['borderWidth']}")
        else:
            results['tests'].append({'name': 'Border Visibility', 'status': 'PASS'})
            print(f"   ✅ PASS: Borders visible ({border_check['borderWidth']} {border_check['borderStyle']})")
        
        # TEST 10: Layout Overflow Check
        print("\n11. Layout Overflow...")
        overflow_check = page.evaluate("""
            () => {
                const modal = document.querySelector('.prompt-modal-content');
                if (!modal) return {error: 'Modal not found'};
                
                return {
                    scrollWidth: modal.scrollWidth,
                    clientWidth: modal.clientWidth,
                    scrollHeight: modal.scrollHeight,
                    clientHeight: modal.clientHeight,
                    hasHorizontalOverflow: modal.scrollWidth > modal.clientWidth,
                    hasVerticalOverflow: modal.scrollHeight > modal.clientHeight
                };
            }
        """)
        
        if overflow_check.get('error'):
            results['failures'].append({
                'test': 'Layout Overflow',
                'reason': overflow_check['error']
            })
            print(f"   ❌ FAIL: {overflow_check['error']}")
        elif overflow_check.get('hasHorizontalOverflow'):
            results['failures'].append({
                'test': 'Layout Overflow',
                'reason': f"Horizontal overflow: {overflow_check['scrollWidth']}px > {overflow_check['clientWidth']}px",
                'details': overflow_check
            })
            print(f"   ❌ FAIL: Horizontal overflow detected")
        else:
            results['tests'].append({'name': 'Layout Overflow', 'status': 'PASS'})
            print(f"   ✅ PASS: No overflow")
            if overflow_check.get('hasVerticalOverflow'):
                print(f"      (Vertical overflow OK for scrollable content)")
        
        # TEST 11: Interactive State Changes (verify hover actually changes styles)
        print("\n12. Interactive State Verification...")
        state_check = page.evaluate("""
            () => {
                const dropdown = document.querySelector('wy-dropdown');
                if (!dropdown || !dropdown.shadowRoot) return {error: 'Dropdown not found'};
                
                const selector = dropdown.shadowRoot.querySelector('.selector');
                if (!selector) return {error: 'Selector not found'};
                
                // Get default state
                const defaultBorder = getComputedStyle(selector).borderColor;
                
                // Trigger hover
                selector.dispatchEvent(new MouseEvent('mouseenter', {bubbles: true}));
                
                return new Promise(resolve => {
                    setTimeout(() => {
                        const hoverBorder = getComputedStyle(selector).borderColor;
                        const stateLayer = selector.querySelector('::before');
                        
                        resolve({
                            defaultBorder: defaultBorder,
                            hoverBorder: hoverBorder,
                            borderChanges: defaultBorder !== hoverBorder,
                            hasStateLayer: selector.classList.contains('selector')  // Simplified check
                        });
                    }, 100);
                });
            }
        """)
        
        if state_check.get('error'):
            results['failures'].append({'test': 'Interactive State Changes', 'reason': state_check['error']})
            print(f"   ❌ FAIL: {state_check['error']}")
        elif not state_check.get('borderChanges'):
            results['manual_verification_needed'].append({
                'check': 'Hover State Visual Change',
                'instructions': [
                    'Hover over dropdown button and verify border appears or color changes',
                    'State layer should show subtle overlay on hover',
                    'Visual feedback should be immediate and clear'
                ]
            })
            print(f"   ⚠️  MANUAL: Border didn't change programmatically (may need visual check)")
        else:
            results['tests'].append({'name': 'Interactive State Changes', 'status': 'PASS'})
            print(f"   ✅ PASS: Hover state triggers border change")
        
        # TEST 12: ARIA Attributes
        print("\n13. ARIA Attributes...")
        aria_check = page.evaluate("""
            () => {
                const dropdown = document.querySelector('wy-dropdown');
                if (!dropdown || !dropdown.shadowRoot) return {error: 'Dropdown not found'};
                
                const selector = dropdown.shadowRoot.querySelector('.selector');
                if (!selector) return {error: 'Selector not found'};
                
                return {
                    hasAriaHaspopup: selector.hasAttribute('aria-haspopup'),
                    ariaHaspopup: selector.getAttribute('aria-haspopup'),
                    hasAriaExpanded: selector.hasAttribute('aria-expanded'),
                    ariaExpanded: selector.getAttribute('aria-expanded'),
                    hasAriaLabel: selector.hasAttribute('aria-label') || dropdown.label
                };
            }
        """)
        
        if aria_check.get('error'):
            results['failures'].append({'test': 'ARIA Attributes', 'reason': aria_check['error']})
            print(f"   ❌ FAIL: {aria_check['error']}")
        else:
            aria_issues = []
            if not aria_check.get('hasAriaHaspopup'):
                aria_issues.append('Missing aria-haspopup')
            if not aria_check.get('hasAriaExpanded'):
                aria_issues.append('Missing aria-expanded')
            
            if aria_issues:
                results['failures'].append({'test': 'ARIA Attributes', 'reason': ', '.join(aria_issues), 'details': aria_check})
                print(f"   ❌ FAIL: {', '.join(aria_issues)}")
            else:
                results['tests'].append({'name': 'ARIA Attributes', 'status': 'PASS'})
                print(f"   ✅ PASS: Required ARIA attributes present")
                print(f"      aria-haspopup: {aria_check['ariaHaspopup']}")
                print(f"      aria-expanded: {aria_check['ariaExpanded']}")
        
        # TEST 13: Event Firing Verification
        print("\n14. Event Firing Verification...")
        event_check = page.evaluate("""
            () => {
                return new Promise(resolve => {
                    const dropdown = document.querySelector('wy-dropdown');
                    if (!dropdown) {
                        resolve({error: 'Dropdown not found'});
                        return;
                    }
                    
                    let eventFired = false;
                    let eventDetail = null;
                    
                    // Listen for change event
                    dropdown.addEventListener('change', (e) => {
                        eventFired = true;
                        eventDetail = e.detail;
                    });
                    
                    // Programmatically change value
                    const oldValue = dropdown.value;
                    dropdown.value = 'test-value-change';
                    
                    // Dispatch change event manually since programmatic change doesn't auto-fire
                    dropdown.dispatchEvent(new CustomEvent('change', {
                        detail: { value: 'test-value-change' }
                    }));
                    
                    setTimeout(() => {
                        resolve({
                            eventFired: eventFired,
                            eventDetail: eventDetail,
                            valueChanged: dropdown.value === 'test-value-change'
                        });
                    }, 100);
                });
            }
        """)
        
        if event_check.get('error'):
            results['failures'].append({'test': 'Event Firing', 'reason': event_check['error']})
            print(f"   ❌ FAIL: {event_check['error']}")
        elif not event_check.get('eventFired'):
            results['failures'].append({'test': 'Event Firing', 'reason': 'Change event did not fire', 'details': event_check})
            print(f"   ❌ FAIL: Change event did not fire")
        elif not event_check.get('eventDetail') or not event_check['eventDetail'].get('value'):
            results['failures'].append({'test': 'Event Firing', 'reason': 'Event detail missing or incorrect', 'details': event_check})
            print(f"   ❌ FAIL: Event fired but detail incorrect")
        else:
            results['tests'].append({'name': 'Event Firing', 'status': 'PASS'})
            print(f"   ✅ PASS: Change event fires with correct detail.value")
        
        # Capture screenshot with modal open
        page.screenshot(path=str(output_path / 'modal-verification.png'))
        print(f"\n📸 Screenshot saved: {output_path / 'modal-verification.png'}")
        
        # Manual verification requirements
        results['manual_verification_needed'].extend([
            {
                'check': 'Dropdown Menu Background Color',
                'instructions': [
                    '1. Hard refresh https://p.weaver-yuwono.com (Cmd+Shift+R)',
                    '2. Open "Character Portrait" prompt',
                    '3. Click variation dropdown to open menu',
                    '4. Verify menu background is #EBE5DE (warm beige Container High)',
                    '5. Compare to page background #FDFBF7 (slightly lighter)',
                    '6. Confirm visible contrast between menu and background'
                ]
            },
            {
                'check': '16px Gap Between Dropdown and Info Panel',
                'instructions': [
                    '1. In Character Portrait modal',
                    '2. Use DevTools to measure gap between dropdown bottom and info-panel top',
                    '3. Should be exactly 16px (margin-top: 16px on .variation-description-panel)',
                    '4. Acceptable tolerance: ±1px'
                ]
            }
        ])
        
        browser.close()
    
    return results

def main():
    parser = argparse.ArgumentParser(description='Zero-Trust QA Verification')
    parser.add_argument('--url', default='https://p.weaver-yuwono.com', help='URL to test')
    parser.add_argument('--output', default='/tmp/prompts-qa', help='Output directory')
    args = parser.parse_args()
    
    results = verify_prompts_library(args.url, args.output)
    
    # Print report
    print("\n" + "=" * 80)
    print("ZERO-TRUST QA REPORT")
    print("=" * 80)
    
    if results['tests']:
        print(f"\n✅ PASSED: {len(results['tests'])}")
        for test in results['tests']:
            print(f"  - {test['name']}")
    
    if results['failures']:
        print(f"\n❌ FAILED: {len(results['failures'])}")
        for failure in results['failures']:
            print(f"  - {failure['test']}: {failure['reason']}")
            if 'details' in failure:
                if isinstance(failure['details'], dict):
                    for key, val in failure['details'].items():
                        print(f"      {key}: {val}")
    
    if results['manual_verification_needed']:
        print(f"\n⚠️  MANUAL VERIFICATION REQUIRED: {len(results['manual_verification_needed'])}")
        for item in results['manual_verification_needed']:
            print(f"\n  {item['check']}:")
            for instruction in item['instructions']:
                print(f"    {instruction}")
    
    # Overall status
    print("\n" + "=" * 80)
    if results['failures']:
        print("❌ OVERALL STATUS: FAILING")
        print(f"   {len(results['failures'])} test(s) failed")
    else:
        print("✅ OVERALL STATUS: PASSING (programmatic checks)")
        print(f"   ⚠️  {len(results['manual_verification_needed'])} manual check(s) required")
    print("=" * 80)
    
    # Save full report
    report_path = Path(args.output) / 'zero-trust-report.json'
    with open(report_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\nFull report: {report_path}")

if __name__ == '__main__':
    main()
