import { VocabularyItem } from "@/model"

import { QuranVerse } from "../model"

import { getQuranVerses } from "./getQuranVerses"

export function handleScroll(
  evt: React.UIEvent<HTMLDivElement, UIEvent>,
  currentCount: number,
  currentIndex: number,
  currentVerses: QuranVerse[],
  vocabularyItem: VocabularyItem,
  callback: (newVerses: QuranVerse[], newIndex: number) => void
): void {
  const div = evt.target as HTMLDivElement
  if (div.clientHeight + div.scrollTop >= div.scrollHeight) {
    const [verses, newIndex] = getQuranVerses(currentIndex, currentCount, vocabularyItem)
    callback([...currentVerses, ...verses], newIndex)
  }
}