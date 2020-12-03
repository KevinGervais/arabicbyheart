import { ModalClass } from "./ModalClass"

export interface ModalBodyProps {
  className?: string
  children: JSX.Element | string | (JSX.Element | string)[]
  style?: any
}

export interface ModalHeaderProps {
  className?: string
  title?: string
  children: JSX.Element | string | (JSX.Element | string)[]
}

export interface ModalFooterProps {
  className?: string
  children: JSX.Element | string | (JSX.Element | string)[]
}

export interface ModalProps {
  closeModal: () => void
  className?: string
  children: JSX.Element | string | (JSX.Element | string)[]
}

export interface ModalObject extends React.ForwardRefExoticComponent<Pick<any, string | number | symbol>> {
  Header: (props: ModalHeaderProps) => JSX.Element
  Body: (props: ModalBodyProps) => JSX.Element
  Footer: (props: ModalHeaderProps) => JSX.Element
}
