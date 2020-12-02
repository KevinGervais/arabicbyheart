import { BookmarkItem } from "@/model"
import { getReduxState, setReduxState } from "@/redux"

export function updateBookmarks(index: number, categoryId: string, vocabularyId: string): void {
  const { bookmarks } = getReduxState()
  const newBookmarks = bookmarks.map((bookmark: BookmarkItem) => ({ ...bookmark }))
  if (index === -1) {
    newBookmarks.push({ categoryId, vocabularyId })
  } else {
    newBookmarks.splice(index, 1)
  }
  setReduxState({ bookmarks: newBookmarks })
  localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
}