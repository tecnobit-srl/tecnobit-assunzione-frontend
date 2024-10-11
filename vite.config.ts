import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react()],
});
