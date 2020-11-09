import moment from "moment"

export interface NavDropdownProps {
  dropdownClass?: string
  optionList: any[]
  outputList: string[]
  iconList?: any[]
  value?: string | number | moment.Moment | JSX.Element
  onChange: (newValue: any) => void
}

export interface SelectProps extends NavDropdownProps {
  value?: string | number | moment.Moment | JSX.Element
  default?: string | number
  plural?: string
  placeholder?: string | number
  children?: React.ReactNode
  nav?: boolean
  style?: any
  className?: string
  fill?: "white" | " primary40"
  curve?: string
  borderColor?: "white" | "primary40"
  height?: string
  effect?: string
  theme?: string

}

export interface SelectState {
  isSelecting: boolean
}

export interface DropdownItemStyledProps {
  isActive: boolean
}