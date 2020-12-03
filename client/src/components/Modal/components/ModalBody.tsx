import React from "react"

import { ModalBodyProps } from "../model"

import { ModalBodyStyled } from "./ModalBodyStyled"

export const ModalBody = (props: ModalBodyProps): JSX.Element => (
  <ModalBodyStyled
    style={props.style}
    className={`modal-body ${props.className || ""}`}
  >
    {props.children}
  </ModalBodyStyled>
)
