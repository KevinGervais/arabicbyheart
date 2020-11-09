import { DiapositiveSettings } from "@/model"

import { CategoryClass } from "../components/Category"

export function saveDiapositiveSettings(this: CategoryClass): void {
  const {
    isTitlesFromListActive,
    isMicrophone,
    isShuffle,
    delay
  } = this.state

  const diapositiveSettings: DiapositiveSettings = {
    isTitlesFromListActive,
    isMicrophone,
    isShuffle,
    delay
  }
  window.localStorage.setItem("diapositiveSettings", JSON.stringify(diapositiveSettings))
}