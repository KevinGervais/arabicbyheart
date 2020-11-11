import { VocabularyGroup, VocabularyItem } from "@/model"

import { CategoryClass, speechLanguages } from "../components/Category"
import { CategoryState } from "../model"


export function getInitialState(this: CategoryClass, isSkipOptions?: boolean): CategoryState {
  const { selectedCategory, diapositiveSettings } = this.props
  if (!selectedCategory) {
    return {
      titleList: [],
      audioList: [],
      languageList: []
    } as unknown as CategoryState
  }
  let state: Partial<CategoryState> = {
    titleList: Array(selectedCategory.columnCount).fill(""),
    audioList: Array(selectedCategory.columnCount).fill(""),
    isTitlesFromListActive: Array(selectedCategory.columnCount).fill(true),
    isCreatingWithImage: true,
  }
  if (!isSkipOptions) {
    const lastVocabulary: VocabularyGroup | undefined = selectedCategory.items[selectedCategory.items.length - 1]
    if (lastVocabulary) {
      state.isCreatingWithImage = !!lastVocabulary.image
      state.languageList = lastVocabulary.list.map((vocItem: VocabularyItem) => vocItem.lang)
    } else {
      state.languageList = Array(selectedCategory.columnCount)
        .fill("")
        .map((_: string, index: number) => speechLanguages[index] || speechLanguages[3])
    }
    if (diapositiveSettings) {
      state = { ...state, ...diapositiveSettings, isDiaporamaImage: diapositiveSettings.isImage }
      if (diapositiveSettings.isTitlesFromListActive.length !== selectedCategory.columnCount) {
        state.isTitlesFromListActive = Array(selectedCategory.columnCount).fill(true)
      }
    }
  }
  return state as CategoryState
}