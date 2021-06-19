import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "@/redux"
import "@/styles/reset.css"
import "@/styles/theme"
import "react-perfect-scrollbar/dist/css/styles.css"


import { Routes } from "./routes/Routes"
import { getOS, handleNotchPositionChange, setApparence } from "./functions"
import { phonesWithNatch } from "./functions/handleNotchPositionChange"

window.localStorage.setItem("clipboard", "[]")
export class AppClass extends React.Component {
  constructor(props: {}) {
    super(props)
    const os = getOS()
    window.addEventListener("dragover", (evt: DragEvent) => evt.preventDefault())
    window.addEventListener("drop", (evt: DragEvent) => evt.preventDefault())
    window.addEventListener("resize", () => this.forceUpdate())
    if (window.matchMedia('(prefers-color-scheme: dark)').addEventListener as any) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setApparence)
    }
    if (["mac", "windows"].includes(os)) {
      setApparence()
    }
    document.addEventListener("deviceready", () => {
      if (
        window.device
        && (os === "android" || (os === "ios" && phonesWithNatch.includes(window.device.model)))
      ) {
        handleNotchPositionChange()
        window.addEventListener('orientationchange', handleNotchPositionChange)
      }
      if (os === "android" || !window.matchMedia('(prefers-color-scheme: dark)').addEventListener as any) {
        window.StatusBar.overlaysWebView(true)
        window.StatusBar.backgroundColorByHexString("#00000000")
        setInterval(() => setApparence(), 30000)
      } else if (os === "ios") {
        setApparence()
      }
    })
    document.addEventListener("deviceready", () => {
      if (
        window.device
        && (os === "android" || (os === "ios" && phonesWithNatch.includes(window.device.model)))
      ) {
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