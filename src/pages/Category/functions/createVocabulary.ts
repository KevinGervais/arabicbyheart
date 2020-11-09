import { generateId } from "@/functions"
import { VocabularyItem, VocabularyCategory, VocabularyGroup } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"

import { CategoryClass } from "../components/Category"

export function createVocabulary(this: CategoryClass): void {
  const { selectedCategory } = this.props
  const { titleList, audioList, languageList } = this.state
  const { vocabularyCategoryList } = getReduxState()
  const newItems: VocabularyItem[] = Array((selectedCategory as VocabularyCategory).columnCount)
    .fill("")
    .map((_: string, index: number) => ({
      title: titleList[index],
      audio: audioList[index],
      lang: languageList[index],
      _id: generateId()
    }))
  this.getImage()
    .then((image: string) => {
      const newGroup: VocabularyGroup = {
        image,
        list: newItems,
        _id: generateId()
      }
      const newSelectedCategory: VocabularyCategory = { ...selectedCategory as VocabularyCategory }
      newSelectedCategory.items.push(newGroup)
      const categoryIndex = vocabularyCategoryList
        .findIndex((category: VocabularyCategory) => category._id === newSelectedCategory._id)
      const newVocabularyCategoryList = [...vocabularyCategoryList]
      newVocabularyCategoryList[categoryIndex] = newSelectedCategory
      setReduxState({
        selectedCategory: newSelectedCategory,
        vocabularyCategoryList: newVocabularyCategoryList
      })
      localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)

      this.setState(this.getInitialState(true))
    })
}