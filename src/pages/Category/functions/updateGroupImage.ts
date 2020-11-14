import { VocabularyCategory, VocabularyGroup, VocabularyItem } from "@/model"
import { cloneCategory } from "@/functions"
import { setReduxState } from "@/redux"
import localforage from "localforage"
import { allRequests } from "@/requests"

import { getImage } from "."

export function updateGroupImage(
  selectedCategory: VocabularyCategory,
  group: VocabularyGroup,
  vocabularyCategoryList: VocabularyCategory[]
): void {
  const itemTitleList = group.list.map((item: VocabularyItem) => item.title)
  getImage(
    itemTitleList, selectedCategory.languageList, group.image
  ).then((image: string | undefined) => {
    group.image = image
    allRequests.addOrUpdateVocabulary({
      image: group.image,
      _id: group._id,
      categoryId: selectedCategory._id,
      list: group.list,
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