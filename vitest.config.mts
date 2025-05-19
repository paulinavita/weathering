import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
  },
  define: {
    'process.env.OPEN_WEATHER_API_KEY': JSON.stringify(process.env.OPEN_WEATHER_API_KEY),
  },
})