#!/bin/bash
# Automated design system deployment
# Usage: ./scripts/deploy.sh "commit message"
#
# This script handles the complete deployment workflow:
# 1. Builds dist/web-components.js
# 2. Commits both src/ and dist/ changes
# 3. Pushes to GitHub
# 4. Purges jsDelivr CDN cache
# 5. Copies bundle to prompt-library
# 6. Updates cache-busting parameters
# 7. Commits prompt-library changes

set -e  # Exit on error

# Configuration
COMMIT_MSG="${1:-Update design system}"
PROMPT_LIBRARY="../prompt-library"
TIMESTAMP=$(date +%Y%m%d-%H%M)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "  Design System Deployment Script"
echo "========================================"
echo ""

# Check we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src/components" ]; then
    echo -e "${RED}Error: Must be run from m3-design-v2 root directory${NC}"
    exit 1
fi

# Check prompt-library exists
if [ ! -d "$PROMPT_LIBRARY" ]; then
    echo -e "${RED}Error: prompt-library not found at $PROMPT_LIBRARY${NC}"
    exit 1
fi

# Step 1: Build
echo -e "${YELLOW}Step 1/7: Building design system...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

# Step 2: Commit in m3-design-v2
echo -e "${YELLOW}Step 2/7: Committing design system changes...${NC}"
git add src/ dist/
if git diff --cached --quiet; then
    echo "  No changes to commit in m3-design-v2"
else
    git commit -m "$COMMIT_MSG

Co-Authored-By: Claude <noreply@anthropic.com>"
    echo -e "${GREEN}✓ Committed${NC}"
fi
echo ""

# Step 3: Push to GitHub
echo -e "${YELLOW}Step 3/7: Pushing to GitHub...${NC}"
git push origin main
echo -e "${GREEN}✓ Pushed${NC}"
echo ""

# Step 4: Purge CDN cache
echo -e "${YELLOW}Step 4/7: Purging jsDelivr CDN cache...${NC}"
for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do
    for v in @main "" @latest; do
        result=$(curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}")
        status=$(echo "$result" | grep -o '"status":"[^"]*"' | head -1)
        echo "  Purged ${v}/${f}: $status"
    done
done
echo -e "${GREEN}✓ CDN purged${NC}"
echo ""

# Step 5: Copy bundle to prompt-library
echo -e "${YELLOW}Step 5/7: Copying bundle to prompt-library...${NC}"
cp dist/web-components.js "$PROMPT_LIBRARY/web-components.js"
echo -e "${GREEN}✓ Bundle copied${NC}"
echo ""

# Step 6: Update cache-busting parameters
echo -e "${YELLOW}Step 6/7: Updating cache-busting parameters (${TIMESTAMP})...${NC}"

# Update admin.html
if [ -f "$PROMPT_LIBRARY/admin.html" ]; then
    sed -i '' "s|web-components.js?v=[^'\"]*|web-components.js?v=${TIMESTAMP}|g" "$PROMPT_LIBRARY/admin.html"
    echo "  Updated admin.html"
fi

# Update components/index.js
if [ -f "$PROMPT_LIBRARY/components/index.js" ]; then
    sed -i '' "s|web-components.js?v=[^'\"]*|web-components.js?v=${TIMESTAMP}|g" "$PROMPT_LIBRARY/components/index.js"
    echo "  Updated components/index.js"
fi

echo -e "${GREEN}✓ Cache-busting updated${NC}"
echo ""

# Step 7: Commit prompt-library changes
echo -e "${YELLOW}Step 7/7: Committing prompt-library changes...${NC}"
cd "$PROMPT_LIBRARY"
git add web-components.js admin.html components/index.js admin.css 2>/dev/null || true
if git diff --cached --quiet; then
    echo "  No changes to commit in prompt-library"
else
    git commit -m "Update design system bundle (${TIMESTAMP})

Co-Authored-By: Claude <noreply@anthropic.com>"
    echo -e "${GREEN}✓ Committed${NC}"
fi
echo ""

echo "========================================"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo "========================================"
echo ""
echo "Cache-busting timestamp: ${TIMESTAMP}"
echo ""
echo "Next steps:"
echo "  1. Run: ./scripts/verify-deployment.sh"
echo "  2. Hard refresh browser (Cmd+Shift+R)"
echo "  3. Test changes in admin and public site"
echo ""
