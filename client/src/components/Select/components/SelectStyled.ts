import styled from "styled-components"
import { center, clickable } from "@/styles/mixins"

export const SelectStyled = styled.div<{}>`
  ${center}
  ${clickable}
    .fa-chevron-down {
    width: 15px;
    margin-left: 5px;
    flex-shrink: 0;
  }
`
