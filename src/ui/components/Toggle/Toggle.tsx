import React from "react"

import { ToggleStyled } from "./ToggleStyled"
import { ToggleProps } from "./model"

export const Toggle = (props: ToggleProps): JSX.Element => (
  <ToggleStyled
    active={!!props.active}
    className={`toggle ${props.className || ""}`}
    onClick={(): void => props.onChange(!props.active)}
  >
    {props.topLabel}
    <div className="square">✓</div>
    {props.label}
  </ToggleStyled>
)
