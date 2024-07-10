import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules'

export default defineConfig({
    html: {
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/index.tsx',
        },
    },
    server: {
        strictPort: true,
    },
    plugins: [pluginReact(), pluginTypedCSSModules()],
})
