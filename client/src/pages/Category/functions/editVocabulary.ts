import { cloneCategory, cloneVocabularyItem, generateId } from "@/functions"
import { LanguageItems, SpeechLanguages, VocabularyCategory, VocabularyItem } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"
import { allRequests } from "@/requests"
import { ALL_SPEECH_LANGUAGES } from "@/constants"

export function editVocabulary(
  selectedTitle: string,
  arabicTitle: string,
  vocabularyItem: VocabularyItem,
  index: number,
  callback: () => void
): void {
  const { selectedCategory, selectedLanguage, vocabularyCategoryList } = getReduxState()
  if ([selectedTitle, arabicTitle].some((title: string) => !title.split(" ").join("")) || !selectedCategory) {
    return
  }
  const newVocabularyItem = cloneVocabularyItem(vocabularyItem)
  const languageItems: LanguageItems = newVocabularyItem.languageItems

  ALL_SPEECH_LANGUAGES.forEach((language: SpeechLanguages) => {
    if (selectedLanguage === language) {
      languageItems[language] = {
        title: selectedTitle,
        _id: generateId()
      }
    } else if (language === "ar") {
      languageItems[language] = {
        title: arabicTitle,
        _id: generateId()
      }
    }
  })


  allRequests.addOrUpdateVocabulary({
    image: newVocabularyItem.image,
    _id: newVocabularyItem._id,
    categoryId: selectedCategory._id,
    languageItems: newVocabularyItem.languageItems,
  }).then(() => {
    const newSelectedCategory: VocabularyCategory = cloneCategory({ ...selectedCategory })
    newSelectedCategory.items[index] = newVocabularyItem
    const categoryIndex = vocabularyCategoryList
      .findIndex((category: VocabularyCategory) => category._id === newSelectedCategory._id)
    const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
    newVocabularyCategoryList[categoryIndex] = newSelectedCategory
    setReduxState({
      selectedCategory: newSelectedCategory,
      vocabularyCategoryList: newVocabularyCategoryList
    })
    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
    callback()
  })
}