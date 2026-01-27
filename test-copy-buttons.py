#!/usr/bin/env python3
"""
Copy Button Test for Components Library

Tests that all Copy buttons copy component identifiers in the correct format:
"component-name prop1=value1 prop2=value2" instead of raw HTML code.

Usage:
    python3 test-copy-buttons.py
"""

import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

# Load components data to generate expected identifiers
COMPONENTS_JSON = Path(__file__).parent / 'src' / 'data' / 'components.json'

def generate_expected_identifier(comp_name, example_props):
    """
    Generate expected component identifier using same logic as generateComponentIdentifier()
    Format: "component-name prop1=value1 prop2" (boolean true = prop name only)
    """
    parts = [comp_name]
    
    if example_props and isinstance(example_props, dict):
        for key, value in example_props.items():
            if value is True or value == 'true':
                # Boolean true: include as prop name only
                parts.append(key)
            elif value is False or value == 'false' or value is None or value == '':
                # Skip false, null, undefined, or empty values
                continue
            else:
                # String/number values: include as prop=value
                parts.append(f"{key}={value}")
    
    return ' '.join(parts)

def validate_identifier_format(identifier):
    """
    Validate that identifier matches expected format (lenient validation):
    - Starts with component name (wy-* preferred, but allow others)
    - Contains props in some form (prop=value or boolean props)
    - Basic structure is reasonable
    
    Note: This validator is intentionally lenient because prop values can contain
    spaces and special characters, making precise parsing difficult without quoting.
    The main goal is to verify the identifier exists and has a reasonable structure.
    """
    if not identifier or not isinstance(identifier, str):
        return False, "Identifier is empty or not a string"
    
    # Handle empty string
    identifier = identifier.strip()
    if not identifier:
        return False, "Identifier is empty after trimming"
    
    # Extract component name (first word)
    parts = identifier.split(None, 1)  # Split on whitespace, max 1 split
    component_name = parts[0]
    
    # Validate component name - be lenient
    # Allow wy-* components and other reasonable identifiers
    if component_name.startswith('wy-'):
        # Validate wy- component format (kebab-case)
        if not re.match(r'^wy-[a-z]+(?:-[a-z]+)*$', component_name):
            return False, f"Component name '{component_name}' has invalid format (should be wy-kebab-case)"
    else:
        # Allow non-wy- components (like icon-sizes) - just check basic format
        if not re.match(r'^[a-z]+(?:-[a-z]+)*$', component_name):
            return False, f"Component name '{component_name}' has invalid format"
    
    # Basic structure check - if there are props, verify basic format
    if len(parts) > 1:
        props_str = parts[1].strip()
        
        # Check for obviously malformed patterns:
        # - Multiple consecutive equals signs
        if '==' in props_str:
            return False, "Invalid format: multiple consecutive equals signs"
        
        # - Starts with = (empty prop name)
        if props_str.startswith('='):
            return False, "Invalid format: prop starts with '=' (empty prop name)"
        
        # - Ends with = and nothing after (empty value) - but allow if there's content before
        if props_str.endswith('=') and '=' not in props_str[:-1]:
            return False, "Invalid format: prop ends with '=' (empty value)"
    
    # If we got here, basic structure is OK
    # Note: We're not doing strict parsing of prop values with spaces
    # because the format doesn't support unquoted values with spaces well
    return True, None

