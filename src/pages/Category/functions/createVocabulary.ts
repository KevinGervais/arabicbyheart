import { cloneCategory, generateId } from "@/functions"
import { VocabularyItem, VocabularyCategory, VocabularyGroup } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"
import { allRequests } from "@/requests"

import { CategoryClass } from "../components/Category"
import { CategoryState } from "../model"

import { getImage } from "."

export function createVocabulary(this: CategoryClass): void {
  const { selectedCategory } = this.props
  const { titleList, audioList, languageList, isCreatingWithImage } = this.state
  const { vocabularyCategoryList } = getReduxState()
  if (titleList.some((title: string) => !title.split(" ").join("")) || !selectedCategory) {
    return
  }
  const newItems: VocabularyItem[] = Array((selectedCategory as VocabularyCategory).columnCount)
    .fill("")
    .map((_: string, index: number): VocabularyItem => ({
      title: titleList[index],
      audio: audioList[index],
      _id: generateId()
    }))

  const makeVocabulary = (image?: string) => {
    const newGroup: VocabularyGroup = {
      image,
      list: newItems,
      _id: generateId()
    }

    allRequests.addOrUpdateVocabulary({
      image: newGroup.image,
      _id: newGroup._id,
      categoryId: selectedCategory._id,
      list: newGroup.list,
      languageList: selectedCategory.items.length === 0 ? languageList : undefined
    }).then(() => {
      const newSelectedCategory: VocabularyCategory = cloneCategory({ ...selectedCategory, languageList } as VocabularyCategory)
      newSelectedCategory.items.push(newGroup)
      const categoryIndex = vocabularyCategoryList
        .findIndex((category: VocabularyCategory) => category._id === newSelectedCategory._id)
      const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
      newVocabularyCategoryList[categoryIndex] = newSelectedCategory
      setReduxState({
        selectedCategory: newSelectedCategory,
        vocabularyCategoryList: newVocabularyCategoryList
      })
      localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
      this.setState(this.getInitialState(true) as CategoryState)
    })
  }
  if (isCreatingWithImage) {
    getImage(titleList, languageList)
      .then((image: string | undefined) => {
        makeVocabulary(image)
      })
  } else {
    makeVocabulary()
  }
}