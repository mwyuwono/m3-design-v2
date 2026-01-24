import { LitElement, html, css } from 'lit';

export class WyFilterChip extends LitElement {
    static properties = {
        label: { type: String },
        active: { type: Boolean, reflect: true },
        count: { type: Number }
    };

    static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: var(--wy-filter-chip-padding, 8px 16px);
      border-radius: 9999px;
      font-family: var(--wy-filter-chip-font-family, var(--font-display));
      font-size: var(--wy-filter-chip-font-size, 0.8125rem);
      font-weight: var(--wy-filter-chip-font-weight, 500);
      font-style: var(--wy-filter-chip-font-style, normal);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--wy-filter-chip-border, var(--md-sys-color-outline-variant));
      background-color: transparent;
      color: var(--wy-filter-chip-text, var(--md-sys-color-on-background));
      user-select: none;
    }

    :host(:hover) {
      color: var(--wy-filter-chip-text-hover, var(--wy-filter-chip-text, var(--md-sys-color-on-background)));
      background-color: var(--wy-filter-chip-hover-bg, var(--md-sys-color-surface-variant));
      border-color: var(--wy-filter-chip-border-hover, var(--md-sys-color-outline));
    }

    :host(:focus-visible) {
      outline: 2px solid var(--wy-filter-chip-focus, var(--md-sys-color-primary));
      outline-offset: 2px;
    }

    :host([active]) {
      background-color: var(--wy-filter-chip-active-bg, var(--md-sys-color-primary));
      color: var(--wy-filter-chip-active-fg, var(--md-sys-color-on-primary));
      border-color: var(--wy-filter-chip-active-bg, var(--md-sys-color-primary));
      font-weight: var(--wy-filter-chip-font-weight-active, var(--wy-filter-chip-font-weight, 500));
      box-shadow: var(--wy-filter-chip-shadow, none);
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
