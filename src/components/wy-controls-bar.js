import { LitElement, html, css } from 'lit';

export class WyControlsBar extends LitElement {
    static properties = {
        viewMode: { type: String, attribute: 'view-mode' },
        showDetails: { type: Boolean, attribute: 'show-details' },
        activeCategory: { type: String, attribute: 'active-category' },
        categories: { type: Array },
        searchValue: { type: String, attribute: 'search-value' }
    };

    constructor() {
        super();
        this.viewMode = 'grid';
        this.showDetails = false;
        this.activeCategory = 'all';
        this.categories = ['Productivity', 'Expertise', 'Travel & Shopping'];
        this.searchValue = '';
    }

    static styles = css`
    :host {
      display: block;
      background-color: var(--md-sys-color-surface);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 12px 16px;
      min-height: 64px;
      box-sizing: border-box;
    }

    .controls-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .search-section {
      flex: 1;
      min-width: 280px;
      position: relative;
    }

    .search-input {
      width: 100%;
      height: 40px;
      background-color: var(--md-sys-color-surface-container-low);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 20px;
      padding: 0 40px 0 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface);
      box-sizing: border-box;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: var(--md-sys-color-on-surface-variant);
    }

    .toggle-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .category-section {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .category-section::-webkit-scrollbar {
      display: none;
    }

    .view-toggle {
      background-color: var(--md-sys-color-surface-container-low);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 20px;
      display: flex;
      padding: 2px;
    }

    .view-btn {
      border: none;
      background: none;
      height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      transition: all 0.2s;
    }

    .view-btn.active {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .details-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      user-select: none;
    }
  `;

    render() {
        return html`
      <div class="controls-container">
        <div class="search-section">
          <input 
            type="search" 
            class="search-input" 
            placeholder="Search prompts..." 
            .value="${this.searchValue}"
            @input="${this._handleSearch}"
          >
          <md-icon class="search-icon">search</md-icon>
        </div>

        <div class="toggle-section">
          <div class="view-toggle">
            <button 
              class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" 
              @click="${() => this._setViewMode('grid')}"
            >
              <md-icon style="font-size: 18px;">grid_view</md-icon>
              Grid
            </button>
            <button 
              class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" 
              @click="${() => this._setViewMode('list')}"
            >
              <md-icon style="font-size: 18px;">view_list</md-icon>
              List
            </button>
          </div>

          <label class="details-toggle">
            <span>Show Details</span>
            <md-switch 
              ?selected="${this.showDetails}"
              @change="${this._toggleDetails}"
            ></md-switch>
          </label>
        </div>

        <div class="category-section">
          <wy-filter-chip 
            label="All" 
            ?active="${this.activeCategory === 'all'}"
            @click="${() => this._setCategory('all')}"
          ></wy-filter-chip>
          ${this.categories.map(cat => html`
            <wy-filter-chip 
              label="${cat}" 
              ?active="${this.activeCategory === cat}"
              @click="${() => this._setCategory(cat)}"
            ></wy-filter-chip>
          `)}
        </div>
      </div>
    `;
    }

    _handleSearch(e) {
        this.searchValue = e.target.value;
        this._notifyChange();
    }

    _setViewMode(mode) {
        this.viewMode = mode;
        this._notifyChange();
    }

    _toggleDetails(e) {
        this.showDetails = e.target.selected;
        this._notifyChange();
    }

    _setCategory(cat) {
        this.activeCategory = cat;
        this._notifyChange();
    }

    _notifyChange() {
        this.dispatchEvent(new CustomEvent('filter-change', {
            detail: {
                search: this.searchValue,
                viewMode: this.viewMode,
                showDetails: this.showDetails,
                category: this.activeCategory
            },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wy-controls-bar', WyControlsBar);
