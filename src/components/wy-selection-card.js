import { LitElement, html, css } from 'lit';

export class WySelectionCard extends LitElement {
  static properties = {
    label: { type: String },
    description: { type: String },
    icon: { type: String },
    value: { type: String },
    name: { type: String },
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .card {
      padding: 16px 20px;
      border-radius: 16px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: var(--md-sys-color-surface);
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      height: 100%;
      box-sizing: border-box;
    }

    :host([checked]) .card {
      border-color: var(--md-sys-color-primary);
      background-color: rgba(45, 78, 60, 0.04);
      box-shadow: 0 0 0 1px var(--md-sys-color-primary);
    }

    .card:hover {
      border-color: var(--md-sys-color-primary);
      background-color: var(--md-sys-color-surface-variant);
    }

    .icon-container {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background-color: var(--md-sys-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-text-heading);
      margin-top: 2px; /* Slight alignment adjust */
    }

    @media (max-width: 600px) {
      .icon-container {
        display: none;
      }
      .card {
        padding: 16px;
      }
    }

    :host([checked]) .icon-container {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .content-stack {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .label {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
    }

    .description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.4;
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* Accessibility focus */
    .card:focus-within {
      outline: none;
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.2);
    }
  `;

  render() {
    return html`
      <div 
        class="card" 
        @click="${this._toggleChecked}"
        tabindex="${this.disabled ? -1 : 0}"
      >
        <input 
          type="checkbox" 
          class="radio-input"
          name="${this.name}"
          .value="${this.value}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          tabindex="-1"
        >
        ${this.icon ? html`
          <div class="icon-container">
            <md-icon>${this.icon}</md-icon>
          </div>
        ` : ''}
        <div class="content-stack">
          <div class="label">${this.label}</div>
          ${this.description ? html`<div class="description">${this.description}</div>` : ''}
        </div>
      </div>
    `;
  }

  _toggleChecked(e) {
    if (this.disabled) return;

    // Toggle the value
    const newState = !this.checked;

    // If we are unchecking, we need to ensure other radios in the group 
    // are handled if they existed, but here we just manage this component's state.
    this.checked = newState;

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('wy-selection-card', WySelectionCard);
