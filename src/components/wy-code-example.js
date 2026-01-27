import { LitElement, html, css } from 'lit';

/**
 * WyCodeExample - A code display component for showing code examples in the design system
 * 
 * @element wy-code-example
 * 
 * @prop {String} variant - Code block variant: 'default' (transparent) | 'surface-variant' (with background)
 * @prop {String} code - The code content to display
 * @prop {String} maxHeight - Maximum height for scrolling (default: '300px', attribute: max-height)
 * 
 * @csspart code-block - The code block container
 * @csspart code - The code element
 * 
 * @example
 * <wy-code-example code="<wy-button>Click me</wy-button>"></wy-code-example>
 * <wy-code-example variant="surface-variant" code="<wy-button>Click me</wy-button>"></wy-code-example>
 */
export class WyCodeExample extends LitElement {
  static properties = {
    variant: { type: String },
    code: { type: String },
    maxHeight: { type: String, attribute: 'max-height' }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .code-block {
      position: relative;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    pre {
      margin: 0;
      padding: 12px;
      border-radius: 8px;
      overflow-x: auto;
      overflow-y: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: clamp(0.75rem, 2vw, 0.8125rem);
      line-height: 1.7;
      color: var(--md-sys-color-on-surface);
      white-space: pre;
      display: block;
      word-break: break-word;
      overflow-wrap: break-word;
      box-sizing: border-box;
    }

    code {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: clamp(0.75rem, 2vw, 0.8125rem);
      line-height: 1.7;
      color: var(--md-sys-color-on-surface);
      white-space: pre;
      display: block;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* ===== DEFAULT VARIANT (Transparent) ===== */
    :host([variant="default"]) pre,
    :host(:not([variant])) pre {
      background: transparent;
      border: none;
    }

    /* ===== SURFACE VARIANT (With Background) ===== */
    :host([variant="surface-variant"]) pre {
      background: color-mix(in srgb, var(--md-sys-color-surface-variant) 40%, transparent);
      border: 1px solid var(--md-sys-color-outline-variant);
    }
  `;

  constructor() {
    super();
    this.variant = 'default';
    this.code = '';
    this.maxHeight = '300px';
  }

  render() {
    const maxHeightStyle = this.maxHeight ? `max-height: ${this.maxHeight};` : '';
    
    return html`
      <div class="code-block" part="code-block">
        <pre part="code" style="${maxHeightStyle}">
          <code part="code">${this.code}</code>
        </pre>
      </div>
    `;
  }
}

customElements.define('wy-code-example', WyCodeExample);
