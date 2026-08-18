import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: vercel(),

  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },

    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },

  integrations: [react()],
});
