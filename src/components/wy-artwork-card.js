import { LitElement, html, css } from 'lit';

/**
 * Shared artwork card for grid/list consumers (plots, library views, etc.).
 * Host apps own routing and mutations; this component emits events only.
 */
export class WyArtworkCard extends LitElement {
    static properties = {
        title: { type: String },
        workId: { type: String, attribute: 'work-id' },
        variantCount: { type: Number, attribute: 'variant-count' },
        modifiedLabel: { type: String, attribute: 'modified-label' },
        status: { type: String },
        selected: { type: Boolean, reflect: true },
        favorite: { type: Boolean, reflect: true },
        loading: { type: Boolean, reflect: true },
        noImage: { type: Boolean, attribute: 'no-image', reflect: true },
        imageSrc: { type: String, attribute: 'image-src' },
        imageAlt: { type: String, attribute: 'image-alt' },
        imageAspectRatio: { type: String, attribute: 'image-aspect-ratio' },
        imageObjectPosition: { type: String, attribute: 'image-object-position' },
        interactive: { type: Boolean, reflect: true },
        statusLabels: { attribute: false },
        metaPrimary: { attribute: false },
        metaSecondary: { attribute: false },
        _imageFailed: { state: true },
        _metaTone: { state: true }
    };

    constructor() {
        super();
        this.title = '';
        this.workId = '';
        this.variantCount = 0;
        this.modifiedLabel = '';
        this.status = '';
        this.selected = false;
        this.favorite = false;
        this.loading = false;
        this.noImage = false;
        this.imageSrc = '';
        this.imageAlt = '';
        this.imageAspectRatio = '4 / 5';
        this.imageObjectPosition = '50% 50%';
        this.interactive = true;
        this.statusLabels = undefined;
        this.metaPrimary = '';
        this.metaSecondary = '';
        this._imageFailed = false;
        this._metaTone = 'light-bg';
    }

