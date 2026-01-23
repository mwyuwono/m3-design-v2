import './styles/tokens.css';
import './styles/main.css';

// Component Imports
// Standard MWC (Buttons, Icons, etc.)
import '@material/web/all.js';

// Labs Components
import '@material/web/labs/card/elevated-card.js';
import '@material/web/labs/card/filled-card.js';
import '@material/web/labs/card/outlined-card.js';

// Custom Components
import './components/wy-profile-card.js';
import './components/wy-bio-card.js';
import './components/wy-project-list.js';
import './components/wy-metric-card.js';
import './components/wy-allocation-card.js';
import './components/wy-insight-card.js';
import './components/wy-form-field.js';
import './components/wy-tag-chip.js';
import './components/wy-filter-chip.js';
import './components/wy-tag-input.js';
import './components/wy-category-select.js';
import './components/wy-selection-card.js';
import './components/wy-modal.js';
import './components/wy-library-header.js';
import './components/wy-work-card.js';
import './components/wy-works-grid.js';
import './components/wy-plot-card.js';
import './components/wy-export-modal.js';
import './components/wy-backup-status.js';

// Data Imports
import profiles from './data/profiles.json';
import projects from './data/projects.json';

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // LANDING PAGE LOGIC
    // ======================================================
    const grid = document.getElementById('profiles-grid');
    if (grid) {
        Object.values(profiles).forEach(profile => {
            const card = document.createElement('wy-profile-card');
            card.name = profile.name;
            card.role = profile.role;
            card.photo = profile.photo;
            card.profileId = profile.id;
            grid.appendChild(card);
        });
    }

    // ======================================================
    // PROFILE PAGE LOGIC (Modular)
    // ======================================================
    const profileContainer = document.getElementById('profile-modules-container');
    if (profileContainer) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const profile = profiles[id];

        if (profile) {
            document.title = `${profile.name} | Weaver-Yuwono`;

            if (profile.modules) {
                profile.modules.forEach(mod => {
                    if (mod.type === 'bio-card') {
                        const el = document.createElement('wy-bio-card');
                        el.name = profile.name;
                        el.role = profile.role;
                        el.photo = profile.photo;
                        el.bio = mod.data.bio;
                        profileContainer.appendChild(el);
                    } else if (mod.type === 'project-list') {
                        const el = document.createElement('wy-project-list');
                        el.filter = mod.filter;
                        el.title = mod.title || 'Projects';
                        profileContainer.appendChild(el);
                    }
                });
            }
        } else {
            profileContainer.innerHTML = '<div style="text-align:center; padding: 40px;"><h2>Profile not found</h2><p>Please return to the <a href="/">homepage</a>.</p></div>';
        }
    }

    // ======================================================
    // PROJECT DETAIL PAGE LOGIC
    // ======================================================
    const projectContainer = document.getElementById('project-detail-container');
    if (projectContainer) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const project = projects.find(p => p.id === id); // Array find

        if (project) {
            document.title = `${project.title} | Projects`;

            // Render Hero
            const heroHTML = `
           <div class="project-hero">
              <img src="${project.image}" alt="${project.title}">
              <div class="hero-text">
                 <span class="label-overline" style="color:white; opacity:0.9; margin-bottom:16px; display:block;">${project.category}</span>
                 <h1 style="font-size: 3.5rem; color: white;">${project.title}</h1>
              </div>
           </div>
        `;

            // Render Content (Mocking modular content for now)
            const contentHTML = `
           <div class="project-content">
              <p class="lead" style="font-size: 1.5rem; margin-bottom: 40px; color: var(--md-sys-color-on-surface);">${project.summary}</p>
              
              <div style="font-size: 1.125rem; color: var(--md-sys-color-on-surface-variant); line-height: 1.8;">
                 <p>This project represents the Weaver-Yuwono commitment to excellence in ${project.category}. Detailed financial reports and architectural plans are available for authenticated family members.</p>
                 
                 <h3 style="margin-top: 40px; font-family: var(--font-display);">Investment Thesis</h3>
                 <p>Driven by long-term demographic shifts and sustainable infrastructure needs, this asset class provides steady yield with significant appreciation potential over a 20-year horizon.</p>
                 
                 <div style="margin-top: 60px;">
                    <md-outlined-button icon="download">Download Prospectus (PDF)</md-outlined-button>
                 </div>
              </div>
           </div>
        `;

            projectContainer.innerHTML = heroHTML + contentHTML;

        } else {
            projectContainer.innerHTML = '<div style="text-align:center; padding: 40px;"><h2>Project not found</h2></div>';
        }
    }

});
