import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    // Library mode configuration for web components bundle
    lib: {
      entry: resolve(__dirname, 'src/web-components.js'),
      name: 'm3DesignComponents',
      fileName: 'web-components',
      formats: ['es'] // ES module format for modern browsers
    },
    rollupOptions: {
      // Bundle all dependencies for self-contained local use
    },
    // Output to dist folder
    outDir: 'dist',
    // Generate source maps for debugging
    sourcemap: true,
    // Don't empty outDir (preserve index.html etc)
    emptyOutDir: false
  }
})
