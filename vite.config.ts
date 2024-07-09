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
            stylex.default(),
            {
                name: 'custom',
                async closeBundle() {
                    const files = fs.readdirSync('dist/assets')
                    const cssFile = files.find(f => f.startsWith('stylex.'))!
                    fs.renameSync(`dist/assets/${cssFile}`, `dist/assets/${cssFile.replace('stylex.', '')}`)
                    const html = fs.readFileSync(`dist/index.html`, 'utf-8')
                    fs.writeFileSync(`dist/index.html`, html.replace('stylex.', ''))

                    const newCssFilename = `dist/assets/${cssFile.replace('stylex.', '')}`
                    let css = fs.readFileSync(newCssFilename, 'utf8')

                    css = css.replace('@layer ', '@layer reset, ')

                    const resetCss = fs.readFileSync('src/reset.css', 'utf8')

                    css += '@layer reset {\n' + resetCss + '\n}\n'

                    const newCss = await postcss([autoprefixer])
                        .process(css, { from: newCssFilename, to: 'output.css' })
                        .then(result => result.css)
                    fs.writeFileSync(newCssFilename, newCss)
                },
            },
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
