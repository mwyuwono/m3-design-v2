import { LitElement, html, css } from 'lit';

export class WyAllocationCard extends LitElement {
    static properties = {
        title: { type: String },
        items: { type: Array } // [{ label: String, value: Number, color: String }]
    };

    static styles = css`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-border-variant);
      border-radius: var(--md-sys-shape-corner-large);
      padding: 32px;
      height: 100%;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h3 {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      margin: 0;
      color: var(--md-sys-color-on-surface);
    }

    .allocation-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .item {
      cursor: pointer;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 8px;
    }

    .label-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .label {
      font-family: var(--font-display);
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
      font-size: 0.875rem;
    }

    .percentage {
      font-family: var(--font-serif);
      font-weight: 500;
      font-size: 1.125rem;
      color: var(--md-sys-color-on-surface);
    }

    .bar-container {
      width: 100%;
      height: 4px;
      background-color: var(--md-sys-color-surface-variant);
      border-radius: 2px;
      overflow: hidden;
    }

    .bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .footer {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid var(--md-sys-color-outline-variant);
        font-family: var(--font-display);
        font-size: 0.75rem;
        line-height: 1.6;
        color: var(--md-sys-color-text-muted);
    }

    .footer strong {
        color: var(--md-sys-color-primary);
    }
  `;

    render() {
        return html`
      <div class="card">
        <div class="header">
          <h3>${this.title || 'Allocation'}</h3>
          <md-icon-button><md-icon>more_horiz</md-icon></md-icon-button>
        </div>
        <div class="allocation-list">
          ${(this.items || []).map(item => html`
            <div class="item">
              <div class="item-header">
                <div class="label-group">
                  <div class="dot" style="background-color: ${item.color || 'var(--md-sys-color-primary)'}"></div>
                  <span class="label">${item.label}</span>
                </div>
                <span class="percentage">${item.value}%</span>
              </div>
              <div class="bar-container">
                <div class="bar" style="width: ${item.value}%; background-color: ${item.color || 'var(--md-sys-color-primary)'}"></div>
              </div>
            </div>
          `)}
        </div>
        <div class="footer">
            <slot name="analysis">
                <strong>Analysis:</strong> Portfolio remains within target variance.
            </slot>
        </div>
      </div>
    `;
    }
}

customElements.define('wy-allocation-card', WyAllocationCard);
