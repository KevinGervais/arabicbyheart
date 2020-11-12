import moment from "moment"

export interface NavDropdownProps {
  readonly dropdownClass?: string
  readonly optionList: any[]
  readonly outputList: string[]
  readonly iconList?: any[]
  readonly value?: string | number | moment.Moment | JSX.Element
  readonly onChange: (newValue: any) => void
}

export interface SelectProps extends NavDropdownProps {
  readonly value?: string | number | moment.Moment | JSX.Element
  readonly default?: string | number
  readonly plural?: string
  readonly placeholder?: string | number
  readonly children?: React.ReactNode
  readonly nav?: boolean
  readonly style?: any
  readonly className?: string
  readonly fill?: "white" | " primary40"
  readonly curve?: string
  readonly borderColor?: "white" | "primary40"
  readonly height?: string
  readonly effect?: string
  readonly theme?: string

}

export interface SelectState {
  readonly isSelecting: boolean
}

export interface DropdownItemStyledProps {
  readonly isActive: boolean
}