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
    activeTab: { type: String } // 'variables' or 'preview'
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
    this._values = {};
  }

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 2000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
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
      background: var(--md-sys-color-surface);
      border-radius: 16px; /* 16px radius as per ref */
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%) scale(0.95);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--md-sys-color-outline-variant);
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
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
      background: var(--md-sys-color-secondary-container); /* Fallback */
      color: var(--md-sys-color-on-secondary-container);
      border-radius: 4px; /* Sharper radius */
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em; /* Wider tracking */
    }

    /* Category Specific Badges */
    :host([category="Productivity"]) .badge { background: #E8E4D9; color: var(--wy-color-productivity); }
    :host([category="Expertise"]) .badge { background: #E8E4D9; color: var(--wy-color-expertise); }
    /* Dark mode overrides */
    @media (prefers-color-scheme: dark) {
        :host([category="Productivity"]) .badge { background: rgba(255,255,255,0.1); color: #E5E5E5; }
        :host([category="Expertise"]) .badge { background: rgba(255,255,255,0.1); color: #E5E5E5; }
    }

    .title-group h2 {
      font-family: var(--font-serif, 'Playfair Display', serif); /* Playfair Display */
      font-size: 2.5rem; /* Larger Title */
      font-weight: 500;
      margin: 0 0 12px 0;
      color: var(--md-sys-color-primary);
      line-height: 1.1;
    }

    .description-text {
      font-family: var(--font-body);
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
        font-family: var(--font-body);
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
        padding: 0 32px;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        display: flex;
        gap: 32px;
    }

    .tab-item {
        background: none;
        border: none;
        padding: 12px 0 16px 0;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-on-surface-variant);
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
        margin: 0;
    }

    .tab-item:hover {
        color: var(--md-sys-color-primary);
    }

    .tab-item.active {
        color: var(--md-sys-color-primary);
        font-weight: 700;
    }

    .tab-item.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--md-sys-color-primary);
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

    .variation-selector {
        margin: 0 32px 16px;
        padding: 12px;
        background: var(--md-sys-color-surface-container-low);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    /* FORMS */
    .variables-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form-group label {
        display: block;
        font-family: var(--font-body);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--md-sys-color-primary);
        margin-bottom: 8px;
    }

    .form-group input, .form-group textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 12px 16px;
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 8px;
        font-family: var(--font-body);
        font-size: 1rem;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface-container-lowest);
        transition: all 0.2s;
    }

    .form-group input:focus, .form-group textarea:focus {
        outline: none;
        border-color: var(--md-sys-color-primary);
        box-shadow: 0 0 0 2px rgba(45, 78, 60, 0.1);
    }

    .helper-text {
        display: block;
        text-align: right;
        font-size: 0.75rem;
        color: var(--md-sys-color-text-muted);
        margin-top: 4px;
    }

    .preview-area {
      background: var(--md-sys-color-surface-container-highest);
      border-radius: 8px;
      padding: 24px;
      font-family: var(--font-body);
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

    /* FOOTER */
    .footer {
      padding: 16px 32px 32px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 24px;
      background: var(--md-sys-color-surface); /* Ensure contrast against content bg if needed */
      border-radius: 0 0 16px 16px;
    }

    .text-link {
        background: none;
        border: none;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-text-muted);
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 4px;
        cursor: pointer;
        transition: color 0.2s;
    }
    .text-link:hover { color: var(--md-sys-color-primary); }

    .primary-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        border: none;
        padding: 12px 24px;
        border-radius: 999px;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: all 0.2s;
    }
    .primary-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    @media (max-width: 600px) {
      .modal-container {
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      .header-main { flex-direction: column; align-items: flex-start; gap: 16px; }
      .footer { flex-direction: column-reverse; width: 100%; }
      .primary-btn, .text-link { width: 100%; justify-content: center; }
    }
    `;

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
                <span class="badge category-badge">${this.category}</span>
                <md-icon-button @click="${this._close}">
                    <md-icon>close</md-icon>
                </md-icon-button>
            </div>
            
            <div class="header-main">
                <div class="title-group">
                    <h2>${this.title}</h2>
                    <p class="description-text">${this.description}</p>
                </div>
                
                ${this.mode === 'locked' ? html`
                    <button class="customize-btn" @click="${() => this.mode = 'edit'}">
                        <md-icon style="font-size: 18px;">edit</md-icon>
                        Customize Template
                    </button>
                ` : ''}
            </div>
        </header>

        <div class="content">
          ${this.mode === 'locked' ? html`
            
            ${this.variations.length > 1 ? html`
              <div class="variation-selector">
                <span class="variation-label">Variation Style:</span>
                <select class="variation-select" @change="${this._handleVariationChange}">
                  ${this.variations.map((v, i) => html`
                    <option value="${i}" ?selected="${this.activeVariationIndex === i}">${v.name}</option>
                  `)}
                </select>
              </div>
            ` : ''}

            <!-- TABS -->
            <div class="tabs-container">
                <wy-tabs active-tab="${this.activeTab}" @tab-change="${e => this.activeTab = e.detail.tab}">
                  <button class="tab-item ${this.activeTab === 'variables' ? 'active' : ''}" role="tab" data-tab="variables">Variables</button>
                  <button class="tab-item ${this.activeTab === 'preview' ? 'active' : ''}" role="tab" data-tab="preview">Final Preview</button>
                </wy-tabs>
            </div>

            <div class="body">
              ${this.activeTab === 'variables' ? html`
                <div class="variables-grid">
                  ${this.variables.map(v => html`
                    <div class="form-group">
                        <label>${v.label}</label>
                        ${v.type === 'textarea' ? html`
                            <textarea 
                            placeholder="${v.placeholder || ''}" 
                            @input="${(e) => this._handleInput(v.name, e.target.value)}"
                            .value="${this._values[v.name] || ''}"
                            rows="4"
                            ></textarea>
                            <span class="helper-text">Markdown supported</span>
                        ` : html`
                            <input 
                            type="text" 
                            placeholder="${v.placeholder || ''}" 
                            @input="${(e) => this._handleInput(v.name, e.target.value)}"
                            .value="${this._values[v.name] || ''}"
                            >
                        `}
                    </div>
                  `)}
                </div>
              ` : html`
                <div class="preview-area">${compiledPrompt}</div>
              `}
            </div>
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

        <!-- FOOTER -->
        <footer class="footer">
          ${this.mode === 'locked' ? html`
            <button class="text-link" @click="${this._handleDownload}">Download .txt</button>
            <button class="primary-btn" @click="${this._handleCopy}">
                <md-icon style="font-size: 18px;">content_copy</md-icon>
                Copy to Clipboard
            </button>
          ` : html`
            <button class="text-link" @click="${() => this.mode = 'locked'}">Cancel</button>
            <button class="primary-btn" @click="${this._handleSave}">Save Template</button>
          `}
        </footer>
      </div>
    `;
  }

  _handleInput(name, value) {
    this._values = { ...this._values, [name]: value };
    this.requestUpdate();
  }

  _handleVariationChange(e) {
    this.activeVariationIndex = parseInt(e.target.value);
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
    const text = this._compilePrompt(this.variations.length > 0 ? this.variations[this.activeVariationIndex].template : this.template);
    navigator.clipboard.writeText(text);
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
    // Logic for download
  }
}

customElements.define('wy-prompt-modal', WyPromptModal);
