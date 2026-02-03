#!/bin/bash
# Automated design system deployment
# Usage: ./scripts/deploy.sh "commit message"
#
# This script handles the complete deployment workflow:
# 1. Builds dist/web-components.js
# 2. Commits both src/ and dist/ changes
# 3. Pushes to GitHub
# 4. Captures commit hash for CDN pinning
# 5. Copies bundle to prompt-library
# 6. Updates CDN imports to use commit hash (reliable) + admin cache-busting
# 7. Commits prompt-library changes
#
# NOTE: We use commit hash pinning instead of @main for CDN imports because
# jsDelivr @main is unreliable - different edge servers serve different cached versions.
# See docs/css-changes-not-appearing-postmortem.md Lesson 8.

set -e  # Exit on error

# Configuration
COMMIT_MSG="${1:-Update design system}"
PROMPT_LIBRARY="../prompt-library"
TIMESTAMP=$(date +%Y%m%d-%H%M)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
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

# Step 4: Capture commit hash for reliable CDN pinning
echo -e "${YELLOW}Step 4/7: Capturing commit hash for CDN pinning...${NC}"
COMMIT_HASH=$(git rev-parse --short HEAD)
echo -e "  Commit hash: ${CYAN}${COMMIT_HASH}${NC}"
echo -e "${GREEN}✓ Hash captured${NC}"
echo ""

# Note: We skip CDN purging because we use commit hash pinning which is immutable
# CDN purging is unreliable for @main - see post-mortem Lesson 8

# Step 5: Copy bundle to prompt-library
echo -e "${YELLOW}Step 5/7: Copying bundle to prompt-library...${NC}"
cp dist/web-components.js "$PROMPT_LIBRARY/web-components.js"
echo -e "${GREEN}✓ Bundle copied${NC}"
echo ""

# Step 6: Update imports with commit hash
echo -e "${YELLOW}Step 6/7: Updating imports with commit hash @${COMMIT_HASH}...${NC}"

# Update admin.html (local bundle - use timestamp for cache-busting)
if [ -f "$PROMPT_LIBRARY/admin.html" ]; then
    sed -i '' "s|web-components.js?v=[^'\"]*|web-components.js?v=${TIMESTAMP}|g" "$PROMPT_LIBRARY/admin.html"
    echo "  Updated admin.html (cache-bust: ${TIMESTAMP})"
fi

# Update components/index.js (CDN - use commit hash for reliability)
if [ -f "$PROMPT_LIBRARY/components/index.js" ]; then
    # Replace any @xxx/dist/web-components.js pattern with @COMMIT_HASH/dist/web-components.js
    sed -i '' "s|m3-design-v2@[^/]*/dist/web-components.js[^'\"]*|m3-design-v2@${COMMIT_HASH}/dist/web-components.js|g" "$PROMPT_LIBRARY/components/index.js"
    echo "  Updated components/index.js (commit: @${COMMIT_HASH})"
fi

echo -e "${GREEN}✓ Imports updated${NC}"
echo ""

# Step 7: Commit prompt-library changes
echo -e "${YELLOW}Step 7/7: Committing prompt-library changes...${NC}"
cd "$PROMPT_LIBRARY"
git add web-components.js admin.html components/index.js admin.css 2>/dev/null || true
if git diff --cached --quiet; then
    echo "  No changes to commit in prompt-library"
else
    git commit -m "Update design system bundle (@${COMMIT_HASH})

- Local bundle updated for admin
- CDN import pinned to commit hash for reliability

Co-Authored-By: Claude <noreply@anthropic.com>"
    echo -e "${GREEN}✓ Committed${NC}"
fi
echo ""

echo "========================================"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo "========================================"
echo ""
echo -e "Commit hash: ${CYAN}@${COMMIT_HASH}${NC}"
echo -e "Admin cache-bust: ${TIMESTAMP}"
echo ""
echo "Next steps:"
echo "  1. Run: ./scripts/verify-deployment.sh"
echo "  2. Hard refresh browser (Cmd+Shift+R)"
echo "  3. Test changes in admin and public site"
echo ""
