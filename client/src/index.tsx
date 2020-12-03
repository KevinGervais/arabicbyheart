import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "@/redux"
import "@/styles/reset.css"
import "@/styles/theme"
import "react-perfect-scrollbar/dist/css/styles.css"


import { Routes } from "./routes/Routes"
import { getOS, handleNotchPositionChange } from "./functions"
import { phonesWithNatch } from "./functions/handleNotchPositionChange"

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
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

ReactDOM.render(<AppClass />, document.getElementById("root"))