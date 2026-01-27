import { LitElement, html, css } from 'lit';

/**
 * WyUtilityTag - A small utility tag/pill component following the Weaver-Yuwono Visual Identity Guide v1.0
 * 
 * @element wy-utility-tag
 * 
 * @prop {String} label - Tag label text (required)
 * @prop {String} variant - Tag variant: 'default' | 'add' (default: 'default')
 * @prop {Boolean} interactive - Whether the tag is clickable (default: false for 'default', true for 'add')
 * 
 * @fires click - Fired when tag is clicked (only when interactive)
 * 
 * @csspart tag - The tag element
 * 
 * @example
 * <wy-utility-tag label="Quarterly"></wy-utility-tag>
 * <wy-utility-tag label="ESG Focus"></wy-utility-tag>
 * <wy-utility-tag label="Add Tag" variant="add"></wy-utility-tag>
 */
export class WyUtilityTag extends LitElement {
  static properties = {
    label: { type: String },
    variant: { type: String },
    interactive: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 8px 24px;
      border-radius: var(--md-sys-shape-corner-full);
      font-family: var(--font-sans);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: var(--wy-button-tracking-architectural);
      transition: 
        background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
        border-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
        color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
    }

    /* ===== DEFAULT VARIANT ===== */
    .tag.variant-default {
      background-color: var(--wy-utility-tag-bg);
      color: var(--wy-utility-tag-fg);
      border: 1px solid var(--wy-utility-tag-border);
      cursor: default;
    }

    .tag.variant-default.interactive {
      cursor: pointer;
    }

    .tag.variant-default.interactive:hover {
      background-color: color-mix(in srgb, var(--md-sys-color-primary) 10%, transparent);
      border-color: color-mix(in srgb, var(--md-sys-color-primary) 20%, transparent);
    }

    /* ===== ADD VARIANT ===== */
    .tag.variant-add {
      background-color: transparent;
      color: var(--wy-utility-tag-add-fg);
      border: 1px dashed var(--wy-utility-tag-add-border);
      cursor: pointer;
    }

    .tag.variant-add:hover {
      border-color: color-mix(in srgb, var(--md-sys-color-primary) 60%, transparent);
      color: var(--md-sys-color-primary);
    }

    .tag.variant-add:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* Plus icon for add variant */
    .plus-icon {
      font-weight: 700;
      font-size: 12px;
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.variant = 'default';
    this.interactive = false;
  }

  render() {
    // Add variant is always interactive
    const isInteractive = this.variant === 'add' || this.interactive;
    
    const classes = [
      'tag',
      `variant-${this.variant}`,
      isInteractive ? 'interactive' : ''
    ].filter(Boolean).join(' ');

    // Use button for interactive, span for non-interactive
    if (isInteractive) {
      return html`
        <button 
          class="${classes}" 
          part="tag"
          @click="${this._handleClick}"
        >
          ${this.variant === 'add' ? html`<span class="plus-icon">+</span>` : null}
          ${this.label}
        </button>
      `;
    }

    return html`
      <span class="${classes}" part="tag">
        ${this.label}
      </span>
    `;
  }

  _handleClick(e) {
    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true,
      detail: { label: this.label }
    }));
  }
}

customElements.define('wy-utility-tag', WyUtilityTag);
