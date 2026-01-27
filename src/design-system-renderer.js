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
      console.warn(`DesignSystemRenderer: Component ${componentName} not found in components.json`);
      container.innerHTML = `<p style="color: var(--md-sys-color-error); font-size: 0.875rem;">Component ${componentName} not found</p>`;
      return;
    }

    // Find the example (fallback to first example if not found)
    let example = component.examples.find(e => e.name === exampleName);
    if (!example && component.examples.length > 0) {
      console.warn(`DesignSystemRenderer: Example "${exampleName}" not found for ${componentName}, using first example`);
      example = component.examples[0];
    }

    if (!example) {
      console.warn(`DesignSystemRenderer: No examples found for ${componentName}`);
      container.innerHTML = `<p style="color: var(--md-sys-color-error); font-size: 0.875rem;">No examples found for ${componentName}</p>`;
      return;
    }

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

    // Execute initialization scripts after a short delay
    if (scriptContent) {
      setTimeout(() => {
        try {
          // Create a function context for the script
          const scriptFunc = new Function(scriptContent);
          scriptFunc();
        } catch (e) {
          console.warn(`DesignSystemRenderer: Error executing script for ${componentName} example "${exampleName}":`, e);
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
    
    for (const container of containers) {
      const componentName = container.getAttribute('data-component');
      const exampleName = container.getAttribute('data-example') || 'Basic';
      
      await this.renderComponentExample(componentName, exampleName, container);
    }
  }
}

export default DesignSystemRenderer;
