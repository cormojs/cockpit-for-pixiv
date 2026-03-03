import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'
import compile from 'lodash.template'

interface BannerPluginOptions {
  bannerPath: string
  pkg: Record<string, unknown>
}

export function bannerPlugin({ bannerPath, pkg }: BannerPluginOptions): Plugin {
  return {
    name: 'userscript-banner',
    generateBundle(_, bundle) {
      const template = readFileSync(resolve(bannerPath), 'utf-8')
      const banner = compile(template)(pkg)

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk') {
          chunk.code = banner + '\n' + chunk.code
        }
      }
    },
  }
}
