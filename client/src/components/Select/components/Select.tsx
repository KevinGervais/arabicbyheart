import React, { TouchEvent } from "react"
import moment from "moment"
import DownArrowIcon from "@/images/downArrow"
import { getOS } from "@/functions"

import { Dropdown } from "../../Dropdown"
import { SelectProps, SelectState } from "../model"

import { NavDropdown } from "./NavDropdown"
import { SelectStyled } from "./SelectStyled"

export class Select extends React.Component<SelectProps, SelectState> {
  public selectRef: HTMLDivElement | null = null
  public willUnmount: boolean = false
  public posY: number = 0
  constructor(props: SelectProps) {
    super(props)
    this.state = { isSelecting: false }
    this.openSelect = this.openSelect.bind(this)
    this.closeSelect = this.closeSelect.bind(this)
    this.detectTouchStart = this.detectTouchStart.bind(this)
  }
  public detectTouchStart(evt: React.TouchEvent<Element> | any): void {
    this.posY = (evt.touches[0] || evt.changedTouches[0]).pageY
  }
  public openSelect(evt: React.MouseEvent<HTMLDivElement>): void {
    window.setTimeout(() => {
      if (getOS() === "mac" || getOS() === "windows") {
        document.addEventListener("click", this.closeSelect)
      } else if (getOS() === "ios" || getOS() === "android") {
        document.addEventListener("touchstart", this.detectTouchStart)
        document.addEventListener("touchend", this.closeSelect)
      }
      this.setState({ isSelecting: true })
    }, 10)
  }
  public closeSelect(evt: React.MouseEvent<HTMLDivElement> | TouchEvent | MouseEvent | any): void {
    if (this.willUnmount) {
      return
    }
    if (getOS() === "mac" || getOS() === "windows") {
      this.setState({ isSelecting: false })
      document.removeEventListener("click", this.closeSelect)
    } else if (getOS() === "ios" || getOS() === "android") {
      const mouseEvt: React.MouseEvent<HTMLDivElement> | MouseEvent = evt as React.MouseEvent<HTMLDivElement> | MouseEvent
      const touchEvt: TouchEvent = evt as TouchEvent
      const posY = mouseEvt.clientY || (touchEvt.touches[0] || touchEvt.changedTouches[0]).pageY
      if (this.posY === posY) {
        this.setState({ isSelecting: false })
        document.removeEventListener("touchstart", this.detectTouchStart)
        document.removeEventListener("touchend", this.closeSelect)
      }
    }
  }
  componentWillUnmount(): void {
    this.willUnmount = true
  }
  public renderValue(
    value?: string | number | moment.Moment | JSX.Element,
    auto?: string | number,
    plural?: string,
    placeholder?: string | number,
    children?: React.ReactNode
  ): React.ReactNode {
    if (children) {
      return children
    }
    if (typeof value === "object" && !(value instanceof moment)) {
      return value as JSX.Element
    }
    if (value && value !== 0 && placeholder) {
      return placeholder
    }
    if (value instanceof moment) {
      return (value as moment.Moment).format("ddd MMM DD")
    }
    if (plural && value !== undefined && value > 1) {
      auto = plural
    }
    return `${value || ""} ${auto || ""}`
  }
  public render(): JSX.Element {
    const {
      style,
      className,
      value,
      plural,
      placeholder,
      children,
      nav
    } = this.props

    return (
      <SelectStyled
        style={style}
        ref={(ref: HTMLDivElement): void => {
          this.selectRef = ref
        }}
        className={`select ${className || ""}`}
        onClick={(evt: React.MouseEvent<HTMLDivElement>) => this.state.isSelecting ? this.closeSelect(evt) : this.openSelect(evt)}
      >
        {this.renderValue(
          nav ? undefined : value,
          this.props.default,
          plural,
          placeholder,
          children
        )}

        {this.state.isSelecting && !nav && (
          <Dropdown {...(this.props as any)} />
        )}
        {this.state.isSelecting && nav && (
          <NavDropdown {...(this.props as any)} />
        )}
        {!children && <DownArrowIcon />}
      </SelectStyled>
    )
  }
}
