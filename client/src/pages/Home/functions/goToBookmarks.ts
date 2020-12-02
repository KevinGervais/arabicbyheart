import { en, fr } from "@/languages"
import { BookmarkItem, VocabularyCategory, VocabularyItem } from "@/model"
import { getReduxState, setReduxState } from "@/redux"

export function goToBookmarks(): void {
  const { bookmarks, vocabularyCategoryList } = getReduxState()
  const items: VocabularyItem[] = []
  const notFoundBookmarkIndexes: number[] = []
  bookmarks.forEach((bookmark: BookmarkItem, index: number) => {
    const foundCategory = vocabularyCategoryList.find((category: VocabularyCategory) => category._id === bookmark.categoryId)
    if (foundCategory) {
      const foundVocabulary = foundCategory.items.find((vocabulary: VocabularyItem) => vocabulary._id === bookmark.vocabularyId)
      if (foundVocabulary) {
        items.push(foundVocabulary)
      } else {
        notFoundBookmarkIndexes.push(index)
      }
    } else {
      notFoundBookmarkIndexes.push(index)
    }
  })
  if (notFoundBookmarkIndexes.length) {
    const newBookmarks = bookmarks.map((bookmark: BookmarkItem) => ({ ...bookmark }))
    notFoundBookmarkIndexes.forEach((index: number) => {
      newBookmarks.splice(index, 1)
    })
    setReduxState({ bookmarks: newBookmarks })
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
  }
  setReduxState({
    selectedCategory: {
      items,
      title: {
        fr: fr.bookmarks,
        en: en.bookmarks
      },
      _id: "123456789",
      isPublic: false,
      isMultipleCategory: true
    },
    page: "category"
  })
}