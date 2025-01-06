import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// Plugin to copy manifest
const copyManifest = () => {
    return {
        name: 'copy-manifest',
        buildEnd() {
            // Copy manifest.json
            copyFileSync('manifest.json', 'dist/manifest.json')
        },
    }
}

export default defineConfig({
    plugins: [react(), copyManifest()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                newtab: resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]',
            },
        },
        watch: {
            include: ['src/**', 'public/**'],
        },
    },
})
