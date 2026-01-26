# Component Adaptation Prompt
**Copy and paste this prompt when you have a component to adapt**

---

I need to adapt the following component to my m3-design-v2 design system.

## Reference Materials

**Screenshot:**
[Attach or paste screenshot here]

**Original Code:**
```[language]
[Paste original code here]
```

**Context:** [Where this will be used / any specific requirements]

---

## Adaptation Requirements

Follow the systematic workflow in [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md):

### Phase 1: Analysis & Planning
1. Analyze screenshot for visual patterns (layout, typography, colors, interactions)
2. Review code for hardcoded values to replace
3. Create token mapping table
4. Identify missing design system assets

### Phase 2: Design System Updates (If Needed)
- Add missing color tokens to `src/styles/tokens.css`
- Add new spacing/shape/motion tokens if required
- Update dark mode variants

### Phase 3: Implementation
- Create Web Component in `src/components/wy-[name].js`
- Use design system tokens exclusively (no hardcoded values)
- Follow MD3 state layer patterns for interactive elements
- Import fonts in Shadow DOM if using icons or display typography
- NO `!important` declarations

### Phase 4: Automated Testing with Playwright

**Required:** Use Playwright to verify the adaptation before showing me results.

Run these automated tests:

#### 4.1 Visual Capture
```bash
cd m3-design-v2
npm run build
npm run dev

python3 skills/visual-qa/scripts/capture.py \
  --url http://localhost:5173/[test-page].html \
  --output /tmp/visual-qa
```

#### 4.2 Layout Measurements
Create and run Playwright script to verify:
- Component dimensions match target
- Spacing values correct
- Colors rendering properly
- Typography scales correctly
- No horizontal overflow

#### 4.3 Token Usage Verification
Scan for hardcoded values:
```python
# Check for hex colors, rgba(), magic numbers
# Verify all styles resolve from design tokens
```

#### 4.4 Interactive State Testing
Test and screenshot:
- Hover states
- Focus states  
- Active/pressed states
- Disabled states

#### 4.5 Dark Mode Verification
```python
# Capture in both color schemes
# Verify all tokens have dark mode variants
```

### Phase 5: Quality Assurance
- [ ] Run automated linting for common issues
- [ ] Compare adapted component with original screenshot
- [ ] Verify no console errors
- [ ] Check accessibility (semantic HTML, ARIA labels)

### Phase 6: Integration
- [ ] Register in `src/main.js`
- [ ] Add to `src/data/components.json`
- [ ] Create example in components library
- [ ] Build, commit, push
- [ ] Purge CDN cache

---

## Deliverables

Please provide:

1. **Token Mapping Report**
   - Original values → Design system tokens used
   - Any new tokens created

2. **Playwright Test Results**
   - Screenshot comparisons (before/after, light/dark)
   - Layout measurement verification
   - Token usage confirmation
   - Interactive state testing results

3. **Component Code**
   - Complete Web Component implementation
   - components.json entry
   - Usage example

4. **Design System Updates** (if any)
   - New tokens added to tokens.css
   - Rationale for new additions

---

## Success Criteria

The adaptation is complete when:

✅ Visual fidelity matches screenshot  
✅ All Playwright tests passing  
✅ Zero hardcoded values  
✅ Dark mode working  
✅ No `!important` declarations  
✅ Component documented  
✅ Deployed and CDN purged  

---

**Please analyze the provided materials and execute the full workflow with Playwright automation.**
