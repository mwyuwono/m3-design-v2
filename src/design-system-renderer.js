/**
 * Design System Renderer
 * 
 * Renders component examples from components.json into design-system.html
 */

import componentsData from './data/components.json';

class DesignSystemRenderer {
  constructor() {
    this.components = componentsData.components;
  }

  /**
   * Render a specific example for a component into a container
   * @param {string} componentName - Component name (e.g., 'wy-library-header')
   * @param {string} exampleName - Example name (e.g., 'Basic')
   * @param {HTMLElement} container - Container element to render into
   */
  async renderComponentExample(componentName, exampleName, container) {
    if (!container) {
      console.warn(`DesignSystemRenderer: Container not found for ${componentName}`);
      return;
    }

    const component = this.components.find(c => c.name === componentName);
    if (!component) {
      console.error(`[DesignSystemRenderer] Component ${componentName} not found in components.json`);
      console.log('[DesignSystemRenderer] Available components:', this.components.map(c => c.name));
      container.innerHTML = `<p style="color: var(--md-sys-color-error); font-size: 0.875rem;">Component ${componentName} not found</p>`;
      return;
    }

    // Find the example (fallback to first example if not found)
    let example = component.examples.find(e => e.name === exampleName);
    if (!example && component.examples.length > 0) {
      console.warn(`[DesignSystemRenderer] Example "${exampleName}" not found for ${componentName}, using first example`);
      console.log(`[DesignSystemRenderer] Available examples for ${componentName}:`, component.examples.map(e => e.name));
      example = component.examples[0];
    }

    if (!example) {
      console.error(`[DesignSystemRenderer] No examples found for ${componentName}`);
      container.innerHTML = `<p style="color: var(--md-sys-color-error); font-size: 0.875rem;">No examples found for ${componentName}</p>`;
      return;
    }
    
    console.log(`[DesignSystemRenderer] Rendering example "${example.name}" for ${componentName}`);

    // Wait for component to be registered
    try {
      await customElements.whenDefined(componentName);
    } catch (e) {
      // Component might not be a custom element, continue anyway
      console.warn(`DesignSystemRenderer: Could not verify registration of ${componentName}:`, e);
    }

    // Extract component HTML and script content
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

    // For modal components, remove 'open' attribute (they should be closed by default)
    const isModal = componentName.includes('modal');
    if (isModal) {
      // Generate unique ID for this modal instance
      let modalId = `${componentName}-ds-${Date.now()}`;
      const modalIdMatch = componentHTML.match(/id=["']([^"']+)["']/);
      if (modalIdMatch) {
        modalId = modalIdMatch[1];
      } else {
        // Add unique ID if not present
        componentHTML = componentHTML.replace(/<(\w+-modal)/, `<$1 id="${modalId}"`);
      }

      // Remove 'open' attribute
      componentHTML = componentHTML.replace(/\s+open(?=\s|>)/g, '');
      componentHTML = componentHTML.replace(/\s+open=["']true["']/g, '');
      componentHTML = componentHTML.replace(/\s+open=["']false["']/g, '');
    }

    // Render the component HTML
    container.innerHTML = componentHTML;
    console.log(`[DesignSystemRenderer] Rendered HTML for ${componentName}, length: ${componentHTML.length}`);

    // Execute initialization scripts after a short delay
    if (scriptContent) {
      console.log(`[DesignSystemRenderer] Executing script for ${componentName}`);
      setTimeout(() => {
        try {
          // Create a function context for the script
          const scriptFunc = new Function(scriptContent);
          scriptFunc();
          console.log(`[DesignSystemRenderer] Script executed successfully for ${componentName}`);
        } catch (e) {
          console.error(`[DesignSystemRenderer] Error executing script for ${componentName} example "${exampleName}":`, e);
        }
      }, 100);
    }
  }

  /**
   * Initialize all component examples in the page
   * Looks for elements with data-component attribute
   */
  async init() {
    const containers = document.querySelectorAll('[data-component]');
    console.log(`[DesignSystemRenderer] Found ${containers.length} containers to render`);
    
    for (const container of containers) {
      const componentName = container.getAttribute('data-component');
      const exampleName = container.getAttribute('data-example') || 'Basic';
      console.log(`[DesignSystemRenderer] Rendering ${componentName} - ${exampleName}`);
      
      await this.renderComponentExample(componentName, exampleName, container);
    }
    
    console.log('[DesignSystemRenderer] Initialization complete');
  }
}

export default DesignSystemRenderer;
