import { diapositiveDelay, DiapositiveSettings } from "@/model"
import { setReduxState } from "@/redux"

export function saveDiapositiveSettings(
  isSelectedTitleActive: boolean,
  isArabicTitleActive: boolean,
  isMicrophone: boolean,
  isShuffle: boolean,
  delay: diapositiveDelay,
  isImage: boolean,
  isHarakat: boolean,
  isPageChange?: boolean
): void {


  const diapositiveSettings: DiapositiveSettings = {
    isSelectedTitleActive,
    isArabicTitleActive,
    isMicrophone,
    isShuffle,
    delay,
    isImage,
    isHarakat
  }
  if (isPageChange) {
    setReduxState({ diapositiveSettings, page: "diapositive" })
  }
  window.localStorage.setItem("diapositiveSettings", JSON.stringify(diapositiveSettings))
}