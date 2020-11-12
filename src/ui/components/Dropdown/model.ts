export interface DropdownProps {
  readonly optionList: any[]
  readonly outputList?: string[]
  readonly default?: string
  readonly plural?: string
  readonly italic?: boolean
  readonly isSquare?: boolean
  readonly dropdownClass?: string
  onChange(value: any, index: number): void
}

export interface DropdownState {
  readonly isSelecting: boolean
  readonly isStylesUpdated: boolean
  readonly style: any
}

export interface DropdownStyledProps {
  readonly isSquare?: boolean
}

export interface DropdownItemStyledProps {
  readonly italic?: boolean
  readonly isSquare?: boolean
}