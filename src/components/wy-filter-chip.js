import { LitElement, html, css } from 'lit';

export class WyFilterChip extends LitElement {
    static properties = {
        label: { type: String },
        active: { type: Boolean, reflect: true },
        count: { type: Number }
    };

    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: var(--wy-filter-chip-padding, 4px 12px);
      border-radius: 9999px;
      font-family: var(--wy-filter-chip-font-family, var(--font-sans, 'DM Sans', sans-serif));
      font-size: var(--wy-filter-chip-font-size, 11px);
      font-weight: var(--wy-filter-chip-font-weight, 500);
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid var(--wy-filter-chip-border, var(--md-sys-color-outline-variant, #e5e7eb));
      background-color: transparent;
      color: var(--wy-filter-chip-text, var(--md-sys-color-on-surface-variant, #64748b));
      user-select: none;
      white-space: nowrap;
      flex-shrink: 0;
    }

    :host(:hover:not([active])) {
      color: var(--wy-filter-chip-text-hover, var(--md-sys-color-on-surface, #1f2937));
      background-color: var(--wy-filter-chip-hover-bg, var(--md-sys-color-surface-variant, #f9fafb));
      border-color: var(--wy-filter-chip-border-hover, var(--md-sys-color-outline-variant, #e5e7eb));
    }

    :host(:focus-visible) {
      outline: 2px solid var(--wy-filter-chip-focus, var(--md-sys-color-primary, #2C4C3B));
      outline-offset: 2px;
    }

    :host([active]) {
      background-color: var(--wy-filter-chip-active-bg, var(--md-sys-color-primary, #2C4C3B));
      color: var(--wy-filter-chip-active-fg, var(--md-sys-color-on-primary, #FFFFFF));
      border-color: transparent;
      font-weight: var(--wy-filter-chip-font-weight-active, 500);
      box-shadow: var(--wy-filter-chip-shadow, none);
    }

    .count {
      opacity: 0.7;
      font-size: 10px;
    }

    :host([active]) .count {
      opacity: 0.85;
    }
  `;

    render() {
        return html`
      <span>${this.label}</span>
      ${this.count !== undefined ? html`<span class="count">(${this.count})</span>` : ''}
    `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');
        this.addEventListener('keydown', this._handleKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown);
    }

    _handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    }
}

customElements.define('wy-filter-chip', WyFilterChip);
