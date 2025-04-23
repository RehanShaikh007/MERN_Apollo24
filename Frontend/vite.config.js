import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api' : {
        target: 'https://mern-apollo24-1.onrender.com' || 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
      },
    },
  },
  plugins: [react()],
})
