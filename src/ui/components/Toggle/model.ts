export interface ToggleProps {
  active?: boolean
  className?: string
  topLabel?: string | JSX.Element
  label?: string | JSX.Element
  onChange(newValue: boolean): void
}

export interface ToggleStyledProps {
  active: boolean
}