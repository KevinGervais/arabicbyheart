import { setReduxState } from "@/redux"

import { getOS, isElectron } from "."

export const updateWindowTheme = (isDark: boolean) => {
  if (window.theme.isDark === isDark) {
    return
  }
  window.theme = {
    ...window.theme,
    isDark
  }
  window.localStorage.setItem("isDark", `${window.theme.isDark}`)

  setReduxState({ isDark: window.theme.isDark })
  if (getOS() === "windows" && isElectron()) {
    const titleBarNode: HTMLDivElement = document.querySelector(
      ".title-bar"
    ) as HTMLDivElement;
    (titleBarNode
      .querySelectorAll("path, rect, polygon") as NodeListOf<HTMLDivElement>)
      .forEach((elem: HTMLElement) => elem.style.fill = window.theme.isDark ? window.theme.grey900 : "white")
    titleBarNode.style.background = window.theme.isDark ? window.theme.primary200 : window.theme.primary500
  } else if (window.StatusBar) {
    if (window.theme.isDark) {
      window.StatusBar.styleDefault()
    } else {
      window.StatusBar.styleLightContent()
    }
  }
}