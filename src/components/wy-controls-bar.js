import { LitElement, html, css } from 'lit';

export class WyControlsBar extends LitElement {
    static properties = {
        viewMode: { type: String, attribute: 'view-mode' },
        showDetails: { type: Boolean, attribute: 'show-details' },
        activeCategory: { type: String, attribute: 'active-category' },
        categories: { type: Array },
        searchValue: { type: String, attribute: 'search-value' },
        hideViewToggle: { type: Boolean, attribute: 'hide-view-toggle' },
        hideDetailsToggle: { type: Boolean, attribute: 'hide-details-toggle' },
        showFeaturedOnly: { type: Boolean, attribute: 'show-featured-only' },
        isScrolled: { type: Boolean, state: true }
    };

    constructor() {
        super();
        this.viewMode = 'grid';
        this.showDetails = false;
        this.activeCategory = 'all';
        this.categories = ['Productivity', 'Expertise', 'Travel & Shopping'];
        this.searchValue = '';
        this.hideViewToggle = false;
        this.hideDetailsToggle = false;
        this.showFeaturedOnly = false;
        this.isScrolled = false;
        this._scrollThreshold = 50; // px
    }

    connectedCallback() {
        super.connectedCallback();
        this._handleScroll = this._handleScroll.bind(this);
        
        // Delay finding scroll container to ensure DOM is fully ready
        // Use setTimeout instead of requestAnimationFrame for better timing
        setTimeout(() => {
            this._setupScrollListener();
        }, 100);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._removeScrollListener();
    }

    _setupScrollListener() {
        // Remove any existing listener first
        this._removeScrollListener();
        
        // Find the scrollable container
        this._scrollContainer = this._findScrollableContainer();
        
        if (this._scrollContainer === window) {
            window.addEventListener('scroll', this._handleScroll, { passive: true });
        } else if (this._scrollContainer) {
            this._scrollContainer.addEventListener('scroll', this._handleScroll, { passive: true });
        }
        
        // Check initial scroll position
        this._handleScroll();
    }

    _removeScrollListener() {
        if (this._scrollContainer === window) {
            window.removeEventListener('scroll', this._handleScroll);
        } else if (this._scrollContainer) {
            this._scrollContainer.removeEventListener('scroll', this._handleScroll);
        }
    }

    _findScrollableContainer() {
        // Strategy 1: Check for .prompt-area anywhere in document (common in prompt-library)
        const promptArea = document.querySelector('.prompt-area');
        if (promptArea) {
            const style = window.getComputedStyle(promptArea);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                return promptArea;
            }
        }
        
