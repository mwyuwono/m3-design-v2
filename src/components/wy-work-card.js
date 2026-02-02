import { LitElement, html, css } from 'lit';

export class WyWorkCard extends LitElement {
    static properties = {
        title: { type: String },
        artist: { type: String },
        date: { type: String },
        image: { type: String },
        selected: { type: Boolean, reflect: true },
        favorite: { type: Boolean },
        status: { type: String } // 'draft', 'ready', 'exported'
    };

    constructor() {
        super();
        this.title = 'Untitled';
        this.artist = 'Unknown';
        this.date = '';
        this.image = '';
        this.selected = false;
        this.favorite = false;
        this.status = '';
    }

    static styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .card {
      border-radius: 20px;
      overflow: hidden;
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .card:hover {
      border-color: var(--md-sys-color-primary);
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(45, 78, 60, 0.08);
    }

    :host([selected]) .card {
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 2px var(--md-sys-color-primary);
    }

    .media-container {
      aspect-ratio: 16 / 9;
      background-color: var(--md-sys-color-surface-container-high);
      overflow: hidden;
      position: relative;
    }

    .media-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card:hover .media-container img {
      transform: scale(1.05);
    }

    .info-container {
      padding: 16px;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      color: var(--md-sys-color-text-heading);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .metadata {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badges {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
    }

    .badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-text-heading);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4px);
    }

    .status-indicator {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-family: var(--font-body);
      font-size: 0.625rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .favorite-toggle {
      color: ${css`var(--md-sys-color-text-heading)`};
    }

    .favorite-toggle[active] {
      color: #E91E63; /* Accent color for favorites */
    }
  `;

    render() {
        return html`
      <div class="card" @click="${this._toggleSelect}">
        <div class="media-container">
          ${this.image ? html`<img src="${this.image}" alt="${this.title}">` : ''}
          
          <div class="badges">
            <div class="badge" @click="${this._toggleFavorite}">
              <md-icon>${this.favorite ? 'favorite' : 'favorite_border'}</md-icon>
            </div>
          </div>

          ${this.status ? html`
            <div class="status-indicator">${this.status}</div>
          ` : ''}
        </div>

        <div class="info-container">
          <div class="title">${this.title}</div>
          <div class="metadata">
            <span>${this.artist}</span>
            <span>${this.date}</span>
          </div>
        </div>
      </div>
    `;
    }

    _toggleSelect(e) {
        // Only toggle if we didn't click the favorite button
        if (e.target.closest('.badge')) return;

        this.selected = !this.selected;
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { selected: this.selected, title: this.title },
            bubbles: true,
            composed: true
        }));
    }

    _toggleFavorite(e) {
        e.stopPropagation();
        this.favorite = !this.favorite;
        this.requestUpdate();
    }
}

customElements.define('wy-work-card', WyWorkCard);
