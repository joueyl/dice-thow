import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: './dist',
      exclude: ['package.json', './*.d.ts'],
      staticImport: true, // 静态导入所有类型声明，有助于拍平目录结构
      insertTypesEntry: true,
      copyDtsFiles: false,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/three/index.ts'), // 入口文件路径
      name: 'MyLibrary', // 打包后的全局变量名
      fileName: format => `my-library.${format}.js`, // 打包后的文件名
    },
    rollupOptions: {
      // 确保外部化处理你不想打包进库的依赖
      external: ['vue'], // 例如，如果库依赖 Vue
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        assetFileNames({ name }) {
          if (name === 'favicon.ico')
            return ''
          return name!
        },
      },
    },
  },
})
