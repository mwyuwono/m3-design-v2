import { LitElement, html, css } from 'lit';

export class WyOptionToggle extends LitElement {
    static properties = {
        options: { type: Array },
        labels: { type: Array },
        value: { type: String },
        checked: { type: Boolean, reflect: true },
        label: { type: String },
        description: { type: String },
        disabled: { type: Boolean, reflect: true }
    };

    constructor() {
        super();
        this.options = null;
        this.labels = null;
        this.value = '';
        this.checked = false;
        this.label = '';
        this.description = '';
        this.disabled = false;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .label {
            margin: 0 0 var(--spacing-xs, 4px) 0;
            color: var(--md-sys-color-on-surface, #121714);
            font: var(--md-sys-typescale-body-medium, 500 1rem/1.4 var(--font-body, 'DM Sans', sans-serif));
        }

        .description {
            margin: 0 0 var(--spacing-sm, 8px) 0;
            color: var(--md-sys-color-on-surface-variant, #5E6E66);
            font: var(--md-sys-typescale-body-small, 400 0.875rem/1.4 var(--font-body, 'DM Sans', sans-serif));
        }

        .group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xxs, 2px);
            padding: var(--spacing-xxs, 2px);
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            background: var(--md-sys-color-surface-container, #ECEEE8);
        }

        .option {
            position: relative;
            overflow: hidden;
            border: 0;
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            padding: var(--spacing-xs, 4px) var(--spacing-md, 16px);
            background: transparent;
            color: var(--md-sys-color-on-surface-variant, #5E6E66);
            font: var(--md-sys-typescale-label-large, 500 0.875rem/1.25 var(--font-body, 'DM Sans', sans-serif));
            cursor: pointer;
            transition:
                background-color var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)),
                color var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
        }

        .option::after {
            content: '';
            position: absolute;
            inset: 0;
            background: currentColor;
            opacity: 0;
            transition: opacity var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
            pointer-events: none;
        }

        .option:hover::after {
            opacity: var(--md-sys-state-hover-opacity, 0.08);
        }

        .option.selected {
            background: var(--md-sys-color-primary, #2C4C3B);
            color: var(--md-sys-color-on-primary, #FFFFFF);
        }

        .option:focus-visible {
            outline: 2px solid var(--md-sys-color-primary, #2C4C3B);
            outline-offset: 1px;
        }

        :host([disabled]) .group {
            opacity: var(--md-sys-state-disabled-opacity, 0.38);
        }

        :host([disabled]) .option {
            cursor: not-allowed;
        }
    `;

    willUpdate(changedProperties) {
        if (!this._hasValidOptions()) {
            this.checked = false;
            return;
        }

        if (changedProperties.has('value') || changedProperties.has('options')) {
            const nextChecked = this.value === this.options[1];
            if (this.checked !== nextChecked) {
                this.checked = nextChecked;
            }
        } else if (changedProperties.has('checked')) {
            const nextValue = this.checked ? this.options[1] : this.options[0];
            if (this.value !== nextValue) {
                this.value = nextValue;
            }
        }
    }

    _hasValidOptions() {
        return Array.isArray(this.options) && this.options.length === 2;
    }

    _getDisplayLabel(index) {
        if (Array.isArray(this.labels) && this.labels.length === 2 && this.labels[index]) {
            return this.labels[index];
        }

        if (this._hasValidOptions() && this.options[index] !== '') {
            return this.options[index];
        }

        return index === 0 ? 'Off' : 'On';
    }

    _select(index) {
        if (this.disabled || !this._hasValidOptions()) return;
        if (index !== 0 && index !== 1) return;

        const nextChecked = index === 1;
        const nextValue = this.options[index];
        const didChange = this.checked !== nextChecked || this.value !== nextValue;

        this.checked = nextChecked;
        this.value = nextValue;

        if (didChange) {
            this.dispatchEvent(new CustomEvent('change', {
                detail: { checked: this.checked, value: this.value },
                bubbles: true,
                composed: true
            }));
        }
    }

    _handleKeyDown(event, index) {
        if (this.disabled) return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this._select(1);
            this.renderRoot.querySelector('[data-index="1"]')?.focus();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this._select(0);
            this.renderRoot.querySelector('[data-index="0"]')?.focus();
            return;
        }

        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this._select(index);
        }
    }

    render() {
        const hasValidOptions = this._hasValidOptions();
        const selectedIndex = this.checked ? 1 : 0;
        const ariaLabel = this.label || 'Option toggle';

        return html`
            ${this.label ? html`<p class="label">${this.label}</p>` : ''}
            ${this.description ? html`<p class="description">${this.description}</p>` : ''}
            <div class="group" role="group" aria-label="${ariaLabel}">
                ${[0, 1].map((index) => html`
                    <button
                        type="button"
                        class="option ${selectedIndex === index ? 'selected' : ''}"
                        data-index="${index}"
                        aria-pressed="${selectedIndex === index}"
                        tabindex="${selectedIndex === index ? '0' : '-1'}"
                        ?disabled="${this.disabled || !hasValidOptions}"
                        @click="${() => this._select(index)}"
                        @keydown="${(event) => this._handleKeyDown(event, index)}"
                    >
                        ${this._getDisplayLabel(index)}
                    </button>
                `)}
            </div>
        `;
    }
}

customElements.define('wy-option-toggle', WyOptionToggle);
