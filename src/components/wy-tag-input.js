import { LitElement, html, css, nothing } from 'lit';
import './wy-tag-chip.js';

export class WyTagInput extends LitElement {
    static properties = {
        tags: { type: Array },
        suggestions: { type: Array },
        placeholder: { type: String },
        disabled: { type: Boolean },
        _inputValue: { type: String, state: true },
        _focusedSuggestionIndex: { type: Number, state: true },
        _showSuggestions: { type: Boolean, state: true }
    };

    constructor() {
        super();
        this.tags = [];
        this.suggestions = [];
        this.placeholder = 'Add tag...';
        this.disabled = false;
        this._inputValue = '';
        this._focusedSuggestionIndex = -1;
        this._showSuggestions = false;
    }

    static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 12px;
      background-color: transparent;
      transition: border-color 0.2s, box-shadow 0.2s;
      min-height: 48px;
      box-sizing: border-box;
      position: relative;
    }

    .container:focus-within {
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.1);
    }

    .container.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    input {
      flex: 1;
      min-width: 120px;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--md-sys-color-on-surface);
      padding: 4px 0;
    }

    .suggestions-dropdown {
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

    .suggestion-item {
      padding: 10px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.1s;
    }

    .suggestion-item:hover,
    .suggestion-item.focused {
      background-color: var(--md-sys-color-surface-variant);
    }

    .suggestion-count {
      opacity: 0.5;
      font-size: 0.75rem;
    }
  `;

    render() {
        const filteredSuggestions = this._getFilteredSuggestions();

        return html`
      <div class="container ${this.disabled ? 'disabled' : ''}" @click="${this._focusInput}">
        ${this.tags.map((tag, index) => html`
          <wy-tag-chip 
            .label="${tag.value}" 
            .variant="${tag.source || 'user-entered'}" 
            removable
            @remove="${() => this._removeTag(index)}">
          </wy-tag-chip>
        `)}
        <input 
          type="text" 
          .value="${this._inputValue}"
          placeholder="${this.tags.length === 0 ? this.placeholder : ''}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeyDown}"
          @blur="${this._handleBlur}"
          @focus="${() => this._showSuggestions = true}"
        >
        ${this._showSuggestions && filteredSuggestions.length > 0 ? html`
          <div class="suggestions-dropdown">
            ${filteredSuggestions.map((s, i) => html`
              <div 
                class="suggestion-item ${i === this._focusedSuggestionIndex ? 'focused' : ''}"
                @mousedown="${(e) => { e.preventDefault(); this._addTag(s.value); }}"
                @mouseenter="${() => this._focusedSuggestionIndex = i}"
              >
                <span>${s.value}</span>
                ${s.count ? html`<span class="suggestion-count">(${s.count})</span>` : nothing}
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
    }

    _getFilteredSuggestions() {
        if (!this._inputValue) return this.suggestions.filter(s => !this.tags.some(t => t.value === s.value));
        const query = this._inputValue.toLowerCase();
        return this.suggestions
            .filter(s => s.value.toLowerCase().includes(query) && !this.tags.some(t => t.value === s.value))
            .slice(0, 8);
    }

    _handleInput(e) {
        this._inputValue = e.target.value;
        this._focusedSuggestionIndex = -1;
        this._showSuggestions = true;
    }

    _handleKeyDown(e) {
        const filtered = this._getFilteredSuggestions();

        if (e.key === 'Enter') {
            e.preventDefault();
            if (this._focusedSuggestionIndex >= 0 && filtered[this._focusedSuggestionIndex]) {
                this._addTag(filtered[this._focusedSuggestionIndex].value);
            } else if (this._inputValue.trim()) {
                this._addTag(this._inputValue.trim());
            }
        } else if (e.key === 'Backspace' && !this._inputValue && this.tags.length > 0) {
            this._removeTag(this.tags.length - 1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this._focusedSuggestionIndex = Math.min(this._focusedSuggestionIndex + 1, filtered.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this._focusedSuggestionIndex = Math.max(this._focusedSuggestionIndex - 1, -1);
        } else if (e.key === 'Escape') {
            this._showSuggestions = false;
        }
    }

    _handleBlur() {
        // Timeout to allow mousedown on suggestions to trigger first
        setTimeout(() => {
            this._showSuggestions = false;
            this._focusedSuggestionIndex = -1;
        }, 150);
    }

    _addTag(value) {
        if (!this.tags.some(t => t.value === value)) {
            this.tags = [...this.tags, { value, source: 'user-entered' }];
            this._inputValue = '';
            this._focusedSuggestionIndex = -1;
            this.dispatchEvent(new CustomEvent('change', { detail: { tags: this.tags } }));
        }
    }

    _removeTag(index) {
        this.tags = this.tags.filter((_, i) => i !== index);
        this.dispatchEvent(new CustomEvent('change', { detail: { tags: this.tags } }));
    }

    _focusInput() {
        this.renderRoot.querySelector('input').focus();
    }
}

customElements.define('wy-tag-input', WyTagInput);
