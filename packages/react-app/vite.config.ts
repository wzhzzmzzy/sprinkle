import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  server: {
    middlewareMode: 'ssr'
  },
  build: {
    outDir: '../../dist/client',
  },
})