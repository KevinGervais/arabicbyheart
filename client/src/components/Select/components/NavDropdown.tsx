import React from "react"
import { Scrollbar } from "@/components"

import { NavDropdownProps } from "../model"

import { DropdownItemStyled } from "./DropdownItemStyled"
import { NavDropdownStyled } from "./NavDropdownStyled"

export class NavDropdown extends React.Component<NavDropdownProps> {
  public dropdownRef: HTMLDivElement | null = null
  public componentDidMount(): void {
    this.getDropdownStyles()
  }

  public getDropdownStyles(): void {
    if (this.dropdownRef) {
      const { top, bottom } = this.dropdownRef.getBoundingClientRect()
      this.dropdownRef.style.maxHeight = window.innerHeight - top + "px"
      if (bottom < window.innerHeight) {
        this.dropdownRef.style.borderBottomRightRadius = "10px"
      }
    }
  }

  public render(): JSX.Element {
    const {
      dropdownClass,
      optionList,
      onChange,
      iconList,
      outputList,
      value: selectedValue
    } = this.props
    return (
      <NavDropdownStyled
        className={`${dropdownClass || ""} dropdown`}
        ref={(ref: HTMLDivElement): void => {
          this.dropdownRef = ref
        }}
      >
        <Scrollbar>
          {optionList.map((value: any, index: number) => (
            <DropdownItemStyled
              className={`nav-section-${value}`}
              key={index}
              isActive={value === selectedValue}
              onClick={(evt: React.MouseEvent<HTMLDivElement>): void => {
                onChange(value)
              }}
            >
              {iconList && iconList[index]()}
              {outputList && outputList[index]}
              {!outputList && value}
            </DropdownItemStyled>
          ))}
        </Scrollbar>
      </NavDropdownStyled>
    )
  }
}

