import { css } from "styled-components"

export const center: any = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const clickable: any = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
`

export const noSelection: any = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const ellipsis: any = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const noScrollbar: any = css`
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
`

export const getAppHeight = (): string => {
  if (window.innerHeight === window.screen.height) {
    return "100vh"
  } else {
    return "calc(100vh - 20px)"
  }
}

export function hexToHsla(hex: string, transparency: number): string {
  const result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  ) as RegExpExecArray
  let r: number = parseInt(result[1], 16)
  let g: number = parseInt(result[2], 16)
  let b: number = parseInt(result[3], 16)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number = 0
  let s: number = 0
  let l: number = (max + min) / 2
  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  s = s * 100
  s = Math.round(s)
  l = l * 100
  l = Math.round(l)
  h = Math.round(360 * h)
  return `hsla(${h}, ${s}%, ${l}%, ${transparency})`
}
