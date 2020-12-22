import { VocabularyItem } from "@/model"
import quranJSON from "@/quran.json"

import { QuranVerse } from "../model"

import { simplifyArabicItemText } from "."


export function getQuranVerses(startIndex: number, count: number, vocabularyItem: VocabularyItem): [QuranVerse[], number] {
  const quran: QuranVerse[] = quranJSON
  const foundVerses: QuranVerse[] = []
  const keyWord: string = simplifyArabicItemText(vocabularyItem.languageItems.ar.title)
  let nextIndex = startIndex
  for (let index = startIndex; index < quran.length; index++) {
    const verse = quran[index]
    if (verse.text.includes(keyWord)) {
      foundVerses.push(verse)
    }
    if (foundVerses.length === count) {
      index = quran.length
    }
    nextIndex++
  }

  return [foundVerses, nextIndex]
}