import { LitElement, html, css } from 'lit';

export class WyLibraryHeader extends LitElement {
  static properties = {
    showFilters: { type: Boolean, attribute: 'show-filters' },
    activeFilterCount: { type: Number, attribute: 'active-filter-count' },
    searchQuery: { type: String, attribute: 'search-query' },
    isScrolled: { type: Boolean, attribute: 'is-scrolled' },
    scrollingUp: { type: Boolean, attribute: 'scrolling-up' }
  };

  constructor() {
    super();
    this.showFilters = false;
    this.activeFilterCount = 0;
    this.searchQuery = '';
    this.isScrolled = false;
    this.scrollingUp = false;
    this._searchTimeout = null;
  }

  static styles = css`
    /* Note: Fonts loaded in light DOM (globals.css) and cascade into Shadow DOM */
    
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: transparent;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 var(--spacing-xl);
    }

    .header {
      padding: var(--spacing-lg) 0 var(--spacing-xl) 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--spacing-lg);
      background-color: transparent;
      transition: padding var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        gap var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
    }

    .headerScrolled {
      padding: 1rem 0;
    }

    .header h1 {
      margin: 0;
      font-family: var(--font-serif);
      font-weight: 500;
      font-size: 2rem;
      line-height: 1.1;
      letter-spacing: 0.02em;
      color: var(--md-sys-color-on-surface);
    }

    /* LEFT SECTION */
    .leftSection {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
      flex-wrap: wrap;
      min-width: 0;
      padding: 0;
      background-color: transparent;
      backdrop-filter: none;
      border-radius: var(--md-sys-shape-corner-full);
      transition: flex-basis var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        padding var(--md-sys-motion-duration-short3) ease,
        background-color var(--md-sys-motion-duration-short3) ease,
        backdrop-filter var(--md-sys-motion-duration-short3) ease;
    }

    .leftSectionScrolled {
      padding: 0.7rem 1.5rem;
      background-color: var(--wy-library-header-scrolled-bg);
      backdrop-filter: blur(var(--wy-library-header-scrolled-blur));
      margin-left: auto;
      margin-right: auto;
      max-width: 700px;
    }

    /* FILTER BUTTON */
    .filtersButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      padding: 0;
      border-radius: 50%;
      border: 1px solid transparent;
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      transition: background-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        border-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
    }

    .filtersButton::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-on-surface);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
      border-radius: 50%;
    }

    .filtersButton:hover:not(.filtersButtonActive) {
      border-color: var(--md-sys-color-outline-variant);
    }

    .filtersButton:hover:not(.filtersButtonActive)::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .filtersButton:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    .filtersButtonActive {
      background: var(--md-sys-color-on-surface);
      color: var(--md-sys-color-background);
      border-color: var(--md-sys-color-on-surface);
    }

    .filtersButtonActive::before {
      background-color: var(--md-sys-color-background);
    }

    .filtersButtonActive:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .filtersButton .material-symbols-outlined {
      font-size: 24px;
      line-height: 1;
      color: inherit;
    }

    .filterBadge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--md-sys-color-primary);
      color: white;
      border-radius: var(--md-sys-shape-corner-full);
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
      border: 2px solid var(--md-sys-color-background);
      pointer-events: none;
      font-family: var(--font-sans);
    }

    .leftSectionScrolled .filterBadge {
      border-color: var(--wy-library-header-scrolled-bg);
    }

    /* SEARCH CONTAINER */
    .searchContainer {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      max-width: 672px;
      min-width: 200px;
      margin-right: auto;
    }

    .searchIcon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.25rem;
      color: var(--md-sys-color-on-surface-variant);
      pointer-events: none;
      transition: color var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      z-index: 1;
    }

    .searchInput {
      width: 100%;
      height: 56px;
      padding: 0 2.5rem;
      border-radius: var(--md-sys-shape-corner-full);
      border: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-background);
      color: var(--md-sys-color-on-surface);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      line-height: 1.5;
      box-shadow: 0 1px 2px rgba(26, 22, 20, 0.02);
      transition: border-color var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard),
        box-shadow var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
    }

    .searchInput::placeholder {
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.6;
    }

    .searchInput:focus {
      outline: none;
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent);
    }

    .searchInput:focus ~ .searchIcon {
      color: var(--md-sys-color-primary);
    }

    .searchClear {
      position: absolute;
      right: 0.5rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      position: relative;
      overflow: hidden;
    }

    .searchClear::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-on-surface);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
      border-radius: 50%;
    }

    .searchClear:hover {
      color: var(--md-sys-color-on-surface);
    }

    .searchClear:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .searchClear:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    .searchClear .material-symbols-outlined {
      font-size: 20px;
    }

    /* ADD WORK BUTTON */
    .addWorkButton {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 56px;
      padding: 0 var(--spacing-xl);
      border-radius: var(--md-sys-shape-corner-full);
      border: none;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      transition: transform var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
    }

    .addWorkButton::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-on-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }

    .addWorkButton:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .addWorkButton:active {
      transform: scale(0.98);
    }

    .addWorkButton:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    .addWorkButton .material-symbols-outlined {
      font-size: 20px;
    }

    /* RIGHT SECTION */
    .rightSection {
      display: flex;
      padding-top: 4px;
      padding-bottom: 4px;
      align-items: center;
      gap: var(--spacing-lg);
      flex-wrap: nowrap;
      flex-shrink: 0;
      position: relative;
      opacity: 1;
      transform: translateX(0);
      max-width: 100%;
      transition: opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized),
        transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        max-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
    }

    .rightSectionHidden {
      opacity: 0;
      transform: translateX(2rem);
      pointer-events: none;
      max-width: 0;
      overflow: hidden;
    }

    .rightSectionReturning {
      transition: opacity 0.5s var(--md-sys-motion-easing-emphasized-decelerate),
        transform 0.5s var(--md-sys-motion-easing-emphasized-decelerate),
        max-width 0.5s var(--md-sys-motion-easing-emphasized-decelerate);
    }

    /* MATERIAL SYMBOLS OUTLINED */
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
    }

    /* RESPONSIVE */
    @media (max-width: 767px) {
      .header {
        align-items: flex-start;
      }

      .headerScrolled {
        padding: 0.75rem 0;
      }

      .leftSection {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
        flex: 1;
        min-width: 0;
      }

      .leftSectionScrolled {
        padding: 1rem;
      }

      .searchContainer {
        order: 3;
        width: 100%;
        max-width: 100%;
        margin-top: var(--spacing-xs);
      }

      .rightSection {
        position: absolute;
        top: var(--spacing-2xl);
        right: 0;
      }

      .rightSectionHidden {
        opacity: 0;
        transform: translateY(-1rem);
        max-width: 0;
        overflow: hidden;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <header class="header ${this.isScrolled ? 'headerScrolled' : ''}">
          <div class="leftSection ${this.isScrolled ? 'leftSectionScrolled' : ''}">
            <h1>Artworks</h1>
          
          <button
            type="button"
            class="filtersButton ${this.showFilters || this.activeFilterCount > 0 ? 'filtersButtonActive' : ''}"
            @click="${this._handleFilterToggle}"
            aria-label="${this.showFilters ? 'Hide' : 'Show'} filters${this.activeFilterCount > 0 ? ` (${this.activeFilterCount} active)` : ''}"
            title="${this.showFilters ? 'Hide' : 'Show'} filters${this.activeFilterCount > 0 ? ` (${this.activeFilterCount} active)` : ''}">
            <span class="material-symbols-outlined">tune</span>
            ${this.activeFilterCount > 0 ? html`
              <span class="filterBadge">${this.activeFilterCount}</span>
            ` : ''}
          </button>

          <div class="searchContainer">
            <span class="material-symbols-outlined searchIcon">search</span>
            <input
              type="search"
              class="searchInput"
              placeholder="Search works..."
              .value="${this.searchQuery}"
              @input="${this._handleSearchInput}"
              aria-label="Search works by title, description, or source"
            />
            ${this.searchQuery ? html`
              <button
                type="button"
                class="searchClear"
                @click="${this._handleSearchClear}"
                aria-label="Clear search">
                <span class="material-symbols-outlined">close</span>
              </button>
            ` : ''}
          </div>

          <button
            type="button"
            class="addWorkButton"
            @click="${this._handleAddWork}">
            <span class="material-symbols-outlined">add</span>
            <span>Add work</span>
          </button>
          </div>

          <div class="rightSection 
          ${this.isScrolled ? 'rightSectionHidden' : ''}
          ${this.scrollingUp && !this.isScrolled ? 'rightSectionReturning' : ''}">
            <slot name="view-controls"></slot>
            <slot name="backup-status"></slot>
          </div>
        </header>
      </div>
    `;
  }

  _handleFilterToggle() {
    this.showFilters = !this.showFilters;
    this.dispatchEvent(new CustomEvent('toggle-filters', {
      detail: { showing: this.showFilters },
      bubbles: true,
      composed: true
    }));
  }

  _handleSearchInput(e) {
    this.searchQuery = e.target.value;
    
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
    
    this._searchTimeout = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('search-change', {
        detail: { value: this.searchQuery },
        bubbles: true,
        composed: true
      }));
    }, 300);
  }

  _handleSearchClear() {
    this.searchQuery = '';
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
    
    this.dispatchEvent(new CustomEvent('search-change', {
      detail: { value: '' },
      bubbles: true,
      composed: true
    }));
  }

  _handleAddWork() {
    this.dispatchEvent(new CustomEvent('add-work', {
      detail: {},
      bubbles: true,
      composed: true
    }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
  }
}

customElements.define('wy-library-header', WyLibraryHeader);
