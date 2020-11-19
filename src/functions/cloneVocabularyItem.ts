import { VocabularyItem, SpeechLanguages } from "@/model"

export function cloneVocabularyItem(vocabularyItem: VocabularyItem): VocabularyItem {
  const newItem = { ...vocabularyItem }
  Object.keys(newItem.languageItems).forEach((languageName: string) => {
    newItem.languageItems[languageName as SpeechLanguages] = { ...newItem.languageItems[languageName as SpeechLanguages] }
  })
  return newItem
}