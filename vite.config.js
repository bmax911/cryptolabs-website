import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'templates/index.html',
        pricing: 'templates/pricing.html',
        signup: 'templates/signup.html'
      }
    }
  }
})
