import { LitElement, html, css } from 'lit';
import '@material/web/labs/card/outlined-card.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

export class WyBioCard extends LitElement {
  static properties = {
    name: { type: String },
    role: { type: String },
    photo: { type: String },
    bio: { type: String } // Richer bio from module data
  };

  static styles = css`
    :host { display: block; margin-bottom: 64px; }
    
    .bio-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }

    img {
      width: 100%;
      border-radius: var(--md-sys-shape-corner-large);
      aspect-ratio: 4/5;
      object-fit: cover;
    }

    .content {
      padding-top: 24px;
    }

    h1 {
      font-family: var(--font-serif);
      font-size: 3.5rem;
      margin: 0 0 16px 0;
      color: var(--md-sys-color-on-background);
      line-height: 1.1;
    }

    .role {
      font-family: var(--font-body);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--md-sys-color-secondary);
      display: block;
      margin-bottom: 32px;
    }

    .bio-text {
      font-size: 1.25rem;
      color: var(--md-sys-color-on-surface-variant);
      max-width: 50ch;
      line-height: 1.6;
    }

    @media(max-width: 900px) {
      .bio-container { grid-template-columns: 1fr; gap: 32px; }
      h1 { font-size: 2.5rem; }
    }
  `;

  render() {
    return html`
      <div class="bio-container">
        <img src="${this.photo}" alt="${this.name}" />
        <div class="content">
          <span class="role">${this.role}</span>
          <h1>${this.name}</h1>
          <p class="bio-text">${this.bio}</p>
          
          <div style="margin-top: 32px;">
             <md-icon-button href="#"><md-icon>link</md-icon></md-icon-button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('wy-bio-card', WyBioCard);
