import React from "react"

import { ModalHeaderProps } from "../model"

import { ModalHeaderStyled } from "./ModalHeaderStyled"

export const ModalHeader = (props: ModalHeaderProps): JSX.Element => (
  <ModalHeaderStyled className={`modal-header ${props.className || ""}`}>
    {props.title && <h4 className="modal-title">{props.title}</h4>}
    {props.children}
  </ModalHeaderStyled>
)
