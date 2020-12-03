export interface ToggleProps {
  readonly active?: boolean
  readonly className?: string
  readonly topLabel?: string | JSX.Element
  readonly label?: string | JSX.Element
  onChange(evt: React.MouseEvent<HTMLDivElement>, newValue: boolean): void
}

export interface ToggleStyledProps {
  readonly active: boolean
}