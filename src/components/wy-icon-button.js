import { LitElement, html, css } from 'lit';

/**
 * WyIconButton - A circular icon-only button component following the Weaver-Yuwono Visual Identity Guide v1.0
 * 
 * @element wy-icon-button
 * 
 * @prop {String} variant - Button variant: 'filled' | 'outlined' (default: 'filled')
 * @prop {String} icon - Material icon name (required)
 * @prop {String} label - Accessibility label for the button (required for a11y)
 * @prop {String} size - Button size: 'default' | 'small' (default: 'default')
 * @prop {Boolean} disabled - Disabled state
 * 
 * @fires click - Fired when button is clicked (unless disabled)
 * 
 * @csspart button - The button element
 * 
 * @example
 * <wy-icon-button icon="north_east" label="Open link"></wy-icon-button>
 * <wy-icon-button variant="outlined" icon="share" label="Share"></wy-icon-button>
 * <wy-icon-button icon="download" label="Download" size="small"></wy-icon-button>
 */
export class WyIconButton extends LitElement {
  static properties = {
    variant: { type: String },
    icon: { type: String },
    label: { type: String },
    size: { type: String },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = css`
    /* Fonts are loaded globally via HTML link tags - no @import needed in Shadow DOM */

    :host {
      display: inline-block;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .button {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      padding: 0;
      transition: 
        transform var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
        box-shadow var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
        background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
        border-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
    }

    /* State layer for hover/focus/pressed */
    .button::before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
      border-radius: inherit;
    }

    /* Focus visible outline */
    .button:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* ===== SIZE VARIANTS ===== */
    
    /* Default: 56px */
    .button.size-default {
      width: 56px;
      height: 56px;
    }

    .button.size-default .icon {
      font-size: 24px;
    }

    /* Small: 44px */
    .button.size-small {
      width: 44px;
      height: 44px;
    }

    .button.size-small .icon {
      font-size: 20px;
    }

    /* ===== FILLED VARIANT (Hunter Green) ===== */
    .button.variant-filled {
      background-color: var(--wy-icon-button-filled-bg, var(--md-sys-color-primary, #2C4C3B));
      color: var(--wy-icon-button-filled-fg, var(--md-sys-color-on-primary, #FFFFFF));
      box-shadow: var(--wy-icon-button-filled-shadow, 0 4px 12px rgba(44, 76, 59, 0.2));
    }

    .button.variant-filled::before {
      background-color: var(--wy-icon-button-filled-fg, var(--md-sys-color-on-primary, #FFFFFF));
    }

    .button.variant-filled:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(44, 76, 59, 0.3);
    }

    .button.variant-filled:hover:not(:disabled)::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .button.variant-filled:active:not(:disabled) {
      transform: scale(1);
    }

    .button.variant-filled:active:not(:disabled)::before {
      opacity: var(--md-sys-state-pressed-opacity);
    }

    /* ===== OUTLINED VARIANT (Alabaster) ===== */
    .button.variant-outlined {
      background-color: var(--wy-icon-button-outlined-bg);
      color: var(--wy-icon-button-outlined-fg);
      border: 1px solid var(--wy-icon-button-outlined-border);
    }

    .button.variant-outlined::before {
      background-color: var(--md-sys-color-primary);
    }

    .button.variant-outlined:hover:not(:disabled) {
      border-color: var(--md-sys-color-primary);
      transform: scale(1.05);
    }

    .button.variant-outlined:hover:not(:disabled)::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .button.variant-outlined:active:not(:disabled) {
      transform: scale(1);
    }

    .button.variant-outlined:active:not(:disabled)::before {
      opacity: var(--md-sys-state-pressed-opacity);
    }

    /* ===== DISABLED STATE ===== */
    .button:disabled {
      opacity: var(--md-sys-state-disabled-opacity);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    /* ===== ICON STYLING ===== */
    .icon {
      font-family: 'Material Symbols Outlined';
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
  `;

  constructor() {
    super();
    this.variant = 'filled';
    this.icon = 'add';
    this.label = '';
    this.size = 'default';
    this.disabled = false;
  }

  render() {
    const classes = [
      'button',
      `variant-${this.variant}`,
      `size-${this.size}`
    ].join(' ');

    return html`
      <button 
        class="${classes}" 
        part="button"
        ?disabled="${this.disabled}"
        aria-label="${this.label || this.icon}"
        title="${this.label || this.icon}"
        @click="${this._handleClick}"
      >
        <span class="icon">${this.icon}</span>
      </button>
    `;
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

customElements.define('wy-icon-button', WyIconButton);
