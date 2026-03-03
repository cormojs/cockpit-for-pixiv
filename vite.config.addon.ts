import { defineConfig } from 'vite'
import { bannerPlugin } from './build/banner-plugin'
import pkg from './package.json'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      bannerPlugin({
        bannerPath: 'packages/addon-download/banner.js',
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
        input: 'packages/addon-download/index.ts',
        output: {
          format: 'iife',
          name: 'CockpitDownloadAddon',
          entryFileNames: 'cockpit-download-addon.user.js',
          inlineDynamicImports: true,
        },
      },
    },
  }
})
