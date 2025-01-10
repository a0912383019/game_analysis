import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { svgBuilder } from './src/utils/svgBuilder'

export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/assets/icons/'),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue?$/],
      imports: ['vue', 'vue-router', { lodash: [['*', '_']] }],
      dts: './src/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
      dts: './src/types/components.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/global.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
