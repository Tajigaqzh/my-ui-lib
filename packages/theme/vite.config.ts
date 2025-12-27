import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    resolve: {
        alias: [
            { find: /^~\/?/, replacement: `${resolve(__dirname, 'src')}/` },
            { find: /^@\/?/, replacement: `${resolve(__dirname, 'src')}/` }
        ]
    },
    build: {
        outDir: resolve(__dirname, '../../dist/theme'),
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MyUITheme',
            fileName: (format) => `index.${format}.js`
        }
    }
})