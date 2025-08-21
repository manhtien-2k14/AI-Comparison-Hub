import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    host: true,
    // Sử dụng cổng từ biến môi trường PORT của Render, nếu không có thì mặc định là 4173
    port: Number(process.env.PORT) || 4173,
  },
});
