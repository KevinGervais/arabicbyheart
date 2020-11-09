import { DiapositiveSettings } from "@/model"
import { setReduxState } from "@/redux"

import { CategoryClass } from "../components/Category"

export function goToDiapositive(this: CategoryClass): void {
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
  setReduxState({ diapositiveSettings, page: "diapositive" })
  window.localStorage.setItem("diapositiveSettings", JSON.stringify(diapositiveSettings))
}