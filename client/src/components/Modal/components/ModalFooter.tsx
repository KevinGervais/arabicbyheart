import React from "react"

import { ModalFooterProps } from "../model"

import { ModalFooterStyled } from "./ModalFooterStyled"

export const ModalFooter = (props: ModalFooterProps): JSX.Element => (
  <ModalFooterStyled className={`modal-footer ${props.className || ""}`}>
    {props.children}
  </ModalFooterStyled>
)
