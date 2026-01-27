import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                freeTools: resolve(__dirname, 'free-tools.html'),
                coaching: resolve(__dirname, 'coaching.html'),
                community: resolve(__dirname, 'community.html'),
                thankYou: resolve(__dirname, 'thank-you.html'),
            },
        },
    },
})
