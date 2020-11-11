import { DiapositiveSettings } from "@/model"

import { CategoryClass } from "../components/Category"
let timeoutId: number = -1
export function saveDiapositiveSettings(this: CategoryClass): void {
  window.clearTimeout(timeoutId)
  timeoutId = window.setTimeout(() => {
    const {
      isTitlesFromListActive,
      isMicrophone,
      isShuffle,
      delay,
      isDiaporamaImage
    } = this.state

    const diapositiveSettings: DiapositiveSettings = {
      isTitlesFromListActive,
      isMicrophone,
      isShuffle,
      delay,
      isImage: isDiaporamaImage
    }
    window.localStorage.setItem("diapositiveSettings", JSON.stringify(diapositiveSettings))
  }, 1000)
}