import React, { ForwardRefExoticComponent } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"

import { ScrollbarProps } from "./model"

export const Scrollbar: ForwardRefExoticComponent<any> = React.forwardRef(
  (props: ScrollbarProps, ref: any): JSX.Element => (
    <PerfectScrollbar
      onYReachEnd={props.onYReachEnd}
      className={props.className}
      style={{ width: "100%" }}
      options={{ suppressScrollY: props.suppressScrollY }}
      ref={ref}
    >
      {props.children}
    </PerfectScrollbar>
  )
)
