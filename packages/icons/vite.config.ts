import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    resolve: {
        alias: [
            { find: /^~\/?/, replacement: `${resolve(__dirname, 'src')}/` },
            { find: /^@\/?/, replacement: `${resolve(__dirname, 'src')}/` }
        ]
    },
    plugins: [vue()],
    build: {
        outDir: resolve(__dirname, '../../dist/icons'),
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'MyUIIcons',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue']
        }
    }
})
