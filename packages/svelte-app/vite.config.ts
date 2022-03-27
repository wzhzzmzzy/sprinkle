import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    svelte({
      compilerOptions: {
        hydratable: true
      }
    }),
  ],
  optimizeDeps: {
    exclude: ["svelte-navigator"]
  },
  server: {
    middlewareMode: 'ssr'
  },
  build: {
    outDir: '../../dist/client',
  }
})
