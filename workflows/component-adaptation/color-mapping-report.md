# Color Mapping Report

## Extraction Results

| Element | Reference RGB | Hex | Design Token | Token Hex | Delta E | Exact Match | Action |
|---------|---------------|-----|--------------|-----------|---------|-------------|--------|
| Label "STYLE" | (113, 113, 122) | #71717A | --md-sys-color-text-muted | #667f71 | 19.95 | ✗ | Create component-specific token |
| Button text "Formal & Professional" | (82, 82, 91) | #52525B | --md-sys-color-on-surface-variant | #49454E | 20.47 | ✗ | Create component-specific token |
| Button background | (245, 242, 234) | #F5F2EA | --md-sys-color-surface | #F5F2EA | 0.00 | ✓ | Use token |
| Button border (default) | (229, 231, 235) | #E5E7EB | --md-sys-color-surface | #F5F2EA | 19.44 | ✗ | Create component-specific token |
| Chevron icon | (82, 82, 91) | #52525B | --md-sys-color-on-surface-variant | #49454E | 20.47 | ✗ | Create component-specific token |
| Description panel background | (253, 251, 247) | #FDFBF7 | --md-sys-color-background | #FDFBF7 | 0.00 | ✓ | Use token |
| Description panel border | (215, 211, 200) | #D7D3C8 | --md-sys-color-surface-container-highest | #D7D3C8 | 0.00 | ✓ | Use token |
| Description panel text | (82, 82, 91) | #52525B | --md-sys-color-on-surface-variant | #49454E | 20.47 | ✗ | Create component-specific token |

## Summary

- Total colors analyzed: 8
- Exact matches (Δ < 2.0): 3
- Component-specific tokens needed: 5

## Recommended Component Tokens

```css
--wy-dropdown-label-color: #71717A;
  /* Reference uses #71717A, delta E = 19.95 from --md-sys-color-text-muted */

--wy-dropdown-text-color: #52525B;
  /* Reference uses #52525B, delta E = 20.47 from --md-sys-color-on-surface-variant */

--wy-dropdown-border: #E5E7EB;
  /* Reference uses #E5E7EB, delta E = 19.44 from --md-sys-color-surface */

--wy-dropdown-icon-color: #52525B;
  /* Reference uses #52525B, delta E = 20.47 from --md-sys-color-on-surface-variant */

--wy-info-panel-text-color: #52525B;
  /* Reference uses #52525B, delta E = 20.47 from --md-sys-color-on-surface-variant */

```
