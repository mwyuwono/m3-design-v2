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
      
      /* Opaque white background by default */
      background-color: var(--wy-filter-chip-bg, var(--md-sys-color-surface));
      border: 1px solid var(--wy-filter-chip-border, transparent);
      color: var(--wy-filter-chip-text, var(--md-sys-color-on-surface));
      box-shadow: none;
      
      user-select: none;
      white-space: nowrap;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    /* Material Design 3 state layer for hover */
    :host::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-on-surface);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard);
      pointer-events: none;
      border-radius: inherit;
    }

    :host(:hover:not([active]))::before {
      opacity: var(--md-sys-state-hover-opacity, 0.08);
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
      box-shadow: none;
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
