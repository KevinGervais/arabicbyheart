import React from "react"
import ReactDOM from "react-dom"

import { createComponentObject } from "./functions/createComponentObject"
import { ModalProps, ModalObject } from "./model"
import * as components from "./components"
export class ModalClass extends React.Component<ModalProps> {
  public modal: HTMLDivElement | null = null
  public componentDidMount(): void {
    this.modal = document.createElement("div")
    this.modal.setAttribute("id", "modal")
    document.body.appendChild(this.modal)
    this.renderModalContent(this.props)
  }
  public componentDidUpdate(newProps: ModalProps): void {
    this.renderModalContent(newProps)
  }
  public componentWillUnmount(): void {
    if (this.modal) {
      ReactDOM.unmountComponentAtNode(this.modal)
      document.body.removeChild(this.modal)
    }
  }
  public renderModalContent(props: ModalProps): void {
    ReactDOM.render(components.Modal(props), this.modal)
  }
  public render(): null {
    return null
  }
}

export const Modal: ModalObject = {
  ...createComponentObject(ModalClass, "modal"),
  Header: components.ModalHeader,
  Body: components.ModalBody,
  Footer: components.ModalFooter
}
