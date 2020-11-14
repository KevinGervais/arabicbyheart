import { VocabularyCategory, VocabularyGroup } from "@/model"
import { setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import { GetDeletedItemsRequestResult, GetVocabularyRequestResult } from "@/requests/model"
import localforage from "localforage"

import { cloneCategory } from "."

export function pullVocabulary(): void {
  localforage
    .getItem("vocabularyCategoryList")
    .then((obj: unknown): void => {
      if (obj) {
        const vocabularyCategoryList = obj as VocabularyCategory[]
        setVocabularyState(vocabularyCategoryList)
        allRequests.getVocabulary().then((vocabulary: GetVocabularyRequestResult[]) => {
          vocabulary.forEach((item: GetVocabularyRequestResult) => {
            const foundCategory = vocabularyCategoryList.find((categoryItem: VocabularyCategory) => categoryItem._id === item.categoryId)
            if (foundCategory) {
              const foundGroupIndex = foundCategory.items.findIndex((currentGroup: VocabularyGroup) => currentGroup._id === item._id)
              const newVocabularyGroup: VocabularyGroup = {
                _id: item._id,
                image: item.image,
                list: item.list,
              }
              if (foundGroupIndex === -1) {
                foundCategory.items.push(newVocabularyGroup)
              } else {
                foundCategory.items[foundGroupIndex] = newVocabularyGroup
              }
            }
          })
          setVocabularyState(vocabularyCategoryList, true)

          allRequests.getDeletedItems().then((deletedItems: GetDeletedItemsRequestResult[]) => {
            deletedItems.forEach((item: GetDeletedItemsRequestResult) => {
              const foundCategoryIndex = vocabularyCategoryList.findIndex((categoryItem: VocabularyCategory) => categoryItem._id === item.categoryId)
              if (item.groupId) {
                if (foundCategoryIndex !== -1) {
                  const foundGroupIndex = vocabularyCategoryList[foundCategoryIndex]
                    .items.findIndex((currentGroup: VocabularyGroup) => currentGroup._id === item.groupId)
                  if (foundGroupIndex !== -1) {
                    vocabularyCategoryList[foundCategoryIndex].items.splice(foundGroupIndex, 1)
                  }
                }
              } else if (foundCategoryIndex !== -1) {
                vocabularyCategoryList.splice(foundCategoryIndex, 1)
              }
            })
            setVocabularyState(vocabularyCategoryList, true)
          })
        })

      }
    })
}

function setVocabularyState(vocabularyCategoryList: VocabularyCategory[], isStorageUpdate?: boolean): void {
  const categoryId = window.localStorage.getItem("categoryId")
  const currentCategory = vocabularyCategoryList.find((item: VocabularyCategory) => item._id === categoryId)
  if (currentCategory) {
    setReduxState({ selectedCategory: cloneCategory(currentCategory), vocabularyCategoryList })
  } else {
    setReduxState({ vocabularyCategoryList })
  }
  if (isStorageUpdate) {
    localforage.setItem("vocabularyCategoryList", vocabularyCategoryList)
  }
}