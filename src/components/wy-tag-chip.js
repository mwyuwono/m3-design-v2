import { LitElement, html, css } from 'lit';

export class WyTagChip extends LitElement {
    static properties = {
        label: { type: String },
        variant: { type: String }, // 'user-entered' | 'ai-generated'
        removable: { type: Boolean }
    };

    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      transition: all 0.2s;
      user-select: none;
    }

    :host([variant="user-entered"]) {
      background-color: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    :host([variant="ai-generated"]) {
      background-color: transparent;
      color: var(--md-sys-color-text-heading);
      border: 1px dashed var(--md-sys-color-primary);
    }

    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .remove-btn:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    md-icon {
      font-size: 12px;
      --md-icon-size: 12px;
    }
  `;

    render() {
        return html`
      <span>${this.label}</span>
      ${this.removable ? html`
        <div class="remove-btn" @click="${this._handleRemove}">
          <md-icon>close</md-icon>
        </div>
      ` : ''}
    `;
    }

    _handleRemove(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('remove', {
            detail: { label: this.label },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wy-tag-chip', WyTagChip);
