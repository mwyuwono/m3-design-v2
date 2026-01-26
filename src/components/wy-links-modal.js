import { LitElement, html, css } from 'lit';

/**
 * wy-links-modal Component
 * 
 * Modal dialog displaying categorized AI tool links as interactive chips.
 * Supports active/inactive chip states, dark mode, and Material Design 3 patterns.
 * 
 * @example
 * ```html
 * <wy-links-modal 
 *   open 
 *   title="AI Tools"
 *   .links="${linksData}"
 *   @close="${handleClose}"
 *   @link-click="${handleLinkClick}"
 * ></wy-links-modal>
 * ```
 */
export class WyLinksModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    links: { type: Array }
  };

  constructor() {
    super();
    this.open = false;
    this.title = 'AI Tools';
    this.links = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // Load fonts for Shadow DOM
    this._loadFonts();
    // Setup ESC key handler
    this._escKeyHandler = this._handleEscKey.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove ESC key handler
    if (this._escKeyHandler) {
      document.removeEventListener('keydown', this._escKeyHandler);
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // Add/remove ESC key listener and manage focus based on open state
    if (changedProperties.has('open')) {
      if (this.open) {
        document.addEventListener('keydown', this._escKeyHandler);
        // Focus first focusable element when modal opens
        this._focusFirstElement();
      } else {
        document.removeEventListener('keydown', this._escKeyHandler);
      }
    }
  }

  _focusFirstElement() {
    // Focus the close button when modal opens
    requestAnimationFrame(() => {
      const closeButton = this.shadowRoot?.querySelector('.close-button');
      if (closeButton) {
        closeButton.focus();
      }
    });
  }

  _handleEscKey(e) {
    if (e.key === 'Escape' && this.open) {
      this._handleClose();
    }
  }

  _loadFonts() {
    // Check if fonts are already loaded
    const existingLinks = document.querySelectorAll('link[data-wy-links-modal-fonts]');
    if (existingLinks.length >= 2) {
      return; // Fonts already loaded
    }

    // Load Playfair Display
    if (!document.querySelector('link[href*="Playfair+Display"][data-wy-links-modal-fonts]')) {
      const playfairLink = document.createElement('link');
      playfairLink.rel = 'stylesheet';
      playfairLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
      playfairLink.setAttribute('data-wy-links-modal-fonts', 'playfair');
      document.head.appendChild(playfairLink);
    }

    // Load Material Symbols
    if (!document.querySelector('link[href*="Material+Symbols"][data-wy-links-modal-fonts]')) {
      const materialLink = document.createElement('link');
      materialLink.rel = 'stylesheet';
      materialLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
      materialLink.setAttribute('data-wy-links-modal-fonts', 'material');
      document.head.appendChild(materialLink);
    }
  }

  static styles = css`

    :host {
      display: block;
      position: relative;
      min-height: 1px;
    }

    /* Material Symbols font setup */
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

    /* Modal overlay */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 9%, transparent);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
                  visibility var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
    }

    :host([open]) .modal-overlay {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* Ensure component is always detectable for testing */
    :host([open]) {
      display: block;
    }

    /* Modal container */
    .modal-container {
      position: relative;
      background: var(--md-sys-color-surface);
      border-radius: var(--md-sys-shape-corner-medium);
      max-width: 56rem; /* 896px - matches max-w-4xl from mockup */
      width: 95%;
      max-height: 95vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 5%, transparent);
      transform: scale(0.95) translateY(20px);
      opacity: 0;
      transition: transform var(--md-sys-motion-duration-long2) var(--md-sys-motion-easing-spring),
                  opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
    }

    :host([open]) .modal-container {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    @media (prefers-color-scheme: dark) {
      .modal-container {
        border-color: color-mix(in srgb, var(--md-sys-color-on-surface) 10%, transparent);
      }
    }

    /* Modal content */
    .modal-content {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }

    /* Close button */
    .close-button {
      position: absolute;
      top: var(--spacing-xl);
      right: var(--spacing-xl);
      background: none;
      border: none;
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--wy-links-modal-text-muted);
      border-radius: var(--md-sys-shape-corner-full);
      position: relative;
      overflow: hidden;
      transition: color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
    }

    .close-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }

    .close-button:hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .close-button:hover {
      color: var(--md-sys-color-primary);
    }

    @media (prefers-color-scheme: dark) {
      .close-button:hover {
        color: var(--md-sys-color-on-surface);
      }
    }

    .close-button:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    .close-button .material-symbols-outlined {
      font-size: 2rem;
      position: relative;
      z-index: 1;
    }

    /* Title */
    .modal-title {
      font-family: var(--font-serif);
      font-size: 2.25rem; /* 36px - matches text-4xl from mockup */
      font-weight: 500; /* medium - matches mockup */
      line-height: 1.2;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 var(--spacing-2xl) 0;
    }

    /* Sections container */
    .sections-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem; /* 40px - matches space-y-10 from mockup */
    }

    /* Section */
    .section {
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacing-sm) * 2.5); /* 20px - matches mb-5 from mockup (2.5 * 8px) */
    }

    /* Section header */
    .section-header {
      font-family: var(--font-serif);
      font-size: 1.25rem; /* 20px - matches text-xl from mockup */
      font-weight: 500; /* medium - matches mockup */
      line-height: 1.2;
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    /* Chips container */
    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: calc(var(--spacing-sm) * 1.5); /* 12px - matches gap-3 from mockup (1.5 * 8px) */
    }

    /* Link chip */
    .link-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: calc(var(--spacing-sm) * 1.25) var(--spacing-lg); /* 10px vertical (1.25 * 8px), 24px horizontal - matches py-2.5 px-6 from mockup */
      border-radius: var(--md-sys-shape-corner-full);
      font-family: var(--font-sans);
      font-size: 0.875rem; /* 14px - matches text-sm from mockup */
      font-weight: 500; /* medium - matches mockup */
      text-decoration: none;
      cursor: pointer;
      border: 1px solid var(--wy-links-modal-chip-border);
      background-color: var(--md-sys-color-surface-container-lowest);
      color: var(--md-sys-color-on-surface);
      transition: border-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
                  color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
                  transform var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
      position: relative;
      overflow: hidden;
    }

    /* Active chip */
    .link-chip.active {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      border-color: var(--md-sys-color-primary);
    }

    /* Inactive chip hover state layer */
    .link-chip:not(.active)::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--md-sys-color-primary);
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard);
      pointer-events: none;
    }

    .link-chip:not(.active):hover::before {
      opacity: var(--md-sys-state-hover-opacity);
    }

    .link-chip:not(.active):hover {
      border-color: var(--md-sys-color-primary);
    }

    @media (prefers-color-scheme: dark) {
      .link-chip:not(.active):hover {
        border-color: var(--md-sys-color-outline);
      }
    }

    /* Active chip pressed state */
    .link-chip.active:active {
      transform: scale(0.95);
    }

    /* Focus state */
    .link-chip:focus-visible {
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .link-chip {
        background-color: var(--md-sys-color-surface-container);
        border-color: var(--md-sys-color-outline-variant);
        color: var(--md-sys-color-on-surface-variant);
      }
    }
  `;

  render() {
    return html`
      <div class="modal-overlay" @click="${this._handleOverlayClick}">
        <div class="modal-container" @click="${this._handleContainerClick}">
          <button 
            class="close-button" 
            @click="${this._handleClose}"
            aria-label="Close modal"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <div class="modal-content">
            <h1 class="modal-title">${this.title}</h1>
            
            <div class="sections-container">
              ${this.links.map(category => html`
                <section class="section">
                  <h2 class="section-header">${category.category}</h2>
                  <div class="chips-container">
                    ${category.links.map(link => html`
                      <a 
                        href="${link.url}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="link-chip ${link.active ? 'active' : ''}"
                        @click="${(e) => this._handleLinkClick(e, link)}"
                      >
                        ${link.name}
                      </a>
                    `)}
                  </div>
                </section>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _handleOverlayClick(e) {
    // Close when clicking overlay (but not the container)
    if (e.target === e.currentTarget) {
      this._handleClose();
    }
  }

  _handleContainerClick(e) {
    // Prevent clicks inside container from bubbling to overlay
    e.stopPropagation();
  }

  _handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  _handleLinkClick(e, link) {
    this.dispatchEvent(new CustomEvent('link-click', {
      detail: { link },
      bubbles: true,
      composed: true
    }));
  }

  // Public methods
  show() {
    this.open = true;
  }

  close() {
    this._handleClose();
  }
}

customElements.define('wy-links-modal', WyLinksModal);
