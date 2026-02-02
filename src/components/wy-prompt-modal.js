import { LitElement, html, css } from 'lit';

export class WyPromptModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    category: { type: String },
    description: { type: String },
    template: { type: String },
    variables: { type: Array },
    variations: { type: Array },
    activeVariationIndex: { type: Number, attribute: 'active-variation-index' },
    mode: { type: String }, // 'locked' or 'edit'
    activeTab: { type: String }, // 'variables' or 'preview'
    steps: { type: Array }, // Array of step objects for multi-step prompts
    activeStepIndex: { type: Number, attribute: 'active-step-index' } // Current step (0-based)
  };

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.category = '';
    this.description = '';
    this.template = '';
    this.variables = [];
    this.variations = [];
    this.activeVariationIndex = 0;
    this.mode = 'locked';
    this.activeTab = 'variables';
    this.steps = [];
    this.activeStepIndex = 0;
    this._values = {};
  }

  static styles = css`
    /* Required fonts - load in page <head>:
       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,899&display=swap" rel="stylesheet">
    */
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    /* Material Symbols base styling */
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

    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 2000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      --wy-color-surface-light: #F5F2EA;
      --wy-color-text-primary: #2C4C3B;
      --wy-color-badge-bg: #E8E4D9;
      --wy-color-focus-ring: rgba(44, 76, 59, 0.12);
    }

    :host([open]) {
      pointer-events: auto;
      opacity: 1;
    }

    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3); /* Darker scrim for focus */
      backdrop-filter: blur(4px);
    }

    .modal-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      background: var(--wy-color-surface-light);
      border-radius: 16px; /* 16px radius as per ref */
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%) scale(0.95);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      overflow: hidden; /* Clip content to border-radius */
      border: 1px solid var(--md-sys-color-outline-variant);
      font-family: var(--font-sans, 'DM Sans', sans-serif);
    }

    :host([open]) .modal-container {
      transform: translate(-50%, -50%) scale(1);
    }

    /* HEADER STYLES */
    .header {
      padding: 32px 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex-shrink: 0; /* Header stays fixed, doesn't shrink */
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        gap: 12px;
    }

    .header-actions-left {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 0 0 auto;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 0 0 auto;
    }

    /* Icon Button - Perfect circle with centered icon */
    .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: background-color 0.2s, transform 0.15s;
    }

    .icon-btn.filled {
        background: var(--md-sys-color-surface-container-high);
        color: var(--md-sys-color-on-surface);
    }

    .icon-btn.filled:hover {
        background: var(--md-sys-color-surface-container-highest);
        transform: scale(1.05);
    }

    .icon-btn.primary {
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
    }

    .icon-btn.primary:hover {
        opacity: 0.9;
        transform: scale(1.05);
    }

    .icon-btn .material-symbols-outlined {
        font-size: 20px;
        line-height: 1;
    }

    .header-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 24px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--wy-color-badge-bg);
      color: var(--wy-color-text-primary);
      border-radius: 999px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em; /* Wider tracking */
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none; /* Prevent badge from blocking clicks */
    }

    @media (prefers-color-scheme: dark) {
        :host {
          --wy-color-surface-light: var(--md-sys-color-surface);
          --wy-color-text-primary: var(--md-sys-color-text-heading, #8DE0B0); /* High-contrast mint for dark mode */
          --wy-color-badge-bg: rgba(255, 255, 255, 0.12);
          --wy-color-focus-ring: rgba(141, 224, 176, 0.2);
        }
        .badge {
          color: var(--md-sys-color-on-surface);
        }
    }

    .title-group h2 {
      font-family: var(--font-display, 'Playfair Display', serif);
      font-size: 2.5rem; /* Larger Title */
      font-weight: 500;
      margin: 0 0 12px 0;
      color: var(--wy-color-text-primary);
      line-height: 1.1;
    }

    .description-text {
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.6;
      color: var(--md-sys-color-text-muted);
      margin: 0;
      max-width: 500px;
    }

    .customize-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        border: none;
        padding: 10px 20px;
        border-radius: 999px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }

    .customize-btn:hover {
        opacity: 0.9;
    }

    /* TABS */
    .tabs-container {
        padding: 0 32px; /* Align with body padding */
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        display: flex;
        align-items: center;
        gap: 32px;
        flex-shrink: 0; /* Tabs stay fixed, don't shrink */
    }

    .tabs-container wy-tabs {
        flex: 1;
    }

    .clear-btn {
        background: none;
        border: none;
        color: var(--md-sys-color-text-heading);
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 8px;
        transition: background 0.2s;
        white-space: nowrap;
    }

    .clear-btn:hover {
        background: var(--md-sys-color-surface-container-high);
    }

    .clear-btn:focus-visible {
        outline: 3px solid var(--wy-color-focus-ring);
        outline-offset: 2px;
    }

    .tab-item {
        background: none;
        border: none;
        padding: 12px 0 16px 0;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-on-surface-variant);
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
        margin: 0;
        border-bottom: 2px solid transparent;
    }

    .tab-item:hover {
        color: var(--wy-color-text-primary);
    }

    .tab-item.active {
        color: var(--wy-color-text-primary);
        font-weight: 700;
        border-bottom-color: var(--wy-color-text-primary);
    }
    
    /* CONTENT */
    .content {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .body {
        padding: 32px;
        flex: 1;
    }

    .variation-selector-container {
        padding: 0 32px 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .variation-selector-container wy-dropdown {
        width: 100%;
    }

    .variation-description-panel {
        margin-top: 0;
    }

    /* Legacy selector styles (kept for backwards compatibility) */
    .variation-selector {
        margin: 0 32px 16px;
        padding: 12px;
        background: var(--md-sys-color-surface-container-low);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .variation-label {
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--md-sys-color-on-surface-variant);
    }

    .variation-select {
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface-container-lowest);
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 999px;
        padding: 6px 12px;
    }

    /* FORMS */
    .variables-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form-group label {
        display: block;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--wy-color-text-primary);
        margin-bottom: 8px;
    }

    .form-group input, .form-group textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 16px; /* Increased padding for breathing room */
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 8px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 1rem;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface-container-lowest);
        transition: all 0.2s;
    }

    .form-group input:focus, .form-group textarea:focus {
        outline: none;
        border-color: var(--md-sys-color-primary);
        box-shadow: 0 0 0 2px var(--wy-color-focus-ring);
    }

    .helper-text {
        display: block;
        text-align: right;
        font-size: 0.75rem;
        color: var(--md-sys-color-text-muted);
        margin-top: 4px;
    }

    /* TOGGLE SWITCH */
    .toggle-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }

    .toggle-label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
    }

    .toggle-track {
        position: relative;
        width: 52px;
        height: 32px;
        background: var(--md-sys-color-surface-container-highest);
        border: 2px solid var(--md-sys-color-outline);
        border-radius: 16px;
        transition: all 0.2s ease;
    }

    .toggle-track::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 20px;
        height: 20px;
        background: var(--md-sys-color-outline);
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .toggle-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-input:checked + .toggle-track {
        background: var(--md-sys-color-primary);
        border-color: var(--md-sys-color-primary);
    }

    .toggle-input:checked + .toggle-track::after {
        left: 24px;
        background: var(--md-sys-color-on-primary);
    }

    .toggle-input:focus-visible + .toggle-track {
        outline: 3px solid var(--wy-color-focus-ring);
        outline-offset: 2px;
    }

    .toggle-status {
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-on-surface-variant);
        min-width: 60px;
    }

    .toggle-status.active {
        color: var(--md-sys-color-text-heading);
    }

    .preview-area {
      background: var(--md-sys-color-surface-container-highest);
      border-radius: 8px;
      padding: 24px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 1rem;
      line-height: 1.7;
      color: var(--md-sys-color-on-surface);
      white-space: pre-wrap;
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    .editor-area {
        width: 100%;
        height: 100%;
        min-height: 300px;
        border: none;
        background: none;
        resize: none;
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--md-sys-color-on-surface);
    }
    .editor-area:focus { outline: none; }

    /* STEP NAVIGATION BUTTONS (for multi-step prompts) */
    .secondary-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: transparent;
        border: 1px solid var(--md-sys-color-outline);
        color: var(--md-sys-color-on-surface);
        padding: 12px 24px;
        border-radius: 999px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }
    .secondary-btn:hover {
        background: var(--md-sys-color-surface-container-high);
        border-color: var(--md-sys-color-outline);
    }

    /* STEPPER STYLES */
    .stepper-container {
      margin-bottom: var(--spacing-xl, 32px);
    }

    .stepper-progress {
      height: 4px;
      background: var(--md-sys-color-surface-container-highest);
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: var(--spacing-md, 16px);
    }

    .stepper-progress-bar {
      height: 100%;
      background: var(--md-sys-color-primary);
      transition: width var(--md-sys-motion-duration-medium2, 300ms) var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0, 0, 1));
    }

    .stepper-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stepper-label {
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: var(--md-sys-typescale-label-medium-size, 0.75rem);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--md-sys-color-primary);
      font-weight: 500;
    }

    .stepper-step-name {
      font-family: var(--font-serif, 'Playfair Display', serif);
      font-size: var(--md-sys-typescale-title-medium-size, 1rem);
      color: var(--md-sys-color-on-surface);
    }

    .step-instructions {
      margin-bottom: var(--spacing-lg, 24px);
    }

    .step-navigation {
      display: flex;
      gap: var(--spacing-md, 16px);
      justify-content: space-between;
      margin-top: var(--spacing-lg, 24px);
      padding-top: var(--spacing-lg, 24px);
      border-top: 1px solid var(--md-sys-color-surface-container-highest);
    }

    .step-navigation .secondary-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }

    .step-navigation .secondary-btn:disabled {
      opacity: 0.38;
      cursor: not-allowed;
    }

    .tabs-header {
      display: flex;
      gap: 24px;
      padding: 16px 0;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      margin-bottom: var(--spacing-lg, 24px);
    }

    .tab-item {
      background: none;
      border: none;
      padding: 8px 0;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
      border-bottom: 2px solid transparent;
    }

    .tab-item:hover {
      color: var(--md-sys-color-primary);
    }

    .tab-item.active {
      color: var(--md-sys-color-primary);
      font-weight: 700;
      border-bottom-color: var(--md-sys-color-primary);
    }

    @media (max-width: 600px) {
      .modal-container {
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      .header { padding: 24px 16px 16px; }
      .header-main { flex-direction: column; align-items: flex-start; gap: 16px; }
      .title-group h2 { font-size: 1.75rem; }
      .tabs-container { padding: 0; } /* wy-tabs handles its own mobile padding */
      .body { padding: 16px; }
      
      /* Hide category badge on mobile to save space */
      .badge {
        display: none;
      }
      
      /* Tighter button spacing on mobile */
      .header-actions-left {
        gap: 4px;
      }
      
      /* Step navigation styles (for multi-step prompts) */
      .step-navigation {
        flex-direction: row;
        gap: 12px;
      }
      .step-navigation .secondary-btn {
        flex: 1;
        min-width: 0;
      }
    }
    `;

  // Multi-step navigation methods
  nextStep() {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
      this.dispatchEvent(new CustomEvent('step-change', {
        detail: { stepIndex: this.activeStepIndex, step: this.steps[this.activeStepIndex] },
        bubbles: true,
        composed: true
      }));
    }
  }

  previousStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
      this.dispatchEvent(new CustomEvent('step-change', {
        detail: { stepIndex: this.activeStepIndex, step: this.steps[this.activeStepIndex] },
        bubbles: true,
        composed: true
      }));
    }
  }

  // Render stepper UI for multi-step prompts
  _renderStepper() {
    if (!this.steps || this.steps.length === 0) return '';
    
    const progressPercent = ((this.activeStepIndex + 1) / this.steps.length) * 100;
    
    return html`
      <div class="stepper-container">
        <div class="stepper-progress">
          <div class="stepper-progress-bar" 
               style="width: ${progressPercent}%">
          </div>
        </div>
        <div class="stepper-header">
          <span class="stepper-label">
            Step ${this.activeStepIndex + 1} of ${this.steps.length}
          </span>
          <span class="stepper-step-name">
            ${this.steps[this.activeStepIndex].name}
          </span>
        </div>
      </div>
    `;
  }

  // Render multi-step body content
  _renderMultiStepBody() {
    const step = this.steps[this.activeStepIndex];
    const compiledPrompt = this._compilePrompt(step.template);
    
    return html`
      ${this._renderStepper()}
      
      <!-- Add tabs for Variables/Preview -->
      ${step.variables && step.variables.length > 0 ? html`
        <div class="tabs-header">
          <button 
            class="tab-item ${this.activeTab === 'variables' ? 'active' : ''}"
            @click="${() => this.activeTab = 'variables'}">
            Variables
          </button>
          <button 
            class="tab-item ${this.activeTab === 'preview' ? 'active' : ''}"
            @click="${() => this.activeTab = 'preview'}">
            Preview
          </button>
        </div>
      ` : ''}
      
      <wy-info-panel class="step-instructions">
        ${step.instructions}
      </wy-info-panel>
      
      <!-- Conditionally render variables or preview based on active tab -->
      ${this.activeTab === 'variables' ? html`
        <div class="variables-grid">
          ${step.variables.map(v => this._renderVariable(v))}
        </div>
      ` : html`
        <div class="preview-area">${compiledPrompt}</div>
      `}
      
      <div class="step-navigation">
        <button 
          class="secondary-btn"
          ?disabled=${this.activeStepIndex === 0}
          @click=${() => this.previousStep()}>
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
          Previous
        </button>
        
        <button 
          class="secondary-btn"
          ?disabled=${this.activeStepIndex === this.steps.length - 1}
          @click=${() => this.nextStep()}>
          Next
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
        </button>
      </div>
    `;
  }

  render() {
    const currentTemplate = this.variations.length > 0
      ? this.variations[this.activeVariationIndex].template
      : this.template;

    const compiledPrompt = this._compilePrompt(currentTemplate);

    return html`
      <div class="scrim" @click="${this._close}"></div>
      <div class="modal-container">
        
        <!-- HEADER -->
        <header class="header">
            <div class="header-top">
                ${this.mode === 'locked' ? html`
                    <div class="header-actions-left">
                        <button class="icon-btn primary" @click="${this._handleCopy}" aria-label="Copy to clipboard" title="Copy">
                            <span class="material-symbols-outlined">content_copy</span>
                        </button>
                        <button class="icon-btn filled" @click="${() => this.mode = 'edit'}" aria-label="Edit prompt" title="Edit">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="icon-btn filled" @click="${this._handleDownload}" aria-label="Download" title="Download">
                            <span class="material-symbols-outlined">download</span>
                        </button>
                    </div>
                ` : html`
                    <div class="header-actions-left">
                        <button class="icon-btn filled" @click="${() => this.mode = 'locked'}" aria-label="Cancel" title="Cancel">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                        <button class="icon-btn primary" @click="${this._handleSave}" aria-label="Save" title="Save">
                            <span class="material-symbols-outlined">save</span>
                        </button>
                    </div>
                `}
                
                <span class="badge category-badge">${this.category}</span>
                
                <div class="header-actions">
                    <button class="icon-btn filled" @click="${this._close}" aria-label="Close modal" title="Close">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            
            <div class="header-main">
                <div class="title-group">
                    <h2>${this.title}</h2>
                    <p class="description-text">${this.description}</p>
                </div>
                
                ${this.mode === 'locked' ? html`` : ''}
            </div>
        </header>

        ${this.mode === 'locked' && this.variables.length > 0 ? html`
          <div class="tabs-container">
              <wy-tabs active-tab="${this.activeTab}" @tab-change="${e => this.activeTab = e.detail.tab}">
                <button class="tab-item ${this.activeTab === 'variables' ? 'active' : ''}" role="tab" data-tab="variables">Variables</button>
                <button class="tab-item ${this.activeTab === 'preview' ? 'active' : ''}" role="tab" data-tab="preview">Final Preview</button>
              </wy-tabs>
              ${this.activeTab === 'variables' && this._hasValues() ? html`
                <button class="clear-btn" @click="${this._clearAllVariables}">Clear All</button>
              ` : ''}
          </div>
        ` : ''}

        <div class="content">
          ${this.mode === 'locked' ? html`
            ${this.steps && this.steps.length > 0 ? html`
              <!-- Multi-step mode -->
              <div class="body">
                ${this._renderMultiStepBody()}
              </div>
            ` : html`
              <!-- Standard mode -->
              ${this.variations.length > 1 ? html`
                <div class="variation-selector-container">
                  <wy-dropdown
                    label="STYLE"
                    .value="${this.variations[this.activeVariationIndex]?.id || ''}"
                    .options="${this.variations.map(v => ({ value: v.id, label: v.name }))}"
                    variant="subtle"
                    @change="${this._handleVariationDropdownChange}"
                  ></wy-dropdown>
                  ${this.variations[this.activeVariationIndex]?.description ? html`
                    <wy-info-panel class="variation-description-panel">
                      ${this.variations[this.activeVariationIndex].description}
                    </wy-info-panel>
                  ` : ''}
                </div>
              ` : ''}

              <div class="body">
                ${this.activeTab === 'variables' ? html`
                  <div class="variables-grid">
                    ${this.variables.map(v => this._renderVariable(v))}
                  </div>
                ` : html`
                  <div class="preview-area">${compiledPrompt}</div>
                `}
              </div>
            `}
          ` : html`
            <div class="body">
              <textarea 
                class="editor-area" 
                .value="${this.template}"
                @input="${e => this.template = e.target.value}"
              ></textarea>
            </div>
          `}
        </div>
      </div>
    `;
  }

  _renderVariable(v) {
    // Support both 'type' and 'inputType' for compatibility
    const inputType = v.inputType || v.type || 'text';

    if (inputType === 'toggle') {
      const isChecked = this._values[v.name] === v.options?.[1] ||
                        this._values[v.name] === 'true' ||
                        this._values[v.name] === true;
      const statusText = isChecked ? 'Enabled' : 'Disabled';

      return html`
        <div class="form-group">
          <label>${v.label}</label>
          <div class="toggle-wrapper">
            <label class="toggle-label">
              <input
                type="checkbox"
                class="toggle-input"
                .checked="${isChecked}"
                @change="${(e) => this._handleToggle(v, e.target.checked)}"
              >
              <span class="toggle-track"></span>
            </label>
            <span class="toggle-status ${isChecked ? 'active' : ''}">${statusText}</span>
          </div>
        </div>
      `;
    }

    if (inputType === 'textarea') {
      return html`
        <div class="form-group">
          <label>${v.label}</label>
          <textarea
            placeholder="${v.placeholder || ''}"
            @input="${(e) => this._handleInput(v.name, e.target.value)}"
            .value="${this._values[v.name] || ''}"
            rows="4"
          ></textarea>
          <span class="helper-text">Markdown supported</span>
        </div>
      `;
    }

    // Default: text input
    return html`
      <div class="form-group">
        <label>${v.label}</label>
        <input
          type="text"
          placeholder="${v.placeholder || ''}"
          @input="${(e) => this._handleInput(v.name, e.target.value)}"
          .value="${this._values[v.name] || ''}"
        >
      </div>
    `;
  }

  _handleToggle(variable, checked) {
    const value = checked ? (variable.options?.[1] || 'true') : (variable.options?.[0] || '');
    this._handleInput(variable.name, value);
  }

  _handleInput(name, value) {
    this._values = { ...this._values, [name]: value };
    this.dispatchEvent(new CustomEvent('variable-change', {
      detail: { name, value, values: this._values },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  _hasValues() {
    return Object.values(this._values).some(v => v && v.length > 0);
  }

  _clearAllVariables() {
    this._values = {};
    this.dispatchEvent(new CustomEvent('variables-cleared', {
      detail: { values: this._values },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  _handleVariationChange(e) {
    const index = parseInt(e.target.value);
    this.activeVariationIndex = index;
    this.dispatchEvent(new CustomEvent('variation-change', {
      detail: { index, variation: this.variations[index] },
      bubbles: true,
      composed: true
    }));
  }

  _handleVariationDropdownChange(e) {
    const selectedId = e.detail.value;
    const index = this.variations.findIndex(v => v.id === selectedId);
    if (index !== -1) {
      this.activeVariationIndex = index;
      this.dispatchEvent(new CustomEvent('variation-change', {
        detail: { index, variation: this.variations[index] },
        bubbles: true,
        composed: true
      }));
    }
  }

  _compilePrompt(template) {
    let compiled = template;
    Object.keys(this._values).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      compiled = compiled.replace(regex, this._values[key] || `[${key}]`);
    });
    return compiled;
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  _handleCopy() {
    let textToCopy;
    
    if (this.steps && this.steps.length > 0) {
      // Multi-step mode: compile current step only
      const step = this.steps[this.activeStepIndex];
      textToCopy = this._compilePrompt(step.template);
    } else {
      // Standard mode: existing behavior
      textToCopy = this._compilePrompt(
        this.variations.length > 0 
          ? this.variations[this.activeVariationIndex].template 
          : this.template
      );
    }
    
    navigator.clipboard.writeText(textToCopy);
    this.dispatchEvent(new CustomEvent('copy', {
      detail: { text: textToCopy },
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Copied to clipboard!' },
      bubbles: true,
      composed: true
    }));
  }

  _handleSave() {
    this.mode = 'locked';
    this.dispatchEvent(new CustomEvent('save', {
      detail: { template: this.template },
      bubbles: true,
      composed: true
    }));
  }

  _handleDownload() {
    let textToDownload;
    
    if (this.steps && this.steps.length > 0) {
      // Multi-step mode: download current step only
      const step = this.steps[this.activeStepIndex];
      textToDownload = this._compilePrompt(step.template);
    } else {
      // Standard mode: existing behavior
      textToDownload = this._compilePrompt(
        this.variations.length > 0 
          ? this.variations[this.activeVariationIndex].template 
          : this.template
      );
    }
    
    this.dispatchEvent(new CustomEvent('download', {
      detail: { text: textToDownload, title: this.title },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('wy-prompt-modal', WyPromptModal);
