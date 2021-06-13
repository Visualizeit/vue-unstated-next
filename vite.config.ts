import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            outputDir: 'dist',
            include: './src/index.ts',
            staticImport: true,
            beforeWriteFile: (filePath, content) => {
                return {
                    filePath: filePath.replace(/\\src/, '')
                }
            }
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs', 'umd'],
            name: 'vue-unstated-next'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'vue'
                }
            }
        }
    }
})
