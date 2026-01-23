import { LitElement, html, css, nothing } from 'lit';

export class WyCategorySelect extends LitElement {
    static properties = {
        value: { type: String },
        categories: { type: Array },
        placeholder: { type: String },
        disabled: { type: Boolean },
        _inputValue: { type: String, state: true },
        _showDropdown: { type: Boolean, state: true },
        _focusedIndex: { type: Number, state: true }
    };

    constructor() {
        super();
        this.value = '';
        this.categories = [];
        this.placeholder = 'Select category...';
        this.disabled = false;
        this._inputValue = '';
        this._showDropdown = false;
        this._focusedIndex = -1;
    }

    static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      position: relative;
      width: 100%;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--md-sys-color-on-surface);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.1);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 100;
      overflow: hidden;
      max-height: 240px;
      overflow-y: auto;
    }

    .item {
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.1s;
    }

    .item:hover,
    .item.focused {
      background-color: var(--md-sys-color-surface-variant);
    }

    .item.selected {
      color: var(--md-sys-color-primary);
      font-weight: 600;
      background-color: rgba(45, 78, 60, 0.05);
    }

    .no-results {
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.6;
      font-style: italic;
    }
  `;

    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this._inputValue = this.value;
        }
    }

    render() {
        const filtered = this._getFilteredCategories();

        return html`
      <div class="container">
        <input 
          type="text" 
          .value="${this._inputValue}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        >
        ${this._showDropdown ? html`
          <div class="dropdown">
            ${filtered.length > 0 ? filtered.map((cat, i) => html`
              <div 
                class="item ${cat === this.value ? 'selected' : ''} ${i === this._focusedIndex ? 'focused' : ''}"
                @mousedown="${(e) => { e.preventDefault(); this._select(cat); }}"
                @mouseenter="${() => this._focusedIndex = i}"
              >
                ${cat}
              </div>
            `) : html`<div class="no-results">No categories found</div>`}
          </div>
        ` : nothing}
      </div>
    `;
    }

    _getFilteredCategories() {
        if (!this._inputValue || this._inputValue === this.value) return this.categories;
        const query = this._inputValue.toLowerCase();
        return this.categories.filter(c => c.toLowerCase().includes(query));
    }

    _handleInput(e) {
        this._inputValue = e.target.value;
        this._showDropdown = true;
        this._focusedIndex = -1;
    }

    _handleFocus() {
        this._showDropdown = true;
    }

    _handleBlur() {
        setTimeout(() => {
            this._showDropdown = false;
            this._inputValue = this.value; // Reset to actually selected value
        }, 150);
    }

    _handleKeyDown(e) {
        const filtered = this._getFilteredCategories();
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this._focusedIndex = Math.min(this._focusedIndex + 1, filtered.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this._focusedIndex = Math.max(this._focusedIndex - 1, -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this._focusedIndex >= 0 && filtered[this._focusedIndex]) {
                this._select(filtered[this._focusedIndex]);
            } else if (this._inputValue.trim()) {
                this._select(this._inputValue.trim());
            }
        } else if (e.key === 'Escape') {
            this._showDropdown = false;
            this.renderRoot.querySelector('input').blur();
        }
    }

    _select(cat) {
        this.value = cat;
        this._inputValue = cat;
        this._showDropdown = false;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: cat } }));
    }
}

customElements.define('wy-category-select', WyCategorySelect);
