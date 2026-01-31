import { LitElement, html, css } from 'lit';

export class WyToast extends LitElement {
    static properties = {
        message: { type: String },
        show: { type: Boolean, reflect: true },
        duration: { type: Number }
    };

    constructor() {
        super();
        this.message = '';
        this.show = false;
        this.duration = 3000;
        this._timer = null;
    }

    static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      z-index: 3000;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
      opacity: 0;
    }

    :host([show]) {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .toast-container {
      background-color: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
      padding: 12px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .icon {
      color: var(--md-sys-color-primary-fixed);
      font-family: 'Material Symbols Outlined';
      font-size: 20px;
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
    }

    .message {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
    }
  `;

    render() {
        return html`
      <div class="toast-container">
        <span class="icon">check_circle</span>
        <span class="message">${this.message}</span>
      </div>
    `;
    }

    updated(changedProperties) {
        if (changedProperties.has('show') && this.show) {
            if (this._timer) clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.show = false;
                this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
            }, this.duration);
        }
    }
}

customElements.define('wy-toast', WyToast);
