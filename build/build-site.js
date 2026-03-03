const fs = require('fs')
const path = require('path')
const pug = require('pug')

const pkg = require('../package.json')
const outDir = path.resolve(__dirname, '..', 'docs')
const siteDir = path.resolve(__dirname, '..', 'packages', 'site')

const html = pug.renderFile(path.join(siteDir, 'index.pug'), { pkg })

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'index.html'), html)
fs.copyFileSync(
  path.join(siteDir, '8th713.png'),
  path.join(outDir, '8th713.png')
)

console.log('Site built successfully.')
