import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { findSvgFile, svgBuilder } from '@/utils/svgBuilder'
import fs from 'fs'

vi.mock('fs')

describe('svgBuilder', () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      { name: 'card.svg', isDirectory: () => false }
    ] as any)

    vi.mocked(fs.readFileSync).mockReturnValue(
      `<svg width="24" height="24"><path d="M6 6 L18 18"/></svg>`
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('findSvgFile', () => {
    const result = findSvgFile('test/icons')
    expect(result).toStrictEqual([
      '<symbol id=\"-card\"   viewBox=\"0 0 24 24\"><path d=\"M6 6 L18 18\"/></symbol>'
    ])
  })

  it('svgBuilder', () => {
    const result = svgBuilder('test/icons')

    expect(result).toEqual({
      name: 'svg-transform',
      transformIndexHtml: expect.any(Function)
    })

    const mockHtml = '<html><body></body></html>'
    const transformedHtml = result.transformIndexHtml(mockHtml)

    expect(transformedHtml).toStrictEqual(
      `<html><body>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
            <symbol id="icon-card"   viewBox="0 0 24 24"><path d="M6 6 L18 18"/></symbol>
          </svg>
        </body></html>`
    )
  })
})
