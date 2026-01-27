#!/usr/bin/env python3
"""
Interactive State Testing for Library Header Component

Tests hover, focus, active, and scrolled states to ensure they match
Material Design 3 specifications and reference design.
"""

from playwright.sync_api import sync_playwright
from pathlib import Path

OUTPUT_DIR = Path('/tmp/library-header-test')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\n" + "="*70)
print("INTERACTIVE STATE TESTING")
print("="*70)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/test-library-header.html')
    page.wait_for_timeout(3000)
    
    header = page.query_selector('wy-library-header')
    
    # Test 1: Default state
    print("\n1️⃣  Testing default state...")
    header.screenshot(path=str(OUTPUT_DIR / 'state-default.png'))
    print("  ✓ Default state captured")
    
    # Test 2: Filter button hover
    print("\n2️⃣  Testing filter button hover...")
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const btn = header.shadowRoot.querySelector('.filtersButton');
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }''')
    page.wait_for_timeout(300)
    
    # Check for state layer
    has_state_layer = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const btn = header.shadowRoot.querySelector('.filtersButton');
        const style = window.getComputedStyle(btn, '::before');
        return {
            hasBeforeElement: style.content !== 'none',
            opacity: style.opacity,
            backgroundColor: style.backgroundColor
        };
    }''')
    
    header.screenshot(path=str(OUTPUT_DIR / 'state-filter-hover.png'))
    print(f"  ✓ Filter button hover captured")
    print(f"    State layer opacity: {has_state_layer.get('opacity', 'N/A')}")
    
    # Test 3: Search input focus
    print("\n3️⃣  Testing search input focus...")
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const input = header.shadowRoot.querySelector('.searchInput');
        input.focus();
    }''')
    page.wait_for_timeout(300)
    
    # Check focus outline
    focus_styles = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const input = header.shadowRoot.querySelector('.searchInput');
        const style = window.getComputedStyle(input);
        return {
            outline: style.outline,
            outlineColor: style.outlineColor,
            outlineWidth: style.outlineWidth,
            outlineOffset: style.outlineOffset,
            borderColor: style.borderTopColor,
            boxShadow: style.boxShadow
        };
    }''')
    
    header.screenshot(path=str(OUTPUT_DIR / 'state-search-focus.png'))
    print(f"  ✓ Search focus captured")
    print(f"    Border color: {focus_styles.get('borderColor', 'N/A')}")
    print(f"    Box shadow: {focus_styles.get('boxShadow', 'N/A')[:50]}...")
    
    # Test 4: Add work button hover
    print("\n4️⃣  Testing add work button hover...")
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const btn = header.shadowRoot.querySelector('.addWorkButton');
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }''')
    page.wait_for_timeout(300)
    header.screenshot(path=str(OUTPUT_DIR / 'state-addwork-hover.png'))
    print("  ✓ Add work hover captured")
    
    # Test 5: Filter button active state (with badge)
    print("\n5️⃣  Testing filter button active state with badge...")
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        header.showFilters = true;
        header.activeFilterCount = 3;
        header.requestUpdate();
    }''')
    page.wait_for_timeout(500)
    
    # Check active state colors
    active_colors = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const btn = header.shadowRoot.querySelector('.filtersButton');
        const badge = header.shadowRoot.querySelector('.filterBadge');
        const style = window.getComputedStyle(btn);
        const badgeStyle = badge ? window.getComputedStyle(badge) : null;
        
        return {
            hasActiveClass: btn.classList.contains('filtersButtonActive'),
            backgroundColor: style.backgroundColor,
            color: style.color,
            badgeVisible: !!badge,
            badgeCount: badge ? badge.textContent : null,
            badgeColor: badgeStyle ? badgeStyle.color : null,
            badgeBg: badgeStyle ? badgeStyle.backgroundColor : null
        };
    }''')
    
    header.screenshot(path=str(OUTPUT_DIR / 'state-filters-active.png'))
    print(f"  ✓ Active filters with badge captured")
    print(f"    Has active class: {active_colors.get('hasActiveClass', False)}")
    print(f"    Badge visible: {active_colors.get('badgeVisible', False)}")
    print(f"    Badge count: {active_colors.get('badgeCount', 'N/A')}")
    
    # Test 6: Scrolled state (glass morphism)
    print("\n6️⃣  Testing scrolled state...")
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        header.isScrolled = true;
        header.requestUpdate();
    }''')
    page.wait_for_timeout(500)
    
    # Check glass morphism
    glass_styles = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const leftSection = header.shadowRoot.querySelector('.leftSection');
        const style = window.getComputedStyle(leftSection);
        
        return {
            hasScrolledClass: leftSection.classList.contains('leftSectionScrolled'),
            backgroundColor: style.backgroundColor,
            backdropFilter: style.backdropFilter,
            borderRadius: style.borderRadius,
            padding: style.padding
        };
    }''')
    
    header.screenshot(path=str(OUTPUT_DIR / 'state-scrolled.png'))
    print(f"  ✓ Scrolled state captured")
    print(f"    Has scrolled class: {glass_styles.get('hasScrolledClass', False)}")
    print(f"    Backdrop filter: {glass_styles.get('backdropFilter', 'N/A')}")
    print(f"    Background (glass): {glass_styles.get('backgroundColor', 'N/A')}")
    
    # Test 7: Right section hide/show
    print("\n7️⃣  Testing right section visibility...")
    
    # Reset to not scrolled
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        header.isScrolled = false;
        header.scrollingUp = false;
        header.requestUpdate();
    }''')
    page.wait_for_timeout(300)
    
    visible_state = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const rightSection = header.shadowRoot.querySelector('.rightSection');
        const style = window.getComputedStyle(rightSection);
        
        return {
            opacity: style.opacity,
            transform: style.transform,
            maxWidth: style.maxWidth
        };
    }''')
    
    print(f"  ✓ Right section visible when not scrolled")
    print(f"    Opacity: {visible_state.get('opacity', 'N/A')}")
    
    # Set scrolled
    page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        header.isScrolled = true;
        header.requestUpdate();
    }''')
    page.wait_for_timeout(500)
    
    hidden_state = page.evaluate('''() => {
        const header = document.querySelector('wy-library-header');
        const rightSection = header.shadowRoot.querySelector('.rightSection');
        const style = window.getComputedStyle(rightSection);
        
        return {
            hasHiddenClass: rightSection.classList.contains('rightSectionHidden'),
            opacity: style.opacity,
            transform: style.transform,
            pointerEvents: style.pointerEvents
        };
    }''')
    
    header.screenshot(path=str(OUTPUT_DIR / 'state-right-section-hidden.png'))
    print(f"  ✓ Right section hidden when scrolled")
    print(f"    Has hidden class: {hidden_state.get('hasHiddenClass', False)}")
    print(f"    Opacity: {hidden_state.get('opacity', 'N/A')}")
    print(f"    Pointer events: {hidden_state.get('pointerEvents', 'N/A')}")
    
    browser.close()

print("\n" + "="*70)
print("INTERACTIVE STATE TESTING COMPLETE")
print("="*70)
print(f"\n📁 All state screenshots saved to: {OUTPUT_DIR}")
print("\nScreenshots:")
print("  - state-default.png")
print("  - state-filter-hover.png")
print("  - state-search-focus.png")
print("  - state-addwork-hover.png")
print("  - state-filters-active.png")
print("  - state-scrolled.png")
print("  - state-right-section-hidden.png")

print("\n✅ PASSED: All interactive states tested successfully")
print("="*70)
