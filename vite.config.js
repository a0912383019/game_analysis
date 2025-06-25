import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { svgBuilder } from './src/utils/svgBuilder'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  return defineConfig({
    base: '/',
    // base: '/vue3_ts_groq/',
    plugins: [
      vue(),
      tailwindcss(),
      svgBuilder('./src/assets/icons/'),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue?$/],
        imports: [
          'vue',
          'vue-router',
          {
            axios: [
              // default imports
              ['default', 'axios']
            ],
            lodash: [['*', '_']]
          }
        ],
        dts: './src/types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })],
        dirs: ['src/components', 'src/layout'],
        dts: './src/types/components.d.ts'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/assets/css/global.scss" as *;`
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue'],
            'vendor-antd': ['ant-design-vue'],
            'vendor-echarts': ['echarts']
          }
        }
      }
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       // workaround _plugin-vue_export-helper.js
    //       sanitizeFileName: (s) => s.replace(/^[\x00|_|-]/, '')
    //     }
    //   }
    // },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/go-api': {
          secure: false,
          target: 'https://devqa.vir777.xyz',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/go-api/, '')
        }
      }
    }
  })
}
