import { VocabularyItem } from "@/model"

import { CategoryClass } from "../components/Category"
import { CategoryInitState } from "../model"


export function getInitialState(this: CategoryClass, isSkipOptions?: boolean): CategoryInitState {
  const { selectedCategory, diapositiveSettings } = this.props
  if (!selectedCategory) {
    return {
      selectedTitle: "",
      selectedAudio: "",
      arabicTitle: "",
      arabicAudio: ""
    } as CategoryInitState
  }
  let state: CategoryInitState = {
    selectedTitle: "",
    arabicTitle: "",
    selectedAudio: "",
    arabicAudio: "",
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