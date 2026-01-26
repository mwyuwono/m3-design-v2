# Design System Workflows

This directory contains structured workflows and prompts for working with the m3-design-v2 design system.

## Workflow Documentation

### Component Replacement
**[COMPONENT-REPLACEMENT-PROMPT.md](COMPONENT-REPLACEMENT-PROMPT.md)** - Complete workflow for replacing an existing component's UI with a new design while preserving all functionality. Use when you need to completely rebuild a component from scratch.

**Key Features:**
- Phase 0: Functionality specification and API definition
- Automated color extraction and verification
- Interactive state testing (hover, focus, active)
- Pixel-perfect visual comparison (99.9% match required)
- Perfect visual fidelity guaranteed

### Component Adaptation
**[component-adaptation/](component-adaptation/)** - Systematic workflow for adapting external components to the design system.

**Entry Points:**
- **[START-HERE.md](component-adaptation/START-HERE.md)** - Overview and navigation
- **[QUICK-START-COMPONENT-ADAPTATION.md](component-adaptation/QUICK-START-COMPONENT-ADAPTATION.md)** - Copy/paste prompt
- **[REFINED-COMPONENT-ADAPTATION-WORKFLOW.md](component-adaptation/REFINED-COMPONENT-ADAPTATION-WORKFLOW.md)** - Full methodology

**Documentation:**
- **[README-COMPONENT-ADAPTATION.md](component-adaptation/README-COMPONENT-ADAPTATION.md)** - System overview
- **[COMPONENT-ADAPTATION-SUMMARY.md](component-adaptation/COMPONENT-ADAPTATION-SUMMARY.md)** - Setup guide
- **[COMPONENT-ADAPTATION-INDEX.md](component-adaptation/COMPONENT-ADAPTATION-INDEX.md)** - Doc index

### Quality Assurance
**[COMPONENT-LIBRARY-QA-PROMPT.md](COMPONENT-LIBRARY-QA-PROMPT.md)** - Comprehensive QA checklist for component library work.

## When to Use Each Workflow

| Scenario | Use This Workflow |
|----------|-------------------|
| Replace existing component with completely new design | **COMPONENT-REPLACEMENT-PROMPT.md** |
| Adapt external component example to design system | **component-adaptation/QUICK-START** |
| QA check after component work | **COMPONENT-LIBRARY-QA-PROMPT.md** |

## Workflow Principles

All workflows follow these principles:

1. **Perfect Visual Fidelity** - No "close enough" approximations
2. **Automated Testing** - Playwright verification required
3. **100% Design Tokens** - No hardcoded values
4. **Color Accuracy** - ΔE < 2.0 threshold (imperceptible difference)
5. **State Testing** - All interactive states verified (hover, focus, active, etc.)
6. **Pixel-Perfect Comparison** - 99.9% match threshold

## Related Documentation

- **[../CLAUDE.md](../CLAUDE.md)** - AI assistant guidance for using workflows
- **[../COMPONENTS.md](../COMPONENTS.md)** - Component API reference
- **[../m3-requirements.md](../m3-requirements.md)** - Design philosophy
- **[../skills/](../skills/)** - Automated testing tools
