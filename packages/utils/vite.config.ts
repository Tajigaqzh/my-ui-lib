import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../../dist/utils'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyUIUtils',
      fileName: (format) => `index.${format}.js`
    }
  }
})
