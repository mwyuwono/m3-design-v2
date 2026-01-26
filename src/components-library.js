/**
 * Component Library Renderer
 * 
 * Renders component documentation from components.json data
 */

import componentsData from './data/components.json';

class ComponentLibraryRenderer {
  constructor(container) {
    this.container = container;
    this.components = componentsData.components;
    this.categories = componentsData.categories;
    this.filteredComponents = [...this.components];
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.selectedComponent = null; // For individual component view
    this.scrollSpyActive = true; // Enable scroll spy for category highlighting
    this.scrollTimeout = null; // Debounce scroll events
    
    // Ensure container doesn't overflow
    if (this.container) {
      this.container.style.width = '100%';
      this.container.style.maxWidth = '100%';
      this.container.style.boxSizing = 'border-box';
    }
    
    // Handle URL hash for deep linking
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Set up scroll spy for category highlighting
    this.setupScrollSpy();
  }
  
  /**
   * Handle URL hash changes for navigation
   */
  handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) {
      this.selectedComponent = null;
      this.currentPage = 1;
      this.renderComponents();
      return;
    }
    
    // Check if it's a component name
    const component = this.components.find(c => c.name === hash);
    if (component) {
      this.selectedComponent = component.name;
      this.activeCategory = component.category;
      this.renderFilters();
      this.renderComponents();
      // Scroll to component after render
      setTimeout(() => {
        const componentEl = document.querySelector(`[data-component="${component.name}"]`);
        if (componentEl) {
          componentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Check if it's a category
      const categoryKey = Object.keys(this.categories).find(key => 
        this.categories[key].name.toLowerCase().replace(/\s+/g, '-') === hash
      );
      if (categoryKey) {
        this.selectedComponent = null;
        this.activeCategory = categoryKey;
        this.renderFilters();
        this.renderComponents();
        // Scroll to category section
        setTimeout(() => {
          this.scrollToCategory(categoryKey);
        }, 100);
      }
    }
  }

  /**
   * Initialize the component library
   */
  async init() {
    // Close any open modals first
    this.closeAllModals();
    
    this.renderNavigation();
    this.renderFilters();
    this.attachFilterListeners();
    this.renderComponents();
    
    // Update navigation when components change
    this.container.addEventListener('component-rendered', () => {
      this.renderNavigation();
    });
  }
  
  /**
   * Set up scroll spy to highlight active category in sidebar
   */
  setupScrollSpy() {
    // Throttled scroll handler
    const handleScroll = () => {
      if (!this.scrollSpyActive || this.selectedComponent) return;
      
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.updateActiveCategoryFromScroll();
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  /**
   * Update active category based on scroll position
   */
  updateActiveCategoryFromScroll() {
    // Don't update if viewing single component or searching
    if (this.selectedComponent || this.searchQuery) return;
    
    const categories = Object.keys(this.categories).sort((a, b) => 
      this.categories[a].order - this.categories[b].order
    );
    
    const scrollY = window.scrollY || window.pageYOffset;
    // Offset accounts for sticky header (60px) + padding (24px) + buffer (20px)
    const offset = 104;
    
    // Find which category section is currently in view
    for (let i = categories.length - 1; i >= 0; i--) {
      const categoryKey = categories[i];
      const categoryEl = document.querySelector(`[data-category="${categoryKey}"]`);
      
      if (categoryEl) {
        const rect = categoryEl.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        
        if (elementTop <= scrollY + offset) {
          if (this.activeCategory !== categoryKey) {
            this.activeCategory = categoryKey;
            this.renderNavigation();
          }
          return;
        }
      }
    }
    
    // If scrolled to top, show "all"
    if (scrollY < 200 && this.activeCategory !== 'all') {
      this.activeCategory = 'all';
      this.renderNavigation();
    }
  }
  
  /**
   * Scroll to a specific category section
   */
  scrollToCategory(categoryKey) {
    const categoryEl = document.querySelector(`[data-category="${categoryKey}"]`);
    if (categoryEl) {
      // Temporarily disable scroll spy to prevent interference
      this.scrollSpyActive = false;
      categoryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Re-enable scroll spy after scroll completes
      setTimeout(() => {
        this.scrollSpyActive = true;
        this.updateActiveCategoryFromScroll();
      }, 500);
    }
  }
  
  /**
   * Render navigation sidebar
   */
  renderNavigation() {
    const navContainer = document.getElementById('component-library-nav');
    if (!navContainer) return;
    
    // Use filtered components for navigation (respects search)
    const componentsToShow = this.searchQuery ? this.filteredComponents : this.components;
    
    // Group components by category
    const grouped = componentsToShow.reduce((acc, comp) => {
      const cat = this.categories[comp.category];
      const catName = cat ? cat.name : 'Other';
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(comp);
      return acc;
    }, {});
    
    const isAllActive = !this.selectedComponent && this.activeCategory === 'all' && !this.searchQuery;
    
    // Get all categories in order for navigation
    const allCategories = Object.entries(this.categories)
      .sort((a, b) => a[1].order - b[1].order);
    
    const componentCount = this.filteredComponents.length;
    const navHTML = `
      <nav class="component-nav" style="padding-right: 16px;">
        <!-- Search Input -->
        <div style="margin-bottom: 32px;">
          <div style="position: relative; width: 100%; margin-bottom: 16px;">
            <span class="material-symbols-outlined" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--md-sys-color-on-surface-variant); font-size: 20px; pointer-events: none;">search</span>
            <input 
              type="text" 
              id="component-search" 
              placeholder="Search components..." 
              value="${this.searchQuery || ''}"
              style="width: 100%; padding: 12px 16px 12px 48px; border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); background: var(--md-sys-color-surface); font-family: var(--font-body); font-size: 0.9375rem; color: var(--md-sys-color-on-surface); transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard); box-sizing: border-box;"
              onfocus="this.style.borderColor='var(--md-sys-color-primary)'; this.style.boxShadow='0 0 0 3px rgba(45, 78, 60, 0.1)'"
              onblur="this.style.borderColor='var(--md-sys-color-outline-variant)'; this.style.boxShadow='none'"
            >
          </div>
          <div style="display: flex; align-items: center; color: var(--md-sys-color-on-surface-variant); font-family: var(--font-body); font-size: 0.875rem; margin-bottom: 16px;">
            <span style="font-weight: 600; margin-right: 4px;">${componentCount}</span>
            <span>${componentCount === 1 ? 'component' : 'components'}</span>
          </div>
        </div>
        <div style="margin-bottom: 32px;">
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--md-sys-color-primary); margin: 0 0 16px 0; font-weight: 600;">
            Components
          </h3>
          <a href="#components" 
             onclick="event.preventDefault(); const renderer = window.componentLibraryRenderer; if (renderer) { renderer.activeCategory = 'all'; renderer.selectedComponent = null; window.location.hash = ''; renderer.renderFilters(); renderer.renderComponents(); window.scrollTo({ top: 0, behavior: 'smooth' }); } return false;"
             class="nav-link-all"
             style="display: block; padding: 8px 12px; border-radius: 8px; text-decoration: none; color: var(--md-sys-color-on-surface-variant); font-family: var(--font-body); font-size: 0.875rem; transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard); margin-bottom: 4px; ${isAllActive ? 'background: var(--md-sys-color-surface-variant); color: var(--md-sys-color-primary); font-weight: 600;' : ''}"
             onmouseover="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface-variant)'"
             onmouseout="if(!this.classList.contains('active')) this.style.background='transparent'">
            All Components
            <span style="float: right; opacity: 0.6; font-size: 0.6875rem;">${this.searchQuery ? this.filteredComponents.length : this.components.length}</span>
          </a>
        </div>
        ${allCategories.map(([categoryKey, categoryInfo]) => {
            const compsInCategory = componentsToShow.filter(c => c.category === categoryKey);
            const isActive = this.activeCategory === categoryKey && !this.selectedComponent;
            const categorySlug = categoryInfo.name.toLowerCase().replace(/\s+/g, '-');
            
            return `
              <div style="margin-bottom: 24px;">
                <a href="#${categorySlug}"
                   onclick="event.preventDefault(); const renderer = window.componentLibraryRenderer; if (renderer) { renderer.activeCategory = '${categoryKey}'; renderer.selectedComponent = null; window.location.hash = '${categorySlug}'; renderer.renderFilters(); renderer.renderComponents(); setTimeout(() => renderer.scrollToCategory('${categoryKey}'), 50); } return false;"
                   class="nav-link-category"
                   data-nav-category="${categoryKey}"
                   style="display: block; padding: 8px 12px; border-radius: 8px; text-decoration: none; color: var(--md-sys-color-on-surface); font-family: var(--font-display); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard); ${isActive ? 'background: var(--md-sys-color-primary-container); color: var(--md-sys-color-primary);' : ''}"
                   onmouseover="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface-variant)'"
                   onmouseout="if(!this.classList.contains('active')) this.style.background='${isActive ? 'var(--md-sys-color-primary-container)' : 'transparent'}'">
                  ${categoryInfo.name}
                  <span style="float: right; opacity: 0.6; font-size: 0.6875rem;">${compsInCategory.length}</span>
                </a>
                <div style="padding-left: 8px; max-height: ${compsInCategory.length > 10 ? '300px' : 'none'}; overflow-y: auto;">
                  ${compsInCategory.map(comp => {
                    const isSelected = this.selectedComponent === comp.name;
                    const isVisible = !this.searchQuery || this.filteredComponents.includes(comp);
                    return `
                      <a href="#${comp.name}"
                         onclick="event.preventDefault(); window.location.hash='${comp.name}'; return false;"
                         class="nav-link-component"
                         style="display: ${isVisible ? 'block' : 'none'}; padding: 6px 12px; border-radius: 6px; text-decoration: none; color: var(--md-sys-color-on-surface-variant); font-family: var(--font-body); font-size: 0.8125rem; transition: all var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-standard); margin-bottom: 2px; ${isSelected ? 'background: var(--md-sys-color-primary-container); color: var(--md-sys-color-primary); font-weight: 600;' : ''}"
                         onmouseover="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface-variant)'"
                         onmouseout="if(!this.classList.contains('active')) this.style.background='transparent'">
                        ${comp.title}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
      </nav>
    `;
    
    navContainer.innerHTML = navHTML;
    
    // Store reference for onclick handlers
    window.componentLibraryRenderer = this;
    
    // Re-attach search input listener after navigation renders
    this.attachSearchListener();
  }
  
  /**
   * Attach search input listener (called after navigation renders)
   */
  attachSearchListener() {
    const searchInput = document.getElementById('component-search');
    if (searchInput && !searchInput.dataset.listenerAttached) {
      searchInput.dataset.listenerAttached = 'true';
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.searchQuery = e.target.value;
          this.selectedComponent = null; // Clear selected component when searching
          // Reset to "all" category when searching
          if (this.searchQuery) {
            this.activeCategory = 'all';
          }
          window.location.hash = ''; // Clear hash
          this.renderFilters();
          this.renderComponents();
          this.renderNavigation(); // Re-render navigation to update counts
        }, 300);
      });
    }
  }

  /**
   * Close all modals on the page
   */
  closeAllModals() {
    // Wait for custom elements to be defined
    setTimeout(() => {
      document.querySelectorAll('wy-modal, wy-prompt-modal, wy-export-modal').forEach(modal => {
        if (modal.open !== undefined) {
          modal.open = false;
        }
      });
    }, 100);
  }

  /**
   * Render category filters (search moved to sidebar)
   */
  renderFilters() {
    const filtersHTML = `
      <div class="component-library-filters" style="margin-bottom: 64px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
          <span style="font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--md-sys-color-on-surface-variant); margin-right: 8px;">Filter:</span>
          <button 
            class="category-filter ${this.activeCategory === 'all' ? 'active' : ''}" 
            data-category="all"
            style="padding: 6px 16px; border-radius: 9999px; border: 1px solid var(--md-sys-color-outline-variant); background: ${this.activeCategory === 'all' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface)'}; color: ${this.activeCategory === 'all' ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface)'}; font-family: var(--font-body); font-size: 0.8125rem; font-weight: ${this.activeCategory === 'all' ? '600' : '500'}; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden;"
            onmouseover="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface-variant)'"
            onmouseout="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface)'"
          >
            All Components
          </button>
          ${Object.entries(this.categories)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([key, cat]) => `
              <button 
                class="category-filter ${this.activeCategory === key ? 'active' : ''}" 
                data-category="${key}"
                style="padding: 6px 16px; border-radius: 9999px; border: 1px solid var(--md-sys-color-outline-variant); background: ${this.activeCategory === key ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface)'}; color: ${this.activeCategory === key ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface)'}; font-family: var(--font-body); font-size: 0.8125rem; font-weight: ${this.activeCategory === key ? '600' : '500'}; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);"
                onmouseover="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface-variant)'"
                onmouseout="if(!this.classList.contains('active')) this.style.background='var(--md-sys-color-surface)'"
              >
                ${cat.name}
              </button>
            `).join('')}
        </div>
      </div>
    `;

    const filterContainer = document.getElementById('component-library-filters');
    if (filterContainer) {
      filterContainer.innerHTML = filtersHTML;
    }
  }

  /**
   * Filter components based on category and search query
   */
  filterComponents() {
    this.filteredComponents = this.components.filter(comp => {
      const matchesCategory = this.activeCategory === 'all' || comp.category === this.activeCategory;
      const matchesSearch = !this.searchQuery || 
        comp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        comp.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  /**
   * Render all components
   */
  renderComponents() {
    this.filterComponents();

    if (this.filteredComponents.length === 0) {
      this.container.innerHTML = `
        <div style="text-align: center; padding: 120px 20px; color: var(--md-sys-color-on-surface-variant);">
          <span class="material-symbols-outlined" style="font-size: 64px; opacity: 0.3; display: block; margin-bottom: 24px;">search_off</span>
          <p style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--md-sys-color-on-surface); margin: 0 0 8px 0;">No components found</p>
          <p style="font-size: 1rem; margin: 0; opacity: 0.7;">Try adjusting your search or filter criteria.</p>
        </div>
      `;
      this.renderPagination();
      return;
    }

    // If a specific component is selected, show only that component
    if (this.selectedComponent) {
      const component = this.filteredComponents.find(c => c.name === this.selectedComponent);
      if (component) {
        this.container.innerHTML = `
          <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <button onclick="window.location.hash=''; return false;" 
                      style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant); background: var(--md-sys-color-surface); color: var(--md-sys-color-primary); font-family: var(--font-body); font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s;"
                      onmouseover="this.style.background='var(--md-sys-color-surface-variant)'"
                      onmouseout="this.style.background='var(--md-sys-color-surface)'">
                <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
                Back
              </button>
              <span style="color: var(--md-sys-color-on-surface-variant); font-family: var(--font-body); font-size: 0.875rem;">/</span>
              <a href="#${component.category.toLowerCase().replace(/\s+/g, '-')}" 
                 onclick="event.preventDefault(); window.location.hash='${component.category.toLowerCase().replace(/\s+/g, '-')}'; return false;"
                 style="color: var(--md-sys-color-primary); text-decoration: none; font-family: var(--font-body); font-size: 0.875rem;">
                ${this.categories[component.category]?.name || component.category}
              </a>
            </div>
          </div>
          ${this.renderComponent(component)}
        `;
        this.initializeComponentExamples();
        setTimeout(() => {
          this.closeAllModals();
        }, 200);
        this.attachComponentListeners();
        this.renderPagination(); // Show back button
        return;
      }
    }

    // Show all filtered components (no pagination)
    const componentsToRender = this.filteredComponents;

    // Group components to render by category
    const grouped = componentsToRender.reduce((acc, comp) => {
      const cat = this.categories[comp.category];
      const catName = cat ? cat.name : 'Other';
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(comp);
      return acc;
    }, {});

    // Render each category
    const html = Object.entries(grouped)
      .sort((a, b) => {
        const orderA = this.categories[this.filteredComponents.find(c => this.categories[c.category]?.name === a[0])?.category]?.order || 999;
        const orderB = this.categories[this.filteredComponents.find(c => this.categories[c.category]?.name === b[0])?.category]?.order || 999;
        return orderA - orderB;
      })
      .map(([catName, comps]) => this.renderCategory(catName, comps))
      .join('');

    this.container.innerHTML = html;

    // Initialize component examples after rendering
    this.initializeComponentExamples();
    
    // Ensure all modals are closed after rendering
    setTimeout(() => {
      this.closeAllModals();
    }, 200);
    
    // Attach component-specific listeners after rendering
    this.attachComponentListeners();
    
    // Update navigation
    this.renderNavigation();
    
    // Update scroll spy after render
    setTimeout(() => {
      this.updateActiveCategoryFromScroll();
    }, 100);
    
    // Dispatch event to update navigation
    this.container.dispatchEvent(new CustomEvent('component-rendered'));
  }
  

  /**
   * Render a category section
   */
  renderCategory(catName, components) {
    const categoryInfo = Object.values(this.categories).find(cat => cat.name === catName);
    const categoryKey = Object.keys(this.categories).find(key => this.categories[key].name === catName);
    return `
      <div class="component-category" data-category="${categoryKey || ''}" style="margin-bottom: clamp(64px, 8vw, 96px); scroll-margin-top: 120px; width: 100%; max-width: 100%; box-sizing: border-box;">
        <div style="margin-bottom: clamp(32px, 5vw, 40px); padding-bottom: 20px; border-bottom: 2px solid var(--md-sys-color-outline-variant); width: 100%;">
          <h4 class="label-overline" style="margin-bottom: 8px; font-size: clamp(0.6875rem, 2vw, 0.75rem); text-transform: uppercase; letter-spacing: 0.15em; color: var(--md-sys-color-secondary); font-weight: 700;">
            ${catName}
          </h4>
          ${categoryInfo?.description ? `<p style="font-family: var(--font-body); font-size: clamp(0.875rem, 2vw, 0.9375rem); color: var(--md-sys-color-on-surface-variant); margin: 0; line-height: 1.6; max-width: 100%;">${categoryInfo.description}</p>` : ''}
          <div style="margin-top: 12px; font-family: var(--font-body); font-size: clamp(0.75rem, 2vw, 0.8125rem); color: var(--md-sys-color-on-surface-variant);">
            <span style="font-weight: 600;">${components.length}</span> ${components.length === 1 ? 'component' : 'components'}
          </div>
        </div>
        ${components.map(comp => this.renderComponent(comp)).join('')}
      </div>
    `;
  }

  /**
   * Render a single component
   */
  renderComponent(comp) {
    const statusBadge = comp.status === 'stable' ? '' : 
      `<span style="display: inline-block; padding: 3px 10px; border-radius: 6px; background: var(--md-sys-color-error-container); color: var(--md-sys-color-on-error-container); font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 12px;">${comp.status}</span>`;

    return `
      <div class="component-item" data-component="${comp.name}" style="margin-bottom: 64px; padding-bottom: 64px; border-bottom: 1px solid var(--md-sys-color-outline-variant); scroll-margin-top: 100px; width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden;">
        <div style="margin-bottom: 32px; width: 100%; max-width: 100%;">
          <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
            <h3 style="font-family: var(--font-serif); font-size: clamp(1.5rem, 4vw, 2rem); color: var(--md-sys-color-primary); margin: 0; line-height: 1.2; font-weight: 600; word-wrap: break-word;">
              ${comp.title}
            </h3>
            ${statusBadge}
          </div>
          <code style="display: inline-block; font-family: 'Monaco', 'Courier New', monospace; font-size: clamp(0.75rem, 2vw, 0.875rem); background: var(--md-sys-color-surface-container-high); padding: 6px 12px; border-radius: 6px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 16px; border: 1px solid var(--md-sys-color-outline-variant); word-break: break-all; max-width: 100%;">
            ${comp.name}
          </code>
          <p style="font-family: var(--font-body); font-size: clamp(0.9375rem, 2vw, 1rem); color: var(--md-sys-color-on-surface-variant); margin: 0; line-height: 1.7; max-width: 100%;">
            ${comp.description}
          </p>
        </div>

        ${comp.examples.length > 0 ? `
          <div class="component-examples" style="margin-bottom: 32px;">
            ${comp.examples.map((example, idx) => this.renderExample(comp, example, idx)).join('')}
          </div>
        ` : ''}

        ${comp.props && comp.props.length > 0 ? this.renderPropsTable(comp) : ''}
        ${comp.slots && comp.slots.length > 0 ? this.renderSlotsTable(comp) : ''}
        ${comp.events && comp.events.length > 0 ? this.renderEventsTable(comp) : ''}
        ${comp.methods && comp.methods.length > 0 ? this.renderMethodsTable(comp) : ''}
      </div>
    `;
  }

  /**
   * Render a component example
   */
  renderExample(comp, example, idx) {
    const exampleId = `${comp.name}-example-${idx}`;
    const previewId = `${exampleId}-preview`;
    const codeId = `${exampleId}-code`;

    return `
      <div class="component-example" style="margin-bottom: 48px; padding: clamp(16px, 4vw, 24px); background: var(--md-sys-color-surface-container-lowest); border-radius: 16px; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <h5 style="font-family: var(--font-display); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 600; color: var(--md-sys-color-on-surface); margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">
            ${example.name}
          </h5>
          <button 
            class="copy-code-btn" 
            data-code-id="${codeId}"
            style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant); background: var(--md-sys-color-surface); color: var(--md-sys-color-primary); font-family: var(--font-body); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 500; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); white-space: nowrap; flex-shrink: 0;"
            onmouseover="this.style.background='var(--md-sys-color-surface-variant)'; this.style.borderColor='var(--md-sys-color-primary)'"
            onmouseout="this.style.background='var(--md-sys-color-surface)'; this.style.borderColor='var(--md-sys-color-outline-variant)'"
          >
            <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
            <span class="copy-text">Copy Code</span>
          </button>
        </div>
        
        <div class="component-preview" id="${previewId}" style="background-color: var(--md-sys-color-surface-variant); padding: clamp(24px, 6vw, 48px); border-radius: 16px; margin-bottom: 20px; min-height: 120px; display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: center; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: auto; overflow-y: hidden;">
          <!-- Preview will be rendered here -->
        </div>

        <div class="code-block" style="position: relative; width: 100%; max-width: 100%; box-sizing: border-box;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-family: var(--font-display); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--md-sys-color-on-surface-variant);">Code</span>
          </div>
          <pre id="${codeId}" style="background: var(--md-sys-color-surface-container-high); padding: clamp(12px, 3vw, 20px); border-radius: 12px; overflow-x: auto; margin: 0; border: 1px solid var(--md-sys-color-outline-variant); max-height: 400px; overflow-y: auto; width: 100%; max-width: 100%; box-sizing: border-box;"><code style="font-family: 'Monaco', 'Courier New', monospace; font-size: clamp(0.75rem, 2vw, 0.8125rem); line-height: 1.7; color: var(--md-sys-color-on-surface); white-space: pre; display: block; word-break: break-word; overflow-wrap: break-word;">${this.escapeHtml(example.code)}</code></pre>
        </div>
      </div>
    `;
  }

  /**
   * Render props table
   */
  renderPropsTable(comp) {
    return `
      <div class="props-table" style="margin-bottom: 40px; padding: clamp(16px, 4vw, 24px); background: var(--md-sys-color-surface-container-lowest); border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box;">
        <h5 style="font-family: var(--font-display); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 600; color: var(--md-sys-color-on-surface); margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.08em;">
          Properties
        </h5>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
          <table style="width: 100%; min-width: 600px; border-collapse: collapse; font-family: var(--font-body); font-size: clamp(0.8125rem, 2vw, 0.875rem);">
            <thead>
              <tr style="border-bottom: 2px solid var(--md-sys-color-outline-variant);">
                <th style="text-align: left; padding: 12px 12px 12px 0; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Name</th>
                <th style="text-align: left; padding: 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Type</th>
                <th style="text-align: left; padding: 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Required</th>
                <th style="text-align: left; padding: 12px 0 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${comp.props.map((prop, idx) => `
                <tr style="border-bottom: 1px solid var(--md-sys-color-outline-variant); ${idx % 2 === 0 ? 'background: var(--md-sys-color-surface-container-low);' : ''}">
                  <td style="padding: 12px 12px 12px 0; white-space: nowrap;">
                    <code style="font-family: 'Monaco', 'Courier New', monospace; background: var(--md-sys-color-surface-container-high); padding: 4px 8px; border-radius: 4px; font-size: clamp(0.75rem, 2vw, 0.8125rem); border: 1px solid var(--md-sys-color-outline-variant); word-break: break-all;">${prop.name}</code>
                  </td>
                  <td style="padding: 12px 12px; color: var(--md-sys-color-on-surface-variant); white-space: nowrap;">
                    <code style="font-family: 'Monaco', 'Courier New', monospace; color: var(--md-sys-color-primary); font-weight: 500; font-size: clamp(0.75rem, 2vw, 0.8125rem);">${prop.type}</code>
                  </td>
                  <td style="padding: 12px 12px; color: var(--md-sys-color-on-surface-variant); white-space: nowrap;">
                    ${prop.required ? '<span style="color: #B3261E; font-weight: 600;">Yes</span>' : '<span style="opacity: 0.6;">No</span>'}
                  </td>
                  <td style="padding: 12px 0 12px 12px; color: var(--md-sys-color-on-surface-variant); line-height: 1.6; min-width: 200px;">
                    ${prop.description}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * Render slots table
   */
  renderSlotsTable(comp) {
    return `
      <div class="slots-table" style="margin-bottom: 40px; padding: clamp(16px, 4vw, 24px); background: var(--md-sys-color-surface-container-lowest); border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box;">
        <h5 style="font-family: var(--font-display); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 600; color: var(--md-sys-color-on-surface); margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.08em;">
          Slots
        </h5>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
          <table style="width: 100%; min-width: 400px; border-collapse: collapse; font-family: var(--font-body); font-size: clamp(0.8125rem, 2vw, 0.875rem);">
            <thead>
              <tr style="border-bottom: 2px solid var(--md-sys-color-outline-variant);">
                <th style="text-align: left; padding: 12px 12px 12px 0; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Name</th>
                <th style="text-align: left; padding: 12px 0 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${comp.slots.map((slot, idx) => `
                <tr style="border-bottom: 1px solid var(--md-sys-color-outline-variant); ${idx % 2 === 0 ? 'background: var(--md-sys-color-surface-container-low);' : ''}">
                  <td style="padding: 12px 12px 12px 0; white-space: nowrap;">
                    <code style="font-family: 'Monaco', 'Courier New', monospace; background: var(--md-sys-color-surface-container-high); padding: 4px 8px; border-radius: 4px; font-size: clamp(0.75rem, 2vw, 0.8125rem); border: 1px solid var(--md-sys-color-outline-variant); word-break: break-all;">${slot.name || 'default'}</code>
                  </td>
                  <td style="padding: 12px 0 12px 12px; color: var(--md-sys-color-on-surface-variant); line-height: 1.6; min-width: 200px;">
                    ${slot.description}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * Render events table
   */
  renderEventsTable(comp) {
    return `
      <div class="events-table" style="margin-bottom: 40px; padding: clamp(16px, 4vw, 24px); background: var(--md-sys-color-surface-container-lowest); border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box;">
        <h5 style="font-family: var(--font-display); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 600; color: var(--md-sys-color-on-surface); margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.08em;">
          Events
        </h5>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
          <table style="width: 100%; min-width: 500px; border-collapse: collapse; font-family: var(--font-body); font-size: clamp(0.8125rem, 2vw, 0.875rem);">
            <thead>
              <tr style="border-bottom: 2px solid var(--md-sys-color-outline-variant);">
                <th style="text-align: left; padding: 12px 12px 12px 0; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Name</th>
                <th style="text-align: left; padding: 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Detail</th>
                <th style="text-align: left; padding: 12px 0 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${comp.events.map((event, idx) => `
                <tr style="border-bottom: 1px solid var(--md-sys-color-outline-variant); ${idx % 2 === 0 ? 'background: var(--md-sys-color-surface-container-low);' : ''}">
                  <td style="padding: 12px 12px 12px 0; white-space: nowrap;">
                    <code style="font-family: 'Monaco', 'Courier New', monospace; background: var(--md-sys-color-surface-container-high); padding: 4px 8px; border-radius: 4px; font-size: clamp(0.75rem, 2vw, 0.8125rem); border: 1px solid var(--md-sys-color-outline-variant); word-break: break-all;">${event.name}</code>
                  </td>
                  <td style="padding: 12px 12px; color: var(--md-sys-color-on-surface-variant); white-space: nowrap;">
                    ${event.detail ? `<code style="font-family: 'Monaco', 'Courier New', monospace; color: var(--md-sys-color-primary); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 500;">${event.detail}</code>` : '<span style="opacity: 0.4;">-</span>'}
                  </td>
                  <td style="padding: 12px 0 12px 12px; color: var(--md-sys-color-on-surface-variant); line-height: 1.6; min-width: 200px;">
                    ${event.description}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * Render methods table
   */
  renderMethodsTable(comp) {
    return `
      <div class="methods-table" style="margin-bottom: 40px; padding: clamp(16px, 4vw, 24px); background: var(--md-sys-color-surface-container-lowest); border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); width: 100%; max-width: 100%; box-sizing: border-box;">
        <h5 style="font-family: var(--font-display); font-size: clamp(0.75rem, 2vw, 0.8125rem); font-weight: 600; color: var(--md-sys-color-on-surface); margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.08em;">
          Methods
        </h5>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
          <table style="width: 100%; min-width: 400px; border-collapse: collapse; font-family: var(--font-body); font-size: clamp(0.8125rem, 2vw, 0.875rem);">
            <thead>
              <tr style="border-bottom: 2px solid var(--md-sys-color-outline-variant);">
                <th style="text-align: left; padding: 12px 12px 12px 0; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Name</th>
                <th style="text-align: left; padding: 12px 0 12px 12px; font-weight: 600; color: var(--md-sys-color-on-surface); font-size: clamp(0.75rem, 2vw, 0.8125rem); text-transform: uppercase; letter-spacing: 0.05em;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${comp.methods.map((method, idx) => `
                <tr style="border-bottom: 1px solid var(--md-sys-color-outline-variant); ${idx % 2 === 0 ? 'background: var(--md-sys-color-surface-container-low);' : ''}">
                  <td style="padding: 12px 12px 12px 0; white-space: nowrap;">
                    <code style="font-family: 'Monaco', 'Courier New', monospace; background: var(--md-sys-color-surface-container-high); padding: 4px 8px; border-radius: 4px; font-size: clamp(0.75rem, 2vw, 0.8125rem); border: 1px solid var(--md-sys-color-outline-variant); word-break: break-all;">${method.name}</code>
                  </td>
                  <td style="padding: 12px 0 12px 12px; color: var(--md-sys-color-on-surface-variant); line-height: 1.6; min-width: 200px;">
                    ${method.description}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * Initialize component examples by rendering live previews
   */
  initializeComponentExamples() {
    this.filteredComponents.forEach(comp => {
      comp.examples.forEach((example, idx) => {
        const previewId = `${comp.name}-example-${idx}-preview`;
        const previewEl = document.getElementById(previewId);
        if (previewEl) {
          // Extract component HTML (everything before <script> tag if present)
          let componentHTML = example.code;
          let scriptContent = null;
          
          if (example.code.includes('<script>')) {
            const parts = example.code.split('<script>');
            componentHTML = parts[0].trim();
            const scriptMatch = example.code.match(/<script>([\s\S]*?)<\/script>/);
            if (scriptMatch) {
              scriptContent = scriptMatch[1].trim();
            }
          }
          
          // For modal components, remove 'open' attribute and add trigger button
          const isModal = comp.name.includes('modal');
          if (isModal) {
            // Generate unique ID for this modal instance
            let modalId = `${comp.name}-preview-${idx}`;
            const modalIdMatch = componentHTML.match(/id=["']([^"']+)["']/);
            if (modalIdMatch) {
              modalId = modalIdMatch[1];
            } else {
              // Add unique ID if not present
              componentHTML = componentHTML.replace(/<(\w+-modal)/, `<$1 id="${modalId}"`);
            }
            
            // Remove 'open' attribute (handle various formats)
            componentHTML = componentHTML.replace(/\s+open(?=\s|>)/g, '');
            componentHTML = componentHTML.replace(/\s+open=["']true["']/g, '');
            componentHTML = componentHTML.replace(/\s+open=["']false["']/g, '');
            
          // Add trigger button before the modal
          const triggerButton = `
            <md-filled-button onclick="document.getElementById('${modalId}').open = true" style="margin-bottom: 20px;">
              <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 8px;">open_in_new</span>
              Open ${comp.title}
            </md-filled-button>
          `;
          componentHTML = triggerButton + componentHTML;
          }
          
          // Render the component HTML
          previewEl.innerHTML = componentHTML;

          // Execute initialization scripts after a short delay to ensure components are ready
          if (scriptContent) {
            setTimeout(() => {
              try {
                // Create a function context for the script
                const scriptFunc = new Function(scriptContent);
                scriptFunc();
              } catch (e) {
                console.warn(`Error executing example script for ${comp.name} example ${idx}:`, e);
              }
            }, 100);
          }
        }
      });
    });
  }

  /**
   * Attach filter and search listeners (only once)
   */
  attachFilterListeners() {
    // Use event delegation for category filters (since they get re-rendered)
    const filterContainer = document.getElementById('component-library-filters');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-filter')) {
          this.activeCategory = e.target.dataset.category;
      this.selectedComponent = null; // Clear selected component when changing category
      window.location.hash = ''; // Clear hash
      this.renderFilters();
      this.renderComponents();
      // Scroll to category section
      setTimeout(() => {
        this.scrollToCategory(this.activeCategory);
      }, 50);
        }
      });
    }

    // Search input listener is now attached in renderNavigation() via attachSearchListener()
    // This method is kept for backward compatibility but search is handled in sidebar
  }

  /**
   * Attach event listeners for component-specific actions (called after each render)
   */
  attachComponentListeners() {
    // Copy code buttons (use event delegation on container)
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('copy-code-btn')) {
        const codeId = e.target.dataset.codeId;
        const codeEl = document.getElementById(codeId);
        if (codeEl) {
          const text = codeEl.textContent;
          navigator.clipboard.writeText(text).then(() => {
            const originalText = e.target.textContent;
            e.target.textContent = 'Copied!';
            setTimeout(() => {
              e.target.textContent = originalText;
            }, 2000);
          }).catch(err => {
            console.warn('Failed to copy:', err);
          });
        }
      }
    });
  }

  /**
   * Escape HTML for code display
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export default ComponentLibraryRenderer;
