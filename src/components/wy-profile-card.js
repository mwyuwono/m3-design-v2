import { LitElement, html, css } from 'lit';
import '@material/web/labs/card/elevated-card.js';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

export class WyProfileCard extends LitElement {
  static properties = {
    name: { type: String },
    role: { type: String },
    photo: { type: String },
    profileId: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
    
    md-elevated-card {
      width: 100%;
      height: 100%;
      --md-elevated-card-container-color: var(--md-sys-color-surface);
      --md-elevated-card-container-shape: var(--md-sys-shape-corner-large);
      border: 1px solid var(--md-sys-color-outline-variant); 
    }

    .card-content {
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 8px;
      background-color: var(--md-sys-color-surface-variant);
    }

    h2 {
      font-family: var(--font-serif);
      font-size: 1.75rem;
      font-weight: 400;
      margin: 0;
      color: var(--md-sys-color-on-surface);
    }

    .role {
      font-family: var(--font-body);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--md-sys-color-secondary);
      font-weight: 500;
      margin: 0;
    }

    .actions {
      margin-top: 16px;
    }
    
    a { text-decoration: none; }
  `;

  render() {
    return html`
      <md-elevated-card>
        <div class="card-content">
          <img class="avatar" src="${this.photo}" alt="${this.name}" />
          <p class="role">${this.role}</p>
          <h2>${this.name}</h2>
          
          <div class="actions">
            <a href="/profile.html?id=${this.profileId}">
              <md-filled-button>View Profile</md-filled-button>
            </a>
          </div>
        </div>
      </md-elevated-card>
    `;
  }
}

customElements.define('wy-profile-card', WyProfileCard);
