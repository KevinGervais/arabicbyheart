export interface DropdownProps {
  optionList: any[]
  outputList?: string[]
  default?: string
  plural?: string
  italic?: boolean
  isSquare?: boolean
  dropdownClass?: string
  onChange(value: any, index: number): void
}

export interface DropdownState {
  isSelecting: boolean
  isStylesUpdated: boolean
  style: any
}

export interface DropdownStyledProps {
  isSquare?: boolean
}

export interface DropdownItemStyledProps {
  italic?: boolean
  isSquare?: boolean
}