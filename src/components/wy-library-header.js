import { LitElement, html, css } from 'lit';

export class WyLibraryHeader extends LitElement {
  static properties = {
    showFilters: { type: Boolean, attribute: 'show-filters' },
    activeFilterCount: { type: Number, attribute: 'active-filter-count' },
    searchQuery: { type: String, attribute: 'search-query' },
    isScrolled: { type: Boolean, attribute: 'is-scrolled' },
    scrollingUp: { type: Boolean, attribute: 'scrolling-up' },
    searchSize: { type: String, attribute: 'search-size' },
    showSearch: { type: Boolean, attribute: 'show-search' }
  };

  constructor() {
    super();
    this.showFilters = false;
    this.activeFilterCount = 0;
    this.searchQuery = '';
    this.isScrolled = false;
    this.scrollingUp = false;
    this.searchSize = 'large';
    this.showSearch = false;
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
      min-height: 100px;
      transition: min-height 0.3s ease-in-out;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 var(--spacing-xl);
      transition: max-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
    }

    .container.headerScrolledContainer {
      max-width: fit-content;
      width: auto;
    }

    .header {
      padding: var(--spacing-lg) 0 var(--spacing-xl) 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--spacing-lg);
      background-color: transparent;
      min-height: 100px;
      will-change: padding, gap;
      transition: padding 0.3s ease-in-out,
        gap 0.3s ease-in-out,
        justify-content 0.3s ease-in-out,
        min-height 0.3s ease-in-out;
    }

    .headerScrolled {
      padding: 1rem 0;
      justify-content: flex-start;
      min-height: 80px;
    }

    .header h1 {
      margin: 0;
      font-family: var(--font-serif);
      font-weight: 500;
      font-size: 2rem;
      line-height: 1.1;
      letter-spacing: 0.02em;
      color: var(--md-sys-color-on-surface);
      transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        visibility var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        max-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        margin var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
        padding var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
    }

    .header h1.h1Hidden {
      opacity: 0;
      visibility: hidden;
      max-width: 0;
      overflow: hidden;
      transform: scale(0.95);
      margin: 0;
      padding: 0;
    }

    /* LEFT SECTION */
    .leftSection {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex: 1;
      flex-wrap: wrap;
      min-width: 0;
      padding: 0;
      background-color: transparent;
      backdrop-filter: none;
      border-radius: var(--md-sys-shape-corner-full);
      will-change: padding, background-color, backdrop-filter;
      transition: flex-basis 0.3s ease-in-out,
        padding 0.3s ease-in-out,
        background-color 0.3s ease-in-out,
        backdrop-filter 0.3s ease-in-out,
        flex 0.3s ease-in-out;
    }

    .leftSectionScrolled {
      padding: 0.7rem 1.5rem;
      background-color: var(--wy-library-header-scrolled-bg);
      backdrop-filter: blur(var(--wy-library-header-scrolled-blur));
      -webkit-backdrop-filter: blur(var(--wy-library-header-scrolled-blur));
      margin-left: auto;
      margin-right: auto;
      max-width: 700px;
      flex: 0 1 auto;
    }

    /* FILTER BUTTON WRAPPER */
    .filterButtonWrapper {
      position: relative;
      display: inline-block;
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
      z-index: 10;
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
      transform-origin: left center;
      overflow: hidden;
      opacity: 1; /* Explicit starting value required for CSS transitions to work */
      transform: scaleX(1); /* Explicit starting value for transform transition */
      transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        max-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        min-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        margin var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
    }

    .searchContainer:not(.searchContainerHidden) {
      overflow: visible;
    }

    .searchContainerHidden {
      opacity: 0;
      max-width: 0;
      min-width: 0;
      transform: scaleX(0.8);
      margin: 0;
      overflow: hidden;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        max-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        min-width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
        margin var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
    }

    .searchContainer:not(.searchContainerHidden) {
      animation: searchExpand 0.3s ease-in-out;
      overflow: visible;
    }

    @keyframes searchExpand {
      from {
        opacity: 0;
        transform: scaleX(0.8);
      }
      to {
        opacity: 1;
        transform: scaleX(1);
      }
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

    .searchInputWrapper {
      position: relative;
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      max-width: 100%;
      overflow: hidden;
    }

    .searchInput {
      position: relative;
      width: 100%;
      height: 56px;
      padding: 0 2.75rem 0 2.5rem;
      border-radius: var(--md-sys-shape-corner-full);
      border: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-background);
      color: var(--md-sys-color-on-surface);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      line-height: 1.5;
      box-shadow: 0 1px 2px rgba(26, 22, 20, 0.02);
      transition: border-color var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard),
        box-shadow var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard),
        transform 0.3s ease-in-out;
      box-sizing: border-box;
    }

    /* Medium search size (44px height) */
    .searchInput.size-medium {
      height: 44px;
      padding: 0 2.25rem 0 2rem;
    }

    .searchContainer.size-medium .searchClear {
      right: 0.75rem;
      width: 24px;
      height: 24px;
    }

    .searchContainer.size-medium .searchIcon {
      font-size: 1rem;
    }

    .searchContainer.size-medium .searchClear .material-symbols-outlined {
      font-size: 18px;
    }

    .searchInput::placeholder {
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.6;
    }

    /* Focus styles - IMPORTANT: Using !important temporarily to debug specificity issues */
    .searchInput:focus,
    .searchInput:focus-visible,
    .searchInput:focus-within,
    .searchInput.focused,
    input.searchInput:focus,
    input[type="search"].searchInput:focus {
      outline: 3px solid #2C4C3B !important;
      outline-offset: 2px !important;
      border-color: #2C4C3B !important;
      box-shadow: 0 0 0 3px rgba(44, 76, 59, 0.12) !important;
      transform: scale(1.02) !important;
    }

    .searchInputWrapper:has(.searchInput.focused) .searchIcon,
    .searchInputWrapper:has(.searchInput:focus) .searchIcon,
    .searchInputWrapper:has(.searchInput:focus-visible) .searchIcon {
      color: var(--md-sys-color-primary, #2C4C3B);
    }

    .searchClear {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      overflow: hidden;
      pointer-events: auto;
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
      z-index: -1;
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


    /* RIGHT SECTION */
    .rightSection {
      display: flex;
      padding-top: 4px;
      padding-bottom: 4px;
      align-items: center;
      gap: var(--spacing-sm);
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
        gap: var(--spacing-sm);
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
      <div class="container ${this.isScrolled ? 'headerScrolledContainer' : ''}">
        <header class="header ${this.isScrolled ? 'headerScrolled' : ''}">
          <div class="leftSection ${this.isScrolled ? 'leftSectionScrolled' : ''}">
            <h1 class="${this.showSearch ? 'h1Hidden' : ''}">Artworks</h1>
          
          <div class="filterButtonWrapper">
            <wy-icon-button
              variant="${this.showFilters || this.activeFilterCount > 0 ? 'filled' : 'outlined'}"
              size="small"
              icon="tune"
              label="${this.showFilters ? 'Hide' : 'Show'} filters${this.activeFilterCount > 0 ? ` (${this.activeFilterCount} active)` : ''}"
              @click="${this._handleFilterToggle}">
            </wy-icon-button>
            ${this.activeFilterCount > 0 ? html`
              <span class="filterBadge">${this.activeFilterCount}</span>
            ` : ''}
          </div>

          <wy-icon-button
            variant="outlined"
            size="small"
            icon="${this.showSearch ? 'close' : 'search'}"
            label="${this.showSearch ? 'Hide search' : 'Show search'}"
            @click="${this._handleSearchToggle}">
          </wy-icon-button>

          <div class="searchContainer ${this.searchSize === 'medium' ? 'size-medium' : ''} ${!this.showSearch ? 'searchContainerHidden' : ''}">
            <div class="searchInputWrapper">
              <span class="material-symbols-outlined searchIcon">search</span>
              <input
                type="search"
                class="searchInput ${this.searchSize === 'medium' ? 'size-medium' : ''}"
                placeholder="Search works..."
                .value="${this.searchQuery}"
                @input="${this._handleSearchInput}"
                @focus="${this._handleSearchFocus}"
                @blur="${this._handleSearchBlur}"
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
          </div>

          <wy-icon-button
            variant="filled"
            size="small"
            icon="add"
            @click="${this._handleAddWork}">
          </wy-icon-button>
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

  _handleSearchFocus(e) {
    const input = e.target;
    if (input) {
      input.classList?.add('focused');
    }
  }

  _handleSearchBlur(e) {
    const input = e.target;
    if (input) {
      input.classList?.remove('focused');
    }
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

  _handleSearchToggle() {
    if (this.showSearch) {
      // Closing: use double rAF to ensure browser paints before class change
      // This allows CSS transition to run properly (LitElement applies class
      // synchronously, which would skip the transition without this delay)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.showSearch = false;
          this.dispatchEvent(new CustomEvent('toggle-search', {
            detail: { showing: this.showSearch },
            bubbles: true,
            composed: true
          }));
        });
      });
    } else {
      // Opening: immediate is fine
      this.showSearch = true;
      this.dispatchEvent(new CustomEvent('toggle-search', {
        detail: { showing: this.showSearch },
        bubbles: true,
        composed: true
      }));
    }
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
