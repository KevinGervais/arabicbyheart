export interface ScrollbarProps {
  className?: string
  suppressScrollY?: boolean
  children: React.ReactNode
  onYReachEnd?(container: HTMLElement): void
}