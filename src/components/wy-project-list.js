import { LitElement, html, css } from 'lit';
import projects from '../data/projects.json';
import '@material/web/labs/card/elevated-card.js';
import '@material/web/button/text-button.js';

export class WyProjectList extends LitElement {
  static properties = {
    filter: { type: String },
    title: { type: String }
  };

  static styles = css`
    :host { display: block; margin-bottom: 80px; }
    
    h2 {
      font-family: var(--font-serif);
      font-size: 2rem;
      margin-bottom: 40px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px;
    }

    md-elevated-card {
      --md-elevated-card-container-color: var(--md-sys-color-surface);
      --md-elevated-card-container-shape: var(--md-sys-shape-corner-large);
      width: 100%;
      height: 100%;
    }

    .card-content {
      padding: 0;
    }
    
    .card-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: var(--md-sys-shape-corner-large) var(--md-sys-shape-corner-large) 0 0;
    }

    .text-content {
        padding: 24px;
    }

    h3 {
        font-family: var(--font-serif);
        font-size: 1.25rem;
        margin: 0 0 8px 0;
    }
    
    p {
        font-size: 0.875rem;
        color: var(--md-sys-color-on-surface-variant);
        margin: 0 0 16px 0;
    }
  `;

  render() {
    const filteredProjects = projects.filter(p => p.category === this.filter);

    return html`
      <div>
        <h2>${this.title || 'Projects'}</h2>
        <div class="grid">
          ${filteredProjects.map(p => html`
            <md-elevated-card href="/project.html?id=${p.id}" clickable>
               <div class="card-content">
                  <img class="card-image" src="${p.image}" alt="${p.title}" />
                  <div class="text-content">
                    <h3>${p.title}</h3>
                    <p>${p.summary}</p>
                    <md-text-button>View Details</md-text-button>
                  </div>
               </div>
            </md-elevated-card>
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define('wy-project-list', WyProjectList);
