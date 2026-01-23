import { LitElement, html, css } from 'lit';
import './wy-modal.js';
import './wy-form-field.js';
import './wy-selection-card.js';

export class WyExportModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    workTitle: { type: String, attribute: 'work-title' },
    previewImage: { type: String, attribute: 'preview-image' }
  };

  constructor() {
    super();
    this.open = false;
    this.workTitle = 'Untitled Work';
    this.previewImage = '';
  }

  static styles = css`
    :host {
      display: block;
    }

    .export-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      min-height: 400px;
    }

    .preview-pane {
      background-color: var(--md-sys-color-surface-container-low);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    .preview-pane img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .controls-pane {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 8px 0;
    }

    .section-title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      color: var(--md-sys-color-primary);
      margin-bottom: 12px;
    }

    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 800px) {
      .export-container {
        grid-template-columns: 1fr;
      }
      .preview-pane {
        aspect-ratio: 16 / 9;
        min-height: auto;
      }
    }
  `;

  render() {
    return html`
      <wy-modal 
        ?open="${this.open}" 
        heading="Export Plot: ${this.workTitle}"
        max-width="900px"
        @close="${this._handleClose}"
      >
        <div class="export-container">
          <div class="preview-pane">
            ${this.previewImage ? html`<img src="${this.previewImage}" alt="Preview">` : html`<md-icon style="font-size: 48px; opacity: 0.2;">image</md-icon>`}
          </div>

          <div class="controls-pane">
            <div>
              <div class="section-title">Paper Configuration</div>
              <div class="grid-2col">
                <wy-selection-card name="paper" label="A3" value="a3" checked icon="description"></wy-selection-card>
                <wy-selection-card name="paper" label="A4" value="a4" icon="description"></wy-selection-card>
              </div>
            </div>

            <wy-form-field label="Bucket Orientation">
              <select style="width: 100%;">
                <option>Portrait (Standard)</option>
                <option>Landscape (Rotated)</option>
              </select>
            </wy-form-field>

            <wy-form-field label="Export Intensity">
              <div style="display: flex; gap: 8px;">
                <wy-filter-chip label="Draft" active></wy-filter-chip>
                <wy-filter-chip label="Production"></wy-filter-chip>
                <wy-filter-chip label="Archival"></wy-filter-chip>
              </div>
            </wy-form-field>
          </div>
        </div>

        <div slot="actions">
          <md-text-button @click="${this.close}">Cancel</md-text-button>
          <md-filled-button @click="${this._handleExport}">Generate SVG</md-filled-button>
        </div>
      </wy-modal>
    `;
  }

  show() { this.open = true; }
  close() { this.open = false; }

  _handleClose() {
    this.open = false;
  }

  _handleExport() {
    // Mock export logic
    this.dispatchEvent(new CustomEvent('export', {
      detail: { status: 'success' },
      bubbles: true,
      composed: true
    }));
    this.close();
  }
}

customElements.define('wy-export-modal', WyExportModal);
