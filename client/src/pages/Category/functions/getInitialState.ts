import { VocabularyItem } from "@/model"
import { getReduxState } from "@/redux"

import { CategoryInitState } from "../model"


export function getInitialState(isSkipOptions?: boolean): CategoryInitState {
  const { selectedCategory, diapositiveSettings } = getReduxState()
  if (!selectedCategory) {
    return {
      selectedTitle: "",
      arabicTitle: "",
    } as CategoryInitState
  }
  let state: CategoryInitState = {
    selectedTitle: "",
    arabicTitle: "",
    isSelectedTitleActive: true,
    isArabicTitleActive: true
  }
  if (!isSkipOptions) {
    const lastVocabulary: VocabularyItem | undefined = selectedCategory.items[selectedCategory.items.length - 1]
    if (lastVocabulary) {
      state.isCreatingWithImage = !!lastVocabulary.image
    }
    if (diapositiveSettings) {
      state = { ...state, ...diapositiveSettings, isDiaporamaImage: diapositiveSettings.isImage }
    }
  }
  return state
}