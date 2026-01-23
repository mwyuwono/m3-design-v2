import { LitElement, html, css } from 'lit';

export class WyPlotCard extends LitElement {
  static properties = {
    title: { type: String },
    paperSize: { type: String, attribute: 'paper-size' },
    bucket: { type: String },
    status: { type: String }, // 'pending', 'success', 'error'
    timestamp: { type: String }
  };

  constructor() {
    super();
    this.title = 'Plot Configuration';
    this.paperSize = 'Letter (8.5x11)';
    this.bucket = 'Portrait';
    this.status = 'success';
    this.timestamp = new Date().toLocaleDateString();
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    }

    .card:hover {
      background-color: var(--md-sys-color-surface-container-low);
      border-color: var(--md-sys-color-primary);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--md-sys-color-primary);
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status-pending { color: var(--md-sys-color-secondary); }
    .status-success { color: #4CAF50; }
    .status-error { color: #D32F2F; }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      padding-top: 12px;
    }

    .metric-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .metric-icon {
      color: var(--md-sys-color-on-surface-variant);
      font-size: 18px;
    }

    .metric-content {
      display: flex;
      flex-direction: column;
    }

    .metric-label {
      font-family: var(--font-body);
      font-size: 0.625rem;
      color: var(--md-sys-color-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
    }

    .timestamp {
      font-family: var(--font-body);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
    }
  `;

  render() {
    const statusMap = {
      'pending': { icon: 'sync', label: 'Processing' },
      'success': { icon: 'check_circle', label: 'Complete' },
      'error': { icon: 'error', label: 'Failed' }
    };
    const s = statusMap[this.status] || statusMap.success;

    return html`
      <div class="card">
        <div class="header">
          <div class="title">${this.title}</div>
          <div class="status-badge status-${this.status}">
            <md-icon style="font-size: 14px;">${s.icon}</md-icon>
            <span>${s.label}</span>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-item">
            <md-icon class="metric-icon">description</md-icon>
            <div class="metric-content">
              <span class="metric-label">Format</span>
              <span class="metric-value">${this.paperSize}</span>
            </div>
          </div>
          <div class="metric-item">
            <md-icon class="metric-icon">layers</md-icon>
            <div class="metric-content">
              <span class="metric-label">Orientation</span>
              <span class="metric-value">${this.bucket}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <span class="timestamp">${this.timestamp}</span>
          <md-icon-button>
            <md-icon>more_vert</md-icon>
          </md-icon-button>
        </div>
      </div>
    `;
  }
}

customElements.define('wy-plot-card', WyPlotCard);
