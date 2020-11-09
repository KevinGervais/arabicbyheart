import { NotchPosition } from "@/model"
import { setReduxState } from "@/redux"

import { getOS } from "./getOS"

export const phonesWithNatch: string[] = [
  "iPhone10,3",
  "iPhone10,6",
  "iPhone11,8	",
  "iPhone11,2",
  "iPhone11,6",
  "iPhone11,4",
  "iPhone12,1",
  "iPhone12,3",
  "iPhone12,5",
  "iPhone13,1",
  "iPhone13,2",
  "iPhone13,3",
  "iPhone13,4"
]

export function handleNotchPositionChange(): void {
  let notchPosition: NotchPosition
  const orientation = window.orientation === undefined ? window.screen.orientation.angle : window.orientation
  switch (orientation) {
    case 0:
      notchPosition = "top"
      break
    case 90:
      notchPosition = "left"
      break
    case -90:
      notchPosition = "right"
      break
    case 180:
      notchPosition = "bottom"
  }

  if (getOS() === "android") {
    if (["left", "right"].includes(notchPosition as string)) {
      window.StatusBar.hide()
    } else {
      window.StatusBar.show()
    }
  }

  setReduxState({ notchPosition })
}