import { LitElement, html, css } from 'lit';

/**
 * Reusable info/description panel component
 * Displays informational content in a bordered card with muted styling
 * 
 * @property {String} content - Panel text content (can also use slot for rich content)
 * @property {String} variant - Optional visual variant (reserved for future use)
 */
export class WyInfoPanel extends LitElement {
    static properties = {
        content: { type: String },
        variant: { type: String }
    };

    constructor() {
        super();
        this.content = '';
        this.variant = 'default';
    }

    static styles = css`
        /* Note: DM Sans font should be loaded in consuming page <head> */
        
        :host {
            display: block;
            /* Fallback values for component-specific tokens */
            --wy-info-panel-bg: var(--md-sys-color-background, #FDFBF7);
            --wy-info-panel-border: var(--md-sys-color-surface-container-highest, #D7D3C8);
            --wy-info-panel-text-color: #52525B;
        }
        
        .panel {
            background-color: var(--wy-info-panel-bg);
            border: 1px solid var(--wy-info-panel-border);
            border-radius: var(--md-sys-shape-corner-medium, 16px);
            padding: var(--spacing-lg, 24px);
            color: var(--wy-info-panel-text-color);
            font-family: var(--font-sans, 'DM Sans', sans-serif);
            font-size: var(--md-sys-typescale-body-medium-size, 0.875rem);
            line-height: 1.6;
            transition: background-color var(--md-sys-motion-duration-short4, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)),
                        border-color var(--md-sys-motion-duration-short4, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
        }
        
        .panel p {
            margin: 0;
        }
        
        .panel p + p {
            margin-top: var(--spacing-md, 16px);
        }
        
        /* Support for slotted content */
        ::slotted(*) {
            color: var(--wy-info-panel-text-color);
            font-family: var(--font-sans, 'DM Sans', sans-serif);
        }
        
        ::slotted(p) {
            margin: 0;
        }
        
        ::slotted(p + p) {
            margin-top: var(--spacing-md, 16px);
        }
    `;

    render() {
        return html`
            <div class="panel">
                ${this.content ? html`<p>${this.content}</p>` : html`<slot></slot>`}
            </div>
        `;
    }
}

customElements.define('wy-info-panel', WyInfoPanel);
