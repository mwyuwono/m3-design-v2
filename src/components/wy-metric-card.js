import { LitElement, html, css } from 'lit';

export class WyMetricCard extends LitElement {
    static properties = {
        title: { type: String },
        value: { type: String },
        trend: { type: String },
        icon: { type: String }
    };

    static styles = css`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-border-variant);
      border-radius: var(--md-sys-shape-corner-medium);
      padding: 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      transition: transform 0.2s ease;
    }

    .card:hover {
      transform: translateY(-4px);
    }

    .icon-container {
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-primary);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-family: var(--font-display);
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--md-sys-color-text-muted);
      margin-bottom: 4px;
    }

    .value {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      color: var(--md-sys-color-on-surface);
      margin-bottom: 4px;
    }

    .trend {
      font-family: var(--font-display);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-primary);
    }

    md-icon {
      font-size: 24px;
    }
  `;

    render() {
        return html`
      <div class="card">
        <div class="icon-container">
          <md-icon>${this.icon}</md-icon>
        </div>
        <div class="content">
          <span class="title">${this.title}</span>
          <span class="value">${this.value}</span>
          ${this.trend ? html`<span class="trend">${this.trend}</span>` : ''}
        </div>
      </div>
    `;
    }
}

customElements.define('wy-metric-card', WyMetricCard);