    static styles = css`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

      :host {
        display: block;
        --wy-artwork-card-radius: 16px;
        --wy-artwork-card-outline: var(--md-sys-color-outline-variant);
        --wy-artwork-card-bg: var(--md-sys-color-surface-container-lowest);
        --wy-artwork-card-overlay-bg: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 92%, transparent);
        --wy-artwork-card-overlay-fg: var(--md-sys-color-on-surface);
        --wy-artwork-card-overlay-muted: var(--md-sys-color-on-surface-variant);
        --wy-artwork-card-control-bg: color-mix(in srgb, var(--md-sys-color-scrim) 20%, transparent);
        --wy-artwork-card-control-bg-hover: color-mix(in srgb, var(--md-sys-color-scrim) 30%, transparent);
        --wy-artwork-card-control-fg: var(--md-sys-color-on-primary);
        --wy-artwork-card-selected-ring: var(--md-sys-color-primary);
        --wy-artwork-card-selected-overlay: color-mix(in srgb, var(--md-sys-color-primary) 10%, transparent);
        --wy-artwork-card-placeholder-bg: var(--md-sys-color-surface-container);
        --wy-artwork-card-placeholder-pattern: color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent);
        --wy-artwork-card-status-bg: color-mix(in srgb, var(--md-sys-color-surface-container-high) 88%, transparent);
        --wy-artwork-card-status-fg: var(--md-sys-color-on-surface);
        --wy-artwork-card-status-border: color-mix(in srgb, var(--md-sys-color-outline) 30%, transparent);
        --wy-artwork-card-favorite-active: var(--md-sys-color-primary);
        outline: none;
      }

      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-feature-settings: 'liga';
      }

      article {
        position: relative;
        border-radius: var(--wy-artwork-card-radius);
        overflow: hidden;
        background: var(--wy-artwork-card-bg);
        border: 1px solid var(--wy-artwork-card-outline);
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        box-shadow: 0 1px 2px color-mix(in srgb, var(--md-sys-color-shadow) 10%, transparent);
      }

      :host(:hover) article,
      :host(:focus-within) article {
        border-color: color-mix(in srgb, var(--md-sys-color-primary) 45%, var(--wy-artwork-card-outline));
        box-shadow: 0 10px 20px color-mix(in srgb, var(--md-sys-color-shadow) 12%, transparent);
      }

      :host([interactive]):hover article {
        transform: translateY(-2px);
      }

      :host([selected]) article {
        border-color: var(--wy-artwork-card-selected-ring);
        box-shadow:
          0 0 0 2px color-mix(in srgb, var(--wy-artwork-card-selected-ring) 60%, transparent),
          0 10px 20px color-mix(in srgb, var(--md-sys-color-shadow) 12%, transparent);
      }

      .surface {
        position: relative;
        width: 100%;
        border: 0;
        background: transparent;
        color: inherit;
        padding: 0;
        margin: 0;
        display: block;
        text-align: left;
        cursor: pointer;
      }

      :host(:not([interactive])) .surface {
        cursor: default;
      }

      .surface:focus-visible {
        outline: 2px solid var(--md-sys-color-primary);
        outline-offset: -2px;
      }

      .media {
        position: relative;
        width: 100%;
        aspect-ratio: var(--wy-artwork-card-aspect, 4 / 5);
        background: var(--wy-artwork-card-placeholder-bg);
        overflow: hidden;
      }

      .media.loading::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--md-sys-color-surface-container-high) 75%, transparent) 20%,
            color-mix(in srgb, var(--md-sys-color-surface-container-highest) 95%, transparent) 50%,
            color-mix(in srgb, var(--md-sys-color-surface-container-high) 75%, transparent) 80%
          );
        background-size: 220% 100%;
        animation: shimmer 1.4s linear infinite;
        z-index: 1;
      }

      .media.selected::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--wy-artwork-card-selected-overlay);
        pointer-events: none;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: var(--wy-artwork-card-object-position, 50% 50%);
        display: block;
        transition: transform 220ms ease;
      }

      :host([interactive]):hover img {
        transform: scale(1.03);
      }

      .placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle, var(--wy-artwork-card-placeholder-pattern) 1px, transparent 1px) 0 0 / 18px 18px,
          var(--wy-artwork-card-placeholder-bg);
        color: var(--md-sys-color-on-surface-variant);
      }

      .placeholder-badge {
        width: 72px;
        height: 72px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 25%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-surface-container-high) 85%, transparent);
        font-family: var(--font-serif, 'Playfair Display', serif);
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: -0.02em;
      }

      .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        right: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 3;
        opacity: 0;
        transform: translateY(-4px);
        transition: opacity 160ms ease, transform 160ms ease;
        pointer-events: none;
      }

      .controls-left,
      .controls-right {
        display: flex;
        gap: 8px;
        pointer-events: auto;
      }

      :host(:hover) .controls,
      :host(:focus-within) .controls,
      :host([selected]) .controls {
        opacity: 1;
        transform: translateY(0);
      }

      .select {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        min-height: 40px;
        position: relative;
      }

      .select-input {
        position: absolute;
        inset: 0;
        margin: 0;
        opacity: 0;
        cursor: pointer;
      }

      .select-visual,
      .favorite {
        width: 30px;
        height: 30px;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, white 72%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-scrim) 46%, transparent);
        color: var(--md-sys-color-inverse-on-surface, var(--wy-artwork-card-control-fg));
        backdrop-filter: blur(10px);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease, opacity 140ms ease;
        box-sizing: border-box;
        opacity: 0.62;
      }

      .favorite {
        appearance: none;
        cursor: pointer;
        padding: 0;
        font: inherit;
        font-size: 1rem;
        line-height: 1;
      }

      .favorite-glyph {
        display: inline-block;
        transform: translateY(-0.5px);
        font-size: 18px;
        line-height: 1;
        font-variation-settings: 'FILL' 0, 'wght' 500, 'opsz' 20;
      }

      .favorite:hover,
      .select:hover .select-visual {
        background: color-mix(in srgb, var(--md-sys-color-scrim) 52%, transparent);
        transform: translateY(-1px);
        opacity: 1;
      }

      .favorite:focus-visible,
      .select-input:focus-visible + .select-visual {
        outline: 2px solid var(--md-sys-color-primary);
        outline-offset: 2px;
      }

      .select-input:checked + .select-visual {
        background: color-mix(in srgb, var(--md-sys-color-primary) 85%, transparent);
        border-color: var(--md-sys-color-primary);
        opacity: 1;
      }

      .select-visual {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        border-width: 2px;
      }

      .select-check {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 120ms ease, transform 120ms ease;
        font-size: 16px;
        line-height: 1;
        color: var(--md-sys-color-on-primary);
        font-weight: 700;
        font-variation-settings: 'FILL' 1, 'wght' 600, 'opsz' 20;
      }

      .select-input:checked + .select-visual .select-check {
        opacity: 1;
        transform: scale(1);
      }

      .favorite[data-active='true'] {
        color: color-mix(in srgb, var(--wy-artwork-card-favorite-active) 88%, white);
        border-color: color-mix(in srgb, white 68%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-scrim) 48%, transparent);
        opacity: 1;
      }

      .favorite[data-active='true'] .favorite-glyph {
        font-variation-settings: 'FILL' 1, 'wght' 600, 'opsz' 20;
      }

      .status-chip {
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--wy-artwork-card-status-border);
        background: var(--wy-artwork-card-status-bg);
        color: var(--wy-artwork-card-status-fg);
        font-family: var(--font-body, 'DM Sans', sans-serif);
        font-size: 0.7rem;
        line-height: 1;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        backdrop-filter: blur(6px);
      }

      .status-chip.meta-pill-variant {
        border: 1px solid white;
        background: var(--wy-artwork-card-meta-chip-bg);
        font-size: 0.6rem;
        color: var(--wy-artwork-card-meta-fg);
      }

      .meta-pill {
        position: absolute;
        left: 50%;
        bottom: 14px;
        transform: translateX(-50%) translateY(8px);
        z-index: 4;
        width: calc(100% - 28px);
        max-width: 95%;
        opacity: 0;
        transition: opacity 180ms ease, transform 180ms ease;
        pointer-events: none;
        border-radius: 8px;
        backdrop-filter: blur(40px) saturate(1.15);
        -webkit-backdrop-filter: blur(40px) saturate(1.15);
      }

      :host(:hover) .meta-pill,
      :host(:focus-within) .meta-pill {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      .meta-surface {
        --wy-artwork-card-meta-fg: var(--md-sys-color-on-surface);
        --wy-artwork-card-meta-muted: var(--md-sys-color-on-surface-variant);
        --wy-artwork-card-meta-chip-bg: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 22%, transparent);
        --wy-artwork-card-meta-scrim: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 20%, transparent);
        border-radius: 8px;
        background: transparent;
        color: var(--wy-artwork-card-meta-fg);
        box-shadow: 0 8px 18px color-mix(in srgb, var(--md-sys-color-shadow) 12%, transparent);
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        min-width: 0;
        position: relative;
      }

      .meta-surface[data-tone='dark-bg'] {
        --wy-artwork-card-meta-fg: var(--md-sys-color-inverse-on-surface, var(--md-sys-color-on-surface));
        --wy-artwork-card-meta-muted: color-mix(in srgb, var(--md-sys-color-inverse-on-surface, var(--md-sys-color-on-surface)) 82%, transparent);
        --wy-artwork-card-meta-chip-bg: color-mix(in srgb, var(--md-sys-color-scrim) 16%, transparent);
        --wy-artwork-card-meta-scrim: color-mix(in srgb, var(--md-sys-color-scrim) 14%, transparent);
      }

      .meta-surface[data-tone='light-bg'] {
        --wy-artwork-card-meta-fg: var(--md-sys-color-on-surface);
        --wy-artwork-card-meta-muted: var(--md-sys-color-on-surface-variant);
        --wy-artwork-card-meta-chip-bg: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 22%, transparent);
        --wy-artwork-card-meta-scrim: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 20%, transparent);
      }

      .meta-surface::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--wy-artwork-card-meta-scrim);
        pointer-events: none;
      }

      .meta-surface > * {
        position: relative;
        z-index: 1;
      }

      .meta-status-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        max-width: 100%;
      }

      .meta-main-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        min-width: 0;
        width: 100%;
        max-width: 100%;
      }

      .title {
        font-family: var(--font-body, 'DM Sans', sans-serif);
        font-weight: 600;
        font-size: 0.95rem;
        line-height: 1.1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1 1 auto;
        min-width: 0;
      }

      .meta-text {
        display: flex;
        gap: 4px;
        align-items: center;
        min-width: 0;
        max-width: 100%;
        color: var(--wy-artwork-card-meta-muted);
        font-family: var(--font-body, 'DM Sans', sans-serif);
        font-size: 0.75rem;
        line-height: 1.1;
        white-space: nowrap;
        flex: 0 0 auto;
      }

      .meta-text span {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @media (prefers-reduced-motion: reduce) {
        article,
        .controls,
        .meta-pill,
        img,
        .favorite,
        .select-visual {
          transition: none;
          animation: none;
        }
      }

      @keyframes shimmer {
        from { background-position: 200% 0; }
        to { background-position: -20% 0; }
      }
    `;

