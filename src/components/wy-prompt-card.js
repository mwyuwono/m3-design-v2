import { LitElement, html, css } from 'lit';

export class WyPromptCard extends LitElement {
  static properties = {
    title: { type: String },
    category: { type: String },
    variables: { type: Number },
    description: { type: String },
    showDetails: { type: Boolean, attribute: 'show-details' }
  };

  constructor() {
    super();
    this.title = 'Untitled Prompt';
    this.category = 'General';
    this.variables = 0;
    this.description = '';
    this.showDetails = false;
  }

  static styles = css`
    :host {
      display: block;
      background-color: var(--md-sys-color-surface-container-low);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid var(--md-sys-color-outline-variant);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host(:hover) {
      background-color: var(--md-sys-color-surface-container-high);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-color: var(--md-sys-color-primary);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .badge-group {
      display: flex;
      gap: 6px;
    }

    .badge {
      font-family: var(--font-body);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .category-badge {
      background-color: var(--badge-bg, var(--md-sys-color-secondary-container));
      color: var(--badge-color, var(--md-sys-color-on-secondary-container));
    }

    .variable-badge {
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-on-surface-variant);
    }

    .card-title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
      line-height: 1.3;
    }

    .card-description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 12px 0 0 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    :host([data-category="Productivity"]) { 
      --badge-bg: var(--wy-color-productivity-container); 
      --badge-color: var(--wy-color-on-productivity-container); 
    }
    :host([data-category="Expertise"]) { 
      --badge-bg: var(--wy-color-expertise-container); 
      --badge-color: var(--wy-color-on-expertise-container); 
    }
    :host([data-category="Travel & Shopping"]) { 
      --badge-bg: var(--wy-color-travel-container); 
      --badge-color: var(--wy-color-on-travel-container); 
    }
  `;

  render() {
    return html`
      <div class="card-header">
        <div class="badge-group">
          <span class="badge category-badge">${this.category}</span>
          <span class="badge variable-badge">${this.variables} variables</span>
        </div>
        <md-icon style="font-size: 18px; color: var(--md-sys-color-outline);">arrow_forward</md-icon>
      </div>
      <h3 class="card-title">${this.title}</h3>
      ${this.showDetails && this.description ? html`
        <p class="card-description">${this.description}</p>
      ` : ''}
    `;
  }
}

export class WyPromptRow extends LitElement {
  static properties = {
    title: { type: String },
    category: { type: String },
    variables: { type: Number },
    description: { type: String },
    showDetails: { type: Boolean, attribute: 'show-details' }
  };

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    :host(:hover) {
      background-color: var(--md-sys-color-surface-container-low);
    }

    .row-content {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .row-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row-title {
      font-family: var(--font-body);
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    .row-description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .badge-group {
      display: flex;
      gap: 8px;
      min-width: 200px;
      justify-content: flex-end;
    }

    .badge {
      font-family: var(--font-body);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .category-badge {
      background-color: var(--badge-bg, var(--md-sys-color-secondary-container));
      color: var(--badge-color, var(--md-sys-color-on-secondary-container));
    }

    .variable-badge {
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-on-surface-variant);
    }

    :host([data-category="Productivity"]) { 
      --badge-bg: var(--wy-color-productivity-container); 
      --badge-color: var(--wy-color-on-productivity-container); 
    }
    :host([data-category="Expertise"]) { 
      --badge-bg: var(--wy-color-expertise-container); 
      --badge-color: var(--wy-color-on-expertise-container); 
    }
    :host([data-category="Travel & Shopping"]) { 
      --badge-bg: var(--wy-color-travel-container); 
      --badge-color: var(--wy-color-on-travel-container); 
    }

    @media (max-width: 600px) {
      .badge-group {
        display: none;
      }
    }
  `;

  render() {
    return html`
      <div class="row-content">
        <div class="row-main">
          <h3 class="row-title">${this.title}</h3>
          ${this.showDetails && this.description ? html`
            <p class="row-description">${this.description}</p>
          ` : ''}
        </div>
        <div class="badge-group">
          <span class="badge category-badge">${this.category}</span>
          <span class="badge variable-badge">${this.variables} v</span>
          <md-icon style="font-size: 18px; color: var(--md-sys-color-outline);">chevron_right</md-icon>
        </div>
      </div>
    `;
  }
}

customElements.define('wy-prompt-card', WyPromptCard);
customElements.define('wy-prompt-row', WyPromptRow);
