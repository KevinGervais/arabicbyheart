import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { getReduxState, store } from "@/redux"
import "@/styles/reset.css"
import "@/styles/theme"
import "react-perfect-scrollbar/dist/css/styles.css"


import { Routes } from "./ui/routes/Routes"
import { getBrowser, getOS, handleNotchPositionChange } from "./functions"
import { phonesWithNatch } from "./functions/handleNotchPositionChange"
import { IncompatibleBrowserStyled } from "./styles/IncompatibleBrowserStyled"
window.localStorage.setItem("clipboard", "[]")

export class AppClass extends React.Component {
  constructor(props: {}) {
    super(props)
    const os = getOS()
    window.addEventListener("dragover", (evt: DragEvent) => evt.preventDefault())
    window.addEventListener("drop", (evt: DragEvent) => evt.preventDefault())
    window.addEventListener("resize", () => this.forceUpdate())
    document.addEventListener("deviceready", () => {
      if (
        (os === "ios" || os === "android")
        && window.device
        && phonesWithNatch.includes(window.device.model)) {
        handleNotchPositionChange()
        window.addEventListener('orientationchange', handleNotchPositionChange)
      }
      if (os === "android") {
        window.StatusBar.overlaysWebView(true)
        window.StatusBar.backgroundColorByHexString("#00000000")
      }
    })

  }

  componentDidMount(): void {
    const initReactFastclick: any = require('react-fastclick')
    initReactFastclick()
  }

  public render(): JSX.Element {
    if (getBrowser() !== "Chrome") {
      return (
        <IncompatibleBrowserStyled>
          <span>
            {getReduxState().say.badBrowser}
          </span>
        </IncompatibleBrowserStyled>
      )
    }
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

ReactDOM.render(<AppClass />, document.getElementById("root"))