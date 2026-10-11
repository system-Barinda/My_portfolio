import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import certificatesUpload from './plugins/certificates-upload';

export default defineConfig({
  plugins: [react(), tailwindcss(), certificatesUpload()],
  server: { port: 5173, strictPort: false },
});
