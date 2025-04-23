import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/Backend' : {
        target: 'https://mern-apollo24-1.onrender.com',
        secure: true,
      },
    },
  },
  plugins: [react()],
})
