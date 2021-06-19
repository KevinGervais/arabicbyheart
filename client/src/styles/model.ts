export interface Theme {
  // primary
  readonly isDark: boolean
  readonly primary50: string
  readonly primary100: string
  readonly primary200: string
  readonly primary300: string
  readonly primary400: string
  readonly primary500: string
  readonly primary600: string
  readonly primary700: string
  readonly primary800: string
  readonly primary900: string
  readonly primarya100?: string
  readonly primarya200?: string
  readonly primarya400?: string
  readonly primarya700?: string
  readonly grey50: string
  readonly grey100: string
  readonly grey200: string
  readonly grey300: string
  readonly grey400: string
  readonly grey500: string
  readonly grey600: string
  readonly grey700: string
  readonly grey750: string
  readonly grey800: string
  readonly grey850: string
  readonly grey900: string
  readonly secondary50: string
  readonly secondary100: string
  readonly secondary200: string
  readonly secondary300: string
  readonly secondary400: string
  readonly secondary500: string
  readonly secondary600: string
  readonly secondary700: string
  readonly secondary800: string
  readonly secondary900: string
  readonly secondarya100?: string
  readonly secondarya200?: string
  readonly secondarya400?: string
  readonly secondarya700?: string
  readonly error: string
  readonly error95: string
  readonly error80: string
  readonly error70: string
  readonly error60: string
  readonly error40: string
  readonly error30: string
  readonly error20: string
  readonly warning: string
  readonly warning80: string
  readonly warning70: string
  readonly warning60: string
  readonly warning40: string
  readonly warning30: string
  readonly warning20: string
}

export interface AllColors {
  readonly red: ColorItem
  readonly pink: ColorItem
  readonly purple: ColorItem
  readonly deeppurple: ColorItem
  readonly indigo: ColorItem
  readonly blue: ColorItem
  readonly lightblue: ColorItem
  readonly cyan: ColorItem
  readonly teal: ColorItem
  readonly green: ColorItem
  readonly lightgreen: ColorItem
  readonly lime: ColorItem
  readonly amber: ColorItem
  readonly orange: ColorItem
  readonly deeporange: ColorItem
  readonly brown: ColorItem
  readonly grey: ColorItem
  readonly bluegrey: ColorItem
}

export interface ColorItem {
  "50": string
  "100": string
  "200": string
  "300": string
  "400": string
  "500": string
  "600": string
  "700": string
  "750"?: string
  "800": string
  "850"?: string
  "900": string
  a100?: string
  a200?: string
  a400?: string
  a700?: string
}