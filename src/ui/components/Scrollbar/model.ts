export interface ScrollbarProps {
  readonly className?: string
  readonly suppressScrollY?: boolean
  readonly children: React.ReactNode
  onYReachEnd?(container: HTMLElement): void
}