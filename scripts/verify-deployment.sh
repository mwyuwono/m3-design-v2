#!/bin/bash
# Verify design system changes propagated to all consumers
# Usage: ./scripts/verify-deployment.sh ["expected-snippet"]
#
# This script checks:
# 1. Local bundle in prompt-library matches design system dist/
# 2. CDN is serving the latest version
# 3. Cache-busting parameters are consistent
# 4. Git status is clean

SNIPPET="${1:-}"
PROMPT_LIBRARY="../prompt-library"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DESIGN_SYSTEM_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "  Design System Verification Report"
echo "========================================"
echo ""

PASS_COUNT=0
FAIL_COUNT=0

# Helper function
check_result() {
    if [ "$1" = "pass" ]; then
        echo -e "   ${GREEN}✓ $2${NC}"
        ((PASS_COUNT++))
    else
        echo -e "   ${RED}✗ $2${NC}"
        ((FAIL_COUNT++))
    fi
}

# 1. Check local bundle exists and matches
echo -e "${CYAN}1. Local Bundle (prompt-library/web-components.js)${NC}"

if [ -f "$PROMPT_LIBRARY/web-components.js" ]; then
    LOCAL_SIZE=$(wc -c < "$PROMPT_LIBRARY/web-components.js" | tr -d ' ')
    DIST_SIZE=$(wc -c < "$DESIGN_SYSTEM_DIR/dist/web-components.js" | tr -d ' ')
    
    echo "   Local size: $LOCAL_SIZE bytes"
    echo "   Dist size:  $DIST_SIZE bytes"
    
    if [ "$LOCAL_SIZE" = "$DIST_SIZE" ]; then
        check_result "pass" "Bundle sizes match"
    else
        check_result "fail" "Bundle sizes DIFFER - run deploy.sh"
    fi
    
    # Check for snippet if provided
    if [ -n "$SNIPPET" ]; then
        if grep -q "$SNIPPET" "$PROMPT_LIBRARY/web-components.js"; then
            check_result "pass" "Contains expected snippet"
        else
            check_result "fail" "MISSING expected snippet"
        fi
    fi
else
    check_result "fail" "Local bundle not found"
fi
echo ""

# 2. Check CDN version
echo -e "${CYAN}2. CDN Version (jsDelivr @main)${NC}"

CDN_URL="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js"
CDN_RESPONSE=$(curl -sI "$CDN_URL" 2>/dev/null)
CDN_STATUS=$(echo "$CDN_RESPONSE" | grep -i "^HTTP" | awk '{print $2}')
CDN_CACHE=$(echo "$CDN_RESPONSE" | grep -i "^x-cache:" | awk '{print $2}')

if [ "$CDN_STATUS" = "200" ]; then
    check_result "pass" "CDN responding (HTTP $CDN_STATUS)"
    echo "   Cache status: $CDN_CACHE"
    
    # Check for snippet in CDN if provided
    if [ -n "$SNIPPET" ]; then
        CDN_CONTENT=$(curl -s "$CDN_URL" | head -c 50000)
        if echo "$CDN_CONTENT" | grep -q "$SNIPPET" 2>/dev/null; then
            check_result "pass" "CDN contains expected snippet"
        else
            check_result "fail" "CDN may be stale (snippet not found)"
        fi
    fi
else
    check_result "fail" "CDN not responding (HTTP $CDN_STATUS)"
fi
echo ""

# 3. Check cache-busting parameters
echo -e "${CYAN}3. Cache-Busting Parameters${NC}"

if [ -f "$PROMPT_LIBRARY/admin.html" ]; then
    ADMIN_PARAM=$(grep -o "web-components.js?v=[^'\"]*" "$PROMPT_LIBRARY/admin.html" | head -1)
    echo "   admin.html: $ADMIN_PARAM"
else
    echo "   admin.html: NOT FOUND"
fi

if [ -f "$PROMPT_LIBRARY/components/index.js" ]; then
    INDEX_PARAM=$(grep -o "web-components.js?v=[^'\"]*" "$PROMPT_LIBRARY/components/index.js" | head -1)
    echo "   components/index.js: $INDEX_PARAM"
else
    echo "   components/index.js: NOT FOUND"
fi

# Check if they match
ADMIN_VERSION=$(echo "$ADMIN_PARAM" | sed 's/.*?v=//')
INDEX_VERSION=$(echo "$INDEX_PARAM" | sed 's/.*?v=//')

if [ "$ADMIN_VERSION" = "$INDEX_VERSION" ]; then
    check_result "pass" "Cache-busting versions match"
else
    check_result "fail" "Cache-busting versions DIFFER"
fi
echo ""

# 4. Check git status
echo -e "${CYAN}4. Git Status${NC}"

echo "   m3-design-v2:"
cd "$DESIGN_SYSTEM_DIR"
M3_STATUS=$(git status --short)
if [ -z "$M3_STATUS" ]; then
    check_result "pass" "Working directory clean"
else
    echo "$M3_STATUS" | head -5 | sed 's/^/      /'
    check_result "fail" "Uncommitted changes"
fi

echo ""
echo "   prompt-library:"
cd "$PROMPT_LIBRARY"
PL_STATUS=$(git status --short)
if [ -z "$PL_STATUS" ]; then
    check_result "pass" "Working directory clean"
else
    echo "$PL_STATUS" | head -5 | sed 's/^/      /'
    check_result "fail" "Uncommitted changes"
fi
echo ""

# Summary
echo "========================================"
echo "  Summary"
echo "========================================"
echo ""
echo -e "   ${GREEN}Passed: $PASS_COUNT${NC}"
echo -e "   ${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    echo ""
    echo "Remember to hard refresh (Cmd+Shift+R) in browser."
    exit 0
else
    echo -e "${RED}Some checks failed. Review above and run deploy.sh if needed.${NC}"
    exit 1
fi
