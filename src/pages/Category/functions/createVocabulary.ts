import { cloneCategory, generateId } from "@/functions"
import { LanguageItems, SpeechLanguages, VocabularyCategory, VocabularyItem } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"
import { allRequests } from "@/requests"
import { ALL_SPEECH_LANGUAGES } from "@/constants"

import { CategoryClass } from "../components/Category"
import { CategoryState } from "../model"

import { getImage } from "."

export function createVocabulary(this: CategoryClass): void {
  const { selectedCategory, selectedLanguage } = this.props
  const { selectedTitle, selectedAudio, arabicTitle, arabicAudio, isCreatingWithImage } = this.state
  const { vocabularyCategoryList } = getReduxState()
  if ([selectedTitle, arabicTitle].some((title: string) => !title.split(" ").join("")) || !selectedCategory) {
    return
  }
  const languageItems: LanguageItems = {} as LanguageItems
  ALL_SPEECH_LANGUAGES.forEach((language: SpeechLanguages) => {
    if (selectedLanguage === language) {
      languageItems[language] = {
        title: selectedTitle,
        audio: selectedAudio,
        _id: generateId()
      }
    } else if (language === "ar") {
      languageItems[language] = {
        title: arabicTitle,
        audio: arabicAudio,
        _id: generateId()
      }
    } else {
      languageItems[language] = {
        title: "",
        audio: undefined,
        _id: generateId()
      }
    }

  })

  const makeVocabulary = (image?: string) => {
    const newVocabularyItem: VocabularyItem = {
      image,
      languageItems,
      _id: generateId()
    }

    allRequests.addOrUpdateVocabulary({
      image: newVocabularyItem.image,
      _id: newVocabularyItem._id,
      categoryId: selectedCategory._id,
      languageItems: newVocabularyItem.languageItems,
    }).then(() => {
      const newSelectedCategory: VocabularyCategory = cloneCategory({ ...selectedCategory })
      newSelectedCategory.items.push(newVocabularyItem)
      const categoryIndex = vocabularyCategoryList
        .findIndex((category: VocabularyCategory) => category._id === newSelectedCategory._id)
      const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
      newVocabularyCategoryList[categoryIndex] = newSelectedCategory
      setReduxState({
        selectedCategory: newSelectedCategory,
        vocabularyCategoryList: newVocabularyCategoryList
      })
      localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)

      this.setState({ ...this.getInitialState(true) as unknown as CategoryState, editingVocabularyIndex: -1, })
    })
  }
  if (isCreatingWithImage) {
    getImage(selectedTitle)
      .then((image: string | undefined) => {
        makeVocabulary(image)
      })
  } else {
    makeVocabulary()
  }
}