export interface Theme {
  // primary
  primary50: string
  primary100: string
  primary200: string
  primary300: string
  primary400: string
  primary500: string
  primary600: string
  primary700: string
  primary800: string
  primary900: string
  primarya100?: string
  primarya200?: string
  primarya400?: string
  primarya700?: string
  grey50: string
  grey100: string
  grey200: string
  grey300: string
  grey400: string
  grey500: string
  grey600: string
  grey700: string
  grey800: string
  grey900: string
  success: string
  success95: string
  success80: string
  success70: string
  success60: string
  success40: string
  success30: string
  success20: string
  error: string
  error95: string
  error80: string
  error70: string
  error60: string
  error40: string
  error30: string
  error20: string
  warning: string
  warning80: string
  warning70: string
  warning60: string
  warning40: string
  warning30: string
  warning20: string
}

export interface AllColors {
  red: ColorItem
  pink: ColorItem
  purple: ColorItem
  deeppurple: ColorItem
  indigo: ColorItem
  blue: ColorItem
  lightblue: ColorItem
  cyan: ColorItem
  teal: ColorItem
  green: ColorItem
  lightgreen: ColorItem
  lime: ColorItem
  amber: ColorItem
  orange: ColorItem
  deeporange: ColorItem
  brown: ColorItem
  grey: ColorItem
  bluegrey: ColorItem
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
  "800": string
  "900": string
  a100?: string
  a200?: string
  a400?: string
  a700?: string
}
