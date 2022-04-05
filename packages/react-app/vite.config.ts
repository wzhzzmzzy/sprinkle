import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    middlewareMode: 'ssr'
  },
  build: {
    outDir: '../../dist/client',
  }
})
