import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: './build',
      exclude: ['package.json', './*.d.ts'],
      tsconfigPath: './tsconfig.app.json',
      staticImport: true,
      insertTypesEntry: true,
      copyDtsFiles: false,
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: './build',
    lib: {
      entry: path.resolve(__dirname, 'src/three/index.ts'),
      formats: ['es'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['three', 'cannon-es', 'three.interaction'],

    },
  },
})
