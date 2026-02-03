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
        variant: { type: String },
        heading: { type: String }
    };

    constructor() {
        super();
        this.content = '';
        this.variant = 'default';
        this.heading = '';
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
        
        .panel.compact {
            padding: var(--spacing-md, 16px);
            background-color: var(--md-sys-color-secondary-container, #E8DDD7);
        }
        
        .panel-heading {
            font-family: var(--font-serif, 'Playfair Display', serif);
            font-size: var(--md-sys-typescale-title-medium-size, 1rem);
            color: var(--md-sys-color-on-surface);
            margin: 0;
            font-weight: 500;
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
    
    /* Context-specific styling for prompt modal usage */
    :host-context(wy-prompt-modal) .panel {
        background-color: transparent;
        border: none;
        padding: var(--spacing-md, 16px);
        font-size: var(--md-sys-typescale-body-small-size, 0.875rem);
    }
    
    /* Compact variant in prompt modal should have background color */
    :host-context(wy-prompt-modal) .panel.compact {
        background-color: var(--md-sys-color-secondary-container, #E8DDD7);
        border: 1px solid var(--md-sys-color-outline-variant, #DDD);
    }
    
    :host-context(wy-prompt-modal) .panel-heading {
        font-size: var(--md-sys-typescale-title-small-size, 1rem);
        margin: 0;
    }
    
    :host-context(wy-prompt-modal) .panel p + p {
        margin-top: var(--spacing-md, 16px);
    }
    `;

    render() {
        const panelClass = this.variant === 'compact' ? 'panel compact' : 'panel';
        
        return html`
            <div class="${panelClass}">
                ${this.heading ? html`<h3 class="panel-heading">${this.heading}</h3>` : ''}
                ${this.content ? html`<p>${this.content}</p>` : html`<slot></slot>`}
            </div>
        `;
    }
}

customElements.define('wy-info-panel', WyInfoPanel);
