#!/bin/bash

# Design System Sync Verification Script
# Verifies that all consuming projects are properly integrated with m3-design-v2

set -e

PROJECTS_ROOT="/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects"
DESIGN_SYSTEM="$PROJECTS_ROOT/m3-design-v2"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 Design System Sync Verification"
echo "=================================="
echo ""

# Function to check if a token exists in design system
check_token_in_design_system() {
    local token=$1
    if grep -q "$token" "$DESIGN_SYSTEM/src/styles/tokens.css"; then
        return 0
    else
        return 1
    fi
}

# Function to check project integration
check_project() {
    local project_name=$1
    local project_path="$PROJECTS_ROOT/$project_name"
    
    if [ ! -d "$project_path" ]; then
        echo -e "${RED}❌ Project not found: $project_name${NC}"
        return 1
    fi
    
    echo -e "\n${GREEN}=== Checking $project_name ===${NC}"
    cd "$project_path"
    
    # Check for design system integration
    local has_integration=false
    local integration_method=""
    
    # Check for m3-design-v2 integration (exclude node_modules, .git, and vendor directories)
    local integration_files=$(find . -type f \( -name "*.css" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" \) \
        ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/design-system/vendor/*" 2>/dev/null)
    
    if echo "$integration_files" | xargs grep -l "m3-design-v2\|wy-family-office" 2>/dev/null | head -1 | grep -q .; then
        has_integration=true
        if echo "$integration_files" | xargs grep -l "jsdelivr.*m3-design" 2>/dev/null | head -1 | grep -q .; then
            integration_method="CDN"
        elif [ -L "node_modules/wy-family-office" ] 2>/dev/null || [ -d "node_modules/wy-family-office" ]; then
            integration_method="npm link"
        elif echo "$integration_files" | xargs grep -l "tokens-no-fonts\|tokens.css.*m3-design" 2>/dev/null | head -1 | grep -q .; then
            integration_method="npm link (via tokens file)"
        else
            integration_method="Unknown"
        fi
    fi
    
    if [ "$has_integration" = true ]; then
        echo -e "${GREEN}✅ Design system integrated (via $integration_method)${NC}"
    else
        echo -e "${YELLOW}⚠️  Design system integration not detected${NC}"
    fi
    
    # Check for local token definitions that should be in design system
    echo ""
    echo "Checking for local token definitions:"
    
    local issues=0
    
    # Motion tokens
    if grep -rq "md-sys-motion-duration-short1\|md-sys-motion-easing-standard" --include="*.css" . 2>/dev/null | grep -v "node_modules" | grep -v ".git"; then
        if ! grep -q "from design system\|from m3-design\|TODO.*design system" $(grep -rl "md-sys-motion" --include="*.css" . 2>/dev/null | head -1) 2>/dev/null; then
            echo -e "${YELLOW}⚠️  Local motion token definitions found (should use design system)${NC}"
            issues=$((issues + 1))
        fi
    fi
    
    # State tokens
    if grep -rq "md-sys-state-hover-opacity" --include="*.css" . 2>/dev/null | grep -v "node_modules" | grep -v ".git"; then
        if ! grep -q "from design system\|from m3-design\|TODO.*design system" $(grep -rl "md-sys-state" --include="*.css" . 2>/dev/null | head -1) 2>/dev/null; then
            echo -e "${YELLOW}⚠️  Local state token definitions found (should use design system)${NC}"
            issues=$((issues + 1))
        fi
    fi
    
    # Spacing tokens
    if grep -rq "spacing-xxs.*0\.125rem\|spacing-xs.*0\.25rem" --include="*.css" . 2>/dev/null | grep -v "node_modules" | grep -v ".git"; then
        if ! grep -q "from design system\|from m3-design\|var(--spacing" $(grep -rl "spacing-xxs\|spacing-xs" --include="*.css" . 2>/dev/null | head -1) 2>/dev/null; then
            echo -e "${YELLOW}⚠️  Local spacing token definitions found (should use design system)${NC}"
            issues=$((issues + 1))
        fi
    fi
    
    # Check for local component overrides
    local component_overrides=$(find . -name "wy-*.js" -o -name "wy-*.tsx" -o -name "wy-*.ts" 2>/dev/null | grep -v node_modules | wc -l | tr -d ' ')
    if [ "$component_overrides" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Found $component_overrides local component file(s) (may override design system)${NC}"
        find . -name "wy-*.js" -o -name "wy-*.tsx" -o -name "wy-*.ts" 2>/dev/null | grep -v node_modules | head -3
        issues=$((issues + 1))
    fi
    
    if [ $issues -eq 0 ]; then
        echo -e "${GREEN}✅ No issues found${NC}"
    else
        echo -e "${YELLOW}⚠️  Found $issues potential issue(s)${NC}"
    fi
    
    return $issues
}

# Main execution
total_issues=0

check_project "plots" || total_issues=$((total_issues + $?))
check_project "prompt-library" || total_issues=$((total_issues + $?))
check_project "Weaver-Yuwono-Home-Page" || total_issues=$((total_issues + $?))

echo ""
echo "=================================="
if [ $total_issues -eq 0 ]; then
    echo -e "${GREEN}✅ All projects verified successfully${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Found issues in one or more projects${NC}"
    echo "Review the output above and update projects as needed."
    exit 1
fi
