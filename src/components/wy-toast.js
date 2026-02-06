import { LitElement, html, css } from 'lit';

/**
 * WyToast - A toast notification component with variant support
 *
 * @element wy-toast
 *
 * @prop {String} message - The message to display
 * @prop {Boolean} show - Controls visibility (reflects to attribute)
 * @prop {Number} duration - Auto-dismiss duration in ms (default: 3000)
 * @prop {String} variant - Toast variant: 'success' | 'error' | 'warning' | 'info' (default: 'success')
 *
 * @fires dismiss - Fired when toast is dismissed (auto or manual)
 *
 * @example
 * <wy-toast message="Successfully saved!" variant="success"></wy-toast>
 * <wy-toast message="Failed to save" variant="error"></wy-toast>
 */
export class WyToast extends LitElement {
    static properties = {
        message: { type: String },
        show: { type: Boolean, reflect: true },
        duration: { type: Number },
        variant: { type: String }
    };

    constructor() {
        super();
        this.message = '';
        this.show = false;
        this.duration = 3000;
        this.variant = 'success';
        this._timer = null;
    }

    /**
     * Get the icon name based on variant
     */
    get _icon() {
        switch (this.variant) {
            case 'error': return 'error';
            case 'warning': return 'warning';
            case 'info': return 'info';
            default: return 'check_circle';
        }
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

    /* Variant-specific icon colors */
    .icon.variant-success {
      color: var(--md-sys-color-primary-fixed, #4CAF50);
    }

    .icon.variant-error {
      color: var(--md-sys-color-error, #B3261E);
    }

    .icon.variant-warning {
      color: var(--md-sys-color-tertiary, #E4A93C);
    }

    .icon.variant-info {
      color: var(--md-sys-color-secondary, #625B71);
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
        <span class="icon variant-${this.variant}">${this._icon}</span>
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
