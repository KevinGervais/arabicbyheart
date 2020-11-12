import { VocabularyGroup, VocabularyItem } from "@/model"

import { CategoryClass } from "../components/Category"
import { CategoryInitState } from "../model"


export function getInitialState(this: CategoryClass, isSkipOptions?: boolean): CategoryInitState {
  const { selectedCategory, diapositiveSettings } = this.props
  if (!selectedCategory) {
    return {
      titleList: [],
      audioList: [],
      languageList: []
    } as CategoryInitState
  }
  let state: CategoryInitState = {
    titleList: Array(selectedCategory.columnCount).fill(""),
    audioList: Array(selectedCategory.columnCount).fill(""),
    isTitlesFromListActive: Array(selectedCategory.columnCount).fill(true),
  }
  if (!isSkipOptions) {
    const lastVocabulary: VocabularyGroup | undefined = selectedCategory.items[selectedCategory.items.length - 1]
    if (lastVocabulary) {
      state.isCreatingWithImage = !!lastVocabulary.image
      state.languageList = lastVocabulary.list.map((vocItem: VocabularyItem, index: number) => selectedCategory.languageList[index])
    } else {
      state.languageList = selectedCategory.languageList
    }
    if (diapositiveSettings) {
      state = { ...state, ...diapositiveSettings, isDiaporamaImage: diapositiveSettings.isImage }
      if (diapositiveSettings.isTitlesFromListActive.length !== selectedCategory.columnCount) {
        state.isTitlesFromListActive = Array(selectedCategory.columnCount).fill(true)
      }
    }
  }
  return state
}