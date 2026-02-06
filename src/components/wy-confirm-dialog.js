import { LitElement, html, css } from 'lit';

/**
 * WyConfirmDialog - A confirmation dialog component for destructive or important actions
 *
 * @element wy-confirm-dialog
 *
 * @prop {String} heading - Dialog title (default: "Confirm")
 * @prop {String} message - Dialog body text
 * @prop {String} confirmLabel - Confirm button text (default: "Confirm")
 * @prop {String} cancelLabel - Cancel button text (default: "Cancel")
 * @prop {String} variant - Dialog variant: 'default' | 'destructive' (default: 'default')
 * @prop {Boolean} open - Controls dialog visibility (reflects to attribute)
 *
 * @fires confirm - Fired when user clicks confirm button
 * @fires cancel - Fired when user clicks cancel button or dismisses dialog
 *
 * @example
 * <wy-confirm-dialog
 *   heading="Delete Item?"
 *   message="This action cannot be undone."
 *   confirm-label="Delete"
 *   cancel-label="Cancel"
 *   variant="destructive"
 * ></wy-confirm-dialog>
 */
export class WyConfirmDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
    message: { type: String },
    confirmLabel: { type: String, attribute: 'confirm-label' },
    cancelLabel: { type: String, attribute: 'cancel-label' },
    variant: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.heading = 'Confirm';
    this.message = '';
    this.confirmLabel = 'Confirm';
    this.cancelLabel = 'Cancel';
    this.variant = 'default';
  }

  static styles = css`
    :host {
      display: block;
    }

    /* Backdrop overlay */
    .backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.32);
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-standard, ease),
                  visibility var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-standard, ease);
    }

    :host([open]) .backdrop {
      opacity: 1;
      visibility: visible;
    }

    /* Dialog container */
    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background-color: var(--md-sys-color-surface, #FFFBFE);
      border-radius: 28px;
      border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 2001;
      min-width: 280px;
      max-width: 400px;
      padding: 24px;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
                  transform var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
                  visibility var(--md-sys-motion-duration-medium2, 300ms);
    }

    :host([open]) .dialog {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    /* Dialog heading */
    .heading {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface, #1C1B1F);
      margin: 0 0 16px 0;
      line-height: 1.3;
    }

    /* Dialog message */
    .message {
      font-family: var(--font-body, system-ui, sans-serif);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface-variant, #49454F);
      line-height: 1.5;
      margin: 0 0 24px 0;
    }

    /* Action buttons container */
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    /* Base button styles */
    .btn {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 24px;
      border: none;
      border-radius: var(--md-sys-shape-corner-full, 9999px);
      font-family: var(--font-sans, system-ui, sans-serif);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-duration-short4, 200ms) var(--md-sys-motion-easing-standard, ease),
                  transform var(--md-sys-motion-duration-short4, 200ms) var(--md-sys-motion-easing-standard, ease);
    }

    /* State layer for hover/focus */
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2, 100ms) var(--md-sys-motion-easing-standard, ease);
      pointer-events: none;
      border-radius: inherit;
    }

    .btn:hover::before {
      opacity: var(--md-sys-state-hover-opacity, 0.08);
    }

    .btn:focus-visible {
      outline: 3px solid var(--md-sys-color-primary, #6750A4);
      outline-offset: 2px;
    }

    .btn:active::before {
      opacity: var(--md-sys-state-pressed-opacity, 0.12);
    }

    /* Cancel button - text style */
    .btn-cancel {
      background-color: transparent;
      color: var(--md-sys-color-primary, #6750A4);
    }

    .btn-cancel::before {
      background-color: var(--md-sys-color-primary, #6750A4);
    }

    /* Confirm button - filled style (default variant) */
    .btn-confirm {
      background-color: var(--md-sys-color-primary, #6750A4);
      color: var(--md-sys-color-on-primary, #FFFFFF);
    }

    .btn-confirm::before {
      background-color: var(--md-sys-color-on-primary, #FFFFFF);
    }

    .btn-confirm:hover {
      transform: translateY(-1px);
    }

    .btn-confirm:active {
      transform: translateY(0);
    }

    /* Destructive variant - error colored confirm button */
    :host([variant="destructive"]) .btn-confirm {
      background-color: var(--md-sys-color-error, #B3261E);
      color: var(--md-sys-color-on-error, #FFFFFF);
    }

    :host([variant="destructive"]) .btn-confirm::before {
      background-color: var(--md-sys-color-on-error, #FFFFFF);
    }

    /* Mobile adjustments */
    @media (max-width: 600px) {
      .dialog {
        min-width: auto;
        max-width: calc(100vw - 48px);
        margin: 24px;
      }

      .actions {
        flex-direction: column-reverse;
        gap: 8px;
      }

      .btn {
        width: 100%;
      }
    }
  `;

  render() {
    return html`
      <div class="backdrop" @click="${this._handleBackdropClick}"></div>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="heading" aria-describedby="message">
        <h2 class="heading" id="heading">${this.heading}</h2>
        <p class="message" id="message">${this.message}</p>
        <div class="actions">
          <button class="btn btn-cancel" @click="${this._handleCancel}">
            ${this.cancelLabel}
          </button>
          <button class="btn btn-confirm" @click="${this._handleConfirm}">
            ${this.confirmLabel}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Show the dialog
   */
  show() {
    this.open = true;
  }

  /**
   * Close the dialog
   */
  close() {
    this.open = false;
  }

  _handleBackdropClick() {
    this._handleCancel();
  }

  _handleConfirm() {
    this.close();
    this.dispatchEvent(new CustomEvent('confirm', {
      bubbles: true,
      composed: true
    }));
  }

  _handleCancel() {
    this.close();
    this.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      composed: true
    }));
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      // Handle focus trap when dialog opens
      if (this.open) {
        // Focus the confirm button when dialog opens
        requestAnimationFrame(() => {
          const confirmBtn = this.shadowRoot?.querySelector('.btn-confirm');
          confirmBtn?.focus();
        });
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Ensure body scroll is restored if component is removed while open
    document.body.style.overflow = '';
  }
}

customElements.define('wy-confirm-dialog', WyConfirmDialog);
