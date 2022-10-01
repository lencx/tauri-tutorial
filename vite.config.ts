import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Unocss from 'unocss/vite';
import ViteRsw from 'vite-plugin-rsw';

import unoOptions from './unocss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteRsw(),
    Unocss(unoOptions),
    tsconfigPaths(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          highlight: ['highlight.js'],
          utils: ['lodash', 'uuid', 'dayjs', 'clsx'],
          comps: ['react-colorful', '@floating-ui/react-dom-interactions', 'allotment', 'framer-motion', 'rc-slider'],
          react: ['react', 'react-dom', 'react-router-dom', '@iconify/react', '@monaco-editor/react', 'jotai'],
          i18next: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          md: ['markdown-it', 'github-markdown-css'],
        }
      }
    }
  },
  esbuild: {
    // [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
    // https://github.com/vitejs/vite/issues/8644
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
