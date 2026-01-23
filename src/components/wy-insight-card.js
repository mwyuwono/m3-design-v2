import { LitElement, html, css } from 'lit';

export class WyInsightCard extends LitElement {
    static properties = {
        image: { type: String },
        category: { type: String },
        title: { type: String },
        icon: { type: String }
    };

    static styles = css`
    :host {
      display: block;
    }
    
    .card {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: var(--md-sys-shape-corner-medium);
      overflow: hidden;
      cursor: pointer;
    }

    .image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: transform 0.7s ease;
    }

    .card:hover .image {
      transform: scale(1.05);
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(45, 78, 60, 0.9) 0%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      box-sizing: border-box;
      color: white;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .category {
      font-family: var(--font-display);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      line-height: 1.3;
      margin: 0;
    }

    md-icon {
      font-size: 16px;
    }
  `;

    render() {
        return html`
      <div class="card">
        <div class="image" style="background-image: url('${this.image}')"></div>
        <div class="overlay">
          <div class="header">
            ${this.icon ? html`<md-icon>${this.icon}</md-icon>` : ''}
            <span class="category">${this.category}</span>
          </div>
          <h4 class="title">${this.title}</h4>
        </div>
      </div>
    `;
    }
}

customElements.define('wy-insight-card', WyInsightCard);
