import React from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import { Scrollbar } from "@/components"

import { DropdownStyled, DropdownItemStyled } from "./DropdownStyled"
import { DropdownProps, DropdownState } from "./model"


export class Dropdown extends React.Component<
  DropdownProps,
  DropdownState
  > {
  public dropdownNode: HTMLDivElement = document.createElement("div")
  public dropdownRef?: HTMLDivElement | null
  public scrollNodes?: Element[]
  public willUnmount: boolean = false
  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      isSelecting: false,
      isStylesUpdated: false,
      style: {}
    }
    this.getDropdownStyles = this.getDropdownStyles.bind(this)
    this.renderDropdownContent = this.renderDropdownContent.bind(this)
    window.addEventListener("resize", this.getDropdownStyles)
  }

  public componentDidMount(): void {
    if (this.willUnmount) { return }
    this.setState({ isStylesUpdated: false })
    document.body.prepend(this.dropdownNode)
    this.renderDropdownContent()
  }

  public getScrollParents(
    scrollParents: Element[],
    node: Element | null
  ): Element[] {
    if (node == null) {
      return scrollParents
    }
    if (node.scrollHeight > node.clientHeight) {
      scrollParents.push(node)
    }
    return this.getScrollParents(scrollParents, node.parentNode as Element)
  }
  public componentDidUpdate(): void {
    if (this.willUnmount) { return }
    if (!this.state.isStylesUpdated) {
      const dropdownNode: Element = ReactDOM.findDOMNode(
        this.dropdownRef
      ) as Element
      this.scrollNodes = this.getScrollParents(
        [],
        dropdownNode.parentNode as Element | null
      )
      this.scrollNodes.forEach((node: Element) => {
        node.addEventListener("scroll", this.getDropdownStyles)
      })
      this.getDropdownStyles()
    }
    this.renderDropdownContent()
  }

  public componentWillUnmount(): void {
    if (this.scrollNodes) {
      this.scrollNodes.forEach((node: Element) => {
        if (!node) {
          return
        }
        node.removeEventListener("scroll", this.getDropdownStyles)
      })
    }
    ReactDOM.unmountComponentAtNode(this.dropdownNode)
    document.body.removeChild(this.dropdownNode)
    window.removeEventListener("resize", this.getDropdownStyles)
  }

  public getDropdownStyles(): void {
    const node: Element = ReactDOM.findDOMNode(
      (this.dropdownRef as HTMLDivElement).parentNode as Element
    ) as Element
    const style: any = {}
    if (node) {
      const { bottom, top, left, width } = node.getBoundingClientRect()
      const fullHeight: number = window.innerHeight
      style.left = left
      style.minWidth = width
      if (fullHeight - bottom < fullHeight / 3) {
        style.borderRadius = "10px 10px 0 0"
        style.bottom = window.innerHeight - top
        style.maxHeight = top - 20
        style.flexDirection = "column-reverse"
      } else {
        style.top = bottom - 5
        style.borderRadius = "0 0 10px 10px"
        style.maxHeight = window.innerHeight - bottom - 20
      }
    }
    this.setState({ style, isStylesUpdated: true })
  }

  public renderValue(
    value: string | number,
    auto?: string,
    plural?: string,
    placeholder?: string
  ): string {
    if (plural && value > 1 && !isNaN(Number(value))) {
      auto = plural
    }
    return `${value} ${auto || ""}`
  }

  public render(): JSX.Element {
    return (
      <div
        ref={(ref: HTMLDivElement): void => {
          this.dropdownRef = ref
        }}
      />
    )
  }
  public renderDropdownContent(): void {
    const {
      dropdownClass,
      optionList,
      outputList,
      onChange,
      plural,
      italic,
      isSquare
    } = this.props
    ReactDOM.render(
      <DropdownStyled
        className={`${dropdownClass || ""} dropdown`}
        style={this.state.style}
        isSquare={isSquare}
      >
        <Scrollbar>
          {optionList.map((value: any, index: number) => (
            <DropdownItemStyled
              isSquare={isSquare}
              italic={italic}
              key={index}
              onClick={(): void => {
                onChange(value, index)
              }}
            >
              {outputList && outputList[index]}
              {!outputList &&
                ((isNaN(value) || value instanceof moment) &&
                  this.props.default ? (
                    <React.Fragment>
                      <span>
                        {this.renderValue(index + 1, this.props.default, plural)}
                      </span>
                      <span>
                        {value instanceof moment
                          ? (value as moment.Moment).format("ddd MMM DD")
                          : value}
                      </span>
                    </React.Fragment>
                  ) : (
                    this.renderValue(value, this.props.default, plural)
                  ))}
            </DropdownItemStyled>
          ))}
        </Scrollbar>
      </DropdownStyled>,
      this.dropdownNode
    )
  }
}
