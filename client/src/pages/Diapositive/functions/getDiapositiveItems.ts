import { VocabularyItem } from "@/model"
import { getReduxState } from "@/redux"

import { DiapositiveItemObject } from "../model"

export function getDiapositiveItems(): DiapositiveItemObject[] {
  const { selectedCategory, diapositiveSettings, selectedLanguage } = getReduxState()
  if (!selectedCategory || !diapositiveSettings) {
    return []
  }
  const final: DiapositiveItemObject[] = selectedCategory.items.map((vocabularyItem: VocabularyItem) => {
    const diapositiveItems: DiapositiveItemObject[] = []
    if (diapositiveSettings.isSelectedTitleActive) {
      diapositiveItems.push({
        currentLanguageItem: { ...vocabularyItem.languageItems[selectedLanguage] },
        image: vocabularyItem.image,
        isImageOnly: false,
        language: selectedLanguage,
        languageItems: vocabularyItem.languageItems
      })
    }
    if (diapositiveSettings.isArabicTitleActive) {
      diapositiveItems.push({
        currentLanguageItem: { ...vocabularyItem.languageItems.ar },
        image: vocabularyItem.image,
        isImageOnly: false,
        language: "ar",
        languageItems: vocabularyItem.languageItems
      })
    }
    if (diapositiveItems.length === 0) {
      diapositiveItems.push({
        currentLanguageItem: { ...vocabularyItem.languageItems.ar },
        image: vocabularyItem.image,
        isImageOnly: true,
        language: "ar",
        languageItems: vocabularyItem.languageItems
      })
    }
    return diapositiveItems
  }).flat()
  if (diapositiveSettings.isShuffle) {
    final.sort(() => Math.random() - 0.5)
    final.sort(() => Math.random() - 0.5)
    final.sort(() => Math.random() - 0.5)
  }
  return final
}
