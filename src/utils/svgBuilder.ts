import { readFileSync, readdirSync, Dirent } from 'fs'

let idPrefix = ''
const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g
const hasViewBox = /(viewBox="[^>+].*?")/g
const clearReturn = /(\r)|(\n)/g

/**
 * 遞迴查找目錄中的 SVG 文件並處理其內容。
 * @param dir - 要查找的目錄路徑。
 * @returns 處理後的 SVG 字符串陣列。
 */
export const findSvgFile = (dir: string): string[] => {
  const svgRes: string[] = []
  const dirents: Dirent[] = readdirSync(dir, { withFileTypes: true })

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(`${dir}/${dirent.name}/`))
    } else {
      const filePath = `${dir}/${dirent.name}`
      const svg = readFileSync(filePath)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          let width = 0
          let height = 0
          let content = $2.replace(clearHeightWidth, (s1: string, s2: string, s3: any) => {
            if (s2 === 'width') {
              width = parseFloat(s3)
            } else if (s2 === 'height') {
              height = parseFloat(s3)
            }
            return ''
          })

          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }

          return `<symbol id="${idPrefix}-${dirent.name.replace('.svg', '')}" ${content}>`
        })
        .replace('</svg>', '</symbol>')

      svgRes.push(svg)
    }
  }
  return svgRes
}

/**
 * 創建 SVG 處理插件。
 * @param path - 要處理的 SVG 文件目錄。
 * @param prefix - 用於生成符號 ID 的前綴。
 * @returns 用於處理 HTML 的插件對象。
 */
export const svgBuilder = (path: string, prefix: string = 'icon') => {
  if (!path) return null

  idPrefix = prefix
  const res = findSvgFile(path)

  return {
    name: 'svg-transform',
    transformIndexHtml(html: string): string {
      return html.replace(
        '</body>',
        `
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
            ${res.join('')}
          </svg>
        </body>`,
      )
    },
  }
}
