import config from './vite.config'
import {resolve} from 'path'

export default Object.assign(config, {
  build: {
    ssr: true,
    ssrManifest: true,
    outDir: '../../dist/server',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.tsx'),
      },
      external: [
        'react',
        'excel-wasm'
      ]
    }
  }
})
