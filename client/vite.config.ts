import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from "vite-plugin-svgr";


console.log("Resolved @shared path:", path.resolve(__dirname, "../packages/shared"));

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@shared": path.resolve(__dirname, "../packages/shared"),
      "@server": path.resolve(__dirname, "../server/src"),
    },
  },
});