import { DiapositiveSettings } from "@/model"
import { setReduxState } from "@/redux"

import { CategoryClass } from "../components/Category"

export function goToDiapositive(this: CategoryClass): void {
  const {
    isSelectedTitleActive,
    isArabicTitleActive,
    isMicrophone,
    isShuffle,
    delay,
    isDiaporamaImage,
    isHarakat

  } = this.state

  const diapositiveSettings: DiapositiveSettings = {
    isSelectedTitleActive,
    isArabicTitleActive,
    isMicrophone,
    isShuffle,
    delay,
    isImage: isDiaporamaImage,
    isHarakat
  }
  setReduxState({ diapositiveSettings, page: "diapositive" })
  window.localStorage.setItem("diapositiveSettings", JSON.stringify(diapositiveSettings))
}