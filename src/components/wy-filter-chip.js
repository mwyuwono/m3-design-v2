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
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9999px;
      font-family: var(--font-display);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: transparent;
      color: var(--md-sys-color-on-background);
      user-select: none;
    }

    :host(:hover) {
      background-color: var(--md-sys-color-surface-variant);
    }

    :host([active]) {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      border-color: var(--md-sys-color-primary);
    }

    .count {
      opacity: 0.6;
      font-size: 0.75rem;
    }

    :host([active]) .count {
      opacity: 0.8;
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
        this.addEventListener('click', this._toggle);
    }

    _toggle() {
        this.active = !this.active;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { active: this.active, label: this.label },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wy-filter-chip', WyFilterChip);
