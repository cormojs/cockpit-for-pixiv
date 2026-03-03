import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { bannerPlugin } from './build/banner-plugin'
import pkg from './package.json'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              { ssr: false, displayName: isDev },
            ],
          ],
        },
      }),
      bannerPlugin({
        bannerPath: 'packages/core/banner.js',
        pkg,
      }),
    ],
    build: {
      outDir: 'docs',
      emptyOutDir: false,
      minify: isDev ? false : 'terser',
      terserOptions: isDev
        ? undefined
        : {
            ecma: 2017,
            compress: {
              comparisons: false,
            },
            output: {
              comments: /^\**!|@preserve|@license|@cc_on|Licensed/,
              ascii_only: true,
            },
          },
      sourcemap: isDev ? 'inline' : false,
      rollupOptions: {
        input: 'packages/core/index.tsx',
        output: {
          format: 'iife',
          name: 'CockpitForPixiv',
          entryFileNames: 'cockpit-for-pixiv.user.js',
          inlineDynamicImports: true,
        },
      },
    },
  }
})
