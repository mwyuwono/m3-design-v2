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
      padding: 4px 12px;
      border-radius: 9999px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid var(--md-sys-color-outline-variant, #e5e7eb);
      background-color: transparent;
      color: var(--md-sys-color-on-surface-variant, #64748b);
      user-select: none;
      white-space: nowrap;
      flex-shrink: 0;
    }

    :host(:hover:not([active])) {
      color: var(--md-sys-color-on-surface, #1f2937);
      background-color: var(--md-sys-color-surface-variant, #f9fafb);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--md-sys-color-primary, #2C4C3B);
      outline-offset: 2px;
    }

    :host([active]) {
      background-color: var(--md-sys-color-primary, #2C4C3B);
      color: var(--md-sys-color-on-primary, #FFFFFF);
      border-color: transparent;
      font-weight: 600;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
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
