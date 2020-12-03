import React from "react"

import { ModalProps } from "../model"

import { ModalBackgroundStyled } from "./ModalBackgroundStyled"
import { ModalParentStyled } from "./ModalParentStyled"

export const Modal = (props: ModalProps): JSX.Element => (
  <ModalBackgroundStyled
    className="modal-background"
    onClick={(): void => props.closeModal && props.closeModal()}
  >
    <ModalParentStyled
      className={`modal-parent ${props.className || ""}`}
      onClick={(evt: React.MouseEvent<HTMLDivElement>): void =>
        evt.stopPropagation()
      }
    >
      {props.children}
    </ModalParentStyled>
  </ModalBackgroundStyled>
)

