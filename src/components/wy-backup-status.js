import { LitElement, html, css } from 'lit';

export class WyBackupStatus extends LitElement {
  static properties = {
    status: { type: String }, // 'synced', 'syncing', 'error'
    lastSync: { type: String, attribute: 'last-sync' }
  };

  constructor() {
    super();
    this.status = 'synced';
    this.lastSync = '2 mins ago';
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 16px;
      border-radius: 9999px;
      background-color: var(--md-sys-color-surface-container-high);
      border: 1px solid var(--md-sys-color-outline-variant);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .pill:hover {
      background-color: var(--md-sys-color-surface-container-highest);
      border-color: var(--md-sys-color-primary);
    }

    .status-icon {
      font-size: 18px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
    }

    .status-text {
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .hint-text {
      font-family: var(--font-body);
      font-size: 0.625rem;
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.2;
      margin-top: 2px;
    }

    .status-synced { color: #4CAF50; }
    .status-syncing { color: var(--md-sys-color-primary); }
    .status-error { color: #D32F2F; }

    /* Animated sync icon */
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    md-icon.syncing-icon {
      animation: spin 2s linear infinite;
      display: inline-block;
    }
  `;

  render() {
    const config = {
      'synced': { icon: 'cloud_done', label: 'Synced', class: 'status-synced' },
      'syncing': { icon: 'sync', label: 'Syncing...', class: 'status-syncing syncing-icon' },
      'error': { icon: 'cloud_off', label: 'Offline', class: 'status-error' }
    };
    const c = config[this.status] || config.synced;

    return html`
      <div class="pill" title="Last backup: ${this.lastSync}">
        <md-icon class="status-icon ${c.class}">${c.icon}</md-icon>
        <div class="text-container">
          <span class="status-text ${c.class}">${c.label}</span>
          <span class="hint-text">${this.lastSync}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('wy-backup-status', WyBackupStatus);
