import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'templates',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'templates/index.html'),
        pricing: resolve(__dirname, 'templates/pricing.html'),
        signup: resolve(__dirname, 'templates/signup.html')
      }
    }
  },
  publicDir: '../static'
})
