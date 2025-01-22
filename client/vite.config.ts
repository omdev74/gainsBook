import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from "vite-plugin-svgr";


console.log("Resolved @shared path:", path.resolve(__dirname, "../packages/shared"));

export default defineConfig({
  plugins: [react(), svgr(), VitePWA({
    registerType: 'autoUpdate', // Automatically update the service worker
    manifest: {
      name: 'GainsBook',
      short_name: 'GainsBook',
      description: 'A Workout logger, where lives all your progress',
      theme_color: '#000000',
      icons: [
        {
          src: '/icons/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    }
    ,
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|js|css|html)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
          },
        },
      ],
    },
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@shared": path.resolve(__dirname, "../packages/shared"),
      "@server": path.resolve(__dirname, "../server/src"),
    },
  },
});