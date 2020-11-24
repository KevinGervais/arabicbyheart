import { VocabularyCategory, VocabularyItem } from "@/model"
import { cloneCategory } from "@/functions"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"
import { allRequests } from "@/requests"

import { getImage } from "."

export function updateVocabularyImage(
  selectedCategory: VocabularyCategory,
  vocabularyItem: VocabularyItem,
  vocabularyCategoryList: VocabularyCategory[]
): void {
  const { selectedLanguage } = getReduxState()
  getImage(
    vocabularyItem.languageItems[selectedLanguage].title,
    vocabularyItem.image
  ).then((image: string | undefined) => {
    vocabularyItem.image = image
    allRequests.addOrUpdateVocabulary({
      image: vocabularyItem.image,
      _id: vocabularyItem._id,
      categoryId: selectedCategory._id,
      languageItems: vocabularyItem.languageItems,
    }).then(() => {
      const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
      setReduxState({
        selectedCategory: cloneCategory(selectedCategory),
        vocabularyCategoryList: newVocabularyCategoryList
      })
      localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
    })
  })
}