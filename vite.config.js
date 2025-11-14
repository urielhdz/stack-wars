import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get base path from environment variable or default to repo name
// For GitHub Pages: use repo name as base path (unless it's username.github.io)
const getBasePath = () => {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }
  // Default to '/stack-draft/' for production, '/' for development
  return process.env.NODE_ENV === 'production' ? '/stack-wars/' : '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})

