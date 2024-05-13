import { fileURLToPath, URL } from 'node:url'

// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
// import VueDevTools from 'vite-plugin-vue-devtools'
import veauryVitePlugins from 'veaury/vite/index.js'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    // vueJsx(),
    // VueDevTools(),
    splitVendorChunkPlugin(),
    visualizer({
      filename: './bundle-analysis.html'
    }),
    veauryVitePlugins({
      type: 'vue'
    })
  ],
  server: {
    port: 8803
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-common-lib': ['vue', 'vue-router', 'pinia'],
          'react-common-lib': ['react', 'react-dom', '@glideapps/glide-data-grid']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
