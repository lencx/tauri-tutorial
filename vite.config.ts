import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Unocss from 'unocss/vite';

import unoOptions from './unocss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss(unoOptions),
    tsconfigPaths(),
    react(),
  ]
})