        // Strategy 2: Check for .main-content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const style = window.getComputedStyle(mainContent);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                return mainContent;
            }
        }
        
        // Strategy 3: Check siblings via parent
        const siblings = this.parentElement?.querySelectorAll('[class*="scroll"], [class*="area"]');
        if (siblings) {
            for (const sibling of siblings) {
                const style = window.getComputedStyle(sibling);
                if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                    return sibling;
                }
            }
        }
        
        // Strategy 4: Traverse up the DOM to find nearest scrollable ancestor
        let element = this.parentElement;
        while (element && element !== document.body) {
            const style = window.getComputedStyle(element);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                return element;
            }
            element = element.parentElement;
        }
        
        // Strategy 5: Check document.body
        const bodyStyle = window.getComputedStyle(document.body);
        if (bodyStyle.overflowY === 'auto' || bodyStyle.overflowY === 'scroll') {
            return document.body;
        }
        
        // Fallback to window
        return window;
    }

    _handleScroll() {
        let scrollY;
        
        if (this._scrollContainer === window) {
            scrollY = window.scrollY || document.documentElement.scrollTop;
        } else {
            scrollY = this._scrollContainer ? this._scrollContainer.scrollTop : 0;
        }
        
        const wasScrolled = this.isScrolled;
        this.isScrolled = scrollY > this._scrollThreshold;
        
        if (wasScrolled !== this.isScrolled) {
            this.requestUpdate();
        }
    }

    static styles = css`
    /* Required fonts - load in page <head>:
       <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
    */

    :host {
      display: block;
      background-color: var(--wy-controls-bar-bg, transparent);
      border-bottom: var(--wy-controls-bar-border, none);
      padding: var(--wy-controls-bar-padding, 8px 32px);
      box-sizing: border-box;
    }

    /* Sticky Pill State - when scrolled */
    :host([data-scrolled]) {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      width: auto;
      max-width: 900px;
      background-color: rgba(245, 242, 234, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--md-sys-color-outline-variant, #D7D3C8);
      border-radius: 9999px;
      padding: 8px 24px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
      transition: 
        padding var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
        background-color var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
        opacity var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-variation-settings:
        'FILL' var(--wy-controls-icon-fill, 0),
        'wght' var(--wy-controls-icon-weight, 300),
        'GRAD' var(--wy-controls-icon-grad, 0),
        'opsz' var(--wy-controls-icon-opsz, 24);
      font-size: var(--wy-controls-icon-size, 24px);
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    .controls-container {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 12px;
      max-width: 1600px;
      margin: 0 auto;
    }

    :host([data-scrolled]) .controls-container {
      gap: 16px;
      max-width: 100%;
      transition: gap var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1));
    }

    /* Search Section */
    .search-section {
      flex: 0 0 auto;
      width: 192px;
      position: relative;
    }

    :host([data-scrolled]) .search-section {
      width: 280px;
      transition: width var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1));
    }

    .search-input {
      width: 100%;
      height: 32px;
      background-color: var(--wy-controls-search-bg, var(--md-sys-color-surface-container-high, #f3f4f6));
      border: 1px solid var(--md-sys-color-outline-variant, transparent);
      border-radius: 9999px;
      padding: 0 12px 0 36px;
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface, #1f2937);
      box-sizing: border-box;
      transition: all 0.2s;
    }

    :host([data-scrolled]) .search-input {
      height: 28px;
      font-size: 0.7rem;
      background-color: rgba(255, 255, 255, 0.6);
      transition: 
        height var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
        font-size var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)),
        background-color var(--md-sys-motion-duration-short2, 200ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
    }

    .search-input::placeholder {
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
      opacity: 0.7;
    }

    .search-input:focus {
      outline: none;
      background-color: var(--md-sys-color-surface, #fff);
      border-color: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 20%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 20%, transparent);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
      opacity: 0.7;
      pointer-events: none;
    }

    .search-input:focus + .search-icon {
      color: var(--md-sys-color-primary, #2C4C3B);
    }

    /* Divider */
    .divider {
      width: 1px;
      height: 24px;
      background-color: var(--md-sys-color-outline-variant, #e5e7eb);
      flex-shrink: 0;
    }

    /* Toggle Section */
    .toggle-section {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }

    :host([data-scrolled]) .toggle-section {
      display: none;
    }

    /* View Toggle */
    .view-toggle {
      background-color: var(--wy-controls-toggle-bg, var(--md-sys-color-surface-container-high, #f3f4f6));
      border: 1px solid var(--md-sys-color-outline-variant, transparent);
      border-radius: 8px;
      display: flex;
      padding: 2px;
    }

    .view-btn {
      border: none;
      background: transparent;
      height: 28px;
      width: 28px;
      padding: 0;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
      opacity: 0.7;
      transition: all 0.15s;
    }

    .view-btn:hover:not(.active) {
      color: var(--md-sys-color-on-surface, #1f2937);
      opacity: 1;
    }

    .view-btn.active {
      background-color: var(--md-sys-color-surface, #fff);
      color: var(--md-sys-color-primary, #2C4C3B);
      opacity: 1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px var(--md-sys-color-outline-variant, #e5e7eb);
    }

    .view-btn .material-symbols-outlined,
    .view-btn md-icon {
      font-size: 16px;
      --md-icon-size: 16px;
    }

    /* Details Toggle */
    .details-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-switch {
      position: relative;
      width: 32px;
      height: 16px;
      background-color: var(--wy-controls-switch-off, #e5e7eb);
      border-radius: 9999px;
      transition: background-color 0.2s;
    }

    .toggle-switch.on {
      background-color: var(--md-sys-color-primary, #2C4C3B);
    }

    .toggle-switch::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }

    .toggle-switch.on::after {
      transform: translateX(16px);
    }

    .toggle-label {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--md-sys-color-on-surface-variant, #64748b);
    }

    /* Category Section */
    .category-section {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      flex: 1;
      padding: 2px 0;
      -ms-overflow-style: none;
      scrollbar-width: none;
      mask-image: linear-gradient(to right, black 90%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
    }

    .category-section::-webkit-scrollbar {
      display: none;
    }

    :host([data-scrolled]) .category-section {
      flex: 0 1 auto;
      max-width: 600px;
      transition: max-width var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1));
    }

    @media (max-width: 768px) {
      /* Disable sticky pill behavior on mobile */
      :host([data-scrolled]) {
        position: relative;
        top: auto;
        left: auto;
        transform: none;
        width: 100%;
        max-width: 100%;
        border-radius: 0;
        padding: var(--wy-controls-bar-padding, 8px 32px);
        background-color: var(--wy-controls-bar-bg, transparent);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none;
      }

      .controls-container {
        flex-wrap: wrap;
        gap: 8px;
      }

      .search-section {
        width: 100%;
        order: -1;
      }

      :host([data-scrolled]) .search-section {
        width: 100%;
      }

      :host([data-scrolled]) .search-input {
        height: 32px;
        font-size: 0.75rem;
        background-color: var(--wy-controls-search-bg, var(--md-sys-color-surface-container-high, #f3f4f6));
      }

      .divider {
        display: none;
      }

      :host([data-scrolled]) .divider {
        display: none;
      }

      .toggle-section {
        gap: 12px;
      }

      :host([data-scrolled]) .toggle-section {
        display: flex;
      }

      .category-section {
        width: 100%;
        order: 1;
      }

      :host([data-scrolled]) .category-section {
        width: 100%;
        max-width: 100%;
      }
    }
  `;

    render() {
        // Set attribute on host for CSS targeting
        if (this.isScrolled) {
            this.setAttribute('data-scrolled', '');
        } else {
            this.removeAttribute('data-scrolled');
        }

        return html`
      <div class="controls-container" part="controls-container">
        <div class="search-section">
          <input
            type="search"
            class="search-input"
            placeholder="Search prompts..."
            .value="${this.searchValue}"
            @input="${this._handleSearch}"
          >
          <span class="material-symbols-outlined search-icon">search</span>
        </div>

        ${!this.isScrolled && (!this.hideViewToggle || !this.hideDetailsToggle) ? html`
          <div class="divider"></div>

          <div class="toggle-section">
            ${!this.hideViewToggle ? html`
              <div class="view-toggle">
                <button
                  class="view-btn ${this.viewMode === 'list' ? 'active' : ''}"
                  @click="${() => this._setViewMode('list')}"
                  aria-label="List view"
                >
                  <span class="material-symbols-outlined">format_list_bulleted</span>
                </button>
                <button
                  class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}"
                  @click="${() => this._setViewMode('grid')}"
                  aria-label="Grid view"
                >
                  <span class="material-symbols-outlined">grid_view</span>
                </button>
              </div>
            ` : ''}

            ${!this.hideDetailsToggle ? html`
              <label class="details-toggle" @click="${this._toggleDetails}">
                <div class="toggle-switch ${this.showDetails ? 'on' : ''}"></div>
                <span class="toggle-label">Descriptions</span>
              </label>
            ` : ''}
          </div>

          <div class="divider"></div>
        ` : html`
          ${this.isScrolled ? html`<div class="divider"></div>` : ''}
        `}

        <div class="category-section">
          <wy-filter-chip
            label="Featured"
            ?active="${this.showFeaturedOnly}"
            @click="${this._toggleFeatured}"
          ></wy-filter-chip>
          <wy-filter-chip
            label="All"
            ?active="${this.activeCategory === 'all' && !this.showFeaturedOnly}"
            @click="${() => this._setCategory('all')}"
          ></wy-filter-chip>
          ${this.categories.map(cat => html`
            <wy-filter-chip
              label="${cat}"
              ?active="${this.activeCategory === cat && !this.showFeaturedOnly}"
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

    _toggleDetails() {
        this.showDetails = !this.showDetails;
        this._notifyChange();
    }

    _setCategory(cat) {
        this.activeCategory = cat;
        // When selecting a category, deactivate Featured filter
        if (this.showFeaturedOnly) {
            this.showFeaturedOnly = false;
        }
        this._notifyChange();
    }

    _toggleFeatured() {
        this.showFeaturedOnly = !this.showFeaturedOnly;
        this._notifyChange();
    }

    _notifyChange() {
        this.dispatchEvent(new CustomEvent('filter-change', {
            detail: {
                search: this.searchValue,
                viewMode: this.viewMode,
                showDetails: this.showDetails,
                category: this.activeCategory,
                showFeaturedOnly: this.showFeaturedOnly
            },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wy-controls-bar', WyControlsBar);
