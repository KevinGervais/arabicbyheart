import { VocabularyCategory, VocabularyItem } from "@/model"
import { setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import { GetDeletedItemsQuery } from "@/requests/model"
import localforage from "localforage"

import { cloneCategory } from "."

export function pullVocabulary(): void {
  localforage.getItem("vocabularyCategoryList").then((obj: unknown): void => {
    const vocabularyCategoryList = (obj || []) as VocabularyCategory[]
    setVocabularyState(vocabularyCategoryList)
    fetchCategories(vocabularyCategoryList, (newVocabularyCategoryList: VocabularyCategory[]) => {
      setVocabularyState(newVocabularyCategoryList, true)
      fetchDeletedItems(newVocabularyCategoryList, (newNewVocabularyCategoryList: VocabularyCategory[]) => {
        setVocabularyState(newNewVocabularyCategoryList, true)
      })
    })
  })
}

function fetchDeletedItems(
  vocabularyCategoryList: VocabularyCategory[],
  callback: (vocabularyCategoryList: VocabularyCategory[]) => void
): void {
  allRequests.getDeletedItems().then((deletedItems: GetDeletedItemsQuery[]) => {
    deletedItems.forEach((item: GetDeletedItemsQuery) => {
      const foundCategoryIndex = vocabularyCategoryList.findIndex((categoryItem: VocabularyCategory) => categoryItem._id === item.categoryId)
      if (item.vocabularyId) {
        if (foundCategoryIndex !== -1) {
          const foundVocabularyIndex = vocabularyCategoryList[foundCategoryIndex]
            .items.findIndex((currentVocabulary: VocabularyItem) => currentVocabulary._id === item.vocabularyId)
          if (foundVocabularyIndex !== -1) {
            vocabularyCategoryList[foundCategoryIndex].items.splice(foundVocabularyIndex, 1)
          }
        }
      } else if (foundCategoryIndex !== -1) {
        vocabularyCategoryList.splice(foundCategoryIndex, 1)
      }
    })
    callback(vocabularyCategoryList)
  })
}

function fetchCategories(
  vocabularyCategoryList: VocabularyCategory[],
  callback: (vocabularyCategoryList: VocabularyCategory[]
  ) => void): void {
  allRequests.getCategories().then((updatedCategoryList: VocabularyCategory[]) => {
    updatedCategoryList.forEach((updatedCategoryItem: VocabularyCategory) => {
      const foundCategoryIndex = vocabularyCategoryList.findIndex((categoryItem: VocabularyCategory) => categoryItem._id === updatedCategoryItem._id)
      if (foundCategoryIndex === -1) {
        vocabularyCategoryList.push(updatedCategoryItem)
      } else {
        vocabularyCategoryList[foundCategoryIndex].items = vocabularyCategoryList[foundCategoryIndex].items
          .map((oldVocabularyItem: VocabularyItem): VocabularyItem => {
            const foundVocabularyIndex = updatedCategoryItem.items
              .findIndex((newVocabularyItem: VocabularyItem) => newVocabularyItem._id === oldVocabularyItem._id)
            if (foundVocabularyIndex !== -1) {
              return updatedCategoryItem.items.splice(foundVocabularyIndex, 1)[0]
            } else {
              return oldVocabularyItem
            }
          })
        vocabularyCategoryList[foundCategoryIndex].items.push(...updatedCategoryItem.items)
      }
    })
    callback(vocabularyCategoryList)
  })
}

function setVocabularyState(vocabularyCategoryList: VocabularyCategory[], isStorageUpdate?: boolean): void {
  const categoryId = window.localStorage.getItem("categoryId")
  const currentCategory = vocabularyCategoryList.find((item: VocabularyCategory) => item._id === categoryId)
  const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
  if (currentCategory) {
    setReduxState({ selectedCategory: cloneCategory(currentCategory), vocabularyCategoryList: newVocabularyCategoryList })
  } else {
    setReduxState({ vocabularyCategoryList: newVocabularyCategoryList, page: "home" })
  }
  if (isStorageUpdate) {
    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
  }
}