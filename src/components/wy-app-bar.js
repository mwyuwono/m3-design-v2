import { LitElement, html, css } from 'lit';
import './wy-logo.js';

export class WyAppBar extends LitElement {
    static properties = {
        title: { type: String },
        hideMenu: { type: Boolean, attribute: 'hide-menu' }
    };

    constructor() {
        super();
        this.title = 'Prompt Library';
        this.hideMenu = false;
    }

    static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: var(--md-sys-color-surface-container-high);
      height: 64px;
      padding: 0 32px;
    }

    .app-bar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .app-title {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
      white-space: nowrap;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ai-tools-link {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-text-heading);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 20px;
      transition: background-color 0.2s;
    }

    .ai-tools-link:hover {
      background-color: var(--md-sys-color-primary-container);
    }

    .menu-button {
      display: none;
    }

    @media (max-width: 600px) {
      .menu-button {
        display: block;
      }
      .ai-tools-link {
        display: none;
      }
      .app-title {
        font-size: 1.1rem;
      }
    }
  `;

    render() {
        return html`
      <div class="app-bar-container">
        <div class="left-section">
          ${!this.hideMenu ? html`
            <md-icon-button class="menu-button">
              <md-icon>menu</md-icon>
            </md-icon-button>
          ` : ''}
          <a href="/" class="logo-container">
            <slot name="logo">
              <wy-logo class="logo" size="32"></wy-logo>
            </slot>
            <h1 class="app-title">${this.title}</h1>
          </a>
        </div>

        <div class="right-section">
          <slot name="actions">
            <a href="#" class="ai-tools-link" @click="${this._handleAiToolsClick}">AI Tools</a>
          </slot>
          <md-icon-button>
            <md-icon>settings</md-icon>
          </md-icon-button>
        </div>
      </div>
    `;
    }

    _handleAiToolsClick(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('ai-tools-click', {
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('wy-app-bar', WyAppBar);
