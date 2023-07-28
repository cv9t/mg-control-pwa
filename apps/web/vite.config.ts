/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, UserConfigExport } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default (): UserConfigExport => {
  const env = loadEnv('mock', '../../');

  return defineConfig({
    envDir: '../../',

    define: {
      'process.env': { ...env },
    },

    cacheDir: '../../node_modules/.vite/web',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [
      svgr(),
      react({
        plugins: [
          [
            '@effector/swc-plugin',
            {
              factories: ['atomic-router', 'effector-forms'],
            },
          ],
        ],
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
        manifest: {
          name: env.FULL_APP_NAME,
          short_name: env.SHORT_APP_NAME,
          description: 'Progressive Web App',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
          start_url: './',
          scope: '.',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',
        },
      }),
      viteTsConfigPaths({
        root: '../../',
      }),
    ],

    worker: {
      plugins: [
        viteTsConfigPaths({
          root: '../../',
        }),
      ],
    },

    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  });
};
