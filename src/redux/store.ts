import { VocabularyCategory } from "@/model"
import localforage from "localforage"
import { createStore, Store, Action } from "redux"

import { setReduxState } from "."
import { initState } from "./initState"
import { ReduxState, SetAction } from "./model"

export const store: Store = createStore(
  (currentState: ReduxState = initState, action: Action) => {
    let newState: ReduxState
    if (action.type === "SET") {
      const setAction: SetAction = action as SetAction
      if (!setAction.data) {
        return currentState
      }
      if (setAction.data.page) {
        window.localStorage.setItem("page", setAction.data.page)
        if (setAction.data.page === "category" && setAction.data.selectedCategory) {
          window.localStorage.setItem("categoryId", setAction.data.selectedCategory._id)
        }
      }
      return {
        ...currentState,
        ...setAction.data
      }
    } else if (action.type.includes("@@redux/INIT")) {
      newState = currentState
    } else {
      throw new Error(`Redux type: ${action.type} is not defined`)
    }
    return newState
  }
)
localforage
  .getItem("vocabularyCategoryList")
  .then((obj: unknown): void => {
    if (obj) {
      const vocabularyCategoryList = obj as VocabularyCategory[]
      const categoryId = window.localStorage.getItem("categoryId")
      const currentCategory = vocabularyCategoryList.find((item: VocabularyCategory) => item._id === categoryId)
      if (currentCategory) {
        setReduxState({ selectedCategory: currentCategory, vocabularyCategoryList })
      } else {
        setReduxState({ vocabularyCategoryList })
      }
    }
  })
