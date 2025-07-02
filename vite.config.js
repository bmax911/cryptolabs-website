import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  build: {
    rollupOptions: {
      external: ['react-icons/fa'],
    },
  },
})
