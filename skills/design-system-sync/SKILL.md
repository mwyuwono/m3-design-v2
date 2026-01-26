---
name: design-system-sync
description: Verifies that all consuming projects (plots, prompt-library, Weaver-Yuwono-Home-Page) are properly integrated with m3-design-v2 design system. Checks for local token definitions that should use design system, verifies component integration, and ensures projects are up-to-date after design system changes. Use when design system tokens are added/modified, after committing design system changes, or when verifying project integration status.
---

# Design System Sync

Verifies that all consuming projects are properly integrated with m3-design-v2 and using design system tokens instead of local definitions.

## When to Use

Use this skill when:
- Design system tokens are added, modified, or removed
- New components are added to the design system
- You want to verify all consuming projects are up-to-date
- After committing design system changes
- When onboarding a new project to use the design system

## Consuming Projects

The following projects consume m3-design-v2:

1. **plots** - `/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/plots`
   - Installation: `npm link` (local development, package: `wy-family-office`)
   - Tokens: Imported via `app/styles/tokens-no-fonts.css` (generated from design system)
   - Components: React/Next.js (not using web components)
   - Status: ✅ Fully integrated

2. **prompt-library** - `/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/prompt-library`
   - Installation: CDN imports via jsDelivr
   - Tokens: Imported via `tokens.css` → CDN (`@main` branch)
   - Components: Web components via `components/index.js` → CDN
   - Status: ✅ Fully integrated

3. **Weaver-Yuwono-Home-Page** - `/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/Weaver-Yuwono-Home-Page`
   - Installation: CDN imports via jsDelivr
   - Tokens: Imported via `tokens.css` → CDN (`@main` branch)
   - Components: Not using web components (vanilla HTML/CSS/JS)
   - Status: ✅ Fully integrated (migrated January 2026)

## Workflow

### 1. Check Design System Changes

First, identify what changed in the design system:

```bash
# In m3-design-v2 directory
git log --oneline -10  # Recent commits
git diff HEAD~1 src/styles/tokens.css  # Check token changes
```

### 2. Verify Each Consuming Project

For each consuming project, check:

#### Token Integration
- ✅ Are design system tokens imported correctly?
- ✅ Are local token definitions removed (using design system instead)?
- ✅ Are new tokens being used (if added)?

#### Component Integration
- ✅ Are web components imported from design system?
- ✅ Are local component overrides removed?
- ✅ Are components using latest API?

#### Documentation
- ✅ Is CLAUDE.md updated with current integration status?
- ✅ Are token references documented?

### 3. Check Specific Token Categories

#### Motion Tokens
Check if projects are using:
- `--md-sys-motion-easing-*` (standard, emphasized, etc.)
- `--md-sys-motion-duration-*` (short1-4, medium1-4, long1-4)

#### State Tokens
Check if projects are using:
- `--md-sys-state-hover-opacity`
- `--md-sys-state-focus-opacity`
- `--md-sys-state-pressed-opacity`
- `--md-sys-state-disabled-opacity`

#### Spacing Tokens
Check if projects are using:
- `--spacing-xxs` through `--spacing-3xl` (from design system)
- Not local `--space-*` or `--spacing-*` definitions

#### Shape Tokens
Check if projects are using:
- `--md-sys-shape-corner-xs`, `--md-sys-shape-corner-small`, etc.
- Not local `--radius-*` definitions (unless app-specific)

### 4. Generate Update Recommendations

For each project, create a checklist:

**plots:**
- [ ] Verify `app/styles/tokens-no-fonts.css` is up-to-date
- [ ] Check for local motion/state/spacing token definitions
- [ ] Verify components use design system tokens

**prompt-library:**
- [ ] Verify CDN imports are using `@main` (not pinned commits)
- [ ] Check for local token definitions in `styles.css`
- [ ] Verify web components are from design system
- [ ] Purge CDN cache if tokens changed

**Weaver-Yuwono-Home-Page:**
- [ ] Verify integration with m3-design-v2 (may need setup)
- [ ] Check if using local design-system/ or m3-design-v2
- [ ] Migrate to m3-design-v2 if using local system

## Automated Checks

### Token Usage Check
```bash
# Check if project uses local token definitions that should be in design system
grep -r "md-sys-motion-duration-short1\|md-sys-state-hover-opacity\|spacing-xxs" \
  --include="*.css" \
  /path/to/project
```

### Component Check
```bash
# Check if project imports design system components
grep -r "m3-design-v2\|wy-family-office\|jsdelivr.*m3-design" \
  --include="*.js" \
  --include="*.ts" \
  --include="*.tsx" \
  /path/to/project
```

### Local Override Check
```bash
# Check for local component files that might override design system
find /path/to/project -name "wy-*.js" -o -name "wy-*.tsx" -o -name "wy-*.ts"
```

## Example: After Adding Motion Tokens

When motion tokens are added to design system:

1. **Check plots:**
   ```bash
   cd /path/to/plots
   grep -r "md-sys-motion" app/globals.css
   # Should reference design system tokens, not define them
   ```

2. **Check prompt-library:**
   ```bash
   cd /path/to/prompt-library
   grep -r "md-sys-motion" styles.css
   # Should NOT have local definitions
   ```

3. **Check Weaver-Yuwono-Home-Page:**
   ```bash
   cd /path/to/Weaver-Yuwono-Home-Page
   grep -r "m3-design-v2\|motion" styles.css
   # Should import from design system or be migrated
   ```

## Integration Status Template

For each project, maintain this status:

```markdown
### [Project Name]

**Integration Status:** ✅ Integrated / ⚠️ Partial / ❌ Not Integrated

**Installation Method:**
- [ ] npm link (local)
- [ ] CDN imports
- [ ] npm package
- [ ] Not integrated

**Token Usage:**
- [ ] Colors: Using design system
- [ ] Typography: Using design system
- [ ] Spacing: Using design system
- [ ] Motion: Using design system
- [ ] State: Using design system
- [ ] Shape: Using design system

**Component Usage:**
- [ ] Web components: From design system
- [ ] No local component overrides

**Last Verified:** [Date]
**Needs Update:** [Yes/No - reason]
```

## Quick Verification

Run the verification script:

```bash
cd /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/m3-design-v2
./skills/design-system-sync/verify-projects.sh
```

This checks all three consuming projects and reports:
- Integration status (CDN, npm link, or not integrated)
- Local token definitions that should use design system
- Local component overrides
- Overall health status

## After Design System Changes

When tokens or components are added/modified:

1. **For plots** (npm link):
   - Regenerate tokens file: `tail -n +2 node_modules/wy-family-office/src/styles/tokens.css > app/styles/tokens-no-fonts.css`
   - Restart dev server to pick up changes

2. **For prompt-library** (CDN):
   - Purge CDN cache: `for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done`
   - Hard refresh browser (Cmd+Shift+R)

3. **For Weaver-Yuwono-Home-Page**:
   - ✅ **Integrated** - uses CDN imports (same as prompt-library)
   - Purge CDN cache: `for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done`
   - Hard refresh browser (Cmd+Shift+R) to see changes

## Notes

- Always purge CDN cache after design system changes (for prompt-library)
- npm link projects (plots) pick up changes automatically on restart
- Document any project-specific token needs that can't use design system
- Keep consuming projects' CLAUDE.md files updated with integration status
