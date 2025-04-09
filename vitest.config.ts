import { fileURLToPath } from 'node:url'
import { mergeConfig, loadEnv } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        environment: 'jsdom',
        // include: ['src/app.test.ts'], // 可指定要測試哪個檔案，gitlab的cicd會跑很久，可用此設定測試
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
          provider: 'v8',
          exclude: [
            ...configDefaults.exclude,
            'e2e/*',
            '.eslintrc.cjs', // 忽略 eslint 設定檔
            'src/types/*', // 忽略型別定義檔案
            'src/global/*', // 忽略套件設定檔案
            '**/*.d.ts', // 忽略型別定義檔案
            'build_config/*', // 忽略環境 config 設定檔
            'tailwind.config.js', // 忽略 Tailwind 設定檔
            'src/main.ts', // 忽略 Vue 入口文件
            'src/api/*' //  忽略 api 接口
          ]
        },
        reporters:
          loadEnv(configEnv.mode, process.cwd()).VITE_ENV !== 'local'
            ? [['default', { summary: false }]]
            : ['junit', 'json', 'verbose'],
        outputFile: {
          junit: './test/report.xml'
        }
      }
    })
  )
)
