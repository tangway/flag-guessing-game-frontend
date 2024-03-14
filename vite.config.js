import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
// import svgr from '@svgr/rollup'
import liveReload from 'vite-plugin-live-reload';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/flag-guessing-game-frontend/',
  plugins: [
    liveReload('**/*'),
    react(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
  ],
});
