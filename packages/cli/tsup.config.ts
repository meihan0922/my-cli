import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    sourcemap: false,
    minify: true,
    clean: true,
    format: ['cjs'],
    outDir: 'dist',
    outExtension: () => {
        return { js: '.js' }
    }
})
