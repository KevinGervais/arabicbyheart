import React, { SVGAttributes } from "react"
const Icon = (props: SVGAttributes<{}>): JSX.Element => (
  <svg
    className="svg-inline--fa fa-chevron-down fa-w-14"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 448"
  >
    <path
      fill="currentColor"
      d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
    />
  </svg>
)
export default Icon