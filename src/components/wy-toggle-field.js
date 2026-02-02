import { LitElement, html, css } from 'lit';

export class WyToggleField extends LitElement {
    static properties = {
        checked: { type: Boolean, reflect: true },
        label: { type: String },
        description: { type: String },
        disabled: { type: Boolean, reflect: true }
    };

    constructor() {
        super();
        this.checked = false;
        this.label = '';
        this.description = '';
        this.disabled = false;
    }

    static styles = css`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

        :host {
            display: block;
            width: 100%;
        }

        .toggle-field {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--spacing-md, 16px);
            padding: var(--spacing-md, 16px) 0;
        }

        .text-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs, 4px);
        }

        .label {
            font-family: var(--font-body, 'DM Sans', sans-serif);
            font-size: 1rem;
            font-weight: 500;
            color: var(--md-sys-color-on-surface, #121714);
            line-height: 1.5;
        }

        .description {
            font-family: var(--font-body, 'DM Sans', sans-serif);
            font-size: 0.875rem;
            color: var(--md-sys-color-on-surface-variant, #5E6E66);
            line-height: 1.4;
        }

        .toggle-container {
            position: relative;
            flex-shrink: 0;
        }

        .toggle {
            position: relative;
            width: 56px;
            height: 28px;
            background-color: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 20%, transparent);
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            cursor: pointer;
            transition: background-color var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
        }

        .toggle:hover {
            background-color: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 30%, transparent);
        }

        .toggle.checked {
            background-color: var(--md-sys-color-primary, #2C4C3B);
        }

        .toggle.checked:hover {
            background-color: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 90%, black);
        }

        .toggle.disabled {
            opacity: var(--md-sys-state-disabled-opacity, 0.38);
            cursor: not-allowed;
        }

        .toggle-knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 24px;
            height: 24px;
            background-color: var(--md-sys-color-surface, #FDFBF7);
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            transition: transform var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .toggle.checked .toggle-knob {
            transform: translateX(28px);
        }

        :host([disabled]) .toggle-field {
            opacity: var(--md-sys-state-disabled-opacity, 0.38);
            cursor: not-allowed;
        }

        :host([disabled]) .toggle {
            pointer-events: none;
        }
    `;

    _handleToggle() {
        if (this.disabled) return;
        
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="toggle-field">
                <div class="text-content">
                    ${this.label ? html`<div class="label">${this.label}</div>` : ''}
                    ${this.description ? html`<div class="description">${this.description}</div>` : ''}
                </div>
                <div class="toggle-container">
                    <div 
                        class="toggle ${this.checked ? 'checked' : ''} ${this.disabled ? 'disabled' : ''}"
                        @click="${this._handleToggle}"
                        role="switch"
                        aria-checked="${this.checked}"
                        aria-disabled="${this.disabled}"
                        tabindex="${this.disabled ? '-1' : '0'}"
                        @keydown="${(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                this._handleToggle();
                            }
                        }}"
                    >
                        <div class="toggle-knob"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('wy-toggle-field', WyToggleField);
