/**
 * m3-design-v2 Web Components Entry Point
 *
 * This file exports all custom web components for CDN consumption.
 * Import this file to register all wy-* custom elements.
 *
 * Usage via CDN:
 *   import 'https://cdn.jsdelivr.net/gh/mwyuwono/m3-design-v2@main/dist/web-components.js';
 *
 * Or with ES modules:
 *   import 'm3-design-v2/dist/web-components.js';
 */

// Material Web Components (required dependencies)
import '@material/web/icon/icon.js';
import '@material/web/switch/switch.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/input-chip.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/tabs/secondary-tab.js';
import '@material/web/dialog/dialog.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/progress/linear-progress.js';

// Material Web Labs Components
import '@material/web/labs/card/elevated-card.js';
import '@material/web/labs/card/filled-card.js';
import '@material/web/labs/card/outlined-card.js';

// Custom wy-* Components
import './components/wy-filter-chip.js';
import './components/wy-controls-bar.js';
// Note: wy-toast excluded - consumers may want custom duration/styling
import './components/wy-modal.js';
import './components/wy-tabs.js';
import './components/wy-tag-chip.js';
import './components/wy-tag-input.js';
import './components/wy-form-field.js';
import './components/wy-dropdown.js';
import './components/wy-info-panel.js';
import './components/wy-selection-card.js';
import './components/wy-prompt-card.js';
import './components/wy-prompt-modal.js';
import './components/wy-export-modal.js';
import './components/wy-links-modal.js';
import './components/wy-logo.js';
import './components/wy-app-bar.js';
import './components/wy-library-header.js';

// Profile/Project components (optional - used by family office site)
import './components/wy-profile-card.js';
import './components/wy-bio-card.js';
import './components/wy-project-list.js';
import './components/wy-metric-card.js';
import './components/wy-allocation-card.js';
import './components/wy-insight-card.js';
import './components/wy-work-card.js';
import './components/wy-works-grid.js';
import './components/wy-plot-card.js';
import './components/wy-backup-status.js';

console.log('[m3-design-v2] Web components registered');
