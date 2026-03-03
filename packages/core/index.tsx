import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { createAddonStore } from './externals/addonStore'
import extraScopePlugin from 'stylis-plugin-extra-scope'

const scope = '#cockpit-for-pixiv'
const plugin = extraScopePlugin(scope)
Object.defineProperty(plugin, 'name', { value: 'extra-scope-plugin' })
const stylisPlugins = [plugin]
const addonStore = createAddonStore()
const container = document.createElement('div')
container.id = scope.slice(1)
document.body.appendChild(container)

createRoot(container).render(
  <App addonStore={addonStore} stylisPlugins={stylisPlugins} />
)
