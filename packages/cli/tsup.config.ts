import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    sourcemap: false,
    minify: true,
    clean: true,
    format: ['cjs'],
    // giget 內部使用 createRequire(import.meta.url)；打成單一 CJS 時 import.meta 會變成 {}，導致執行期錯誤
    external: ['giget'],
    outDir: 'dist',
    outExtension: () => {
        return { js: '.js' }
    }
})