    willUpdate(changed) {
        if (changed.has('imageSrc')) {
            this._imageFailed = false;
            this._metaTone = 'light-bg';
        }
    }

    updated(changed) {
        if (changed.has('imageAspectRatio') && this.imageAspectRatio) {
            this.style.setProperty('--wy-artwork-card-aspect', this.imageAspectRatio);
        }
        if (changed.has('imageObjectPosition')) {
            this.style.setProperty('--wy-artwork-card-object-position', this.imageObjectPosition || '50% 50%');
        }
    }

    get _label() {
        return this.title || this.workId || 'Untitled';
    }

    get _variantLabel() {
        const count = Number.isFinite(this.variantCount) ? this.variantCount : 0;
        return `${count} ${count === 1 ? 'Variant' : 'Variants'}`;
    }

    get _statusList() {
        if (Array.isArray(this.statusLabels) && this.statusLabels.length) {
            return this.statusLabels.filter(Boolean);
        }
        return this.status ? [this.status] : [];
    }

    _emit(name, detail) {
        this.dispatchEvent(new CustomEvent(name, {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    _onOpenClick() {
        if (!this.interactive) return;
        this._emit('wy-artwork-card-open', { workId: this.workId });
    }

    _onOpenKeydown(event) {
        if (!this.interactive) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._emit('wy-artwork-card-open', { workId: this.workId });
        }
    }

    _onFavoriteClick(event) {
        event.stopPropagation();
        if (!this.interactive) return;
        const nextFavorite = !this.favorite;
        this._emit('wy-artwork-card-toggle-favorite', {
            workId: this.workId,
            nextFavorite
        });
    }

    _onSelectClick(event) {
        event.stopPropagation();
        if (!this.interactive) return;
        const input = event.currentTarget;
        this._emit('wy-artwork-card-toggle-select', {
            workId: this.workId,
            nextSelected: input.checked,
            shiftKey: Boolean(event.shiftKey),
            metaKey: Boolean(event.metaKey),
            ctrlKey: Boolean(event.ctrlKey)
        });
    }

    _onSelectChange(event) {
        event.stopPropagation();
    }

    _updateMetaToneFromImage(imgEl) {
        try {
            if (!imgEl || !imgEl.naturalWidth || !imgEl.naturalHeight) {
                return;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            canvas.width = 24;
            canvas.height = 24;

            const sw = imgEl.naturalWidth;
            const sh = imgEl.naturalHeight;
            const cropW = Math.max(1, sw * 0.72);
            const cropH = Math.max(1, sh * 0.22);
            const sx = Math.max(0, (sw - cropW) / 2);
            const sy = Math.max(0, Math.min(sh - cropH, sh * 0.64));

            ctx.drawImage(imgEl, sx, sy, cropW, cropH, 0, 0, canvas.width, canvas.height);
            const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

            let weightedLuminance = 0;
            let alphaWeight = 0;
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3] / 255;
                if (alpha <= 0) continue;
                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;
                const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                weightedLuminance += luminance * alpha;
                alphaWeight += alpha;
            }

            if (alphaWeight === 0) return;
            const avgLuminance = weightedLuminance / alphaWeight;
            this._metaTone = avgLuminance > 0.58 ? 'light-bg' : 'dark-bg';
        } catch {
            // Cross-origin images can taint canvas; default to dark text for safer light-card readability.
            this._metaTone = 'light-bg';
        }
    }

    _onImageLoad(event) {
        this._updateMetaToneFromImage(event?.currentTarget);
        this._emit('wy-artwork-card-image-load', {
            workId: this.workId,
            src: this.imageSrc
        });
    }

    _onImageError() {
        this._imageFailed = true;
        this._emit('wy-artwork-card-image-error', {
            workId: this.workId,
            src: this.imageSrc
        });
    }

    render() {
        const hasImage = Boolean(this.imageSrc) && !this.noImage && !this._imageFailed;
        const showLoading = Boolean(this.loading) && !this.noImage && !this._imageFailed;
        const statusList = this._statusList;
        const label = this._label;
        const primaryMeta = this.metaPrimary || this._variantLabel;
        const showVariantMeta = Number(this.variantCount) >= 2 && Boolean(primaryMeta);

        return html`
          <article part="container" aria-selected=${String(this.selected)}>
            <div class="controls" part="controls">
              <div class="controls-left">
                <label class="select" aria-label="Select ${label}">
                  <input
                    class="select-input"
                    type="checkbox"
                    ?checked=${this.selected}
                    ?disabled=${!this.interactive}
                    aria-label="Select ${label}"
                    @click=${this._onSelectClick}
                    @change=${this._onSelectChange}
                  >
                  <span class="select-visual" aria-hidden="true">
                    <span class="material-symbols-outlined select-check">check</span>
                  </span>
                </label>
              </div>
              <div class="controls-right">
                <button
                  class="favorite"
                  type="button"
                  ?disabled=${!this.interactive}
                  data-active=${String(this.favorite)}
                  aria-label=${this.favorite ? 'Remove from favorites' : 'Add to favorites'}
                  aria-pressed=${String(this.favorite)}
                  @click=${this._onFavoriteClick}
                >
                  <span class="material-symbols-outlined favorite-glyph" aria-hidden="true">favorite</span>
                </button>
              </div>
            </div>

            <div
              class="surface"
              role=${this.interactive ? 'button' : 'img'}
              tabindex=${this.interactive ? '0' : '-1'}
              aria-label=${this.interactive ? `Open ${label}` : label}
              @click=${this._onOpenClick}
              @keydown=${this._onOpenKeydown}
              part="surface"
            >
              <div class="media ${showLoading ? 'loading' : ''} ${this.selected ? 'selected' : ''}" part="media">
                ${hasImage ? html`
                  <img
                    src=${this.imageSrc}
                    alt=${this.imageAlt || label}
                    loading="lazy"
                    decoding="async"
                    @load=${this._onImageLoad}
                    @error=${this._onImageError}
                    part="image"
                  >
                ` : ''}

                ${!hasImage ? html`
                  <div class="placeholder" part="placeholder">
                    <div class="placeholder-badge" aria-hidden="true">
                      ${(label || 'WY').slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                ` : ''}

                <div class="meta-pill" part="meta-pill">
                  <div class="meta-surface" data-tone=${this._metaTone}>
                    ${statusList.length ? html`
                      <div class="meta-status-row" part="status-row">
                        ${statusList.map((item) => html`<span class="status-chip meta-pill-variant" part="status-chip">${item}</span>`)}
                      </div>
                    ` : ''}
                    <div class="meta-main-row" part="meta-main-row">
                      <div class="title" title=${label}>${label}</div>
                      ${showVariantMeta ? html`
                        <div class="meta-text">
                          <span title=${primaryMeta}>${primaryMeta}</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        `;
    }
}

customElements.define('wy-artwork-card', WyArtworkCard);
