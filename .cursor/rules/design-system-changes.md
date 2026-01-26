# Design System Changes Rule

## Automatic Trigger

When files in `src/styles/tokens.css` or `src/components/` are modified, automatically:

1. **Run the design system sync verification**:
   ```bash
   ./skills/design-system-sync/verify-projects.sh
   ```

2. **Check for consuming project updates needed**:
   - Verify plots project has updated `app/styles/tokens-no-fonts.css` if tokens changed
   - Verify prompt-library CDN cache needs purging if tokens/components changed
   - Check Weaver-Yuwono-Home-Page integration status

3. **Provide update recommendations**:
   - List which projects need updates
   - Provide specific commands to update each project
   - Remind about CDN cache purging for prompt-library

## After Committing Design System Changes

Always remind the user to:
- Run `./skills/design-system-sync/verify-projects.sh` to check consuming projects
- Purge CDN cache if prompt-library is affected: `for f in src/styles/tokens.css src/styles/main.css dist/web-components.js; do for v in @main "" @latest; do curl -s "https://purge.jsdelivr.net/gh/mwyuwono/m3-design-v2${v}/${f}"; done; done`
- Update plots project's `app/styles/tokens-no-fonts.css` if tokens changed: `tail -n +2 node_modules/wy-family-office/src/styles/tokens.css > app/styles/tokens-no-fonts.css`
