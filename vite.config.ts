import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'
import fs from 'fs'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export default defineConfig(async ({ mode }) => {
    //@ts-ignore
    const stylex = await import('vite-plugin-stylex')
    const { viteStaticCopy } = await import('vite-plugin-static-copy')

    return {
        server: {
            strictPort: true,
        },
        plugins: [
            react({
                babel: {
                    configFile: false,
                },
            }),
            vitePluginSvgr({
                svgrOptions: {
                    ref: true,
                },
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: './node_modules/geist/dist/fonts',
                        dest: '.',
                    },
                ],
            }),
        ],
    }
})