def test_copy_buttons():
    """Main test function"""
    
    print("\n" + "="*70)
    print("COPY BUTTON TEST RESULTS")
    print("="*70)
    
    # Load components data
    with open(COMPONENTS_JSON, 'r') as f:
        components_data = json.load(f)
    
    # Build expected identifiers map
    expected_identifiers = {}
    for comp in components_data.get('components', []):
        comp_name = comp.get('name')
        for idx, example in enumerate(comp.get('examples', [])):
            example_name = example.get('name', f'Example {idx}')
            props = example.get('props', {})
            expected_id = generate_expected_identifier(comp_name, props)
            key = f"{comp_name}::{example_name}"
            expected_identifiers[key] = expected_id
    
    print(f"\nLoaded {len(components_data.get('components', []))} components")
    print(f"Generated {len(expected_identifiers)} expected identifiers\n")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        # Navigate to components library
        print("Navigating to components library...")
        page.goto('http://localhost:5173/components-library.html')
        
        # Wait for component library to render
        print("Waiting for component library to render...")
        page.wait_for_selector('#component-library-container', timeout=10000)
        page.wait_for_timeout(2000)  # Additional wait for dynamic content
        
        # Mock clipboard to capture what gets copied
        page.evaluate('''() => {
            window.__copiedText = null;
            const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
            navigator.clipboard.writeText = function(text) {
                window.__copiedText = text;
                return originalWriteText(text);
            };
        }''')
        
        # Find all copy buttons
        print("\nDiscovering copy buttons...")
        buttons_data = page.evaluate('''() => {
            const buttons = Array.from(document.querySelectorAll('.copy-code-btn'));
            return buttons.map((btn, idx) => {
                const identifier = btn.getAttribute('data-component-identifier');
                const codeId = btn.getAttribute('data-code-id');
                
                // Try to find component name and example name from DOM
                let componentName = '';
                let exampleName = '';
                let buttonType = 'unknown';
                
                // Extract component name from identifier if available (most reliable)
                if (identifier) {
                    const parts = identifier.split(' ');
                    if (parts.length > 0 && parts[0].startsWith('wy-')) {
                        componentName = parts[0];
                    }
                }
                
                // Check if it's a grouped variant button
                const groupedItem = btn.closest('.grouped-variant-item');
                if (groupedItem) {
                    buttonType = 'grouped';
                    const h5 = groupedItem.querySelector('h5');
                    if (h5) exampleName = h5.textContent.trim();
                    
                    // Fallback: Find component name from parent component item if not in identifier
                    if (!componentName) {
                        const componentItem = btn.closest('.component-item-compact');
                        if (componentItem) {
                            const titleEl = componentItem.querySelector('h3, h4, h2');
                            if (titleEl) {
                                const titleText = titleEl.textContent.trim();
                                // Extract component name from title (e.g., "Button (wy-button)" or just "wy-button")
                                const match = titleText.match(/\((\w+-\w+(?:-\w+)*)\)/) || titleText.match(/(\w+-\w+(?:-\w+)*)/);
                                if (match) componentName = match[1];
                            }
                        }
                    }
                } else {
                    buttonType = 'regular';
                    // Regular example button
                    const exampleEl = btn.closest('.component-example-compact');
                    if (exampleEl) {
                        const h5 = exampleEl.querySelector('h5');
                        if (h5) exampleName = h5.textContent.trim();
                        
                        // Fallback: Find component name from parent component item if not in identifier
                        if (!componentName) {
                            const componentItem = exampleEl.closest('.component-item-compact');
                            if (componentItem) {
                                const titleEl = componentItem.querySelector('h3, h4, h2');
                                if (titleEl) {
                                    const titleText = titleEl.textContent.trim();
                                    const match = titleText.match(/\((\w+-\w+(?:-\w+)*)\)/) || titleText.match(/(\w+-\w+(?:-\w+)*)/);
                                    if (match) componentName = match[1];
                                }
                            }
                        }
                    }
                }
                
                return {
                    index: idx,
                    identifier: identifier || null,
                    codeId: codeId || null,
                    componentName: componentName,
                    exampleName: exampleName,
                    buttonType: buttonType,
                    hasIdentifier: identifier !== null
                };
            });
        }''')
        
        print(f"Found {len(buttons_data)} copy buttons\n")
        
        # Test results
        results = {
            'total': len(buttons_data),
            'passed': 0,
            'failed': 0,
            'failures': []
        }
        
        # Test each button
        print("Testing copy buttons...\n")
        
        for btn_data in buttons_data:
            btn_idx = btn_data['index']
            identifier = btn_data['identifier']
            component_name = btn_data['componentName']
            example_name = btn_data['exampleName']
            button_type = btn_data['buttonType']
            has_identifier = btn_data['hasIdentifier']
            
            # Generate test label
            test_label = f"{component_name} ({example_name})" if component_name and example_name else f"Button {btn_idx}"
            
            # Test 1: Check if identifier attribute exists
            if not has_identifier:
                results['failed'] += 1
                results['failures'].append({
                    'button': test_label,
                    'type': button_type,
                    'issue': 'Missing data-component-identifier attribute',
                    'expected': 'Component identifier string',
                    'actual': 'No attribute found'
                })
                print(f"  ✗ {test_label} [{button_type}] - FAIL: Missing identifier attribute")
                continue
            
            # Test 2: Validate identifier format
            format_valid, format_error = validate_identifier_format(identifier)
            if not format_valid:
                results['failed'] += 1
                results['failures'].append({
                    'button': test_label,
                    'type': button_type,
                    'issue': f'Invalid identifier format: {format_error}',
                    'expected': 'Valid component identifier format',
                    'actual': identifier
                })
                print(f"  ✗ {test_label} [{button_type}] - FAIL: {format_error}")
                print(f"      Identifier: {identifier}")
                continue
            
            # Test 3: Compare with expected identifier from JSON (if we can match component/example)
            if component_name and example_name:
                expected_key = f"{component_name}::{example_name}"
                expected_id = expected_identifiers.get(expected_key)
                
                if expected_id:
                    if identifier != expected_id:
                        results['failed'] += 1
                        results['failures'].append({
                            'button': test_label,
                            'type': button_type,
                            'issue': 'Identifier does not match expected value from JSON',
                            'expected': expected_id,
                            'actual': identifier
                        })
                        print(f"  ✗ {test_label} [{button_type}] - FAIL: Mismatch with JSON")
                        print(f"      Expected: {expected_id}")
                        print(f"      Actual:   {identifier}")
                        continue
                # Note: If expected_id is None, component/example not found in JSON - this is OK, continue testing
            
            # Test 4: Simulate click and verify clipboard content
            try:
                # Clear previous clipboard capture
                page.evaluate('window.__copiedText = null;')
                
                # Click the button
                page.evaluate(f'''() => {{
                    const buttons = Array.from(document.querySelectorAll('.copy-code-btn'));
                    const btn = buttons[{btn_idx}];
                    if (btn) {{
                        btn.click();
                    }}
                }}''')
                
                # Wait a bit for clipboard operation
                page.wait_for_timeout(100)
                
                # Check what was copied
                copied_text = page.evaluate('window.__copiedText')
                
                if copied_text != identifier:
                    results['failed'] += 1
                    results['failures'].append({
                        'button': test_label,
                        'type': button_type,
                        'issue': 'Clipboard content does not match identifier',
                        'expected': identifier,
                        'actual': copied_text or '(nothing copied)'
                    })
                    print(f"  ✗ {test_label} [{button_type}] - FAIL: Wrong clipboard content")
                    print(f"      Expected: {identifier}")
                    print(f"      Copied:   {copied_text or '(nothing)'}")
                    continue
                
            except Exception as e:
                results['failed'] += 1
                results['failures'].append({
                    'button': test_label,
                    'type': button_type,
                    'issue': f'Error testing clipboard: {str(e)}',
                    'expected': identifier,
                    'actual': 'Error occurred'
                })
                print(f"  ✗ {test_label} [{button_type}] - FAIL: Error - {str(e)}")
                continue
            
            # All tests passed
            results['passed'] += 1
            print(f"  ✓ {test_label} [{button_type}] - PASS")
        
        browser.close()
        
        # Print summary
        print("\n" + "="*70)
        print("SUMMARY")
        print("="*70)
        print(f"Total buttons tested: {results['total']}")
        print(f"Passed: {results['passed']}")
        print(f"Failed: {results['failed']}")
        
        if results['failed'] > 0:
            print("\nFAILURES:")
            for failure in results['failures']:
                print(f"\n  Component: {failure['button']}")
                print(f"  Type: {failure['type']}")
                print(f"  Issue: {failure['issue']}")
                print(f"  Expected: {failure['expected']}")
                print(f"  Actual: {failure['actual']}")
        
        # Exit with appropriate code
        if results['failed'] == 0:
            print("\nAll copy buttons working correctly! ✓")
            return 0
        else:
            print(f"\n{results['failed']} copy button(s) failed ✗")
            return 1

if __name__ == '__main__':
    import sys
    try:
        exit_code = test_copy_buttons()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")
        sys.exit(130)
    except Exception as e:
        print(f"\n\nTest failed with error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
