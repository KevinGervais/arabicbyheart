import { VocabularyCategory, VocabularyItem } from "@/model"
import { setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import { GetDeletedItemsRequestResult } from "@/requests/model"
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
  allRequests.getDeletedItems().then((deletedItems: GetDeletedItemsRequestResult[]) => {
    deletedItems.forEach((item: GetDeletedItemsRequestResult) => {
      const foundCategoryIndex = vocabularyCategoryList.findIndex((categoryItem: VocabularyCategory) => categoryItem._id === item.categoryId)
      if (item.vocabularyItemId) {
        if (foundCategoryIndex !== -1) {
          const foundGroupIndex = vocabularyCategoryList[foundCategoryIndex]
            .items.findIndex((currentGroup: VocabularyItem) => currentGroup._id === item.vocabularyItemId)
          if (foundGroupIndex !== -1) {
            vocabularyCategoryList[foundCategoryIndex].items.splice(foundGroupIndex, 1)
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
          .map((oldGroupItem: VocabularyItem): VocabularyItem => {
            const foundGroupIndex = updatedCategoryItem.items
              .findIndex((newGroupItem: VocabularyItem) => newGroupItem._id === oldGroupItem._id)
            if (foundGroupIndex !== -1) {
              return updatedCategoryItem.items.splice(foundGroupIndex, 1)[0]
            } else {
              return oldGroupItem
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
    setReduxState({ vocabularyCategoryList: newVocabularyCategoryList })
  }
  if (isStorageUpdate) {
    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
  }
}