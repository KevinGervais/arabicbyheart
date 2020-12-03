import React from "react"
export function createComponentObject(Component: any, opts: any): any {
  const { Consumer } = React.createContext(new Map())
  if (typeof opts === "string") {
    opts = { prefix: opts }
  }
  const isClassy: boolean =
    Component.prototype && Component.prototype.isReactComponent
  const { prefix, forwardRefAs = isClassy ? "ref" : "innerRef" } = opts
  const name: string = Component.displayName || Component.name
  function forwardRef({ bsPrefix, ...props }: any, ref: any): JSX.Element {
    props[forwardRefAs] = ref
    return (
      <Consumer>
        {(prefixes: any): JSX.Element => (
          <Component
            {...props}
            bsPrefix={bsPrefix || prefixes.get(prefix) || prefix}
          />
        )}
      </Consumer>
    )
  }
  forwardRef.displayName = `Bootstrap(${name})`
  return React.forwardRef(forwardRef)
}
