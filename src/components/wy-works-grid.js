import { LitElement, html, css } from 'lit';

export class WyWorksGrid extends LitElement {
    static properties = {
        density: { type: String }, // 'spacious', 'compact'
        empty: { type: Boolean }
    };

    constructor() {
        super();
        this.density = 'spacious';
        this.empty = false;
    }

    static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .grid-container {
      display: grid;
      gap: 32px;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      transition: all 0.3s ease;
    }

    :host([density="compact"]) .grid-container {
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
      background-color: var(--md-sys-color-surface-container-low);
      border: 2px dashed var(--md-sys-color-outline-variant);
      border-radius: 24px;
      color: var(--md-sys-color-on-surface-variant);
    }

    .empty-state md-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .empty-title {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    .empty-text {
      font-family: var(--font-body);
      font-size: 0.875rem;
      max-width: 400px;
    }

    @media (max-width: 600px) {
      .grid-container {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `;

    render() {
        if (this.empty) {
            return html`
        <div class="empty-state">
          <md-icon>hourglass_empty</md-icon>
          <div class="empty-title">No Artwork Found</div>
          <div class="empty-text">Your plotter library is currently empty. Start by importing new plot files or generating configurations.</div>
        </div>
      `;
        }

        return html`
      <div class="grid-container">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define('wy-works-grid', WyWorksGrid);
