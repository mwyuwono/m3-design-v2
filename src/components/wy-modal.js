import { LitElement, html, css } from 'lit';

export class WyModal extends LitElement {
    static properties = {
        open: { type: Boolean, reflect: true },
        heading: { type: String },
        maxWidth: { type: String, attribute: 'max-width' },
        fullScreen: { type: Boolean, attribute: 'full-screen' }
    };

    constructor() {
        super();
        this.open = false;
        this.heading = '';
        this.maxWidth = '560px';
        this.fullScreen = false;
    }

    static styles = css`
    :host {
      display: block;
    }

    /* Wrap md-dialog to override its internals if needed, 
       but primarily use CSS variables for styling. */
    md-dialog {
      --md-dialog-container-color: var(--md-sys-color-surface);
      --md-dialog-container-shape: 28px;
    }

    /* Soft Modernism Detail: Surface border instead of heavy shadow */
    md-dialog::part(container) {
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    /* Custom slide-up animation overrides for md-dialog */
    /* Note: md-dialog uses standard M3 transitions, 
       we'll inject specific timing for 'Soft Modernism' */
    
    [slot="headline"] {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      color: var(--md-sys-color-primary);
      margin: 0;
    }

    .modal-content {
      padding: 0 4px;
      font-family: var(--font-body);
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.6;
    }

    .footer-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      width: 100%;
    }

    /* Ensure buttons in footer are capsule-shaped */
    ::slotted(md-filled-button),
    ::slotted(md-outlined-button),
    ::slotted(md-text-button) {
      /* Radius is already global, but ensure layout space */
    }

    @media (max-width: 600px) {
      md-dialog {
        --md-dialog-container-max-width: 100vw;
        --md-dialog-container-max-height: 100vh;
        --md-dialog-container-shape: 28px 28px 0 0;
        margin: 0;
        align-self: flex-end;
      }
    }
  `;

    render() {
        return html`
      <md-dialog 
        ?open="${this.open}"
        @close="${this._handleClose}"
        @cancel="${this._handleCancel}"
        style="--md-dialog-container-max-width: ${this.maxWidth}"
      >
        <div slot="headline">
          ${this.heading}
        </div>
        <form slot="content" method="dialog" class="modal-content">
          <slot></slot>
        </form>
        <div slot="actions" class="footer-actions">
          <slot name="actions"></slot>
        </div>
      </md-dialog>
    `;
    }

    show() {
        this.open = true;
    }

    close() {
        this.open = false;
    }

    _handleClose(e) {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close', {
            detail: e.detail,
            bubbles: true,
            composed: true
        }));
    }

    _handleCancel(e) {
        // Prevent dismissal if needed, or just sync state
        this.open = false;
    }
}

customElements.define('wy-modal', WyModal);
