import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',  // Asegura que los archivos se generen en la carpeta 'dist'
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/profesores': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/modulos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/temas': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/ejemplos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/proyectos-finales': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/lenguajes': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})