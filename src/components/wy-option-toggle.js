import { LitElement, html, css } from 'lit';

export class WyOptionToggle extends LitElement {
    static properties = {
        options: { type: Array },
        labels: { type: Array },
        value: { type: String },
        checked: { type: Boolean, reflect: true },
        label: { type: String },
        description: { type: String },
        disabled: { type: Boolean, reflect: true },
        variant: { type: String, reflect: true },
        size: { type: String, reflect: true },
        showSelectedValueText: { type: Boolean, attribute: 'show-selected-value-text' },
        ariaLabel: { type: String, attribute: 'aria-label' }
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
        this.variant = 'segmented';
        this.size = 'default';
        this.showSelectedValueText = false;
        this.ariaLabel = '';
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

        .switch-row {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm, 8px);
            min-height: 32px;
        }

        .switch-button {
            position: relative;
            overflow: hidden;
            border: 0;
            padding: 0;
            width: 52px;
            height: 32px;
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            background: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 22%, transparent);
            cursor: pointer;
            transition: background-color var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
        }

        :host([size='compact']) .switch-button {
            width: 40px;
            height: 24px;
        }

        .switch-button.checked {
            background: var(--md-sys-color-primary, #2C4C3B);
        }

        .switch-button::after {
            content: '';
            position: absolute;
            inset: 0;
            background: currentColor;
            opacity: 0;
            transition: opacity var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
            pointer-events: none;
        }

        .switch-button:hover::after {
            opacity: var(--md-sys-state-hover-opacity, 0.08);
        }

        .switch-button:focus-visible {
            outline: 2px solid var(--md-sys-color-primary, #2C4C3B);
            outline-offset: 2px;
        }

        .switch-thumb {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 26px;
            height: 26px;
            border-radius: var(--md-sys-shape-corner-full, 9999px);
            background: var(--md-sys-color-surface, #FDFBF7);
            transition: transform var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
        }

        :host([size='compact']) .switch-thumb {
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
        }

        .switch-button.checked .switch-thumb {
            transform: translateX(20px);
        }

        :host([size='compact']) .switch-button.checked .switch-thumb {
            transform: translateX(16px);
        }

        .switch-state {
            font: var(--md-sys-typescale-label-large, 500 0.875rem/1.25 var(--font-body, 'DM Sans', sans-serif));
            color: var(--md-sys-color-on-surface-variant, #5E6E66);
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        :host([size='compact']) .switch-state {
            font-size: 0.75rem;
        }

        .selected-value-text {
            margin: var(--spacing-sm, 8px) 0 0 0;
            color: var(--md-sys-color-on-surface, #121714);
            font: var(--md-sys-typescale-body-medium, 500 1rem/1.45 var(--font-body, 'DM Sans', sans-serif));
        }

        :host([size='compact']) .selected-value-text {
            margin-top: var(--spacing-xs, 4px);
            font-size: 0.8125rem;
            line-height: 1.35;
        }

        :host([disabled]) .switch-button {
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

    _getSelectedIndex() {
        return this.checked ? 1 : 0;
    }

    _getSelectedValue() {
        if (!this._hasValidOptions()) return '';
        return this.options[this._getSelectedIndex()] ?? '';
    }

    _getA11yLabel() {
        return this.ariaLabel || this.label || 'Option toggle';
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

    _handleSwitchKeyDown(event) {
        if (this.disabled) return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this._select(1);
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this._select(0);
            return;
        }

        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this._select(this.checked ? 0 : 1);
        }
    }

    render() {
        const hasValidOptions = this._hasValidOptions();
        const selectedIndex = this._getSelectedIndex();
        const ariaLabel = this._getA11yLabel();
        const showSelectedValueText = this.showSelectedValueText && this._getSelectedValue();

        return html`
            ${this.label ? html`<p class="label">${this.label}</p>` : ''}
            ${this.description ? html`<p class="description">${this.description}</p>` : ''}
            ${this.variant === 'switch' ? html`
                <div class="switch-row">
                    <button
                        type="button"
                        class="switch-button ${this.checked ? 'checked' : ''}"
                        role="switch"
                        aria-checked="${this.checked}"
                        aria-label="${ariaLabel}"
                        ?disabled="${this.disabled || !hasValidOptions}"
                        @click="${() => this._select(this.checked ? 0 : 1)}"
                        @keydown="${(event) => this._handleSwitchKeyDown(event)}"
                    >
                        <span class="switch-thumb"></span>
                    </button>
                    <span class="switch-state">${this._getDisplayLabel(selectedIndex)}</span>
                </div>
            ` : html`
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
            `}
            ${showSelectedValueText ? html`
                <p class="selected-value-text">${this._getSelectedValue()}</p>
            ` : ''}
        `;
    }
}

customElements.define('wy-option-toggle', WyOptionToggle);
