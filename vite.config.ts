import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Приложение живёт в подпапке на GitHub Pages (/cellera-app/),
// поэтому пути к ассетам строятся относительно base.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/cellera-app/' : '/',
  plugins: [react()],
})
