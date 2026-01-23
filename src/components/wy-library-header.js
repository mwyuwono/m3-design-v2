import { LitElement, html, css } from 'lit';

export class WyLibraryHeader extends LitElement {
  static properties = {
    userName: { type: String, attribute: 'user-name' },
    userAvatar: { type: String, attribute: 'user-avatar' },
    breadcrumb: { type: String },
    searchValue: { type: String, attribute: 'search-value' }
  };

  constructor() {
    super();
    this.userName = 'M. Yuwono';
    this.userAvatar = '';
    this.breadcrumb = 'Plotter Library';
    this.searchValue = '';
  }

  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--md-sys-color-surface-container-low);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 12px 32px;
    }

    .header-container {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .breadcrumb {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--md-sys-color-primary);
      white-space: nowrap;
    }

    .search-container {
      flex: 1;
      max-width: 600px;
      position: relative;
    }

    .search-pill {
      width: 100%;
      height: 48px;
      background-color: var(--md-sys-color-surface-container-high);
      border-radius: 24px;
      border: 1px solid transparent;
      padding: 0 48px 0 20px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface);
      box-sizing: border-box;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .search-pill:focus {
      outline: none;
      background-color: var(--md-sys-color-surface);
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 4px rgba(45, 78, 60, 0.1);
    }

    .search-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--md-sys-color-on-surface-variant);
      pointer-events: none;
    }

    .right-section {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 20px;
      border-left: 1px solid var(--md-sys-color-outline-variant);
    }

    .user-info {
      text-align: right;
    }

    .user-name {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      display: block;
    }

    .user-role {
      font-family: var(--font-body);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 600;
      overflow: hidden;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 800px) {
      .breadcrumb {
        display: none;
      }
      .user-info {
        display: none;
      }
      padding: 12px 16px;
    }
  `;

  render() {
    return html`
      <div class="header-container">
        <div class="left-section">
          <md-icon-button>
            <md-icon>menu</md-icon>
          </md-icon-button>
          <div class="breadcrumb">${this.breadcrumb}</div>
        </div>

        <div class="search-container">
          <input 
            type="text" 
            class="search-pill" 
            placeholder="Search collections, tags, or artists..."
            .value="${this.searchValue}"
            @input="${this._handleSearch}"
          >
          <md-icon class="search-icon">search</md-icon>
        </div>

        <div class="right-section">
          <md-icon-button>
            <md-icon>notifications</md-icon>
          </md-icon-button>
          
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">${this.userName}</span>
              <span class="user-role">Administrator</span>
            </div>
            <div class="avatar">
              ${this.userAvatar ? html`<img src="${this.userAvatar}" alt="${this.userName}">` : html`<span>${this.userName.charAt(0)}</span>`}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _handleSearch(e) {
    this.searchValue = e.target.value;
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.searchValue },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('wy-library-header', WyLibraryHeader);
