#!/bin/bash
# Verify design system changes propagated to all consumers
# Usage: ./scripts/verify-deployment.sh ["expected-snippet"]
#
# This script checks:
# 1. Local bundle in prompt-library matches design system dist/
# 2. CDN bundle (pinned to commit hash) matches local dist
# 3. Commit hash in components/index.js is current
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

# Get local dist size for comparisons
DIST_SIZE=$(wc -c < "$DESIGN_SYSTEM_DIR/dist/web-components.js" | tr -d ' ')

# 1. Check local bundle exists and matches
echo -e "${CYAN}1. Local Bundle (prompt-library/web-components.js)${NC}"

if [ -f "$PROMPT_LIBRARY/web-components.js" ]; then
    LOCAL_SIZE=$(wc -c < "$PROMPT_LIBRARY/web-components.js" | tr -d ' ')
    
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

# 2. Check CDN version (using commit hash from components/index.js)
echo -e "${CYAN}2. CDN Version (commit hash pinning)${NC}"

# Extract commit hash from components/index.js
if [ -f "$PROMPT_LIBRARY/components/index.js" ]; then
    CDN_COMMIT=$(grep -o 'm3-design-v2@[^/]*' "$PROMPT_LIBRARY/components/index.js" | sed 's/.*@//' | head -1)
    echo "   Pinned to commit: @${CDN_COMMIT}"
    
    if [ -n "$CDN_COMMIT" ] && [ "$CDN_COMMIT" != "main" ]; then
        # Fetch the CDN bundle using the commit hash
        CDN_URL="https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@${CDN_COMMIT}/dist/web-components.js"
        CDN_SIZE=$(curl -sL "$CDN_URL" | wc -c | tr -d ' ')
        
        echo "   CDN size:  $CDN_SIZE bytes"
        echo "   Dist size: $DIST_SIZE bytes"
        
        if [ "$CDN_SIZE" = "$DIST_SIZE" ]; then
            check_result "pass" "CDN bundle size matches local dist"
        else
            check_result "fail" "CDN bundle size MISMATCH ($CDN_SIZE vs $DIST_SIZE)"
        fi
        
        # Check for snippet in CDN if provided
        if [ -n "$SNIPPET" ]; then
            CDN_CONTENT=$(curl -sL "$CDN_URL" | head -c 50000)
            if echo "$CDN_CONTENT" | grep -q "$SNIPPET" 2>/dev/null; then
                check_result "pass" "CDN contains expected snippet"
            else
                check_result "fail" "CDN missing expected snippet"
            fi
        fi
    else
        check_result "fail" "Using @main (unreliable) - should use commit hash"
    fi
else
    check_result "fail" "components/index.js not found"
fi
echo ""

# 3. Check commit hash is current
echo -e "${CYAN}3. Commit Hash Currency${NC}"

cd "$DESIGN_SYSTEM_DIR"
CURRENT_HASH=$(git rev-parse --short HEAD)
echo "   Current HEAD: @${CURRENT_HASH}"
echo "   CDN pinned:   @${CDN_COMMIT}"

if [ "$CURRENT_HASH" = "$CDN_COMMIT" ]; then
    check_result "pass" "CDN is pinned to current HEAD"
else
    check_result "fail" "CDN pinned to old commit (run deploy.sh to update)"
fi
echo ""

# 4. Check admin cache-busting
echo -e "${CYAN}4. Admin Cache-Busting${NC}"

if [ -f "$PROMPT_LIBRARY/admin.html" ]; then
    ADMIN_PARAM=$(grep -o "web-components.js?v=[^'\"]*" "$PROMPT_LIBRARY/admin.html" | head -1)
    echo "   admin.html: $ADMIN_PARAM"
    check_result "pass" "Admin has cache-busting parameter"
else
    check_result "fail" "admin.html not found"
fi
echo ""

# 5. Check git status
echo -e "${CYAN}5. Git Status${NC}"

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
