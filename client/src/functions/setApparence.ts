import { getOS } from "./getOS"
import { updateWindowTheme } from "./updateWindowTheme"
import { isDarkModeAndroid } from "."

export function setApparence(): void {
  if (getOS() === "android") {
    isDarkModeAndroid().then((isDark: boolean) => {
      updateWindowTheme(isDark)
    })
  } else {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    updateWindowTheme(isDark)
  }
}