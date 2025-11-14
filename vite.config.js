import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

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
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        const distPath = join(process.cwd(), 'dist')
        try {
          copyFileSync(
            join(distPath, 'index.html'),
            join(distPath, '404.html')
          )
        } catch (err) {
          console.warn('Failed to copy index.html to 404.html:', err)
        }
      }
    }
  ],
  base: getBasePath(),
})

