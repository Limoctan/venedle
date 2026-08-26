import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Bind to all interfaces so the dev server is reachable from outside a container.
    host: true,
    // Windows -> Docker bind mounts don't propagate file events; polling keeps HMR working.
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': process.env.BACKEND_PROXY ?? 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@venedle/shared': path.resolve(
        import.meta.dirname,
        '../../packages/shared/src',
      ),
    },
  },
});
